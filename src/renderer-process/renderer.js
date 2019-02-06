// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
/* global module:false */
const { ipcRenderer } = require('electron');

let configuration = {};

function renderConfiguration(newConfiguration) {
  document.querySelector('[name=field-1]').value = newConfiguration.field1;
  document.querySelector('[name=field-2]').value = newConfiguration.field2;
  document.querySelector('[name=field-3]').value = newConfiguration.field3;
  document.querySelector('[name=field-4]').value = newConfiguration.field4;
}


function updateConfiguration(newConfiguration) {
  configuration = newConfiguration;
  renderConfiguration(configuration);
}


// Consume data from other renderer process.
ipcRenderer.on('pass-data-renderers', (window, eventArgs) => {
  if (eventArgs.type === 'updateConfiguration') {
    updateConfiguration(eventArgs.args);
  }
});

function appendParagraph(text) {
  const p = document.createElement('p');
  p.innerHTML = text;
  document.body.appendChild(p);
}

module.exports = {
  appendParagraph,
};
