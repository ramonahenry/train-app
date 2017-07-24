
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCfWXcRMi-if9o07hCe8qRCio1ucO8zIFc",
    authDomain: "trainapp-b229b.firebaseapp.com",
    databaseURL: "https://trainapp-b229b.firebaseio.com",
    projectId: "trainapp-b229b",
    storageBucket: "trainapp-b229b.appspot.com",
    messagingSenderId: "469587587401"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

//add captured input values to database
database.ref().on("child_added", function(childsnapshot) {

    var trainName = childsnapshot.val().trainName;
    var destination = childsnapshot.val().destination;
    var trainStart = childsnapshot.val().trainStart;
    var frequency = childsnapshot.val().frequency;
    var min = childsnapshot.val().min;
    var nextTrain = childsnapshot.val().nextTrain;

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainStart + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + min + "</td></tr>");

    if (min < 6){
      $("td").css("color", "red");
    }
});

// Make sure to remove all "dead" code from your scripts

//capture form value and push to divs
$("#add-train").on("click", function() {

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var trainStart = $("#train-time-input").val().trim();
    var frequency = $("#freq-input").val().trim();

    //error handling values

    // 1. Mak= sure to always use "===" comparison operators. With "==" the type you're comparing can actually switch on you in upredictable ways

    // 2. Since you are checking for empty strings here `""` you can actually omit the comparison altogether and just check for whether the variables contain anything at all (as opposed to `undefined`). See https://developer.mozilla.org/en-US/docs/Glossary/Truthy for more details
    if (!trainName) { 
        alert(' You must enter a train.');
        return false;
    }
    if (!destination) {
        alert('You must enter a destination.');
        return false;
    }
    if (!trainStart) {
        alert('You must enter a train start time.');
        return false;
    }
    if (!frequency) {
        alert('You must enter a frequency.');
        return false;
    }

    //Next train calculations using movment
    var trainStartCalc = moment(trainStart, "hh:mm").subtract("1, years");
    
    var difference = currentTime.diff(moment(trainStartCalc), "minutes");
    var remainder = difference % frequency;
    var nextTrainTime = frequency - remainder;
    var nextTrain = moment().add(nextTrainTime, "minutes").format("hh:mm a");

    var newTrain = {
        trainName: trainName,
        destination: destination,
        trainStart: trainStart,
        frequency: frequency,
        min: nextTrainTime,
        nextTrain: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#train-time-input").val("");
    $("#freq-input").val("");

    return false;
});

    
