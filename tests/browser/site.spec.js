import { test, expect } from '@playwright/test';

for (const width of [390, 720, 1440]) {
  test(`menu search, filters and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/menu.html');
    await expect(page.locator('.plato-item')).toHaveCount(66);
    await expect(page.locator('.plato-item .dish-image img')).toHaveCount(66);
    await page.locator('#buscar-plato').fill('california');
    await expect(page.locator('.plato-item:not(.oculto)')).toHaveCount(1);
    await expect(page.locator('#contador')).toContainText('Mostrando 1 plato');
    await page.locator('[data-sabor="dulce"]').click();
    await expect(page.locator('#sin-resultados')).toBeVisible();
    await page.getByRole('button', { name: 'Limpiar búsqueda' }).click();
    await expect(page.locator('.plato-item:not(.oculto)')).toHaveCount(66);
    await page.getByRole('button', { name: 'Postres', exact: true }).click();
    await expect(page.locator('.plato-item:not(.oculto)')).toHaveCount(2);
    await page.getByRole('button', { name: /Toda la carta/ }).click();
    await expect(page.locator('.plato-item:not(.oculto)')).toHaveCount(66);
    if (width < 980) {
      await page.locator('#menu-btn').click();
      await expect(page.locator('#menu-btn')).toHaveAttribute('aria-expanded', 'true');
      await page.keyboard.press('Escape');
      await expect(page.locator('#menu-btn')).toHaveAttribute('aria-expanded', 'false');
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
  test(`home layout and new assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('30 ROLLS.');
    await expect(page.locator('#main-header')).toBeVisible();
    await page.getByRole('button', { name: 'Siguiente promoción' }).click();
    await expect(page.locator('.hero-photo.active')).toHaveAttribute('src', /rolls-photo/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('LA LAPTOP.');
    await expect(page.locator('.hero-promo-price')).toContainText('S/35.90');
    const selectors = page.getByRole('button', { name: /^Ver promoción/ });
    await expect(selectors).toHaveCount(9);
    for (let index = 0; index < (await selectors.count()); index++) {
      await selectors.nth(index).click();
      await expect(selectors.nth(index)).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('.hero-photo.active')).toHaveCount(1);
      expect(
        await page
          .locator('.hero-copy')
          .evaluate((element) =>
            [...element.querySelectorAll('.hero-headline-line')].every(
              (line) =>
                line.getBoundingClientRect().width <= element.getBoundingClientRect().width + 1,
            ),
          ),
      ).toBe(true);
    }

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('reservation modal validates dates and composes WhatsApp message', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.locator('#nosotros').getByRole('button', { name: 'RESERVA TU MESA' }).click();
  await expect(page.getByRole('dialog', { name: 'RESERVA TU MESA.' })).toBeVisible();
  await page.locator('#fecha').fill('2099-11-11');
  expect(await page.locator('#fecha').evaluate((input) => input.validationMessage)).toContain(
    'miércoles',
  );
  await page.locator('#fecha').fill('2099-11-12');
  expect(await page.locator('#fecha').evaluate((input) => input.validationMessage)).toBe('');
  await page.locator('#nombre').fill('José & Ana');
  await page.locator('#telefono').fill('949194985');
  await page.locator('#hora').fill('19:00');
  await page.locator('#personas').fill('2');
  await page.evaluate(() => {
    window.open = (url) => {
      window.__whatsappUrl = url;
      return null;
    };
  });
  await page.getByRole('button', { name: 'Reservar por WhatsApp' }).click();
  const reservationUrl = await page.evaluate(() => window.__whatsappUrl);
  expect(new URL(reservationUrl).searchParams.get('text')).toContain('Nombre: José & Ana');
  expect(errors).toEqual([]);
});

test('menu deep links select the category and ordering uses the correct product', async ({
  page,
}) => {
  await page.goto('/menu.html#makis-clasicos');
  await expect(page.getByRole('button', { name: 'Makis Clásicos', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('#california')).toBeVisible();
  await page.evaluate(() => {
    window.open = (url) => {
      window.__orderUrl = url;
      return null;
    };
  });
  await page.getByRole('button', { name: 'Pedir California', exact: true }).click();
  expect(new URL(await page.evaluate(() => window.__orderUrl)).searchParams.get('text')).toContain(
    'California',
  );
});

test('promotions rotate automatically and pause during interaction', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Pausar promociones' })).toBeVisible();
  await expect(page.locator('.promo-headline')).toContainText('30 ROLLS.');
  await page.clock.fastForward(10100);
  await expect(page.locator('.promo-headline')).toContainText('LA LAPTOP.');
  await page.locator('#inicio').hover();
  await page.clock.fastForward(14000);
  await expect(page.locator('.promo-headline')).toContainText('LA LAPTOP.');
  await page.getByRole('button', { name: 'Pausar promociones' }).click();
  await expect(page.getByRole('button', { name: 'Reanudar promociones' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.clock.fastForward(14000);
  await expect(page.locator('.promo-headline')).toContainText('LA LAPTOP.');
});

for (const width of [390, 1440]) {
  test(`reservation modal closes and restores focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const trigger = page.locator('#nosotros').getByRole('button', { name: 'RESERVA TU MESA' });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'RESERVA TU MESA.' });
    await expect(dialog).toBeVisible();
    await expect(page.locator('.reservation-section')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.getByRole('button', { name: 'Cerrar reserva' }).click();
    await expect(dialog).toBeHidden();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  });
}

test('reservation deep link opens the same modal from either page', async ({ page }) => {
  for (const route of ['/index.html#reserva', '/menu.html#reserva']) {
    await page.goto(route);
    await expect(page.getByRole('dialog', { name: 'RESERVA TU MESA.' })).toBeVisible();
    await expect(page.locator('form.reservation-form')).toHaveCount(1);
    await page.getByRole('button', { name: 'Cerrar reserva' }).click();
  }
});

for (const width of [390, 1440]) {
  test(`menu photos share a 4:3 frame and open uncropped at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/menu.html');
    const sizes = await page.locator('.dish-image').evaluateAll((frames) =>
      frames.map((frame) => {
        const { width, height } = frame.getBoundingClientRect();
        return { width, height };
      }),
    );
    expect(sizes).toHaveLength(66);
    expect(sizes.every((size) => Math.abs(size.width / size.height - 4 / 3) < 0.02)).toBe(true);
    expect(
      Math.max(...sizes.map((size) => size.height)) - Math.min(...sizes.map((size) => size.height)),
    ).toBeLessThan(2);
    await page.goto('/menu.html#miso-kuro');
    const trigger = page
      .locator('#miso-kuro')
      .getByRole('button', { name: 'Ver fotografía completa de Miso Kuro' });
    await trigger.click();
    const viewer = page.getByRole('dialog', { name: 'Miso Kuro', exact: true });
    await expect(viewer).toBeVisible();
    await expect(viewer.locator('img')).toHaveAttribute('src', 'Assets/carta/miso-kuro.jpg');
    await expect(viewer.locator('img')).toHaveCSS('object-fit', 'contain');
    await page.keyboard.press('Escape');
    await expect(viewer).toBeHidden();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.getByRole('button', { name: 'Cerrar fotografía' }).click();
    await expect(viewer).toBeHidden();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  });
}

test('asset entrances play once and preserve the artwork tilt', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-page-motion', 'ready');
  const photo = page.locator('.location-photo > img');
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute('data-motion-state', 'entered', { timeout: 10000 });
  expect(await photo.evaluate((element) => element.getAnimations().length)).toBe(0);
  const tilt = await page
    .locator('.location-photo')
    .evaluate((element) => getComputedStyle(element).transform);
  expect(tilt).not.toBe('none');
  await page.locator('#inicio').scrollIntoViewIfNeeded();
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute('data-motion-state', 'entered');
  expect(await photo.evaluate((element) => element.getAnimations().length)).toBe(0);
});

test('promo entrances release their styles after the image changes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Ver promoción 2: After Office' }).click();
  await expect(page.locator('.hero-photo.active')).toHaveAttribute('data-motion-state', 'entered', {
    timeout: 10000,
  });
  await expect(page.locator('.promo-headline')).toContainText('LA LAPTOP.');
  const visible = await page
    .locator('.hero-photo')
    .evaluateAll(
      (images) => images.filter((image) => Number(getComputedStyle(image).opacity) > 0.01).length,
    );
  expect(visible).toBe(1);
});

test('reduced motion keeps all assets visible without running animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/menu.html']) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('data-page-motion', 'reduced');
    await page.locator('#socio-kuro').scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () =>
          document.getAnimations().filter((animation) => animation.playState === 'running').length,
      ),
    ).toBe(0);
    expect(
      await page
        .locator('#socio-kuro .brand-art')
        .evaluate((element) => getComputedStyle(element).opacity),
    ).toBe('1');
  }
});

test('switching to reduced motion cancels running entrances safely', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-page-motion', 'ready');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-page-motion', 'reduced');
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((animation) => animation.playState === 'running').length,
    ),
  ).toBe(0);
  await expect(page.locator('.hero-photo.active')).toHaveCSS('opacity', '1');
  expect(errors).toEqual([]);
});

test('changing a promo keeps its frame visible and the previous photo underneath', async ({
  page,
}) => {
  await page.goto('/');
  const frame = page.locator('.hero-photo-frame');
  await expect(frame).toHaveAttribute('data-motion-state', 'entered', { timeout: 10000 });
  await page.getByRole('button', { name: 'Siguiente promoción' }).click();
  const minimumOpacity = await frame.evaluate(
    (element) =>
      new Promise((resolve) => {
        let samples = 0;
        let minimum = 1;
        const sample = () => {
          minimum = Math.min(minimum, Number(getComputedStyle(element).opacity));
          if (++samples < 24) requestAnimationFrame(sample);
          else resolve(minimum);
        };
        sample();
      }),
  );
  expect(minimumOpacity).toBe(1);
  await expect(frame).toHaveAttribute('data-motion-state', 'entered');
  await expect(page.locator('.hero-photo.outgoing')).toHaveCSS('opacity', '1');
});

test('filtering does not replay a photograph that remains in the results', async ({ page }) => {
  await page.goto('/menu.html#miso-kuro');
  const photo = page.locator('#miso-kuro .dish-photo-button img');
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute('data-motion-state', 'entered', { timeout: 10000 });
  await page.locator('#buscar-plato').fill('miso');
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
  await expect(photo).toHaveAttribute('data-motion-state', 'entered');
  expect(await photo.evaluate((element) => element.getAnimations().length)).toBe(0);
});
