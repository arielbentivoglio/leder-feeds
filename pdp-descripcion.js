/**
 * pdp-descripcion.js — generado automaticamente por SyncPropio (panel de Modulos Custom > PDP - Descripcion)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-09-17 14:21:03
 */
(function () {
  "use strict";
  var CONFIG = {
  "anchor_selector": ".product-description",
  "productos": [
    {
      "product_id": "353690056",
      "activo": true,
      "stores": [
        "ar"
      ],
      "imagenes": [
        {
          "height": 600,
          "src": "https://arielbentivoglio.github.io/leder-feeds/modules/pdp-descripcion-353690056/img-0/20260917140819993294-bolsomaipo.webp",
          "width": 400
        }
      ],
      "bg_colors": [
        ""
      ],
      "margin_top": 0,
      "margin_bottom": 0
    }
  ]
};
  var PRODUCTOS = CONFIG.productos || [];
  var ANCHOR_SELECTOR = CONFIG.anchor_selector || ".product-description";

  function getStore() {
    var h = location.hostname || "";
    if (h.indexOf("leder.cl") !== -1) return "cl";
    return "ar";
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  // Mismo criterio que pdp-bullets.js / pdp-faq.js / pdp-unboxing.js: LS.product.id
  // con fallback a data-product-id por si LS.product no esta listo todavia.
  function productoActualId() {
    try {
      if (window.LS && window.LS.product && window.LS.product.id) {
        return String(window.LS.product.id);
      }
    } catch (e) {}
    var el = document.getElementById("single-product") || document.querySelector("[data-store^='product-price']");
    if (el && el.getAttribute("data-product-id")) {
      return String(el.getAttribute("data-product-id"));
    }
    return null;
  }

  function buscarConfig(store, productId) {
    if (!productId) return null;
    for (var i = 0; i < PRODUCTOS.length; i++) {
      var p = PRODUCTOS[i];
      if (!p.activo) continue;
      if ((p.stores || []).indexOf(store) === -1) continue;
      if (String(p.product_id) === productId) return p;
    }
    return null;
  }

  function injectStyle() {
    if (document.getElementById("ldr-pdpdesc-style")) return;
    var css =
      ".ldr-pdpdesc-break{position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;width:100vw;max-width:100vw;box-sizing:border-box}" +
      ".ldr-pdpdesc-section{padding:48px 24px;box-sizing:border-box}" +
      ".ldr-pdpdesc-row{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:48px;flex-wrap:wrap}" +
      ".ldr-pdpdesc-row.ldr-rev{flex-direction:row-reverse}" +
      ".ldr-pdpdesc-img{flex:1 1 380px;min-width:280px}" +
      ".ldr-pdpdesc-img img{width:100%;height:auto;display:block;border-radius:4px}" +
      ".ldr-pdpdesc-content{flex:1 1 380px;min-width:280px}" +
      ".ldr-pdpdesc-content h1,.ldr-pdpdesc-content h2,.ldr-pdpdesc-content h3{margin:0 0 12px}" +
      ".ldr-pdpdesc-content p{margin:0 0 10px;line-height:1.6}" +
      ".ldr-pdpdesc-content p:last-child{margin-bottom:0}" +
      ".ldr-pdpdesc-full .ldr-pdpdesc-row{max-width:760px;text-align:center;justify-content:center}" +
      "@media (max-width:767px){.ldr-pdpdesc-row{flex-direction:column !important;gap:20px}.ldr-pdpdesc-section{padding:32px 20px}}";
    var st = document.createElement("style");
    st.id = "ldr-pdpdesc-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // Corta el HTML de la descripcion ya renderizada por TN donde haya un
  // <hr> (separador nativo del editor de texto). Si no hay ningun <hr>,
  // devuelve una sola "seccion" con todo el contenido.
  function splitSecciones(html) {
    return html
      .split(/<hr[^>]*>/i)
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; });
  }

  function buildHtml(cfg, secciones) {
    var out = "";
    for (var i = 0; i < secciones.length; i++) {
      var img = (cfg.imagenes || [])[i];
      var bg = (cfg.bg_colors || [])[i] || (i % 2 === 0 ? "#fafafa" : "#f7f5f2");
      var rowClass = "ldr-pdpdesc-row" + (img && i % 2 === 1 ? " ldr-rev" : "");
      var sectionClass = "ldr-pdpdesc-break ldr-pdpdesc-section" + (img ? "" : " ldr-pdpdesc-full");
      var imgHtml = img
        ? '<div class="ldr-pdpdesc-img"><img src="' + esc(img.src) + '" alt="" loading="lazy" width="' + (img.width || 600) + '" height="' + (img.height || 600) + '"></div>'
        : "";
      out +=
        '<section class="' + sectionClass + '" style="background:' + esc(bg) + '">' +
          '<div class="' + rowClass + '">' +
            imgHtml +
            '<div class="ldr-pdpdesc-content">' + secciones[i] + "</div>" +
          "</div>" +
        "</section>";
    }
    return out;
  }

  // Mismo patron de reintento (40 x 150ms) ya validado en produccion en
  // modulos_custom_panel.py / pdp-bullets.js, porque el theme hidrata el
  // contenido del producto despues del DOMContentLoaded.
  function insertar(cfg, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    var anchor = document.querySelector(ANCHOR_SELECTOR);
    if (!anchor) {
      if (attemptsLeft <= 0) return;
      setTimeout(function () { insertar(cfg, attemptsLeft - 1); }, 150);
      return;
    }
    if (anchor.getAttribute("data-ldr-pdpdesc-done")) return;
    var original = anchor.innerHTML || "";
    if (!original.trim()) return; // sin descripcion cargada, no hay nada que seccionar
    var secciones = splitSecciones(original);
    if (!secciones.length) return;

    injectStyle();
    var html = buildHtml(cfg, secciones);
    var wrap = document.createElement("div");
    wrap.className = "ldr-pdpdesc-wrap";
    var marginTop = cfg.margin_top || 0;
    var marginBottom = cfg.margin_bottom || 0;
    if (marginTop || marginBottom) {
      wrap.style.margin = marginTop + "px 0 " + marginBottom + "px";
    }
    wrap.innerHTML = html;

    anchor.setAttribute("data-ldr-pdpdesc-done", "1");
    anchor.style.display = "none"; // se oculta la descripcion nativa; el contenido sigue en el DOM (SEO intacto)
    anchor.parentNode.insertBefore(wrap, anchor.nextSibling);
  }

  function run() {
    if (!window.LS || window.LS.template !== "product") return;
    var store = getStore();
    var pid = productoActualId();
    var cfg = buscarConfig(store, pid);
    if (!cfg) return; // producto sin este modulo activado -> queda la descripcion nativa tal cual
    insertar(cfg);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
