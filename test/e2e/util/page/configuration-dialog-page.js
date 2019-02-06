/* global module:false */

/**
 * @description ページオブジェクトの作り方を説明するためのクラスです。
 * 画面に対する操作を再利用しましょう。
 */
class ConfigurationDialogPage {
  /**
   * @description コンストラクタの先頭にはSpectronのappを渡します。
   *
   * 追加で操作するDOMの範囲を絞るための引数があってもよいです。
   */
  constructor(app /* rootElement rootSelector */) {
    this.app = app;
  }

  get fields() {
    return [
      '[name=field-1]',
      '[name=field-2]',
      '[name=field-3]',
      '[name=field-4]',
    ];
  }

  get closeButton() {
    return '#close';
  }

  async getFieldValue(selector) {
    return this.app.client.getValue(selector);
  }

  async getFieldValues() {
    const actions = this.fields.map((selector, i) => {
      return this.getFieldValue.call(this, selector);
    });
    return Promise.all(
      actions,
    );
  }

  async updateFieldValue(selector, newValue) {
    return this.app.client.setValue(selector, newValue);
  }

  async updateFieldValues(newValues) {
    const actions = this.fields.map((selector, i) => {
      const newValue = newValues[i];
      return this.updateFieldValue.call(this, selector, newValue);
    });
    const result = await Promise.all(
      actions,
    );
  }

  async close() {
    await this.app.client.element(this.closeButton).click();
  }
}

module.exports = (app) => {
  return new ConfigurationDialogPage(app);
};
