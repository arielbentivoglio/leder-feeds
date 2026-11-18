/**
 * video-carousel.js — generado automaticamente por SyncPropio (panel de Carrusel de Videos)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-11-18 10:33:41
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
    "id": "carrusel-home-video-chile",
    "stores": [
      "cl"
    ],
    "placements": [
      {
        "page": "home",
        "anchor": ".section-instafeed-home[data-store=\"home-instagram-feed\"]",
        "position": "after"
      }
    ],
    "link": "",
    "marginTop": 0,
    "marginBottom": 0,
    "titulo": "",
    "tituloVisible": false,
    "tituloAlign": "center",
    "tituloColor": "#1a1a1a",
    "cardRatioW": 9,
    "cardRatioH": 16,
    "cardWidthDesktop": 220,
    "cardWidthMobile": 150,
    "align": "center",
    "sidePaddingDesktop": 24,
    "sidePaddingMobile": 14,
    "fontName": 15,
    "fontPrice": 16,
    "fontCuotas": 12,
    "colorNombre": "#1a1a1a",
    "colorPrecio": "#1a1a1a",
    "colorCuotas": "#1a1a1a",
    "comprarVisible": true,
    "comprarTexto": "Comprar",
    "comprarBg": "#1a1a1a",
    "comprarColor": "#ffffff",
    "estilo": "estanteria",
    "cfAutoplay": true,
    "cfAutoavance": 0,
    "cfFlechas": true,
    "videos": [
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/ElhEOX1qoIM",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "categoria",
        "productoId": "",
        "productoNombre": "",
        "productoPrecio": "",
        "productoPrecioTachado": "",
        "productoImagen": "",
        "productoUrl": "",
        "productoCuotasTexto": "",
        "categoriaNombre": "ALFOMBRAS",
        "categoriaUrl": "https://leder.cl/alfombras-de-cuero/"
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/pnCkojlwF4Y",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "categoria",
        "productoId": "",
        "productoNombre": "",
        "productoPrecio": "",
        "productoPrecioTachado": "",
        "productoImagen": "",
        "productoUrl": "",
        "productoCuotasTexto": "",
        "categoriaNombre": "BOLSOS Y CARTERAS",
        "categoriaUrl": "https://leder.cl/bolsos-y-carteras-de-cuero/"
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/yaXe3lFFEn0",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "categoria",
        "productoId": "",
        "productoNombre": "",
        "productoPrecio": "",
        "productoPrecioTachado": "",
        "productoImagen": "",
        "productoUrl": "",
        "productoCuotasTexto": "",
        "categoriaNombre": "BOLSOS Y CARTERAS",
        "categoriaUrl": "https://leder.cl/bolsos-y-carteras-de-cuero/"
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/I0xictT_dkU",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "categoria",
        "productoId": "",
        "productoNombre": "",
        "productoPrecio": "",
        "productoPrecioTachado": "",
        "productoImagen": "",
        "productoUrl": "",
        "productoCuotasTexto": "",
        "categoriaNombre": "CUEROS",
        "categoriaUrl": "https://leder.cl/cueros/"
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/WR2E9XfhAik",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "categoria",
        "productoId": "",
        "productoNombre": "",
        "productoPrecio": "",
        "productoPrecioTachado": "",
        "productoImagen": "",
        "productoUrl": "",
        "productoCuotasTexto": "",
        "categoriaNombre": "COJINES",
        "categoriaUrl": "https://leder.cl/cojines-de-cuero/"
      }
    ]
  },
  {
    "id": "carrusel-home-videos-1",
    "stores": [
      "ar"
    ],
    "placements": [
      {
        "page": "home",
        "anchor": "section[data-store=\"home-institutional-message\"]",
        "position": "before"
      }
    ],
    "link": "",
    "marginTop": 20,
    "marginBottom": 0,
    "titulo": "Mira nuestros productos en acción",
    "tituloVisible": true,
    "tituloAlign": "center",
    "tituloColor": "#1a1a1a",
    "cardRatioW": 9,
    "cardRatioH": 16,
    "cardWidthDesktop": 250,
    "cardWidthMobile": 150,
    "align": "center",
    "sidePaddingDesktop": 24,
    "sidePaddingMobile": 14,
    "fontName": 15,
    "fontPrice": 16,
    "fontCuotas": 12,
    "colorNombre": "#1a1a1a",
    "colorPrecio": "#1a1a1a",
    "colorCuotas": "#ff0000",
    "comprarVisible": true,
    "comprarTexto": "Comprar",
    "comprarBg": "#1a1a1a",
    "comprarColor": "#ffffff",
    "estilo": "coverflow",
    "cfAutoplay": true,
    "cfAutoavance": 0,
    "cfFlechas": true,
    "videos": [
      {
        "tipo": "youtube",
        "youtube_id": "https://youtube.com/shorts/DULQ8_FbNyc?feature=share",
        "src": "",
        "poster": "",
        "link": "https://youtube.com/shorts/DULQ8_FbNyc?feature=share",
        "linkTipo": "categoria",
        "productoId": "",
        "productoNombre": "",
        "productoPrecio": "",
        "productoPrecioTachado": "",
        "productoImagen": "",
        "productoUrl": "",
        "productoCuotasTexto": "",
        "categoriaNombre": "CUEROS DE VACA",
        "categoriaUrl": "https://lederhd.com/alfombras/cueros-de-vaca/"
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/73sJI3f1STs",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "producto",
        "productoId": 353777968,
        "productoNombre": "Bolso De Cuero Vacuno Peak - Dark Brown",
        "productoPrecio": "439990.00",
        "productoPrecioTachado": "439990.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-peak-chocolate-1-planchar-d984489ea8e9e9ad3217830833620098-1024-1024.webp",
        "productoUrl": "https://lederhd.com/productos/bolso-de-viaje-peak-de-cuero-vacuno-dark-brown-1cfko/",
        "productoCuotasTexto": "12 cuotas sin interés de $41.665,83",
        "categoriaNombre": "",
        "categoriaUrl": ""
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/avUVf2PT4Yg",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "producto",
        "productoId": 310516921,
        "productoNombre": "Cuero De Oveja Pelo Largo Muflón Corderito - 80x45cm",
        "productoPrecio": "99790.00",
        "productoPrecioTachado": "99790.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/d_nq_np_2x_740623-mla107449749795_022026-f-1-d723a33d92fc6ad28317812686249719-1024-1024.jpg",
        "productoUrl": "https://lederhd.com/productos/cuero-de-oveja-muflon-corderito-colores-80x45cm/",
        "productoCuotasTexto": "3 cuotas sin interés de $29.996,67",
        "categoriaNombre": "",
        "categoriaUrl": ""
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/DN3eg31vIC0",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "producto",
        "productoId": 317404072,
        "productoNombre": "Bota De Cuero Lanar - Balu",
        "productoPrecio": "249988.00",
        "productoPrecioTachado": "249988.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/balu1-moss-2-458d15db9cb4f375a117775747108515-1024-1024.webp",
        "productoUrl": "https://lederhd.com/productos/bota-de-cuero-lanar-balu/",
        "productoCuotasTexto": "6 cuotas sin interés de $33.331,67",
        "categoriaNombre": "",
        "categoriaUrl": ""
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/DykO6u8Kz8g",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "producto",
        "productoId": 333922132,
        "productoNombre": "Tapado De Cuero Bella - Black",
        "productoPrecio": "799990.00",
        "productoPrecioTachado": "799990.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/portada-c9a909b3904003770417783798454457-1024-1024.png",
        "productoUrl": "https://lederhd.com/productos/tapado-de-cuero-bella-black/",
        "productoCuotasTexto": "12 cuotas sin interés de $74.999,17",
        "categoriaNombre": "",
        "categoriaUrl": ""
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/e-BO1fjo_ZA",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "producto",
        "productoId": 353857136,
        "productoNombre": "Mochila De Cuero Vacuno Andina - Black",
        "productoPrecio": "299990.00",
        "productoPrecioTachado": "299990.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/mochila-andina-black-frente-e2111184bf5f1f9edb17831051827744-1024-1024.webp",
        "productoUrl": "https://lederhd.com/productos/mochila-andina-de-cuero-vacuno-black/",
        "productoCuotasTexto": "6 cuotas sin interés de $54.998,33",
        "categoriaNombre": "",
        "categoriaUrl": ""
      },
      {
        "tipo": "youtube",
        "youtube_id": "https://www.youtube.com/shorts/Vi051au99jM",
        "src": "",
        "poster": "",
        "link": "",
        "linkTipo": "producto",
        "productoId": 329583210,
        "productoNombre": "Sillón Reclinable Masajeador De Cuero - Toronto",
        "productoPrecio": "3749988.00",
        "productoPrecioTachado": "3749988.00",
        "productoImagen": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/chatgpt-image-12-mar-2026-10_56_52-a-m-194aeb9cc9a2f133c217733238462892-1024-1024.png",
        "productoUrl": "https://lederhd.com/productos/sillon-reclinable-masajeador-de-cuero-toronto/",
        "productoCuotasTexto": "12 cuotas sin interés de $266.665,83",
        "categoriaNombre": "",
        "categoriaUrl": ""
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
      '.js-vc-shelf{display:flex;gap:10px;overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;padding-bottom:2px;box-sizing:border-box}' +
      '.js-vc-item{flex:0 0 auto;scroll-snap-align:start}' +
      '.js-vc-card{position:relative;border-radius:10px;overflow:hidden;background:#111;width:100%}' +
      '.js-vc-poster,.js-vc-card video,.js-vc-card iframe{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0;display:block}' +
      '.js-vc-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;cursor:pointer;background:rgba(0,0,0,0)}' +
      '.js-vc-play-circle{width:46px;height:46px;border-radius:50%;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}' +
      '.js-vc-play-circle svg{width:18px;height:18px;fill:#fff;margin-left:2px}' +
      '.js-vc-link-overlay{position:absolute;inset:0;z-index:1}' +
      '.js-vc-product{margin-top:8px;cursor:pointer;font-family:inherit}' +
      '.js-vc-product-name{color:#1a1a1a;margin:0 0 3px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}' +
      '.js-vc-product-price-row{display:flex;align-items:baseline;gap:6px}' +
      '.js-vc-product-price{font-weight:600;color:#1a1a1a}' +
      '.js-vc-product-compare{color:#999;text-decoration:line-through}' +
      '.js-vc-product-installments{color:#1a1a1a;margin-top:2px}' +
      /* ── Coverflow 3D ── */
      '.js-vc-cf{position:relative;overflow:hidden;padding:18px 0 22px;outline:none;touch-action:pan-y;-webkit-user-select:none;user-select:none}' +
      '.js-vc-cf-stage{position:relative;perspective:1200px;transform-style:preserve-3d}' +
      '.js-vc-cf-card{position:absolute;left:50%;top:0;border-radius:16px;overflow:hidden;background:#111;cursor:pointer;' +
        'transition:transform .55s cubic-bezier(.22,.61,.36,1),opacity .45s ease,filter .45s ease;will-change:transform;' +
        'box-shadow:0 12px 30px rgba(0,0,0,.18);-webkit-tap-highlight-color:transparent;backface-visibility:hidden}' +
      '.js-vc-cf:not(.is-ready) .js-vc-cf-card{transition:none}' +
      '.js-vc-cf-card:not(.is-active){filter:brightness(.8)}' +
      '.js-vc-cf-card .js-vc-poster,.js-vc-cf-preview{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0;display:block;-webkit-user-drag:none}' +
      '.js-vc-cf-preview{pointer-events:none;opacity:0;transition:opacity .45s ease}' +
      '.js-vc-cf-preview.is-on{opacity:1}' +
      '.js-vc-cf-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none;z-index:1}' +
      '.js-vc-cf-card.is-active .js-vc-cf-play{opacity:1}' +
      '.js-vc-cf-card.is-previewing .js-vc-cf-play{opacity:0}' +
      '.js-vc-cf-card.is-previewing:hover .js-vc-cf-play{opacity:1}' +
      '.js-vc-cf-chip{position:absolute;left:10px;right:10px;bottom:10px;z-index:2;display:flex;align-items:center;gap:8px;padding:6px 10px 6px 6px;' +
        'background:rgba(255,255,255,.93);border-radius:10px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,.12);font-family:inherit;box-sizing:border-box}' +
      '.js-vc-cf-chip img{width:30px;height:30px;border-radius:6px;object-fit:cover;flex-shrink:0;background:#eee}' +
      '.js-vc-cf-chip-txt{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.25}' +
      '.js-vc-cf-chip-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.js-vc-cf-chip-price{opacity:.85}' +
      '.js-vc-cf-chip-arrow{font-size:18px;line-height:1;opacity:.5;flex-shrink:0}' +
      '.js-vc-cf-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:200;width:40px;height:40px;border-radius:50%;border:0;padding:0;' +
        'background:rgba(255,255,255,.92);box-shadow:0 2px 10px rgba(0,0,0,.18);cursor:pointer;display:flex;align-items:center;justify-content:center}' +
      '.js-vc-cf-nav svg{width:18px;height:18px;fill:none;stroke:#1a1a1a;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}' +
      '.js-vc-cf-prev{left:12px}.js-vc-cf-next{right:12px}' +
      '@media (max-width:767px){.js-vc-cf-nav{width:34px;height:34px}.js-vc-cf-prev{left:6px}.js-vc-cf-next{right:6px}}' +
      /* ── Lightbox ── */
      '.js-vc-modal{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s ease}' +
      '.js-vc-modal.is-open{opacity:1}' +
      '.js-vc-modal-inner{display:flex;flex-direction:column;gap:10px;transform:scale(.94);transition:transform .25s ease}' +
      '.js-vc-modal.is-open .js-vc-modal-inner{transform:scale(1)}' +
      '.js-vc-modal-box{position:relative;width:100%;border-radius:14px;overflow:hidden;background:#000}' +
      '.js-vc-modal-box iframe,.js-vc-modal-box video{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#000}' +
      '.js-vc-modal .js-vc-cf-chip{position:static;background:#fff}' +
      '.js-vc-modal-close{position:fixed;top:14px;right:14px;width:44px;height:44px;border-radius:50%;border:0;padding:0;background:#fff;cursor:pointer;' +
        'display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,.3);z-index:1}' +
      '.js-vc-modal-close svg{width:18px;height:18px;stroke:#1a1a1a;stroke-width:2.6;stroke-linecap:round}';
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

  function productoBlockHtml(cfg, video) {
    if (!video.productoNombre) return '';
    var precio = parseFloat(video.productoPrecio) || 0;
    var tachado = parseFloat(video.productoPrecioTachado) || 0;
    var url = video.productoUrl || '';
    var fName = cfg.fontName || 13;
    var fPrice = cfg.fontPrice || 15;
    var fCuotas = cfg.fontCuotas || 12;
    var cName = cfg.colorNombre || '#1a1a1a';
    var cPrice = cfg.colorPrecio || '#1a1a1a';
    var cCuotas = cfg.colorCuotas || '#1a1a1a';
    var nameLineHeight = 1.3;
    var nameMinHeight = Math.round(fName * nameLineHeight * 2);
    var comprarHtml = '';
    if (cfg.comprarVisible && url) {
      comprarHtml = (
        '<a href="' + escHtml(url) + '" class="js-vc-buy-btn" ' +
           'style="display:inline-block;margin-top:8px;padding:8px 22px;border-radius:4px;' +
           'font-size:' + fName + 'px;line-height:1.2;background:' + (cfg.comprarBg || '#1a1a1a') + ';' +
           'color:' + (cfg.comprarColor || '#ffffff') + ';text-decoration:none;white-space:nowrap">' +
          escHtml(cfg.comprarTexto || 'Comprar') +
        '</a>'
      );
    }
    return (
      '<div class="js-vc-product" data-url="' + escHtml(url) + '">' +
        '<p class="js-vc-product-name" style="font-size:' + fName + 'px;color:' + cName + ';min-height:' + nameMinHeight + 'px;line-height:' + nameLineHeight + '">' + escHtml(video.productoNombre) + '</p>' +
        '<div class="js-vc-product-price-row">' +
          '<span class="js-vc-product-price" style="font-size:' + fPrice + 'px;color:' + cPrice + '">' + formatearPrecio(precio) + '</span>' +
          (tachado > precio ? '<span class="js-vc-product-compare" style="font-size:' + fCuotas + 'px">' + formatearPrecio(tachado) + '</span>' : '') +
        '</div>' +
        (video.productoCuotasTexto ? '<div class="js-vc-product-installments" style="font-size:' + fCuotas + 'px;color:' + cCuotas + '">' + escHtml(video.productoCuotasTexto) + '</div>' : '') +
        comprarHtml +
      '</div>'
    );
  }

  function categoriaBlockHtml(cfg, video) {
    if (!video.categoriaNombre) return '';
    var url = video.categoriaUrl || '';
    var fName = cfg.fontName || 13;
    var cName = cfg.colorNombre || '#1a1a1a';
    var comprarHtml = '';
    if (cfg.comprarVisible && url) {
      comprarHtml = (
        '<a href="' + escHtml(url) + '" class="js-vc-buy-btn" ' +
           'style="display:inline-block;margin-top:8px;padding:8px 22px;border-radius:4px;' +
           'font-size:' + fName + 'px;line-height:1.2;background:' + (cfg.comprarBg || '#1a1a1a') + ';' +
           'color:' + (cfg.comprarColor || '#ffffff') + ';text-decoration:none;white-space:nowrap">' +
          escHtml(cfg.comprarTexto || 'Ver mas') +
        '</a>'
      );
    }
    return (
      '<div class="js-vc-product" data-url="' + escHtml(url) + '">' +
        '<p class="js-vc-product-name" style="font-size:' + fName + 'px;color:' + cName + ';margin:0">' + escHtml(video.categoriaNombre) + '</p>' +
        comprarHtml +
      '</div>'
    );
  }

  function infoBlockHtml(cfg, video) {
    if (video.linkTipo === 'categoria') return categoriaBlockHtml(cfg, video);
    return productoBlockHtml(cfg, video);
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
        infoBlockHtml(cfg, video) +
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
    var justify = cfg.align === 'center' ? 'center' : (cfg.align === 'right' ? 'flex-end' : 'flex-start');
    var padDesktop = cfg.sidePaddingDesktop != null ? cfg.sidePaddingDesktop : 24;
    var padMobile = cfg.sidePaddingMobile != null ? cfg.sidePaddingMobile : 14;
    return (
      '<section class="js-video-carousel" data-store="' + cfg.id + '" ' +
              'style="margin-top:' + mt + 'px;margin-bottom:' + mb + 'px">' +
        titleHeadingHtml(cfg) +
        '<style>' +
          '#' + shelfId + ' .js-vc-item{width:' + wMobile + 'px}' +
          '#' + shelfId + ' .js-vc-card{aspect-ratio:' + ratio + '}' +
          '#' + shelfId + '{padding-left:' + padMobile + 'px;padding-right:' + padMobile + 'px}' +
          '@media (min-width:768px){' +
            '#' + shelfId + ' .js-vc-item{width:' + wDesktop + 'px}' +
            '#' + shelfId + '{padding-left:' + padDesktop + 'px;padding-right:' + padDesktop + 'px}' +
          '}' +
        '</style>' +
        '<div id="' + shelfId + '" class="js-vc-shelf" data-justify="' + justify + '">' + cards + '</div>' +
      '</section>'
    );
  }

  // La alineacion configurada (centro/derecha) solo se aplica cuando TODAS
  // las tarjetas entran sin necesidad de scroll. Si no entran, forzamos
  // izquierda: con overflow real, justify-content:center/flex-end deja la
  // primera tarjeta escondida fuera de la vista (el usuario tendria que
  // saber que puede scrollear hacia la izquierda, cosa que nadie hace) —
  // este es el bug que rompia el video de la izquierda en mobile.
  function ajustarAlineacion(shelf) {
    var justify = shelf.getAttribute('data-justify') || 'flex-start';
    var entraSinScroll = shelf.scrollWidth <= shelf.clientWidth + 1;
    shelf.style.justifyContent = entraSinScroll ? justify : 'flex-start';
    if (!entraSinScroll) shelf.scrollLeft = 0;
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

  // ═══ Estilo COVERFLOW 3D (referencia: cuchuflo.com) ════════════════════
  // Tarjetas en anillo con perspectiva, infinito para ambos lados (flechas,
  // swipe/drag, teclado). Click en una tarjeta lateral la trae al centro;
  // click en la del centro abre el video en un lightbox con sonido.
  // Opcional (cfAutoplay): la tarjeta del centro reproduce un preview
  // muteado en loop. Es UNA sola a la vez (varios iframes de YouTube juntos
  // hacen muy pesada la pagina) y solo mientras el carrusel esta en pantalla.
  var _cfStates = [];
  var _modalOpen = false;

  function videoValido(v) {
    if (v.tipo === 'youtube') return !!extraerIdYoutube(v.youtube_id);
    return !!v.src;
  }

  function cfChipHtml(cfg, video) {
    var fName = cfg.fontName || 13;
    var cName = cfg.colorNombre || '#1a1a1a';
    var cPrice = cfg.colorPrecio || '#1a1a1a';
    var nombre, url, img = '', precioHtml = '';
    if (video.linkTipo === 'categoria') {
      if (!video.categoriaNombre) return '';
      nombre = video.categoriaNombre; url = video.categoriaUrl || '';
    } else {
      if (!video.productoNombre) return '';
      nombre = video.productoNombre; url = video.productoUrl || '';
      img = video.productoImagen || '';
      var precio = parseFloat(video.productoPrecio) || 0;
      if (precio > 0) {
        precioHtml = '<span class="js-vc-cf-chip-price" style="font-size:' + Math.max(10, fName - 1) + 'px;color:' + cPrice + '">' + formatearPrecio(precio) + '</span>';
      }
    }
    var tag = url ? 'a' : 'span';
    return (
      '<' + tag + ' class="js-vc-cf-chip"' + (url ? ' href="' + escHtml(url) + '"' : '') + '>' +
        (img ? '<img src="' + escHtml(img) + '" alt="" loading="lazy">' : '') +
        '<span class="js-vc-cf-chip-txt">' +
          '<span class="js-vc-cf-chip-name" style="font-size:' + fName + 'px;color:' + cName + '">' + escHtml(nombre) + '</span>' +
          precioHtml +
        '</span>' +
        (url ? '<span class="js-vc-cf-chip-arrow" style="color:' + cName + '">&rsaquo;</span>' : '') +
      '</' + tag + '>'
    );
  }

  function cfCardHtml(cfg, video, idx) {
    var tipo = video.tipo === 'youtube' ? 'youtube' : 'archivo';
    var ytId = tipo === 'youtube' ? extraerIdYoutube(video.youtube_id) : '';
    var poster = video.poster || (tipo === 'youtube' ? youtubeThumb(video.youtube_id) : '');
    return (
      '<div class="js-vc-cf-card" data-idx="' + idx + '" data-tipo="' + tipo + '" ' +
           'data-yt="' + escHtml(ytId) + '" data-src="' + escHtml(video.src || '') + '" ' +
           'role="button" aria-label="Ver video ' + (idx + 1) + '">' +
        (poster ? '<img class="js-vc-poster" src="' + escHtml(poster) + '" alt="" loading="lazy" draggable="false">' : '') +
        '<div class="js-vc-cf-play"><div class="js-vc-play-circle"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>' +
        cfChipHtml(cfg, video) +
      '</div>'
    );
  }

  function buildCoverflowHtml(cfg, videos) {
    var mt = parseInt(cfg.marginTop, 10) || 0;
    var mb = parseInt(cfg.marginBottom, 10) || 0;
    var rootId = 'js-vc-cf-' + cfg.id;
    var rw = cfg.cardRatioW || 9, rh = cfg.cardRatioH || 16;
    var wDesktop = cfg.cardWidthDesktop || 260;
    var wMobile = cfg.cardWidthMobile || 210;
    var cards = videos.map(function (v, i) { return cfCardHtml(cfg, v, i); }).join('');
    var flechas = cfg.cfFlechas !== false && videos.length > 1;
    var arrow = function (dir) {
      return '<button type="button" class="js-vc-cf-nav js-vc-cf-' + dir + '" aria-label="' + (dir === 'prev' ? 'Anterior' : 'Siguiente') + '">' +
        '<svg viewBox="0 0 24 24"><path d="' + (dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '"/></svg></button>';
    };
    return (
      '<section class="js-video-carousel js-video-carousel--coverflow" data-store="' + cfg.id + '" ' +
              'style="margin-top:' + mt + 'px;margin-bottom:' + mb + 'px">' +
        titleHeadingHtml(cfg) +
        '<style>' +
          '#' + rootId + '{--cfw:' + wMobile + 'px}' +
          '#' + rootId + ' .js-vc-cf-card{width:var(--cfw);aspect-ratio:' + rw + '/' + rh + '}' +
          '#' + rootId + ' .js-vc-cf-stage{height:calc(var(--cfw) * ' + rh + ' / ' + rw + ')}' +
          '@media (min-width:768px){#' + rootId + '{--cfw:' + wDesktop + 'px}}' +
        '</style>' +
        '<div id="' + rootId + '" class="js-vc-cf" tabindex="0" aria-roledescription="carrusel">' +
          '<div class="js-vc-cf-stage">' + cards + '</div>' +
          (flechas ? arrow('prev') + arrow('next') : '') +
        '</div>' +
      '</section>'
    );
  }

  function cfLayout(state, step) {
    var n = state.cards.length;
    if (!n) return;
    var w = state.cards[0].offsetWidth || 200;
    var gap = w * 0.6;
    state.cards.forEach(function (card, i) {
      var d = ((i - state.active) % n + n) % n;
      if (d > n / 2) d -= n;
      var ad = Math.abs(d);
      // Si la tarjeta "dio la vuelta" (paso de un extremo al otro por el
      // loop infinito) no se anima el cruce por delante: aparece del otro lado.
      var prev = card._cfD;
      var wrapped = prev !== undefined && step !== undefined && d !== prev - step;
      var tx = d * gap;
      var tz = -ad * w * 0.42;
      var ry = d === 0 ? 0 : (d > 0 ? -26 : 26);
      var sc = d === 0 ? 1 : Math.max(0.72, 1 - ad * 0.09);
      if (wrapped) { card.style.transition = 'none'; card.style.opacity = '0'; }
      card.style.transform = 'translateX(-50%) translateX(' + tx.toFixed(1) + 'px) translateZ(' + tz.toFixed(1) + 'px) rotateY(' + ry + 'deg) scale(' + sc + ')';
      card.style.zIndex = String(100 - ad);
      if (wrapped) { void card.offsetWidth; card.style.transition = ''; }
      card.style.opacity = ad > 2 ? '0' : '1';
      card.style.pointerEvents = ad > 2 ? 'none' : '';
      card.setAttribute('aria-hidden', ad > 2 ? 'true' : 'false');
      card.classList.toggle('is-active', d === 0);
      card._cfD = d;
    });
  }

  function cfStopPreview(state) {
    clearTimeout(state.previewTimer);
    if (state.previewEl && state.previewEl.parentNode) state.previewEl.parentNode.removeChild(state.previewEl);
    state.previewEl = null;
    state.cards.forEach(function (c) { c.classList.remove('is-previewing'); });
  }

  function cfStartPreview(state) {
    var card = state.cards[state.active];
    if (!card) return;
    var tipo = card.getAttribute('data-tipo');
    var el;
    if (tipo === 'youtube') {
      var id = card.getAttribute('data-yt');
      el = document.createElement('iframe');
      el.src = 'https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&mute=1&loop=1&playlist=' + id + '&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3';
      el.setAttribute('allow', 'autoplay; encrypted-media');
      el.setAttribute('frameborder', '0');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('title', 'Preview');
      // pequena demora: oculta el "cargando" y el titulo inicial de YouTube
      el.addEventListener('load', function () { setTimeout(function () { el.classList.add('is-on'); }, 700); });
    } else {
      el = document.createElement('video');
      el.src = card.getAttribute('data-src');
      el.muted = true; el.loop = true; el.autoplay = true; el.playsInline = true;
      el.setAttribute('muted', ''); el.setAttribute('playsinline', '');
      el.addEventListener('playing', function () { el.classList.add('is-on'); });
    }
    el.className += ' js-vc-cf-preview';
    card.insertBefore(el, card.querySelector('.js-vc-cf-play'));
    if (tipo !== 'youtube' && el.play) { el.play().catch(function () {}); }
    card.classList.add('is-previewing');
    state.previewEl = el;
  }

  function cfSchedulePreview(state) {
    cfStopPreview(state);
    if (!state.cfg.cfAutoplay || !state.visible || _modalOpen || document.hidden) return;
    state.previewTimer = setTimeout(function () { cfStartPreview(state); }, 450);
  }

  function cfResetAuto(state) {
    clearInterval(state.autoTimer);
    var s = parseInt(state.cfg.cfAutoavance, 10) || 0;
    if (s <= 0 || state.cards.length < 2) return;
    state.autoTimer = setInterval(function () {
      if (state.visible && !state.hover && !_modalOpen && !document.hidden) cfGo(state, state.active + 1, true);
    }, s * 1000);
  }

  function cfGo(state, idx, fromAuto) {
    var n = state.cards.length;
    if (n < 2) return;
    var target = (idx % n + n) % n;
    var step = target - state.active;
    if (step > n / 2) step -= n;
    if (step < -n / 2) step += n;
    if (step === 0) return;
    state.active = target;
    cfLayout(state, step);
    cfSchedulePreview(state);
    if (!fromAuto) cfResetAuto(state);
  }

  // ─── Lightbox (compartido por todos los coverflow de la pagina) ─────────
  var _modalEl = null, _modalKeyHandler = null, _bodyOverflow = '', _lastFocus = null;

  function closeModal() {
    if (!_modalEl) return;
    var m = _modalEl;
    _modalEl = null;
    m.classList.remove('is-open');
    var box = m.querySelector('.js-vc-modal-box');
    if (box) box.innerHTML = ''; // corta el audio al instante
    setTimeout(function () { if (m.parentNode) m.parentNode.removeChild(m); }, 260);
    document.body.style.overflow = _bodyOverflow;
    document.removeEventListener('keydown', _modalKeyHandler);
    _modalOpen = false;
    _cfStates.forEach(function (s) { cfSchedulePreview(s); cfResetAuto(s); });
    if (_lastFocus && _lastFocus.focus) { try { _lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }

  function openModal(state, card) {
    if (_modalEl) closeModal();
    _modalOpen = true;
    _lastFocus = document.activeElement;
    // pausa cualquier video de las estanterias que estuviera sonando
    document.querySelectorAll('.js-vc-card[data-playing="1"]').forEach(function (c) { pauseCard(c); });
    _cfStates.forEach(cfStopPreview);

    var cfg = state.cfg;
    var video = state.videos[parseInt(card.getAttribute('data-idx'), 10)] || {};
    var rw = cfg.cardRatioW || 9, rh = cfg.cardRatioH || 16;
    var chip = cfChipHtml(cfg, video);
    var maxH = chip ? '78vh' : '86vh';
    var width = 'calc(min(' + maxH + ', calc(92vw * ' + rh + ' / ' + rw + ')) * ' + rw + ' / ' + rh + ')';

    var m = document.createElement('div');
    m.className = 'js-vc-modal';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.setAttribute('aria-label', 'Video');
    m.innerHTML =
      '<button type="button" class="js-vc-modal-close" aria-label="Cerrar video"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<div class="js-vc-modal-inner" style="width:' + width + '">' +
        '<div class="js-vc-modal-box" style="aspect-ratio:' + rw + '/' + rh + '"></div>' +
        chip +
      '</div>';

    var box = m.querySelector('.js-vc-modal-box');
    if (card.getAttribute('data-tipo') === 'youtube') {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + card.getAttribute('data-yt') +
        '?autoplay=1&mute=0&controls=1&playsinline=1&rel=0&modestbranding=1';
      f.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
      f.setAttribute('frameborder', '0');
      f.setAttribute('title', 'Video');
      box.appendChild(f);
    } else {
      var v = document.createElement('video');
      v.src = card.getAttribute('data-src');
      v.controls = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute('playsinline', '');
      box.appendChild(v);
      v.play && v.play().catch(function () {});
    }

    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.closest('.js-vc-modal-close')) closeModal();
    });
    _modalKeyHandler = function (e) { if (e.key === 'Escape' || e.key === 'Esc') closeModal(); };
    document.addEventListener('keydown', _modalKeyHandler);

    _bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(m);
    _modalEl = m;
    requestAnimationFrame(function () { m.classList.add('is-open'); });
    var closeBtn = m.querySelector('.js-vc-modal-close');
    if (closeBtn) { try { closeBtn.focus({ preventScroll: true }); } catch (e) {} }
  }

  function initCoverflow(node, cfg, videos) {
    var root = node.querySelector('.js-vc-cf');
    if (!root) return;
    var state = {
      cfg: cfg, videos: videos, root: root,
      cards: Array.prototype.slice.call(root.querySelectorAll('.js-vc-cf-card')),
      active: 0, visible: true, hover: false, moved: false,
      previewEl: null, previewTimer: null, autoTimer: null
    };
    _cfStates.push(state);
    cfLayout(state);
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('is-ready'); }); });

    // drag / swipe (mouse y touch via Pointer Events)
    var startX = null, startY = null;
    root.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest('.js-vc-cf-nav')) return;
      startX = e.clientX; startY = e.clientY; state.moved = false;
    });
    var endDrag = function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        state.moved = true;
        var w = state.cards[0] ? state.cards[0].offsetWidth : 200;
        var steps = Math.min(3, Math.max(1, Math.round(Math.abs(dx) / (w * 0.6))));
        cfGo(state, state.active + (dx < 0 ? steps : -steps));
      }
    };
    root.addEventListener('pointerup', endDrag);
    root.addEventListener('pointercancel', function () { startX = null; });
    root.addEventListener('dragstart', function (e) { e.preventDefault(); });

    root.addEventListener('click', function (e) {
      if (state.moved) { state.moved = false; e.preventDefault(); e.stopPropagation(); return; }
      var nav = e.target.closest('.js-vc-cf-nav');
      if (nav) { cfGo(state, state.active + (nav.classList.contains('js-vc-cf-prev') ? -1 : 1)); return; }
      var card = e.target.closest('.js-vc-cf-card');
      if (!card) return;
      var idx = parseInt(card.getAttribute('data-idx'), 10);
      var chip = e.target.closest('.js-vc-cf-chip');
      if (idx !== state.active) { e.preventDefault(); cfGo(state, idx); return; }
      if (chip) return; // chip de la tarjeta central: navega al producto/categoria
      openModal(state, card);
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); cfGo(state, state.active - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); cfGo(state, state.active + 1); }
      else if ((e.key === 'Enter' || e.key === ' ') && e.target === root) { e.preventDefault(); openModal(state, state.cards[state.active]); }
    });

    root.addEventListener('mouseenter', function () { state.hover = true; });
    root.addEventListener('mouseleave', function () { state.hover = false; });

    var _rz = null;
    window.addEventListener('resize', function () {
      clearTimeout(_rz);
      _rz = setTimeout(function () { cfLayout(state); }, 120);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cfStopPreview(state); else cfSchedulePreview(state);
    });

    if ('IntersectionObserver' in window) {
      state.visible = false;
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var vis = en.isIntersecting;
          if (vis === state.visible) return;
          state.visible = vis;
          if (vis) cfSchedulePreview(state); else cfStopPreview(state);
        });
      }, { threshold: 0.25 }).observe(root);
    } else {
      cfSchedulePreview(state);
    }
    cfResetAuto(state);
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
    var esCoverflow = cfg.estilo === 'coverflow';
    var cfVideos = esCoverflow ? (cfg.videos || []).filter(videoValido) : null;
    if (esCoverflow && !cfVideos.length) return;
    var wrapper = document.createElement('div');
    wrapper.innerHTML = esCoverflow ? buildCoverflowHtml(cfg, cfVideos) : buildCarouselHtml(cfg);
    var node = wrapper.firstElementChild;

    injectStyleOnce();

    switch (placement.position) {
      case 'before': anchor.parentNode.insertBefore(node, anchor); break;
      case 'after': anchor.parentNode.insertBefore(node, anchor.nextSibling); break;
      case 'prepend': anchor.insertBefore(node, anchor.firstChild); break;
      case 'append': default: anchor.appendChild(node); break;
    }

    if (esCoverflow) {
      initCoverflow(node, cfg, cfVideos);
      return;
    }

    attachShelfEvents(node);

    var shelfEl = node.querySelector('.js-vc-shelf');
    if (shelfEl) {
      ajustarAlineacion(shelfEl);
      var _resizeTimer = null;
      window.addEventListener('resize', function () {
        clearTimeout(_resizeTimer);
        _resizeTimer = setTimeout(function () { ajustarAlineacion(shelfEl); }, 150);
      });
    }
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
