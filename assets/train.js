$(document).ready(function () {
    console.log("it's bitney bitch");

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
    var destination = "";
    var time = 0;
    var frequency = "";

    // Capture Button Click
    $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      train = $("#train-name-input").val().trim();
      destination = $("#destination-input").val().trim();
      time = $("#time-input").val().trim();
      requency = $("#frequency-input").val().trim();

      // Code for handling the push
      database.ref().push({
        train: train,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.train);
      console.log(sv.destination);
      console.log(sv.time);
      console.log(sv.frequency);

      // Change the HTML to reflect
      $("#name-display").text(sv.train);
      $("#email-display").text(sv.destination);
      $("#age-display").text(sv.time);
      $("#comment-display").text(sv.frequency);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

})