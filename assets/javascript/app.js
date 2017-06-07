//Javascript used to run the Current Time displayed in Jumbotron
//=====================================================================================
function startTime() {
	    var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
	    var s = today.getSeconds();
	    m = checkTime(m);
	    s = checkTime(s);
	    document.getElementById('clock').innerHTML =
	    "<h4>" + "Current Time: " + h + ":" + m + ":" + s + "</h4>";
	    var t = setTimeout(startTime, 500);
	}
	function checkTime(i) {
	    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	    return i;
	}

$(document).ready(function() {
	//Global Variables
	//=====================================================================================
	var train = "";
	var destination = "";
	var firstTrain = "";
	var frequency = "";

		//Initalize Firebase
		var config = {
		    apiKey: "AIzaSyBxIkErP9S41JD86v7Wqvj8wz1Ml8jIc7w",
		    authDomain: "trainscheduler-57f03.firebaseapp.com",
		    databaseURL: "https://trainscheduler-57f03.firebaseio.com",
		    projectId: "trainscheduler-57f03",
		    storageBucket: "trainscheduler-57f03.appspot.com",
		    messagingSenderId: "800755869274"
		  };
		  firebase.initializeApp(config);

		  //Creates a Variable to Reference the Database
		  var database = firebase.database();

		  //When Submit Button is Clicked - Add Train Data
		  $("#submit").on("click", function() {
		  	train = $("#addTrain").val();
		  	destination = $("#addDestination").val();
		  	firstTrain = $("#addFirst").val();
		  	frequency = $("#addFrequency").val();

		  	//Empties Fields after Submitting Data
		  	$("#addTrain").val("");
		  	$("#addDestination").val("");
		  	$("#addFirst").val("");
		  	$("#addFrequency").val();

		  	//Sets and saves the new inputs to Firebase
		  	database.ref().set({
		  		train: train,
		  		destination: destination,
		  		firstTrain: firstTrain,
		  		frequency: frequency,
		  	});

		  	return false;

		  }); //End of Click Function

		  //Function for Data. At initial load and on subsequent data value changes, gets a snapshot of the current data
		  //This callback keeps the page updated when a value changes in Firebase
		  database.ref().on("child_added", function(snapshot) {
		  	//Logs the snapshot values
		  	console.log(snapshot.val().train = " = train");
		  	console.log(snapshot.val().destination = " = destination");
		  	console.log(snapshot.val().firstTrain = " = nextTrain");
		  	console.log(snapshot.val().frequency = " = frequency");

		  	//Variables assigned to equal the value of the child_added inputs
		  	var train = snapshot.val().train;
		  	var destination = snapshot.val().destination;
		  	var firstTrain = snapshot.val().firstTrain;
		  	var frequency = snapshot.val().frequency;

		  	//Moment.JS
		  	var timeHour = moment().format('H');
		  	var timeMin = moment().format('m');
		  	var ftHour = moment(firstTrain, "HH:mm").format('H');
		  	var ftMin = moment(firstTrain, "HH:mm").format('m');

		  	var ftMoment = (ftHour * 60) + (ftMin * 1);
		  	var timeMoment = (timeHour * 60) + (timeMin * 1);

		  	//Appends new info to the table
		  	$(".table").find("#trainData").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td></tr>")
		  });



}); //End of JS