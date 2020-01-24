// <<<<<<< john
//adding the gradient background

var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    // isPausedWhenNotInView: true,
    states: {
        "default-state": {
            gradients: [
                ['#E7BF2D', '#FFD848'],
                ['#FFF3C4', '#E7CA56'],
                ['#FECC08', '#E5BB16']
            ]
        }
    }
});

let cityName = $(".city")

let cityInput = $(".cityInput")


// Here we are building the URL we need to query the database
var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName



//Materialize - BUBBLES
const particlesJSON = {
    "particles": {
        "number": {
            "value": 40,
            "density": {
                "enable": true,
                "value_area": 500
            }
        },
        "color": {
            "value": "#ff9800"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 2,
                "color": "#ff9800"
            },

            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true
        },
        "size": {
            "value": 7,
            "random": true
        },
        "line_linked": {
            "enable": false,
            "distance": 1000,
            "color": "#ff9800",
            "opacity": 0.3,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 5,
            "direction": "top",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },

}
// particlesJS("particles-js", particlesJSON);




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