import { browser, element, by, ElementFinder } from 'protractor';

browser.ignoreSynchronization = true;

describe('Weekly report component displays', () => {
    it('should display line chart for whole batch, ', () => {
        const reportsPage = element(by.css('app-root #reports-link'));
        reportsPage.click().then(() => {
        browser.pause();
        const yearDropdown = element(by.id('toolbarYearDropdown'));
         yearDropdown.click().then(() => {
            const option2017 = element(by.name('toolbarYear2017'));
            option2017.click().then(() => {
                   browser.sleep(2000);
                   const lineChart = element(by.id('weekly-report'));
                   expect(lineChart.isDisplayed()).toBeTruthy();
            });
            });
        });
    });

    it('should display component line chart for whole batch and specific trainee, ', () => {
        const reportsPage = element(by.css('app-root #reports-link'));
        reportsPage.click().then(() => {
            browser.pause();
            const yearDropdown = element(by.id('toolbarYearDropdown'));
            yearDropdown.click().then(() => {
                const option2017 = element(by.name('toolbarYear2017'));
                option2017.click().then(() => {
                    const traineeDropdown = element(by.id('toolbarTraineeDropdown'));
                    traineeDropdown.click().then(() => {
                        browser.sleep(2000);
                        const traineeButton = element(by.name('toolbarTrainee5508'));
                        traineeButton.click().then(() => {
                            browser.sleep(2000);
                            const lineChart = element(by.id('weekly-report'));
                            expect(lineChart.isDisplayed()).toBeTruthy();
                        });
                    });
                });
            });
        });
    });
    it('should not display component line chart on week and no trainee selection , ', () => {
        const reportsPage = element(by.css('app-root #reports-link'));
        reportsPage.click().then(() => {
            browser.pause();
            const yearDropdown = element(by.id('toolbarYearDropdown'));
            yearDropdown.click().then(() => {
                const option2017 = element(by.name('toolbarYear2017'));
                option2017.click().then(() => {
                    const weekDropdown = element(by.id('toolbarWeekDropdown'));
                    weekDropdown.click().then(() => {
                        const week2Button = element(by.name('toolbarWeek2'));
                        week2Button.click().then(() => {
                            browser.sleep(2000);
                            const lineChart = element(by.id('weekly-report'));
                            expect(lineChart.isPresent()).toBeFalsy();
                        });
                    });
                });
            });
        });
    });
    it('should display component line chart on week and trainee selection, ', () => {
        const reportsPage = element(by.css('app-root #reports-link'));
        reportsPage.click().then(() => {
            browser.pause();
            const yearDropdown = element(by.id('toolbarYearDropdown'));
            yearDropdown.click().then(() => {
                const option2017 = element(by.name('toolbarYear2017'));
                option2017.click().then(() => {
                    const weekDropdown = element(by.id('toolbarWeekDropdown'));
                    weekDropdown.click().then(() => {
                        const week2Button = element(by.name('toolbarWeek2'));
                        week2Button.click().then(() => {
                            browser.sleep(2000);
                            const traineeDropdown = element(by.id('toolbarTraineeDropdown'));
                            traineeDropdown.click().then(() => {
                                browser.sleep(2000);
                                const traineeButton = element(by.name('toolbarTrainee5508'));
                                traineeButton.click().then(() => {
                                    browser.sleep(2000);
                                    const lineChart = element(by.id('weekly-report'));
                                    expect(lineChart.isDisplayed()).toBeTruthy();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
