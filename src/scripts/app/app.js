/**
 * This is the entrypoint to the JS in your app.
 * ES6 features are supported inside this file.
 */

import * as core from './core';
import example from './modules/example';

/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle everything.
 *
 */
class App {
  constructor () {
    this.core = core;
    this.example = example;
    // starts modules
    this.initModules();
  }

  /**
   *
   * @public
   * @instance
   * @method initModules
   * @memberof App
   * @description Initialize application modules.
   *
   */
  initModules () {
    this.example.init(this);
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
