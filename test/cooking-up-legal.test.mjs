import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readPage(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('Cooking Up marketing describes a private iPhone recipe library', async () => {
  const body = await readPage('projects/cooking-up.html');

  assert.match(body, /iPhone · iOS 27/);
  assert.match(body, /Free to download/);
  assert.match(body, /No Cooking Up account is required/);
  assert.match(body, /wait-state/);
  assert.match(body, /Live ads are not in this first store build/);
  assert.match(body, /\/cooking-up\/privacy\.html/);
  assert.match(body, /\/cooking-up\/terms\.html/);
  assert.match(body, /\/cooking-up\/support\.html/);
  assert.doesNotMatch(body, /Mac App Store/);
  assert.doesNotMatch(body, /shows no ads/);
});

test('Cooking Up privacy matches the current library and upcoming ads', async () => {
  const body = await readPage('cooking-up/privacy.html');

  assert.match(body, /requires no Cooking Up account/);
  assert.match(body, /CloudKit/);
  assert.match(body, /iCloud Drive/);
  assert.match(body, /Private Cloud Compute/);
  assert.match(body, /Firebase/);
  assert.match(body, /Sentry/);
  assert.match(body, /RevenueCat/);
  assert.match(body, /Google AdMob/);
  assert.match(body, /does not include a live advertising SDK/);
  assert.match(body, /will begin serving in those wait states shortly/);
  assert.match(body, /App Tracking Transparency/);
  assert.match(body, /turned off independently in Settings/);
  assert.match(body, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.doesNotMatch(body, /shows no ads/);
});

test('Cooking Up terms cover the Apple EULA and upcoming wait-state ads', async () => {
  const body = await readPage('cooking-up/terms.html');

  assert.match(body, /free to download/i);
  assert.match(body, /no in-app purchases or subscriptions/);
  assert.match(body, /Apple Standard Licensed Application End User License Agreement/);
  assert.match(body, /Wait-state advertisements will be shown shortly/);
  assert.match(body, /not a substitute for attending to food/);
});

test('Cooking Up support explains iCloud, analytics, and ads', async () => {
  const body = await readPage('cooking-up/support.html');

  assert.match(body, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.match(body, /Files → iCloud Drive → Cooking Up/);
  assert.match(body, /usage analytics and crash diagnostics/);
  assert.match(body, /Wait-state ads will appear shortly/);
  assert.match(body, /Live ads are not serving yet/);
});

test('Cooking Up pages are linked into the site and Vite build', async () => {
  const listing = await readPage('projects.html');
  const home = await readPage('index.html');
  const vite = await readPage('vite.config.js');

  assert.match(listing, /\/projects\/cooking-up\.html/);
  assert.match(home, /\/projects\/cooking-up\.html/);
  assert.match(vite, /projects\/cooking-up\.html/);
  assert.match(vite, /cooking-up\/privacy\.html/);
  assert.match(vite, /cooking-up\/terms\.html/);
  assert.match(vite, /cooking-up\/support\.html/);
});
