/* color-swatches.js — LEDER HD
   Generado por SyncPropio. No editar manualmente.
   Tamaño bullet: 16px (estándar TiendaNube grilla)
   Actualizado: ver commit GitHub */
(function () {
  'use strict';

  /* Mapa de colores: t=tipo (s=solid, d=split, i=image) */
  var M = {
  "Moss": { t: "s", c: "#6b7c5c" },
  "Cognac": { t: "s", c: "#8b6f5e" },
  "Stone": { t: "s", c: "#c8a97e" },
  "Marrón Oscuro": { t: "s", c: "#4a3728" }
  };

  var SZ = '16px';

  function applyBullet(el, def) {
    el.style.setProperty('width',        SZ,      'important');
    el.style.setProperty('height',       SZ,      'important');
    el.style.setProperty('min-width',    SZ,      'important');
    el.style.setProperty('min-height',   SZ,      'important');
    el.style.setProperty('border-radius','50%',    'important');
    el.style.setProperty('display',      'inline-block', 'important');
    el.style.setProperty('flex-shrink',  '0',     'important');

    if (def.t === 's') {
      el.style.setProperty('background', def.c, 'important');
    } else if (def.t === 'd') {
      el.style.setProperty('background',
        'linear-gradient(135deg,' + def.a + ' 50%,' + def.b + ' 50%)', 'important');
    } else if (def.t === 'i') {
      el.style.setProperty('background-color', 'transparent', 'important');
      el.style.setProperty('background-image', 'url("' + def.u + '")', 'important');
      el.style.setProperty('background-size',  'cover',        'important');
      el.style.setProperty('background-position', 'center',    'important');
    }
  }

  function processCard(card) {
    var script = card.querySelector('script[data-component="structured-data.item"]');
    if (!script) return;

    var data;
    try { data = JSON.parse(script.textContent); } catch (e) { return; }

    var offers = (data.offers && data.offers.offers) ? data.offers.offers : [];

    /* Extraer colores únicos en orden de aparición */
    var colors = [];
    var seen   = {};
    offers.forEach(function (o) {
      var m = o.name && o.name.match(/\(([^,)]+)/);
      if (m) {
        var col = m[1].trim();
        if (!seen[col]) { seen[col] = true; colors.push(col); }
      }
    });

    var container = card.querySelector('.product-item-colors');
    if (!container) return;

    var textSpan = container.querySelector('.product-item-colors-bullet-text');
    var added    = 0;

    colors.forEach(function (color) {
      var def = M[color];
      if (!def) return;

      /* Si TN ya renderizó este color, solo aplicar estilo */
      var existing = container.querySelector('[data-option="' + color.replace(/"/g, '\\"') + '"]');
      if (existing) {
        applyBullet(existing, def);
        return;
      }

      /* Crear bullet nuevo antes del span "+N" */
      var span = document.createElement('span');
      span.className = 'product-item-colors-bullet';
      span.setAttribute('data-option', color);
      span.setAttribute('title', color);
      applyBullet(span, def);

      if (textSpan) {
        container.insertBefore(span, textSpan);
      } else {
        container.appendChild(span);
      }
      added++;
    });

    /* Ocultar contador "+N" si se resolvieron todos los colores custom */
    if (added > 0 && textSpan) {
      textSpan.style.setProperty('display', 'none', 'important');
    }
  }

  function run() {
    document.querySelectorAll('.js-item-product').forEach(processCard);
  }

  /* Ejecutar al cargar */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  /* MutationObserver para infinite scroll y quickshop */
  var _t = null;
  new MutationObserver(function () {
    clearTimeout(_t);
    _t = setTimeout(run, 120);
  }).observe(document.body, { childList: true, subtree: true });

})();
