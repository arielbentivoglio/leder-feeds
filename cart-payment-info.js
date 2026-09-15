/**
 * cart-payment-info.js -- generado automaticamente por SyncPropio
 * (panel Modulos Custom > Carrito - Medios de Pago)
 * No editar a mano: se pisa en la proxima publicacion desde el panel.
 * Generado: 2026-09-15 13:49:02
 */
(function () {
  "use strict";

  var RUNTIME = {"transferenciaActivo": true, "descuentoPct": 15.0, "cuotasActivo": true, "tramos": [{"umbral": 249990.0, "cuotas": 12}, {"umbral": 149990.0, "cuotas": 9}, {"umbral": 99990.0, "cuotas": 6}, {"umbral": 0.0, "cuotas": 3}], "envioActivo": true, "envioUmbral": 149990.0, "envioTexto": "🚚  Envío GRATIS a CABA y GBA En compras superiores a $149.990 · Llega en 24hs hábiles"};

  // Punto de anclaje/posicion real en el DOM del carrito. Para reubicar el
  // bloque (ej. antes del boton en vez de despues) alcanza con cambiar estas
  // dos constantes, no hace falta tocar el resto del script.
  var ANCHOR_SELECTOR = "#ajax-cart-submit-div";
  var INSERT_POSITION = "afterend"; // debajo del boton "Iniciar compra"
  var MODAL_SELECTOR = "#modal-cart";
  var BLOCK_ID = "ldr-cart-payment-info";

  var lastKey = null;

  function parseArNumber(text) {
    if (!text) return null;
    var match = text.match(/(\d{1,3}(?:\.\d{3})*(?:,\d+)?)/);
    if (!match) return null;
    var clean = match[1].replace(/\./g, "").replace(",", ".");
    var n = parseFloat(clean);
    return isNaN(n) ? null : n;
  }

  function formatArs(n) {
    n = Math.round(n * 100) / 100;
    var parts = n.toFixed(2).split(".");
    var intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "$" + intPart + "," + parts[1];
  }

  function getCuotasTier(subtotal) {
    var tramos = RUNTIME.tramos || [];
    for (var i = 0; i < tramos.length; i++) {
      if (subtotal >= tramos[i].umbral) return tramos[i].cuotas;
    }
    return tramos.length ? tramos[tramos.length - 1].cuotas : null;
  }

  function getCartSubtotal(modal) {
    if (!modal) return null;
    var text = modal.textContent || "";
    var match = text.match(/Subtotal[^$]*\$\s*([\d.,]+)/i);
    if (!match) return null;
    return parseArNumber(match[1]);
  }

  function cuotasLine(subtotal) {
    if (!RUNTIME.cuotasActivo) return "";
    var n = getCuotasTier(subtotal);
    if (!n) return "";
    var amount = subtotal / n;
    return '<div class="ldr-cart-payment-cuotas">' + n + " cuotas sin inter\u00e9s de " + formatArs(amount) + "</div>";
  }

  function buildBlock(subtotal) {
    var parts = [];

    var transferHtml = "";
    if (RUNTIME.transferenciaActivo) {
      var transferPrice = subtotal * (1 - (RUNTIME.descuentoPct / 100));
      transferHtml = '<div class="ldr-cart-payment-transfer">' + formatArs(transferPrice) +
        ' con <span class="ldr-cart-payment-transfer-tag">Transferencia</span></div>';
    }
    var cuotasHtml = cuotasLine(subtotal);

    if (transferHtml || cuotasHtml) {
      parts.push('<div class="ldr-cart-payment-box">' + transferHtml + cuotasHtml + "</div>");
    }

    if (RUNTIME.envioActivo && RUNTIME.envioTexto && subtotal >= (RUNTIME.envioUmbral || 0)) {
      parts.push('<div class="ldr-cart-shipping-banner">' + RUNTIME.envioTexto + "</div>");
    }

    if (!parts.length) return null;

    var wrap = document.createElement("div");
    wrap.id = BLOCK_ID;
    wrap.className = "ldr-cart-payment-info";
    wrap.innerHTML = parts.join("");
    return wrap;
  }

  function render() {
    var modal = document.querySelector(MODAL_SELECTOR);
    var anchor = document.querySelector(ANCHOR_SELECTOR);
    if (!modal || !anchor) return;

    var subtotal = getCartSubtotal(modal);
    if (subtotal === null) return;

    var existing = document.getElementById(BLOCK_ID);
    if (existing && subtotal === lastKey) return; // nada cambio, no reinsertar
    if (existing) existing.remove();

    var block = buildBlock(subtotal);
    if (block) anchor.insertAdjacentElement(INSERT_POSITION, block);
    lastKey = subtotal;
  }

  function startObserver(modal) {
    var observer = new MutationObserver(function () { render(); });
    observer.observe(modal, { childList: true, subtree: true, characterData: true });
  }

  function waitForModal(attempts) {
    attempts = attempts || 0;
    var modal = document.querySelector(MODAL_SELECTOR);
    if (modal) {
      startObserver(modal);
      render();
      return;
    }
    if (attempts >= 40) return; // ~6s, mismo patron de retry que otros modulos
    setTimeout(function () { waitForModal(attempts + 1); }, 150);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { waitForModal(); });
  } else {
    waitForModal();
  }
})();
