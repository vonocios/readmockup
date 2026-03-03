// ============================================================
// Mr. Dave Idiomas — aula.js
// WP: registrar via wp_enqueue_script()
// ============================================================

(function () {
    'use strict';

    // ---- TTS Engine ----
    const synth = window.speechSynthesis;
    let currentUtterance = null;
    let isPlaying = false;

    const getSettings = () => ({
        lang: document.getElementById('ttsLang')?.value || 'en-US',
        rate: parseFloat(document.getElementById('ttsRate')?.value || 1),
        pitch: parseFloat(document.getElementById('ttsPitch')?.value || 1),
        delay: parseInt(document.getElementById('ttsDelay')?.value || 0),
    });

    function speak(text, onEnd) {
        if (!synth) return;
        synth.cancel();
        const s = getSettings();

        setTimeout(() => {
            const utt = new SpeechSynthesisUtterance(text);
            utt.lang = s.lang;
            utt.rate = s.rate;
            utt.pitch = s.pitch;
            currentUtterance = utt;

            utt.onstart = () => {
                isPlaying = true;
                setStatus('Reproduzindo…');
                updateFooterPlayState(true);
            };
            utt.onend = () => {
                isPlaying = false;
                setStatus('Pronto');
                updateFooterPlayState(false);
                if (typeof onEnd === 'function') onEnd();
            };
            utt.onerror = () => {
                isPlaying = false;
                setStatus('Pronto');
                updateFooterPlayState(false);
            };

            synth.speak(utt);
        }, s.delay);
    }

    function stopAll() {
        synth.cancel();
        isPlaying = false;
        setStatus('Pronto');
        updateFooterPlayState(false);
        document.querySelectorAll('.btn-play-block.playing').forEach(b => b.classList.remove('playing'));
        document.querySelectorAll('.kw-listen.playing').forEach(b => b.classList.remove('playing'));
        document.querySelectorAll('.hoverable.speaking').forEach(b => b.classList.remove('speaking'));
        document.querySelectorAll('.adj-card.speaking').forEach(b => b.classList.remove('speaking'));
    }

    function setStatus(msg) {
        const el = document.getElementById('ttsStatus');
        if (el) el.textContent = msg;
    }

    // ---- Block play buttons ----
    function getBlockText(blockId) {
        const block = document.querySelector(`[data-block-id="${blockId}"]`);
        if (!block) return '';
        const content = block.querySelector('.audio-block-content');
        return content ? content.innerText.trim() : '';
    }

    document.querySelectorAll('.btn-play-block').forEach(btn => {
        btn.addEventListener('click', function () {
            const blockId = this.dataset.block;

            if (this.classList.contains('playing')) {
                stopAll();
                return;
            }

            stopAll();
            this.classList.add('playing');
            const icon = this.querySelector('svg');
            const label = this.querySelector('span');
            if (label) label.textContent = 'Parar';

            speak(getBlockText(blockId), () => {
                this.classList.remove('playing');
                if (label) label.textContent = 'Ouvir';
            });
        });
    });

    // ---- Keyword cards listen buttons ----
    document.querySelectorAll('.kw-listen').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = this.closest('.keyword-card');
            const word = card?.dataset.word || '';
            const ex = card?.querySelector('.kw-example')?.textContent || word;
            stopAll();
            this.classList.add('playing');
            speak(ex, () => this.classList.remove('playing'));
        });
    });

    // ---- Keyword cards hover ----
    document.querySelectorAll('.keyword-card').forEach(card => {
        card.addEventListener('click', function () {
            const word = this.dataset.word;
            if (word) speak(word);
        });
    });

    // ---- Hoverable elements ----
    document.querySelectorAll('.hoverable').forEach(el => {
        el.addEventListener('click', function () {
            const text = this.dataset.speak || this.innerText.trim();
            if (!text) return;
            this.classList.add('speaking');
            speak(text, () => this.classList.remove('speaking'));
        });
        el.addEventListener('mouseleave', function () {
            this.classList.remove('speaking');
        });
    });

    // ---- Adjective cards hover ----
    document.querySelectorAll('.adj-card').forEach(card => {
        card.addEventListener('click', function () {
            const word = this.dataset.speak || this.querySelector('.adj-en')?.textContent;
            if (!word) return;
            this.classList.add('speaking');
            speak(word, () => this.classList.remove('speaking'));
        });
        card.addEventListener('mouseleave', function () {
            this.classList.remove('speaking');
        });
    });

    // ---- TTS Controls panel toggle ----
    const ttsToggleBtn = document.getElementById('ttsTogglePanel');
    const ttsPanel = document.getElementById('ttsPanel');
    if (ttsToggleBtn && ttsPanel) {
        ttsToggleBtn.addEventListener('click', () => {
            ttsPanel.classList.toggle('open');
            ttsToggleBtn.style.background = ttsPanel.classList.contains('open')
                ? 'rgba(99,102,241,.3)' : '';
        });
    }

    // Sync range sliders → labels
    function syncSlider(id, labelId, suffix) {
        const el = document.getElementById(id);
        const label = document.getElementById(labelId);
        if (!el || !label) return;
        el.addEventListener('input', () => { label.textContent = el.value + (suffix || ''); });
    }
    syncSlider('ttsRate', 'rateVal', 'x');
    syncSlider('ttsPitch', 'pitchVal', '');
    syncSlider('ttsDelay', 'delayVal', 'ms');

    // Footer rate slider mirrors main
    const footerRate = document.getElementById('footerRate');
    const footerRateVal = document.getElementById('footerRateVal');
    const mainRate = document.getElementById('ttsRate');
    if (footerRate && mainRate) {
        footerRate.addEventListener('input', () => {
            mainRate.value = footerRate.value;
            if (footerRateVal) footerRateVal.textContent = footerRate.value + 'x';
            const mainLabel = document.getElementById('rateVal');
            if (mainLabel) mainLabel.textContent = footerRate.value;
        });
        mainRate.addEventListener('input', () => {
            footerRate.value = mainRate.value;
            if (footerRateVal) footerRateVal.textContent = mainRate.value + 'x';
        });
    }

    // Stop all button
    document.getElementById('ttsStopAll')?.addEventListener('click', stopAll);

    // ---- Footer play/pause ----
    let footerReadingBlock = null;
    let footerBlockIndex = 0;
    const allBlocks = Array.from(document.querySelectorAll('.btn-play-block'));

    function updateFooterPlayState(playing) {
        const playIcon = document.getElementById('footerPlayIcon');
        const pauseIcon = document.getElementById('footerPauseIcon');
        const btn = document.getElementById('footerPlayPause');
        if (!playIcon || !pauseIcon) return;
        if (playing) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = '';
            btn?.classList.add('active');
        } else {
            playIcon.style.display = '';
            pauseIcon.style.display = 'none';
            btn?.classList.remove('active');
        }
    }

    document.getElementById('footerPlayPause')?.addEventListener('click', () => {
        if (isPlaying) {
            stopAll();
            return;
        }
        // Play the first visible block or current position
        const firstBlock = allBlocks[footerBlockIndex] || allBlocks[0];
        if (firstBlock) firstBlock.click();
    });

    // ---- Scroll Progress ----
    const progressFill = document.getElementById('footerProgressFill');
    const progressLabel = document.getElementById('footerProgressLabel');

    function updateScrollProgress() {
        const main = document.getElementById('aulaMain');
        if (!main || !progressFill) return;
        const scrollTop = window.scrollY - main.offsetTop;
        const height = main.offsetHeight - window.innerHeight;
        const pct = Math.max(0, Math.min(100, (scrollTop / height) * 100));
        progressFill.style.width = pct.toFixed(1) + '%';
        if (progressLabel) progressLabel.textContent = Math.round(pct) + '% concluído';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // ---- Lesson Completion ----
    // WP: substituir markComplete() por chamada à REST API:
    // POST /wp-json/mrdave/v1/progress { lesson_id, user_id, completed: true }
    function markComplete() {
        const lessonId = 'uspeaK_m02_l08';
        const key = 'mrdave_progresso';

        try {
            const prog = JSON.parse(localStorage.getItem(key) || '{}');
            prog[lessonId] = true;
            localStorage.setItem(key, JSON.stringify(prog));
        } catch (e) {}

        // Update UI
        document.querySelectorAll('#btnMarkComplete, #footerMarkComplete').forEach(btn => {
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg> Lição concluída!';
            btn.disabled = true;
            if (btn.classList.contains('footer-btn-complete')) btn.classList.add('done');
        });

        progressFill.style.width = '100%';
        if (progressLabel) progressLabel.textContent = '100% concluído';

        const banner = document.createElement('div');
        banner.className = 'lesson-completed-banner';
        banner.textContent = '🎉 Lição concluída! Continue assim!';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 3000);
    }

    document.getElementById('btnMarkComplete')?.addEventListener('click', markComplete);
    document.getElementById('footerMarkComplete')?.addEventListener('click', markComplete);

    // Load saved completion state
    try {
        const prog = JSON.parse(localStorage.getItem('mrdave_progresso') || '{}');
        if (prog['uspeaK_m02_l08']) {
            document.querySelectorAll('#btnMarkComplete, #footerMarkComplete').forEach(btn => {
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg> Lição concluída!';
                btn.disabled = true;
                if (btn.classList.contains('footer-btn-complete')) btn.classList.add('done');
            });
            if (progressFill) progressFill.style.width = '100%';
        }
    } catch (e) {}

    // ---- Exercises ----
    document.querySelectorAll('.btn-check-ex').forEach(btn => {
        btn.addEventListener('click', function () {
            const block = document.getElementById(this.dataset.exercise);
            if (!block) return;
            let correct = 0, total = 0;
            block.querySelectorAll('.ex-input').forEach(input => {
                const answer = (input.dataset.answer || '').toLowerCase().trim();
                const value = input.value.toLowerCase().trim();
                input.classList.remove('correct', 'wrong');
                if (value === '') return;
                total++;
                if (value === answer) {
                    input.classList.add('correct');
                    correct++;
                } else {
                    input.classList.add('wrong');
                }
            });
            if (total > 0) {
                this.textContent = `${correct}/${total} corretas`;
                setTimeout(() => { this.textContent = 'Verificar respostas'; }, 3000);
            }
        });
    });

    // ---- Nav buttons ---- (WP: substituir hrefs pelas URLs reais das lições)
    document.getElementById('btnPrevLesson')?.addEventListener('click', () => {
        // WP: window.location.href = '/area-aluno/uspeaK/modulo-02/licao-07/';
        alert('Integrar com a URL da Lição 07 no WordPress.');
    });
    document.getElementById('btnNextLesson')?.addEventListener('click', () => {
        // WP: window.location.href = '/area-aluno/uspeaK/modulo-02/licao-09/';
        alert('Integrar com a URL da Lição 09 no WordPress.');
    });

    // ---- Check TTS support ----
    if (!window.speechSynthesis) {
        console.warn('[USpeaK] Web Speech API não disponível neste navegador.');
        document.querySelectorAll('.btn-play-block, .kw-listen').forEach(btn => {
            btn.title = 'TTS indisponível neste navegador';
            btn.style.opacity = '.4';
            btn.style.pointerEvents = 'none';
        });
    }

})();
