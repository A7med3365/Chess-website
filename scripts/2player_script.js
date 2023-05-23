import { chessBoard, chessPiecesMoves, game } from "./myChessModule.js";

// chessBoard.generateBoard()

let countdown; // Variable to store the countdown interval
let seconds = 100; // Initial countdown value
let isPaused = false; // Flag to track if the timer is paused
let remainingSeconds; // Variable to store the remaining seconds when pausing

function startTimer() {
  if (!countdown) {
    countdown = setInterval(updateTimer, 1000); // Update the timer every second (1000 milliseconds)
  }
}

function pauseTimer() {
  if (countdown) {
    clearInterval(countdown); // Clear the countdown interval
    countdown = null;
    isPaused = true;
    remainingSeconds = seconds;
  }
}

function resumeTimer() {
  if (isPaused) {
    seconds = remainingSeconds;
    startTimer();
    isPaused = false;
    remainingSeconds = null;
  }
}

function updateTimer() {
  const timerDisplay = document.querySelector('p'); // HTML element to display the timer
  const minutes = Math.floor(seconds/60)
  const sec = (seconds%60)
  console.log(seconds%60,sec);
  timerDisplay.innerText = `${minutes}:${sec}`; // Update the timer display

  if (seconds > 0) {
    seconds--; // Decrease the countdown value by 1
  } else {
    clearInterval(countdown); // Clear the countdown interval when the timer reaches 0
    countdown = null;
  }
}

$('#start').on('click',startTimer)
$('#stop').on('click',pauseTimer)
$('#resume').on('click',resumeTimer)
// $('#start').on('click',startTimer)

