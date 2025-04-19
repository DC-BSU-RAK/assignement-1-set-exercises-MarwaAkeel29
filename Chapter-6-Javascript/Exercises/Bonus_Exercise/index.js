// Get important elements from HTML using their IDs
const rgbCode = document.getElementById("rgbCode");
const messageOutput = document.getElementById("messageOutput");
const traceLevel = document.getElementById("traceLevel");
const scoreDisplay = document.getElementById("score");
const colorBoxes = document.querySelectorAll(".color-box");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartBtn = document.getElementById("restartBtn");

// Setup game state
let correctColor = "";      // Will store the actual RGB answer
let trace = 0;              // Like lives - increases when wrong
let score = 0;              // Increases when right
const maxTrace = 100;       // Game over at 100% trace level

// Start the game right away
initializeGame();

// Function to start or reset the game
function initializeGame() {
  trace = 0;
  score = 0;
  gameOverScreen.classList.add("hidden");
  updateStats();
  loadNewRound();
}

// This updates the score and trace level display
function updateStats() {
  traceLevel.textContent = `Trace Level: ${trace}%`;
  scoreDisplay.textContent = `Access Score: ${score.toString().padStart(2, '0')}`;
}

// Generates a random RGB string like "rgb(123, 45, 67)"
function generateRandomRGB() {
  const r = Math.floor(Math.random() * 256); // Red value: 0–255
  const g = Math.floor(Math.random() * 256); // Green
  const b = Math.floor(Math.random() * 256); // Blue
  return `rgb(${r}, ${g}, ${b})`;
}

// Loads a new set of color choices
function loadNewRound() {
  // Pick a random color as the correct one
  correctColor = generateRandomRGB();
  rgbCode.textContent = correctColor;

  // Choose a random index (0–2) to hold the correct color
  const correctIndex = Math.floor(Math.random() * colorBoxes.length);

  // Loop through each box and assign a color
  colorBoxes.forEach((box, index) => {
    if (index === correctIndex) {
      box.style.backgroundColor = correctColor;
      box.dataset.correct = "true"; // Mark as the right one
    } else {
      const fakeColor = generateRandomRGB();
      box.style.backgroundColor = fakeColor;
      box.dataset.correct = "false"; // Mark as wrong
    }

    // Reset styles just in case
    box.style.opacity = "1";
    box.style.pointerEvents = "auto";
  });

  // Reset message
  messageOutput.textContent = "Awaiting input...";
}

// Handle user clicking a color box
colorBoxes.forEach((box) => {
  box.addEventListener("click", function () {
    const isCorrect = box.dataset.correct === "true";

    if (isCorrect) {
      messageOutput.textContent = "✔ Access Granted!";
      score += 10;
      updateStats();
      loadNewRound(); // Next round
    } else {
      messageOutput.textContent = "✖ Intrusion Detected!";
      trace += 25;
      updateStats();
      box.style.opacity = "0.2"; // Dim the wrong one
      box.style.pointerEvents = "none"; // Prevent repeat click

      if (trace >= maxTrace) {
        endGame();
      }
    }
  });
});

// Show game over screen
function endGame() {
  messageOutput.textContent = "⚠ System Breach Level Critical!";
  gameOverScreen.classList.remove("hidden");

  // Disable clicking on color boxes
  colorBoxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
}

// Restart button event
restartBtn.addEventListener("click", initializeGame);

