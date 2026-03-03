// --- USpeaK TTS Smart Engine ---

// 1. Voice Pools (Matching common browser voice names)
const VOICE_NAMES = {
    male: ['David', 'Mark', 'Daniel', 'Google US English Male', 'Microsoft David', 'Guy', 'James'],
    female: ['Zira', 'Samantha', 'Google US English Female', 'Microsoft Zira', 'Salli', 'Catherine', 'Google UK English Female']
};

// 2. Helper to get a random voice based on gender
function getSmartVoice(gender) {
    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter(v => v.lang.startsWith('en'));
    
    if (!gender) return null; // Default to panel settings for examples

    // Filter available voices against our gender name pools
    const pool = enVoices.filter(v => {
        return VOICE_NAMES[gender].some(name => v.name.includes(name));
    });

    // Pick random from pool, or fallback to any English voice
    const selectionSource = pool.length > 0 ? pool : enVoices;
    return selectionSource[Math.floor(Math.random() * selectionSource.length)];
}

// 3. The Central Speech Function
function speakText(element) {
    // Stop any current speech
    window.speechSynthesis.cancel();

    // Get text: Check data-speak first, then innerText
    const text = element.getAttribute('data-speak') || element.innerText;
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Check for smart gender attribute
    const gender = element.getAttribute('data-gender') || element.closest('[data-gender]')?.getAttribute('data-gender');
    
    if (gender) {
        const voice = getSmartVoice(gender);
        if (voice) utterance.voice = voice;
    } else {
        // Example mode: Use panel language
        utterance.lang = document.getElementById('ttsLang').value;
    }

    // Apply Panel Controls
    utterance.rate = document.getElementById('ttsRate').value;
    utterance.pitch = document.getElementById('ttsPitch').value;

    // Visual Status Update
    const status = document.getElementById('ttsStatus');
    status.innerText = "Falando...";
    status.style.color = "#007bff";

    utterance.onend = () => {
        status.innerText = "Pronto";
        status.style.color = "";
    };

    window.speechSynthesis.speak(utterance);
}

// 4. Single Event Listener (CLICK ONLY)
document.addEventListener('click', (e) => {
    // Target keywords, hoverables, and dialogue lines
    const target = e.target.closest('.hoverable, .keyword-card, .dialogue-line, .adj-card, .example-item');
    
    if (target) {
        speakText(target);
    }
});

// 5. Fix for Chrome voice loading
window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();

// 6. Panel UI Logic (Keep your existing toggle/slider code)
document.getElementById('ttsTogglePanel').addEventListener('click', () => {
    document.getElementById('ttsPanel').classList.toggle('active');
});

document.getElementById('ttsStopAll').addEventListener('click', () => {
    window.speechSynthesis.cancel();
});

// Update display labels for sliders
['Rate', 'Pitch', 'Delay'].forEach(id => {
    const input = document.getElementById('tts' + id);
    const display = document.getElementById(id.toLowerCase() + 'Val');
    input.addEventListener('input', () => { display.innerText = input.value; });
});
