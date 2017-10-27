/* global moment firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBussLktrk2QHP-IaRtyHgO2b3tEDezu_I",
    authDomain: "practice-project-db6d5.firebaseapp.com",
    databaseURL: "https://practice-project-db6d5.firebaseio.com",
    projectId: "practice-project-db6d5",
    storageBucket: "practice-project-db6d5.appspot.com",
    messagingSenderId: "214309781264"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var employeeName = "";
var employeeRole = "";
var startDate = "";
var monthsWorked = 0;
var monthlyRate = 0;
var totalBilled = 0;

// --------------------------------------------------------------

$("#submit-bid").on("click", function () {
    // Don't refresh the page!
    event.preventDefault();

    employeeName = $("#employee-name").val().trim();
    employeeRole = $("#employee-role").val().trim();
    startDate = $("#employee-start").val().trim();
    monthlyRate = $("#employee-rate").val().trim();

    //All our calculations
    var now = moment();
    var oldDate = moment(startDate);
    
    var calculatedMonthsWorked = now.diff(oldDate, 'months');
    console.log("Calculated Months Worked: " + calculatedMonthsWorked);
   
    var totalBilled = monthlyRate * calculatedMonthsWorked;
    console.log("Total billed: " + totalBilled);
    
    // Don't forget to handle the "initial load"

    database.ref().push({
        employeeName: employeeName,
        employeeRole: employeeRole,
        startDate: startDate,
        monthsWorked: calculatedMonthsWorked,
        monthlyRate: monthlyRate,
        totalBilled: totalBilled,
    });

});

database.ref().on("child_added", function (childSnapshot) {

    //console logging all this data
    console.log(childSnapshot.val().employeeName);
    console.log(childSnapshot.val().employeeRole);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);
    console.log(childSnapshot.val().monthsWorked);
    console.log(childSnapshot.val().totalBilled);

    // Adding data to the table
    var tableData = "<tr><td>" + childSnapshot.val().employeeName + "</td><td>" + childSnapshot.val().employeeRole + "</td><td>" + childSnapshot.val().startDate + "</td><td>" + childSnapshot.val().monthsWorked + "</td><td>" + childSnapshot.val().monthlyRate + "</td><td>" + childSnapshot.val().totalBilled + "</td></tr>";
    
    $("#employee-table").append(tableData);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});