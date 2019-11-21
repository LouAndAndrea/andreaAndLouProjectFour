// Show start page

//namespace
const app = {};

app.pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
app.pokeID = "1";
app.pokeChoices = []

// When user clicks start, scroll to the first question
// form with radio buttons.each button has a value = to the pokemon ID.
// User clicks one of many options
// When user clicks next button
// scroll to next question


// on final submit foreach value in the array run the api call when / then append the pokemon name

// Results(on form submit, get results)
$('input[type="submit"]').on('click', function(e){
    //prevent submit button default action
    e.preventDefault();
    console.log(`submitted`);

    //grab user input
    console.log($('input[type="radio"]:checked'));

    app.pokeChoices = [...$('input[type="radio"]:checked')]

    console.log("radio buttons",app.pokeChoices);

    // console.log(app.pokeChoices[0].value);

    app.choiceOne = app.pokeChoices[0].value;
    // app.pokeChoiceArray.push(app.choiceOne);

    // console.log(app.ChoiceOne);
    
    // app.pokeChoices[i]

    app.pokeArray = [];

    for (let i = 0; i < app.pokeChoices.length; i++){
        app.pokeArray.push(app.pokeChoices[i].value);
        console.log(app.pokeArray);
    }
    

    //push user input to the array
    //for each item, pull in api call
})
// Each answer will have an api call stored as a variable.or the id number stored and inputed into the API call
// push value of user input(equal to id# at api) for each question to an array
// Pull in api call for each answer



$.ajax({ 
    url: `${app.pokemonURL}${app.pokeID}`, 
    method: 'GET', 
    dataType: 'json', 
}).then(function(results){
    console.log(results);
});

// pass through all api calls at end on user submit(when getting results)
// Append stored variables to api url and make a call for each
// Append image for each to the dom
// Grab relevant stats / summary from the API and append to the page


app.init = function() {

}

//document ready
$(document).ready(function() {
    app.init();
});

