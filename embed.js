/**
 * Ithaque Médical – Sections « en images » + Argosmed
 * Embed script: injecte la section dans n'importe quelle page (WordPress, etc.)
 *
 * Usage WordPress (bloc HTML personnalisé) :
 *   <div id="ithaque-10ans-embed"></div>   (id historique, conserve)
 *   <script src="https://TON-PROJET.vercel.app/embed.js"></script>
 *
 * Ou simplement (sans div cible) :
 *   <script src="https://TON-PROJET.vercel.app/embed.js"></script>
 *   → Les sections seront insérées juste avant la balise </body>
 */

(function () {
  'use strict';

  // Évite la double-injection
  if (document.getElementById('ithaque-film-section')) return;

  var BASE_URL = (function () {
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;
    return src.substring(0, src.lastIndexOf('/') + 1);
  })();

  var FILM_VIDEO_ID = 'F3JqkxdYVsE';

  /* ══════════════════════════════
     1. Inject CSS
     ══════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('ithaque-10ans-styles')) return;
    var link = document.createElement('link');
    link.id = 'ithaque-10ans-styles';
    link.rel = 'stylesheet';
    link.href = BASE_URL + 'style.css?v=8';
    document.head.appendChild(link);

    // Google Fonts (fail-safe: only load if not already present)
    if (!document.querySelector('link[href*="fonts.googleapis.com"][href*="Raleway"]')) {
      var gf = document.createElement('link');
      gf.rel = 'stylesheet';
      gf.href = 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,700;1,800&display=swap';
      document.head.appendChild(gf);
    }
  }

  /* ══════════════════════════════
     2. Inject HTML
     ══════════════════════════════ */
  function buildFilmHTML() {
    return [
      '<div class="ithaque-film" id="ithaque-film-section">',
      '  <svg class="ithaque-film-lines" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
      '    <g fill="none" stroke="#5FB4A9" stroke-width="1.5">',
      '      <path d="M -40 500 C 240 420 420 470 640 380 S 1060 220 1250 190 T 1500 120" stroke-dasharray="2 14" stroke-width="2.5" stroke-linecap="round"></path>',
      '      <circle cx="90" cy="466" r="5"></circle>',
      '      <path d="M 1338 160 l 14 14 M 1352 160 l -14 14" stroke-width="2"></path>',
      '      <g transform="translate(1210 90)">',
      '        <circle r="120" stroke-dasharray="1 10"></circle>',
      '        <circle r="86" opacity=".7"></circle>',
      '        <circle r="8"></circle>',
      '        <path d="M 0 -150 V -96 M 0 96 V 150 M -150 0 H -96 M 96 0 H 150" stroke-width="1"></path>',
      '        <path d="M 0 -34 L 9 0 L 0 34 L -9 0 Z" stroke-width="1.2"></path>',
      '      </g>',
      '      <path d="M -60 620 Q 160 540 360 600 T 760 640" opacity=".8"></path>',
      '      <path d="M -60 660 Q 180 570 400 630 T 820 690" opacity=".55"></path>',
      '      <path d="M -40 560 Q 120 510 280 552" opacity=".5"></path>',
      '      <g transform="translate(320 200)" opacity=".8">',
      '        <path d="M -34 12 Q -14 -22 4 -4 Q 16 -18 34 10 Z"></path>',
      '        <path d="M -46 20 H 46" stroke-dasharray="1 8" stroke-linecap="round" stroke-width="2"></path>',
      '      </g>',
      '      <g stroke-width="1.5" opacity=".9">',
      '        <path d="M 560 160 h 12 M 566 154 v 12"></path>',
      '        <path d="M 880 480 h 12 M 886 474 v 12"></path>',
      '        <path d="M 1080 350 h 12 M 1086 344 v 12"></path>',
      '        <path d="M 180 320 h 12 M 186 314 v 12"></path>',
      '        <path d="M 700 90 h 12 M 706 84 v 12"></path>',
      '      </g>',
      '      <g stroke-width="1.5" stroke-linecap="round" opacity=".8">',
      '        <path d="M 470 120 q 7 -7 14 0 M 486 113 q 6 -6 12 0"></path>',
      '        <path d="M 960 250 q 7 -7 14 0"></path>',
      '      </g>',
      '    </g>',
      '  </svg>',
      '  <div class="ithaque-film-inner">',
      '',
      '    <!-- LEFT: facade video (iframe chargee au clic) -->',
      '    <div class="ithaque-film-video">',
      '      <div class="ithaque-film-facade" data-yt-id="' + FILM_VIDEO_ID + '" data-yt-title="Présentation d’Ithaque Médical">',
      '        <img src="' + BASE_URL + 'film-poster.webp" alt="" loading="lazy" width="1280" height="720">',
      '        <button type="button" class="ithaque-film-play" aria-label="Lire la vidéo : Présentation d’Ithaque Médical">',
      '          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
      '        </button>',
      '      </div>',
      '    </div>',
      '',
      '    <!-- RIGHT: texte -->',
      '    <div class="ithaque-film-content">',
      '      <p class="ithaque-film-label">Le film</p>',
      '      <h2 class="ithaque-film-title">Ithaque Médical <br><em>en images</em></h2>',
      '      <p class="ithaque-film-text">',
      '        Qui sommes-nous, pour qui travaillons-nous, et comment ?',
      '        Quelques minutes pour découvrir le cabinet, son équipe et sa façon',
      '        de prendre soin de ceux qui prennent soin.',
      '      </p>',
      '      <a',
      '        href="https://medical.ithaque-compagnie.fr/qui-sommes-nous/"',
      '        target="_blank"',
      '        rel="noopener"',
      '        class="ithaque-film-btn"',
      '      ><span>Rencontrer l’équipe</span>',
      '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      '      </a>',
      '    </div>',
      '',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function buildArgosHTML() {
    return [
      '<div class="ithaque-argos" id="ithaque-argos-section">',
      '  <div class="ithaque-argos-inner">',
      '',
      '    <!-- LEFT: Visual - logo Argosmed + by Ithaque -->',
      '    <div class="ithaque-argos-visual">',
      '      <div class="ithaque-argos-logowrap">',
      '        <img',
      '          src="' + BASE_URL + 'logo-argosmed-white.svg"',
      '          alt="Argosmed"',
      '          class="ithaque-argos-mockup"',
      '        >',
      '      </div>',
      '    </div>',
      '',
      '    <!-- RIGHT: Content -->',
      '    <div class="ithaque-argos-content">',
      '      <h2 class="ithaque-argos-title">Argosmed, l’innovation 100% Ithaque</h2>',
      '      <p class="ithaque-argos-text">',
      '        La plateforme qui connecte médecins du travail',
      '        et services de santé au travail partout en France.',
      '      </p>',
      '      <ul class="ithaque-argos-list">',
      '        <li>Recherche de vacations en quelques clics, matching intelligent</li>',
      '        <li>Gestion administrative simplifiée : disponibilités, plannings et contrats</li>',
      '        <li>Accompagnement humain par les experts Ithaque à chaque étape de la mission</li>',
      '        <li>Couverture nationale, 100 % gratuit pour les médecins</li>',
      '      </ul>',
      '      <a',
      '        href="https://www.argosmed.fr"',
      '        target="_blank"',
      '        rel="noopener"',
      '        class="ithaque-argos-btn"',
      '      >Découvrir Argosmed &rsaquo;</a>',
      '    </div>',
      '',
      '  </div>',
      '  <div class="ithaque-argos-accent-bar"></div>',
      '</div>'
    ].join('\n');
  }

  function injectHTML() {
    // Évite la double-injection de la section Argos
    if (document.getElementById('ithaque-argos-section')) return;

    var combinedHTML = buildFilmHTML() + '\n' + buildArgosHTML();
    var target = document.getElementById('ithaque-10ans-embed');
    if (target) {
      target.innerHTML = combinedHTML;
    } else {
      // Fallback: insert before </body>
      document.body.insertAdjacentHTML('beforeend', combinedHTML);
    }
  }

  /* ══════════════════════════════
     3. Facade video de la section Film
     ══════════════════════════════ */
  function initFilmFacade() {
    var facades = document.querySelectorAll('.ithaque-film-facade');
    Array.prototype.forEach.call(facades, function (facade) {
      function play() {
        var id = facade.getAttribute('data-yt-id');
        if (!id || facade.querySelector('iframe')) return;
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
                     '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
        iframe.title = facade.getAttribute('data-yt-title') || 'Vid\u00e9o';
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

  /* ══════════════════════════════
     Boot
     ══════════════════════════════ */
  function boot() {
    injectStyles();
    injectHTML();
    initFilmFacade();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
