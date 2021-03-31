import * as jimp from './jimp';
import * as gm from './gm';
import which from 'which';
import debug from 'debug';

import logger from '@wdio/logger'

const wlog = logger('wdio-screenshot:image')

let gmInstalled = false;

try {
  gmInstalled = !!which.sync('gm');
} catch (e) {
}

wlog.debug(`Use image processing library: ${gmInstalled ? 'GraphicsMagick' : 'Jimp'}`);

const {cropImage, mergeImages, scaleImage} = gmInstalled ? gm : jimp;
export {cropImage, scaleImage, mergeImages};
