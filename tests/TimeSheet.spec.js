
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { TimesheetPage } from '../pageObjects/TimesheetPage';
import testData from '../testdata/timesheetdata.json';
import { getCurrentWeekMonday, getCurrentWeekSunday, getPreviousDay } from '../utils/datehelper';

test('PCORE My Timesheet ', async ({ page }) => {

    // LOGIN TO PCORE PORTAL  
    const loginObj = new LoginPage(page);
    await loginObj.goTOLoginPage();
    await loginObj.login(testData.userName, testData.password);

    //Navigate to MyTimesheet page
    const myTimeSheet = new TimesheetPage(page);
    await myTimeSheet.navigateToMyTimesheetLandingPage();

    //Verify naviagate buttons for timesheets
    await myTimeSheet.navigateBetweenTimeSheets();


    // Get current week Monday date
    const monday = await getCurrentWeekMonday();

    // Get current week Monday date
    const sunday = await getCurrentWeekSunday();

    // Get previous date based on user passed date
    const previousDate = await getPreviousDay(monday);

    //Verify timesheet dates and last submitted date
    await myTimeSheet.verifyTimeSheetDates(monday, sunday, previousDate);

    // ADD new row to select and enter project hours
    await myTimeSheet.addProjectDetails(testData.projectGroup, testData.projectActivity);

    //ADD Hours 
    const timesheetHours = await myTimeSheet.addTimesheetHours();

    // ADD Remarks for the hours
    await myTimeSheet.addRemarksToHoursFilled(testData.remarks);

    //Submit Timesheet
    await myTimeSheet.submitTimeSheet(timesheetHours);

    await page.waitForTimeout(3000);

})