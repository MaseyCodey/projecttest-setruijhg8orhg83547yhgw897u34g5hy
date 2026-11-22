/* A little butterfly magic. Replay fix v3. No external libraries required. */
(() => {
  'use strict';

  const button = document.getElementById('logo-button');
  const art = document.querySelector('.hero-art');
  const logo = art.querySelector('.foundation-logo');
  const template = document.getElementById('flutter-butterfly-template');
  const orbitLayer = document.getElementById('butterfly-orbit-layer');
  const celebration = document.getElementById('celebration-layer');
  const audio = document.getElementById('lola-melody');
  const stopButton = document.getElementById('sound-stop');
  const status = document.getElementById('melody-status');
  const audioHelp = document.getElementById('audio-help');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['#f35a29', '#fae03a', '#f58c47'];

  let hovering = false;
  let keyboardFocus = false;
  let frameId = 0;
  let fadeUntil = 0;
  let artWidth = art.getBoundingClientRect().width;
  let animations = [];
  let cleanupTimer = 0;
  let celebrationRun = 0;
  let playbackRequest = 0;
  let playbackState = 'idle';

  function makeButterfly(className, index) {
    const node = document.createElement('span');
    node.className = className;
    node.style.setProperty('--wing-color', colors[index % colors.length]);
    node.append(template.content.cloneNode(true));
    return node;
  }

  const orbiters = Array.from({ length: 3 }, (_, index) => {
    const node = makeButterfly('orbiting-butterfly', index);
    orbitLayer.append(node);
    return node;
  });

  function wantsFlight() {
    return !document.hidden && !reducedMotion.matches && (hovering || keyboardFocus);
  }

  function drawOrbit(now) {
    frameId = 0;
    const time = now / 1000;
    orbiters.forEach((node, index) => {
      const angle = time * .82 + index * Math.PI * 2 / 3;
      const x = (Math.cos(angle) * .425 + Math.sin(angle * 3) * .013) * artWidth;
      const y = (Math.sin(angle) * .415 + Math.sin(angle * 2) * .018) * artWidth;
      const tilt = Math.cos(angle) * 24 + Math.sin(time * 2 + index) * 8;
      const scale = .82 + index * .09;
      node.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg) scale(${scale})`;
    });
    if (wantsFlight() || now < fadeUntil) frameId = requestAnimationFrame(drawOrbit);
  }

  function updateFlight() {
    // Always start a fresh frame chain; a restored or interrupted page must not
    // depend on a requestAnimationFrame callback from a previous hover.
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    const flying = wantsFlight();
    art.classList.toggle('is-fluttering', flying);
    fadeUntil = performance.now() + 250;
    if (!document.hidden && !reducedMotion.matches) drawOrbit(performance.now());
  }

  function clearCelebration() {
    ++celebrationRun;
    clearTimeout(cleanupTimer);
    cleanupTimer = 0;
    animations.forEach(animation => animation.cancel());
    animations = [];
    celebration.replaceChildren();
  }

  function finishCelebrationAfter(delay) {
    const run = celebrationRun;
    cleanupTimer = window.setTimeout(() => {
      // Cleanup from an older click must never remove a newer animation.
      if (run === celebrationRun) clearCelebration();
    }, delay);
  }

  function animate(node, frames, options) {
    const animation = node.animate(frames, options);
    animations.push(animation);
    return animation;
  }

  function celebrate() {
    clearCelebration();
    if (reducedMotion.matches) {
      // A quiet, brief highlight replaces movement for reduced-motion visitors.
      animate(logo, [
        { filter: 'drop-shadow(0 0 0 #fae03a00)' },
        { filter: 'drop-shadow(0 0 18px #fae03a99)' },
        { filter: 'drop-shadow(0 15px 20px #65431d19)' }
      ], { duration: 900, easing: 'ease-out' });
      finishCelebrationAfter(1000);
      return;
    }

    animate(logo, [
      { transform: 'scale(1) rotate(0)' },
      { transform: 'scale(.965) rotate(-3deg)', offset: .15 },
      { transform: 'scale(1.045) rotate(3deg)', offset: .42 },
      { transform: 'scale(.995) rotate(-1.5deg)', offset: .7 },
      { transform: 'scale(1) rotate(0)' }
    ], { duration: 1000, easing: 'ease-in-out' });

    for (let index = 0; index < 2; index++) {
      const ripple = document.createElement('span');
      ripple.className = 'celebration-ripple';
      celebration.append(ripple);
      animate(ripple, [
        { transform: 'scale(.95)', opacity: 0 },
        { transform: 'scale(1.05)', opacity: .5, offset: .25 },
        { transform: 'scale(1.28)', opacity: 0 }
      ], { duration: 1500, delay: index * 300, easing: 'ease-out', fill: 'both' });
    }

    for (let index = 0; index < 7; index++) {
      const butterfly = makeButterfly('celebration-butterfly', index);
      celebration.append(butterfly);
      const startAngle = index / 7 * Math.PI * 2 - Math.PI / 2;
      const frames = Array.from({ length: 17 }, (_, step) => {
        const p = step / 16;
        const angle = startAngle + p * 2.2;
        const radius = .29 + Math.sin(p * Math.PI * .68) * .15;
        const x = Math.cos(angle) * radius * artWidth;
        const y = Math.sin(angle) * radius * artWidth - Math.sin(p * Math.PI) * artWidth * .025;
        const tilt = Math.cos(angle) * 26;
        const scale = .55 + Math.sin(p * Math.PI) * .45;
        return {
          transform: `translate(${x}px, ${y}px) rotate(${tilt}deg) scale(${scale})`,
          opacity: p < .125 ? p / .125 : p > .8 ? (1 - p) / .2 : 1,
          offset: p
        };
      });
      animate(butterfly, frames, { duration: 3400, delay: index * 85, easing: 'linear', fill: 'both' });
    }

    for (let index = 0; index < 11; index++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'celebration-sparkle';
      sparkle.textContent = index % 3 === 0 ? '♥' : '✦';
      sparkle.style.color = colors[index % colors.length];
      celebration.append(sparkle);
      const angle = index / 11 * Math.PI * 2;
      const x = Math.cos(angle) * artWidth * .37;
      const y = Math.sin(angle) * artWidth * .37;
      animate(sparkle, [
        { transform: `translate(${x * .8}px, ${y * .8}px) scale(.2)`, opacity: 0 },
        { transform: `translate(${x}px, ${y}px) scale(1)`, opacity: .9, offset: .3 },
        { transform: `translate(${x * 1.13}px, ${y * 1.1 - 12}px) scale(.5)`, opacity: 0 }
      ], { duration: 1500, delay: 150 + index * 65, easing: 'ease-out', fill: 'both' });
    }

    finishCelebrationAfter(4300);
  }

  function updateSoundUI(playing, message) {
    const restoreFocus = !playing && document.activeElement === stopButton;
    stopButton.hidden = !playing;
    art.classList.toggle('is-playing', playing);
    status.textContent = message;
    if (restoreFocus) button.focus({ preventScroll: true });
  }

  function showAudioError() {
    playbackState = 'idle';
    updateSoundUI(false, 'The melody could not start. Please try again or use the audio link.');
    audioHelp.hidden = false;
  }

  async function playMelody() {
    const request = ++playbackRequest;
    playbackState = 'starting';
    audioHelp.hidden = true;
    audio.pause();
    audio.currentTime = 0;
    audio.volume = .65;
    updateSoundUI(true, 'Starting Lola’s melody.');
    try {
      // Call play directly from the user's click/tap so mobile browsers permit sound.
      await audio.play();
      if (request !== playbackRequest) return;
      playbackState = 'playing';
      updateSoundUI(true, 'Lola’s melody is playing. Click the logo to replay, or choose Stop melody.');
    } catch (error) {
      if (request !== playbackRequest) return;
      showAudioError();
    }
  }

  function stopMelody() {
    ++playbackRequest;
    playbackState = 'idle';
    audio.pause();
    audio.currentTime = 0;
    updateSoundUI(false, 'Melody stopped. Click the logo whenever you’d like to hear it again.');
  }

  function beginHover(event) {
    if (event.pointerType === 'touch') return;
    hovering = true;
    updateFlight();
  }

  button.addEventListener('pointerenter', beginHover);
  button.addEventListener('pointermove', event => {
    if (!hovering || !frameId) beginHover(event);
  });
  button.addEventListener('pointerleave', () => { hovering = false; updateFlight(); });
  button.addEventListener('pointercancel', () => { hovering = false; updateFlight(); });
  button.addEventListener('focus', () => {
    keyboardFocus = button.matches(':focus-visible');
    updateFlight();
  });
  button.addEventListener('blur', () => { keyboardFocus = false; updateFlight(); });
  button.addEventListener('click', () => {
    artWidth = art.getBoundingClientRect().width;
    updateFlight();
    // Sound stays independent of the animation, and each click creates a new run.
    playMelody();
    try {
      celebrate();
    } catch (error) {
      clearCelebration();
      console.warn('The butterfly effect could not render on this browser.', error);
    }
  });
  stopButton.addEventListener('click', stopMelody);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && playbackState !== 'idle') stopMelody();
  });
  audio.addEventListener('ended', () => {
    playbackState = 'idle';
    updateSoundUI(false, 'Lola’s melody has finished. Click the logo to hear it again.');
  });
  audio.addEventListener('pause', () => {
    if (playbackState === 'playing' && audio.paused && !audio.ended) {
      playbackState = 'idle';
      updateSoundUI(false, 'Melody paused. Click the logo to play it again.');
    }
  });
  audio.addEventListener('error', () => { if (playbackState !== 'idle') showAudioError(); });
  reducedMotion.addEventListener('change', () => {
    clearCelebration();
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    updateFlight();
  });
  window.addEventListener('resize', () => { artWidth = art.getBoundingClientRect().width; });
  function resumeInteractions() {
    artWidth = art.getBoundingClientRect().width;
    hovering = window.matchMedia('(any-hover: hover)').matches && button.matches(':hover');
    keyboardFocus = document.activeElement === button && button.matches(':focus-visible');
    updateFlight();
  }
  window.addEventListener('pageshow', resumeInteractions);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      art.classList.remove('is-fluttering');
      clearCelebration();
    } else {
      resumeInteractions();
    }
  });
  window.addEventListener('pagehide', () => {
    hovering = false;
    keyboardFocus = false;
    art.classList.remove('is-fluttering');
    stopMelody();
    clearCelebration();
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  });

  button.disabled = false;
  document.getElementById('logo-interaction').hidden = false;
})();
