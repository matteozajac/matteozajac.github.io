import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readPage(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('Hopsa English privacy policy matches the release data posture', async () => {
  const body = await readPage('hopsa/privacy.html');

  assert.match(body, /requires no account/i);
  assert.match(body, /shows no ads/i);
  assert.match(body, /does not track you across apps or websites/i);
  assert.match(body, /RevenueCat/);
  assert.match(body, /anonymous app user ID and purchase history/);
  assert.match(body, /app functionality and analytics/i);
  assert.match(body, /does not store them or send them to the developer/i);
  assert.match(body, /Game Center/);
});

test('Polish privacy policy is complete and naturally localized', async () => {
  const body = await readPage('hopsa/pl/privacy.html');

  assert.match(body, /nie wymaga zakładania konta/);
  assert.match(body, /nie wyświetla reklam/);
  assert.match(body, /nie śledzi użytkowników między aplikacjami ani stronami internetowymi/);
  assert.match(body, /anonimowy identyfikator użytkownika aplikacji oraz historię zakupów/);
  assert.match(body, /funkcjonalności aplikacji i do analiz/);
  assert.match(body, /Ruch i sprawność/);
  assert.match(body, /Game Center/);
});

test('Hopsa support pages expose localized purchase restoration and contact', async () => {
  const english = await readPage('hopsa/support.html');
  const polish = await readPage('hopsa/pl/support.html');
  const config = await readPage('config.js');

  assert.match(english, /Restore Purchases/);
  assert.match(english, /same Apple Account/);
  assert.match(polish, /Przywróć zakupy/);
  assert.match(polish, /to samo konto Apple/);
  assert.match(english, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.match(polish, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.match(config, /matteo\.zajac@gmail\.com/);
});

test('Hopsa terms accurately describe free access and one-time cosmetics', async () => {
  const english = await readPage('hopsa/terms.html');
  const polish = await readPage('hopsa/pl/terms.html');

  assert.match(english, /free to download/i);
  assert.match(english, /one-time, non-consumable purchases/i);
  assert.match(english, /cosmetic and do not change gameplay rules/i);
  assert.match(polish, /pobrać bezpłatnie/);
  assert.match(polish, /zakupy jednorazowe/);
  assert.match(polish, /wyłącznie dodatki kosmetyczne/);
});

test('all Hopsa pages are linked into the site and reciprocal language routes exist', async () => {
  const project = await readPage('projects/hopsa.html');
  const listing = await readPage('projects.html');
  const vite = await readPage('vite.config.js');

  for (const path of [
    '/hopsa/privacy.html',
    '/hopsa/terms.html',
    '/hopsa/support.html',
    '/hopsa/pl/privacy.html',
    '/hopsa/pl/terms.html',
    '/hopsa/pl/support.html',
  ]) {
    assert.match(project, new RegExp(path.replaceAll('/', '\\/').replace('.', '\\.')));
  }

  assert.match(listing, /\/projects\/hopsa\.html/);
  assert.match(vite, /projects\/hopsa\.html/);
  assert.match(vite, /hopsa\/pl\/privacy\.html/);
  assert.match(vite, /hopsa\/pl\/terms\.html/);
  assert.match(vite, /hopsa\/pl\/support\.html/);
});
