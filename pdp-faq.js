/**
 * pdp-faq.js — generado automaticamente por SyncPropio (panel de Modulos Custom > PDP - FAQ)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-09-01 16:17:35
 */
(function () {
  "use strict";
  var SETS = [
  {
    "id": "faq-cl",
    "activo": true,
    "stores": [
      "cl"
    ],
    "alcance": {
      "tipo": "todos",
      "valores": [],
      "labels": []
    },
    "anchorSelector": "[data-store=\"footer\"]",
    "anchorPosition": "before",
    "eyebrow": "Preguntas frecuentes",
    "items": [
      {
        "pregunta": "¿Hacen envíos a todo el país?",
        "respuesta": "Sí, enviamos a todo el país."
      },
      {
        "pregunta": "¿En cuántas cuotas puedo pagar?",
        "respuesta": "Puedes pagar en 6 sin interés"
      },
      {
        "pregunta": "¿Puedo cambiar o devolver el producto?",
        "respuesta": "Sí, aceptamos cambios y devoluciones. No mas de 30 días."
      },
      {
        "pregunta": "¿De qué material es?",
        "respuesta": "Cuero de origen argentino, con fabricación propia y terminación artesanal."
      }
    ],
    "bgColor": "#ffffff",
    "accentColor": "#a87c4f",
    "textColor": "#1a1a1a",
    "textSizeEyebrow": 13,
    "textSizePregunta": 16,
    "textSizeRespuesta": 15
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

  // Mismo criterio de contexto que pdp-bullets.js (LS.category / LS.product,
  // con fallback a data-product-id porque LS.product puede no estar listo).
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
  // (Producto > Categoria > Pagina > Todos), igual que pdp-bullets.js.
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
    if (document.getElementById("ldr-pfaq-style")) return;
    var css =
      ".ldr-pfaq{width:100%}" +
      ".ldr-pfaq__wrap{max-width:800px;margin:0 auto;padding:32px 20px}" +
      ".ldr-pfaq__head{margin-bottom:16px;text-align:center}" +
      ".ldr-pfaq__eyebrow{margin:0;letter-spacing:.12em;text-transform:uppercase;font-weight:600}" +
      ".ldr-pfaq__item{border-bottom:1px solid rgba(0,0,0,.12)}" +
      ".ldr-pfaq__q{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;padding:14px 2px;background:none;border:0;cursor:pointer;text-align:left;font-weight:600}" +
      ".ldr-pfaq__ic{position:relative;flex:0 0 16px;width:16px;height:16px}" +
      ".ldr-pfaq__ic::before,.ldr-pfaq__ic::after{content:\"\";position:absolute;top:50%;left:50%;background:currentColor;transform:translate(-50%,-50%)}" +
      ".ldr-pfaq__ic::before{width:12px;height:2px}" +
      ".ldr-pfaq__ic::after{width:2px;height:12px;transition:transform .25s ease}" +
      ".ldr-pfaq__item.is-open .ldr-pfaq__ic::after{transform:translate(-50%,-50%) rotate(90deg) scaleY(0)}" +
      ".ldr-pfaq__a{max-height:0;overflow:hidden;transition:max-height .3s ease}" +
      ".ldr-pfaq__a-in{padding:0 2px 14px}";
    var st = document.createElement("style");
    st.id = "ldr-pfaq-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function itemHtml(set, item, idx) {
    var color = set.textColor || "#1a1a1a";
    var qSize = (parseInt(set.textSizePregunta, 10) || 16) + "px";
    var aSize = (parseInt(set.textSizeRespuesta, 10) || 15) + "px";
    return (
      '<div class="ldr-pfaq__item" data-idx="' + idx + '">' +
        '<button type="button" class="ldr-pfaq__q" style="color:' + color + ';font-size:' + qSize + '">' +
          "<span>" + esc(item.pregunta) + "</span>" +
          '<span class="ldr-pfaq__ic" style="color:' + (set.accentColor || "#a87c4f") + '"></span>' +
        "</button>" +
        '<div class="ldr-pfaq__a">' +
          '<div class="ldr-pfaq__a-in" style="color:' + color + ";font-size:" + aSize + '">' + esc(item.respuesta) + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function buildHtml(set) {
    var items = (set.items || []).filter(function (it) { return it && it.pregunta && it.respuesta; });
    if (!items.length) return "";
    var eyebrowSize = (parseInt(set.textSizeEyebrow, 10) || 13) + "px";
    var eyebrowHtml = set.eyebrow
      ? '<p class="ldr-pfaq__eyebrow" style="color:' + (set.accentColor || "#a87c4f") + ";font-size:" + eyebrowSize + '">' + esc(set.eyebrow) + "</p>"
      : "";
    var itemsHtml = items.map(function (it, i) { return itemHtml(set, it, i); }).join("");
    return (
      '<div id="ldr-pdp-faq-mod" data-set="' + esc(set.id) + '">' +
        '<section class="ldr-pfaq">' +
          '<div class="ldr-pfaq__wrap" style="background:' + (set.bgColor || "#ffffff") + '">' +
            '<div class="ldr-pfaq__head">' + eyebrowHtml + "</div>" +
            itemsHtml +
          "</div>" +
        "</section>" +
      "</div>"
    );
  }

  function initAccordion(root) {
    root.querySelectorAll(".ldr-pfaq__item").forEach(function (item) {
      var btn = item.querySelector(".ldr-pfaq__q");
      var panel = item.querySelector(".ldr-pfaq__a");
      btn.addEventListener("click", function () {
        var abierto = item.classList.contains("is-open");
        item.parentNode.querySelectorAll(".ldr-pfaq__item.is-open").forEach(function (otro) {
          if (otro !== item) {
            otro.classList.remove("is-open");
            otro.querySelector(".ldr-pfaq__a").style.maxHeight = "0px";
          }
        });
        if (abierto) {
          item.classList.remove("is-open");
          panel.style.maxHeight = "0px";
        } else {
          item.classList.add("is-open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  // Mismo patron de reintento (40 x 150ms) ya validado en produccion en
  // modulos_custom_panel.py / pdp-bullets.js / countdown.js, porque el
  // theme hidrata el DOM de producto despues del DOMContentLoaded.
  function insertar(set, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    if (document.getElementById("ldr-pdp-faq-mod")) return; // ya insertado
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
    initAccordion(node);
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
