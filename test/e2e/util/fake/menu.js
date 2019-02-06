/* global require:false, module:false */
const spectronFakeMenu = require('spectron-fake-menu');

/**
 * @description メニューをクリックする操作を擬似的に再現します。
 */
class FakeMenu {
  constructor(app /* rootElement rootSelector */) {
    this.app = app;
  }

  /**
   * @description 設定ダイアログを開きます。
   */
  async openConfigurationDialog(configuration) {
    // メニューとサブメニューのラベルを引数に
    // メニューを疑似的にクリックする
    spectronFakeMenu.clickMenu('Open', 'Dialog');
  }
}

module.exports = (app) => {
  return new FakeMenu(app);
};
