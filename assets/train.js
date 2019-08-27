$(document).ready(function () {
    console.log("WAZZAP!!");

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

    // 2. Button for adding Trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDest = $("#destination-input").val().trim();
        var trainTime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
        var trainFreq = $("#frequency-input").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            time: trainTime,
            frequency: trainFreq
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
    });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFreq = childSnapshot.val().frequency;

        // Train Info
        console.log(trainName);
        console.log(trainDest);
        console.log(trainTime);
        console.log(trainFreq);


        var trainTimeLeft = 0;
        var frequent = 0;
        var arrivalTime = "";
      
        var trainStart = moment.unix(trainTime).format("hh:mm A");
        
        var trainMinutes = moment().diff(moment(trainTime, "X"), "minutes");
        console.log(trainMinutes);

        trainRemains = trainTimeLeft % frequent;

    // subtract the remainder from the frequency, store in var
        arrivalTime = frequent - trainRemains;

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainStart),
            $("<td>").text(trainMinutes),
            $("<td>").text(trainRemains),
            $("<td>").text(arrivalTime)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });

    // Example Time Math
    // -----------------------------------------------------------------------------
    // Assume Employee start date of January 1, 2015
    // Assume current date is March 1, 2016

    // We know that this is 15 months.
    // Now we will create code in moment.js to confirm that any attempt we use meets this test case

});




















