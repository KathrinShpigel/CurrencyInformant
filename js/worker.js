'use strict';

self.addEventListener('message', function(event) {
  fetch(event.data)
  .then(response => response.json())
  .then(data => {
    return data.filter(el=>Number(el.Cur_DateEnd.slice(0,4)) >= 2020);
  })
  .then(postMessage)  
}, false);