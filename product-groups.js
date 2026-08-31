/**
 * product-groups.js - generado automaticamente por SyncPropio (Variantes Vinculadas)
 * No editar a mano: se pisa en la proxima publicacion desde el panel.
 * Generado: 2026-08-31T20:53:18.841302
 */
(function () {
  "use strict";
  var DATA = {"ar": {"activo_global": false, "excluidos_widget": [], "anchor_selector": "#product_form", "anchor_posicion": "after", "grupos": {"modelo-de-cartera__alina": {"label": "Alina", "campo": "Modelo de Cartera", "productos": [{"product_id": 1, "label": "Alina Beige", "url": "https://x/1", "img": "i"}, {"product_id": 2, "label": "Alina Negro", "url": "https://x/2", "img": "i"}]}}}, "cl": {"activo_global": false, "excluidos_widget": [], "anchor_selector": "#product_form", "anchor_posicion": "after", "grupos": {}}};

  function getStoreKey() {
    var h = location.hostname || "";
    if (h.indexOf("leder.cl") !== -1) return "cl";
    return "ar";
  }

  var storeData = DATA[getStoreKey()];
  if (!storeData || !storeData.activo_global) return;

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function injectStyle() {
    if (document.getElementById("ldr-vv-style")) return;
    var css =
      ".ldr-vv{margin:16px 0}" +
      ".ldr-vv__label{font-size:13px;margin:0 0 8px;color:#555}" +
      ".ldr-vv__label b{color:#111;font-weight:500}" +
      ".ldr-vv__row{display:flex;gap:8px;flex-wrap:wrap}" +
      ".ldr-vv__item{width:56px;height:56px;border-radius:6px;overflow:hidden;" +
      "border:1px solid #ddd;display:block;text-decoration:none}" +
      ".ldr-vv__item.is-active{border:2px solid #111}" +
      ".ldr-vv__item img{width:100%;height:100%;object-fit:cover;display:block}";
    var st = document.createElement("style");
    st.id = "ldr-vv-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function currentProductId() {
    var el = document.getElementById("single-product") || document.querySelector("[data-store^='product-price']");
    if (el && el.getAttribute("data-product-id")) return parseInt(el.getAttribute("data-product-id"), 10);
    if (window.LS && window.LS.product && window.LS.product.id) return window.LS.product.id;
    return null;
  }

  function findGroupFor(productId) {
    for (var slug in storeData.grupos) {
      var g = storeData.grupos[slug];
      for (var i = 0; i < g.productos.length; i++) {
        if (g.productos[i].product_id === productId) return g;
      }
    }
    return null;
  }

  function insertarEn(el, anchor, posicion) {
    if (posicion === "before") {
      anchor.parentNode.insertBefore(el, anchor);
    } else if (posicion === "prepend") {
      anchor.insertBefore(el, anchor.firstChild);
    } else if (posicion === "append") {
      anchor.appendChild(el);
    } else {
      // "after" (default): insertar como hermano siguiente del anchor
      if (anchor.nextSibling) {
        anchor.parentNode.insertBefore(el, anchor.nextSibling);
      } else {
        anchor.parentNode.appendChild(el);
      }
    }
  }

  function render() {
    if (!window.LS || window.LS.template !== "product") return;
    var pid = currentProductId();
    if (!pid) return;
    if ((storeData.excluidos_widget || []).indexOf(pid) !== -1) return;

    var grupo = findGroupFor(pid);
    if (!grupo || grupo.productos.length < 2) return;

    var selector = storeData.anchor_selector || "#product_form";
    var posicion = storeData.anchor_posicion || "after";
    var anchor = document.querySelector(selector);
    if (!anchor) return;

    injectStyle();

    var wrap = document.createElement("div");
    wrap.className = "ldr-vv";

    var label = document.createElement("p");
    label.className = "ldr-vv__label";
    label.innerHTML = "Otras opciones: <b>" + esc(grupo.label) + "</b>";
    wrap.appendChild(label);

    var row = document.createElement("div");
    row.className = "ldr-vv__row";
    grupo.productos.forEach(function (p) {
      var a = document.createElement("a");
      a.className = "ldr-vv__item" + (p.product_id === pid ? " is-active" : "");
      a.href = p.url;
      a.title = p.label;
      if (p.img) {
        var img = document.createElement("img");
        img.src = p.img;
        img.alt = p.label;
        img.loading = "lazy";
        a.appendChild(img);
      }
      row.appendChild(a);
    });
    wrap.appendChild(row);

    insertarEn(wrap, anchor, posicion);
  }

  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (document.getElementById("product_form") || tries >= 40) {
      clearInterval(iv);
      render();
    }
  }, 150);
})();
