/**
 * pdp-talles-indumentaria.js — generado automaticamente por SyncPropio (panel de Modulos Custom > PDP - Guia de talles Indumentaria)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-09-09 16:42:53
 */
(function () {
  "use strict";
  var SETS = [
  {
    "id": "saco-de-cuero-nairobi-black",
    "activo": true,
    "stores": [
      "ar"
    ],
    "alcance": {
      "tipo": "producto",
      "valores": [
        "334201485"
      ],
      "labels": [
        {
          "id": "334201485",
          "nombre": "Saco De Cuero Nairobi-Black"
        }
      ]
    },
    "anchorSelector": ".js-product-variants",
    "anchorPosition": "before",
    "botonCalcLabel": "Calculá tu talle",
    "botonGuiaLabel": "Guía de talles",
    "calcHabilitado": true,
    "eyebrowGuia": "Guía de talles",
    "tituloGuia": "Tabla de <em>talles</em>",
    "colHeaderMedida": "Medida (cm)",
    "sizeHeaders": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rows": [
      {
        "label": "A - Busto",
        "cells": [
          "85",
          "92",
          "95",
          "98",
          "103"
        ]
      },
      {
        "label": "B - Cintura",
        "cells": [
          "80",
          "82",
          "90",
          "92",
          "92"
        ]
      },
      {
        "label": "C - Ruedo",
        "cells": [
          "103",
          "106",
          "112",
          "116",
          "118"
        ]
      },
      {
        "label": "D - Largo",
        "cells": [
          "63",
          "65",
          "67",
          "69",
          "70"
        ]
      }
    ],
    "notaGuia": "Medidas de la prenda en cm.",
    "eyebrowCalc": "Probador virtual",
    "tituloCalc": "Calculá tu <em>talle</em>",
    "introCalc": "Cargá las medidas (en cm) y te sugerimos el talle que mejor coincide. Mirá la guía de talles para ver dónde se toma cada una.",
    "botonCalcularTexto": "Calcular mi talle",
    "resultadoLabel": "Tu talle sugerido",
    "fueraRangoTexto": "No encontramos un talle exacto para esas medidas.",
    "sinDatosTexto": "Completá al menos una medida para calcular tu talle.",
    "accentColor": "#a87c4f",
    "textColor": "#1a1a1a",
    "botonBgColor": "#1a1a1a",
    "botonTextColor": "#ffffff",
    "bordesEstilo": "cuadrado",
    "stackMobile": true,
    "quitarCursiva": false
  }
];
  var DIAGRAM_URL = "https://arielbentivoglio.github.io/leder-feeds/talles-guia-cuerpo.webp";

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

  function escTitulo(s) {
    var out = esc(s);
    out = out.replace(/&lt;em&gt;/g, "<em>").replace(/&lt;\/em&gt;/g, "</em>");
    return out;
  }

  // Mismo criterio de contexto que pdp-talles.js (Calzado) / pdp-faq.js / etc.
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
    return 1;
  }

  function matchesAlcance(set, ctx) {
    var al = set.alcance || { tipo: "todos", valores: [] };
    if (al.tipo === "todos") return true;
    var vals = (al.valores || []).map(function (v) { return String(v).toLowerCase().trim(); }).filter(Boolean);
    if (!vals.length) return false;
    if (al.tipo === "categoria") return ctx.categoriaIds.some(function (id) { return vals.indexOf(id) !== -1; });
    if (al.tipo === "producto") return ctx.productoIds.some(function (id) { return vals.indexOf(id) !== -1; });
    if (al.tipo === "pagina") {
      return vals.some(function (v) {
        if (v.charAt(v.length - 1) === "*") return ctx.path.indexOf(v.slice(0, -1)) === 0;
        return ctx.path === v || ctx.path === (v + "/");
      });
    }
    return false;
  }

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

  function radioPx(set) {
    return set.bordesEstilo === "cuadrado" ? 4 : 10;
  }

  function injectStyle() {
    if (document.getElementById("ldr-tind-style")) return;
    var css =
      ".ldr-tind__triggers{display:flex;gap:10px;width:100%;margin:12px 0;font-family:inherit}" +
      "@media (max-width:480px){.ldr-tind__triggers.ldr-tind__stack-mobile{flex-direction:column}}" +
      ".ldr-tind__trigger{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:13px 12px;border:1.5px solid;border-radius:9px;background:#fff;cursor:pointer;font-size:14px;font-family:inherit;line-height:1.2}" +
      ".ldr-tind__trigger:hover{background:rgba(0,0,0,.03)}" +
      ".ldr-tind__ic{width:16px;height:16px;flex-shrink:0}" +
      ".ldr-tind__ic svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.6}" +
      "@media (max-width:480px){.ldr-tind__lab{font-size:12px}}" +

      ".ldr-tind__overlay{position:fixed;inset:0;background:rgba(20,15,11,.55);z-index:9997;display:none;align-items:center;justify-content:center;padding:20px}" +
      ".ldr-tind__overlay.is-open{display:flex}" +
      ".ldr-tind__dialog{position:relative;background:#fff;border-radius:10px;max-width:420px;width:100%;max-height:88vh;overflow-y:auto;padding:36px 32px;box-sizing:border-box;font-family:inherit}" +
      ".ldr-tind__dialog--wide{max-width:640px}" +
      ".ldr-tind__close{position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:50%;border:1px solid rgba(0,0,0,.15);background:#fff;cursor:pointer;font-size:16px;line-height:1;color:#333;z-index:1}" +
      ".ldr-tind__eyebrow{margin:0 0 6px;text-align:center;letter-spacing:.14em;text-transform:uppercase;font-size:11px;font-weight:600;font-family:inherit}" +
      ".ldr-tind__title{margin:0 0 18px;text-align:center;font-size:26px;font-weight:400;font-family:inherit;line-height:1.2}" +
      ".ldr-tind__title em{font-style:italic}" +
      ".ldr-tind--no-italic .ldr-tind__title em{font-style:normal}" +
      ".ldr-tind__intro{margin:0 0 20px;font-size:14px;line-height:1.5;text-align:center;color:#555;font-family:inherit}" +

      ".ldr-tind__table{width:100%;border-collapse:collapse;font-size:14px;margin-bottom:14px}" +
      ".ldr-tind__table th{text-align:center;padding:10px 8px 16px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:11px;color:#777}" +
      ".ldr-tind__table th:first-child{text-align:left}" +
      ".ldr-tind__table td{text-align:center;padding:13px 8px;font-size:15px;border-top:1px solid rgba(0,0,0,.1)}" +
      ".ldr-tind__table td:first-child{text-align:left;font-weight:600}" +
      ".ldr-tind__note{margin:6px 0 0;font-size:12px;color:#888;text-align:center;line-height:1.5;font-family:inherit}" +

      ".ldr-tind__prodname{margin:0 0 16px;text-align:center;font-size:15px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;font-family:inherit}" +
      ".ldr-tind__diagram{display:flex;gap:24px;align-items:center;margin:0 0 22px;flex-wrap:wrap}" +
      ".ldr-tind__diagram img{max-width:190px;height:auto;flex-shrink:0}" +
      ".ldr-tind__legend{flex:1;min-width:160px}" +
      ".ldr-tind__legend div{padding:7px 0;border-bottom:1px solid rgba(0,0,0,.08);font-size:13px}" +
      ".ldr-tind__legend div:last-child{border-bottom:none}" +
      ".ldr-tind__legend-note{margin:8px 0 0;font-size:11px;color:#999}" +

      ".ldr-tind__fields{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:8px}" +
      "@media (max-width:420px){.ldr-tind__fields{grid-template-columns:1fr}}" +
      ".ldr-tind__field{margin:0}" +
      ".ldr-tind__flabel{display:block;font-size:12px;color:#666;margin-bottom:6px;font-family:inherit}" +
      ".ldr-tind__input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid rgba(0,0,0,.18) !important;border-radius:6px;font-size:15px;font-family:inherit;background:#fff !important}" +
      ".ldr-tind__calc{width:100%;padding:13px;border:none;border-radius:6px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-family:inherit;margin-top:8px}" +
      ".ldr-tind__result{display:none;margin-top:18px;padding:18px;border-radius:8px;text-align:center;background:rgba(0,0,0,.035)}" +
      ".ldr-tind__result.show{display:block}" +
      ".ldr-tind__result-lab{margin:0 0 4px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#888;font-family:inherit}" +
      ".ldr-tind__result-talle{margin:0 0 6px;font-size:38px;font-weight:600;font-family:inherit}" +
      ".ldr-tind__result-note{margin:0;font-size:12px;color:#888;font-family:inherit}";
    var st = document.createElement("style");
    st.id = "ldr-tind-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function triggersHtml(set) {
    var accent = set.accentColor || "#a87c4f";
    var r = radioPx(set);
    var partes = [];
    if (set.calcHabilitado) {
      partes.push(
        '<button type="button" class="ldr-tind__trigger" id="ldr-tind-calc-open" style="color:' + accent + ';border-color:' + accent + ';border-radius:' + r + 'px">' +
          '<span class="ldr-tind__ic"><svg viewBox="0 0 24 24"><path d="M3 7h18v10H3z"/><path d="M7 7v3M11 7v3M15 7v3M19 7v3"/></svg></span>' +
          '<span class="ldr-tind__lab">' + esc(set.botonCalcLabel || "Calculá tu talle") + "</span>" +
        "</button>"
      );
    }
    partes.push(
      '<button type="button" class="ldr-tind__trigger" id="ldr-tind-guia-open" style="color:' + accent + ';border-color:' + accent + ';border-radius:' + r + 'px">' +
        '<span class="ldr-tind__ic"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/></svg></span>' +
        '<span class="ldr-tind__lab">' + esc(set.botonGuiaLabel || "Guía de talles") + "</span>" +
      "</button>"
    );
    var wrapClass = "ldr-tind__triggers" + (set.stackMobile ? " ldr-tind__stack-mobile" : "");
    return '<div id="ldr-pdp-talles-ind-mod" data-set="' + esc(set.id) + '"><div class="' + wrapClass + '">' + partes.join("") + "</div></div>";
  }

  function matrixTableHtml(set) {
    var sizes = (set.sizeHeaders || []).filter(Boolean);
    var rows = (set.rows || []).filter(function (r) { return r && r.label && (r.cells || []).length; });
    if (!sizes.length || !rows.length) return "";
    var thead = "<tr><th>" + esc(set.colHeaderMedida || "Medida (cm)") + "</th>" +
      sizes.map(function (s) { return "<th>" + esc(s) + "</th>"; }).join("") + "</tr>";
    var tbody = rows.map(function (r) {
      return "<tr><td>" + esc(r.label) + "</td>" +
        sizes.map(function (_, i) { return "<td>" + esc((r.cells || [])[i] != null ? r.cells[i] : "") + "</td>"; }).join("") +
      "</tr>";
    }).join("");
    return '<table class="ldr-tind__table"><thead>' + thead + "</thead><tbody>" + tbody + "</tbody></table>";
  }

  function guiaModalHtml(set, wrapClass) {
    var table = matrixTableHtml(set);
    if (!table) return "";
    return (
      '<div class="ldr-tind__overlay ' + wrapClass + '" id="ldr-tind-guia-modal">' +
        '<div class="ldr-tind__dialog ldr-tind__dialog--wide">' +
          '<button type="button" class="ldr-tind__close" id="ldr-tind-guia-close" aria-label="Cerrar">&times;</button>' +
          (set.eyebrowGuia ? '<p class="ldr-tind__eyebrow" style="color:' + (set.accentColor || "#a87c4f") + '">' + esc(set.eyebrowGuia) + "</p>" : "") +
          '<h3 class="ldr-tind__title" style="color:' + (set.textColor || "#1a1a1a") + '">' + escTitulo(set.tituloGuia || "Guía de talles") + "</h3>" +
          table +
          (set.notaGuia ? '<p class="ldr-tind__note">' + esc(set.notaGuia) + "</p>" : "") +
        "</div>" +
      "</div>"
    );
  }

  // "A - Busto" -> "Busto (cm)". Si no matchea el patron "letra - nombre",
  // usa el label entero tal cual (+ " (cm)").
  function fieldLabelFromRowLabel(label) {
    var m = /^[^-]{1,3}-\s*(.+)$/.exec(label || "");
    var base = m ? m[1].trim() : (label || "").trim();
    return base + " (cm)";
  }

  function calcModalHtml(set, wrapClass) {
    if (!set.calcHabilitado) return "";
    var rows = (set.rows || []).filter(function (r) { return r && r.label; });
    var fieldsHtml = rows.map(function (r, i) {
      return (
        '<div class="ldr-tind__field">' +
          '<label class="ldr-tind__flabel" for="ldr-tind-calc-input-' + i + '">' + esc(fieldLabelFromRowLabel(r.label)) + "</label>" +
          '<input type="number" inputmode="decimal" step="0.1" class="ldr-tind__input" id="ldr-tind-calc-input-' + i + '" data-row="' + i + '" placeholder="cm">' +
        "</div>"
      );
    }).join("");

    var legendItems = ["A) BUSTO", "B) CINTURA", "C) RUEDO", "D) LARGO", "E) MANGA"];
    var legendHtml = legendItems.map(function (t) { return "<div>" + esc(t) + "</div>"; }).join("");

    return (
      '<div class="ldr-tind__overlay ' + wrapClass + '" id="ldr-tind-calc-modal">' +
        '<div class="ldr-tind__dialog ldr-tind__dialog--wide">' +
          '<button type="button" class="ldr-tind__close" id="ldr-tind-calc-close" aria-label="Cerrar">&times;</button>' +
          (set.eyebrowCalc ? '<p class="ldr-tind__eyebrow" style="color:' + (set.accentColor || "#a87c4f") + '">' + esc(set.eyebrowCalc) + "</p>" : "") +
          '<h3 class="ldr-tind__title" style="color:' + (set.textColor || "#1a1a1a") + '">' + escTitulo(set.tituloCalc || "Calculá tu talle") + "</h3>" +
          (set.introCalc ? '<p class="ldr-tind__intro">' + esc(set.introCalc) + "</p>" : "") +
          '<p class="ldr-tind__prodname" id="ldr-tind-prodname"></p>' +
          '<div class="ldr-tind__diagram">' +
            '<img src="' + DIAGRAM_URL + '" alt="Donde tomar cada medida" loading="lazy">' +
            '<div class="ldr-tind__legend">' + legendHtml +
              '<p class="ldr-tind__legend-note">*Medidas en centímetros.</p>' +
            "</div>" +
          "</div>" +
          '<div class="ldr-tind__fields">' + fieldsHtml + "</div>" +
          '<button type="button" class="ldr-tind__calc" id="ldr-tind-calc-btn" style="background:' + (set.botonBgColor || "#1a1a1a") + ";color:" + (set.botonTextColor || "#ffffff") + '">' + esc(set.botonCalcularTexto || "Calcular mi talle") + "</button>" +
          '<div class="ldr-tind__result" id="ldr-tind-calc-result">' +
            '<p class="ldr-tind__result-lab">' + esc(set.resultadoLabel || "Tu talle sugerido") + "</p>" +
            '<p class="ldr-tind__result-talle" id="ldr-tind-calc-out" style="color:' + (set.textColor || "#1a1a1a") + '"></p>' +
            '<p class="ldr-tind__result-note" id="ldr-tind-calc-note"></p>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function nombreProductoActual() {
    try {
      if (window.LS && window.LS.product && window.LS.product.name) return window.LS.product.name;
    } catch (e) {}
    var h1 = document.querySelector(".js-product-name");
    return h1 ? h1.textContent.trim() : "";
  }

  // Por cada fila con valor cargado: talle mas cercano (diferencia absoluta
  // minima) entre las celdas de esa fila. El talle final es el que se
  // repite mas veces entre todas las filas cargadas; en caso de empate,
  // gana el talle mas grande (indice de columna mas alto). Ver nota en el
  // encabezado del archivo sobre esta regla de desempate.
  function calcularTalle(set, valoresPorFila) {
    var sizes = set.sizeHeaders || [];
    var rows = set.rows || [];
    var votos = {};
    var algunaCargada = false;

    for (var i = 0; i < rows.length; i++) {
      var v = parseFloat((valoresPorFila[i] || "").replace(",", "."));
      if (isNaN(v)) continue;
      algunaCargada = true;
      var cells = rows[i].cells || [];
      var mejorIdx = -1, mejorDiff = Infinity;
      for (var j = 0; j < cells.length; j++) {
        var c = parseFloat(cells[j]);
        if (isNaN(c)) continue;
        var diff = Math.abs(c - v);
        if (diff < mejorDiff) { mejorDiff = diff; mejorIdx = j; }
      }
      if (mejorIdx >= 0) votos[mejorIdx] = (votos[mejorIdx] || 0) + 1;
    }

    if (!algunaCargada) return { talle: null, sinDatos: true };

    var mejorIdx = -1, mejorVotos = -1;
    Object.keys(votos).forEach(function (idxStr) {
      var idx = parseInt(idxStr, 10);
      var v = votos[idxStr];
      if (v > mejorVotos || (v === mejorVotos && idx > mejorIdx)) { mejorVotos = v; mejorIdx = idx; }
    });

    if (mejorIdx < 0 || !sizes[mejorIdx]) return { talle: null, sinDatos: false };
    return { talle: sizes[mejorIdx], sinDatos: false };
  }

  function bindModals(set) {
    var guiaModal = document.getElementById("ldr-tind-guia-modal");
    var calcModal = document.getElementById("ldr-tind-calc-modal");
    var guiaOpen = document.getElementById("ldr-tind-guia-open");
    var calcOpen = document.getElementById("ldr-tind-calc-open");

    function abrir(modal) { if (modal) modal.classList.add("is-open"); }
    function cerrar(modal) { if (modal) modal.classList.remove("is-open"); }

    if (guiaOpen && guiaModal) guiaOpen.addEventListener("click", function () { abrir(guiaModal); });
    if (calcOpen && calcModal) {
      calcOpen.addEventListener("click", function () {
        var pn = document.getElementById("ldr-tind-prodname");
        if (pn) pn.textContent = nombreProductoActual();
        abrir(calcModal);
      });
    }

    [guiaModal, calcModal].forEach(function (modal) {
      if (!modal) return;
      modal.addEventListener("click", function (e) { if (e.target === modal) cerrar(modal); });
      var closeBtn = modal.querySelector(".ldr-tind__close");
      if (closeBtn) closeBtn.addEventListener("click", function () { cerrar(modal); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { cerrar(guiaModal); cerrar(calcModal); }
    });

    if (calcModal) {
      var btn = document.getElementById("ldr-tind-calc-btn");
      var resultBox = document.getElementById("ldr-tind-calc-result");
      var out = document.getElementById("ldr-tind-calc-out");
      var note = document.getElementById("ldr-tind-calc-note");
      if (btn) {
        btn.addEventListener("click", function () {
          var rows = set.rows || [];
          var valores = [];
          for (var i = 0; i < rows.length; i++) {
            var input = document.getElementById("ldr-tind-calc-input-" + i);
            valores.push(input ? input.value : "");
          }
          var r = calcularTalle(set, valores);
          if (r.sinDatos) {
            out.textContent = "-";
            note.textContent = set.sinDatosTexto || "Completá al menos una medida para calcular tu talle.";
          } else if (r.talle) {
            out.textContent = r.talle;
            note.textContent = "Según las medidas ingresadas.";
          } else {
            out.textContent = "-";
            note.textContent = set.fueraRangoTexto || "No encontramos un talle exacto para esas medidas.";
          }
          resultBox.classList.add("show");
        });
      }
    }
  }

  function insertar(set, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    if (document.getElementById("ldr-pdp-talles-ind-mod")) return;
    var selector = set.anchorSelector || ".js-product-variants";
    var anchor = document.querySelector(selector);
    if (!anchor) {
      if (attemptsLeft <= 0) return;
      setTimeout(function () { insertar(set, attemptsLeft - 1); }, 150);
      return;
    }
    injectStyle();

    var trigWrap = document.createElement("div");
    trigWrap.innerHTML = triggersHtml(set);
    var trigNode = trigWrap.firstElementChild;
    var pos = set.anchorPosition || "before";
    if (pos === "before") anchor.parentNode.insertBefore(trigNode, anchor);
    else if (pos === "prepend") anchor.insertBefore(trigNode, anchor.firstChild);
    else if (pos === "append") anchor.appendChild(trigNode);
    else anchor.parentNode.insertBefore(trigNode, anchor.nextSibling);

    var wrapClass = set.quitarCursiva ? "ldr-tind--no-italic" : "";
    var modalsWrap = document.createElement("div");
    modalsWrap.innerHTML = guiaModalHtml(set, wrapClass) + calcModalHtml(set, wrapClass);
    while (modalsWrap.firstElementChild) document.body.appendChild(modalsWrap.firstElementChild);

    bindModals(set);
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
