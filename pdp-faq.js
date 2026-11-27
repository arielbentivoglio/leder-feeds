/**
 * pdp-faq.js — generado automaticamente por SyncPropio (panel de Modulos Custom > PDP - FAQ)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-11-27 15:36:16
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
    "answerColor": "#564E44",
    "textSizeEyebrow": 13,
    "textSizePregunta": 16,
    "textSizeRespuesta": 15,
    "textBold": false
  },
  {
    "id": "faq-ar",
    "activo": true,
    "stores": [
      "ar"
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
        "respuesta": "Podés pagar en 3 sin interés, 6 sin interés a partir de $ 149.990, 9 sin interés a partir de $399990 y 12 sin interés a partir de $ 499.990"
      },
      {
        "pregunta": "¿Tienen descuento por transferencia?",
        "respuesta": "Sí, pagando por transferencia tenés 15% de descuento. Aclaración: El cuit/dni de la persona que realiza el pedido es el que debe transferir, sino la operación se rechaza de forma automática"
      },
      {
        "pregunta": "¿Puedo cambiar o devolver el producto?",
        "respuesta": "Sí, aceptamos cambios y devoluciones. No mas de 30 días. Cambios en locales únicamente con Factura. El estado del producto debe ser el mismo que el entregado."
      },
      {
        "pregunta": "¿De qué material es?",
        "respuesta": "Cuero de origen argentino, con fabricación propia y terminación artesanal."
      }
    ],
    "bgColor": "#ffffff",
    "accentColor": "#a87c4f",
    "textColor": "#1a1a1a",
    "answerColor": "#564e44",
    "textSizeEyebrow": 13,
    "textSizePregunta": 16,
    "textSizeRespuesta": 15,
    "textBold": true
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

  // Diseno = calco exacto del CSS de Ecomclub (tomado del <style> que sigue
  // en la plantilla de producto). Todo va prefijado con #ldr-pdp-faq-mod
  // para ganarle en especificidad a esa hoja vieja (mismas clases
  // .ldr-pfaq*), y cada propiedad que la vieja define se redefine aca, asi
  // las dos hojas nunca se mezclan (antes el icono +/- quedaba roto: la
  // vieja ponia top:6px;left:0 y la nuestra le sumaba translate(-50%,-50%)).
  function injectStyle() {
    if (document.getElementById("ldr-pfaq-style")) return;
    var R = "#ldr-pdp-faq-mod ";
    var css =
      R + ".ldr-pfaq{box-sizing:border-box;width:100%;padding:72px 24px;font-family:var(--body-font,inherit)}" +
      R + ".ldr-pfaq *," + R + ".ldr-pfaq *::before," + R + ".ldr-pfaq *::after{box-sizing:border-box}" +
      R + ".ldr-pfaq__wrap{max-width:760px;margin:0 auto;padding:0;background:transparent}" +
      R + ".ldr-pfaq__head{text-align:center;margin:0 0 36px}" +
      R + ".ldr-pfaq__eyebrow{margin:0 0 12px;font-family:var(--body-font,inherit);font-weight:500;letter-spacing:.26em;text-transform:uppercase}" +
      R + ".ldr-pfaq__item{border-top:1px solid #D8CDBA;border-bottom:0}" +
      R + ".ldr-pfaq__item:last-child{border-bottom:1px solid #D8CDBA}" +
      R + ".ldr-pfaq__q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 4px;margin:0;background:none;border:0;border-radius:0;cursor:pointer;text-align:left;line-height:1.4;font-family:var(--body-font,inherit)}" +
      R + ".ldr-pfaq__ic{position:relative;display:block;flex:0 0 14px;width:14px;height:14px}" +
      R + ".ldr-pfaq__ic::before," + R + ".ldr-pfaq__ic::after{content:\"\";position:absolute;background:currentColor;transform:none;transition:transform .3s}" +
      R + ".ldr-pfaq__ic::before{top:6px;left:0;width:14px;height:1.5px}" +
      R + ".ldr-pfaq__ic::after{top:0;left:6px;width:1.5px;height:14px}" +
      R + ".ldr-pfaq__item.is-open .ldr-pfaq__ic::after{transform:scaleY(0)}" +
      R + ".ldr-pfaq__a{overflow:hidden;max-height:0;transition:max-height .35s ease}" +
      R + ".ldr-pfaq__a-in{padding:0 4px 24px;font-family:var(--body-font,inherit);font-weight:300;line-height:1.75}" +
      "@media (max-width:768px){" + R + ".ldr-pfaq{padding:50px 18px}}";
    var st = document.createElement("style");
    st.id = "ldr-pfaq-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function itemHtml(set, item, idx) {
    var color = set.textColor || "#1a1a1a";
    var qSize = (parseInt(set.textSizePregunta, 10) || 15) + "px";
    var aSize = (parseInt(set.textSizeRespuesta, 10) || 14) + "px";
    // Sin negrita = 500, el peso que usa Ecomclub (se ve "normal" con la
    // tipografia del theme). Con negrita = 600.
    var qWeight = set.textBold === false ? "500" : "600";
    var aColor = set.answerColor || "#564E44";
    return (
      '<div class="ldr-pfaq__item" data-idx="' + idx + '">' +
        '<button type="button" class="ldr-pfaq__q" style="color:' + color + ';font-size:' + qSize + ";font-weight:" + qWeight + '">' +
          "<span>" + esc(item.pregunta) + "</span>" +
          '<span class="ldr-pfaq__ic" style="color:' + (set.accentColor || "#a87c4f") + '"></span>' +
        "</button>" +
        '<div class="ldr-pfaq__a">' +
          '<div class="ldr-pfaq__a-in" style="color:' + aColor + ";font-size:" + aSize + '">' + esc(item.respuesta) + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function buildHtml(set) {
    var items = (set.items || []).filter(function (it) { return it && it.pregunta && it.respuesta; });
    if (!items.length) return "";
    var eyebrowSize = (parseInt(set.textSizeEyebrow, 10) || 10) + "px";
    var eyebrowHtml = set.eyebrow
      ? '<p class="ldr-pfaq__eyebrow" style="color:' + (set.accentColor || "#a87c4f") + ";font-size:" + eyebrowSize + '">' + esc(set.eyebrow) + "</p>"
      : "";
    var itemsHtml = items.map(function (it, i) { return itemHtml(set, it, i); }).join("");
    return (
      '<div id="ldr-pdp-faq-mod" data-set="' + esc(set.id) + '">' +
        '<section class="ldr-pfaq" style="background:' + (set.bgColor || "#ffffff") + '">' +
          '<div class="ldr-pfaq__wrap">' +
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
    // Si ya existe un #ldr-pdp-faq-mod: si tiene data-set es nuestro (ya
    // insertado, no duplicar). Si no lo tiene, es el placeholder vacio que
    // dejo el FAQ viejo de Ecomclub en la plantilla de producto (mismo id,
    // display:none) — se quita para que no bloquee la insercion.
    var existente = document.getElementById("ldr-pdp-faq-mod");
    if (existente) {
      if (existente.getAttribute("data-set")) return; // ya insertado
      existente.parentNode.removeChild(existente);
    }
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
