var buttonColor = ['green', 'red', 'yellow', 'blue'];
var gameSequence = [];
var userSequence = [];
var level = 0;

// **********************************Generating New Sequence****************************

function sequenceGenerator() {
    userSequence = [];
    var randomNumber = Math.floor(Math.random() * 4);
    gameSequence.push(buttonColor[randomNumber]);
    level++;
    $('h1').text('level ' + level);
    buttonPressed(gameSequence[gameSequence.length - 1]);
}

// ******************************for displaying the button press******************************

function buttonPressed(value) {
    console.log(value);
    switch (value) {
        case 'green':
            buttonAnimation('green');
            playSound('sounds/green.mp3');
            break;
        case 'red':
            buttonAnimation('red');
            playSound('sounds/red.mp3');
            break;
        case 'yellow':
            buttonAnimation('yellow');
            playSound('sounds/yellow.mp3');
            break;
        case 'blue':
            buttonAnimation('blue');
            playSound('sounds/blue.mp3');
            break;
        default:
            console.log(value);
    }
}

// *********************************Button Animation*************************************** 

function buttonAnimation(box) {
    $('#' + box).addClass('pressed');
    setTimeout(function () {
        $('#' + box).removeClass('pressed');
    }, 100);
}

// *********************************Play Button Sound****************************************

function playSound(soundFile) {
    var sound = new Audio(soundFile);
    sound.play();
}

// ******************************Check The Sequence Of User And Computer*************************

function gameLogic(i) {
    if (userSequence[i] === gameSequence[i]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(function () {
                sequenceGenerator();
            }, 1000);
        }
    } else {
        gameOver();
    }
}


// **************************************Game Over********************************************

function gameOver() {
    $('h1').text('Game Over, press any key to play again');
    var gameOverSound = new Audio('sounds/wrong.mp3');
    gameOverSound.play();
    $('body').addClass('game-over');
    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 500);
    level = 0;
    gameSequence = [];
}

// ********************************User Input************************************

$(document).keydown(function (e) {
    if (level == 0) {
        sequenceGenerator();
    }
});

$('div.btn').click(function () {
    var userInput = $(this).attr('id');
    userSequence.push(userInput);
    console.log(userSequence);
    buttonPressed(userInput);
    gameLogic(userSequence.length - 1);
});
