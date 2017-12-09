import { JobiPage } from './app.po';

describe('jobi App', () => {
  let page: JobiPage;

  beforeEach(() => {
    page = new JobiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
