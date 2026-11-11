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
