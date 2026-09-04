/**
 * pdp-bullets.js — generado automaticamente por SyncPropio (panel de Modulos Custom > Bullets)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-09-04 15:42:58
 */
(function () {
  "use strict";
  var SETS = [
  {
    "id": "piel-de-oveja-muflon-corderito-natural-80x45cm-cl",
    "activo": true,
    "stores": [
      "cl"
    ],
    "alcance": {
      "tipo": "producto",
      "valores": [
        "340096653",
        "340096334"
      ],
      "labels": [
        {
          "id": "340096653",
          "nombre": "Piel De Oveja Muflón Corderito Natural - 80x45cm"
        },
        {
          "id": "340096334",
          "nombre": "Alfombra De Piel De Oveja Natural DUO - 160x45cm"
        }
      ]
    },
    "anchor_selector": "#product_form",
    "anchor_position": "before",
    "bullets": [
      "Autenticidad: Piel de oveja 100% natural",
      "Decoración Versatil: Usalo como pie de cama, sobre un sillón o butaca",
      "Confort Natural: Hipoalergénica y con termorregulación natural",
      "Pet & Kid Friendly: Super suave y confortable para disfrutar en familia"
    ],
    "accent_color": "#a87c4f",
    "text_color": "#1a1a1a",
    "showDividers": true,
    "dividerColor": "#dfc4aa",
    "iconSize": 15,
    "textSize": 13,
    "dividerWidth": 0.5,
    "textBold": false
  },
  {
    "id": "cuero-de-oveja-ar",
    "activo": true,
    "stores": [
      "ar"
    ],
    "alcance": {
      "tipo": "producto",
      "valores": [
        "337169607"
      ],
      "labels": [
        {
          "id": "337169607",
          "nombre": "Set X2 Cueros De Oveja Natural 70x45 cm"
        }
      ]
    },
    "anchor_selector": "#product_form",
    "anchor_position": "before",
    "bullets": [
      "Autenticidad: Cuero de oveja argentino 100% natural",
      "Decoración Versatil: Usalo como pie de cama, sobre un sillón o butaca",
      "Confort Natural: Hipoalergénica y con termorregulación natural",
      "Pet & Kid Friendly: Super suave y confortable para disfrutar en familia"
    ],
    "accent_color": "#1a1a1a",
    "text_color": "#1a1a1a",
    "showDividers": true,
    "dividerColor": "#e5e5e5",
    "iconSize": 18,
    "textSize": 13,
    "dividerWidth": 1.0,
    "textBold": false
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

  // ─── Contexto de pagina para el alcance (mismo criterio que Countdown:
  // LS.category / LS.product sin verificar 100% contra el DOM real — ver
  // nota en countdown_panel.py. Se agrega un fallback via data-product-id,
  // ya validado en variantes_vinculadas_sync.py, por si LS.product no esta
  // listo todavia cuando corre este script) ─────────────────────────────
  function contextoActual() {
    var tpl = (window.LS && window.LS.template) || null;
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
    return { template: tpl, path: location.pathname || "/", categoriaIds: categoriaIds, productoIds: productoIds };
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

  // Elige, entre todos los sets que matchean tienda + alcance, el mas
  // especifico (Producto > Categoria > Pagina > Todos). Si empatan en
  // especificidad, gana el primero en el orden guardado.
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
    if (document.getElementById("ldr-pblt-style")) return;
    var css =
      ".ldr-pblt__list{list-style:none;margin:16px 0;padding:0;display:flex;flex-direction:column;gap:8px}" +
      ".ldr-pblt__list.ldr-pblt--dividers{gap:0}" +
      ".ldr-pblt__item{display:flex;align-items:flex-start;gap:8px}" +
      ".ldr-pblt__ic{flex-shrink:0;width:18px;height:18px;margin-top:1px}" +
      ".ldr-pblt__ic svg{width:100%;height:100%;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}" +
      ".ldr-pblt__tx{font-size:13px;line-height:1.4}";
    var st = document.createElement("style");
    st.id = "ldr-pblt-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function buildHtml(set) {
    var accent = set.accent_color || "#1a1a1a";
    var textColor = set.text_color || "#1a1a1a";
    var iconSize = set.iconSize || 18;
    var textSize = set.textSize || 13;
    var dividerWidth = set.dividerWidth || 1;
    var fontWeight = set.textBold ? "600" : "400";
    var lista = (set.bullets || []).filter(Boolean);
    var items = lista.map(function (texto) {
      var itemStyle = "";
      if (set.showDividers) {
        var dc = set.dividerColor || "#e5e5e5";
        itemStyle = ' style="padding:9px 0;border-bottom:' + dividerWidth + 'px solid ' + dc + ' !important"';
      }
      return (
        '<li class="ldr-pblt__item"' + itemStyle + '>' +
          '<span class="ldr-pblt__ic" style="stroke:' + accent + ';width:' + iconSize + 'px;height:' + iconSize + 'px">' +
            '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
          '</span>' +
          '<span class="ldr-pblt__tx" style="color:' + textColor + ';font-size:' + textSize + 'px;font-weight:' + fontWeight + '">' + esc(texto) + '</span>' +
        '</li>'
      );
    }).join("");
    if (!items) return "";
    var listClass = "ldr-pblt__list" + (set.showDividers ? " ldr-pblt--dividers" : "");
    var listStyle = "";
    if (set.showDividers) {
      var dcTop = set.dividerColor || "#e5e5e5";
      listStyle = ' style="gap:0;border-top:' + dividerWidth + 'px solid ' + dcTop + ' !important"';
    }
    return '<div id="ldr-pdp-bullets-mod" data-set="' + esc(set.id) + '"><ul class="' + listClass + '"' + listStyle + '>' + items + '</ul></div>';
  }

  // Mismo patron de reintento (40 x 150ms) ya validado en produccion en
  // modulos_custom_panel.py / variantes_vinculadas_sync.py / countdown.js,
  // porque el theme hidrata #product_form despues del DOMContentLoaded.
  function insertar(set, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    if (document.getElementById("ldr-pdp-bullets-mod")) return; // ya insertado
    var selector = set.anchor_selector || "#product_form";
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
    var pos = set.anchor_position || "before";
    if (pos === "after") anchor.parentNode.insertBefore(node, anchor.nextSibling);
    else if (pos === "prepend") anchor.insertBefore(node, anchor.firstChild);
    else if (pos === "append") anchor.appendChild(node);
    else anchor.parentNode.insertBefore(node, anchor); // "before" (default)
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
