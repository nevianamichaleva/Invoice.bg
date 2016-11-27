/* globals require module $*/
'use strict';

$('.login-button').on('click', function () {
    let username = $('#username').val(),
        password = $('#password').val();

    $.ajax({
            method: 'POST',
            url: '/login',
            data: {
                username: username,
                password: password
            }
        })
        .done(function () {
            console.log("nice");
        });
});