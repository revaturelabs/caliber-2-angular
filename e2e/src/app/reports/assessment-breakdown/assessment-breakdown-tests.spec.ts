import { browser, element, by, ElementFinder } from "protractor";

browser.ignoreSynchronization = true;

describe("assessment breakdown component displays", () => {
    let yearDropdown = element(by.id("toolbarYearDropdown"));
    let weekDropdown = element(by.id("toolbarWeekDropdown"));
    let traineeDropdown = element(by.id("toolbarTraineeDropdown"));
    let batchAverageChart = element(by.id("ABBatchAverageChart"));
    let traineeBatchAverageChart = element(by.id("ABTraineeBatchAverageChart"));

    it('should go to a week and a bar chart of the batch average should exist.', () => {

        let reportsPage = element(by.css('app-root #reports-link'));
        reportsPage.click().then(() => {
            browser.pause();

            yearDropdown.click().then(() => {

                let option2017 = element(by.name("toolbarYear2017"));
                option2017.click().then(() => {

                    weekDropdown.click().then(() => {

                        let week2Button = element(by.name("toolbarWeek2"));
                        week2Button.click().then(() => {
                            browser.sleep(2000);

                            expect(batchAverageChart.isDisplayed()).toBe(true);
                        });
                    });
                });
            });
        });
    });

    it('should have an exam header when week 2 is selected', () => {

        let examHeader = element(by.id("ABBHeader1"));
        expect(examHeader.getText()).toBeTruthy();
    });

    it('should have an exam value when week 2 is selected', () => {

        let examValue = element(by.id("ABBBatch1"));
        expect(examValue.getText()).toBeTruthy();
    });

    it('should have 3rd value when week 2 is selected', () => {

        let thirdValue = element(by.id("ABBBatch3"));
        expect(thirdValue.getText()).toBeTruthy();
    });

    it('should not have 3rd value when week 3 is selected', () => {
        weekDropdown.click().then(() => {

            let week3Button = element(by.name("toolbarWeek3"));
            week3Button.click().then(() => {
                browser.sleep(1000);

                let thirdValue = element(by.id("ABBBatch3"));
                expect(thirdValue.getText()).toBeFalsy();
            });
        });
    });

    it('should not have a trainee and batch average comparison chart when a week is selected.', () => {

        browser.sleep(2000);
        expect(traineeBatchAverageChart.isPresent()).not.toBe(true);
    });

    it('should select a specific trainee and a trainee and batch average comparison bar chart should exist for that week.', () => {

        traineeDropdown.click().then(() => {

            let specificTraineeButton = element(by.name("toolbarTrainee5517"));
            specificTraineeButton.click().then(() => {
                browser.sleep(2000);

                expect(traineeBatchAverageChart.isDisplayed()).toBe(true);
            });
        });
    });

    it('should have an exam header when week 3 and a trainee is selected', () => {

        let examHeader = element(by.id("ABTBHeader1"));
        expect(examHeader.getText()).toBeTruthy();
    });

    it('should have an exam trainee value when week 3 and a trainee is selected', () => {

        let traineeExamValue = element(by.id("ABTBTrainee1"));
        expect(traineeExamValue.getText()).toBeTruthy();
    });

    it('should have an exam batch average value when week 3 and a trainee is selected', () => {

        let batchExamValue = element(by.id("ABTBBatch1"));
        expect(batchExamValue.getText()).toBeTruthy();
    });

    it('should not have a third header when week 3 and a trainee is selected', () => {

        let thirdHeader = element(by.id("ABTBHeader3"));
        expect(thirdHeader.isPresent()).toBeFalsy();
    });

    it('should have a third header when week 2 and a trainee is selected', () => {

        weekDropdown.click().then(() => {

            let week2Button = element(by.name("toolbarWeek2"));
            week2Button.click().then(() => {
                browser.sleep(1000);

                let thirdHeader = element(by.id("ABTBHeader3"));
                expect(thirdHeader.isPresent()).toBeTruthy();
            });
        });
    });

    it('should not have a batch average chart when a week and a trainee is selected.', () => {
        browser.sleep(2000);

        expect(batchAverageChart.isPresent()).not.toBe(true);
    });

    it('should select all weeks and a trainee and batch average comparison bar chart should exist.', () => {

        weekDropdown.click().then(() => {

            let allWeeksButton = element(by.name("toolbarWeek0"));
            allWeeksButton.click().then(() => {
                browser.sleep(2000);

                expect(traineeBatchAverageChart.isDisplayed()).toBe(true);
            });
        });
    });

    it('should have a 4th trainee value when a trainee is selected', () => {

        let fourthTraineeValue = element(by.id("ABTBTrainee4"));
        expect(fourthTraineeValue.isPresent()).toBeTruthy();
    });

    it('should not have a 4th trainee value when a different trainee is selected', () => {

        traineeDropdown.click().then(() => {

            let traineeButton = element(by.name("toolbarTrainee5518"));
            traineeButton.click().then(() => {
                browser.sleep(1000);

                let fourthTraineeValue = element(by.id("ABTBTrainee4"));
                expect(fourthTraineeValue.isPresent()).toBeFalsy();
            });
        });
    });

    it('should not have a batch average chart when all weeks is selected.', () => {

        browser.sleep(2000);
        expect(batchAverageChart.isPresent()).not.toBe(true);
    });
});
