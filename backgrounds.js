function generateDOM(html) {
    var parent = document.createElement('div');
    parent.innerHTML = html;

    return parent.firstElementChild;
}

var backgrounds = isMobile
    ? [ 'circular',
        'croatia-sunset',
        'london',
        'sibenik',
        'singapore-avatar-2']
    : [ 'circular',
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

var backgroundPosition = -1;
var backgroundTimerPeriod = 12000;
var LEFT = 2, RIGHT = 4;

var $backgrounds = document.querySelector('#body-backgrounds');
backgrounds.forEach(function(bg) {
    document.querySelector('#body-backgrounds').appendChild(
        generateDOM('<div style="background-image:url(\'backgrounds/' + bg + '.jpg\')">')
    );
});
$backgrounds.childNodes[0].className = 'active';
var timerId = null;
function changeBackground(direction) {
    if(timerId) {
        clearInterval(timerId);
    }
    if(direction === RIGHT) {
        backgroundPosition--;
    } else {
        backgroundPosition++;
    }

    if(backgroundPosition >= backgrounds.length) backgroundPosition = 0;
    if(backgroundPosition < 0) backgroundPosition = backgrounds.length - 1;

    document.querySelectorAll('#body-backgrounds div').forEach(function(element) {
        element.className = '';
    });
    $backgrounds.childNodes[backgroundPosition].className = 'active';

    timerId = setTimeout(changeBackground, backgroundTimerPeriod);
}
changeBackground();

new Hammer(document.body)
    .on('swipe', function(ev) {
    	changeBackground(ev.direction);
    });
