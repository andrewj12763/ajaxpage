$(document).ready(function () {
	// Current buttons
	var displayedButtons = ["Aragon", "Bilbo", "Frodo"];
	// display img for on click cammand
	function displayImg() {
		$("#display-images").empty();
		var input = $(this).attr("data-name");
		var limit = 10;
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=oRvaQNV8pKfRr5PNoO1mLYORNsRwVCex";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			for (var j = 0; j < limit; j++) {
				var displayDiv = $("<div>");
				displayDiv.addClass("holder");
				// pull img data from return
				var image = $("<img>");
				image.attr("src", response.data[j].images.original_still.url);
				// place img as still
				image.attr("data-still", response.data[j].images.original_still.url);
				// place img as animate
				image.attr("data-animate", response.data[j].images.original.url);
				image.attr("data-state", "still");
				image.attr("class", "gif");
				// add img to display div
				displayDiv.append(image);
				// add rating to picture with p tag
				var rating = response.data[j].rating;
				console.log(response);
				var pRating = $("<p>").text("Rating: " + rating);
				displayDiv.append(pRating)
				// add img to page
				$("#display-images").append(displayDiv);
			}
		});
	}
// add button to page after search
	function makeButtons() {
		$("#display-buttons").empty();
		// create for every searched item(ie for loop)
		for (var i = 0; i < displayedButtons.length; i++) {
			// creat button and att to variable
			var newButton = $("<button>")
			// add attributes to new buttons 
			newButton.attr("class", "btn btn-default");
			newButton.attr("id", "input")
			newButton.attr("data-name", displayedButtons[i]);
			newButton.text(displayedButtons[i]);
			// add button variable to page
			$("#display-buttons").append(newButton);
		}
	}
//  changing the img's state function
	function imageChangeState() {
//  make variables for current and both states
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");
// if else statemnets to change the src of the img on state
		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}
// sumbit button fucntion
	$("#submitPress").on("click", function () {
    // pulling value and triming user input
		var input = $("#user-input").val().trim();
		// for reset is an awesome function
		form.reset();
		displayedButtons.push(input);

		makeButtons();

		return false;
	})

	makeButtons();
// on click the functions
	$(document).on("click", "#input", displayImg);
	$(document).on("click", ".gif", imageChangeState);
});