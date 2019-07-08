import { browser, by, element } from 'protractor';

const viewReportsURL = 'http://localhost:4200/caliber/vp/reports';
export class ReportPage {
    navigateTo() {
        return browser.get(viewReportsURL);
        // element(by.css('app-root #reports-link'));
    }


}

export class ViewToolBarInReportsPage {
    navigateTo() {
        return browser.get(viewReportsURL);
    }

    getYears() {
        element(by.id('selectedYearDropdown')).click();
        browser.sleep(2000);
        return element(by.id('selectedYearDropdown')).getText();
    }
}