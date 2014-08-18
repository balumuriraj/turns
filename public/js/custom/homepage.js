function opensignin() {
    closeoptions();
    backgroundcoveropen();
    var login = $('#login-container');

    login.css({
        'visibility': 'visible',
        'top': '50%',
        'opacity': '1'
    });
}

function closesignin() {
    backgroundcoverclose();
    var login = $('#login-container');

    login.css({
        'visibility': 'hidden',
        'top': '45%',
        'opacity': '0'
    });
}

function opensignup() {
    closeoptions();
    backgroundcoveropen();
    var signup = $('#signup-container');

    signup.css({
        'visibility': 'visible',
        'top': '50%',
        'opacity': '1'
    });
}

function closesignup() {
    backgroundcoverclose();
    var signup = $('#signup-container');

    signup.css({
        'visibility': 'hidden',
        'top': '45%',
        'opacity': '0'
    });
}

function openoptions() {
    backgroundcoveropen();
    var options = $('#options-container');

    options.css({
        'visibility': 'visible',
        'top': '50%',
        'opacity': '1'
    });
}

function closeoptions() {
    backgroundcoverclose();
    var options = $('#options-container');

    options.css({
        'visibility': 'hidden',
        'top': '45%',
        'opacity': '0'
    });
}