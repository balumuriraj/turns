function backgroundcoveropen() {
    var background = $('#background-cover');
    background.css({
        'visibility': 'visible',
        'opacity': '0.75'
    });
}

function backgroundcoverclose() {
    var background = $('#background-cover');
    background.css({
        'visibility': 'hidden',
        'opacity': '0'
    });
}