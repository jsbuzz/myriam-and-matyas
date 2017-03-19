function generateDOM(html) {
    var parent = document.createElement('div');
    parent.innerHTML = html;

    return parent.firstElementChild;
}

var backgrounds = [
    'circular',
    'croatia-sunset',
    'rome-bridge',
    'bath',
    'feet',
    'greece-sunset',
    'krka',
    'london',
    'milan-green',
    'milan-restaurant',
    'sibenik-old-town',
    'sibenik',
    'singapore-avatar-2',
];
var backgroundPosition = 0;
var backgroundTimerPeriod = 12000;

var $backgrounds = document.querySelector('#body-backgrounds');
backgrounds.forEach(function(bg) {
    document.querySelector('#body-backgrounds').appendChild(
        generateDOM('<div style="background-image:url(\'backgrounds/' + bg + '.jpg\')">')
    );
});
$backgrounds.childNodes[0].className = 'active';
function changeBackground() {
    backgroundPosition++;
    if(backgroundPosition >= backgrounds.length) backgroundPosition = 0;

    document.querySelectorAll('#body-backgrounds div').forEach(function(element) {
        element.className = '';
    });
    $backgrounds.childNodes[backgroundPosition].className = 'active';
}

window.setInterval(changeBackground, backgroundTimerPeriod);
