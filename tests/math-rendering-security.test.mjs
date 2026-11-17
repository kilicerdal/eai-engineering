import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const render = text => renderToStaticMarkup(React.createElement(ReactMarkdown, {
  skipHtml: true, remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex],
}, text));

test('the patched math dependency renders inline and display mathematics through the existing Markdown pipeline', () => {
  const html = render('Solve $x^2 + 1$ and\n\n$$\n\\frac{1}{2} + \\sqrt{4}\n$$');
  assert.match(html, /class="katex"/);
  assert.match(html, /katex-display/);
  assert.match(html, /<math/);
  assert.doesNotMatch(html, /katex-error/);
});

test('inherited trust cannot enable external image commands in mathematical content', () => {
  const previous = Object.getOwnPropertyDescriptor(Object.prototype, 'trust');
  try {
    Object.defineProperty(Object.prototype, 'trust', {value: true, configurable: true});
    const html = render('$\\includegraphics{https://example.invalid/tracking.png}$');
    assert.doesNotMatch(html, /<img\b|src="https:\/\/example\.invalid/);
  } finally {
    if (previous) Object.defineProperty(Object.prototype, 'trust', previous);
    else delete Object.prototype.trust;
  }
});
