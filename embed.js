/**
 * Ithaque Médical – Section 10 ans
 * Embed script: injecte la section dans n'importe quelle page (WordPress, etc.)
 *
 * Usage WordPress (bloc HTML personnalisé) :
 *   <div id="ithaque-10ans-embed"></div>
 *   <script src="https://TON-PROJET.vercel.app/embed.js"></script>
 *
 * Ou simplement (sans div cible) :
 *   <script src="https://TON-PROJET.vercel.app/embed.js"></script>
 *   → La section sera insérée juste avant la balise </body>
 */

(function () {
  'use strict';

  // Évite la double-injection
  if (document.getElementById('ithaque-10ans-section')) return;

  var BASE_URL = (function () {
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;
    return src.substring(0, src.lastIndexOf('/') + 1);
  })();

  var VIDEO_ID = '_p-57K78HXQ';

  /* ══════════════════════════════
     1. Inject CSS
     ══════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('ithaque-10ans-styles')) return;
    var link = document.createElement('link');
    link.id = 'ithaque-10ans-styles';
    link.rel = 'stylesheet';
    link.href = BASE_URL + 'style.css';
    document.head.appendChild(link);

    // Google Fonts (fail-safe: only load if not already present)
    if (!document.querySelector('link[href*="fonts.googleapis.com"][href*="Raleway"]')) {
      var gf = document.createElement('link');
      gf.rel = 'stylesheet';
      gf.href = 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap';
      document.head.appendChild(gf);
    }
  }

  /* ══════════════════════════════
     2. Inject HTML
     ══════════════════════════════ */
  function buildHTML() {
    return [
      '<div class="ithaque-10ans" id="ithaque-10ans-section">',
      '  <div class="ithaque-inner">',
      '',
      '    <!-- LEFT -->',
      '    <div class="ithaque-left">',
      '      <img',
      '        src="https://medical.ithaque-compagnie.fr/wp-content/uploads/sites/3/2017/07/logo_ithaque_medical.svg"',
      '        alt="Ithaque M\u00e9dical"',
      '        class="ithaque-logo"',
      '      >',
      '      <h2 class="ithaque-title">Ithaque M\u00e9dical \u00e0 f\u00eat\u00e9 ses 10 ans</h2>',
      '      <p class="ithaque-text">',
      '        Retour en images sur cette soir\u00e9e inoubliable du mardi 25 novembre 2025',
      '        au Mus\u00e9e national de la Marine, c\u00e9l\u00e9brant les 10 ans d\u2019Ithaque M\u00e9dical.',
      '      </p>',
      '      <p class="ithaque-text">',
      '        Gr\u00e2ce \u00e0 vous et avec vous, nous avons franchi un cap majeur\u00a0: 10 ans',
      '        d\u2019aventure professionnelle, de rencontres et d\u2019engagement mutuel.<br>',
      '        Un anniversaire singulier, f\u00eat\u00e9 dans un lieu incarnant l\u2019audace, le voyage',
      '        et tant d\u2019autres symboles puissants.',
      '      </p>',
      '      <a',
      '        href="https://jknaub.pixieset.com/soiree10ansithaquemedical/"',
      '        target="_blank"',
      '        rel="noopener"',
      '        class="ithaque-btn"',
      '      >Voir la galerie &rsaquo;</a>',
      '    </div>',
      '',
      '    <!-- RIGHT: video -->',
      '    <div class="ithaque-right">',
      '      <div class="ithaque-video-container">',
      '        <div id="ithaque-player"></div>',
      '        <div class="ithaque-controls">',
      '          <button id="ithaque-sound-btn" class="ithaque-ctrl-btn ithaque-sound-btn" aria-label="Activer le son">',
      '            <svg class="icon-muted" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
      '            <svg class="icon-unmuted" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
      '          </button>',
      '          <button id="ithaque-fs-btn" class="ithaque-ctrl-btn" aria-label="Plein \u00e9cran">',
      '            <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
      '          </button>',
      '        </div>',
      '      </div>',
      '    </div>',
      '',
      '  </div>',
      '  <div class="ithaque-accent-bar"></div>',
      '</div>'
    ].join('\n');
  }

  function injectHTML() {
    var target = document.getElementById('ithaque-10ans-embed');
    if (target) {
      target.innerHTML = buildHTML();
    } else {
      // Fallback: insert before </body>
      document.body.insertAdjacentHTML('beforeend', buildHTML());
    }
  }

  /* ══════════════════════════════
     3. YouTube IFrame API
     ══════════════════════════════ */
  var player = null;
  var isMuted = true;

  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }
    var existing = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof existing === 'function') existing();
      initPlayer();
    };
    if (!document.getElementById('yt-iframe-api')) {
      var tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }

  function initPlayer() {
    if (!document.getElementById('ithaque-player')) return;
    player = new YT.Player('ithaque-player', {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1, mute: 1, loop: 1, playlist: VIDEO_ID,
        controls: 0, modestbranding: 1, rel: 0, playsinline: 1,
        enablejsapi: 1, iv_load_policy: 3, fs: 0,
        origin: window.location.origin
      },
      events: {
        onReady: function (e) { e.target.mute(); e.target.playVideo(); },
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.ENDED) e.target.playVideo();
        }
      }
    });
  }

  /* ══════════════════════════════
     4. Sound button
     ══════════════════════════════ */
  function initSoundButton() {
    var btn = document.getElementById('ithaque-sound-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (!player) return;
      if (isMuted) {
        player.unMute(); player.setVolume(80);
        btn.classList.add('is-unmuted');
        btn.setAttribute('aria-label', 'Couper le son');
      } else {
        player.mute();
        btn.classList.remove('is-unmuted');
        btn.setAttribute('aria-label', 'Activer le son');
      }
      isMuted = !isMuted;
    });
  }

  /* ══════════════════════════════
     5. Fullscreen button
     ══════════════════════════════ */
  function initFullscreenButton() {
    var btn = document.getElementById('ithaque-fs-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isFS = document.fullscreenElement || document.webkitFullscreenElement;
      if (isFS) {
        var exitFS = document.exitFullscreen || document.webkitExitFullscreen ||
                     document.mozCancelFullScreen || document.msExitFullscreen;
        if (exitFS) exitFS.call(document);
      } else {
        var target = document.querySelector('.ithaque-video-container');
        if (!target) return;
        var requestFS = target.requestFullscreen || target.webkitRequestFullscreen ||
                        target.mozRequestFullScreen || target.msRequestFullscreen;
        if (requestFS) requestFS.call(target);
      }
    });
    var exitIcon = '<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>';
    var enterIcon = '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';
    document.addEventListener('fullscreenchange', function () {
      btn.innerHTML = document.fullscreenElement ? exitIcon : enterIcon;
    });
    document.addEventListener('webkitfullscreenchange', function () {
      btn.innerHTML = document.webkitFullscreenElement ? exitIcon : enterIcon;
    });
  }

  /* ══════════════════════════════
     Boot
     ══════════════════════════════ */
  function boot() {
    injectStyles();
    injectHTML();
    initSoundButton();
    initFullscreenButton();
    loadYouTubeAPI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
