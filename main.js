/**
 * Ithaque Médical – 10 ans
 * YouTube IFrame API controller + sound toggle + fullscreen
 */

(function () {
  'use strict';

  var VIDEO_ID = '_p-57K78HXQ';
  var player = null;
  var isMuted = true;
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 900;

  /* ── YouTube IFrame API bootstrap ── */
  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }
    var existingCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof existingCallback === 'function') existingCallback();
      initPlayer();
    };
    if (!document.getElementById('yt-iframe-api')) {
      var tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }

  /* ── Init YouTube player ── */
  function initPlayer() {
    var container = document.getElementById('ithaque-player');
    if (!container) return;

    player = new YT.Player('ithaque-player', {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: VIDEO_ID,
        controls: isMobile ? 1 : 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin || 'http://localhost',
        iv_load_policy: 3,
        fs: isMobile ? 1 : 0
      },
      events: {
        onReady: function (e) {
          e.target.mute();
          e.target.playVideo();
        },
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.ENDED) e.target.playVideo();
        }
      }
    });
  }

  /* ── Sound toggle ── */
  function initSoundButton() {
    var btn = document.getElementById('ithaque-sound-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      if (!player) return;
      if (isMuted) {
        player.unMute();
        player.setVolume(80);
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

  /* ── Fullscreen ── */
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

    // Update icon when fullscreen state changes
    var exitIcon = '<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>';
    var enterIcon = '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';

    document.addEventListener('fullscreenchange', function () {
      btn.innerHTML = document.fullscreenElement ? exitIcon : enterIcon;
      btn.setAttribute('aria-label', document.fullscreenElement ? 'Quitter le plein écran' : 'Plein écran');
    });
    document.addEventListener('webkitfullscreenchange', function () {
      var isFS = document.webkitFullscreenElement;
      btn.innerHTML = isFS ? exitIcon : enterIcon;
    });
  }

  /* ── Entry point ── */
  function init() {
    initSoundButton();
    initFullscreenButton();
    loadYouTubeAPI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
