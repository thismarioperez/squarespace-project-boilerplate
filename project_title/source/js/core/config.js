/**
 * @description Declare app wide config variables
 * @member {object} config
 * @memberof core
 */
const config = {
  /**
   *
   * @public
   * @member prod
   * @memberof core.config
   * @description The node environment production variable string.
   *
   */
  prod: 'production',


  /**
   *
   * @public
   * @member dev
   * @memberof core.config
   * @description The node environment development variable string.
   *
   */
  dev: 'development',


  /**
   *
   * @public
   * @member headerSelector
   * @memberof core.config
   * @description The string selector used for <header> node.
   *
   */
  headerSelector: '.js-header',


  /**
   *
   * @public
   * @member mainSelector
   * @memberof core.config
   * @description The string selector used for <main> node.
   *
   */
  mainSelector: '.js-main',


  /**
   *
   * @public
   * @member footerSelector
   * @memberof core.config
   * @description The string selector used for <footer> node.
   *
   */
  footerSelector: '.js-footer',
};

export default config;