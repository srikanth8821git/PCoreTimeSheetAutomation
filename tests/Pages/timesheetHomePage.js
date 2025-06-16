const { expect } = require('@playwright/test');
exports.MyTimesheetHomePage=
class MyTimesheetHomePage{

    constructor(page)
    {
        this.page=page;
        this.frameContents='//frame[@name="contents"]';
        this.expandTimesheet='//a[@id="PCIMenun28"]';
        this.selectMyTimeSheet='#PCIMenut29';
        this.frameMain='//frame[@name="main"]';
        this.nextButton='//button[@id="btnNext32"]';
        this.prevButton='//button[@id="btnPre"]';
        this.weekRange='//span[@class="weekrange"]';
        this.timesheetLastSubmittedLabel= (msg) => `//label[contains(text(),'${msg}')]`;
        this.addremarks='//a[@title="Click to Add/View Remarks" and text()="R"]';
        this.closeremarkswindow='//a[@title="close Window"]';
        this.remarkslabel='//*[text()=" Remarks"]';
        this.remarkstext='//textarea';
        this.addprojectbutton='//button[@title="Click to add new row"]';
        this.viewprojects='//input[@title="Click to view ticket options"]';
        this.deleteproject='//button[@id="btnNext332"]';
        this.selectproject='//a[@class="goToEdit"]';
        this.selectprojectactivity='//select[@id="selectedActivity"]';
        this.selectprojectgroup='//select[@id="selectedGroup"]';
        this.savetimesheetmsg='//button[@title="Click to save timesheet"]';
        this.submittimesheetmsg='//p[text()="Timesheet saved successfully"]';
        this.totalhourscalculated='//div[@class="col-1 timeColumn rowheight totalColumn weekTotalLow"]';

    }

    async navigateToMyTimesheetLandingPage(){

    await this.page.frameLocator(this.frameContents).locator(this.expandTimesheet).click();
    await this.page.frameLocator(this.frameContents).locator(this.selectMyTimeSheet).click();
}

async navigateBetweenTimeSheets(){
    
    expect(await this.page.frameLocator(this.frameMain).locator(this.nextButton).isDisabled());
    await this.page.frameLocator(this.frameMain).locator(this.prevButton).click();
    await this.page.frameLocator(this.frameMain).locator(this.nextButton).click();
}

async addRemarksToHoursFilled(projectremarks){

const f= this.page.frameLocator(this.frameMain);

await f.locator(this.addremarks).nth(0).click();
await f.locator(this.closeremarkswindow).nth(0).click();
await f.locator(this.addremarks).nth(0).click();
await f.locator(this.remarkslabel).nth(0).isVisible();
await f.locator(this.remarkstext).nth(0).clear();
await f.locator(this.remarkstext).nth(0).fill(projectremarks);
await f.locator(this.closeremarkswindow).nth(0).click();
await f.locator(this.addremarks).nth(0).click();
await expect(f.locator(this.remarkstext).nth(0)).toHaveValue(projectremarks);
await f.locator(this.closeremarkswindow).nth(0).click();

}


async addProjectDetails(projectgroup,projectactivity){

  const framez2 =this.page.frameLocator(this.frameMain);

  if(await framez2.locator(this.deleteproject).nth(0).isVisible())
    {
        await framez2.locator(this.deleteproject).nth(0).click();
    }

await framez2.locator(this.addprojectbutton).click();

await this.page.on('dialog', async dialog=>{
 
    //expect (dialog.type()).toContain('alert');
    //expect (dialog.message()).toContain('Ticket List')
    //await dialog.page().locator("//div[@class='modal-content']//a[@class='goToEdit']").click();
   
    await dialog.accept();

})

 await framez2.locator (this.viewprojects).click();
await framez2.locator(this.selectproject).click(); 
await framez2.locator(this.selectprojectgroup).nth(2).selectOption(projectgroup);
await framez2.locator(this.selectprojectactivity).nth(2).selectOption(projectactivity);



}

async verifyTimeSheetDates(){

    const dateRange=await this.page.frameLocator(this.frameMain).locator(this.weekRange).textContent();

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

const fr=await this.page.frameLocator(this.frameMain);
await expect(await fr.locator(this.timesheetLastSubmittedLabel(msg))).toBeVisible();

}


async addHoursAndSubmitTimeSheet(){

if(await this.page.frameLocator(this.frameMain).nth(14).isEnabled())
{

  await this.page.frameLocator(this.frameMain).nth(14).selectOption('8');
}

if(await this.page.frameLocator(this.frameMain).nth(15).isEnabled())
{

  await this.page.frameLocator(this.frameMain).nth(15).selectOption('8');
}

if(await this.page.frameLocator(this.frameMain).nth(16).isEnabled())
{
 
  await this.page.frameLocator(this.frameMain).nth(16).selectOption('8');
}
if(await this.page.frameLocator(this.frameMain).nth(17).isEnabled())
{

  await this.page.frameLocator(this.frameMain).nth(17).selectOption('8');
}

if(await this.page.frameLocator(this.frameMain).nth(18).isEnabled())
{
 
  await this.page.frameLocator(this.frameMain).nth(18).selectOption('8');
}

let totalhours=0;
for(let i=0;i<21;i++)
{

  totalhours=totalhours +  parseFloat(await this.page.frameLocator(this.frameMain).nth(i).inputValue());

}




const tothrs=await this.page.frameLocator(this.frameMain).locator(this.totalhourscalculated).nth(0).textContent();

//Save and Submit time sheet if hours equals to 40 

if (toString(tothrs)==toString(totalhours) && totalhours==40)
{
await this.page.frameLocator(this.frameMain).locator(this.savetimesheetmsg).click();
await this.page.frameLocator(this.frameMain).locator(this.submittimesheetmsg).isVisible();
}
else
{

  console.log("total time mismatch  ",totalhours);
  //console.log("total   ",tothrs);
}

if (totalhours==40)
{
    await expect(await this.page.frameLocator(this.frameMain).locator("#submit")).toBeEnabled();
    await expect(await this.page.frameLocator(this.frameMain).locator("#submit")).click();
}
else
{
    await expect(await this.page.frameLocator(this.frameMain).locator("#submit")).toBeDisabled();
      
}




}



}