/**
 * @public
 * @module util
 * @description App-wide utility methods
 */
import { ImageLoader } from '@squarespace/core';

/**
 * @public
 * @method loadImages
 * @param  {[array]} images An array of image elements to load
 */
const loadImages = (images) => {
  images.forEach((image) => {
    ImageLoader.load(image, { load: true });
  });
};

/**
 *
 * @description Module isElementInViewport method, handles element boundaries
 * @method isElementInViewport
 * @param {object} el The DOMElement to check the offsets of
 * @memberof util
 * @returns {boolean}
 *
 */
const isElementInViewport = (el) => {
  if (el) {
    const bounds = el.getBoundingClientRect();

    return (bounds.top < window.innerHeight && bounds.bottom > 0);
  }
};

export {
  loadImages,
  isElementInViewport
};
