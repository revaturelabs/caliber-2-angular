import { ViewToolBarInReportsPage } from '../report.po';

import { browser, by, element } from "protractor";

describe ('report page', () => {
    
    let viewReport: ViewToolBarInReportsPage;

    beforeEach(() => {
        
        viewReport = new ViewToolBarInReportsPage();
    });

    it('should display the reports page', () => {
        viewReport.navigateTo();
       
    });

    it('should select year 2017 from the toolbar', () => {
        
        expect(viewReport.getYear2017().getText()).toEqual('2017');
    });
    

    
    it('should select the batch once year 2019 is selected from the toolbar', () => {
        expect(viewReport.getBatch20192().getText()).toEqual('1611 Nov14 Java (AP)');
    });

    it('should select the batch once year 2018 is selected from the toolbar', () => {
        expect(viewReport.getBatch20181().getText()).toEqual('1607 Jul11 Java');
    });

   

    it('should check if week1 exists for batch when year 2017 is selected in the toolbar', () => {
        let year2017 = viewReport.clickYear2017();
        if(year2017.isSelected){
            let batch2017 = viewReport.getBatch20172200();
            if(batch2017.isSelected){
                expect(viewReport.getWeek1().getText()).toEqual('Week 1');
            }
        }
        
    })

    

});