import debug from 'debug';

import MergeViewportStrategy from './strategies/MergeScreenshotStrategy';
import MergeViewportStrategyVP from './strategies/MergeScreenshotStrategyVP';
import TrimAndMergeViewportStrategy from './strategies/TrimAndMergeScreenshotStrategy';
import FullpageScreenshotStrategy from './strategies/FullpageScreenshotStrategy';

const regexFirefox = /firefox/i;
const regexPhantomjs = /phantomjs/i;

const log = debug('wdio-screenshot:ScreenshotStrategyManager');

function matchBrowserName(browser, regex) {
  return browser.desiredCapabilities && browser.desiredCapabilities.browserName && regex.test(browser.desiredCapabilities.browserName);
}

function isPhantomjs(browser) {
  return matchBrowserName(browser, regexPhantomjs);
}


export default class ScreenshotStrategyManager {

  static getStrategy(browser, screenDimensions, options = {}) {
    if (isPhantomjs(browser)) {
      log('use full page strategy')
      return new FullpageScreenshotStrategy(screenDimensions);
    }

    const {isIOS} = browser;
    if (isIOS) {
      log('use iOS Trim and Merge viewport strategy')
      return new TrimAndMergeViewportStrategy(screenDimensions);
    }

    if (options["viewport"]) {
      log('use merge viewport strategy for VP')
      return new MergeViewportStrategyVP(screenDimensions);
    }

    log('use merge viewport strategy')
    return new MergeViewportStrategy(screenDimensions);
  }

}
