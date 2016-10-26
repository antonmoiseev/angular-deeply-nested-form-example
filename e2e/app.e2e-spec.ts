import { FormArraysPage } from './app.po';

describe('form-arrays App', function() {
  let page: FormArraysPage;

  beforeEach(() => {
    page = new FormArraysPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
