
//namespace
const app = {};

// declare variables and initialize arrays
app.pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
app.radioButtonChoices = []
app.arrayOfPokeID = [];
app.AjaxPromises = [];
app.APIresults = [];

// on final submit button
$('input[type="submit"]').on('click', function (e) {

    //prevent submit button default action
    e.preventDefault();
    
    //grab user input and store in array as strings
    app.radioButtonChoices = [...$('input[type="radio"]:checked')]


    //for each user input in the above array parse the int and store in a new array
    for (let i = 0; i < app.radioButtonChoices.length; i++) {
        app.arrayOfPokeID.push(parseInt(app.radioButtonChoices[i].value));
    }


    // for each stored poke ID, run an ajax call and store the returned promise in a new array   
    app.arrayOfPokeID.forEach(pokeID => {
        app.AjaxPromises.push(getPokeAjaxCall(pokeID));
    });
    function getPokeAjaxCall(pokeID) { //getting info from API
        return $.ajax({
            url: app.pokemonURL + pokeID,
            method: 'GET',
            dataType: 'json',
        })
    }
    $.when(...app.AjaxPromises) //when all promises are fulfilled
        .then((...ApiPromises) => { // on each promise
            app.APIresults = ApiPromises.map(pokeObject => {
                return pokeObject[0]; //take the data object at index 0 and store it in a new array
            });
        
            app.APIresults.forEach( e => {
                const pokeName = e.name;
                const pokeType1 = e.types[0].type.name;
                //height in metres
                const pokeHeight = e.height / 10;
                //weight in kg
                const pokeWeight = e.weight / 10;
                if (e.types[1]) {
                    const pokeType2 = e.types[1].type.name;
                    console.log(pokeType2);
                }
                console.log(pokeName, pokeType1, 'height', pokeHeight, 'weight', pokeWeight);
        });
        })
})

// Each answer will have an api call stored as a variable.or the id number stored and inputed into the API call
// push value of user input(equal to id# at api) for each question to an array
// Pull in api call for each answer
// pass through all api calls at end on user submit(when getting results)
// Append stored variables to api url and make a call for each
// Append image for each to the dom
// Grab relevant stats / summary from the API and append to the page
app.init = function () {
}
//document ready
$(document).ready(function () {
    app.init();
});


