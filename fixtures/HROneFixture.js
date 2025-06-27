import hrOneTestData from "../testdata/hrOneTestData.json";
import { HROneLoginPage } from "../pageObjects/HROneLoginPage.js";
import { test as base, expect } from "@playwright/test";


export const test = base.extend({
  hrOneLogin: async ({ page }, use) => {
    const hrOneLogin= new HROneLoginPage(page);
    await hrOneLogin.goTOLoginPage();
    await hrOneLogin.login(hrOneTestData.userName, hrOneTestData.password);
    await use(hrOneLogin);
    
    
  }
//testing
});
module.exports = { expect, test };