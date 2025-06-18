function getCurrentWeekMonday() {
  let d = new Date();

  let currentMonth = d.getMonth();
  let currentYear = d.getFullYear();
  let currentDate = d.getDate();
  let currentDay = d.getDay();

  if (currentDay == 0) {
    currentDay = 7;
  }

  let monday = currentDate - (currentDay - 1);
  let month = currentMonth + 1;
  //console.log(monday);

  month = month.toString().padStart(2, "0");
  monday = monday.toString().padStart(2, "0");

  let fullDate = month + "/" + monday + "/" + currentYear;

  return fullDate; // Returns in MM/DD/YYYY
}

function getCurrentWeekSunday() {
  let d = new Date();

  let currentMonth = d.getMonth();
  let currentYear = d.getFullYear();
  let currentDate = d.getDate();
  let currentDay = d.getDay();
  let datefiff = -1;

  switch (currentDay) {
    case 0:
      datefiff = 0;
      break;
    case 1:
      datefiff = 6;
      break;
    case 2:
      datefiff = 5;
      break;
    case 3:
      datefiff = 4;
      dt = 3 - 2;
      break;
    case 4:
      datefiff = 3;
      break;
    case 5:
      datefiff = 2;
      break;
    case 6:
      datefiff = 1;
  }

  let sunday = currentDate + datefiff;
  let month = currentMonth + 1;

  month = month.toString().padStart(2, "0");
  sunday = sunday.toString().padStart(2, "0");

  let fullDate = month + "/" + sunday + "/" + currentYear;

  return fullDate; // Returns in MM/DD/YYYY
}

function getPreviousDay(userDate) {
  const [m, dt, y] = userDate.split("/");
  const date = new Date(`${y}-${m}-${dt}`);
  date.setDate(date.getDate() - 1);

  const previousDate =
    `${(date.getMonth() + 1).toString().padStart(2, "0")}/` +
    `${date.getDate().toString().padStart(2, "0")}/` +
    `${date.getFullYear()}`;

  return previousDate; // Returns in MM/DD/YYYY
}

module.exports = {
  getCurrentWeekMonday,
  getCurrentWeekSunday,
  getPreviousDay,
};
