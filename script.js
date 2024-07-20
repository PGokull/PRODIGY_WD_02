const displayElement = document.querySelector(".display");
const beginButton = document.getElementById("begin");
const recordButton = document.getElementById("record");
const pauseButton = document.getElementById("pause");
const restartButton = document.getElementById("restart");
const recordElements = [
    document.getElementById("record1"),
    document.getElementById("record2"),
    document.getElementById("record3"),
    document.getElementById("record4"),
    document.getElementById("record5")
];

let totalSeconds = 0;
let timerInterval = null;
let recordCount = 0;

beginButton.addEventListener("click", startTimer);
recordButton.addEventListener("click", recordTime);
pauseButton.addEventListener("click", pauseTimer);
restartButton.addEventListener("click", resetTimer);

function updateDisplay() {
    totalSeconds++;
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    displayElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(updateDisplay, 1000);
}

function recordTime() {
    if (recordCount < 5) {
        recordElements[recordCount].textContent = `Record ${recordCount + 1}: ${displayElement.textContent}`;
        recordCount++;
    } else {
        recordElements.forEach((element, index) => {
            element.textContent = `Record ${index + 1}: ${displayElement.textContent}`;
        });
        recordCount = 1;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    totalSeconds = 0;
    recordCount = 0;
    displayElement.textContent = "00:00:00";
    recordElements.forEach(element => element.textContent = "");
}
