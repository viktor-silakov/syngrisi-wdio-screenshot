import debug from 'debug';

import MergeViewportStrategy from './strategies/MergeScreenshotStrategy';
import MergeViewportStrategyVP from './strategies/MergeScreenshotStrategyVP';
import TrimAndMergeViewportStrategy from './strategies/TrimAndMergeScreenshotStrategy';
import FullpageScreenshotStrategy from './strategies/FullpageScreenshotStrategy';

const regexFirefox = /firefox/i;
const regexPhantomjs = /phantomjs/i;

import logger from '@wdio/logger'

const wlog = logger('wdio-screenshot:ScreenshotStrategyManager')

function matchBrowserName(browser, regex) {
  return browser.desiredCapabilities && browser.desiredCapabilities.browserName && regex.test(browser.desiredCapabilities.browserName);
}

function isPhantomjs(browser) {
  return matchBrowserName(browser, regexPhantomjs);
}


export default class ScreenshotStrategyManager {

  static getStrategy(browser, screenDimensions, options = {}) {
    if (isPhantomjs(browser)) {
      wlog.debug('use full page strategy')
      return new FullpageScreenshotStrategy(screenDimensions);
    }

    const {isIOS} = browser;
    if (isIOS) {
      wlog.debug('use iOS Trim and Merge viewport strategy')
      return new TrimAndMergeViewportStrategy(screenDimensions);
    }

    if (options["viewport"]) {
      wlog.debug('use merge viewport strategy for VP')
      return new MergeViewportStrategyVP(screenDimensions);
    }

    wlog.debug('use merge viewport strategy')
    return new MergeViewportStrategy(screenDimensions);
  }

}
