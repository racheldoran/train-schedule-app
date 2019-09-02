$(document).ready(function () {
  console.log("WAZZAAAAAPPP");

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

    // Change the HTML to reflect
    $("#train-display").text(snapshot.val().train);
    $("#destination-display").text(snapshot.val().destination);
    $("#next-display").text(snapshot.val().time);
    $("#frequency-display").text(snapshot.val().frequency);

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



  var freq = 4;

  var firstTime = "05:30";

  var convert = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(convert);

  var now = moment();
  console.log("CURRENT TIME: " + moment(now).format("hh:mm"));

  var later = moment().diff(moment(convert), "minutes");
  console.log("Difference In Time: " + later);

  var tRemainder = now % freq;
  console.log(tRemainder);

  var minTill = freq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minTill);

  var nextTrain = moment().add(minTill, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("ddd, hA"));
  $("#time-display").append(minTill);
  $("#next-display").text(nextTrain.format("ddd, hA"));
})


