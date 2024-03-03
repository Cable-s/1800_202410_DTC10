let timer;
let minutes = 25;
let seconds = 60;

function startTimer() {
    // Check if the timer is already running
    if (!timer) {
        timer = setInterval(function () {
            seconds--;
            if (seconds == 0) {
                seconds = 60;
                minutes--;
            }

            updateDisplay();
        }, 1000);
    }
}


function stopTimer() {
    clearInterval(timer);
    timer = null; // Set timer to null when stopping
}


function resetTimer() {
    minutes = 25;
    seconds = 60;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('timerDisplay').innerText = `${padNumber(minutes)}:${padNumber(seconds)}`;
}

function padNumber(number, length = 2) {
    let str = String(number);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}



document.getElementById('playButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
