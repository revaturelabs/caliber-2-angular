import { browser, element, by, ElementFinder } from "protractor";

browser.ignoreSynchronization = true;

describe("Weekly quality audit component displays", () => {
   
   
   it('should go to the reports page.', () =>{
      
      let reportsPage = element(by.css('app-root #reports-link'));

      /*
      reportsPage.click().then(()=>{

      let yearDropdown = element(by.xpath("/html/body/app-root/div/app-reports/app-toolbar/div/div/div/div/ul/li[1]/a"));
      yearDropdown.click().then(()=>{

      let option2017 = element(by.xpath("/html/body/app-root/div/app-reports/app-toolbar/div/div/div/div/ul/li[1]/ul/li[3]/a"));
      option2017.click().then(()=>{

      let weekDropdown = element(by.xpath("/html/body/app-root/div/app-reports/app-toolbar/div/div/div/div/ul/li[3]/a"));
      weekDropdown.click().then(()=>{

      let week2Button = element(by.xpath("/html/body/app-root/div/app-reports/app-toolbar/div/div/div/div/ul/li[3]/ul/li[3]/a"));
      week2Button.click().then(()=>{

      let doughnutChart = element(by.id("weeklyQualityAuditDonut"));

      expect(doughnutChart.isPresent()).toBeTruthy();

      });

      });

      });

      });

      });
      */

      //console.log(reportsPage);




   });

});

