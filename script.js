let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const timerDisplay = document.getElementById('timer');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 1000);
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startTime = null;
    elapsedTime = 0;
    lapTimes = [];
    updateTimerDisplay(0);
    lapsList.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        lapTimes.push(Date.now() - startTime);
        displayLaps();
    }
});

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    updateTimerDisplay(elapsedTime);
}

function updateTimerDisplay(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    
    timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function displayLaps() {
    lapsList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsList.appendChild(li);
    });
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
