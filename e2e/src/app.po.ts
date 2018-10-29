import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  /* FOR HEADER TESTS */
  getHomeLink() {
    return element(by.css('app-root #home-link')).getText();
  }
  getManageLink() {
    return element(by.css('app-root #manage-link')).getText();
  }
  getAssessLink() {
    return element(by.css('app-root #assess-link')).getText();
  }
  getQualityLink() {
    return element(by.css('app-root #quality-link')).getText();
  }
  getPanelLink() {
    return element(by.css('app-root #panel-link')).getText();
  }
  getReportsLink() {
    return element(by.css('app-root #reports-link')).getText();
  }

  getNavHomeLink() {
    element(by.css('app-root #home-link')).click();
    return element(by.css('app-root p')).getText();
  }

  getNavManageLink() {
    element(by.css('app-root #manage-link')).click();
    return element(by.css('app-root p')).getText();
  }

  getNavImgLink() {
    element(by.css('app-root #img-link')).click();
    return element(by.css('app-root p')).getText();
  }

  /* FOR FOOTER TESTS */

  getFooterRevature() {
   return element(by.css('app-root #footer-id'));

}
}
