$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDJGKPVRLld2xjCPra7MsWO3_Nc2Zx793M",
        authDomain: "trainschedule-1b60d.firebaseapp.com",
        databaseURL: "https://trainschedule-1b60d.firebaseio.com",
        projectId: "trainschedule-1b60d",
        storageBucket: "",
        messagingSenderId: "358087709153"
    };
    firebase.initializeApp(config);

    //   variables
    var database = firebase.database();

    //   capture entered train information
    $("#enterBtn").on("click", function (e) {
        e.preventDefault();

        var trainName = $("#trainName").val().trim();
        var trainDest = $("#trainDest").val().trim();
        var trainStart = $("#trainStart").val().trim();
        var trainFreq = $("#trainFreq").val().trim();

        console.log(trainName);
        console.log(trainDest);
        console.log(trainStart);
        console.log(trainFreq);


        // send it to firebase
        database.ref().push({
            trainName: trainName,
            trainDest: trainDest,
            trainStart: trainStart,
            trainFreq: trainFreq
        });

        // firebase event to add info to table 
        database.ref().on("child_added", function (snapshot) {
            var trainName = snapshot.val().trainName;
            var trainDest = snapshot.val().trainDest;
            var trainStart = snapshot.val().trainStart;
            var trainFreq = snapshot.val().trainFreq;

            console.log(snapshot.val());
            console.log(trainName);
            console.log(trainDest);
            console.log(trainFreq);

            //  time for frequency and next train minutes away 
            // calculate next train arrival relative to current time
            var freq = parseInt(trainFreq);
            //CURRENT TIME
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment().format('HH:mm'));
            //FIRST TIME: PUSHED BACK ONE YEAR TO COME BEFORE CURRENT TIME
            // var dConverted = moment(time,'hh:mm').subtract(1, 'years');
            var dConverted = moment(snapshot.val().trainStart, 'HH:mm').subtract(1, 'years');
            console.log("DATE CONVERTED: " + dConverted);
            var trainTime = moment(dConverted).format('HH:mm');
            console.log("TRAIN TIME : " + trainTime);

            //DIFFERENCE B/T THE TIMES 
            var timeConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
            var timeDifference = moment().diff(moment(timeConverted), 'minutes');
            console.log("DIFFERENCE IN TIME: " + timeDifference);
            //REMAINDER 
            var timeRemainder = timeDifference % freq;
            console.log("TIME REMAINING: " + timeRemainder);
            //MINUTES UNTIL NEXT TRAIN
            var minsAway = freq - timeRemainder;
            console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
            //NEXT TRAIN
            var nextTrain = moment().add(minsAway, 'minutes');
            console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));

            // append data to table
            // $("#tableBody").append(
            //     "<tr><td>" + snapshot.val().trainName + "</td></tr>"
            // )

        });

    });
    //end on click function 





});
//end document ready