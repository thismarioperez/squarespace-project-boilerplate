// This is a module using an object literal pattern.
// It's an easy way to organize your custom JavaScript into modules with methods.

import * as core from '../core';
// Here's jQuery in case you need it. If you're just doing DOM manipulation, you
// probably won't need it. Recommend using core.dom module to handle node caching.
// import $ from 'jquery/dist/jquery';

let $jsElements = null;

/**
 *
 * @public
 * @module example
 * @description An example hook module.
 *
 */
const example = {
  /**
   *
   * @public
   * @method init
   * @memberof example
   * @description Method runs once when window loads.
   *
   */
  init () {
    if (this.isActive()) {
      initElement();
    }
    // console.log( "example module: initialized" );
  },

  /**
   *
   * @public
   * @method isActive
   * @memberof example
   * @description Method informs of active status.
   * @returns {boolean}
   *
   */
  isActive () {
    return (this.getElements() > 0);
  },

  /**
   *
   * @public
   * @method unload
   * @memberof example
   * @description Method performs unloading actions for this module.
   *
   */
  unload () {
    // Typically unloading and tearing down isn't required unless you're
    // using a complete AJAX Squarespace website that functions like
    // a single page application.
    this.teardown();
  },

  /**
   *
   * @public
   * @method teardown
   * @memberof example
   * @description Method performs cleanup after this module. Removes events, null vars etc...
   *
   */
  teardown () {
    $jsElements = null;
  },

  /**
   *
   * @public
   * @method getElements
   * @memberof example
   * @description Method queries DOM for this modules node.
   * @returns {number}
   *
   */
  getElements () {
    $jsElements = core.dom.body.find('.js-element');

    return ($jsElements.length);
  }
};

/**
 *
 * @private
 * @method execElement
 * @memberof example
 * @description Handles execution of something.
 * @param {jQuery} $element The element.
 *
 */
const execElement = function ($element) {
  // Grab some data from $el.
  const elementData = $element.data();

  // Misc:
  console.log(`Look ma, there's an element, and its data attributes!`);
  console.log($element);
  console.log(elementData);
};

/**
 *
 * @private
 * @method initElement
 * @memberof example
 * @description This module would do something with your elements.
 *
 */
const initElement = function () {
  const $notLoaded = $jsElements.not('.is-initialized');
  let $element = null;
  let i = $notLoaded.length;

  for (i; i--;) {
    $element = $jsElements.eq(i);

    $element.addClass('is-initialized');

    execElement($element);
  }
};

/******************************************************************************
 * Export
*******************************************************************************/
export default example;
