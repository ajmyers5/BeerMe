$(document).ready(function() {
  //adding event listeners to form and button

  $("#findBtn").on("click", citySearch);
  $("#searchForm").on("submit", citySearch);

  function citySearch(e) {
    e.preventDefault();

    if ($("#cityInput").val() !== "") {
      //only run event if search form isn't empty
      let city = $("#cityInput").val();

      const queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=VBSRR4N0G21AGXXAQBIVHVETVMY5EMFV20R2AFBIENJKXHR2&client_secret=CI51EWKVLWPWG4YXIT1LR5OOKWDJDM3OLQVJBZRPC0QPCD0V&v=20180323&limit=10&near=${city}&query=brewery`;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //these are coords for creating map
        let lat = response.response.geocode.center.lat;
        let long = response.response.geocode.center.lng;
        console.log(lat);
        console.log(long);

        //explore endpoint gets a list of recommended breweries in the search area

        let venueArray = response.response.groups[0].items;
        console.log(venueArray[0].venue);
        //prints info of each brewery
        venueArray.forEach(function(venue) {
          console.log(venue.venue);
        });
        $("#map").empty(); // empty map div before we add a new one
        mapboxgl.accessToken =
          "pk.eyJ1Ijoia3A0MDUiLCJhIjoiY2s1cXl0emlzMDdvbDNtb250bXVveWFmcyJ9.JsFjY-BuUw2XW1CYWrZVVw";
        var map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [long, lat], // starting position
          zoom: 12 // starting zoom
        });
        map.addControl(new mapboxgl.NavigationControl()); //add controls
      });
    }
  }
});
