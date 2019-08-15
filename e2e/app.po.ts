import { browser, by, element } from 'protractor';

export class AppPage {
  searchInputBox = element(by.id('city'));

  searchCityBtn = element(by.id('searchCityBtn'));
  resultsTable = element(by.id('resultsTable'));

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

}
