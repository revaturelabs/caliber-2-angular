import { browser, element, by, ElementFinder } from "protractor";

browser.ignoreSynchronization = true;

describe("Weekly quality audit component displays", () => {
   
   
   it('should go to the reports page.', () =>{
      
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

      //console.log(reportsPage);




   });

});

