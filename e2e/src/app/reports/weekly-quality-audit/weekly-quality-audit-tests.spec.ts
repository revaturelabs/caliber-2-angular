import { browser, element, by, ElementFinder } from "protractor";

browser.ignoreSynchronization = true;

describe("Weekly quality audit component displays", () => {
   
   
   it('should go to the reports page and see the doughnut chart.', () =>{
      
      let reportsPage = element(by.css('app-root #reports-link'));
      reportsPage.click().then(()=>{
         browser.pause();

      let yearDropdown = element(by.id("toolbarYearDropdown"));
      yearDropdown.click().then(()=>{

      let option2017 = element(by.name("toolbarYear2017"));
      option2017.click().then(()=>{

      let weekDropdown = element(by.id("toolbarWeekDropdown"));
      weekDropdown.click().then(()=>{

      let week2Button = element(by.name("toolbarWeek2"));
      week2Button.click().then(()=>{
         browser.sleep(2000);

      let doughnutChart = element(by.id("weeklyQualityAuditDonut"));

      expect(doughnutChart.isPresent()).toBeTruthy();

      });

      });

      });

      });

      });
   });

   it ('should see some number or output for the first doughnut chart value.', ()=>{
      let doughnutChart = element(by.id("wqaAuditValue1")); //Ensures there is no blank space at this stage (as there shouldn't be).
      expect(doughnutChart.getText()).toBeTruthy();
   });

   it ('should see some number or output for the second doughnut chart value.', ()=>{
      let doughnutChart = element(by.id("wqaAuditValue2"));
      expect(doughnutChart.getText()).toBeTruthy();
   });

   it ('should see some number or output for the third doughnut chart value.', ()=>{
      let doughnutChart = element(by.id("wqaAuditValue3"));
      expect(doughnutChart.getText()).toBeTruthy();
   });

   it ('should see some number or output for the fourth doughnut chart value.', ()=>{
      let doughnutChart = element(by.id("wqaAuditValue4"));
      expect(doughnutChart.getText()).toBeTruthy();
   });


});

