import debug from 'debug';

import makeAreaScreenshot from './makeAreaScreenshot';
import beforeScreenshot from './beforeScreenshot';
import afterScreenshot from './afterScreenshot';

import groupBoundingRect from '../utils/groupBoundingRect';
import getBoundingRects from '../scripts/getBoundingRects';

import logger from '@wdio/logger'

const wlog = logger('wdio-screenshot:makeElementScreenshot')


export default async function makeElementScreenshot(browser, elementSelector, options = {}) {
  //wlog.debug('start element screenshot');
  wlog.debug('start element screenshot')

  // hide scrollbars, scroll to start, hide & remove elements, wait for render
  await beforeScreenshot(browser, options);

  // get bounding rect of elements

  const elements = await browser.$$(elementSelector);
  const boundingRects = await browser.execute(getBoundingRects, elements);

  const boundingRect = groupBoundingRect(boundingRects);

  // make screenshot of area
  const base64Image = await makeAreaScreenshot(browser, boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom);

  // show scrollbars, show & add elements
  await afterScreenshot(browser, options);

  wlog.debug('end element screenshot');

  return base64Image;
}
