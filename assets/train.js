$(document).ready(function () {
  console.log("it's Britney Bitch");

  // 1. Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyBxVc5Lcw22qDj3HLH6y_hWX7efbKUVums",
    authDomain: "rachel-doran-s-project.firebaseapp.com",
    databaseURL: "https://rachel-doran-s-project.firebaseio.com",
    projectId: "rachel-doran-s-project",
    storageBucket: "",
    messagingSenderId: "416300720933",
    appId: "1:416300720933:web:f70271a6caaf7830"

  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // Initial Values
  var train = "";
  var destination = 0;
  var time = 0;
  var frequency = 0;


  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    train = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for "Setting values in the database"
    database.ref().set({
      train: train,
      destination: destination,
      time: time,
      frequency: frequency
    });

  });

  // Firebase watcher + initial loader HINT: .on("value")
  database.ref().on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().train);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snapshot.val().frequency);

     // you will need to calculate this
  var nextArrival = "9:00am ";

  // you will need to calculate this
  var minsAway = 4;

    $(".train-crap").append(
      `
  <tr>
    <td id="train-display">${snapshot.val().train}</td>
    <td id="destination-display">${snapshot.val().destination}</td>
    <td id="frequency-display">${snapshot.val().frequency}</td>
    <td id="time-display">${nextArrival}</td>
    <td id="minutes-display">${minsAway}</td>
  </tr>
`
    );

    var firstTimeConverted = moment(nextArrival, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    // Time apart (remainder)
    var tRemainder = diffTime % minsAway;
    console.log(tRemainder);
  
    // Minute Until Train
    var tMinutesTillTrain = minsAway - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    $("#minutes-display").text(minsAway);
    $("#time-display").text(nextArrival + format("hh:mm"))

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

})


