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
        let featuresArray = []; //array for map icons
        //add info of each brewery to features array so we can use them to display the icons on the map
        venueArray.forEach(function(venue) {
          console.log(venue.venue);
          featuresArray.push({
            type: "Feature",
            properties: {
              description: `<strong>${venue.venue.name}</strong><p>This is a bar</p>`,
              icon: "bar"
            },
            geometry: {
              type: "Point",
              coordinates: [venue.venue.location.lng, venue.venue.location.lat]
            }
          });
        });
        console.log(featuresArray);
        $("#map").empty(); // empty map div before we add a new one
        mapboxgl.accessToken =
          "pk.eyJ1Ijoia3A0MDUiLCJhIjoiY2s1cXl0emlzMDdvbDNtb250bXVveWFmcyJ9.JsFjY-BuUw2XW1CYWrZVVw";
        var map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [long, lat], // starting position
          zoom: 11 // starting zoom
        });
        map.addControl(new mapboxgl.NavigationControl()); //add controls
        map.on("load", function() {
          // Add a layer showing the places.
          map.addLayer({
            id: "places",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: featuresArray
              }
            },
            layout: {
              "icon-image": "{icon}-15",
              "icon-allow-overlap": true
            }
          });
        });

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.on("mouseenter", "places", function(e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
        });

        map.on("mouseleave", "places", function() {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    }
  }
});
