/* globals $ alert */
"use strict";

$(function() {
    let $clientName = $("#clientName");

    // let $clientCity = $("#clientCity");
    // var availableTags = [
    //                      "ActionScript",
    //                      "AppleScript",
    //                      "Asp",
    //                      "Scheme"
    //                    ];
    // console.log($clientCity);

    // $clientCity.autocomplete({
    //     source: availableTags
    // });

    $clientName.autocomplete({
        source: function (req, res) {
            // alert(req.term);
            $.ajax({
                    url: "/client/search/"+req.term,
                    type: "GET",
                    dataType: "jsonp",
                    data: {
                        term: req.term
                    },          // request is the value of search input
                    success: function (data) {
                        res($.map(data, function (item) {
                            return {
                                //autocomplete default values REQUIRED
                                label: item.name,
                                value: item._id,

                                //extend values
                                city: item.city,
                                address: item.address,
                                identity: item.bulstat,
                                mol: item.accountablePerson,
                                zdds: ""//item.identity
                            }
                        }));
                    },
                    error: function(xhr) {
                        alert(xhr.status + ' : ' + xhr.statusText);
                    }
            });
        },

        // The minimum number of characters a user must type before a search is performed.
        minLength: 1,

        select: function( event, ui ) {
            $("#clientCity").val(ui.item.city);
            $("#clientAddress").val(ui.item.address);
            $("#clientIdentity").val(ui.item.identity);
            $("#clientZDDS").val(ui.item.zdds);
            $("#clientMOL").val(ui.item.mol);
        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
    });
});