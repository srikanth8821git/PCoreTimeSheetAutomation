
import {test,expect} from '@playwright/test';
import { LoginPage } from './Pages/loginpage';
import {MyTimesheetHomePage} from './Pages/timesheetHomePage';


test('PCore',async({page})=>{



// LOGIN TO PCORE PORTAL  
const loginObj= new LoginPage(page);
await loginObj.goTOLoginPage();
await loginObj.login('srikanth.kasireddy','Reddy@123');

//Navigate to MyTimesheet page
const myTimeSheet= new MyTimesheetHomePage(page);
await myTimeSheet.navigateToMyTimesheetLandingPage();


const f=await page.frameLocator("//frame[@name='main']");

//Verify naviagate buttons for timesheets
await myTimeSheet.navigateBetweenTimeSheets();



//await framez2.locator("//p[text()='Timesheet saved successfully']").nth(2).isVisible();



//Verify timesheet dates and last submitted date
await myTimeSheet.verifyTimeSheetDates();

// ADD Remarks for the hours
await myTimeSheet.addRemarksToHoursFilled('project hours added');

// ADD new row to select and enter project hours
await myTimeSheet.addProjectDetails('Quality','QA & Testing');

//ADD Hours and Submit sheet
await myTimeSheet.addHoursAndSubmitTimeSheet();

/*
const frame2= await page.frameLocator("//frame[@name='main']").locator("//select[@id='selectedHour']");
//const minutes= await page.frameLocator("//frame[@name='main']").locator("//select[@id='slectedMinute']");








for(let i=0;i<5;i++)
{
    if(await framez2.locator("//button[@id='btnNext332']").nth(i).isVisible())
    {
        await framez2.locator("//button[@id='btnNext332']").nth(i).click();
        await framez2.locator("//button[@title='Click to add new row']").click();
        await page.on('dialog', async dialog=>{
 
    //expect (dialog.type()).toContain('alert');
    //expect (dialog.message()).toContain('Ticket List')
    //await dialog.page().locator("//div[@class='modal-content']//a[@class='goToEdit']").click();
   
    await dialog.accept();

})

 await page.frameLocator("//frame[@name='main']").locator ("//input[@title='Click to view ticket options']").click();
await page.frameLocator("//frame[@name='main']").locator("//a[@class='goToEdit']").click(); 
await framez2.locator("//select[@id='selectedGroup']").nth(2).selectOption('Quality');
await framez2.locator("//select[@id='selectedActivity']").nth(2).selectOption('QA & Testing');
        break;
    }
    else{
         await framez2.locator("//button[@title='Click to add new row']").click();
         await page.on('dialog', async dialog=>{
 
    //expect (dialog.type()).toContain('alert');
    //expect (dialog.message()).toContain('Ticket List')
    //await dialog.page().locator("//div[@class='modal-content']//a[@class='goToEdit']").click();
   
    await dialog.accept();

})

 await page.frameLocator("//frame[@name='main']").locator ("//input[@title='Click to view ticket options']").click();
await page.frameLocator("//frame[@name='main']").locator("//a[@class='goToEdit']").click(); 
await framez2.locator("//select[@id='selectedGroup']").nth(2).selectOption('Quality');
await framez2.locator("//select[@id='selectedActivity']").nth(2).selectOption('QA & Testing');
          break;
    }
    }
} 
*/

/*

//Enter Hours

if(await frame2.nth(14).isEnabled())
{

  await frame2.nth(14).selectOption('8');
}

if(await frame2.nth(15).isEnabled())
{

  await frame2.nth(15).selectOption('8');
}

if(await frame2.nth(16).isEnabled())
{
 
  await frame2.nth(16).selectOption('8');
}
if(await frame2.nth(17).isEnabled())
{

  await frame2.nth(17).selectOption('8');
}

if(await frame2.nth(18).isEnabled())
{
 
  await frame2.nth(18).selectOption('8');
}

let totalhours=0;
for(let i=0;i<21;i++)
{

  totalhours=totalhours +  parseFloat(await frame2.nth(i).inputValue());

}




const tothrs=await framez2.locator("//div[@class='col-1 timeColumn rowheight totalColumn weekTotalLow']").nth(0).textContent();

//Save and Submit time sheet if hours equals to 40 

if (toString(tothrs)==toString(totalhours) && totalhours==40)
{
await framez2.locator("//button[@title='Click to save timesheet']").click();
await framez2.locator("//p[text()='Timesheet saved successfully']").isVisible();
}
else
{

  console.log("total time mismatch  ",totalhours);
  //console.log("total   ",tothrs);
}

if (totalhours==40)
{
    await expect(await framez2.locator("#submit")).toBeEnabled();
    await expect(await framez2.locator("#submit")).click();
}
else
{
    await expect(await framez2.locator("#submit")).toBeDisabled();
      
}

*/

await page.waitForTimeout(3000);

})