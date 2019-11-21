// Show start page

//namespace
const app = {};

app.pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
// app.pokeID = "1";
app.radioButtonChoices = []
app.arrayOfPokeID = [];
app.APIresults = [];


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
    app.radioButtonChoices = [...$('input[type="radio"]:checked')]
    // console.log($('input[type="radio"]:checked'));

    

    //for each user input
    for (let i = 0; i < app.radioButtonChoices.length; i++){
        //push user input to the array
        app.arrayOfPokeID.push(parseInt(app.radioButtonChoices[i].value));
        
    }

    // console.log(app.arrayOfPokeID);

    //alternative way of above
    // app.pokeChoices = [];
    // $('input[type=radio]:checked').each(function () {
    //     app.pokeChoices.push($(this).val());
    // });
    


    //for each item, pull in api call
    $.when(
        app.arrayOfPokeID.forEach(pokeID => {
            // console.log('pokeID', pokeID);
            
            $.ajax({
                url: app.pokemonURL+pokeID,
                method: 'GET',
                dataType: 'json',
            })
            // .then( function(results) {
            //     // app.APIresults.push(results);
            //     console.log(results.name)
            // })
        })
        
    )
    .then(function (results) {
        console.log(results);
        app.APIresults.push(results)
        app.APIresults.forEach( e => {
            // const pokeName = e.name;
            // const pokeType1 = this.types[0].type.name;
            // //height in metres
            // const pokeHeight = this.height / 10;
            // //weight in kg
            // const pokeWeight = this.weight / 10;

            // if (this.types[1]) {
            //     const pokeType2 = this.types[1].type.name;
            //     console.log(pokeType2);
            // }
            // console.log(pokeName, pokeType1, 'height', pokeHeight, 'weight', pokeWeight);
            console.log(e)
        })
        console.log('helppppp');
    });

    

})
// Each answer will have an api call stored as a variable.or the id number stored and inputed into the API call
// push value of user input(equal to id# at api) for each question to an array
// Pull in api call for each answer


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

