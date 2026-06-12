import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readPage(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('AirPong Motion Support exposes contact, legal links, and control guidance', async () => {
  const body = await readPage('airpong-motion/support.html');
  const config = await readPage('config.js');

  assert.match(body, /support-email" content="matteo\.zajac@gmail\.com"/);
  assert.match(config, /matteo\.zajac@gmail\.com/);
  assert.match(body, /data-email="show"/);
  assert.match(body, /\/airpong-motion\/privacy\.html/);
  assert.match(body, /\/airpong-motion\/terms\.html/);
  assert.match(body, /\/projects\/airpong-motion\.html/);
  assert.match(body, /compatible AirPods/i);
  assert.match(body, /tilt fallback/i);
  assert.match(body, /Game Center/i);
});

test('AirPong Motion Privacy Policy matches local-data launch posture', async () => {
  const body = await readPage('airpong-motion/privacy.html');

  assert.match(body, /does not collect personal data/i);
  assert.match(body, /does not track/i);
  assert.match(body, /local game data/i);
  assert.match(body, /compatible AirPods motion data/i);
  assert.match(body, /device tilt data/i);
  assert.match(body, /local network/i);
  assert.match(body, /Game Center/i);
  assert.match(body, /does not use advertising tracking domains/i);
  assert.doesNotMatch(body, /Firebase|RevenueCat|Sentry/i);
});

test('AirPong Motion Terms state launch monetization and platform limits', async () => {
  const body = await readPage('airpong-motion/terms.html');

  assert.match(body, /free at launch/i);
  assert.match(body, /no subscriptions/i);
  assert.match(body, /no advertising/i);
  assert.match(body, /Optional cosmetic purchases may be added later/i);
  assert.match(body, /compatible AirPods/i);
  assert.match(body, /Tilt fallback/i);
  assert.match(body, /Game Center/i);
  assert.doesNotMatch(body, /touch controls|touch fallback/i);
});
