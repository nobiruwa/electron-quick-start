/* global global:false, require:false, __dirname:false, module:false */
const Application = require("spectron").Application;
const path = require('path');
const process = require('process');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const spectronFakeMenu = require('spectron-fake-menu');

function findElectronPath() {
  return path.join(__dirname, '..', '..', '..', 'node_modules', '.bin', 'electron');
}

function findEntryPath() {
  return path.join(__dirname, '..', '..', '..', 'src', 'main-process', 'main.js');
}

function openApp(args = []) {
  let electronPath = findElectronPath();
  let entryPath = findEntryPath();

  args.push(entryPath);

  if (process.platform === 'win32') {
    electronPath += '.cmd';
  }

  let app = new Application({
    path: electronPath,
    args: args,
  });

  spectronFakeMenu.apply(app);

  return app;
}

global.before(() => {
  chai.should();
  chai.use(chaiAsPromised);
});

module.exports = {
  openApp,
};
