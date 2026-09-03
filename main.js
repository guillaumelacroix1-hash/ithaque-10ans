/**
 * Ithaque Médical – page de preview
 * Façade vidéo de la section « en images »
 */

(function () {
  'use strict';


  /* ── Façade vidéo section Film : charge l'iframe YouTube au clic ── */
  function initFilmFacade() {
    var facades = document.querySelectorAll('.ithaque-film-facade');
    Array.prototype.forEach.call(facades, function (facade) {
      function play() {
        var id = facade.getAttribute('data-yt-id');
        if (!id || facade.querySelector('iframe')) return;
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
        iframe.title = facade.getAttribute('data-yt-title') || 'Vidéo';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        facade.appendChild(iframe);
      }
      facade.addEventListener('click', play);
      var btn = facade.querySelector('.ithaque-film-play');
      if (btn) {
        btn.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            play();
          }
        });
      }
    });
  }

  /* ── Entry point ── */
  function init() {
    initFilmFacade();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
