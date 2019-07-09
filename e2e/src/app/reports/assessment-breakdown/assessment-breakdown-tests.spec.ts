import { browser, element, by, ElementFinder } from "protractor";

browser.ignoreSynchronization = true;

describe("assessment breakdown component displays", () => {
   
   
   it('should go to a week and a bar chart of the batch average should exist.', () =>{
      
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

      let batchAverageChart = element(by.id("batchAverageChart"));

      expect(batchAverageChart.isPresent()).toBeTruthy();

      });
      });
      });
      });
      });
   });
   it('should select a specific trainee and a trainee and batch average comparison bar chart should exist for that week.',() => {
    let traineeDropdown = element(by.name(""));
   });
});
