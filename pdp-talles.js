/**
 * pdp-talles.js — generado automaticamente por SyncPropio (panel de Modulos Custom > PDP - Guia de talles)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-09-09 13:52:12
 */
(function () {
  "use strict";
  var SETS = [];

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

  // El titulo de cada modal admite <em>...</em> literal (para la palabra en
  // cursiva). Se escapa todo como siempre y despues se "desescapan" solo
  // esos dos tags puntuales — nunca HTML arbitrario (mismo criterio que
  // pdp-unboxing.js).
  function escTitulo(s) {
    var out = esc(s);
    out = out.replace(/&lt;em&gt;/g, "<em>").replace(/&lt;\/em&gt;/g, "</em>");
    return out;
  }

  // Mismo criterio de contexto que pdp-faq.js / pdp-bullets.js / pdp-unboxing.js.
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
    if (document.getElementById("ldr-talles-style")) return;
    var css =
      ".ldr-talles__triggers{display:flex;gap:10px;width:100%;margin:12px 0;font-family:inherit}" +
      "@media (max-width:480px){.ldr-talles__triggers.ldr-talles__stack-mobile{flex-direction:column}}" +
      ".ldr-talles__trigger{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:13px 12px;border:1.5px solid;border-radius:9px;background:#fff;cursor:pointer;font-size:14px;font-family:inherit;line-height:1.2}" +
      ".ldr-talles__trigger:hover{background:rgba(0,0,0,.03)}" +
      ".ldr-talles__ic{width:16px;height:16px;flex-shrink:0}" +
      ".ldr-talles__ic svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.6}" +
      "@media (max-width:480px){.ldr-talles__lab{font-size:12px}}" +

      ".ldr-talles__overlay{position:fixed;inset:0;background:rgba(20,15,11,.55);z-index:9997;display:none;align-items:center;justify-content:center;padding:20px}" +
      ".ldr-talles__overlay.is-open{display:flex}" +
      ".ldr-talles__dialog{position:relative;background:#fff;border-radius:10px;max-width:420px;width:100%;max-height:86vh;overflow-y:auto;padding:36px 32px;box-sizing:border-box;font-family:inherit}" +
      ".ldr-talles__dialog--wide{max-width:560px}" +
      ".ldr-talles__close{position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:50%;border:1px solid rgba(0,0,0,.15);background:#fff;cursor:pointer;font-size:16px;line-height:1;color:#333}" +
      ".ldr-talles__eyebrow{margin:0 0 6px;text-align:center;letter-spacing:.14em;text-transform:uppercase;font-size:11px;font-weight:600;font-family:inherit}" +
      ".ldr-talles__title{margin:0 0 18px;text-align:center;font-size:26px;font-weight:400;font-family:inherit;line-height:1.2}" +
      ".ldr-talles__title em{font-style:italic}" +
      ".ldr-talles--no-italic .ldr-talles__title em{font-style:normal}" +
      ".ldr-talles__intro{margin:0 0 18px;font-size:14px;line-height:1.5;text-align:center;color:#555;font-family:inherit}" +
      ".ldr-talles__table{width:100%;border-collapse:collapse;font-size:14px;margin-bottom:14px}" +
      ".ldr-talles__table th{text-align:center;padding:10px 10px 16px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:#777}" +
      ".ldr-talles__table td{text-align:center;padding:15px 10px;font-size:16px;border-top:1px solid rgba(0,0,0,.1)}" +
      ".ldr-talles__note{margin:6px 0 0;font-size:12px;color:#888;text-align:center;line-height:1.5;font-family:inherit}" +
      ".ldr-talles__field{margin:0 0 16px}" +
      ".ldr-talles__flabel{display:block;font-size:12px;color:#666;margin-bottom:6px;font-family:inherit}" +
      ".ldr-talles__input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid rgba(0,0,0,.18) !important;border-radius:6px;font-size:15px;font-family:inherit;background:#fff !important}" +
      ".ldr-talles__calc{width:100%;padding:13px;border:none;border-radius:6px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-family:inherit}" +
      ".ldr-talles__result{display:none;margin-top:18px;padding:18px;border-radius:8px;text-align:center;background:rgba(0,0,0,.035)}" +
      ".ldr-talles__result.show{display:block}" +
      ".ldr-talles__result-lab{margin:0 0 4px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#888;font-family:inherit}" +
      ".ldr-talles__result-talle{margin:0 0 6px;font-size:38px;font-weight:600;font-family:inherit}" +
      ".ldr-talles__result-note{margin:0;font-size:12px;color:#888;font-family:inherit}";
    var st = document.createElement("style");
    st.id = "ldr-talles-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // Estilo de bordes: "cuadrado" (mas angular) o "redondeado" (default,
  // como venia el modulo). Elegible desde el panel, no hardcodeado.
  function radioPx(set) {
    return set.bordesEstilo === "cuadrado" ? 4 : 10;
  }

  function triggersHtml(set) {
    var accent = set.accentColor || "#a87c4f";
    var r = radioPx(set);
    var partes = [];
    if (set.calcHabilitado) {
      partes.push(
        '<button type="button" class="ldr-talles__trigger" id="ldr-talles-calc-open" style="color:' + accent + ';border-color:' + accent + ';border-radius:' + r + 'px">' +
          '<span class="ldr-talles__ic"><svg viewBox="0 0 24 24"><path d="M3 7h18v10H3z"/><path d="M7 7v3M11 7v3M15 7v3M19 7v3"/></svg></span>' +
          '<span class="ldr-talles__lab">' + esc(set.botonCalcLabel || "Calculá tu talle") + "</span>" +
        "</button>"
      );
    }
    partes.push(
      '<button type="button" class="ldr-talles__trigger" id="ldr-talles-guia-open" style="color:' + accent + ';border-color:' + accent + ';border-radius:' + r + 'px">' +
        '<span class="ldr-talles__ic"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/></svg></span>' +
        '<span class="ldr-talles__lab">' + esc(set.botonGuiaLabel || "Guía de talles") + "</span>" +
      "</button>"
    );
    var wrapClass = "ldr-talles__triggers" + (set.stackMobile ? " ldr-talles__stack-mobile" : "");
    return '<div id="ldr-pdp-talles-mod" data-set="' + esc(set.id) + '"><div class="' + wrapClass + '">' + partes.join("") + "</div></div>";
  }

  function tableHtml(set) {
    var headers = (set.headers || []).filter(Boolean);
    var rows = (set.rows || []).filter(function (r) { return r && r.length; });
    if (!headers.length || !rows.length) return "";
    var thead = "<tr>" + headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr>";
    var tbody = rows.map(function (r) {
      return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
    }).join("");
    return '<table class="ldr-talles__table"><thead>' + thead + "</thead><tbody>" + tbody + "</tbody></table>";
  }

  function guiaModalHtml(set, wrapClass) {
    var table = tableHtml(set);
    if (!table) return "";
    return (
      '<div class="ldr-talles__overlay ' + wrapClass + '" id="ldr-talles-guia-modal">' +
        '<div class="ldr-talles__dialog ldr-talles__dialog--wide">' +
          '<button type="button" class="ldr-talles__close" id="ldr-talles-guia-close" aria-label="Cerrar">&times;</button>' +
          (set.eyebrowGuia ? '<p class="ldr-talles__eyebrow" style="color:' + (set.accentColor || "#a87c4f") + '">' + esc(set.eyebrowGuia) + "</p>" : "") +
          '<h3 class="ldr-talles__title" style="color:' + (set.textColor || "#1a1a1a") + '">' + escTitulo(set.tituloGuia || "Guía de talles") + "</h3>" +
          table +
          (set.notaGuia ? '<p class="ldr-talles__note">' + esc(set.notaGuia) + "</p>" : "") +
        "</div>" +
      "</div>"
    );
  }

  function calcModalHtml(set, wrapClass) {
    if (!set.calcHabilitado) return "";
    return (
      '<div class="ldr-talles__overlay ' + wrapClass + '" id="ldr-talles-calc-modal">' +
        '<div class="ldr-talles__dialog">' +
          '<button type="button" class="ldr-talles__close" id="ldr-talles-calc-close" aria-label="Cerrar">&times;</button>' +
          (set.eyebrowCalc ? '<p class="ldr-talles__eyebrow" style="color:' + (set.accentColor || "#a87c4f") + '">' + esc(set.eyebrowCalc) + "</p>" : "") +
          '<h3 class="ldr-talles__title" style="color:' + (set.textColor || "#1a1a1a") + '">' + escTitulo(set.tituloCalc || "Calculá tu talle") + "</h3>" +
          (set.introCalc ? '<p class="ldr-talles__intro">' + esc(set.introCalc) + "</p>" : "") +
          '<div class="ldr-talles__field">' +
            '<label class="ldr-talles__flabel" for="ldr-talles-calc-input">Largo del pie (cm)</label>' +
            '<input type="number" inputmode="decimal" step="0.1" class="ldr-talles__input" id="ldr-talles-calc-input" placeholder="Ej: 25.5">' +
          "</div>" +
          '<button type="button" class="ldr-talles__calc" id="ldr-talles-calc-btn" style="background:' + (set.botonBgColor || "#1a1a1a") + ";color:" + (set.botonTextColor || "#ffffff") + '">' + esc(set.botonCalcularTexto || "Calcular mi talle") + "</button>" +
          '<div class="ldr-talles__result" id="ldr-talles-calc-result">' +
            '<p class="ldr-talles__result-lab">' + esc(set.resultadoLabel || "Tu talle sugerido") + "</p>" +
            '<p class="ldr-talles__result-talle" id="ldr-talles-calc-out" style="color:' + (set.textColor || "#1a1a1a") + '"></p>' +
            '<p class="ldr-talles__result-note" id="ldr-talles-calc-note"></p>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function calcularTalle(set, cm) {
    var mapa = set.calcMapa || [];
    for (var i = 0; i < mapa.length; i++) {
      var r = mapa[i];
      var min = parseFloat(r.min), max = parseFloat(r.max);
      if (!isNaN(min) && !isNaN(max) && cm >= min && cm <= max) return r.talle;
    }
    return null;
  }

  function bindModals(set) {
    var guiaModal = document.getElementById("ldr-talles-guia-modal");
    var calcModal = document.getElementById("ldr-talles-calc-modal");
    var guiaOpen = document.getElementById("ldr-talles-guia-open");
    var calcOpen = document.getElementById("ldr-talles-calc-open");

    function abrir(modal) { if (modal) modal.classList.add("is-open"); }
    function cerrar(modal) { if (modal) modal.classList.remove("is-open"); }

    if (guiaOpen && guiaModal) guiaOpen.addEventListener("click", function () { abrir(guiaModal); });
    if (calcOpen && calcModal) calcOpen.addEventListener("click", function () { abrir(calcModal); });

    [guiaModal, calcModal].forEach(function (modal) {
      if (!modal) return;
      modal.addEventListener("click", function (e) { if (e.target === modal) cerrar(modal); });
      var closeBtn = modal.querySelector(".ldr-talles__close");
      if (closeBtn) closeBtn.addEventListener("click", function () { cerrar(modal); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { cerrar(guiaModal); cerrar(calcModal); }
    });

    if (calcModal) {
      var btn = document.getElementById("ldr-talles-calc-btn");
      var input = document.getElementById("ldr-talles-calc-input");
      var resultBox = document.getElementById("ldr-talles-calc-result");
      var out = document.getElementById("ldr-talles-calc-out");
      var note = document.getElementById("ldr-talles-calc-note");
      if (btn) {
        btn.addEventListener("click", function () {
          var cm = parseFloat((input.value || "").replace(",", "."));
          if (isNaN(cm) || cm <= 0) return;
          var talle = calcularTalle(set, cm);
          if (talle) {
            out.textContent = talle;
            note.textContent = "Según tu medida de " + cm + " cm.";
          } else {
            out.textContent = "-";
            note.textContent = set.fueraRangoTexto || "No encontramos un talle exacto para esa medida.";
          }
          resultBox.classList.add("show");
        });
      }
    }
  }

  // Mismo patron de reintento (40 x 150ms) ya validado en produccion en
  // pdp-faq.js / pdp-bullets.js / pdp-unboxing.js, porque el theme hidrata
  // el DOM de producto despues del DOMContentLoaded.
  function insertar(set, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    if (document.getElementById("ldr-pdp-talles-mod")) return; // ya insertado
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
    else anchor.parentNode.insertBefore(trigNode, anchor.nextSibling); // "after"

    // Los modales se appendean a <body> (overlay position:fixed) — nunca
    // adentro del <form>, para no arrastrar problemas de overflow/scroll
    // del theme y para poder usar position:fixed sin contexto raro.
    var wrapClass = set.quitarCursiva ? "ldr-talles--no-italic" : "";
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
