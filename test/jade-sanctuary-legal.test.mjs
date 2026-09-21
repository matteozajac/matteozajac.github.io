import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readPage(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('Jade Sanctuary marketing is vision-only and uses the new path', async () => {
  const body = await readPage('jade-sanctuary/index.html');

  assert.match(body, /Apple Vision Pro/);
  assert.match(body, /visionOS 27/);
  assert.match(body, /Jade Path/);
  assert.match(body, /one-time Full Game purchase/);
  assert.match(body, /matteozajac\.com\/jade-sanctuary\/index\.html/);
  assert.match(body, /\/jade-sanctuary\/privacy\.html/);
  assert.match(body, /\/jade-sanctuary\/terms\.html/);
  assert.match(body, /\/jade-sanctuary\/support\.html/);
  assert.doesNotMatch(body, /TwinGlyph/);
  assert.doesNotMatch(body, /iPhone, iPad and Apple Vision Pro/);
  assert.doesNotMatch(body, /href="\/twinglyph\//);
});

test('Jade Sanctuary support explains pinch, restore, and the new contact subject', async () => {
  const body = await readPage('jade-sanctuary/support.html');

  assert.match(body, /Jade Sanctuary is a spatial pair-matching puzzle for Apple Vision Pro/);
  assert.match(body, /pinch to select/i);
  assert.match(body, /Restore Purchases/);
  assert.match(body, /same Apple Account/);
  assert.match(body, /visionOS version/);
  assert.match(body, /subject=Jade%20Sanctuary%20support/);
  assert.match(body, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.doesNotMatch(body, /iPhone, iPad and Apple Vision Pro/);
  assert.doesNotMatch(body, /href="\/twinglyph\//);
});

test('Jade Sanctuary privacy covers purchases, Game Center and spatial data', async () => {
  const body = await readPage('jade-sanctuary/privacy.html');

  assert.match(body, /requires no account/);
  assert.match(body, /does not track you across apps or websites/);
  assert.match(body, /RevenueCat/);
  assert.match(body, /anonymous app user identifier and purchase information/);
  assert.match(body, /On Apple Vision Pro/);
  assert.match(body, /visionOS and ARKit/);
  assert.match(body, /Game Center/);
  assert.match(body, /matteozajac\.com\/jade-sanctuary\/privacy\.html/);
  assert.doesNotMatch(body, /On iPhone and iPad/);
  assert.doesNotMatch(body, /TwinGlyph/);
  assert.doesNotMatch(body, /href="\/twinglyph\//);
});

test('Jade Sanctuary terms describe free access and one-time unlock', async () => {
  const body = await readPage('jade-sanctuary/terms.html');

  assert.match(body, /Apple Vision Pro/);
  assert.match(body, /Journey levels 1–5 are free to replay/);
  assert.match(body, /non-consumable Full Game purchase/);
  assert.match(body, /There are no subscriptions or advertisements/);
  assert.match(body, /matteozajac\.com\/jade-sanctuary\/terms\.html/);
  assert.doesNotMatch(body, /iPhone, iPad and Apple Vision Pro/);
  assert.doesNotMatch(body, /href="\/twinglyph\//);
});

test('legacy /twinglyph routes redirect to /jade-sanctuary', async () => {
  const pages = [
    ['twinglyph/index.html', '/jade-sanctuary/index.html'],
    ['twinglyph/privacy.html', '/jade-sanctuary/privacy.html'],
    ['twinglyph/support.html', '/jade-sanctuary/support.html'],
    ['twinglyph/terms.html', '/jade-sanctuary/terms.html'],
  ];

  for (const [path, target] of pages) {
    const body = await readPage(path);
    assert.match(body, new RegExp(`url=${target.replaceAll('/', '\\/')}`));
    assert.match(body, new RegExp(`location\\.replace\\("${target.replaceAll('/', '\\/')}"\\)`));
    assert.match(body, new RegExp(`href="${target.replaceAll('/', '\\/')}"`));
  }
});

test('Jade Sanctuary pages are linked into the site and Vite build', async () => {
  const listing = await readPage('projects.html');
  const home = await readPage('index.html');
  const vite = await readPage('vite.config.js');

  assert.match(listing, /\/jade-sanctuary\/index\.html/);
  assert.match(listing, /<h3>Jade Sanctuary<\/h3>/);
  assert.match(home, /\/jade-sanctuary\/index\.html/);
  assert.match(home, /Shipping Jade Sanctuary/);
  assert.match(vite, /jade-sanctuary\/index\.html/);
  assert.match(vite, /jade-sanctuary\/privacy\.html/);
  assert.match(vite, /jade-sanctuary\/terms\.html/);
  assert.match(vite, /jade-sanctuary\/support\.html/);
  assert.match(vite, /twinglyph\/index\.html/);
  assert.match(vite, /twinglyph\/privacy\.html/);
});
