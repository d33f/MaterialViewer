import { Angular2MaterialDesignPage } from './app.po';

describe('angular2-material-design App', () => {
  let page: Angular2MaterialDesignPage;

  beforeEach(() => {
    page = new Angular2MaterialDesignPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
