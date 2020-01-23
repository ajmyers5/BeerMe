mapboxgl.accessToken =
  "pk.eyJ1Ijoia3A0MDUiLCJhIjoiY2s1cXl0emlzMDdvbDNtb250bXVveWFmcyJ9.JsFjY-BuUw2XW1CYWrZVVw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-74.5, 40], // starting position
  zoom: 9 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl()); //add controls
