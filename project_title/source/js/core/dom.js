
/**
 * @public
 * @namespace dom
 * @memberof core
 * @description Holds high-level cached nodes.
 *
 */
const dom = {
  /**
   * @public
   * @member doc
   * @memberof core.dom
   * @description the cached document element
   */
  doc: document,

  /**
   * @public
   * @member html
   * @memberof core.dom
   * @description the cached documentElement node
   */
  html: document.documentElement,

  /**
   * @public
   * @member body
   * @memberof core.dom
   * @description the cached body node
   */
  body: document.body,

  /**
   * @public
   * @member app
   * @memberof core.dom
   * @description the cached app node
   */
  app: document.getElementById('app')
};

export default dom;