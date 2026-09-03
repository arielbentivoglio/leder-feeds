/**
 * pdp-unboxing.js — generado automaticamente por SyncPropio (panel de Modulos Custom > PDP - Unboxing)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-09-03 14:15:19
 */
(function () {
  "use strict";
  var SETS = [
  {
    "id": "delantal-parrillero-de-cuero-vacuno-cl",
    "activo": true,
    "stores": [
      "cl"
    ],
    "alcance": {
      "tipo": "producto",
      "valores": [
        "340095610"
      ],
      "labels": [
        {
          "id": "340095610",
          "nombre": "Delantal Parrillero de Cuero Vacuno"
        }
      ]
    },
    "anchorSelector": "<div class=\"user-content mb-4\">",
    "anchorPosition": "after",
    "eyebrow": "Nuestro Delantal",
    "titulo": "Mira nuestro delantal en pleno uso",
    "descripcion": "Ideal para parrilladas.",
    "youtubeId": "Hf0PtehC79o",
    "posterImage": "",
    "items": [],
    "bgColor": "#ffffff",
    "accentColor": "#a87c4f",
    "textColor": "#1a1a1a",
    "textSizeEyebrow": 13,
    "textSizeTitulo": 30,
    "textSizeDescripcion": 15,
    "textSizeItem": 14,
    "quitarCursiva": false
  }
];

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

  // El titulo es el unico campo que admite <em>...</em> literal (para la
  // palabra en cursiva). Se escapa todo como siempre y despues se
  // "desescapan" solo esos dos tags puntuales — nunca HTML arbitrario.
  function escTitulo(s) {
    var out = esc(s);
    out = out.replace(/&lt;em&gt;/g, "<em>").replace(/&lt;\/em&gt;/g, "</em>");
    return out;
  }

  // Mismo criterio de contexto que pdp-faq.js / pdp-bullets.js.
  function contextoActual() {
    var categoriaIds = [];
    var productoIds = [];
    try {
      if (window.LS && window.LS.category) {
        if (window.LS.category.id) categoriaIds.push(String(window.LS.category.id).toLowerCase());
        if (window.LS.category.handle) categoriaIds.push(String(window.LS.category.handle).toLowerCase());
      }
    } catch (e) {}
    try {
      if (window.LS && window.LS.product) {
        if (window.LS.product.id) productoIds.push(String(window.LS.product.id).toLowerCase());
        if (window.LS.product.handle) productoIds.push(String(window.LS.product.handle).toLowerCase());
      }
    } catch (e) {}
    if (!productoIds.length) {
      var el = document.getElementById("single-product") || document.querySelector("[data-store^='product-price']");
      if (el && el.getAttribute("data-product-id")) {
        productoIds.push(String(el.getAttribute("data-product-id")).toLowerCase());
      }
    }
    return { path: location.pathname || "/", categoriaIds: categoriaIds, productoIds: productoIds };
  }

  function especificidad(tipo) {
    if (tipo === "producto") return 4;
    if (tipo === "categoria") return 3;
    if (tipo === "pagina") return 2;
    return 1; // "todos"
  }

  function matchesAlcance(set, ctx) {
    var al = set.alcance || { tipo: "todos", valores: [] };
    if (al.tipo === "todos") return true;
    var vals = (al.valores || []).map(function (v) { return String(v).toLowerCase().trim(); }).filter(Boolean);
    if (!vals.length) return false;
    if (al.tipo === "categoria") {
      return ctx.categoriaIds.some(function (id) { return vals.indexOf(id) !== -1; });
    }
    if (al.tipo === "producto") {
      return ctx.productoIds.some(function (id) { return vals.indexOf(id) !== -1; });
    }
    if (al.tipo === "pagina") {
      return vals.some(function (v) {
        if (v.charAt(v.length - 1) === "*") return ctx.path.indexOf(v.slice(0, -1)) === 0;
        return ctx.path === v || ctx.path === (v + "/");
      });
    }
    return false;
  }

  // Gana el mas especifico si dos sets matchean el mismo producto
  // (Producto > Categoria > Pagina > Todos), igual que pdp-faq.js.
  function elegirSet(store, ctx) {
    var candidatos = [];
    for (var i = 0; i < SETS.length; i++) {
      var s = SETS[i];
      if (!s.activo) continue;
      if ((s.stores || []).indexOf(store) === -1) continue;
      if (!matchesAlcance(s, ctx)) continue;
      candidatos.push(s);
    }
    if (!candidatos.length) return null;
    candidatos.sort(function (a, b) {
      return especificidad((b.alcance || {}).tipo) - especificidad((a.alcance || {}).tipo);
    });
    return candidatos[0];
  }

  function injectStyle() {
    if (document.getElementById("ldr-unbx-style")) return;
    var css =
      ".ldr-unbx{width:100%;font-family:inherit}" +
      ".ldr-unbx__grid{display:grid;grid-template-columns:1fr 1fr;align-items:stretch}" +
      ".ldr-unbx__media{position:relative;width:100%;overflow:hidden;background:#000}" +
      ".ldr-unbx__video-wrap{position:relative;width:100%;padding-top:125%;background-size:cover;background-position:center;background-repeat:no-repeat}" +
      ".ldr-unbx__video-wrap iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}" +
      ".ldr-unbx__content{display:flex;align-items:center}" +
      ".ldr-unbx__inner{padding:40px;max-width:520px;margin:0 auto;width:100%}" +
      ".ldr-unbx__eyebrow{margin:0 0 8px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-family:inherit}" +
      ".ldr-unbx__title{margin:0 0 14px;font-family:inherit;font-weight:500;line-height:1.15}" +
      ".ldr-unbx__title em{font-style:italic}" +
      ".ldr-unbx--no-italic .ldr-unbx__title em{font-style:normal}" +
      ".ldr-unbx__desc{margin:0 0 20px;font-family:inherit;line-height:1.5}" +
      ".ldr-unbx__divider{width:100%;height:1px;margin:0 0 16px}" +
      ".ldr-unbx__list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}" +
      ".ldr-unbx__list li{display:flex;align-items:baseline;gap:10px;padding:10px 0;border-bottom:1px solid rgba(0,0,0,.1);font-family:inherit}" +
      ".ldr-unbx__list li:last-child{border-bottom:none}" +
      ".ldr-unbx__arrow{flex-shrink:0}" +
      "@media (max-width:768px){" +
        ".ldr-unbx__grid{grid-template-columns:1fr}" +
        ".ldr-unbx__video-wrap{padding-top:100%}" +
        ".ldr-unbx__inner{padding:28px 20px;max-width:none}" +
      "}";
    var st = document.createElement("style");
    st.id = "ldr-unbx-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function mediaHtml(set) {
    var yid = set.youtubeId || "";
    if (!yid) return "";
    var src = "https://www.youtube.com/embed/" + encodeURIComponent(yid) +
      "?autoplay=1&mute=1&loop=1&playlist=" + encodeURIComponent(yid) +
      "&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1";
    var bg = set.posterImage ? "background-image:url(" + JSON.stringify(set.posterImage) + ")" : "";
    return (
      '<div class="ldr-unbx__media">' +
        '<div class="ldr-unbx__video-wrap" style="' + bg + '">' +
          '<iframe src="' + src + '" allow="autoplay; encrypted-media" tabindex="-1" title="Unboxing"></iframe>' +
        "</div>" +
      "</div>"
    );
  }

  function itemsHtml(set) {
    var items = (set.items || []).filter(Boolean);
    if (!items.length) return "";
    var textSize = (parseInt(set.textSizeItem, 10) || 14) + "px";
    var lis = items.map(function (texto) {
      return (
        "<li>" +
          '<span class="ldr-unbx__arrow" style="color:' + (set.accentColor || "#a87c4f") + '">&rarr;</span>' +
          '<span style="color:' + (set.textColor || "#1a1a1a") + ";font-size:" + textSize + '">' + esc(texto) + "</span>" +
        "</li>"
      );
    }).join("");
    return '<ul class="ldr-unbx__list">' + lis + "</ul>";
  }

  function buildHtml(set) {
    if (!set.youtubeId) return "";
    var eyebrowSize = (parseInt(set.textSizeEyebrow, 10) || 13) + "px";
    var tituloSize = (parseInt(set.textSizeTitulo, 10) || 30) + "px";
    var descSize = (parseInt(set.textSizeDescripcion, 10) || 15) + "px";
    var textColor = set.textColor || "#1a1a1a";
    var accentColor = set.accentColor || "#a87c4f";

    var eyebrowHtml = set.eyebrow
      ? '<p class="ldr-unbx__eyebrow" style="color:' + accentColor + ";font-size:" + eyebrowSize + '">' + esc(set.eyebrow) + "</p>"
      : "";
    var tituloHtml = set.titulo
      ? '<h2 class="ldr-unbx__title" style="color:' + textColor + ";font-size:" + tituloSize + '">' + escTitulo(set.titulo) + "</h2>"
      : "";
    var descHtml = set.descripcion
      ? '<p class="ldr-unbx__desc" style="color:' + textColor + ";font-size:" + descSize + '">' + esc(set.descripcion) + "</p>"
      : "";
    var dividerHtml = '<div class="ldr-unbx__divider" style="background:' + accentColor + '"></div>';
    var listHtml = itemsHtml(set);
    var wrapClass = "ldr-unbx" + (set.quitarCursiva ? " ldr-unbx--no-italic" : "");

    return (
      '<div id="ldr-pdp-unboxing-mod" data-set="' + esc(set.id) + '">' +
        '<section class="' + wrapClass + '" style="background:' + (set.bgColor || "#ffffff") + '">' +
          '<div class="ldr-unbx__grid">' +
            mediaHtml(set) +
            '<div class="ldr-unbx__content">' +
              '<div class="ldr-unbx__inner">' +
                eyebrowHtml + tituloHtml + descHtml + dividerHtml + listHtml +
              "</div>" +
            "</div>" +
          "</div>" +
        "</section>" +
      "</div>"
    );
  }

  // Mismo patron de reintento (40 x 150ms) ya validado en produccion en
  // pdp-faq.js / pdp-bullets.js / countdown.js, porque el theme hidrata el
  // DOM de producto despues del DOMContentLoaded.
  function insertar(set, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    if (document.getElementById("ldr-pdp-unboxing-mod")) return; // ya insertado
    var selector = set.anchorSelector || "#product_form";
    var anchor = document.querySelector(selector);
    if (!anchor) {
      if (attemptsLeft <= 0) return;
      setTimeout(function () { insertar(set, attemptsLeft - 1); }, 150);
      return;
    }
    var html = buildHtml(set);
    if (!html) return;
    injectStyle();
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    var node = wrap.firstElementChild;
    var pos = set.anchorPosition || "after";
    if (pos === "before") anchor.parentNode.insertBefore(node, anchor);
    else if (pos === "prepend") anchor.insertBefore(node, anchor.firstChild);
    else if (pos === "append") anchor.appendChild(node);
    else anchor.parentNode.insertBefore(node, anchor.nextSibling); // "after" (default)
  }

  function run() {
    if (!window.LS || window.LS.template !== "product") return;
    var store = getStore();
    var ctx = contextoActual();
    var elegido = elegirSet(store, ctx);
    if (!elegido) return;
    insertar(elegido);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
