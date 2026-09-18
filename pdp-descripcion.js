/**
 * pdp-descripcion.js — generado automaticamente por SyncPropio (panel de Modulos Custom > PDP - Descripcion)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-09-18 15:47:12
 */
(function () {
  "use strict";
  var CONFIG = {
  "anchor_selector": ".user-content",
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
          "max_height": 400,
          "src": "https://arielbentivoglio.github.io/leder-feeds/modules/pdp-descripcion-353690056/img-0/20260917140819993294-bolsomaipo.webp",
          "width": 400
        },
        {
          "height": 600,
          "max_height": 400,
          "src": "https://arielbentivoglio.github.io/leder-feeds/modules/pdp-descripcion-353690056/img-1/20260917150449167941-bolsomaipo2.webp",
          "width": 400
        }
      ],
      "bg_colors": [
        "",
        ""
      ],
      "text_aligns": [
        "left",
        "left"
      ],
      "img_aligns": [
        "center",
        "center"
      ],
      "margin_top": 0,
      "margin_bottom": 0,
      "gap": 1
    },
    {
      "product_id": "353442312",
      "activo": true,
      "stores": [
        "ar"
      ],
      "imagenes": [
        {
          "height": 600,
          "max_height": 400,
          "src": "https://arielbentivoglio.github.io/leder-feeds/modules/pdp-descripcion-353442312/img-0/20260918154658598882-cartera1.webp",
          "width": 400
        }
      ],
      "bg_colors": [
        ""
      ],
      "text_aligns": [
        "left"
      ],
      "img_aligns": [
        "center"
      ],
      "margin_top": 0,
      "margin_bottom": 0,
      "gap": null
    }
  ]
};
  var PRODUCTOS = CONFIG.productos || [];
  var ANCHOR_SELECTOR = CONFIG.anchor_selector || ".user-content";

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
      ".ldr-pdpdesc-img{flex:1 1 380px;min-width:280px;text-align:center}" +
      ".ldr-pdpdesc-img img{width:100%;height:auto;display:block;border-radius:4px;margin:0 auto}" +
      ".ldr-pdpdesc-content{flex:1 1 380px;min-width:280px}" +
      ".ldr-pdpdesc-content h1,.ldr-pdpdesc-content h2,.ldr-pdpdesc-content h3{margin:0 0 12px}" +
      ".ldr-pdpdesc-content p{margin:0 0 10px;line-height:1.6}" +
      ".ldr-pdpdesc-content p:last-child{margin-bottom:0}" +
      ".ldr-pdpdesc-full .ldr-pdpdesc-row{max-width:760px;text-align:center;justify-content:center}" +
      ".ldr-pdpdesc-eyebrow{max-width:1180px;margin:0 auto 20px;text-align:center;font-weight:700}" +
      "@media (max-width:767px){.ldr-pdpdesc-row{flex-direction:column !important;gap:20px !important}.ldr-pdpdesc-section{padding:32px 20px}}";
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

  function buildHtml(cfg, secciones, eyebrowText) {
    var out = "";
    for (var i = 0; i < secciones.length; i++) {
      var img = (cfg.imagenes || [])[i];
      var bg = (cfg.bg_colors || [])[i] || (i % 2 === 0 ? "#fafafa" : "#f7f5f2");
      var rowClass = "ldr-pdpdesc-row" + (img && i % 2 === 1 ? " ldr-rev" : "");
      // Espacio entre imagen y texto: si el producto no configuro nada,
      // queda el standard (48px, definido en la clase). El override solo
      // pisa el desktop -- en mobile siempre se usa el gap fijo mas chico
      // (20px !important en la media query), sea cual sea este valor.
      var rowStyle = cfg.gap ? ' style="gap:' + cfg.gap + 'px"' : '';
      var sectionClass = "ldr-pdpdesc-break ldr-pdpdesc-section" + (img ? "" : " ldr-pdpdesc-full");
      // Alineacion por seccion. La de imagen se resuelve con margin (no con
      // text-align, porque la imagen es display:block): asi funciona tanto
      // si la imagen llena el ancho de su columna (sin "Alto maximo") como
      // si quedo mas angosta que la columna por el recorte de alto -- en
      // ese ultimo caso es lo que decide si el hueco libre queda a la
      // izquierda, a la derecha o repartido en ambos lados (centrada).
      var imgAlign = (cfg.img_aligns || [])[i] || "center";
      var imgMargin = imgAlign === "left" ? "margin-left:0;margin-right:auto"
        : imgAlign === "right" ? "margin-left:auto;margin-right:0"
        : "margin-left:auto;margin-right:auto";
      var textAlign = (cfg.text_aligns || [])[i] || "left";
      var imgStyle = "";
      if (img) {
        var imgStyleParts = [imgMargin];
        if (img.max_height) {
          // Alto maximo elegido en el panel: el ancho se recalcula solo
          // (proporcional), nunca se fuerza aparte.
          imgStyleParts.push("max-height:" + img.max_height + "px", "width:auto", "max-width:100%", "height:auto");
        }
        imgStyle = ' style="' + imgStyleParts.join(";") + '"';
      }
      var imgHtml = img
        ? '<div class="ldr-pdpdesc-img"><img src="' + esc(img.src) + '" alt="" loading="lazy" width="' + (img.width || 600) + '" height="' + (img.height || 600) + '"' + imgStyle + '></div>'
        : "";
      var eyebrowHtml = (i === 0 && eyebrowText) ? '<div class="ldr-pdpdesc-eyebrow">' + esc(eyebrowText) + "</div>" : "";
      out +=
        '<section class="' + sectionClass + '" style="background:' + esc(bg) + '">' +
          eyebrowHtml +
          '<div class="' + rowClass + '"' + rowStyle + '>' +
            imgHtml +
            '<div class="ldr-pdpdesc-content" style="text-align:' + textAlign + '">' + secciones[i] + "</div>" +
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

    // El theme muestra un titulo ("Descripcion") como hermano justo antes
    // del bloque de texto, fuera de ANCHOR_SELECTOR. Si esta ahi, se oculta
    // junto con la descripcion nativa y su texto se repite centrado arriba
    // de la primera seccion, para no dejarlo "flotando" fuera del modulo.
    // El chequeo de largo evita tocar por error un hermano que no sea ese
    // titulo (ej. si el theme cambia de estructura).
    var eyebrowText = "";
    var labelEl = anchor.previousElementSibling;
    if (labelEl && labelEl.textContent && labelEl.textContent.trim().length > 0 && labelEl.textContent.trim().length < 40) {
      eyebrowText = labelEl.textContent.trim();
      labelEl.style.display = "none";
    }

    injectStyle();
    var html = buildHtml(cfg, secciones, eyebrowText);
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
