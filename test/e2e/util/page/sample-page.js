/* global module:false */

/**
 * @description ページオブジェクトの作り方を説明するためのクラスです。
 * 画面に対する操作を再利用しましょう。
 */
class SamplePage {
  /**
   * @description コンストラクタの先頭にはSpectronのappを渡します。
   * 
   * 追加で操作するDOMの範囲を絞るための引数があってもよいです。
   */
  constructor(app /* rootElement rootSelector */) {
    this.app = app;
  }

  /**
   * @description 定数はプロパティとして定義します。
   */
  get listItemCount() {
    return 10;
  }

  /**
   * @description リストのセレクタIDです。セレクタはどんどんプロパティ化しましょう。
   */
  get firstList() {
    return '#list-2';
  }

  /**
   * @description リストのセレクタIDです。セレクタはどんどんプロパティ化しましょう。
   */
  get firstList() {
    return '#list-1';
  }

  get fields() {
    return [
      '[name=field-1]',
      '[name=field-2]',
      '[name=field-3]',
      '[name=field-4]',
    ];
  }

  /**
   * @description getで始まるメソッドはrenderer-process内の情報を種痘します。
   * Spectronを使ったコードは基本的に非同期です。よって、
   * asyncキーワードが必要です。
   */
  async getWindowCount() {
    return await this.app.client.getWindowCount();
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

  /**
   * @description findで始まるメソッドはElementを取得します。
   * Spectronを使ったコードは基本的に非同期です。よって、
   * asyncキーワードが必要です。
   */
  async findChildrenCount(selector) {
  }

  async assertWindowCount() {
    return this.getWindowCount().should.eventually.equal(this.windowCount);
  }
}

module.exports = (app) => {
  return new SamplePage(app);
};
