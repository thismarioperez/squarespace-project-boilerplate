import $ from 'properjs-hobo';
import config from './config';

/**
 * @public
 * @namespace dom
 * @memberof core
 * @description Holds high-level cached nodes.
 *
 */
const dom = {
  /**
   *
   * @public
   * @member doc
   * @memberof core.dom
   * @description the cached document element
   *
   */
  doc: $( document ),


  /**
   *
   * @public
   * @member html
   * @memberof core.dom
   * @description the cached documentElement node
   *
   */
  html: $( document.documentElement ),


  /**
   *
   * @public
   * @member body
   * @memberof core.dom
   * @description the cached body node
   *
   */
  body: $( document.body ),


  /**
   *
   * @public
   * @member header
   * @memberof core.dom
   * @description the cached header node
   *
   */
  header: $( config.headerSelector ),


  /**
   *
   * @public
   * @member main
   * @memberof core.dom
   * @description the cached main node
   *
   */
  main: $( config.mainSelector ),


  /**
   *
   * @public
   * @member footer
   * @memberof core.dom
   * @description the cached footer node
   *
   */
  footer: $( config.footerSelector),
};

export default dom;