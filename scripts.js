$(document).ready(function() {
  //adding event listeners
  $(document).on("click", function(e) {
    if (e.target.className === "detailsLink") {
      // console.log(e.target);

      let id = e.target.id; //id for making premium call
      let parentEl = e.target.parentElement.parentElement; //element to modify
      $.ajax({
        //PREMIUM API CALL for venue details
        url: `https://api.foursquare.com/v2/venues/${id}?client_id=VBSRR4N0G21AGXXAQBIVHVETVMY5EMFV20R2AFBIENJKXHR2&client_secret=CI51EWKVLWPWG4YXIT1LR5OOKWDJDM3OLQVJBZRPC0QPCD0V&v=20180323`,
        method: "GET"
      }).then(function(response) {
        // Expand tooltip to show more info
        $(parentEl).append(
          `<p>Price rating: ${response.response.venue.price.currency}</p>`
        );

        if (response.response.venue.description !== undefined) {
          $(parentEl).append(`<p>${response.response.venue.description}</p>`);
        }
        $(parentEl).append(
          `<p>${response.response.venue.contact.formattedPhone}</p>`
        );
        $(parentEl).append(
          `<a href="${response.response.venue.url}">${response.response.venue.url}</a>`
        );
        $(e.target.parentElement).remove(); // delete 'More details' link
      });
    }
  });

  $("#findBtn").on("click", citySearch);
  $("#searchForm").on("submit", citySearch); // Enables pressing enter to search

  // function showDetailCard(id) {
  //   // console.log(id);
  //   $.ajax({
  //     //PREMIUM API CALL for venue details
  //     url: `https://api.foursquare.com/v2/venues/${id}?client_id=VBSRR4N0G21AGXXAQBIVHVETVMY5EMFV20R2AFBIENJKXHR2&client_secret=CI51EWKVLWPWG4YXIT1LR5OOKWDJDM3OLQVJBZRPC0QPCD0V&v=20180323`,
  //     method: "GET"
  //   }).then(function(response) {
  //     //fill in card details
  //     // console.log(response);
  //     $("#breweryName").text(response.response.venue.name);
  //     $("#breweryPrice").text(
  //       `Price rating: ${response.response.venue.price.currency}`
  //     );
  //     $("#breweryAddress").empty();
  //     $("#breweryAddress").append(
  //       `<p>${response.response.venue.location.formattedAddress[0]}</p><p>${response.response.venue.location.formattedAddress[1]}</p><p>${response.response.venue.contact.formattedPhone}</p>`
  //     );
  //     $("#breweryWebsite").empty();
  //     $("#breweryWebsite").append(
  //       `<a href="${response.response.venue.url}">${response.response.venue.url}</a>`
  //     );
  //     if (response.response.venue.description !== undefined) {
  //       $("#breweryDes").text(response.response.venue.description);
  //     } else {
  //       $("#breweryDes").empty();
  //     }
  //     $("#cardImg").attr(
  //       "src",
  //       `${response.response.venue.bestPhoto.prefix}${response.response.venue.bestPhoto.width}x${response.response.venue.bestPhoto.height}${response.response.venue.bestPhoto.suffix}`
  //     );
  //     $("#cardDiv").show();
  //   });
  // }

  function citySearch(e) {
    e.preventDefault();

    if ($("#cityInput").val() !== "") {
      //only run event if search form isn't empty
      $("#cardDiv").hide();

      let city = $("#cityInput").val();

      const queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=VBSRR4N0G21AGXXAQBIVHVETVMY5EMFV20R2AFBIENJKXHR2&client_secret=CI51EWKVLWPWG4YXIT1LR5OOKWDJDM3OLQVJBZRPC0QPCD0V&v=20180323&limit=10&near=${city}&query=brewery`;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $("#map").show();
        $('html, body').animate({
          scrollTop: ($('#map').offset().top)
      },500);

        //these are coords for creating map
        let lat = response.response.geocode.center.lat;
        let long = response.response.geocode.center.lng;
        // console.log(lat);
        // console.log(long);

        //explore endpoint gets a list of recommended breweries in the search area

        let venueArray = response.response.groups[0].items;
        let featuresArray = []; //array for map icons
        //add info of each brewery to features array so we can use them to display the icons on the map
        venueArray.forEach(function(venue) {
          // console.log(venue.venue);
          featuresArray.push({
            type: "Feature",
            properties: {
              description: `<h6><strong>${venue.venue.name}</strong></h6><p>${venue.venue.location.formattedAddress[0]}</p><p>${venue.venue.location.formattedAddress[1]}</p><p><a href="#" id="${venue.venue.id}" class="detailsLink">More details</a></p>`,
              icon: "beer"
            },
            geometry: {
              type: "Point",
              coordinates: [venue.venue.location.lng, venue.venue.location.lat]
            }
          });
        });
        // console.log(featuresArray);
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
              "icon-allow-overlap": true,
              "icon-size": 1.5
            }
          });
        });

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: true
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

        // map.on("mouseleave", "places", function() {
        //   map.getCanvas().style.cursor = "";
        //   popup.remove();
        // });

        // map.on("click", "places", function() {
        //   map.getCanvas().style.cursor = "";
        //   popup.remove();
        // });
        map.on("click", "places", function(e) {
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
      });
    }
  }
});

var granimInstance = new Granim({
  element: '#canvas-basic',
  direction: 'left-right',
  // isPausedWhenNotInView: true,
  states: {
      "default-state": {
          gradients: [
              ['#E7BF2D', '#FFD848'],
              ['#FFF3C4', '#E7CA56'],
              ['#FECC08', '#E5BB16'],
              ['#CC9200', '#EBC159'],
          ]
      }
  }
});