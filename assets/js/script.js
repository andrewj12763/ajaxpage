var queryURLBase = "https://api.giphy.com/v1/gifs/random?api_key=oRvaQNV8pKfRr5PNoO1mLYORNsRwVCex&tag=";

$("#addAnimal").on("click", function () {

	searchTerm = $('#animal-input').val();
	var queryURL = queryURLBase + searchTerm + '10';
	console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);
		var imageUrl = response.data.image_original_url;
		var catImage = $("<img>");

		catImage.attr("src", imageUrl);
		catImage.attr("alt", "cat image");

		$("#images").append(catImage);
	});
});



$('#clear').on('click', function () {

	$('.well').html("");

});