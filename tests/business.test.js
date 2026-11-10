import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filterDishes } from '../src/utils/menu.js';
import { dateError, reservationMessage } from '../src/utils/reservation.js';
import { whatsappUrl } from '../src/utils/whatsapp.js';

const dishes = JSON.parse(readFileSync(new URL('../src/data/dishes.json', import.meta.url)));

test('catalogue keeps all 66 dishes with unique ids', () => {
  assert.equal(dishes.length, 66);
  assert.equal(new Set(dishes.map((dish) => dish.id)).size, 66);
});
test('search ignores accents and combines text with flavor filters', () => {
  assert.equal(
    filterDishes(dishes, '  ACEVÍCHADO  ', []).some((dish) => dish.name === 'Acevichado'),
    true,
  );
  assert.equal(filterDishes(dishes, 'Acevichado', ['dulce']).length, 0);
  assert.equal(filterDishes(dishes, 'Acevichado', ['dulce', 'salado']).length, 1);
  assert.equal(filterDishes(dishes, 'no-existe-1234', []).length, 0);
  assert.equal(filterDishes(dishes, '', []).length, 66);
});
test('reservations reject past dates and Wednesdays', () => {
  assert.match(dateError('2026-11-07', '2026-11-08'), /pasadas/);
  assert.match(dateError('2026-11-11', '2026-11-08'), /miércoles/);
  assert.equal(dateError('2026-11-09', '2026-11-08'), '');
});
test('WhatsApp preserves reservation data, payment notice and special characters', () => {
  const message = reservationMessage({
    nombre: 'José & Ana',
    telefono: '949194985',
    fecha: '2026-11-09',
    hora: '19:00',
    personas: '2',
  });
  assert.match(message, /S\/ 20\.00/);
  const url = new URL(whatsappUrl(message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/51949194985');
  assert.equal(url.searchParams.get('text'), message);
});
