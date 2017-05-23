
function generateDOM(html) {
    var parent = document.createElement('div');
    parent.innerHTML = html;

    return parent.firstElementChild;
}

function addBackground(bg) {
    document.querySelector('#body-backgrounds').appendChild(
        generateDOM('<div style="background-image:url(\'backgrounds/' + bg + '.jpg\')">')
    );
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
(function() { // preload images async
    var imgsToLoad = backgrounds.length;
    backgrounds.forEach(function(bg) {
        var img = new Image();
        img.addEventListener('load', function() {
            addBackground(bg);
            if(!--imgsToLoad) {
                $backgrounds.childNodes[0].className = 'active';
                changeBackground();
            }
        }, false);
        img.src = 'backgrounds/' + bg + '.jpg';
    });
})();

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

delete Hammer.defaults.cssProps.userSelect;
new Hammer(document.body)
    .on('swipe', function(ev) {
    	changeBackground(ev.direction);
    });
