
//namespace
const app = {};

// declare variables and initialize arrays
app.pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
app.radioButtonChoices = []
app.arrayOfPokeID = [];
app.AjaxPromises = [];
app.APIresults = [];

// on final submit button
$('#submit').on('click', function () {
    console.log('test');
    
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

            for(i=0; i < app.APIresults.length; i++) {
                app.pokeName = app.APIresults[i].name;
                $('li.pokemon' + (i+1) + '> .pokeInfo > h3').html(app.pokeName);

                //height in metres
                app.pokeHeight = app.APIresults[i].height / 10;
                $('li.pokemon' + (i + 1) + '> .pokeInfo > .stats > p:first-of-type').html(`Height: ${app.pokeHeight} m`);

                //weight in kg
                app.pokeWeight = app.APIresults[i].weight / 10;
                $('li.pokemon' + (i + 1) + '> .pokeInfo > .stats > p:last-of-type').html(`Weight: ${app.pokeWeight} kg`);

                //type 1
                app.pokeType1 = app.APIresults[i].types[0].type.name;
                $('li.pokemon' + (i + 1) + '> .pokeInfo > .type > p:first-of-type').html(app.pokeType1);

                if (app.APIresults[i].types[1]) {
                    app.pokeType2 = app.APIresults[i].types[1].type.name;
                    $('li.pokemon' + (i + 1) + '> .pokeInfo > .type > p:last-of-type').html(app.pokeType2);
                }
            }
        })
})

$('#reset').on('click', function(){
    $('input[type="radio"]').prop('checked', false);
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


