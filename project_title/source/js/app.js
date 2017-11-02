require( '../less/screen.less' );

import * as core from './core';

/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle it ALL.
 *
 */
class App {
  constructor() {
    this.core = core;

    this.bindEvents();
    this.initModules();
  }

  /**
   *
   * @public
   * @instance
   * @method initModules
   * @memberof App
   * @description Initialize modules.
   *
   */
  initModules() {
    let images = document.querySelectorAll('img[data-src]');
    core.util.loadImages(images);
  }

  /**
   *
   * @public
   * @instance
   * @method bindEvents
   * @memberof App
   * @description Bind top-level app events.
   *
   */
  bindEvents() {
    window.addEventListener('resize', function() {
      let images = document.querySelectorAll('img[src]');
      core.util.loadImages(images);
    });
  }
}

/******************************************************************************
 * Expose
*******************************************************************************/
window.app = new App();


/******************************************************************************
 * Export
*******************************************************************************/
export default window.app;
