import { expect, test } from '@playwright/test';
import {findContainer, rebootPlay, startContainer, stopContainer, stopPlay} from './utils/containers';
import { login } from './utils/roles';

test.setTimeout(180_000);
test.describe('Connection', () => {
  test('can succeed even if WorkAdventure starts while pusher is down', async ({ page }) => {
    await page.goto(
      'http://play.workadventure.localhost/_/global/maps.workadventure.localhost/tests/mousewheel.json'
    );

    await login(page);

    // Let's stop the play container
    await stopPlay();
    //const container = await findContainer('pusher');
    //await stopContainer(container);

    await expect(page.locator('.errorScreen p.code')).toContainText('CONNECTION_');
    //await expect(page.locator('.error-div')).toContainText('Unable to connect to WorkAdventure');

    //await page.goto('http://play.workadventure.localhost/_/global/maps.workadventure.localhost/tests/mousewheel.json');
    //await expect(page.locator('.error-div')).toContainText('Unable to connect to WorkAdventure');
    //await expect(page.locator('.errorScreen p.code')).toContainText('HTTP_ERROR');

    //await startContainer(container);
    await rebootPlay();

    //await page.goto('http://play.workadventure.localhost/_/global/maps.workadventure.localhost/tests/mousewheel.json');
    await expect(page.locator("button#menuIcon")).toBeVisible({
      timeout: 180_000
    });
  });
});
