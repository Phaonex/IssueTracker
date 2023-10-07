const issueTracker = require("./issueTracker");
 
const tracker = new issueTracker.issueTracker()

console.info("calculated the due times:", tracker.calculatedDueDate([{date: "3 October 2023", time: "14:00"}], 16))
