exports.LoginPage=
class LoginPage{

    constructor(page)
    {
        this.page=page;
        this.username='#pydLogin_txtUserid';
        this.password='#pydLogin_txtUserPwd';
        this.loginButton='#pydLogin_btnLogin';

    }

    async goTOLoginPage(){

    await this.page.goto('https://pyramidcore.pyramidci.com');

}

async login(username,pwd){

    await this.page.locator(this.username).fill(username);
    await this.page.locator(this.password).fill(pwd);
    await this.page.locator(this.loginButton).click();
}

}