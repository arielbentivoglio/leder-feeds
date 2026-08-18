/**
 * video-carousel.js — generado automaticamente por SyncPropio (panel de Carrusel de Videos)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-08-18 14:34:39
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

  function isProductPage() {
    return /\/productos?\//.test(window.location.pathname);
  }

  function paginaActual() {
    var tpl = currentTemplate();
    if (tpl === 'home') return 'home';
    if (tpl === 'product' || isProductPage()) return 'producto';
    return tpl;
  }

  var CAROUSELS = [
  {
    "id": "carrusel-home-videos-1",
    "stores": [
      "ar"
    ],
    "placements": [
      {
        "page": "home",
        "anchor": ".js-section-banner-home[data-store=\"nuestra-historia\"]",
        "position": "after"
      }
    ],
    "link": "",
    "marginTop": 20,
    "marginBottom": 0,
    "titulo": "",
    "tituloVisible": false,
    "tituloAlign": "center",
    "tituloColor": "#1a1a1a",
    "cardRatioW": 9,
    "cardRatioH": 16,
    "cardWidthDesktop": 220,
    "cardWidthMobile": 150,
    "videos": [
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/73sJI3f1STs",
        "src": "",
        "poster": "",
        "link": "",
        "productoId": 353777968,
        "productoNombre": "Bolso De Cuero Vacuno Peak - Dark Brown",
        "productoPrecio": "439990.00",
        "productoPrecioTachado": "439990.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-peak-chocolate-1-planchar-d984489ea8e9e9ad3217830833620098-1024-1024.webp",
        "productoUrl": "https://lederhd.com/productos/bolso-de-viaje-peak-de-cuero-vacuno-dark-brown-1cfko/",
        "productoCuotasTexto": "12 cuotas sin interés de $36.665,83"
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/avUVf2PT4Yg",
        "src": "",
        "poster": "",
        "link": "",
        "productoId": 310516921,
        "productoNombre": "Cuero De Oveja Pelo Largo Muflón Corderito - 80x45cm",
        "productoPrecio": "99790.00",
        "productoPrecioTachado": "99790.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/d_nq_np_2x_740623-mla107449749795_022026-f-1-d723a33d92fc6ad28317812686249719-1024-1024.jpg",
        "productoUrl": "https://lederhd.com/productos/cuero-de-oveja-muflon-corderito-colores-80x45cm/",
        "productoCuotasTexto": "3 cuotas sin interés de $33.263,33"
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/DN3eg31vIC0",
        "src": "",
        "poster": "",
        "link": "",
        "productoId": 317404072,
        "productoNombre": "Bota De Cuero Lanar - Balu",
        "productoPrecio": "249988.00",
        "productoPrecioTachado": "249988.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/balu1-moss-2-458d15db9cb4f375a117775747108515-1024-1024.webp",
        "productoUrl": "https://lederhd.com/productos/bota-de-cuero-lanar-balu/",
        "productoCuotasTexto": "9 cuotas sin interés de $22.221,11"
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/DykO6u8Kz8g",
        "src": "",
        "poster": "",
        "link": "",
        "productoId": 333922132,
        "productoNombre": "Tapado De Cuero Bella - Black",
        "productoPrecio": "799990.00",
        "productoPrecioTachado": "799990.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/portada-c9a909b3904003770417783798454457-1024-1024.png",
        "productoUrl": "https://lederhd.com/productos/tapado-de-cuero-bella-black/",
        "productoCuotasTexto": "12 cuotas sin interés de $66.665,83"
      }
    ]
  }
];

  function escHtml(s) {
    return (s || '').toString().replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var _styleInjected = false;
  function injectStyleOnce() {
    if (_styleInjected) return;
    _styleInjected = true;
    var style = document.createElement('style');
    style.textContent =
      '.js-video-carousel-title{margin:0 0 14px}' +
      '.js-video-carousel-title.align-left{text-align:left}' +
      '.js-video-carousel-title.align-center{text-align:center}' +
      '.js-video-carousel-title.align-right{text-align:right}' +
      '.js-vc-shelf{display:flex;gap:10px;overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;padding-bottom:2px}' +
      '.js-vc-item{flex:0 0 auto;scroll-snap-align:start}' +
      '.js-vc-card{position:relative;border-radius:10px;overflow:hidden;background:#111;width:100%}' +
      '.js-vc-poster,.js-vc-card video,.js-vc-card iframe{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0;display:block}' +
      '.js-vc-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;cursor:pointer;background:rgba(0,0,0,0)}' +
      '.js-vc-play-circle{width:46px;height:46px;border-radius:50%;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}' +
      '.js-vc-play-circle svg{width:18px;height:18px;fill:#fff;margin-left:2px}' +
      '.js-vc-link-overlay{position:absolute;inset:0;z-index:1}' +
      '.js-vc-product{margin-top:8px;cursor:pointer;font-family:inherit}' +
      '.js-vc-product-name{font-size:12px;color:#1a1a1a;margin:0 0 3px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}' +
      '.js-vc-product-price-row{display:flex;align-items:baseline;gap:6px}' +
      '.js-vc-product-price{font-size:13px;font-weight:600;color:#1a1a1a}' +
      '.js-vc-product-compare{font-size:11px;color:#999;text-decoration:line-through}' +
      '.js-vc-product-installments{font-size:11px;color:#1a1a1a;margin-top:2px}';
    document.head.appendChild(style);
  }

  function extraerIdYoutube(input) {
    if (!input) return '';
    input = input.trim();
    var m = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{6,})/);
    if (m) return m[1];
    if (/^[a-zA-Z0-9_-]{6,}$/.test(input)) return input;
    return '';
  }

  function youtubeThumb(idRaw) {
    var id = extraerIdYoutube(idRaw);
    return id ? ('https://img.youtube.com/vi/' + id + '/hqdefault.jpg') : '';
  }

  function titleHeadingHtml(cfg) {
    if (!cfg.tituloVisible || !cfg.titulo) return '';
    var color = cfg.tituloColor || '#1a1a1a';
    return '<h2 class="js-video-carousel-title align-' + (cfg.tituloAlign || 'left') + '" style="color:' + color + '">' + escHtml(cfg.titulo) + '</h2>';
  }

  function formatearPrecio(n) {
    n = Math.round(parseFloat(n) || 0);
    return '$' + n.toLocaleString('es-AR');
  }

  function productoBlockHtml(video) {
    if (!video.productoNombre) return '';
    var precio = parseFloat(video.productoPrecio) || 0;
    var tachado = parseFloat(video.productoPrecioTachado) || 0;
    var url = video.productoUrl || '';
    return (
      '<div class="js-vc-product" data-url="' + escHtml(url) + '">' +
        '<p class="js-vc-product-name">' + escHtml(video.productoNombre) + '</p>' +
        '<div class="js-vc-product-price-row">' +
          '<span class="js-vc-product-price">' + formatearPrecio(precio) + '</span>' +
          (tachado > precio ? '<span class="js-vc-product-compare">' + formatearPrecio(tachado) + '</span>' : '') +
        '</div>' +
        (video.productoCuotasTexto ? '<div class="js-vc-product-installments">' + escHtml(video.productoCuotasTexto) + '</div>' : '') +
      '</div>'
    );
  }

  function cardHtml(cfg, video, idx) {
    var tipo = video.tipo === 'youtube' ? 'youtube' : 'archivo';
    var ytId = tipo === 'youtube' ? extraerIdYoutube(video.youtube_id) : '';
    if (tipo === 'youtube' && !ytId) return '';
    if (tipo === 'archivo' && !video.src) return '';
    var poster = video.poster || (tipo === 'youtube' ? youtubeThumb(video.youtube_id) : '');
    var cardId = 'js-vc-card-' + cfg.id + '-' + idx;
    return (
      '<div class="js-vc-item">' +
        '<div class="js-vc-card" id="' + cardId + '" data-tipo="' + tipo + '" ' +
             'data-yt="' + escHtml(ytId) + '" data-src="' + escHtml(video.src || '') + '">' +
          (poster ? '<img class="js-vc-poster" src="' + poster + '" alt="" loading="lazy">' : '') +
          '<div class="js-vc-play" role="button" aria-label="Reproducir video">' +
            '<div class="js-vc-play-circle"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>' +
          '</div>' +
        '</div>' +
        productoBlockHtml(video) +
      '</div>'
    );
  }

  function buildCarouselHtml(cfg) {
    var mt = parseInt(cfg.marginTop, 10) || 0;
    var mb = parseInt(cfg.marginBottom, 10) || 0;
    var shelfId = 'js-vc-shelf-' + cfg.id;
    var videos = cfg.videos || [];
    var cards = videos.map(function (v, i) { return cardHtml(cfg, v, i); }).join('');
    var ratio = (cfg.cardRatioW || 9) + '/' + (cfg.cardRatioH || 16);
    var wDesktop = cfg.cardWidthDesktop || 220;
    var wMobile = cfg.cardWidthMobile || 150;
    return (
      '<section class="js-video-carousel" data-store="' + cfg.id + '" ' +
              'style="margin-top:' + mt + 'px;margin-bottom:' + mb + 'px">' +
        titleHeadingHtml(cfg) +
        '<style>' +
          '#' + shelfId + ' .js-vc-item{width:' + wMobile + 'px}' +
          '#' + shelfId + ' .js-vc-card{aspect-ratio:' + ratio + '}' +
          '@media (min-width:768px){#' + shelfId + ' .js-vc-item{width:' + wDesktop + 'px}}' +
        '</style>' +
        '<div class="container-fluid p-0"><div id="' + shelfId + '" class="js-vc-shelf">' + cards + '</div></div>' +
      '</section>'
    );
  }

  // ─── Reproduccion: solo una tarjeta reproduce a la vez EN TODA LA PAGINA ──
  function pauseCard(card) {
    if (!card) return;
    card.removeAttribute('data-playing');
    var tipo = card.getAttribute('data-tipo');
    if (tipo === 'youtube') {
      var iframe = card.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    } else {
      var video = card.querySelector('video');
      if (video) video.pause();
    }
    var poster = card.querySelector('.js-vc-poster');
    var playBtn = card.querySelector('.js-vc-play');
    if (poster) poster.style.display = '';
    if (playBtn) playBtn.style.display = '';
  }

  function playCard(card) {
    document.querySelectorAll('.js-vc-card[data-playing="1"]').forEach(function (other) {
      if (other !== card) pauseCard(other);
    });
    card.setAttribute('data-playing', '1');
    var tipo = card.getAttribute('data-tipo');
    var poster = card.querySelector('.js-vc-poster');
    var playBtn = card.querySelector('.js-vc-play');
    if (poster) poster.style.display = 'none';
    if (playBtn) playBtn.style.display = 'none';

    if (tipo === 'youtube') {
      var ytId = card.getAttribute('data-yt');
      var iframe = card.querySelector('iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + ytId +
          '?autoplay=1&mute=0&controls=1&playsinline=1&rel=0&enablejsapi=1';
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('frameborder', '0');
        card.appendChild(iframe);
      } else if (iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    } else {
      var video = card.querySelector('video');
      if (!video) {
        video = document.createElement('video');
        video.src = card.getAttribute('data-src');
        video.controls = true;
        video.playsInline = true;
        card.appendChild(video);
      }
      video.play().catch(function () {});
    }
  }

  function attachShelfEvents(root) {
    root.querySelectorAll('.js-vc-shelf').forEach(function (shelf) {
      shelf.addEventListener('click', function (e) {
        var product = e.target.closest('.js-vc-product');
        if (product) {
          var url = product.getAttribute('data-url');
          if (url) window.location.href = url;
          return;
        }
        var card = e.target.closest('.js-vc-card');
        if (!card) return;
        if (card.getAttribute('data-playing') === '1') { pauseCard(card); return; }
        playCard(card);
      });
    });
  }

  function insertCarousel(cfg, placement, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    var anchor = document.querySelector(placement.anchor);
    if (!anchor) {
      if (attemptsLeft <= 0) {
        console.warn('[video-carousel] anclaje no encontrado para "' + cfg.id + '" en pagina "' + placement.page + '": ' + placement.anchor);
        return;
      }
      setTimeout(function () { insertCarousel(cfg, placement, attemptsLeft - 1); }, 150);
      return;
    }
    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildCarouselHtml(cfg);
    var node = wrapper.firstElementChild;

    injectStyleOnce();

    switch (placement.position) {
      case 'before': anchor.parentNode.insertBefore(node, anchor); break;
      case 'after': anchor.parentNode.insertBefore(node, anchor.nextSibling); break;
      case 'prepend': anchor.insertBefore(node, anchor.firstChild); break;
      case 'append': default: anchor.appendChild(node); break;
    }

    attachShelfEvents(node);
  }

  function run() {
    if (!STORE) return;
    var page = paginaActual();
    CAROUSELS.forEach(function (cfg) {
      if (!cfg.stores || cfg.stores.indexOf(STORE) === -1) return;
      var placement = (cfg.placements || []).find(function (p) { return p.page === page; });
      if (!placement || !placement.anchor) return;
      insertCarousel(cfg, placement);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
