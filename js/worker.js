'use strict';

self.addEventListener('message', function(event) {
  fetch(event.data)
  .then(response => response.json())
  .then(postMessage)  
}, false);