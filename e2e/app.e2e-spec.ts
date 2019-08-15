import { AppPage } from './app.po';
import { browser, protractor} from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should not allow to search if there is no city', () => {
    page.navigateTo();
    expect(page.searchCityBtn.isEnabled()).toBe(false);
  });

  it('should not allow to search if the city is 1 char long', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('L');
    expect(page.searchCityBtn.isEnabled()).toBe(false);
  });

  it('should get the weather forecast for a valid city', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('Lisbon');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
    page.searchCityBtn.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.resultsTable), 5000);
	expect(page.resultsTable.$$('tr').get(1).$$('td').getText()).toContain('Lisbon');    
  });

});
