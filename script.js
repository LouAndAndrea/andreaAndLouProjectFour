
//namespace
const app = {};

// declare variables and initialize arrays
app.pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
app.radioButtonChoices = []
app.arrayOfPokeID = [];
app.AjaxPromises = [];
app.APIresults = [];


//Show only the section that the user is currently on
$('.start').on('click', function(){
    $('#quiz').show();
    $('#header').hide();
    $('#q2').hide();
    $('#q3').hide();
    $('#q4').hide();
    $('#q5').hide();
    $('#q6').hide();
});

// $('.q1Link').on('click', function(){
//     // console.log('q1 was clicked');
//     // $('#q1').hide();
//     if ($('#q1> input[type = "radio"]').val() !== undefined){
//         console.log('it works!');
//         $('#q2').show();
//     }
// });

$('.q2Link').on('click', function(){
    // console.log('q1 was clicked');
    $('#q3').show();
});

$('.q3Link').on('click', function(){
    // console.log('q1 was clicked');
    $('#q4').show();
});

$('.q4Link').on('click', function(){
    // console.log('q1 was clicked');
    $('#q5').show();
});

$('.q5Link').on('click', function(){
    // console.log('q1 was clicked');
    $('#q6').show();
});

$('#submit').on('click', function(){
    // console.log('q1 was clicked');
    $('#results').show();
});

//on user click next
// $('.next').on('click', function(){
//     // console.log($('input[type="radio"]:checked').length);
//     $('div.question').each(()=>{            
//         if ($('input[type="radio"]:checked').length === 1){
//             console.log('selection made')
//         } else ($('p.errorMessage').text(`Please make a selection.`));
    
//     })
// })

//check if a selection has been made
//if yes, show next question
// if no, append under the question title a message that tells user to select an item

//don't let the form submit unless all things are checked


// on final submit button
$('#submit').on('click', function () {
    
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
                //name
                app.pokeName = app.APIresults[i].name;
                $('li.pokemon' + (i+1) + '> .pokeInfo > h3').html(app.pokeName);

                //image
                $('li.pokemon' + (i + 1) + '> div:last-of-type').html(`<img src="./assets/${app.APIresults[i].id}.png";" alt="${app.pokeName}">`)

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
                } else {
                    $('li.pokemon' + (i + 1) + '> .pokeInfo > .type > p:last-of-type').hide();
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
    $('#quiz').hide();
    $('#results').hide();
}
//document ready
$(document).ready(function () {
    app.init();
});


