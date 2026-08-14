/**
 * custom-modules.js — generado automaticamente por SyncPropio (panel de Modulos Custom)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-08-14 19:23:16
 */
(function () {
  'use strict';

  var STORE = (function () {
    var host = window.location.hostname;
    if (host.indexOf('leder.cl') !== -1) return 'cl';
    if (host.indexOf('lederhd.com') !== -1) return 'ar';
    return null;
  })();

  function currentTemplate() {
    return (window.LS && LS.template) ? LS.template : null;
  }

  var MODULES = [
  {
    "id": "nuestra-historia",
    "stores": [
      "ar"
    ],
    "page": "home",
    "anchor": ".js-section-banner-home[data-store=\"home-banner-promotional\"]",
    "position": "after",
    "alt": "Banner de LEDER",
    "link": "",
    "autoplay": true,
    "autoplayDelay": 5000,
    "marginTop": 20,
    "marginBottom": 0,
    "zoomOnHover": false,
    "titulo": "Nuestra Historia",
    "tituloVisible": false,
    "tituloAlign": "center",
    "desktop": {
      "images": [
        {
          "height": 620,
          "src": "https://arielbentivoglio.github.io/leder-feeds/modules/nuestra-historia/desktop/20260814184720851515-Nuestrahistoriadesk1.webp",
          "width": 1920
        },
        {
          "height": 620,
          "src": "https://arielbentivoglio.github.io/leder-feeds/modules/nuestra-historia/desktop/20260814184722320273-nuestraHistoriadesk2.webp",
          "width": 1920
        }
      ]
    },
    "mobile": {
      "images": [
        {
          "height": 1080,
          "src": "https://arielbentivoglio.github.io/leder-feeds/modules/nuestra-historia/mobile/20260814184723945218-nuestrahistoriamobile1.webp",
          "width": 720
        },
        {
          "height": 1080,
          "src": "https://arielbentivoglio.github.io/leder-feeds/modules/nuestra-historia/mobile/20260814184725976407-nuestrahistoriamobile2.webp",
          "width": 720
        }
      ]
    }
  }
];

  function escHtml(s) {
    return (s || '').toString().replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function slideHtml(cfg, img) {
    var link = img.link || cfg.link || '';
    var openTag = link ? ('<a href="' + link + '" class="gallery-link" aria-label="">') : '<div class="gallery-link">';
    var closeTag = link ? '</a>' : '</div>';
    var zoomClass = cfg.zoomOnHover ? ' js-zoom-hover' : '';
    var titleHtml = (cfg.tituloVisible && cfg.titulo)
      ? ('<div class="js-modulo-title align-' + (cfg.tituloAlign || 'left') + '">' + escHtml(cfg.titulo) + '</div>')
      : '';
    return (
      '<div class="js-banner-item swiper-slide">' +
        '<div class="gallery-item-container js-textbanner textbanner transition-soft m-0' + zoomClass + '">' +
          openTag +
            '<img class="textbanner-image transition-soft img-fluid d-block w-100 fade-in lazyloaded" ' +
                 'width="' + img.width + '" height="' + img.height + '" ' +
                 'style="aspect-ratio:' + img.width + '/' + img.height + '" ' +
                 'src="' + img.src + '" ' +
                 'alt="' + (cfg.alt || '') + '">' +
            titleHtml +
          closeTag +
        '</div>' +
      '</div>'
    );
  }

  var _hoverStyleInjected = false;
  function injectHoverStyleOnce() {
    if (_hoverStyleInjected) return;
    _hoverStyleInjected = true;
    var style = document.createElement('style');
    // Por default neutraliza cualquier zoom/transform que el theme nativo
    // pudiera aplicar por reusar las mismas clases (gallery-item-container,
    // textbanner-image). Solo si el modulo tiene zoomOnHover activo, la
    // segunda regla (mas especifica) lo pisa.
    style.textContent =
      '.js-home-banner-custom .gallery-item-container{position:relative}' +
      '.js-home-banner-custom .gallery-item-container:hover img{transform:none!important;transition:none!important}' +
      '.js-home-banner-custom .gallery-item-container.js-zoom-hover{overflow:hidden}' +
      '.js-home-banner-custom .gallery-item-container.js-zoom-hover:hover img{transform:scale(1.06)!important;transition:transform .45s ease!important}' +
      '.js-home-banner-custom .js-modulo-title{position:absolute;left:0;right:0;bottom:20px;padding:0 28px;margin:0;font-size:1.7rem;line-height:1.25;font-weight:700;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.4);pointer-events:none}' +
      '.js-home-banner-custom .js-modulo-title.align-left{text-align:left}' +
      '.js-home-banner-custom .js-modulo-title.align-center{text-align:center}' +
      '.js-home-banner-custom .js-modulo-title.align-right{text-align:right}';
    document.head.appendChild(style);
  }

  function breakpointBlockHtml(cfg, breakpoint) {
    var data = cfg[breakpoint];
    if (!data || !data.images || !data.images.length) return '';

    var swiperId = 'js-swiper-' + cfg.id + (breakpoint === 'mobile' ? '-mobile' : '');
    var visibility = breakpoint === 'mobile' ? 'd-md-none' : 'd-none d-md-block';
    var isSlider = data.images.length > 1;

    var slides = data.images.map(function (img) { return slideHtml(cfg, img); }).join('');

    var controls = isSlider
      ? (
          '<div class="' + swiperId + '-pagination swiper-pagination swiper-pagination-bullets"></div>' +
          '<div class="' + swiperId + '-prev swiper-button-prev">' +
            '<svg class="icon-inline icon-2x icon-flip-horizontal"><use xlink:href="#arrow-long"/></svg>' +
          '</div>' +
          '<div class="' + swiperId + '-next swiper-button-next">' +
            '<svg class="icon-inline icon-2x"><use xlink:href="#arrow-long"/></svg>' +
          '</div>'
        )
      : '';

    return (
      '<div class="js-banner-custom-' + breakpoint + ' ' + visibility + '">' +
        '<div class="js-banner-container container-fluid overflow-none p-0 position-relative">' +
          '<div class="' + swiperId + ' swiper-container" style="aspect-ratio:' + data.images[0].width + '/' + data.images[0].height + '">' +
            '<div class="js-banner-grid swiper-wrapper' + (isSlider ? ' flex-nowrap' : ' grid grid-no-gap') + '">' +
              slides +
            '</div>' +
          '</div>' +
          controls +
        '</div>' +
      '</div>'
    );
  }

  function buildModuleHtml(cfg) {
    var mt = parseInt(cfg.marginTop, 10) || 0;
    var mb = parseInt(cfg.marginBottom, 10) || 0;
    return (
      '<section class="js-section-banner-home section-home section-banners-home position-relative overflow-none p-0" ' +
              'data-store="' + cfg.id + '" style="margin-top:' + mt + 'px;margin-bottom:' + mb + 'px">' +
        '<div class="js-home-banner-custom">' +
          breakpointBlockHtml(cfg, 'desktop') +
          breakpointBlockHtml(cfg, 'mobile') +
        '</div>' +
      '</section>'
    );
  }

  function initSwiper(cfg, breakpoint) {
    var data = cfg[breakpoint];
    if (!data || !data.images || data.images.length < 2) return;
    if (typeof window.Swiper === 'undefined') {
      console.warn('[custom-modules] window.Swiper no disponible; modulo "' + cfg.id + '" sin carrusel.');
      return;
    }
    var swiperId = 'js-swiper-' + cfg.id + (breakpoint === 'mobile' ? '-mobile' : '');
    var opts = {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: { el: '.' + swiperId + '-pagination', clickable: true },
      navigation: { nextEl: '.' + swiperId + '-next', prevEl: '.' + swiperId + '-prev' }
    };
    if (cfg.autoplay) {
      opts.autoplay = { delay: cfg.autoplayDelay || 5000, disableOnInteraction: false, pauseOnMouseEnter: true };
    }
    new window.Swiper('.' + swiperId, opts);
  }

  function fallbackShowFirstSlide(root) {
    if (typeof window.Swiper !== 'undefined') return;
    root.querySelectorAll('.swiper-wrapper').forEach(function (wrapper) {
      wrapper.querySelectorAll('.swiper-slide').forEach(function (slide, i) {
        slide.style.display = i === 0 ? '' : 'none';
      });
    });
  }

  function insertModule(cfg, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    var anchor = document.querySelector(cfg.anchor);
    if (!anchor) {
      if (attemptsLeft <= 0) return;
      setTimeout(function () { insertModule(cfg, attemptsLeft - 1); }, 150);
      return;
    }
    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildModuleHtml(cfg);
    var node = wrapper.firstElementChild;

    injectHoverStyleOnce();

    switch (cfg.position) {
      case 'before': anchor.parentNode.insertBefore(node, anchor); break;
      case 'after': anchor.parentNode.insertBefore(node, anchor.nextSibling); break;
      case 'prepend': anchor.insertBefore(node, anchor.firstChild); break;
      case 'append': default: anchor.appendChild(node); break;
    }

    initSwiper(cfg, 'desktop');
    initSwiper(cfg, 'mobile');
    fallbackShowFirstSlide(node);
  }

  function run() {
    if (!STORE) return;
    var page = currentTemplate();
    MODULES.forEach(function (cfg) {
      if (!cfg.stores || cfg.stores.indexOf(STORE) === -1) return;
      if (cfg.page && cfg.page !== page) return;
      insertModule(cfg);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
