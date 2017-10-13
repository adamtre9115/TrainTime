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

        // assign input info into variables
        var trainName = $("#trainName").val().trim();
        var trainDest = $("#trainDest").val().trim();
        var trainStart = $("#trainStart").val().trim();
        var trainFreq = $("#trainFreq").val().trim();

       
        // send it to firebase
        database.ref().push({
            trainName: trainName,
            trainDest: trainDest,
            trainStart: trainStart,
            trainFreq: trainFreq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        // clear input values
        $("#trainName").val("");
        $("#trainDest").val("");
        $("#trainStart").val("");
        $("#trainFreq").val("");

    });
    //end on click function 

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        
                    // console.log(prevChildKey);
        
                    var trainName = childSnapshot.val().trainName;
                    var trainDest = childSnapshot.val().trainDest;
                    var trainStart = childSnapshot.val().trainStart;
                    var trainFreq = childSnapshot.val().trainFreq;
        
                    //  time for frequency and next train minutes away 
                    // calculate next train arrival relative to current time
                    var freq = parseInt(trainFreq);

                    //Current time
                    var currentTime = moment();
    
                    //Push time back one year
                    
                    var dConverted = moment(childSnapshot.val().trainStart, 'HH:mm').subtract(1, 'years');
                    // console.log("DATE CONVERTED: " + dConverted);
                    var trainTime = moment(dConverted).format('HH:mm');
        
                    //difference between times
                    var timeConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
                    var timeDifference = moment().diff(moment(timeConverted), 'minutes');
        
                    //remaining time 
                    var timeRemainder = timeDifference % freq;

                    //minutes until next train
                    var minsAway = freq - timeRemainder;

                    //next train
                    var nextTrain = moment().add(minsAway, 'minutes').format('hh:mm A');
                    
                    // $("#tableBody").empty();
                    // append data to table
                       var newRow = $("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + " Min" + "</td><td>" + nextTrain + "</td><td>" + minsAway + " Min Away" + "</td></tr>");
                    $("#tableBody").append(newRow);
        
            
                });



});
//end document ready