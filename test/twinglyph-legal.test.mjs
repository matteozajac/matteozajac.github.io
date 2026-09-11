import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readPage(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('TwinGlyph marketing covers iPhone, iPad and Vision Pro', async () => {
  const body = await readPage('twinglyph/index.html');

  assert.match(body, /iPhone, iPad and Apple Vision Pro/);
  assert.match(body, /iOS 26/);
  assert.match(body, /visionOS 27/);
  assert.match(body, /Jade Path/);
  assert.match(body, /one-time Full Game purchase/);
  assert.doesNotMatch(body, /requires Apple Vision Pro with visionOS 27/);
});

test('TwinGlyph support explains tap and pinch plus restore', async () => {
  const body = await readPage('twinglyph/support.html');

  assert.match(body, /iPhone, iPad and Apple Vision Pro/);
  assert.match(body, /tap a glyph/i);
  assert.match(body, /pinch to select/i);
  assert.match(body, /Restore Purchases/);
  assert.match(body, /same Apple Account/);
  assert.match(body, /iOS, iPadOS or visionOS version/);
  assert.match(body, /support-email" content="matteo\.zajac@gmail\.com"/);
});

test('TwinGlyph privacy separates mobile input from spatial interaction', async () => {
  const body = await readPage('twinglyph/privacy.html');

  assert.match(body, /requires no TwinGlyph account/);
  assert.match(body, /does not track you across apps or websites/);
  assert.match(body, /RevenueCat/);
  assert.match(body, /anonymous app user identifier and purchase information/);
  assert.match(body, /On iPhone and iPad/);
  assert.match(body, /does not access the camera, microphone or your surroundings/);
  assert.match(body, /On Apple Vision Pro/);
  assert.match(body, /visionOS and ARKit/);
  assert.match(body, /Game Center/);
});

test('TwinGlyph terms describe free access and one-time unlock', async () => {
  const body = await readPage('twinglyph/terms.html');

  assert.match(body, /iPhone, iPad and Apple Vision Pro/);
  assert.match(body, /Journey levels 1–5 are free to replay/);
  assert.match(body, /non-consumable Full Game purchase/);
  assert.match(body, /There are no subscriptions or advertisements/);
});
