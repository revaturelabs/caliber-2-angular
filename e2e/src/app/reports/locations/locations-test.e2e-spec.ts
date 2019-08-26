import { browser, element, by, ElementFinder } from "protractor";
import { LocationspageComponent } from "src/app/locationspage/locationspage.component";
import { LocationService } from "src/app/home/service/location.service";

browser.ignoreSynchronization = true;

describe("Locations page component displays", () => {
    it('Test getAllLocations', () => {
        let service: LocationService;
        const comp = new LocationspageComponent(service);
        expect(comp.locations).toBeTruthy('we do get data from the backend');
    });
});