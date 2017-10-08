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
    $("#enterBtn").on("click", function(e){
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
        database.ref().on("child_added", function(snapshot){
            var trainName = snapshot.val().trainName;
            var trainDest = snapshot.val().trainDest;
            var trainFreq = snapshot.val().trainFreq;

            console.log(snapshot.val());
            console.log(trainName);
            console.log(trainDest);
            console.log(trainFreq);

            //  time for frequency and next train minutes away 
        });

    });
    //end on click function 
    
    // calculate next train arrival relative to current time




});
//end document ready