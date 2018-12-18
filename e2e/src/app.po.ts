import { browser, by, element } from 'protractor';

const viewABatchUrl = '';
const buttonToOpenViewTraineesModal = '';

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
    return element(by.css('app-root #footer-id')).getText();
  }
}

export class ViewTraineesInBatchPage {
  navigateTo() {
    return browser.get('/' + viewABatchUrl);
  }

  getPopupTraineesinBatchModalH4() {
    element(by.css('app-root .glyphicon-user')).click();
    return element(by.css('app-root h4')).getText();
  }

  getAnAddTraineeModal() {
    element(by.id('modalButton')).click();
    browser.sleep(3000);
    element(by.id('addTraineeButton')).click();
    browser.sleep(3000);
    return element(by.id('addTraineeHeader')).getText();
  }

  getATraineeCommentForm() {
    element(by.id('modalButton')).click();
    browser.sleep(3000);
    element.all(by.css('app-root td')).first().click();
    browser.sleep(3000);
    return element.all(by.css('app-root td form input')).first().getAttribute('placeholder');
  }

  getATraineeUpdateForm() {
    element(by.id('modalButton')).click();
    browser.sleep(3000);
    element.all(by.css('app-root .glyphicon-pencil')).first().click();
    browser.sleep(3000);
    return element(by.css('app-root #updateTraineeHeader')).getText();
  }

  getATraineeDeleteForm() {
    element(by.id('modalButton')).click();
    browser.sleep(3000);
    element.all(by.css('app-root .glyphicon-remove')).first().click();
    browser.sleep(3000);
    return element(by.css('app-root #deleteTraineeHeader')).getText();
  }
}
