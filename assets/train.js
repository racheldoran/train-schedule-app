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


    // 2. Button for adding Trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Initial Values
        var trainName = "";
        var trainDest = "";
        var trainTime = 0;
        var trainFreq = 0;


        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDest = $("#destination-input").val().trim();
        var trainTime = moment($("#time-input").val().trim(), "hh:mm A").format("X");
        var trainFreq = $("#frequency-input").val().trim();

        // Creates local "temporary" object for holding train data
        database.ref().push({
            name: trainName,
            destination: trainDest,
            time: trainTime,
            frequency: trainFreq
        })

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

    
        var tFrequency = 4;
        
        // Time //
        var firstTime = "5:30pm";

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    });

    var newRow = $("<tr>").append(
        
        $("<td>").text(diffTime),
        $("<td>").text(tRemainder),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").text(nextTrain),

    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

    // Handle the errors
} ,function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});





















