import {expect, test} from "@playwright/test";

test("voice sends only complete questions and preserves the typed draft", async ({page}) => {
  await page.addInitScript(() => {
    class Microphone {
      onresult?: (event: {results: {transcript:string}[][]}) => void;
      onend?: () => void;
      start() {
        window.addEventListener("test-speech", event => {
          this.onresult?.({results: [[{transcript:(event as CustomEvent<string>).detail}]]});
          this.onend?.();
        }, {once:true});
      }
      abort() {}
    }
    Object.defineProperty(window, "SpeechRecognition", {value: Microphone});
    Object.defineProperty(window, "speechSynthesis", {value:{cancel(){}, speak(){}}});
  });
  const messages:string[] = [];
  await page.route("**/api/chat", route => {
    messages.push(route.request().postDataJSON().message);
    return route.fulfill({contentType:"text/event-stream",body:'data: {"response":"Synthetic answer."}\n\ndata: [DONE]\n\n'});
  });
  await page.goto("/chat");
  const draft = page.getByRole("textbox",{name:"Your message"});
  await draft.fill("An unrelated draft I am still editing.");
  await page.getByRole("button",{name:"Start voice conversation"}).click();
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("test-speech",{detail:"x".repeat(3001)})));
  await expect(page.getByRole("region",{name:"Voice conversation"}).getByRole("alert")).toContainText("3,000");
  expect(messages).toEqual([]);
  await page.getByRole("button",{name:"Speak again"}).click();
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("test-speech",{detail:"What is a test fixture?"})));
  await expect(page.getByText("Synthetic answer.",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Close voice conversation"}).click();
  await expect(draft).toHaveValue("An unrelated draft I am still editing.");
  expect(messages).toEqual(["What is a test fixture?"]);
});

test("dictation preserves draft formatting and reports text that exceeds the limit", async ({page}) => {
  await page.addInitScript(() => {
    class Microphone {
      onresult?: (event:{results:{transcript:string}[][]}) => void;
      onend?: () => void;
      start() { this.onresult?.({results:[[{transcript:"spoken ending"}]]}); }
      stop() { this.onend?.(); }
      abort() {}
    }
    Object.defineProperty(window,"SpeechRecognition",{value:Microphone});
  });
  await page.goto("/chat");
  const draft = page.getByRole("textbox",{name:"Your message"});
  const original = "a".repeat(2990)+"\n\n";
  await draft.fill(original);
  await page.getByRole("button",{name:"Dictate message"}).click();
  await page.getByRole("button",{name:"Stop dictation"}).click();
  await expect(draft).toHaveValue((original+"spoken ending").slice(0,3000));
  await expect(page.getByText(/Your draft reached 3,000 characters/)).toBeVisible();
});

test("refreshing an eAI reply in progress restores the question and offers a retry", async ({page}) => {
  await page.addInitScript(() => {
    const fetchOriginal = window.fetch;
    window.fetch = (input, init) => {
      if (input !== "/api/chat") return fetchOriginal(input, init);
      const payload = new TextEncoder().encode('data: {"response":"Partial test reply"}\n\n');
      const stream = new ReadableStream({start(controller) {controller.enqueue(payload);}});
      return Promise.resolve(new Response(stream, {headers:{"Content-Type":"text/event-stream"}}));
    };
  });
  await page.goto("/chat");
  await page.getByRole("textbox",{name:"Your message"}).fill("What is a unit test?");
  await page.getByRole("button",{name:"Send message"}).click();
  await expect(page.getByText("Partial test reply",{exact:true})).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button",{name:"Retry last question"})).toBeVisible();
  await expect(page.getByText("Partial test reply",{exact:true})).toHaveCount(0);
  await expect(page.getByRole("log").getByText("What is a unit test?",{exact:true})).toBeVisible();
});

test("migrated eAI chats show their original opening question", async ({page}) => {
  await page.addInitScript(() => localStorage.setItem("erdal-ai-chat-v3",JSON.stringify([
    {role:"user",content:"My original opening question"},
    {role:"assistant",content:"My saved reply"}
  ])));
  await page.goto("/chat");
  const log=page.getByRole("log",{name:"Conversation messages"});
  await expect(log.getByText("My original opening question",{exact:true})).toBeVisible();
  await expect(log.getByText("My saved reply",{exact:true})).toBeVisible();
  await page.reload();
  await expect(log.getByText("My original opening question",{exact:true})).toBeVisible();
});

for (const path of ["/chat", "/study#ai-assistant"]) {
  test("code copy provides recovery and confirms retry at "+path, async ({page}) => {
    const main = path === "/chat";
    await page.addInitScript(() => {
      let denied = true;
      Object.defineProperty(navigator, "clipboard", {value:{
        async writeText(value:string) {
          if (denied) {denied=false; throw new Error("Clipboard denied");}
          document.documentElement.dataset.copiedCode=value;
        }
      }});
    });
    await page.route(main ? "**/api/chat" : "**/api/study/chat", route => route.fulfill({
      contentType:"text/event-stream",
      body:"data: "+JSON.stringify({response:"```js\nconst sum = 2 + 2;\n```"})+"\n\ndata: [DONE]\n\n"
    }));
    await page.goto(path);
    const chat=main?page.locator("main"):page.locator("#ai-assistant");
    await chat.getByLabel("Your message").fill("Show a JavaScript addition example.");
    await chat.getByRole("button",{name:main?"Send message":"Send",exact:true}).click();
    const copy=chat.getByRole("button",{name:"Copy code",exact:true});
    await copy.click();
    await expect(chat.getByText(/Clipboard unavailable/)).toBeVisible();
    await copy.click();
    await expect(chat.getByText("Code copied.",{exact:true})).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-copied-code","const sum = 2 + 2;");
  });
}

test("chat history keyboard focus follows the sidebar when it opens and closes", async ({page}) => {
  await page.goto("/chat");
  await expect(page.getByLabel("Your message")).toBeEnabled();
  const toggle=page.locator(".atlas-sidebar-toggle");
  if(await toggle.getAttribute("aria-expanded")==="true") await toggle.click();
  await toggle.focus();
  await toggle.press("Enter");
  const sidebar=page.locator("#eai-chat-history");
  await expect(sidebar.getByRole("button",{name:"Hide sidebar"})).toBeFocused();
  await sidebar.getByRole("searchbox").focus();
  await page.keyboard.press("Escape");
  await expect(sidebar).toBeHidden();
  await expect(toggle).toBeFocused();
});
