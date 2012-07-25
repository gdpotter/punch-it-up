if (punchNum == undefined) {
    var punchNum = 0;
}

var popupText = 'Punch it UP!';


/*******************************************************/
/** This is the array of punch objects which controls **/
/** what punch effect is applied at what level, and   **/
/** what percentage of what DOM elements are affected **/
/*******************************************************/
var punch = [
    {
        level: 0, // Level accepts numbers, array of numbers or 'not'
        elements: 'html a, html p, h1, h2, h3',
        effect: function(element) {
            jQuery(element).css('color', randomColor());
        },
        attackProb: 100,
        text: [
            'Add some color!',
            'The colors suck! Let\'s make better ones!',
            'Colors!?! Punch it UP!',
            'Those old colors made my eyes bleed! Hooray for Punch-it-up!',
            'Add some color!',
            'Add some color!'
        ]
    },
    {
        level: 1,
        elements: 'html div',
        effect: function(element) {
            jQuery(element).css('border-radius', '20px');
        },
        attackProb: 35,
        text: [
            'Ronded corners make everything better!',
            'Let\'s round EVERYTHING for saftey',
            'I just got cut by a sharp edge--round those mofos!',
            'How did the internet exist before rounded edges',
            'Round those edges!',
            'Round those edges!',
            'Round those edges!',
            'Round those edges!',
            'Round those edges!',
            'Round those edges!'
        ]
    },
    {
        level: 1,
        elements: 'html div',
        effect: function(element) {
            jQuery(element).css({
                'border-width': r(5),
                'border-style': chooseRandom(['dotted', 'dashed', 'solid', 'double']),
                'border-color': randomColor()
            });
        },
        attackProb: 5
    },
    {
        level: [2, 3],
        elements: 'html div',
        effect: function(element) {
            jQuery(element).css('border-radius', '30px');
        },
        attackProb: 25
    },
    {
        level: [2, 3],
        elements: 'html div',
        effect: function(element) {
            jQuery(element).css({
                'border-width': r(10),
                'border-style': chooseRandom(['dotted', 'dashed', 'solid', 'double']),
                'border-color': randomColor()
            });
        },
        attackProb: 25,
        text: [
            'Wow, if only I could unvisit this website, I don\'t know where the borders are',
            'There, I punched it up for you',
            'uh...excuse me...punch it up...please!',
            'Punch it UP...right?!',
            'Punch it UP, dude!',
            'Punch it UP!',
            'Punch it UP!',
            'Punch it UP!'
        ]
    },
    {
        level: [3, 4],
        elements: 'html *',
        effect: function(element) {
            jQuery(element).css('box-shadow', r(5) + 'px ' + r(5) + 'px ' + r(25) + 'px ' + randomColor());
        },
        attackProb: 25,
        text: [
            'You can\'t have a page without shadow',
            'Adding some depth; don\'t drown',
            'Hey website, do you need a license to be that ugly? Punch it up!',
            'Punch it up',
            'Punch it up',
            'Punch it up'
        ]
    },
    {
        level: 9,
        effect: function() {
            var unicorn = jQuery('<img/>').css({
                'position': 'fixed',
                'top': r(70) + '%',
                'left': r(70) + '%',
            }).attr('src', chrome.extension.getURL("unicorn.png"));
            jQuery('body').append(unicorn);
        }
    },
    {
        level: 'not',
        elements: 'html *',
        effect: function(element) {
            // If there are no grand-children
            if (!(jQuery(element).children().children()[0])) {
                jQuery(element).addClass('grow-pulse');
            }
        },
        attackProb: 3
    },
    {
        level: 'not',
        elements: 'html *',
        effect: function(element) {
            // If there are no grand-children
            if (!jQuery(element).children().children()[0]) {
                jQuery(element).addClass('twist-pulse');
            }
        },
        attackProb: 3
    },
    {
        level: 'not',
        elements: 'html *',
        effect: function(element) {
            // If there are no grand-children
            if (!jQuery(element).children().children()[0]) {
                jQuery(element).addClass('twist-pulse-reverse');
            }
        },
        attackProb: 3
    },
    {
        level: 'not',
        elements: 'html *',
        effect: function(element) {
            // If there are no grand-children
            if (!jQuery(element).children().children()[0]) {
                jQuery(element).addClass('grow-pulse-fast');
            }
        },
        attackProb: 0.5
    }
]

// Now for the guts of the code:
// Loop through the punch object and punch it up!
var textArray = ['Punch it UP!'];
var effectApplied = false;
jQuery.each(punch, function(i, punchItem) {
    if (!(punchItem.level === undefined)) {
        if (typeof punchItem.level === 'number' && punchItem.level == punchNum) {
            executeEffect(punchItem);
            effectApplied = true;
        } else if (Array.isArray(punchItem.level)) {
            // If it's an array, loop through the numbers
            jQuery.each(punchItem.level, function(j, level) {
                if (level === punchNum) {
                    executeEffect(punchItem);
                    effectApplied = true;
                }
            });
        }
    }
});

if (!effectApplied) {
    jQuery.each(punch, function(i, punchItem) {
        if (punchItem.level == 'not') {
            executeEffect(punchItem);
        }
    });
}

punchNum++;

console.log(localStorage);
if (!(localStorage["show_message"] == 'false')) {
    if (!jQuery('#punchAlert')[0]) {
        jQuery('body').prepend(jQuery('<div id="punchAlert"/>').css({
        'position': 'fixed',
        'margin-top': '-30px',
        'top': '50%',
        'font-size': '30px',
        'text-align': 'center',
        'width': '100%',
        'color': 'white',
        'z-index': 999999,
        'padding': '4px'
        }));
    }
    jQuery('#punchAlert').css({'text-shadow': ('0 0 20px ' + randomColor()), 'background-color': randomColor(true)});
    jQuery('#punchAlert').html('Punch Level ' + punchNum + '<br/>' + chooseRandom(textArray));
    jQuery('#punchAlert').stop(true, true).show().css('opacity', 1).fadeOut(3000);
}





function executeEffect(punchItem) {
    if (punchItem.elements) {
        jQuery(punchItem.elements).not('#punchAlert').each(function() {
            if (!punchItem.attackProb || (punchItem.attackProb >= r(100))) {
                punchItem.effect(this);
            }
        });
    } else {
        punchItem.effect();
    }
    if (punchItem.text) {
        jQuery.each(punchItem.text, function(i, text) {
            textArray.push(text);
        });
    }
}


function randomColor(dark) {
    var red = Math.round(Math.random()*255);
    var blue = Math.round(Math.random()*255);
    var green = Math.round(Math.random()*255);
    if (dark && red < 150 && blue < 150 && green < 150) {
        switch(Math.floor(Math.random()*4)) {
            case 0:
                red = Math.round(Math.random()*100) + 150;
                break;
            case 1:
                blue = Math.round(Math.random()*100) + 150;
                break;
            case 2:
                green = Math.round(Math.random()*100) + 150;
        }
    }
    return ('#' + red.toString(16) + green.toString(16) + blue.toString(16));
}

function r(n){
        return Math.floor( ((n + 1) || 10) * Math.random() );
}

function chooseRandom(items) {
    return items[(Math.floor(Math.random()*items.length))]
}