// Use the sqs-core module to access core Squarespace
// functionality, like Lifecycle and ImageLoader. For
// full documentation, go to:
//
// http://github.com/squarespace/squarespace-core

const ImageLoader = require('@squarespace/core/imageLoader');

window.addEventListener('DOMContentLoaded', function() {

  let images = document.querySelectorAll('img[data-src]');

  for (let i = 0; i < images.length; i++) {
    ImageLoader.load(images[i], {
      load: true
    });
  }

});
