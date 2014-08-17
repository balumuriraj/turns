function opensignin() {
    var login = $('#login-container');
    var background = $('#background-cover');

    login.css({
        'top': '10em',
        'z-index': '3'
    });

    background.css({
        'z-index': '2',
        'opacity': '0.75'
    });
}

function closesignin() {
    var login = $('#login-container');
    var background = $('#background-cover');

    login.css({
        'top': '-100em'
    });

    background.css({
        'z-index': '-1',
        'opacity': '0'
    });
}

function opensignup() {
    var signup = $('#signup-container');
    var background = $('#background-cover');

    signup.css({
        'top': '10em',
        'z-index': '3'
    });

    background.css({
        'z-index': '2',
        'opacity': '0.75'
    });
}

function closesignup() {
    var signup = $('#signup-container');
    var background = $('#background-cover');

    signup.css({
        'top': '-100em'
    });

    background.css({
        'z-index': '-1',
        'opacity': '0'
    });
}
