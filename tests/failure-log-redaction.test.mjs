import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { loadStudyModule } from './load-study-module.mjs';

const { redactFailureLog } = loadStudyModule('failure-log-redaction');

test('removes credentials from ordinary headers, assignments and JSON logs', () => {
  for (const log of [
    'Bearer SYNTHETIC_CREDENTIAL',
    'Authorization: Bearer SYNTHETIC_CREDENTIAL\nstatus=401',
    'authorization=Basic SYNTHETIC_CREDENTIAL',
    'password=SYNTHETIC_CREDENTIAL',
    'API_KEY : SYNTHETIC_CREDENTIAL',
    'token = SYNTHETIC_CREDENTIAL',
    'secret="SYNTHETIC_CREDENTIAL with spaces"',
    '{"password":"SYNTHETIC_CREDENTIAL","status":401}',
    '{"Authorization":"Bearer SYNTHETIC_CREDENTIAL","status":401}',
    "{'api-key':'SYNTHETIC_CREDENTIAL'}",
    'request failed with ghp_SYNTHETIC_CREDENTIAL',
    'request failed with github_pat_SYNTHETIC_CREDENTIAL',
  ]) {
    const sanitized = redactFailureLog(log);
    assert.ok(!sanitized.includes('SYNTHETIC_CREDENTIAL'), log);
    assert.match(sanitized, /REDACTED/);
  }
});

test('preserves diagnostic context and line boundaries and is idempotent', () => {
  const log = 'POST /orders returned 401; expected 201\nAuthorization: Bearer SYNTHETIC_CREDENTIAL\npassword="another synthetic value"; status=401\nECONNREFUSED';
  const result = redactFailureLog(log);
  assert.match(result, /POST \/orders returned 401; expected 201/);
  assert.match(result, /status=401\nECONNREFUSED/);
  assert.equal(result.split('\n').length, log.split('\n').length);
  assert.equal(redactFailureLog(result), result);
  assert.equal(redactFailureLog('locator.click timed out after 30000ms'), 'locator.click timed out after 30000ms');
});

test('failure analysis passes sanitized input to the provider', async () => {
  const require = createRequire(import.meta.url), ts = require('typescript');
  const code = ts.transpileModule(readFileSync(new URL('../src/app/api/analyze-failure/route.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  let providerPrompt;
  class NextResponse extends Response {
    static json(body, options) { return new NextResponse(JSON.stringify(body), options); }
  }
  const deps = {
    'next/server': { NextResponse },
    '../../../lib/ai-security': { protectAIRequest: async () => null, logAIRequest: () => {} },
    '../../../lib/failure-log-redaction': { redactFailureLog },
    '../cloudflare': { askCloudflare: async (_, prompt) => { providerPrompt = prompt; return NextResponse.json({ answer: 'Synthetic response' }); } },
  };
  const fixtureModule = { exports: {} };
  new Function('require', 'module', 'exports', code)(name => {
    assert.ok(name in deps, `Unexpected dependency: ${name}`);
    return deps[name];
  }, fixtureModule, fixtureModule.exports);
  const result = await fixtureModule.exports.POST(new Request('https://example.test/api/analyze-failure', {
    method: 'POST', body: JSON.stringify({ framework: 'API', log: 'POST /orders returned 401\nAuthorization: Bearer SYNTHETIC_CREDENTIAL' }),
  }));
  assert.equal(result.status, 200);
  assert.match(providerPrompt, /POST \/orders returned 401/);
  assert.match(providerPrompt, /REDACTED/);
  assert.ok(!providerPrompt.includes('SYNTHETIC_CREDENTIAL'));
});
