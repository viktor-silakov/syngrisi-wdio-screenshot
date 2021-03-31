import debug from 'debug';

import scrollbars from '../scripts/scrollbars';
import removeElements from '../scripts/removeElements';
import hideElements from '../scripts/hideElements';

import logger from '@wdio/logger'

const wlog = logger('wdio-screenshot:afterScreenshot')

export default async function afterScreenshot(browser, options) {
  // show elements
  if (Array.isArray(options.hide) && options.hide.length) {
    wlog.debug('show the following elements again: %s', options.hide.join(', '));


    for (let i = 0; i < options.hide.length; i++) {
      let elements = await browser.$$(options.hide[i]);
      await browser.execute(hideElements, elements, false);
    }
  }

  // add elements again
  if (Array.isArray(options.remove) && options.remove.length) {
    wlog.debug('add the following elements again: %s', options.remove.join(', '));

    for (let i = 0; i < options.remove.length; i++) {
      let elements = await browser.$$(options.remove[i]);
      await browser.execute(removeElements, elements, false);
    }
  }

  // show scrollbars
  wlog.debug('show scrollbars again');
  await browser.execute(scrollbars, true);
}
