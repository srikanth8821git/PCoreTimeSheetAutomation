
import {test,expect} from '@playwright/test';


test('PCore',async({page})=>{

await page.goto('https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx');


// LOGIN
await page.locator('#pydLogin_txtUserid').fill('UserName');
await page.locator("#pydLogin_txtUserPwd").fill('Password');
await page.locator("#pydLogin_btnLogin").click();



//Navigate to Timesheet page
const frame1= await page.frameLocator("//frame[@name='contents']").locator("//a[@id='PCIMenun28']")
await frame1.click();


await page.frameLocator("//frame[@name='contents']").locator("#PCIMenut29").click();

const f=await page.frameLocator("//frame[@name='main']");




//await framez2.locator("//p[text()='Timesheet saved successfully']").nth(2).isVisible();

//Verify naviagate buttons for timesheets
expect(await page.frameLocator("//frame[@name='main']").locator("#btnNext32").isDisabled()); //Next

await page.frameLocator("//frame[@name='main']").locator("#btnPre").click(); //Previous

await page.frameLocator("//frame[@name='main']").locator("#btnNext32").click(); //Next


//Verify timesheet dates and last submitted date
const dateRange=await page.frameLocator("//frame[@name='main']").locator("//span[@class='weekrange']").textContent();
//const firstdate=dateRange.split("-")[0].trim();
//console.log("firsdate is   ",firstdate);

//await page.waitForTimeout(5000);

let d=new Date();

let currentMonth= d.getMonth();  
let currentYear=d.getFullYear();
let currentDate=d.getDate();
let currentDay=d.getDay();


if(currentDay==0)
{
  currentDay=7;
}

let monday= currentDate - (currentDay -1);
let month= currentMonth + 1;
console.log(monday);

month=month.toString().padStart(2,'0');
 monday=monday.toString().padStart(2,'0');

let fullDate=month + "/" + monday + "/" + currentYear ;



let currentMonth1= d.getMonth();  
let currentYear1=d.getFullYear();
let currentDate1=d.getDate();
let currentDay1=d.getDay();



let datefiff=-1;

switch (currentDay1) {
  case 0:
    datefiff = 0;
    break;
  case 1:
    datefiff = 6;
    break;
  case 2:
     datefiff = 5
    break;
  case 3:
    datefiff = 4;
    dt=3-2;
    break;
  case 4:
    datefiff = 3;
    break;
  case 5:
    datefiff = 2
    break;
  case 6:
    datefiff = 1;
}


let sunday=  currentDate1 +  datefiff ;
let month1= currentMonth1 + 1;


month1=month1.toString().padStart(2,'0');
 sunday=sunday.toString().padStart(2,'0');

let fullDate2=month1 + "/" + sunday + "/" + currentYear1 ;



let range= fullDate + " " + "-" + " " + fullDate2;

if(range.trim()==dateRange.trim())
{

        console.log("SUCCESS");
    

}
else{
     
   console.log('ERROR IN MATCHING DATES');
}


const [m, dt, y] = fullDate.split('/');
const date = new Date(`${y}-${m}-${dt}`);
let prevdate=date.setDate(date.getDate()-1);


const prevDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/` +
                    `${date.getDate().toString().padStart(2, '0')}/` +
                    `${date.getFullYear()}`;



let msg=" Last timesheet submitted upto:" + prevDate ;

await console.log(msg) ;

const fr=await page.frameLocator("//frame[@name='main']");
await expect(await fr.locator(`//label[contains(text(), "${msg}")]`)).toBeVisible();


await page.waitForTimeout(2000);



const frame2= await page.frameLocator("//frame[@name='main']").locator("//select[@id='selectedHour']");
//const minutes= await page.frameLocator("//frame[@name='main']").locator("//select[@id='slectedMinute']");


const framez2= await page.frameLocator("//frame[@name='main']");

/*
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


if(await framez2.locator("//button[@id='btnNext332']").nth(0).isVisible())
    {
        await framez2.locator("//button[@id='btnNext332']").nth(0).click();
    }
    
//await framez2.locator("//button[@id='btnNext332']").nth(0).click();


// ADD new rew to select and eneter project hours
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

// ADD Remarks for the hours
await f.locator("//a[@title='Click to Add/View Remarks' and text()='R']").nth(0).click();
await f.locator("//a[@title='close Window']").nth(0).click();
await f.locator("//a[@title='Click to Add/View Remarks' and text()='R']").nth(0).click();
await f.locator("//*[text()=' Remarks']").nth(0).isVisible();
await f.locator("//textarea").nth(0).clear();
await f.locator("//textarea").nth(0).fill('Hello');
await f.locator("//a[@title='close Window']").nth(0).click();
await f.locator("//a[@title='Click to Add/View Remarks' and text()='R']").nth(0).click();
await expect(f.locator("//textarea").nth(0)).toHaveValue('Hello');
await f.locator("//a[@title='close Window']").nth(0).click();




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



await page.waitForTimeout(3000);











})