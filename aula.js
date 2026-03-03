// ============================================================
// Mr. Dave Idiomas — aula.js (Updated with Dynamic TTS)
// ============================================================

(function () {
    'use strict';

    // ---- TTS Engine & Voice Management ----
    const synth = window.speechSynthesis;
    let voices = [];
    let currentUtterance = null;
    let isPlaying = false;

    // Load voices and handle Chrome/Edge async loading
    function loadVoices() {
        voices = synth.getVoices();
    }
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }
    loadVoices();

    const getGlobalSettings = () => ({
        lang: document.getElementById('ttsLang')?.value || 'en-US',
        rate: parseFloat(document.getElementById('ttsRate')?.value || 1),
        pitch: parseFloat(document.getElementById('ttsPitch')?.value || 1),
        delay: parseInt(document.getElementById('ttsDelay')?.value || 0),
    });

    /**
     * core speak function
     * @param {string} text - The text to speak
     * @param {Object} options - { lang, gender, onEnd }
     */
    function speak(text, options = {}) {
        if (!synth) return;
        synth.cancel();

        const globals = getGlobalSettings();
        const targetLang = options.lang || globals.lang;
        const targetGender = options.gender || null;

        // Small delay to ensure previous cancel finished and for user comfort
        setTimeout(() => {
            const utt = new SpeechSynthesisUtterance(text);
            
            // 1. Set Rate and Pitch from Globals
            utt.rate = globals.rate;
            utt.pitch = globals.pitch;

            // 2. Find the best matching voice
            // Filter by language first, then try to match gender preference
            let candidateVoices = voices.filter(v => v.lang.includes(targetLang));
            
            if (targetGender && candidateVoices.length > 0) {
                const genderVoice = candidateVoices.find(v => 
                    v.name.toLowerCase().includes(targetGender.toLowerCase())
                );
                if (genderVoice) utt.voice = genderVoice;
            } else if (candidateVoices.length > 0) {
                utt.voice = candidateVoices[0]; // Default to first available for that lang
            }

            utt.lang = targetLang;

            utt.onstart = () => {
                isPlaying = true;
                setStatus('Reproduzindo…');
                updateFooterPlayState(true);
            };
            utt.onend = () => {
                isPlaying = false;
                setStatus('Pronto');
                updateFooterPlayState(false);
                if (typeof options.onEnd === 'function') options.onEnd();
            };
            utt.onerror = () => {
                isPlaying = false;
                setStatus('Pronto');
                updateFooterPlayState(false);
            };

            synth.speak(utt);
        }, globals.delay || 10);
    }

    function stopAll() {
        synth.cancel();
        isPlaying = false;
        setStatus('Pronto');
        updateFooterPlayState(false);
        document.querySelectorAll('.btn-play-block.playing').forEach(b => {
            b.classList.remove('playing');
            const label = b.querySelector('span');
            if (label) label.textContent = 'Ouvir';
        });
        document.querySelectorAll('.kw-listen.playing').forEach(b => b.classList.remove('playing'));
        document.querySelectorAll('.hoverable.speaking, .adj-card.speaking').forEach(b => b.classList.remove('speaking'));
    }

    function setStatus(msg) {
        const el = document.getElementById('ttsStatus');
        if (el) el.textContent = msg;
    }

    // ---- Block play buttons (Conversations/Texts) ----
    document.querySelectorAll('.btn-play-block').forEach(btn => {
        btn.addEventListener('click', function () {
            const blockId = this.dataset.block;
            const blockEl = document.querySelector(`[data-block-id="${blockId}"]`);
            
            if (this.classList.contains('playing')) {
                stopAll();
                return;
            }

            stopAll();
            
            if (!blockEl) return;
            const text = blockEl.querySelector('.audio-block-content')?.innerText.trim();
            const lang = blockEl.dataset.lang; // Checks for data-lang="en-GB" etc
            const gender = blockEl.dataset.gender; // Checks for data-gender="female" etc

            this.classList.add('playing');
            const label = this.querySelector('span');
            if (label) label.textContent = 'Parar';

            speak(text, {
                lang: lang,
                gender: gender,
                onEnd: () => {
                    this.classList.remove('playing');
                    if (label) label.textContent = 'Ouvir';
                }
            });
        });
    });

    // ---- Keyword cards (Vocabulary) ----
    document.querySelectorAll('.kw-listen').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = this.closest('.keyword-card');
            const text = card?.querySelector('.kw-example')?.textContent || card?.dataset.word;
            const lang = card?.dataset.lang;
            const gender = card?.dataset.gender;

            stopAll();
            this.classList.add('playing');
            speak(text, { 
                lang: lang, 
                gender: gender, 
                onEnd: () => this.classList.remove('playing') 
            });
        });
    });

    // ---- Hoverable elements & Adjectives ----
    // This handles individual words/phrases inside the text
    const clickableElements = document.querySelectorAll('.hoverable, .adj-card, .vocab-word');
    clickableElements.forEach(el => {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            const text = this.dataset.speak || this.innerText.trim();
            const lang = this.dataset.lang || this.closest('[data-lang]')?.dataset.lang;
            const gender = this.dataset.gender || this.closest('[data-gender]')?.dataset.gender;

            this.classList.add('speaking');
            speak(text, { 
                lang: lang, 
                gender: gender, 
                onEnd: () => this.classList.remove('speaking') 
            });
        });
    });

    // ---- UI Controls (Panel & Footer) ----
    const ttsToggleBtn = document.getElementById('ttsTogglePanel');
    const ttsPanel = document.getElementById('ttsPanel');
    if (ttsToggleBtn && ttsPanel) {
        ttsToggleBtn.addEventListener('click', () => ttsPanel.classList.toggle('open'));
    }

    function syncSlider(id, labelId, suffix) {
        const el = document.getElementById(id);
        const label = document.getElementById(labelId);
        if (!el || !label) return;
        el.addEventListener('input', () => { label.textContent = el.value + (suffix || ''); });
    }
    syncSlider('ttsRate', 'rateVal', 'x');
    syncSlider('ttsPitch', 'pitchVal', '');
    syncSlider('ttsDelay', 'delayVal', 'ms');

    // Sync Footer Rate with Main Rate
    const footerRate = document.getElementById('footerRate');
    const mainRate = document.getElementById('ttsRate');
    if (footerRate && mainRate) {
        footerRate.addEventListener('input', () => {
            mainRate.value = footerRate.value;
            document.getElementById('footerRateVal').textContent = footerRate.value + 'x';
            document.getElementById('rateVal').textContent = footerRate.value;
        });
    }

    document.getElementById('ttsStopAll')?.addEventListener('click', stopAll);

    // ---- Footer Progress & Play/Pause ----
    function updateFooterPlayState(playing) {
        const playIcon = document.getElementById('footerPlayIcon');
        const pauseIcon = document.getElementById('footerPauseIcon');
        if (!playIcon || !pauseIcon) return;
        playIcon.style.display = playing ? 'none' : '';
        pauseIcon.style.display = playing ? '' : 'none';
    }

    document.getElementById('footerPlayPause')?.addEventListener('click', () => {
        if (isPlaying) {
            stopAll();
        } else {
            // Play first block if nothing is playing
            document.querySelector('.btn-play-block')?.click();
        }
    });

    function updateScrollProgress() {
        const main = document.getElementById('aulaMain');
        const progressFill = document.getElementById('footerProgressFill');
        const progressLabel = document.getElementById('footerProgressLabel');
        if (!main || !progressFill) return;

        const scrollTop = window.scrollY - main.offsetTop;
        const height = main.offsetHeight - window.innerHeight;
        const pct = Math.max(0, Math.min(100, (scrollTop / height) * 100));
        
        progressFill.style.width = pct + '%';
        if (progressLabel) progressLabel.textContent = Math.round(pct) + '% concluído';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // ---- Exercises ----
    document.querySelectorAll('.btn-check-ex').forEach(btn => {
        btn.addEventListener('click', function () {
            const block = document.getElementById(this.dataset.exercise);
            let correct = 0, total = 0;
            block.querySelectorAll('.ex-input').forEach(input => {
                const answer = (input.dataset.answer || '').toLowerCase().trim();
                const value = input.value.toLowerCase().trim();
                if (value === '') return;
                total++;
                if (value === answer) {
                    input.classList.add('correct');
                    input.classList.remove('wrong');
                    correct++;
                } else {
                    input.classList.add('wrong');
                    input.classList.remove('correct');
                }
            });
            this.textContent = total > 0 ? `${correct}/${total} corretas` : 'Verificar';
            setTimeout(() => { this.textContent = 'Verificar respostas'; }, 3000);
        });
    });

    // ---- Mark Complete Logic ----
    function markComplete() {
        const lessonId = 'uspeaK_m02_l08';
        localStorage.setItem('mrdave_progresso_' + lessonId, 'completed');
        
        document.querySelectorAll('#btnMarkComplete, #footerMarkComplete').forEach(btn => {
            btn.innerHTML = '✓ Lição concluída!';
            btn.disabled = true;
            btn.classList.add('done');
        });
    }

    document.getElementById('btnMarkComplete')?.addEventListener('click', markComplete);
    document.getElementById('footerMarkComplete')?.addEventListener('click', markComplete);

})();
