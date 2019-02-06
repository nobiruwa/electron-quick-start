/* global global:false, require:false, __dirname:false */
/* global describe:false, after:false, afterEach:false, before:false, beforeEach:false, it:false */
const openApp = require('./util/common.js').openApp;
const CommonManipulation = require('./util/common-manipulation.js');
const SamplePage = require('./util/page/sample-page.js');

const moment = require('moment');

function now() {
  return moment(new Date()).format('YYYYMMDDHHmmssSSS');
}

global.before(() => {
  CommonManipulation.makeTraceDirectory(now());
});

describe('Test Example', () => {
  // 存在するウィンドウのなかでの一時的なインデックス
  // 開いた順に0, 1, 2, ...となっていると思われる
  const MAIN_WINDOW = 0;
  const CHILD_WINDOW = 1;
  let app;

  before(() => {
    app = openApp();
  });

  // asyncを付けるか付けないかは、内側のコードブロックで
  // awaitキーワードを使っているか否かで決まる
  beforeEach(async () => {
    // ユニットテストではdone()を呼んだり
    // Promiseをreturnしたりしていたが、
    // E2Eテストでは大量の非同期操作をシーケンスに
    // 呼び出すよう、awaitを用いる
    await app.start();

    // ほとんどのテストケースにおいて、
    // 事前にツールの設定を変更しておく必要があると思われる
    // 設定ダイアログ自体あるいは設定ダイアログと
    // 親ウィンドウの間の処理がテスト観点であるテストグループに対しては、
    // before/beforeEachからこの呼び出しを削除する
    await CommonManipulation(app).setConfiguration(
      [
        'value 1',
        'value 2',
        'value 3',
        'value 4',
      ],
    );
  });

  afterEach(async () => {
    await app.stop();
  });

  it('モーダルダイアログのrenderer-processに対する操作ができること', async function() {
    // 画面に表れる情報を取得し、アサートを掛ける
    // asyncキーワードを付けたメソッドで取得した値は
    // Promiseに包まれて返却される
    // Promiseはchai-as-promisedによりchaiのexpect APIを持つようになるため、
    // should.eventually.deep.equalなどのAPIを使える
    // async関数の内側ならawaitキーワードを付けることで
    // mochaがエラーをキャッチできる
    await SamplePage(app).getFieldValues().should.eventually.deep.equal(
      [
        'value 1',
        'value 2',
        'value 3',
        'value 4',
      ],
    );

    await CommonManipulation(app).capturePage(
      'sample-page', this.test.title, '事後.png',
    );
  });
});
