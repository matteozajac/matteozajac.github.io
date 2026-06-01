import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readPage(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('Global Tap 26 Privacy Policy matches paid app launch posture', async () => {
  const body = await readPage('global-tap/privacy.html');

  assert.match(body, /Firebase Firestore/);
  assert.match(body, /Game Center/);

  for (const forbidden of ['RevenueCat', 'subscription', 'subscriptions', 'advertising', 'in-app purchase', 'in-app purchases']) {
    assert.doesNotMatch(body, new RegExp(forbidden, 'i'));
  }
});

test('Global Tap 26 Terms state paid app with no extra monetization', async () => {
  const body = await readPage('global-tap/terms.html');

  assert.match(body, /Global Tap 26 is a paid app/i);
  assert.match(body, /no in-app purchases/i);
  assert.match(body, /no subscriptions/i);
  assert.match(body, /no advertising/i);
});

test('Global Tap 26 Support exposes contact and legal links', async () => {
  const body = await readPage('global-tap/support.html');
  const config = await readPage('config.js');

  assert.match(body, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.match(config, /matteo\.zajac@gmail\.com/);
  assert.match(body, /data-email="show"/);
  assert.match(body, /\/global-tap\/privacy\.html/);
  assert.match(body, /\/global-tap\/terms\.html/);
  assert.match(body, /\/projects\/global-tap\.html/);
});
