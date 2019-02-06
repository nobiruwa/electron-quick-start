const { ipcRenderer, remote } = require('electron');

let okButton = document.getElementById('ok');
let cancelButton = document.getElementById('cancel');

function onOkButtonClick() {
  const window = remote.getCurrentWindow();
  ipcRenderer.send('pass-data-renderers', {
    from: 'childWindow',
    to: 'mainWindow',
    type: 'updateConfiguration',
    args: {
      field1: document.querySelector('[name=field-1]').value,
      field2: document.querySelector('[name=field-2]').value,
      field3: document.querySelector('[name=field-3]').value,
      field4: document.querySelector('[name=field-4]').value,
    },
  });
  window.close();
}

function onCancelButtonClick() {
  const window = remote.getCurrentWindow();
  window.close();
}

okButton.addEventListener('click', onOkButtonClick);
cancelButton.addEventListener('click', onCancelButtonClick);
