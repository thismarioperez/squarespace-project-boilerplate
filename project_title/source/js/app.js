require( '../sass/screen.scss' );

import * as core from './core';

const loadImages = () => {
  let images = document.querySelectorAll('img[data-src]');
  core.util.loadImages(images);
};

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
    // Log environment
    this.core.log('App:env:' + this.core.env.ENV);

    // core
    this.core.detect.init();

    // utility

    // misc/test
    loadImages();

    // Log when finished
    this.core.log('App: modules initialized');
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
    window.addEventListener('resize', loadImages);
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
