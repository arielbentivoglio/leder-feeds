/* color-swatches.js — LEDER HD
   Generado por SyncPropio. No editar manualmente.
   Tamaño bullet: 16px (estándar TiendaNube grilla)
   Actualizado: ver commit GitHub */
(function () {
  'use strict';

  /* Mapa de colores: t=tipo (s=solid, d=split, i=image) */
  var M = {
  "Moss": { t: "s", c: "#666666" },
  "Cognac": { t: "s", c: "#CD7F32" },
  "Stone": { t: "s", c: "#c8a97e" },
  "Marrón Oscuro": { t: "s", c: "#4a3728" },
  "Vintage Light": { t: "i", u: "https://arielbentivoglio.github.io/leder-feeds/swatches/vintage-light.webp" },
  "Vintage Dark": { t: "i", u: "https://arielbentivoglio.github.io/leder-feeds/swatches/vintage-dark.webp" },
  "Azul y Amarillo": { t: "d", a: "#00004E", b: "#ffff00" },
  "Africano": { t: "s", c: "#320000" },
  "Blanco y Negro": { t: "d", a: "#ffffff", b: "#000000" },
  "Blanco y Celeste": { t: "d", a: "#ffffff", b: "#64bce8" },
  "Almond Brown": { t: "s", c: "#7e634e" },
  "Coopper Brown": { t: "s", c: "#985234" },
  "Black": { t: "s", c: "#000000" },
  "Beige - Habano": { t: "d", a: "#ffd9ab", b: "#46220f" },
  "Beige Claro": { t: "s", c: "#ffd9ab" },
  "Beige Crema": { t: "s", c: "#F5E1CE" },
  "Beige Oscuro": { t: "s", c: "#B08E6B" },
  "Blanco y Marrón": { t: "d", a: "#ffffff", b: "#8d4925" },
  "Marrón Liso": { t: "s", c: "#704214" },
  "Blanco y Rosa": { t: "d", a: "#ffffff", b: "#ff81cb" },
  "Brown": { t: "s", c: "#8d4925" },
  "Café": { t: "s", c: "#230d00" },
  "Blanco": { t: "s", c: "#ffffff" },
  "Charol Negro": { t: "s", c: "#000000" },
  "Chocolate": { t: "s", c: "#46220f" },
  "Chocolate oscuro": { t: "s", c: "#230d00" },
  "Coral": { t: "s", c: "#ffe4ea" },
  "Crash Habano": { t: "s", c: "#320000" },
  "Negro": { t: "s", c: "#000000" },
  "Marrón": { t: "s", c: "#704214" },
  "Crash Marlboro": { t: "s", c: "#742910" },
  "Crash Marrón": { t: "s", c: "#704214" },
  "Crash Negro": { t: "s", c: "#000000" },
  "Crash Suela": { t: "s", c: "#b87400" },
  "Crash Suela / Crash Marròn": { t: "d", a: "#b87400", b: "#704214" },
  "Crema": { t: "s", c: "#FEEEB8" },
  "Fume": { t: "s", c: "#555B52" },
  "Gout Suede": { t: "s", c: "#704214" },
  "Gris Claro": { t: "s", c: "#a5a1a1" },
  "Gris Medio": { t: "s", c: "#787878" },
  "Gris Oscuro": { t: "s", c: "#4d4c4c" },
  "Habano": { t: "s", c: "#320000" },
  "Habano Claro": { t: "s", c: "#aa7444" },
  "Habano Crash": { t: "s", c: "#320000" },
  "Habano Liso": { t: "s", c: "#320000" },
  "Leder Azul": { t: "s", c: "#062863" },
  "Leder Beige": { t: "s", c: "#c8a97e" },
  "Leder Habano": { t: "s", c: "#320000" },
  "Leder Marrón": { t: "s", c: "#704214" },
  "Leder Negro": { t: "s", c: "#000000" },
  "Leder Rosa": { t: "s", c: "#FF69B4" },
  "Leder Tiza": { t: "s", c: "#FFFFF1" }
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

      /* Si TN ya renderizó este color, solo aplicar estilo y asegurar clases */
      var existing = container.querySelector('[data-option="' + color.replace(/"/g, '\\"') + '"]');
      if (existing) {
        applyBullet(existing, def);
        if (!existing.getAttribute('data-variation-id')) {
          existing.setAttribute('data-variation-id', '0');
          existing.classList.add('js-variation-option', 'js-color-variant');
        }
        return;
      }

      /* Crear bullet nuevo antes del span "+N" */
      var span = document.createElement('span');
      span.className = 'product-item-colors-bullet js-variation-option js-color-variant';
      span.setAttribute('data-option', color);
      span.setAttribute('data-variation-id', '0');
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
