import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readPage(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('Speak New York public Privacy Policy matches iOS launch vendors and account posture', async () => {
  const body = await readPage('speak-new-york/privacy.html');

  for (const vendor of ['Firebase', 'RevenueCat', 'Sentry']) {
    assert.match(body, new RegExp(`\\b${vendor}\\b`));
  }

  assert.doesNotMatch(body, /launch readiness|release regressions/i);
  assert.doesNotMatch(body, /Firebase Authentication|when you sign in/i);
});

test('Speak New York public Terms avoid hidden translator claims', async () => {
  const body = await readPage('speak-new-york/terms.html');

  assert.doesNotMatch(body, /expands translator access|translator access/i);
});

test('Speak New York public Support matches account-free iOS launch', async () => {
  const body = await readPage('speak-new-york/support.html');

  assert.doesNotMatch(
    body,
    /Delete Account|delete your account|while signed in|account deletion/i,
  );
  assert.match(body, /does not require an account/i);
});
