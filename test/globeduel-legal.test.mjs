import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readPage(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('GlobeDuel marketing is iPhone-only and describes Look Around duels', async () => {
  const body = await readPage('projects/globeduel.html');

  assert.match(body, /iPhone · iOS 27/);
  assert.match(body, /Look Around/);
  assert.match(body, /Game Center/);
  assert.match(body, /SharePlay/);
  assert.match(body, /Free, no in-app purchases/);
  assert.match(body, /English and Polish/);
  assert.doesNotMatch(body, /iPad/);
  assert.doesNotMatch(body, /visionOS/);
  assert.doesNotMatch(body, /Mac App Store/);
  assert.doesNotMatch(body, /The Godfather/);
});

test('GlobeDuel privacy matches the release data posture', async () => {
  const body = await readPage('globeduel/privacy.html');

  assert.match(body, /requires no GlobeDuel account/);
  assert.match(body, /shows no ads/);
  assert.match(body, /does not track you across apps or websites/);
  assert.match(body, /does not request access to your device’s location/);
  assert.match(body, /Game Center is optional/);
  assert.match(body, /SharePlay/);
  assert.doesNotMatch(body, /RevenueCat/);
  assert.doesNotMatch(body, /Sentry/);
  assert.doesNotMatch(body, /Firebase/);
});

test('Polish privacy policy is complete and naturally localized', async () => {
  const body = await readPage('globeduel/pl/privacy.html');

  assert.match(body, /Nie wymaga konta GlobeDuel/);
  assert.match(body, /nie wyświetla reklam/);
  assert.match(body, /nie śledzi użytkowników między aplikacjami ani stronami internetowymi/);
  assert.match(body, /nie prosi o dostęp do lokalizacji urządzenia/);
  assert.match(body, /Game Center jest opcjonalny/);
});

test('GlobeDuel terms describe free iPhone access without purchases', async () => {
  const english = await readPage('globeduel/terms.html');
  const polish = await readPage('globeduel/pl/terms.html');

  assert.match(english, /free to download/i);
  assert.match(english, /no in-app purchases, subscriptions, or advertising/);
  assert.match(english, /Apple Standard Licensed Application End User License Agreement/);
  assert.match(polish, /pobrać bezpłatnie/);
  assert.match(polish, /nie ma zakupów w aplikacji, subskrypcji ani reklam/);
});

test('GlobeDuel support explains panoramas and Game Center', async () => {
  const english = await readPage('globeduel/support.html');
  const polish = await readPage('globeduel/pl/support.html');

  assert.match(english, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.match(english, /Look Around needs a network connection/);
  assert.match(english, /Practice/);
  assert.match(polish, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.match(polish, /Look Around wymaga połączenia sieciowego/);
  assert.match(polish, /Ćwiczenie/);
});

test('all GlobeDuel pages are linked into the site and reciprocal language routes exist', async () => {
  const project = await readPage('projects/globeduel.html');
  const listing = await readPage('projects.html');
  const home = await readPage('index.html');
  const vite = await readPage('vite.config.js');

  for (const path of [
    '/globeduel/privacy.html',
    '/globeduel/terms.html',
    '/globeduel/support.html',
    '/globeduel/pl/privacy.html',
    '/globeduel/pl/terms.html',
    '/globeduel/pl/support.html',
  ]) {
    assert.match(project, new RegExp(path.replaceAll('/', '\\/').replace('.', '\\.')));
  }

  assert.match(listing, /\/projects\/globeduel\.html/);
  assert.match(home, /\/projects\/globeduel\.html/);
  assert.match(vite, /projects\/globeduel\.html/);
  assert.match(vite, /globeduel\/pl\/privacy\.html/);
  assert.match(vite, /globeduel\/pl\/terms\.html/);
  assert.match(vite, /globeduel\/pl\/support\.html/);
});
