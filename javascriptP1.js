// <<<<<<< john
//adding the gradient background

let cityName = $(".city")

let cityInput = $(".cityInput")


// Here we are building the URL we need to query the database
var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName



// Here we run our AJAX call to the openBrewer API
// $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function (response) {

//         // Log the queryURL
//         console.log(queryURL);

//         // Log the resulting object
//         console.log(response);

//         // Transfer content to HTML
//         $(".city").html(response.city);
//         $(".address").text("Address: " + response);
//         $(".website").text("Website: " + response._________);
//         $(".phoneNumber").text("Phone Number: " + response.________);
//     })