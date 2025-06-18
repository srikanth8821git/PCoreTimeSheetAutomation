const { expect } = require("@playwright/test");
exports.TimesheetPage = class TimesheetPage {
  constructor(page) {
    this.page = page;
    this.frameContents = '//frame[@name="contents"]';
    this.expandTimesheet = '//a[@id="PCIMenun28"]';
    this.selectMyTimeSheet = "#PCIMenut29";
    this.frameMain = '//frame[@name="main"]';
    this.nextButton = '//button[@id="btnNext32"]';
    this.prevButton = '//button[@id="btnPre"]';
    this.weekRange = '//span[@class="weekrange"]';
    this.timesheetLastSubmittedLabel = (msg) =>
      `//label[contains(text(),'${msg}')]`;
    this.addremarks = '//a[@title="Click to Add/View Remarks" and text()="R"]';
    this.closeremarkswindow = '//a[@title="close Window"]';
    this.remarkslabel = '//*[text()=" Remarks"]';
    this.remarkstext = "//textarea";
    this.addprojectbutton = '//button[@title="Click to add new row"]';
    this.viewprojects = '//input[@title="Click to view ticket options"]';
    this.deleteproject = '//button[@id="btnNext332"]';
    this.selectproject = '//a[@class="goToEdit"]';
    this.selectprojectactivity = '//select[@id="selectedActivity"]';
    this.selectprojectgroup = '//select[@id="selectedGroup"]';
    this.selectHours = '//select[@id="selectedHour"]';
    this.savetimesheetmsg = '//button[@title="Click to save timesheet"]';
    this.submittimesheetmsg = '//p[text()="Timesheet saved successfully"]';
    this.totalhourscalculated =
      '//div[@class="col-1 timeColumn rowheight totalColumn weekTotalLow"]';
  }

  async navigateToMyTimesheetLandingPage() {
    await this.page
      .frameLocator(this.frameContents)
      .locator(this.expandTimesheet)
      .click();
    await this.page
      .frameLocator(this.frameContents)
      .locator(this.selectMyTimeSheet)
      .click();
  }

  async navigateBetweenTimeSheets() {
    expect(
      await this.page
        .frameLocator(this.frameMain)
        .locator(this.nextButton)
        .isDisabled()
    );
    await this.page
      .frameLocator(this.frameMain)
      .locator(this.prevButton)
      .click();
    await this.page
      .frameLocator(this.frameMain)
      .locator(this.nextButton)
      .click();
  }

  async addRemarksToHoursFilled(projectremarks) {
    const mainFrame = this.page.frameLocator(this.frameMain);

    for (
      let i = 0;
      i < (await mainFrame.locator(this.addremarks).count());
      i++
    ) {
      if (await mainFrame.locator(this.addremarks).nth(i).isVisible()) {
        await mainFrame.locator(this.addremarks).nth(i).click();
        await mainFrame.locator(this.closeremarkswindow).nth(i).click();
        await mainFrame.locator(this.addremarks).nth(i).click();
        await mainFrame.locator(this.remarkslabel).nth(i).isVisible();
        await mainFrame.locator(this.remarkstext).nth(i).clear();
        await mainFrame.locator(this.remarkstext).nth(i).fill(projectremarks);
        await mainFrame.locator(this.closeremarkswindow).nth(i).click();
        await mainFrame.locator(this.addremarks).nth(i).click();
        await expect(mainFrame.locator(this.remarkstext).nth(i)).toHaveValue(
          projectremarks
        );
        await mainFrame.locator(this.closeremarkswindow).nth(i).click();
      }
    }
  }

  async addProjectDetails(projectgroup, projectactivity) {
    const mainFrame = this.page.frameLocator(this.frameMain);

    if (await mainFrame.locator(this.deleteproject).nth(0).isVisible()) {
      await mainFrame.locator(this.deleteproject).nth(0).click();
    }

    await mainFrame.locator(this.addprojectbutton).click();

    await this.page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await mainFrame.locator(this.viewprojects).click();
    await mainFrame.locator(this.selectproject).click();
    await mainFrame
      .locator(this.selectprojectgroup)
      .nth(2)
      .selectOption(projectgroup);
    await mainFrame
      .locator(this.selectprojectactivity)
      .nth(2)
      .selectOption(projectactivity);
  }

  async verifyTimeSheetDates(monday, sunday, previousDate) {
    const dateRange = await this.page
      .frameLocator(this.frameMain)
      .locator(this.weekRange)
      .textContent();

    let timesheetWeek = monday + " " + "-" + " " + sunday;

    await expect(timesheetWeek.trim()).toBe(dateRange.trim());

    let msg = " Last timesheet submitted upto:" + previousDate;

    const mainFrame = await this.page.frameLocator(this.frameMain);
    await expect(
      await mainFrame.locator(this.timesheetLastSubmittedLabel(msg))
    ).toBeVisible();
  }

  async addTimesheetHours() {
    for (let i = 14; i < 19; i++) {
      if (
        await this.page
          .frameLocator(this.frameMain)
          .locator(this.selectHours)
          .nth(i)
          .isEnabled()
      ) {
        await this.page
          .frameLocator(this.frameMain)
          .locator(this.selectHours)
          .nth(i)
          .selectOption("8");
      }
    }

    let totalUserEnteredHours = 0;
    for (let i = 0; i < 21; i++) {
      totalUserEnteredHours =
        totalUserEnteredHours +
        parseFloat(
          await this.page
            .frameLocator(this.frameMain)
            .locator(this.selectHours)
            .nth(i)
            .inputValue()
        );
    }

    return totalUserEnteredHours;
  }

  async submitTimeSheet(totalUserEnteredHours) {
    const totalHours = await this.page
      .frameLocator(this.frameMain)
      .locator(this.totalhourscalculated)
      .nth(0)
      .textContent();

    if (
      toString(totalHours) == toString(totalUserEnteredHours) &&
      totalUserEnteredHours == 40
    ) {
      await this.page
        .frameLocator(this.frameMain)
        .locator(this.savetimesheetmsg)
        .click();
      await this.page
        .frameLocator(this.frameMain)
        .locator(this.submittimesheetmsg)
        .isVisible();
    }

    if (totalUserEnteredHours == 40) {
      await expect(
        await this.page.frameLocator(this.frameMain).locator("#submit")
      ).toBeEnabled();
      await expect(
        await this.page.frameLocator(this.frameMain).locator("#submit")
      ).click();
    } else {
      await expect(
        await this.page.frameLocator(this.frameMain).locator("#submit")
      ).toBeDisabled();
    }
  }
};
