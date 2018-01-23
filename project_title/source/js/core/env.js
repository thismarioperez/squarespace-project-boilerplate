import dom from './dom';
const DEV = 'development';
const PROD = 'production';
const IS_PRODUCTION = process.env.NODE_ENV === PROD;
const IS_AUTHENTICATED = dom.html.hasAttribute('data-authenticated-account');

/**
 *
 * @public
 * @namespace env
 * @memberof core
 * @description Set the app environment.
 *
 */
const env = {
  /**
   *
   * @member DEV
   * @memberof core.env
   * @description The development environment CONST.
   *
   */
  DEV: DEV,

  /**
   *
   * @member PROD
   * @memberof core.env
   * @description The production environment CONST.
   *
   */
  PROD: PROD,

  /**
   *
   * @member ENV
   * @memberof core.env
   * @description The applied environment ref.
   *
   */
  ENV: (process === 'undefined' || IS_PRODUCTION) ? PROD : DEV,

  /**
   *
   * @method isDev
   * @memberof core
   * @description Returns the dev mode status.
   * @returns {boolean}
   *
   */
  isDev () {
    return (this.ENV === DEV);
  },

  /**
   *
   * @method isProd
   * @memberof core
   * @description Returns the dev mode status.
   * @returns {boolean}
   *
   */
  isProd () {
    return (this.ENV === PROD);
  },

  /**
   *
   * @method isAuth
   * @memberof core
   * @description Returns authenticated account status.
   * @returns {boolean}
   *
   */
  isAuth () {
    return ((IS_AUTHENTICATED && this.isDev()) || (!IS_AUTHENTICATED)) ? false : true;
  }
};

export default env;