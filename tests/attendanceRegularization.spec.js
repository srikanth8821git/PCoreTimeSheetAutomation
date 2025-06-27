import { test, expect } from "../fixtures/HROneFixture.js";
import hrOneTestData from "../testData/hrOneTestData.json";
import { getDateStatus } from "../utils/hrOneSiteDateHelpers.js";

test("Attendance Regularization Request", async ({ hrOneLogin, page }) => {
  await page.locator("//span[contains(text(), ' Go to calendar ')]").click();
  await page.waitForTimeout(2000);
  await page
    .locator("//span[contains(text(), 'Attendance regularization')]")
    .click();
  await page.waitForTimeout(2000);

  const dateState = await getDateStatus(hrOneTestData.givenDateString);
  await selectDate(hrOneTestData.givenDateString, dateState);

  async function selectDate(givenDateString, dateState) {
    const [date, month, year] = givenDateString.split(" ");

    if (dateState === "currentDate") {
      await page
        .locator("//table/tbody/tr/td[contains(@class,'today')]/span/div")
        .click();
      await formValidationsAR(hrOneTestData.requestFor);

      await page.waitForTimeout(7000);
    }

    if (dateState === "futureDate") {
      while (true) {
        const { currentMonth, currentYear } =
          await getCurrentMonthYearFromCalender();
        if (currentMonth === month && currentYear === year) {
          break;
        }

        await page
          .locator("//button[contains(@class,'datepicker-next')]")
          .click();
      }
      await page
        .locator(
          `//table[contains(@class,'datepicker-calendar')]//tr/td/span[not(contains(@class,'disabled'))]/div[normalize-space(text())='${date}']`
        )
        .click();
      await formValidationsAR(hrOneTestData.requestFor);
    }

    if (dateState === "pastDate") {
      while (true) {
        const { currentMonth, currentYear } =
          await getCurrentMonthYearFromCalender();

        if (currentMonth === month && currentYear === year) {
          break;
        }

        await page
          .locator("//button[contains(@class,'datepicker-prev')]")
          .click();
      }

      await page
        .locator(
          `//table[contains(@class,'datepicker-calendar')]//tr/td/span[not(contains(@class,'disabled'))]/div[normalize-space(text())='${date}']`
        )
        .click();
      await formValidationsAR(hrOneTestData.requestFor);
    }
  }
  async function getCurrentMonthYearFromCalender() {
    let currentMonth = await page
      .locator("//div/button[contains(@class,'datepicker-month')]")
      .textContent();
    let currentYear = await page
      .locator("//div/button[contains(@class,'datepicker-year')]")
      .textContent();

    currentMonth = currentMonth.trim();
    currentYear = currentYear.trim();

    return { currentMonth, currentYear };
  }

  async function formValidationsAR(requestFor) {
    if (requestFor === "Forgot Out") {
      await page.getByRole("radio", { name: requestFor }).click();
      await expect(
        page.getByRole("textbox", { name: "From date" })
      ).not.toBeEditable();
      await expect(
        page.getByRole("textbox", { name: "Start Hours" })
      ).not.toBeEditable();
      await expect(
        page.getByRole("textbox", { name: "Start Minutes" })
      ).not.toBeEditable();
      await page
        .getByRole("textbox", { name: "End hours" })
        .fill(hrOneTestData.EndHH);
      await page
        .getByRole("textbox", { name: "End Minutes" })
        .fill(hrOneTestData.EndMM);
      await page
        .getByRole("textbox", { name: "Comments" })
        .fill(hrOneTestData.requestComments);
      await page.waitForTimeout(5000);
      await page.getByRole("button", { name: "SUBMIT" }).click();
    }

    if (requestFor === "Forgot In") {
      await page.getByRole("radio", { name: requestFor }).click();
      await expect(
        page.getByRole("textbox", { name: "To date" })
      ).not.toBeEditable();
      await expect(
        page.getByRole("textbox", { name: "End hours" })
      ).not.toBeEditable();
      await expect(
        page.getByRole("textbox", { name: "End Minutes" })
      ).not.toBeEditable();

      await page
        .getByRole("textbox", { name: "Start Hours" })
        .fill(hrOneTestData.StartHH);
      await page
        .getByRole("textbox", { name: "Start Minutes" })
        .fill(hrOneTestData.StartMM);
      await page
        .getByRole("textbox", { name: "Comments" })
        .fill(hrOneTestData.requestComments);
      await page.waitForTimeout(5000);
      await page.getByRole("button", { name: "SUBMIT" }).click();
    }

    if (requestFor === "Both") {
      await page.getByRole("radio", { name: requestFor }).click();

      await page
        .getByRole("textbox", { name: "Start Hours" })
        .fill(hrOneTestData.StartHH);
      await page
        .getByRole("textbox", { name: "Start Minutes" })
        .fill(hrOneTestData.StartMM);
      await page
        .getByRole("textbox", { name: "End hours" })
        .fill(hrOneTestData.EndHH);
      await page
        .getByRole("textbox", { name: "End Minutes" })
        .fill(hrOneTestData.EndMM);
      await page
        .getByRole("textbox", { name: "Comments" })
        .fill(hrOneTestData.requestComments);
      await page.waitForTimeout(5000);
      await page.getByRole("button", { name: "SUBMIT" }).click();
    }
  }
});
