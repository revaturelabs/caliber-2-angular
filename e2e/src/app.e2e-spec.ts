import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /* HEADER TESTS */
  it('should display all links', () => {
    page.navigateTo();
    expect(page.getHomeLink()).toEqual('Home');
    expect(page.getManageLink()).toEqual('Manage Batch');
    expect(page.getAssessLink()).toEqual('Assess Batch');
    expect(page.getQualityLink()).toEqual('Quality Audit');
    expect(page.getPanelLink()).toEqual('Panel');
    expect(page.getReportsLink()).toEqual('Reports');

  });

  it('should click the home link and navigate to the home page', () => {
    page.navigateTo();
    expect(page.getNavHomeLink()).toEqual('home works!');
  });

  it('should click the manage link and navigate to the manage page', () => {
    page.navigateTo();
    expect(page.getNavManageLink()).toEqual('manage works!');
  });

  it('should click the logo and navigate to the home page', () => {
    page.navigateTo();
    expect(page.getNavImgLink()).toEqual('home works!');
  });

  /* FOOTER TESTS */
  it('should click the revature.com link in the footer and return the Revature homepage', () => {
    page.navigateTo();
    expect(page.getFooterRevatureLink()).toEqual('www.revature.com');
  });
});
