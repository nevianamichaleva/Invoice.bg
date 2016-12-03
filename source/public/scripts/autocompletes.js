/* globals $ */
"use strict";

$(function() {
    let $clientName = $("#clientName"),
        $clientCity = $("#clientCity");

    var availableTags = [
                         "ActionScript",
                         "AppleScript",
                         "Asp",
                         "Scheme"
                       ];

    console.log($clientCity);

    $clientCity.autocomplete({
        source: availableTags
    });

    $clientName.autocomplete({
        source: function (request, response) {
        //console.log("0. Source Here!");
        $.ajax({
            url: "/client/search",
            type: "GET",
            dataType: "jsonp",
            data: {
                q: request.term
            },
            //data: request,  // request is the value of search input
            success: function (data) {
                response( data );
                console.log('success', data);
                // Map response values to field label and value
                //response($.map(data, function (cl) {
                //    console.log(cl);
                //    return {
                //        name: cl.name,
                //        city: cl.city,
                //        address: cl.address,
                //       identity: cl.bulstat,
                //        zdds: cl.identity,
                //        mol: cl.accountablePerson,
                //        value: cl._id
                //    };
            },
            complete: function() {
                console.log('done');
            }
            });
        },

        // The minimum number of characters a user must type before a search is performed.
        minLength: 3,

        //select: function( event, ui ) {
           // console.log( ui.item ?
           // "Selected: " + ui.item.label :
           // "Nothing selected, input was " + this.value);
       // },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }

         // set an onFocus event to show the result on input field when result is focused
        //focus: function (event, ui) {
        //    console.log("2. Focus Here!");
        //    this.value = ui.item.name;
        //    console.log(ui);
            // Prevent other event from not being execute
        //    event.preventDefault();
       // },
        //select: function (event, ui) {
        //    console.log("3. Select Here!");
            // Prevent value from being put in the input:
        //    this.value = ui.item.name;
            // Set the id to the next input hidden field
       //     $(this).next("input").val(ui.item.value);
            // Prevent other event from not being execute
        //    event.preventDefault();
        // }
    });
});