/* global global:false, require:false, __dirname:false */
/* global describe:false, after:false, afterEach:false, before:false, beforeEach:false, it:false */
const openApp = require('./util/common.js').openApp;
const spectronFakeMenu = require('spectron-fake-menu');
const SamplePage = require('./util/page/sample-page.js');
const FakeMenu = require('./util/fake/menu.js');

let app = openApp();

describe('Test Example', () => {
  beforeEach(() => {
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it('モーダルダイアログのrenderer-processに対する操作ができること', async () => {

    await FakeMenu(app).setConfigurationOnModalDialog(
      [
        'value 1',
        'value 2',
        'value 3',
        'value 4',
      ],
    );

    await SamplePage(app).getFieldValues().should.eventually.deep.equal(
      [
        'value 1',
        'value 2',
        'value 3',
        'value 4',
      ],
    );
  });
});
