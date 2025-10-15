const textInput = document.getElementById('text');
const voiceSelect = document.getElementById('voiceSelect');
const speakBtn = document.getElementById('speakBtn');

let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();

  // Avval tozalaymiz
  voiceSelect.innerHTML = '';

  // Ko‘proq tillar (barchasi chiqadi)
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} — ${voice.lang}`;
    voiceSelect.appendChild(option);
  });

  // Default tanlov
  if (voices.length > 0) {
    voiceSelect.selectedIndex = 0;
  }
}

// Ba’zi brauzerlar uchun kech yuklanadi
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

speakBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) return alert("Matn kiriting!");

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices.find(v => v.name === voiceSelect.value);

  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = 1;  // tezlik
  utterance.pitch = 1; // balandlik

  speechSynthesis.speak(utterance);
});
