/* global module:false, require:false */

// 複数のページオブジェクトをまたがる操作を共通化するモジュールです
// テスト項目とは関係ない操作をこのモジュールの関数で完了させるとよいでしょう
// 以下のような処理が考えられる
// 1. 証跡保存フォルダを変更(し存在しなければ作成)する処理
// 2. スクリーンショットを撮影し証跡保存フォルダに保存する処理
//    - lと{ DOM要素 | セレクタ }を引数としてスクリーンショットを保存する
// 3. VUTパーツを保存し、なおかつ証跡保存フォルダにコピーする処理
//
// 2と3の共通の引数としてmoduleNameとsubDirectoryNameとfileNameとする
// <moduleName>/<subDirectoryName>/<fileName>という階層にファイルを保存する

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const FakeMenu = require('./fake/menu.js');
const ConfigurationDialogPage = require('./page/configuration-dialog-page.js');

const traceRootDirectory = path.join('..', '..', '..', 'report', 'e2e', 'trace');

// 存在するウィンドウのなかでの一時的なインデックス
// 開いた順に0, 1, 2, ...となっていると思われる
const MAIN_WINDOW = 0;
const CHILD_WINDOW = 1;

function makeDirectory(dir) {
  shell.mkdir('-p', dir);
}

let traceDirectory;

class CommonManipulation {
  constructor(app) {
    this.app = app;
    this.traceDirectory = traceDirectory;
  }

  static makeTraceDirectory(now) {
    traceDirectory = path.join(
      traceRootDirectory,
      `trace-${now},`
    );
    makeDirectory(traceDirectory);
  }

  /**
   * @description スクリーンショットを撮影します。
   * rendererプロセスが持つページ(DOM要素)のみを撮影できます。
   */
  async capturePage(moduleName, subDirectoryName, fileName, /* selector */) {
    const dirPath = path.join(
      this.traceDirectory,
      moduleName,
      subDirectoryName,
    );
    makeDirectory(dirPath);

    const filePath = path.join(dirPath, fileName);

    return this.app.browserWindow.capturePage().then(
      imageBuffer => fs.writeFile(filePath, imageBuffer),
    );
  }
  /**
   * @description ツールの設定を設定します。
   */
  async setConfiguration(newConfiguration) {
    // メソッドがasync宣言しているか、
    // Promiseを返すことが分かっている場合にawaitキーワードを付ける
    // awaitキーワードを忘れると、後続の処理が並列に実行される
    await FakeMenu(this.app).openConfigurationDialog();

    // E2Eテストでは、操作の合間に状態が遷移するまでwaitする必要がしばしば生じる
    // さらにE2Eテストでは、APIで明示的に子ウィンドウをフォーカスに移動させる必要がある
    // ここではSpectronのAPIで上記2ステップを行っている
    await this.app.client
      .waitUntilWindowLoaded(1000)
      .windowByIndex(CHILD_WINDOW);

    // 設定ダイアログ内のrendererプロセスを操作するページオブジェクトを作成
    const dialogPage = ConfigurationDialogPage(this.app);

    // 設定ダイアログを操作し、OKボタンを押す
    await dialogPage.updateFieldValues(
      [
        'value 1',
        'value 2',
        'value 3',
        'value 4',
      ],
    );
    await dialogPage.ok();

    // 設定した内容が正しい場合は設定ダイアログが閉じるはず
    // 親ウィンドウにフォーカスを戻す
    await this.app.client.windowByIndex(MAIN_WINDOW);
  }
}

function factory(app) {
  return new CommonManipulation(app);
}

factory.makeTraceDirectory = CommonManipulation.makeTraceDirectory;

module.exports = factory;
