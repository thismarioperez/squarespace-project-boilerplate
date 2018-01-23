import EventEmitter from 'eventemitter3';

/**
 *
 * @name emitter
 * @description A singleton instance of eventemitter3 for use in the app.
 */
const emitter = new EventEmitter();

export default emitter;