/**
 * Ithaque Médical – 10 ans
 * YouTube IFrame API controller + responsive sizing
 */

(function () {
  'use strict';

  var VIDEO_ID = '_p-57K78HXQ';
  var player = null;
  var isMuted = true;

  /* ── YouTube IFrame API bootstrap ── */
  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
      return;
    }

    // If another script already queued the API callback, chain it
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

  function onYouTubeIframeAPIReady() {
    initPlayer();
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
        playlist: VIDEO_ID,   // required for loop
        controls: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin || '*',
        iv_load_policy: 3,    // hide annotations
        fs: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
    sizeVideo();
  }

  function onPlayerStateChange(event) {
    // Restart if ended (belt-and-suspenders for loop)
    if (event.data === YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
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

  /* ── Responsive: cover the right panel in 16:9 ── */
  function sizeVideo() {
    var wrapper = document.querySelector('.ithaque-video-wrapper');
    var playerEl = document.getElementById('ithaque-player');
    if (!wrapper || !playerEl) return;

    var w = wrapper.offsetWidth;
    var h = wrapper.offsetHeight;

    // 16:9 intrinsic
    var targetW = Math.max(w, h * (16 / 9));
    var targetH = Math.max(h, w * (9 / 16));

    // Cover: pick the dimension that overshoots, then scale the other
    if (w / h > 16 / 9) {
      targetW = w;
      targetH = w * (9 / 16);
    } else {
      targetH = h;
      targetW = h * (16 / 9);
    }

    playerEl.style.width = Math.ceil(targetW) + 'px';
    playerEl.style.height = Math.ceil(targetH) + 'px';

    // Re-apply iframe size if player is ready
    var iframe = playerEl.querySelector('iframe');
    if (iframe) {
      iframe.style.width = Math.ceil(targetW) + 'px';
      iframe.style.height = Math.ceil(targetH) + 'px';
    }
  }

  /* ── Resize observer ── */
  function watchResize() {
    if (window.ResizeObserver) {
      var wrapper = document.querySelector('.ithaque-video-wrapper');
      if (wrapper) {
        new ResizeObserver(sizeVideo).observe(wrapper);
      }
    } else {
      window.addEventListener('resize', sizeVideo);
    }
  }

  /* ── Entry point ── */
  function init() {
    initSoundButton();
    watchResize();
    loadYouTubeAPI();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
