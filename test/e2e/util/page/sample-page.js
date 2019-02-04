/* global module:false */

/**
 * @description ページオブジェクトの作り方を説明するためのクラスです。
 * 画面に対する操作を再利用しましょう。
 */
class TestPage {
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

  /**
   * @description getで始まるメソッドはrenderer-process内の情報を種痘します。
   * Spectronを使ったコ=ドは基本的に非同期です。よって、
   * asyncキーワードが必要です。
   */
  async getWindowCount() {
    return await this.app.client.element('//body').getWindowCount();
  }

  /**
   * @description findで始まるメソッドはElementを取得します。
   * Spectronを使ったコ=ドは基本的に非同期です。よって、
   * asyncキーワードが必要です。
   */
  async findChildrenCount(selector) {
  }
  async assertWindowCount() {
    return this.getWindowCount().should.eventually.equal(this.windowCount);
  }
}

module.exports = (app) => {
  return new TestPage(app);
};
