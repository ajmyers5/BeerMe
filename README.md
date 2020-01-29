# Group-666 - Project 1 "Beer Me"
Project 1 : Matt, John, Kellen, Andrew

## USERSTORY:
AS A beer connoisseur, I WANT a list of close breweries, SO THAT I can chose which one I'm most interested in from a list of options

## Beer Me
Beer Me is an app designed to help those thirsty beer connoisseurs locate a local beer establishment.  This app searches for local breweries and brewpubs, shows their location on a map, and allows the user to click on a desired brewery/brewpub for more details.

## Motivation
At Beer Me, we wanted to build out a beer-specific app to cut through the noise and get to the heart of delicious beers available within a close proximity.

## Screenshots
![BeerMe](https://user-images.githubusercontent.com/56936352/73216540-c9930780-411b-11ea-8f59-0eccb069f68f.png)

![MapScreenShot](https://user-images.githubusercontent.com/56936352/73318709-da1cae00-41ff-11ea-91f8-50b4756dcc57.png)

![Details1](https://user-images.githubusercontent.com/56936352/73318898-6cbd4d00-4200-11ea-88c9-1d26eb87043c.png)

![Details2](https://user-images.githubusercontent.com/56936352/73318941-878fc180-4200-11ea-9ccb-87fb7e1d9260.png)


## Features
Beer Me simplifies users search for local breweries.

## Code Example
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

## How to use?
Enter desired city name.  A map will populate close breweries where you will be able to select a brewery and view it's details (address, style, phone number, hours, etc)

## Links
https://ajmyers5.github.io/Group-666/
https://github.com/ajmyers5/Group-666


