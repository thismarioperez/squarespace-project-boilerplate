import dom from './dom';
import log from './log';


/**
 *
 * @public
 * @namespace detect
 * @memberof core
 * @description Handles basic detection of touch devices.
 *
 */
const detect = {
  /**
   *
   * @public
   * @method init
   * @memberof core.detect
   * @description Initializes the detect module.
   *
   */
  init() {
    this._isTouch = ('ontouchstart' in window || 'DocumentTouch' in window);
    this._isMobile = (/Android|BlackBerry|iPhone|iPad|iPod|IEMobile|Opera Mini/gi.test(window.navigator.userAgent));

    // Touch support mode
    if (this._isTouch) {
      dom.html.classList.add('is-touchable');

      // Mouse support mode
    } else {
      dom.html.classList.add('is-hoverable');
    }

    log('detect: initialized');
  },

  /**
   *
   * @public
   * @method isMobile
   * @memberof core.detect
   * @description Check for high-end mobile device user agents.
   * @returns {boolean}
   *
   */
  isMobile() {
    return this._isMobile;
  },

  /**
   *
   * @public
   * @method isTouch
   * @memberof core.detect
   * @description Check whether this is a touch device or not.
   * [See Modernizr]{@link https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js}
   * @returns {boolean}
   *
   */
  isTouch() {
    return this._isTouch;
  },

  /**
   *
   * @public
   * @method isDevice
   * @memberof core.detect
   * @description Must be `isMobile` and `isTouch`.
   * @returns {boolean}
   *
   */
  isDevice() {
    return (this._isTouch && this._isMobile);
  }
};

export default detect;