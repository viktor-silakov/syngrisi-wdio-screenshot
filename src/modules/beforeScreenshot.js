import debug from 'debug';

import scroll from '../scripts/scroll';
import scrollbars from '../scripts/scrollbars';
import removeElements from '../scripts/removeElements';
import triggerResize from '../scripts/triggerResize';
import hideElements from '../scripts/hideElements';

import logger from '@wdio/logger'

const wlog = logger('wdio-screenshot:beforeScreenshot')

export default async function beforeScreenshot(browser, options) {
  if (options.hideScrollBar === true) {
    // hide scrollbars
    wlog.debug('hide scrollbars');
    await browser.execute(scrollbars, false);
  }


  wlog.debug('trigger resize event to allow js components to resize properly');
  await browser.execute(triggerResize);

  // hide elements
  if (Array.isArray(options.hide) && options.hide.length) {
    wlog.debug('hide the following elements: %s', options.hide.join(', '));

    for (let i = 0; i < options.hide.length; i++) {
      let elements = await browser.$$(options.hide[i]);
      await browser.execute(hideElements, elements, true);
    }
  }

  // TODO
  // remove elements
  if (Array.isArray(options.remove) && options.remove.length) {
    wlog.debug('remove the following elements: %s', options.remove.join(', '));

    for (let i = 0; i < options.remove.length; i++) {
      let elements = await browser.$$(options.remove[i]);
      await browser.execute(removeElements, elements, true);
    }
  }

  // scroll back to start
  const x = 0;
  const y = 0;
  wlog.debug('scroll back to start x: %s, y: %s', x, y);
  await browser.execute(scroll, x, y);

  // wait a bit for browser render
  const pause = 200;
  wlog.debug('wait %s ms for browser render', pause);
  await browser.pause(pause);
}
