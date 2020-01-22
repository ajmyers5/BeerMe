# Group-666
Project 1 : Matt, John, Kellen, Andrew

USERSTORY:
As a beer connoisseur, I want a list of close breweries, so that I can chose which one I'm most interested in from a list of options

PSEUDOCODE:

Kellen:
some pseudocode:
-find breweries near location
-get list of beers they are selling from menu
-show info about each beer to user
-if user clicks on a beer, highlight which brewery is selling it on map

NAME??

HTML:
 - build out html framework based on UI sketch
 - LANDING PAGE: 1 row and 1columns with INPUT (city name) ending with a BTN to navigate to next 
 - after .onclick
    - map
    - list of brewerires, types, tags
 - after 2nd .onclick
    - specific brewery and details
        address
        website
        phone number

JAVASCRIPT:
- 1st .onclick grab city name and brings up map
- 2nd .onclick 
    - map
        - api call to google api based on _________ (city name??)
    - brewery name
        - on bottom half of screen broken into 3 columns
            - all breweries, type, tag
        - api call to openBrewery DB
        - onclick: pull brewery details: address, website, phone
    - map:
        - spans across top half of screen
        - 
CSS:
- bulma.io
- mobile first
- LANDING PAGE -> and underneath map
    - bubbling 
    - gradient


API's:
OPENBREWERYDB
    by_city
    Filter breweries by city.

    Note: For the parameters, you can use underscores or url encoding for spaces.

    Examples
    https://api.openbrewerydb.org/breweries?by_city=san_diego 
    https://api.openbrewerydb.org/breweries?by_city=san%20diego


    TaskList: