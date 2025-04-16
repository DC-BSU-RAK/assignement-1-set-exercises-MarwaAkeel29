// --------------------
// Alan Partridge Soundboard - Extended Version
// My JS file with audio playback, text-to-speech, and pagination
// --------------------

// Get all the sound card elements from the page
const soundCards = document.querySelectorAll('.sound-card');

// Loop through each sound card to add click events for audio playback
soundCards.forEach(card => {
  const audio = card.querySelector('audio'); // Each card has an <audio> inside it

  // When the card is clicked
  card.addEventListener('click', () => {
    // Remove the glowing effect from all cards
    soundCards.forEach(c => c.classList.remove('playing'));

    // Reset audio to the beginning and play
    audio.currentTime = 0;
    audio.play();

    // Add the glowing animation class to this card
    card.classList.add('playing');

    // When the audio ends, remove the glowing effect
    audio.addEventListener('ended', () => {
      card.classList.remove('playing');
    });
  });
});

// --------------------
// Text-to-Speech Feature
// --------------------

// Get the Speak button and the textarea
const speakButton = document.getElementById('speak-button');
const speechInput = document.getElementById('speech-input');

// When Speak button is clicked
speakButton.addEventListener('click', () => {
  const text = speechInput.value; // Get what the user typed

  if (text.trim() !== '') {
    const speech = new SpeechSynthesisUtterance(text); // Create speech from text
    speechSynthesis.speak(speech); // Speak it
  }
});

