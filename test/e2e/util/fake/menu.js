/* global require:false, module:false */
const MAIN_WINDOW = 0;
const CHILD_WINDOW = 1;
const spectronFakeMenu = require('spectron-fake-menu');
const ConfigurationDialogPage = require('../page/configuration-dialog-page.js');

class FakeMenu {
  constructor(app /* rootElement rootSelector */) {
    this.app = app;
  }

  async setConfigurationOnModalDialog(configuration) {
    spectronFakeMenu.clickMenu('Open', 'Dialog');
    await this.app.client.waitUntilWindowLoaded(1000);
    await this.app.client.windowByIndex(CHILD_WINDOW);
    await ConfigurationDialogPage(this.app).updateFieldValues(
      configuration,
    );
    await ConfigurationDialogPage(this.app).close();
    await this.app.client.windowByIndex(MAIN_WINDOW);
  }
}

module.exports = (app) => {
  return new FakeMenu(app);
};
