/* global global:false, require:false, __dirname:false */
/* global describe:false, after:false, afterEach:false, before:false, beforeEach:false, it:false */
const openApp = require('./util/common.js').openApp;
const TestPage = require('./util/page/test-page.js');

let app = openApp();
let page = TestPage(app);

describe('Test Example', () => {
  beforeEach(() => {
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it('opens a window', () => {
    return page.getWindowCount().should.eventually.equal(page.windowCount);
  });

  it('opens a window', () => {
    return page.assertWindowCount();
  });
});
