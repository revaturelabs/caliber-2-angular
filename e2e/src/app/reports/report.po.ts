import { browser, by, element, ElementFinder } from "protractor";


// const viewReportsURL = 'http://localhost:4200/caliber/vp/reports';
// export class ReportPage {
//     navigateTo() {
//         return browser.get(viewReportsURL);
//         // element(by.css('app-root #reports-link'));
//     }


// }

export class ViewToolBarInReportsPage {
    navigateTo() {
        return browser.get('/caliber/vp/reports');
    }

    private sleepTime = 500;
    getYear2017(): ElementFinder {
        browser.sleep(this.sleepTime);
        element(by.id('toolbarYearDropdown')).click();
        // element(by.name('toolbarYear2017')).click();
        return element(by.name('toolbarYear2017'));
    }

    clickYear2017(): ElementFinder {
        // browser.sleep(this.sleepTime);
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2017')).click();
        return element(by.name('toolbarYear2017'));
    }

    getYear2018(): ElementFinder {
        browser.sleep(this.sleepTime);
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2018')).click();
        return element(by.id('toolbarYearDropdown'));
    }

    getYear2019(): ElementFinder {
        browser.sleep(this.sleepTime);
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2019')).click();
        return element(by.id('toolbarYearDropdown'));
    }

   

    getBatch20181(): ElementFinder {
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2018')).click();
        browser.sleep(this.sleepTime);
        element(by.id('toolbarBatchDropdown')).click();
        element(by.name('toolbarBatch1')).click();
        // getText value is: "1607 Jul11 Java"
        return element(by.id('toolbarBatchDropdown'));
    }

    getBatch20182(): ElementFinder {
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2018')).click();
        browser.sleep(this.sleepTime);
        element(by.id('toolbarBatchDropdown')).click();
        element(by.name('toolbarBatch2')).click();
        // getText value is: "1611 Nov14 Java (AP)"
        return element(by.id('toolbarBatchDropdown'));
    }

    getBatch20183(): ElementFinder {
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2018')).click();
        browser.sleep(this.sleepTime);
        element(by.id('toolbarBatchDropdown')).click();
        element(by.name('toolbarBatch3')).click();
        // getText value is: "1702 Feb13 Java (AP)"
        return element(by.id('toolbarBatchDropdown'));
    }

    getBatch20182003(): ElementFinder {
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2018')).click();
        browser.sleep(this.sleepTime);
        element(by.id('toolbarBatchDropdown')).click();
        element(by.name('toolbarBatch2003')).click();
        // getText value is: "1801 Oct16 Java"
        return element(by.id('toolbarBatchDropdown'));
    }

    getBatch20182100(): ElementFinder {
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2018')).click();
        browser.sleep(this.sleepTime);
        element(by.id('toolbarBatchDropdown')).click();
        element(by.name('toolbarBatch2100')).click();
        // getText value is: "1802 Oct16 Java"
        return element(by.id('toolbarBatchDropdown'));
    }

    getBatch20182150(): ElementFinder {
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2018')).click();
        browser.sleep(this.sleepTime);
        element(by.id('toolbarBatchDropdown')).click();
        element(by.name('toolbarBatch2150')).click();
        // getText value is: "1604 Apr25 Java"
        return element(by.id('toolbarBatchDropdown'));
    }

    

    getBatch20172200(): ElementFinder {
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2017')).click();
        browser.sleep(this.sleepTime);
        element(by.id('toolbarBatchDropdown')).click();
        element(by.name('toolbarBatch2200')).click();
        // getText value is: "1800 Oct16 Java"
        return element(by.id('toolbarBatchDropdown'));
    }

    getBatch20192(): ElementFinder {
        element(by.id('toolbarYearDropdown')).click();
        element(by.name('toolbarYear2019')).click();
        browser.sleep(this.sleepTime);
        element(by.id('toolbarBatchDropdown')).click();
        element(by.name('toolbarBatch2')).click();
        // getText value is: "1611 Nov14 Java (AP)"
        return element(by.id('toolbarBatchDropdown'));
    }

    
    getWeek1(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek1')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    getWeek2(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek2')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    getWeek3(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek3')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    
    getWeek4(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek4')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    getWeek5(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek5')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    getWeek6(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek6')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    getWeek7(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek7')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    getWeek8(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek8')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    getWeek9(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek9')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

    getWeekAll(): ElementFinder {
        element(by.id('toolbarWeekDropdown')).click();
        element(by.name('toolbarWeek0')).click();
        browser.sleep(this.sleepTime);
        return element(by.id('toolbarWeekDropdown'));
    }

}