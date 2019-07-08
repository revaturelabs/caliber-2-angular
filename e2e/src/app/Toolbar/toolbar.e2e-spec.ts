import { ViewToolBarInReportsPage } from './report.po';
import { ReportPage } from './report.po';
import { browser } from 'protractor';

describe ('report page', () => {
    let page: ReportPage;
    let viewReport: ViewToolBarInReportsPage;

    beforeEach(() => {
        page = new ReportPage();
        viewReport = new ViewToolBarInReportsPage();
    });

    it('should display the reports page', () => {
        viewReport.navigateTo();
        browser.pause();
        expect(viewReport.getYears()).toEqual('2019');
    })
});