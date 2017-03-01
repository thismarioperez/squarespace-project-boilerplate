import $ from 'jquery/dist/jquery.slim'; // use slim version of jquery
// import $ from 'jquery/dist/jquery';

/**
 *
 * @public
 * @module core.dom
 * @description Houses app-wide high-level cached DOM nodes.
 *
 */
const dom = {
  /**
   *
   * @public
   * @member doc
   * @memberof dom
   * @description The cached document node.
   *
   */
  doc: $(document),

  /**
   *
   * @public
   * @member win
   * @memberof dom
   * @description The cached window node.
   *
   */
  win: $(window),

  /**
   *
   * @public
   * @member html
   * @memberof dom
   * @description The cached documentElement node.
   *
   */
  html: $(document.documentElement),

  /**
   *
   * @public
   * @member body
   * @memberof dom
   * @description The cached body node.
   *
   */
  body: $(document.body)
};

/******************************************************************************
 * Export
*******************************************************************************/
export default dom;
