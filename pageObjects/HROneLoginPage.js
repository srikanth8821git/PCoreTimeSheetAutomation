import hrOneTestData from "../testdata/hrOneTestData.json";
exports.HROneLoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.userNameLocator = "#hrone-username";
    this.passwordLocator = "#hrone-password";
    this.loginButton = "//button/ span[text()=' LOG IN ']";
    this.nextButton = "//button/ span[text()=' NEXT ']";
    this.loginPopUp = "//a[@class='btnclose']";
  }

  async goTOLoginPage() {
    await this.page.goto(hrOneTestData.hroneURL);
  }

  async login(username, pwd) {
    await this.page.locator(this.userNameLocator).fill(username);
    await this.page.locator(this.nextButton).click();
    await this.page.locator(this.passwordLocator).fill(pwd);
    await this.page.locator(this.loginButton).click();
    await this.page.locator(this.loginPopUp).click();
    
}

}
