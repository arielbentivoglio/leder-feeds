/**
 * hero-grilla.js — generado automaticamente por SyncPropio (Modulos Custom > Hero Grilla)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-11-24 14:57:46
 */
(function () {
  'use strict';

  var PREVIEW = false;
  var HEROES = [];
  var SLIDERS = [];

  var STORE = (function () {
    if (PREVIEW) return 'preview';
    var h = window.location.hostname || '';
    if (h.indexOf('leder.cl') !== -1) return 'cl';
    if (h.indexOf('lederhd.com') !== -1) return 'ar';
    return null;
  })();

  // Tienda cuyos datos de producto se usan (en la vista previa del panel se
  // elige con el selector AR/CL).
  var STORE_DATOS = PREVIEW ? (window.__LDR_PV_STORE || 'ar') : STORE;

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

  function precioNum(v) {
    var n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  }

  // $ 499.990 / $ 1.234,50 (mismo formato que la tienda en AR y CL).
  function fmtPrecio(n) {
    var dec = Math.round(n * 100) % 100 !== 0;
    try {
      return '$' + n.toLocaleString('es-AR', { minimumFractionDigits: dec ? 2 : 0, maximumFractionDigits: dec ? 2 : 0 });
    } catch (e) {
      return '$' + (dec ? n.toFixed(2) : Math.round(n).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  function preciosHtml(cfg, t) {
    if (t.tipo !== 'producto' || !cfg.mostrar_precio) return '';
    var p = precioNum(t.precio), tach = precioNum(t.tachado);
    if (p <= 0) return '';
    var hayOferta = tach > p;
    var html = '<span class="ldr-hg__pr">' +
      (hayOferta && cfg.mostrar_tachado !== false ? '<s>' + fmtPrecio(tach) + '</s>' : '') +
      '<b>' + fmtPrecio(p) + '</b></span>';
    if (hayOferta && cfg.mostrar_descuento !== false) {
      var pct = Math.round((tach - p) / tach * 100);
      if (pct >= 1) html += '<span class="ldr-hg__off">-' + pct + '%</span>';
    }
    return html;
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
      '.ldr-hg__t.ldr-hg__t--fallback{display:none!important}' +
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
      // Precios en tiles de producto: pastilla abajo a la izquierda + badge de % arriba a la derecha.
      '.ldr-hg__lb{max-width:calc(100% - 20px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
      '.ldr-hg__m--off .ldr-hg__lb{max-width:calc(100% - 82px)}' +
      '.ldr-hg__pr{position:absolute;left:10px;bottom:10px;z-index:2;display:flex;align-items:baseline;flex-wrap:wrap;gap:2px 7px;max-width:calc(100% - 20px);padding:6px 10px!important;border-radius:12px;' +
        'background:var(--hg-chip-bg);color:var(--hg-chip-tx)!important;font-family:inherit;line-height:1.1;transition:opacity .5s ease}' +
      '.ldr-hg__pr b{font-weight:800;font-size:clamp(12px,1.15vw,17px);letter-spacing:-.01em}' +
      '.ldr-hg__pr s{font-weight:500;font-size:clamp(10px,.85vw,13px);opacity:.6}' +
      '.ldr-hg__off{position:absolute;top:10px;right:10px;z-index:3;padding:6px 9px!important;border-radius:99px;background:var(--hg-off-bg);color:var(--hg-off-tx)!important;' +
        'font-family:inherit;font-weight:800;font-size:clamp(11px,1.05vw,15px);line-height:1;letter-spacing:-.01em;transition:opacity .5s ease,transform .5s cubic-bezier(.3,1.6,.5,1)}' +
      '.ldr-hg--anim-prender .ldr-hg__m .ldr-hg__pr,.ldr-hg--anim-prender .ldr-hg__m .ldr-hg__off{opacity:.55}' +
      '.ldr-hg--anim-prender .ldr-hg__m.is-on .ldr-hg__pr,.ldr-hg--anim-prender .ldr-hg__m:hover .ldr-hg__pr,' +
        '.ldr-hg--anim-prender .ldr-hg__m.is-on .ldr-hg__off,.ldr-hg--anim-prender .ldr-hg__m:hover .ldr-hg__off{opacity:1}' +
      // Precio "debajo": franja al pie del tile; la foto se achica para no quedar tapada.
      '.ldr-hg--precio-debajo .ldr-hg__m--pr .ldr-hg__media{height:calc(100% - var(--hg-pie,46px))!important}' +
      '.ldr-hg--precio-debajo .ldr-hg__m--pr .ldr-hg__pr{left:0;right:0;bottom:0;max-width:none;height:var(--hg-pie,46px);border-radius:0;padding:0 12px!important;' +
        'justify-content:center;align-items:center;flex-wrap:nowrap;gap:8px}' +
      '.ldr-hg__m.is-on .ldr-hg__off{animation:ldrHgPop .5s cubic-bezier(.3,1.6,.5,1) 1}' +
      '@keyframes ldrHgPop{0%{transform:scale(.6)}100%{transform:scale(1)}}' +
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
      // ─── Hero tipo "Solo imagen" (banner): suelto, con la proporcion natural
      // de la imagen; dentro del slider ocupa todo el slide ("completa" =
      // contain con el color de fondo, "llenar" = cover).
      '.ldr-hg--banner{display:block}' +
      '.ldr-hg__bn{display:block!important;width:100%;line-height:0;text-decoration:none!important}' +
      '.ldr-hg__bn picture{display:block;width:100%}' +
      '.ldr-hg__bn-img{display:block!important;width:100%!important;height:auto!important;max-width:none!important;margin:0!important;border:0!important;opacity:1!important}' +
      '.ldr-hgs__slide > .ldr-hg--banner > .ldr-hg__bn,.ldr-hgs__slide > .ldr-hg--banner picture{height:100%}' +
      '.ldr-hgs__slide > .ldr-hg--banner .ldr-hg__bn-img{height:100%!important;object-fit:contain;object-position:center}' +
      '.ldr-hgs__slide > .ldr-hg--banner.ldr-hg--banner-llenar .ldr-hg__bn-img{object-fit:cover}' +
      // ─── Slider de heros: slides apilados en la misma celda de grid (el alto
      // es el del hero mas alto) y transicion fade + leve desplazamiento.
      '.ldr-hgs{position:relative;width:100%;overflow:hidden;background:var(--hgs-bg,#000)}' +
      '.ldr-hgs.ldr-hg--full{width:100vw!important;max-width:100vw!important;left:50%;right:50%;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.ldr-hgs__track{display:grid!important;touch-action:pan-y}' +
      '.ldr-hgs__slide{grid-area:1/1;display:flex;opacity:0;visibility:hidden;transform:translateX(3%);transition:opacity .7s ease,transform .7s ease,visibility 0s linear .7s}' +
      '.ldr-hgs__slide.is-prev{transform:translateX(-3%)}' +
      '.ldr-hgs__slide.is-active{opacity:1;visibility:visible;transform:none;transition:opacity .7s ease,transform .7s ease,visibility 0s}' +
      '.ldr-hgs__slide > .ldr-hg{margin:0!important;flex:1;display:flex!important;align-items:center}' +
      '.ldr-hgs__slide > .ldr-hg.ldr-hg--full{width:100%!important;max-width:100%!important;left:auto;right:auto}' +
      '.ldr-hgs__slide > .ldr-hg > .ldr-hg__in{width:100%}' +
      '.ldr-hgs__arr{position:absolute;top:50%;z-index:5;width:44px;height:44px;margin-top:-22px;border:0!important;border-radius:50%;cursor:pointer;padding:0!important;' +
        'display:flex;align-items:center;justify-content:center;background:rgba(var(--hgs-ctl-rgb),.14);color:var(--hgs-ctl);font-size:22px;line-height:1;transition:background .2s ease}' +
      '.ldr-hgs__arr:hover{background:rgba(var(--hgs-ctl-rgb),.28)}' +
      '.ldr-hgs__arr--prev{left:14px}.ldr-hgs__arr--next{right:14px}' +
      '.ldr-hgs__dots{position:absolute;left:0;right:0;bottom:14px;z-index:5;display:flex;justify-content:center;gap:8px;margin:0!important;padding:0!important}' +
      '.ldr-hgs__dot{width:9px;height:9px;padding:0!important;border:0!important;border-radius:99px;cursor:pointer;background:rgba(var(--hgs-ctl-rgb),.35);transition:width .3s ease,background .3s ease}' +
      '.ldr-hgs__dot.is-active{width:26px;background:var(--hgs-ctl)}' +
      '@media (max-width:767px){.ldr-hgs__arr{display:none!important}.ldr-hgs__dots{bottom:12px}.ldr-hgs--dots .ldr-hg__in{padding-bottom:46px!important}}' +
      '@media (prefers-reduced-motion:reduce){.ldr-hgs__slide{transition:none!important;transform:none!important}}' +
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
        '.ldr-hg__pr{left:6px;bottom:6px;max-width:calc(100% - 12px);padding:4px 7px!important;border-radius:9px;flex-direction:column;align-items:flex-start;gap:1px}' +
        '.ldr-hg__pr b{font-size:12px}.ldr-hg__pr s{font-size:9.5px}' +
        '.ldr-hg__off{top:6px;right:6px;padding:4px 6px!important;font-size:10.5px}' +
        '.ldr-hg--precio-debajo .ldr-hg__m--pr{--hg-pie:40px}' +
        '.ldr-hg--precio-debajo .ldr-hg__m--pr .ldr-hg__pr{flex-direction:column;align-items:center;justify-content:center;gap:0;padding:0 6px!important}' +
        '.ldr-hg__lb{max-width:calc(100% - 12px)}' +
        '.ldr-hg__m--off .ldr-hg__lb{max-width:calc(100% - 56px)}' +
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
    // Heros AR+CL: en leder.cl el tile de producto usa link/foto/precio del
    // producto equivalente de Chile; si no tiene equivalente, no se muestra.
    if (t.tipo === 'producto' && STORE_DATOS === 'cl') {
      if (t.ocultar_cl) return '';
      if (t.cl) t = Object.assign({}, t, t.cl);
    }
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
    var precios = preciosHtml(cfg, t);
    if (precios.indexOf('ldr-hg__off') !== -1) cls += ' ldr-hg__m--off';
    if (precios.indexOf('ldr-hg__pr') !== -1) cls += ' ldr-hg__m--pr';
    return '<' + tag + ' class="' + cls + '"' + attrs + (link && aria ? ' aria-label="' + esc(aria) + '"' : '') +
           ' style="' + style + '">' + inner + label + precios + '</' + tag + '>';
  }

  function bannerHtml(cfg) {
    var d = cfg.banner_desktop || {}, m = cfg.banner_mobile || {};
    var ds = safeUrl(d.src || ''), ms = safeUrl(m.src || '');
    if (!ds && !ms) return '';
    var principal = ds ? d : m;
    var link = safeUrl(cfg.banner_link);
    var tag = link ? 'a' : 'div';
    var attrs = link ? ' href="' + esc(link) + '"' + (cfg.banner_nueva_pestana ? ' target="_blank" rel="noopener"' : '') : '';
    var dims = (principal.width && principal.height) ? ' width="' + parseInt(principal.width, 10) + '" height="' + parseInt(principal.height, 10) + '"' : '';
    var vars = '--hg-bg:' + color(cfg.banner_bg, '#000000') + ';margin-top:' + num(cfg.margin_top, 0, 0, 200) + 'px;margin-bottom:' + num(cfg.margin_bottom, 0, 0, 200) + 'px';
    return (
      '<section class="ldr-hg ldr-hg--banner' + (cfg.banner_ajuste === 'llenar' ? ' ldr-hg--banner-llenar' : '') + (cfg.ancho_completo ? ' ldr-hg--full' : '') + '"' +
      ' id="ldr-hg-' + esc(cfg.id) + '" data-hero="' + esc(cfg.id) + '" style="' + esc(vars) + '">' +
        '<' + tag + ' class="ldr-hg__bn"' + attrs + (link && cfg.banner_alt ? ' aria-label="' + esc(cfg.banner_alt) + '"' : '') + '>' +
          '<picture>' +
            (ds && ms ? '<source media="(max-width:767px)" srcset="' + esc(ms) + '"' +
              (m.width && m.height ? ' width="' + parseInt(m.width, 10) + '" height="' + parseInt(m.height, 10) + '"' : '') + '>' : '') +
            '<img class="ldr-hg__bn-img" src="' + esc(ds || ms) + '" alt="' + esc(cfg.banner_alt || '') + '" decoding="async"' + dims + '>' +
          '</picture>' +
        '</' + tag + '>' +
      '</section>'
    );
  }

  function heroHtml(cfg) {
    if (cfg.tipo === 'imagen') return bannerHtml(cfg);
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
      '--hg-off-bg:' + color(cfg.descuento_bg, '#E5484D'), '--hg-off-tx:' + color(cfg.descuento_tx, '#FFFFFF'),
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
    // Con logo en modo "reemplaza" el titulo igual se arma, oculto: si el logo
    // no carga (404, bloqueo), se muestra el titulo en su lugar.
    var tituloOculto = !!(logoHtml && cfg.logo_modo !== 'arriba');
    var tituloHtml = t ? '<h2 class="ldr-hg__t' + (tituloOculto ? ' ldr-hg__t--fallback' : '') + '">' + t + '</h2>' : '';
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
      (cfg.hover === false ? '' : ' ldr-hg--hover') +
      (cfg.precio_posicion === 'sobre' ? '' : ' ldr-hg--precio-debajo');

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

  // Devuelve {play, reset}: el slider la reinicia cada vez que el slide
  // vuelve a entrar; un hero suelto la reproduce una sola vez.
  function crearAnimacion(root, cfg) {
    var tiles = [].slice.call(root.querySelectorAll('.ldr-hg__m'));
    var modo = (cfg.animacion === 'fade' || cfg.animacion === 'ninguna') ? cfg.animacion : 'prender';
    var estatica = modo === 'ninguna' || prefersReducedMotion() || !tiles.length;
    var orden = modo === 'prender' ? ordenSalteado(tiles.length, cfg.id) : tiles.map(function (_, i) { return i; });
    var paso = num(cfg.intervalo, 420, 80, 2000);
    var timers = [];
    function limpiar() { timers.forEach(clearTimeout); timers = []; }
    function prenderTodo() {
      tiles.forEach(function (t) { t.classList.add('is-on'); });
      nivel(root, tiles.length, tiles.length);
    }
    function reset() {
      limpiar();
      if (estatica) { prenderTodo(); return; }
      tiles.forEach(function (t) { t.classList.remove('is-on'); });
      root.classList.remove('is-lit');
      root.style.setProperty('--g', '0');
    }
    function play() {
      reset();
      if (estatica) return;
      var i = 0;
      function step() {
        if (!root.isConnected || i >= orden.length) return;
        tiles[orden[i]].classList.add('is-on');
        i++;
        nivel(root, i, tiles.length);
        if (i < orden.length) timers.push(setTimeout(step, paso));
      }
      timers.push(setTimeout(step, modo === 'prender' ? 600 : 150));
    }
    if (estatica) prenderTodo();
    return { play: play, reset: reset, duracion: estatica ? 0 : (600 + orden.length * paso) };
  }

  function alVerse(el, cb, opts) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0] && entries[0].isIntersecting) { io.disconnect(); cb(); }
      }, opts || { threshold: 0.35 });
      io.observe(el);
    } else {
      cb();
    }
  }

  // ─── Videos de YouTube: se cargan recien cuando hacen falta (hero cerca
  // de la pantalla, o slide activo). Muteados, en loop, sin controles y
  // "cover" dentro del tile (sin franjas negras). ──────────────────────────
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

  function cargarVideosYa(root, cfg) {
    [].slice.call(root.querySelectorAll('.ldr-hg__vid[data-yt]')).forEach(function (v) {
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

  // ─── Construccion de nodos ───────────────────────────────────────────────
  function nodoDesdeHtml(html) {
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    return wrap.firstElementChild;
  }

  function prepararLogo(node) {
    var img = node.querySelector('.ldr-hg__logo');
    if (!img) return;
    function fallo() {
      var pic = node.querySelector('.ldr-hg__logo-w');
      var t = node.querySelector('.ldr-hg__t--fallback');
      if (pic && pic.parentNode) pic.parentNode.removeChild(pic);
      if (t) t.classList.remove('ldr-hg__t--fallback');
    }
    img.addEventListener('error', fallo);
  }

  function crearHero(cfg) {
    var node = nodoDesdeHtml(heroHtml(cfg));
    if (!node) return null;
    prepararLogo(node);
    var anim = crearAnimacion(node, cfg);
    alVerse(node, anim.play);
    alVerse(node, function () { cargarVideosYa(node, cfg); }, { rootMargin: '250px 0px' });
    return node;
  }

  function crearSlider(sl, heroes) {
    var ctl = color(sl.color_controles, '#FFFFFF');
    var mt = num(sl.margin_top, 0, 0, 200), mb = num(sl.margin_bottom, 0, 0, 200);
    var bg = color((heroes[0] || {}).color_fondo, '#000000');
    var root = nodoDesdeHtml(
      '<div class="ldr-hgs' + (sl.ancho_completo ? ' ldr-hg--full' : '') + (heroes.length > 1 && sl.puntos !== false ? ' ldr-hgs--dots' : '') + '" id="ldr-hgs-' + esc(sl.id) + '" role="region" aria-roledescription="carousel"' +
      ' aria-label="' + esc(sl.nombre_publico || 'Destacados') + '"' +
      ' style="' + esc('--hgs-ctl:' + ctl + ';--hgs-ctl-rgb:' + rgb(ctl) + ';--hgs-bg:' + bg + ';margin-top:' + mt + 'px;margin-bottom:' + mb + 'px') + '">' +
        '<div class="ldr-hgs__track"></div>' +
      '</div>');
    var track = root.querySelector('.ldr-hgs__track');
    var slides = [];
    heroes.forEach(function (cfg, i) {
      var slide = document.createElement('div');
      slide.className = 'ldr-hgs__slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', (i + 1) + ' de ' + heroes.length);
      var hero = nodoDesdeHtml(heroHtml(cfg));
      prepararLogo(hero);
      slide.appendChild(hero);
      track.appendChild(slide);
      slides.push({ el: slide, hero: hero, cfg: cfg, anim: crearAnimacion(hero, cfg) });
    });

    var n = slides.length;
    var actual = 0, visible = false, pausado = false, timer = null;
    var autoplay = sl.autoplay !== false && n > 1;
    var espera = num(sl.segundos, 7, 3, 30) * 1000;

    var dots = [];
    if (n > 1 && sl.flechas !== false) {
      root.insertAdjacentHTML('beforeend',
        '<button type="button" class="ldr-hgs__arr ldr-hgs__arr--prev" aria-label="Anterior">&#8249;</button>' +
        '<button type="button" class="ldr-hgs__arr ldr-hgs__arr--next" aria-label="Siguiente">&#8250;</button>');
      root.querySelector('.ldr-hgs__arr--prev').addEventListener('click', function () { ir(actual - 1, true); });
      root.querySelector('.ldr-hgs__arr--next').addEventListener('click', function () { ir(actual + 1, true); });
    }
    if (n > 1 && sl.puntos !== false) {
      var dw = document.createElement('div');
      dw.className = 'ldr-hgs__dots';
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'ldr-hgs__dot';
        b.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
        b.addEventListener('click', function () { ir(i, true); });
        dw.appendChild(b);
        dots.push(b);
      });
      root.appendChild(dw);
    }

    function programar() {
      clearTimeout(timer);
      if (!autoplay || pausado || !visible || document.hidden) return;
      // Le da tiempo a la animacion de entrada del slide antes de pasar al siguiente.
      timer = setTimeout(function () { ir(actual + 1, false); }, Math.max(espera, slides[actual].anim.duracion + 2500));
    }

    function activar(i, animar) {
      slides.forEach(function (s, k) {
        s.el.classList.toggle('is-active', k === i);
        s.el.classList.toggle('is-prev', k !== i && k === (i - 1 + n) % n);
        s.el.setAttribute('aria-hidden', k === i ? 'false' : 'true');
      });
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      var s = slides[i];
      if (animar) { s.anim.play(); cargarVideosYa(s.hero, s.cfg); }
      else s.anim.reset();
    }

    function ir(i, manual) {
      var nuevo = ((i % n) + n) % n;
      if (nuevo !== actual) slides[actual].anim.reset();
      actual = nuevo;
      activar(actual, visible);
      if (manual) pausado = false;
      programar();
    }

    // Swipe en mobile
    var x0 = null, y0 = null;
    track.addEventListener('touchstart', function (e) { var t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) ir(actual + (dx < 0 ? 1 : -1), true);
    }, { passive: true });

    if (sl.pausa_hover !== false) {
      root.addEventListener('mouseenter', function () { pausado = true; clearTimeout(timer); });
      root.addEventListener('mouseleave', function () { pausado = false; programar(); });
    }
    document.addEventListener('visibilitychange', programar);

    activar(0, false);
    alVerse(root, function () { visible = true; activar(actual, true); programar(); });
    return root;
  }

  // ─── Insercion (mismo patron de reintento 40 x 150ms que custom-modules) ─
  function colocar(node, anchor, position) {
    switch (position) {
      case 'before': anchor.parentNode.insertBefore(node, anchor); break;
      case 'prepend': anchor.insertBefore(node, anchor.firstChild); break;
      case 'append': anchor.appendChild(node); break;
      case 'after': default: anchor.parentNode.insertBefore(node, anchor.nextSibling); break;
    }
  }

  function insertar(domId, selector, position, fabrica, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    if (document.getElementById(domId)) return; // ya insertado
    var anchor = selector ? document.querySelector(selector) : null;
    if (!anchor) {
      if (attemptsLeft <= 0) return;
      setTimeout(function () { insertar(domId, selector, position, fabrica, attemptsLeft - 1); }, 150);
      return;
    }
    var node = fabrica();
    if (!node) return;
    injectStyle();
    colocar(node, anchor, position);
  }

  function aplica(cfg, page) {
    if (PREVIEW) return true;
    if (!cfg.stores || cfg.stores.indexOf(STORE) === -1) return false;
    if (cfg.page && cfg.page !== page) return false;
    return true;
  }

  function run() {
    if (!PREVIEW && !STORE) return;
    var page = PREVIEW ? null : currentTemplate();
    var porId = {};
    HEROES.forEach(function (h) { porId[h.id] = h; });

    // Sliders: toman sus heros (en su orden) y esos heros no se montan sueltos.
    var enSlider = {};
    var sliders = [];
    SLIDERS.forEach(function (sl) {
      if (!aplica(sl, page)) return;
      var hs = (sl.heroes || []).map(function (id) { return porId[id]; })
        .filter(function (h) { return h && (PREVIEW || (h.stores || []).indexOf(STORE) !== -1); });
      if (!hs.length) return;
      hs.forEach(function (h) { enSlider[h.id] = true; });
      sliders.push({ sl: sl, heroes: hs });
    });

    if (PREVIEW) {
      var host = document.getElementById('ldr-preview-host') || document.body;
      injectStyle();
      sliders.forEach(function (x) { host.appendChild(crearSlider(x.sl, x.heroes)); });
      HEROES.forEach(function (h) { if (!enSlider[h.id]) host.appendChild(crearHero(h)); });
      return;
    }

    sliders.forEach(function (x) {
      insertar('ldr-hgs-' + x.sl.id, x.sl.anchor, x.sl.position, function () { return crearSlider(x.sl, x.heroes); });
    });
    HEROES.forEach(function (h) {
      if (enSlider[h.id] || !aplica(h, page)) return;
      insertar('ldr-hg-' + h.id, h.anchor, h.position, function () { return crearHero(h); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
