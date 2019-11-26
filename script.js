
//namespace
const app = {};

// declare variables and initialize arrays
app.pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
app.radioButtonChoices = []
app.arrayOfPokeID = [];
app.AjaxPromises = [];
app.APIresults = [];


//Show only the section that the user is currently on

//When quiz starts, show the first question and hide the start page
$('.start').on('click', function(){
    $('#quiz').show();
    $('#header').hide();
    $('#q2').hide();
    $('#q3').hide();
    $('#q4').hide();
    $('#q5').hide();
    $('#q6').hide();
});

//When user clicks "Next Question"
$('.q1Link').on('click', function(){

    if ($('#q1 > div > div > div > input[type="radio"]:checked').length === 1){
        $('#q2').show();
        $('.error1').hide();

    } else {
        $('.error1').text(`Please make a selection.`);
    }
});

$('.q2Link').on('click', function(){
    
    if ($('#q2 > div > div > div > input[type="radio"]:checked').length === 1) {
        $('.error2').hide();
        $('#q3').show();
    } else {
        $('.error2').text(`Please make a selection.`);
    }
});

$('.q3Link').on('click', function(){

    if ($('#q3 > div > div > div > input[type="radio"]:checked').length === 1) {
        $('.error3').hide();
        $('#q4').show();
    } else {
        $('.error3').text(`Please make a selection.`);
    }
});

$('.q4Link').on('click', function(){
    if ($('#q4 > div > div > div > input[type="radio"]:checked').length === 1) {
        $('.error4').hide();
        $('#q5').show();
    } else {
        $('.error4').text(`Please make a selection.`);
    }
});

$('.q5Link').on('click', function(){
    if ($('#q5 > div > div > div > input[type="radio"]:checked').length === 1) {
        $('.error5').hide();
        $('#q6').show();
    } else {
        $('.error5').text(`Please make a selection.`);
    }
});

// $('#submit').on('click', function(){

//     if ($('#q6 > div > div > div > input[type="radio"]:checked').length === 1) {
//         $('.error6').hide();
//         $('#results').show();
//     } else {
//         $('.error6').text(`Please make a selection.`);
//     }
// });


//on user click next
// $('.next').on('click', function(){
//     // console.log($('input[type="radio"]:checked').length);
//     $('div.question').each(()=>{            
//         if ($('input[type="radio"]:checked').length === 1){
//             console.log('selection made')
//         } else ($('p.errorMessage').text(`Please make a selection.`));
    
//     })
// })

// on final submit button
$('#submit').on('click', function () {
    // if question six has been answered
    if ($('#q6 > div > div > div > input[type="radio"]:checked').length === 1) {
        $('.error6').hide();
        $('#loading').show();

        
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
                //show results
                // $('#loading').hide();
                $('#results').show();
            }
        })
        
    } else {
        // ask user to choose an answer
        $('.error6').text(`Please make a selection.`);
    }
})

$('#reset').on('click', function(){
    $('input[type="radio"]').prop('checked', false);
    $('#header').show();
    $('#quiz').hide();
    $('#results').hide();
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
    $('#loading').hide();
    $('#results').hide();
}
//document ready
$(document).ready(function () {
    app.init();
});


