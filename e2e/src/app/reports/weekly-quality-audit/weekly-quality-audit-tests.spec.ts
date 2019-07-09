import { browser, element, by, ElementFinder } from "protractor";

browser.ignoreSynchronization = true;

describe("Weekly quality audit component displays", () => {


   it('should go to the reports page and see the weekly quality audit chart.', () => {

      let reportsPage = element(by.css('app-root #reports-link'));
      reportsPage.click().then(() => {
         browser.pause();

         let yearDropdown = element(by.id("toolbarYearDropdown"));
         yearDropdown.click().then(() => {

            let option2017 = element(by.name("toolbarYear2017"));
            option2017.click().then(() => {

               let weekDropdown = element(by.id("toolbarWeekDropdown"));
               weekDropdown.click().then(() => {

                  let week2Button = element(by.name("toolbarWeek2"));
                  week2Button.click().then(() => {
                     browser.sleep(2000);

                     let doughnutChart = element(by.id("weeklyQualityAuditDonut"));

                     expect(doughnutChart.isDisplayed()).toBeTruthy();

                  });

               });

            });

         });

      });
   });

   it('should see some number or output for the first weekly quality audit chart value.', () => {
      let doughnutChartValue1 = element(by.id("wqaAuditValue1")); //Ensures there is no blank space at this stage (as there shouldn't be).
      expect(doughnutChartValue1.getText()).toBeTruthy();
   });

   it('should see some number or output for the second weekly quality audit chart value.', () => {
      let doughnutChartValue2 = element(by.id("wqaAuditValue2"));
      expect(doughnutChartValue2.getText()).toBeTruthy();
   });

   it('should see some number or output for the third weekly quality audit chart value.', () => {
      let doughnutChartValue3 = element(by.id("wqaAuditValue3"));
      expect(doughnutChartValue3.getText()).toBeTruthy();
   });

   it('should see some number or output for the fourth weekly quality audit chart value.', () => {
      let doughnutChartValue4 = element(by.id("wqaAuditValue4"));
      expect(doughnutChartValue4.getText()).toBeTruthy();
   });

   it('should view a trainee\'s analytics for a every week and not see the weekly quality audit chart.', () => {
      let weekDropdown = element(by.id("toolbarWeekDropdown"));
      weekDropdown.click().then(() => {

         let week0Button = element(by.name("toolbarWeek0"));
         week0Button.click().then(() => {
            browser.sleep(2000);

            let doughnutChart = element(by.id("weeklyQualityAuditDonut"));
            expect(doughnutChart.isPresent()).toBeFalsy();
         });
      });
   });

   it('should view a trainee\'s analytics for a specific week and not see the weekly quality audit chart.', () => {

      let weekDropdown = element(by.id("toolbarWeekDropdown"));
      weekDropdown.click().then(() => {

         let week0Button = element(by.name("toolbarWeek2"));
         week0Button.click().then(() => {
            browser.sleep(1000);

            let traineeDropdown = element(by.id("toolbarTraineeDropdown"));
            traineeDropdown.click().then(()=>{

               let traineeButton = element(by.name("toolbarTrainee5508"));
               traineeButton.click().then(()=>{
                  browser.sleep(2000);

                  let doughnutChart = element(by.id("weeklyQualityAuditDonut"));
                  expect(doughnutChart.isPresent()).toBeFalsy();
               });

            });

         });
      });

   });

});

