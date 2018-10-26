import { browser, element, by } from 'protractor';

export class ViewTraineePage {
    navigateTo() {
        return browser.get('/');
    }

    clickModalButton() {
        return element(by.id('modalButton')).click();
    }

    getModal() {
        return element(by.id('myModal'));
    }
}
