$(document).ready(function () {

    //adding event listeners to form and button

    $("#findBtn").on("click", citySearch)
    $("#searchForm").on("submit", citySearch)

    function citySearch(e) {
        e.preventDefault()

        let city = $("#cityInput").val()

        const queryURL =
            `https://api.foursquare.com/v2/venues/explore?client_id=VBSRR4N0G21AGXXAQBIVHVETVMY5EMFV20R2AFBIENJKXHR2&client_secret=CI51EWKVLWPWG4YXIT1LR5OOKWDJDM3OLQVJBZRPC0QPCD0V&v=20180323&near=${city}&query=brewery`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //these are coords for creating map
            console.log("Lat: " + response.response.geocode.center.lat)
            console.log("Long: " + response.response.geocode.center.lng)

            //explore endpoint gets a list of recommended breweries in the search area

            let venueArray = response.response.groups[0].items;
            //prints info of each brewery
            venueArray.forEach(function (venue) {
                console.log(venue.venue);
            });
        });
    }


})