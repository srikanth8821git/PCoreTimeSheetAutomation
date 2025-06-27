function getDateStatus(givenDateStr) {
  // Parse the date directly (this format is generally supported)
const givenDate = new Date(givenDateStr);

// Get today's actual system date
const currentDate = new Date();

// Remove time from both dates
givenDate.setHours(0, 0, 0, 0);
currentDate.setHours(0, 0, 0, 0);

// Compare
if (isNaN(givenDate)) {
    console.log("Invalid date format.");
} else if (givenDate < currentDate) {
    console.log("The date is in the past.");
    return "pastDate";
} else if (givenDate > currentDate) {
    console.log("The date is in the future.");
    return "futureDate";
} else {
    console.log("The date is today.");
    return "currentDate";
}

  


}


  module.exports = {
  getDateStatus
};