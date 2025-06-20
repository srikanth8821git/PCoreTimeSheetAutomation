import testData from "../testdata/timesheetdata.json";
exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = "#pydLogin_txtUserid";
    this.password = "#pydLogin_txtUserPwd";
    this.loginButton = "#pydLogin_btnLogin";
  }
//test
  async goTOLoginPage() {
    await this.page.goto(testData.pcoreURL);
  }

  async login(username, pwd) {
    await this.page.locator(this.userName).fill(username);
    await this.page.locator(this.password).fill(pwd);
    await this.page.locator(this.loginButton).click();
  }
};
