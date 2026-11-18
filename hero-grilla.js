/**
 * hero-grilla.js — generado automaticamente por SyncPropio (Modulos Custom > Hero Grilla)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-11-18 13:43:25
 */
(function () {
  'use strict';

  var PREVIEW = false;
  var HEROES = [];

  var STORE = (function () {
    if (PREVIEW) return 'preview';
    var h = window.location.hostname || '';
    if (h.indexOf('leder.cl') !== -1) return 'cl';
    if (h.indexOf('lederhd.com') !== -1) return 'ar';
    return null;
  })();

  var RATIOS = { '1:1': [1, 1], '4:5': [4, 5], '3:4': [3, 4] };

  function esc(s) {
    return (s == null ? '' : String(s)).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Bloquea esquemas peligrosos (javascript:, data:, vbscript:); deja pasar
  // links absolutos, relativos ("/sillones/"), anclas y querys.
  function safeUrl(u) {
    u = (u == null ? '' : String(u)).trim();
    if (!u) return '';
    if (/^(javascript|data|vbscript):/i.test(u.replace(/[\s\u0000-\u001f]+/g, ''))) return '';
    return u;
  }

  function color(c, def) {
    return /^#[0-9a-fA-F]{6}$/.test(c || '') ? c : def;
  }

  function rgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255);
  }

  function num(v, def, min, max) {
    var n = parseInt(v, 10);
    if (isNaN(n)) n = def;
    return Math.max(min, Math.min(max, n));
  }

  function ytId(input) {
    if (!input) return '';
    input = String(input).trim();
    var m = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    return '';
  }

  // URL segura para usar dentro de url('...') en un atributo style.
  function cssUrl(u) {
    u = safeUrl(u);
    return u.replace(/["'()\\\s]/g, function (c) { return encodeURIComponent(c); });
  }

  var POS_FONDO = { arriba: 'center top', centro: 'center center', abajo: 'center bottom' };

  function currentTemplate() {
    return (window.LS && window.LS.template) ? window.LS.template : null;
  }

  function prefersReducedMotion() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (e) { return false; }
  }

  // ─── CSS (una sola vez por pagina, todo scopeado a .ldr-hg) ──────────────
  // Los colores / columnas / proporcion de cada hero van como variables CSS
  // inline en su <section>, asi varios heros conviven con un solo <style>.
  function injectStyle() {
    if (document.getElementById('ldr-hg-style')) return;
    var css =
      '.ldr-hg{position:relative;isolation:isolate;overflow:hidden;width:100%;background:var(--hg-bg)!important;color:var(--hg-tx);font-family:inherit}' +
      '.ldr-hg *{box-sizing:border-box!important}' +
      '.ldr-hg.ldr-hg--full{width:100vw!important;max-width:100vw!important;left:50%;right:50%;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.ldr-hg__glow{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:var(--g,0);transition:opacity .9s ease;' +
        'background:radial-gradient(60% 75% at var(--hg-gx,74%) var(--hg-gy,52%),rgba(var(--hg-glow),.38) 0%,rgba(var(--hg-glow),.14) 40%,rgba(0,0,0,0) 75%)}' +
      '.ldr-hg--noglow .ldr-hg__glow{display:none}' +
      '.ldr-hg__bg{position:absolute;inset:0;z-index:-2;pointer-events:none;background-image:var(--hg-bgi-d);background-size:cover;background-position:var(--hg-bgp,center center);background-repeat:no-repeat}' +
      '.ldr-hg__bg:after{content:"";position:absolute;inset:0;background:var(--hg-bg);opacity:var(--hg-bgo,.4)}' +
      '.ldr-hg__in{display:grid!important;grid-template-columns:1fr 1.15fr;gap:4vw;align-items:center;max-width:1440px;margin:0 auto!important;padding:4.8vw 6vw!important}' +
      '.ldr-hg--txt-der .ldr-hg__in{grid-template-columns:1.15fr 1fr}' +
      '.ldr-hg--txt-der .ldr-hg__tx{order:2}' +
      '.ldr-hg--txt-arriba .ldr-hg__in,.ldr-hg--sintexto .ldr-hg__in{grid-template-columns:1fr;gap:2.6vw}' +
      '.ldr-hg--txt-arriba .ldr-hg__tx{text-align:center}' +
      '.ldr-hg--txt-arriba .ldr-hg__s{margin-left:auto!important;margin-right:auto!important}' +
      '.ldr-hg--txt-arriba .ldr-hg__vis,.ldr-hg--sintexto .ldr-hg__vis{width:100%;max-width:1100px;margin:0 auto!important}' +
      '.ldr-hg__t{margin:0!important;padding:0!important;font-family:inherit!important;font-size:clamp(34px,5.8vw,var(--hg-tmax,96px))!important;font-weight:700!important;letter-spacing:-.045em!important;line-height:.95!important;color:var(--hg-tx)!important;text-transform:none!important}' +
      '.ldr-hg__w{position:relative;display:inline-block;color:rgba(var(--hg-tx-rgb),.28);transition:color .8s ease}' +
      '.ldr-hg__w:after{content:attr(data-t);position:absolute;left:0;top:0;right:0;' +
        'background:linear-gradient(95deg,var(--hg-g1) 0%,var(--hg-g2) 50%,var(--hg-g3) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;' +
        'opacity:var(--g,0);transition:opacity .9s ease;filter:drop-shadow(0 0 calc(var(--g,0) * 22px) rgba(var(--hg-glow),.45))}' +
      '.ldr-hg__logo-w{display:block;width:100%;max-width:var(--hg-logo-w,480px);margin:0!important;padding:0!important;line-height:0}' +
      '.ldr-hg--txt-arriba .ldr-hg__logo-w{margin:0 auto!important}' +
      '.ldr-hg__logo{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;margin:0!important;border:0!important;opacity:1!important;' +
        'filter:brightness(calc(.35 + var(--g,0) * .65));transition:filter .9s ease}' +
      '.ldr-hg__logo-w + .ldr-hg__t{margin-top:1.4vw!important}' +
      '.ldr-hg__s{margin:1.8vw 0 0!important;padding:0!important;max-width:32ch;font-family:inherit!important;font-size:clamp(15px,1.5vw,23px)!important;line-height:1.35!important;opacity:.88;color:var(--hg-tx)!important}' +
      '.ldr-hg__btn{display:inline-flex!important;align-items:center;gap:14px;margin-top:2.8vw!important;padding:12px 30px 12px 12px!important;border:0!important;border-radius:999px!important;' +
        'background:var(--hg-btn-bg)!important;color:var(--hg-btn-tx)!important;font-family:inherit!important;font-weight:700!important;font-size:clamp(15px,1.35vw,21px)!important;line-height:1.2!important;text-decoration:none!important;' +
        'transition:transform .15s ease,box-shadow .6s ease}' +
      '.ldr-hg__btn.ldr-hg__btn--nosw{padding:14px 30px!important}' +
      '.ldr-hg__btn:hover{transform:translateY(-2px)}' +
      '.ldr-hg.is-lit .ldr-hg__btn{animation:ldrHgPulse 2.6s ease-out 1}' +
      '.ldr-hg__sw{position:relative;width:52px;height:30px;border-radius:99px;background:var(--hg-btn-tx);flex:none}' +
      '.ldr-hg__sw i{position:absolute;top:4px;left:4px;width:22px;height:22px;border-radius:50%;background:rgba(var(--hg-btn-bg-rgb),.4);' +
        'transition:transform .45s cubic-bezier(.3,1.6,.5,1),background .45s ease,box-shadow .45s ease}' +
      '.ldr-hg.is-lit .ldr-hg__sw i,.ldr-hg__btn:hover .ldr-hg__sw i{transform:translateX(22px);background:var(--hg-btn-bg);box-shadow:0 0 12px var(--hg-btn-bg)}' +
      '.ldr-hg__vis{display:grid!important;grid-template-columns:repeat(var(--hg-cols,3),minmax(0,1fr));gap:clamp(8px,1vw,16px)}' +
      '.ldr-hg__m{position:relative;display:block;overflow:hidden;aspect-ratio:var(--hg-ar,1/1);border-radius:var(--hg-rad,16px);text-decoration:none!important;color:inherit;' +
        'box-shadow:0 0 0 rgba(var(--hg-glow),0);transition:box-shadow .7s ease,transform .3s ease,opacity .6s ease}' +
      '.ldr-hg__media{position:absolute!important;top:0;left:0;width:100%!important;height:100%!important;max-width:none!important;margin:0!important;border:0!important;object-fit:cover;display:block;opacity:1!important;' +
        'transition:filter .7s ease,transform .5s ease}' +
      '.ldr-hg__vid{background-color:#000;background-size:cover;background-position:center;overflow:hidden}' +
      '.ldr-hg__vid iframe{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0;pointer-events:none}' +
      '.ldr-hg__lb{position:absolute;top:10px;left:10px;z-index:2;padding:5px 10px!important;border-radius:99px;background:var(--hg-chip-bg);color:var(--hg-chip-tx)!important;' +
        'font-family:inherit;font-weight:700;font-size:clamp(10px,.9vw,13px);line-height:1;transition:opacity .5s ease}' +
      '.ldr-hg__m--cta{display:flex!important;flex-direction:column;justify-content:flex-end;padding:clamp(12px,1.4vw,22px)!important;background:var(--cta-bg)!important;color:var(--cta-tx)!important}' +
      '.ldr-hg__cta-t{font-family:inherit;font-weight:700;font-size:clamp(16px,1.7vw,28px);line-height:1.05;letter-spacing:-.03em}' +
      '.ldr-hg__cta-s{font-family:inherit;font-size:clamp(11px,.95vw,15px);line-height:1.3;opacity:.85;margin-top:6px!important}' +
      '.ldr-hg__cta-ar{position:absolute;top:clamp(12px,1.4vw,22px);right:clamp(12px,1.4vw,22px);font-size:clamp(18px,1.6vw,26px);line-height:1;transition:transform .3s ease}' +
      '.ldr-hg__m--cta:hover .ldr-hg__cta-ar{transform:translateX(4px)}' +
      // Animacion "prender de a uno" (oscuro y desaturado -> color)
      '.ldr-hg--anim-prender .ldr-hg__m .ldr-hg__media{filter:brightness(.2) saturate(.15)}' +
      '.ldr-hg--anim-prender .ldr-hg__m.is-on .ldr-hg__media,.ldr-hg--anim-prender .ldr-hg__m:hover .ldr-hg__media{filter:none}' +
      '.ldr-hg--anim-prender .ldr-hg__m .ldr-hg__lb{opacity:.55}' +
      '.ldr-hg--anim-prender .ldr-hg__m.is-on .ldr-hg__lb,.ldr-hg--anim-prender .ldr-hg__m:hover .ldr-hg__lb{opacity:1}' +
      '.ldr-hg--anim-prender .ldr-hg__m--cta{opacity:.35}' +
      '.ldr-hg--anim-prender .ldr-hg__m--cta.is-on,.ldr-hg--anim-prender .ldr-hg__m--cta:hover{opacity:1}' +
      // Animacion "fade" (aparecen de a uno, sin oscurecer)
      '.ldr-hg--anim-fade .ldr-hg__m{opacity:0;transform:translateY(14px)}' +
      '.ldr-hg--anim-fade .ldr-hg__m.is-on{opacity:1;transform:none}' +
      // Resplandor + respiracion
      '.ldr-hg__m.is-on{box-shadow:0 0 46px rgba(var(--hg-glow),.32)}' +
      '.ldr-hg--noglow .ldr-hg__m.is-on{box-shadow:none}' +
      '.ldr-hg--breath:not(.ldr-hg--noglow) .ldr-hg__m.is-on{animation:ldrHgBreath 4.5s ease-in-out var(--d,0s) infinite}' +
      // Hover (va al final para ganarle a la regla de fade)
      '.ldr-hg--hover .ldr-hg__m:hover{transform:translateY(-5px)}' +
      '.ldr-hg--hover .ldr-hg__m:hover .ldr-hg__media{transform:scale(1.05)}' +
      '@keyframes ldrHgBreath{0%,100%{box-shadow:0 0 40px rgba(var(--hg-glow),.26)}50%{box-shadow:0 0 62px rgba(var(--hg-glow),.42)}}' +
      '@keyframes ldrHgPulse{0%{box-shadow:0 0 0 0 rgba(var(--hg-btn-bg-rgb),.55)}100%{box-shadow:0 0 0 22px rgba(var(--hg-btn-bg-rgb),0)}}' +
      '@media (max-width:767px){' +
        '.ldr-hg__in{grid-template-columns:1fr!important;gap:20px;padding:30px 20px 32px!important}' +
        '.ldr-hg__tx{display:contents}' +
        '.ldr-hg__logo-w{order:0;max-width:var(--hg-logo-wm,80%);margin:0 auto!important}' +
        '.ldr-hg__logo-w + .ldr-hg__t{margin-top:0!important}' +
        '.ldr-hg__t{order:0;font-size:clamp(34px,11vw,var(--hg-tmax,96px))!important}' +
        '.ldr-hg--txt-arriba .ldr-hg__t{text-align:center}' +
        '.ldr-hg__s{order:1;font-size:15px!important;margin-top:-8px!important}' +
        '.ldr-hg--txt-arriba .ldr-hg__s{text-align:center}' +
        '.ldr-hg__vis{order:2;gap:6px;grid-template-columns:repeat(var(--hg-cols-m,3),minmax(0,1fr))}' +
        '.ldr-hg__btn{order:3;width:100%;justify-content:center;margin-top:0!important;padding:10px 24px 10px 10px!important}' +
        '.ldr-hg__btn.ldr-hg__btn--nosw{padding:13px 24px!important}' +
        '.ldr-hg__lb{top:6px;left:6px;font-size:10px;padding:4px 7px!important}' +
        '.ldr-hg__bg{background-image:var(--hg-bgi-m,var(--hg-bgi-d))}' +
        '.ldr-hg__glow{background:radial-gradient(90% 45% at 50% 58%,rgba(var(--hg-glow),.38) 0%,rgba(var(--hg-glow),.14) 45%,rgba(0,0,0,0) 80%)}' +
      '}' +
      '@media (prefers-reduced-motion:reduce){.ldr-hg,.ldr-hg *,.ldr-hg *:after{animation:none!important;transition:none!important}}';
    var st = document.createElement('style');
    st.id = 'ldr-hg-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  // ─── HTML ────────────────────────────────────────────────────────────────
  function tileHtml(cfg, t, i) {
    var link = safeUrl(t.link);
    var tag = link ? 'a' : 'div';
    var attrs = '';
    if (link) {
      attrs = ' href="' + esc(link) + '"' + (t.nueva_pestana ? ' target="_blank" rel="noopener"' : '');
    }
    var cls = 'ldr-hg__m ldr-hg__m--' + esc(t.tipo || 'imagen');
    var style = '--d:' + (i * 0.7).toFixed(1) + 's';
    var label = t.etiqueta ? '<span class="ldr-hg__lb">' + esc(t.etiqueta) + '</span>' : '';
    var aria = t.etiqueta || t.cta_texto || t.alt || '';
    var inner;

    if (t.tipo === 'cta') {
      if (!t.cta_texto) return '';
      style += ';--cta-bg:' + color(t.cta_bg, '#F2BF1D') + ';--cta-tx:' + color(t.cta_tx, '#1B1815');
      inner =
        (link ? '<span class="ldr-hg__cta-ar" aria-hidden="true">&rarr;</span>' : '') +
        '<span class="ldr-hg__cta-t">' + esc(t.cta_texto) + '</span>' +
        (t.cta_sub ? '<span class="ldr-hg__cta-s">' + esc(t.cta_sub) + '</span>' : '');
      label = '';
    } else if (t.tipo === 'video') {
      var id = ytId(t.video_id);
      if (!id) return '';
      inner = '<div class="ldr-hg__media ldr-hg__vid" data-yt="' + id + '" data-fmt="' + (t.video_formato === 'vertical' ? 'v' : 'h') + '"' +
              ' style="background-image:url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)"></div>';
    } else {
      if (!t.img) return '';
      inner = '<img class="ldr-hg__media" src="' + esc(t.img) + '" alt="' + esc(t.alt || t.etiqueta || '') + '" loading="lazy" decoding="async"' +
              (t.width && t.height ? ' width="' + parseInt(t.width, 10) + '" height="' + parseInt(t.height, 10) + '"' : '') + '>';
    }
    return '<' + tag + ' class="' + cls + '"' + attrs + (link && aria ? ' aria-label="' + esc(aria) + '"' : '') +
           ' style="' + style + '">' + inner + label + '</' + tag + '>';
  }

  function heroHtml(cfg) {
    var bg = color(cfg.color_fondo, '#1B1815');
    var tx = color(cfg.color_texto, '#F4F0E9');
    var glow = color(cfg.color_resplandor, '#EE6A1F');
    var btnBg = color(cfg.boton_bg, '#F2BF1D');
    var btnTx = color(cfg.boton_tx, '#221E1A');
    var ar = RATIOS[cfg.proporcion] || RATIOS['1:1'];
    var lado = cfg.texto_posicion === 'der' ? 'der' : (cfg.texto_posicion === 'arriba' ? 'arriba' : 'izq');
    var gx = lado === 'der' ? '26%' : (lado === 'arriba' ? '50%' : '74%');
    var gy = lado === 'arriba' ? '70%' : '52%';
    var anim = (cfg.animacion === 'fade' || cfg.animacion === 'ninguna') ? cfg.animacion : 'prender';

    var vars = [
      '--hg-bg:' + bg, '--hg-tx:' + tx, '--hg-tx-rgb:' + rgb(tx), '--hg-glow:' + rgb(glow),
      '--hg-gx:' + gx, '--hg-gy:' + gy,
      '--hg-g1:' + color(cfg.grad_1, '#F2BF1D'), '--hg-g2:' + color(cfg.grad_2, '#EE6A1F'), '--hg-g3:' + color(cfg.grad_3, '#E0452A'),
      '--hg-btn-bg:' + btnBg, '--hg-btn-bg-rgb:' + rgb(btnBg), '--hg-btn-tx:' + btnTx,
      '--hg-chip-bg:' + color(cfg.etiqueta_bg, '#FBF9F5'), '--hg-chip-tx:' + color(cfg.etiqueta_tx, '#221E1A'),
      '--hg-cols:' + num(cfg.columnas, 3, 2, 4), '--hg-cols-m:' + num(cfg.columnas_mobile, 3, 2, 3),
      '--hg-ar:' + ar[0] + '/' + ar[1], '--hg-rad:' + num(cfg.radio, 16, 0, 40) + 'px',
      '--hg-tmax:' + num(cfg.titulo_tamano, 96, 32, 140) + 'px',
      '--g:' + (anim === 'ninguna' ? '1' : '0'),
      'margin-top:' + num(cfg.margin_top, 0, 0, 200) + 'px', 'margin-bottom:' + num(cfg.margin_bottom, 0, 0, 200) + 'px'
    ];

    // Imagen de fondo opcional: una para desktop y otra para mobile (si no
    // hay de mobile, se usa la de desktop, y al reves).
    var fd = cssUrl((cfg.fondo_desktop && cfg.fondo_desktop.src) || '');
    var fm = cssUrl((cfg.fondo_mobile && cfg.fondo_mobile.src) || '');
    var hayFondo = !!(fd || fm);
    if (hayFondo) {
      vars.push('--hg-bgi-d:url(\'' + (fd || fm) + '\')', '--hg-bgi-m:url(\'' + (fm || fd) + '\')',
                '--hg-bgo:' + (num(cfg.fondo_oscurecer, 40, 0, 90) / 100).toFixed(2),
                '--hg-bgp:' + (POS_FONDO[cfg.fondo_posicion] || POS_FONDO.centro));
    }

    var dest = cfg.titulo_destacado || '';
    var resto = cfg.titulo_resto || '';
    var t = '';
    if (dest) t += '<span class="ldr-hg__w" data-t="' + esc(dest) + '">' + esc(dest) + '</span>';
    if (dest && resto) t += '<br>';
    if (resto) t += esc(resto).replace(/\r?\n/g, '<br>');
    // Logo / imagen en el bloque de texto (opcional): <picture> con version
    // mobile. Modo "reemplaza": va en lugar del titulo (el texto del titulo
    // queda como alt de la imagen); modo "arriba": logo y abajo el titulo.
    var ld = safeUrl((cfg.logo_desktop && cfg.logo_desktop.src) || '');
    var lm = safeUrl((cfg.logo_mobile && cfg.logo_mobile.src) || '');
    var logoHtml = '';
    var tituloPlano = (dest + ' ' + resto).replace(/\s+/g, ' ').trim();
    if (ld || lm) {
      vars.push('--hg-logo-w:' + num(cfg.logo_ancho, 480, 120, 900) + 'px', '--hg-logo-wm:' + num(cfg.logo_ancho_mobile, 80, 30, 100) + '%');
      logoHtml = '<picture class="ldr-hg__logo-w">' +
        (ld && lm ? '<source media="(max-width:767px)" srcset="' + esc(lm) + '">' : '') +
        '<img class="ldr-hg__logo" src="' + esc(ld || lm) + '" alt="' + esc(cfg.logo_alt || tituloPlano || '') + '" decoding="async"' +
        (cfg.logo_desktop && cfg.logo_desktop.width && cfg.logo_desktop.height && ld
          ? ' width="' + parseInt(cfg.logo_desktop.width, 10) + '" height="' + parseInt(cfg.logo_desktop.height, 10) + '"' : '') +
        '></picture>';
    }
    var tituloHtml = t && !(logoHtml && cfg.logo_modo !== 'arriba') ? '<h2 class="ldr-hg__t">' + t + '</h2>' : '';
    var subHtml = cfg.subtitulo ? '<p class="ldr-hg__s">' + esc(cfg.subtitulo).replace(/\r?\n/g, '<br>') + '</p>' : '';
    var btnHtml = '';
    if (cfg.boton_texto) {
      var bLink = safeUrl(cfg.boton_link);
      var sw = cfg.boton_interruptor !== false;
      var bTag = bLink ? 'a' : 'span';
      btnHtml = '<' + bTag + ' class="ldr-hg__btn' + (sw ? '' : ' ldr-hg__btn--nosw') + '"' + (bLink ? ' href="' + esc(bLink) + '"' : '') + '>' +
                (sw ? '<span class="ldr-hg__sw" aria-hidden="true"><i></i></span>' : '') + esc(cfg.boton_texto) + '</' + bTag + '>';
    }
    var hayTexto = !!(logoHtml || tituloHtml || subHtml || btnHtml);

    var tiles = (cfg.tiles || []).map(function (tile, i) { return tileHtml(cfg, tile, i); }).join('');

    var cls = 'ldr-hg ldr-hg--anim-' + anim + ' ldr-hg--txt-' + lado +
      (hayTexto ? '' : ' ldr-hg--sintexto') +
      (cfg.ancho_completo ? ' ldr-hg--full' : '') +
      (cfg.resplandor === false ? ' ldr-hg--noglow' : '') +
      (cfg.respiracion === false ? '' : ' ldr-hg--breath') +
      (cfg.hover === false ? '' : ' ldr-hg--hover');

    return (
      '<section class="' + cls + '" id="ldr-hg-' + esc(cfg.id) + '" data-hero="' + esc(cfg.id) + '" style="' + esc(vars.join(';')) + '">' +
        (hayFondo ? '<div class="ldr-hg__bg"></div>' : '') +
        '<div class="ldr-hg__glow"></div>' +
        '<div class="ldr-hg__in">' +
          (hayTexto ? '<div class="ldr-hg__tx">' + logoHtml + tituloHtml + subHtml + btnHtml + '</div>' : '') +
          '<div class="ldr-hg__vis">' + tiles + '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // ─── Animacion de entrada ────────────────────────────────────────────────
  // Orden "salteado" pero fijo por hero (no cambia entre visitas), como el
  // [0,4,2,5,1,3] de cuchuflo: se deriva del id del hero.
  function ordenSalteado(n, id) {
    var a = [], i, seed = 7;
    for (i = 0; i < n; i++) a.push(i);
    for (i = 0; i < (id || '').length; i++) seed = (seed * 31 + id.charCodeAt(i)) % 233280;
    for (i = n - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      var j = Math.floor(seed / 233280 * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function nivel(root, encendidas, total) {
    root.style.setProperty('--g', total ? (encendidas / total).toFixed(2) : '1');
    if (encendidas >= total) root.classList.add('is-lit');
  }

  function animar(root, cfg) {
    var tiles = [].slice.call(root.querySelectorAll('.ldr-hg__m'));
    var modo = (cfg.animacion === 'fade' || cfg.animacion === 'ninguna') ? cfg.animacion : 'prender';
    if (modo === 'ninguna' || prefersReducedMotion() || !tiles.length) {
      tiles.forEach(function (t) { t.classList.add('is-on'); });
      nivel(root, tiles.length, tiles.length);
      return;
    }
    var orden = modo === 'prender' ? ordenSalteado(tiles.length, cfg.id) : tiles.map(function (_, i) { return i; });
    var paso = num(cfg.intervalo, 420, 80, 2000);
    var i = 0;
    function step() {
      if (!root.isConnected || i >= orden.length) return;
      tiles[orden[i]].classList.add('is-on');
      i++;
      nivel(root, i, tiles.length);
      if (i < orden.length) setTimeout(step, paso);
    }
    function start() { setTimeout(step, modo === 'prender' ? 600 : 150); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0] && entries[0].isIntersecting) { io.disconnect(); start(); }
      }, { threshold: 0.35 });
      io.observe(root);
    } else {
      start();
    }
  }

  // ─── Videos de YouTube: se cargan recien cuando el hero se acerca a la
  // pantalla (no suman peso a la carga inicial de la home). Muteados, en
  // loop, sin controles y "cover" dentro del tile (sin franjas negras). ──
  function medirIframe(iframe, cfg, fmt) {
    var ar = RATIOS[cfg.proporcion] || RATIOS['1:1'];
    var rt = ar[0] / ar[1];
    var rv = fmt === 'v' ? 9 / 16 : 16 / 9;
    if (rv > rt) {
      iframe.style.height = '102%';
      iframe.style.width = (rv / rt * 102).toFixed(2) + '%';
    } else {
      iframe.style.width = '102%';
      iframe.style.height = (rt / rv * 102).toFixed(2) + '%';
    }
  }

  function cargarVideos(root, cfg) {
    var vids = [].slice.call(root.querySelectorAll('.ldr-hg__vid[data-yt]'));
    if (!vids.length) return;
    function go() {
      vids.forEach(function (v) {
        if (v.querySelector('iframe')) return;
        var id = v.getAttribute('data-yt');
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&mute=1&loop=1&playlist=' + id +
                '&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&fs=0';
        f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
        f.setAttribute('tabindex', '-1');
        f.setAttribute('title', 'Video');
        f.setAttribute('aria-hidden', 'true');
        medirIframe(f, cfg, v.getAttribute('data-fmt'));
        v.appendChild(f);
      });
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0] && entries[0].isIntersecting) { io.disconnect(); go(); }
      }, { rootMargin: '250px 0px' });
      io.observe(root);
    } else {
      go();
    }
  }

  // ─── Insercion (mismo patron de reintento 40 x 150ms que custom-modules) ─
  function montar(cfg, anchor, position) {
    var wrap = document.createElement('div');
    wrap.innerHTML = heroHtml(cfg);
    var node = wrap.firstElementChild;
    if (!node) return null;
    injectStyle();
    switch (position) {
      case 'before': anchor.parentNode.insertBefore(node, anchor); break;
      case 'prepend': anchor.insertBefore(node, anchor.firstChild); break;
      case 'append': anchor.appendChild(node); break;
      case 'after': default: anchor.parentNode.insertBefore(node, anchor.nextSibling); break;
    }
    animar(node, cfg);
    cargarVideos(node, cfg);
    return node;
  }

  function insertar(cfg, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    if (document.getElementById('ldr-hg-' + cfg.id)) return; // ya insertado
    var anchor = cfg.anchor ? document.querySelector(cfg.anchor) : null;
    if (!anchor) {
      if (attemptsLeft <= 0) return;
      setTimeout(function () { insertar(cfg, attemptsLeft - 1); }, 150);
      return;
    }
    montar(cfg, anchor, cfg.position);
  }

  function run() {
    if (PREVIEW) {
      var host = document.getElementById('ldr-preview-host') || document.body;
      HEROES.forEach(function (cfg) { montar(cfg, host, 'append'); });
      return;
    }
    if (!STORE) return;
    var page = currentTemplate();
    HEROES.forEach(function (cfg) {
      if (!cfg.stores || cfg.stores.indexOf(STORE) === -1) return;
      if (cfg.page && cfg.page !== page) return;
      insertar(cfg);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
