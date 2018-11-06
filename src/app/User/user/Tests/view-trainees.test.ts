import { browser, element, by } from 'protractor';

/**
 * Uses Protractor to test using front end input
 * tests are not yet implemented. Waiting for database funcitonality.
 */
export class ViewTraineePage {
    /**
     * Used to navigate to the proper page
     */
    navigateTo() {
        return browser.get('/');
    }

    /**
     * Used to open up the batch modal to see the trainee's
     */
    clickModalButton() {
        return element(by.id('modalButton')).click();
    }

    /**
     * Returns the information from the Modal page
     */
    getModal() {
        return element(by.id('myModal'));
    }
}
