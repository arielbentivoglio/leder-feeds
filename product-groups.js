/**
 * product-groups.js - generado automaticamente por SyncPropio (Variantes Vinculadas)
 * No editar a mano: se pisa en la proxima publicacion desde el panel.
 * Generado: 2026-08-31T15:48:24.438485
 */
(function () {
  "use strict";
  var DATA = {"ar": {"activo_global": true, "excluidos_widget": [], "anchor_selector": "#product_form", "anchor_posicion": "after", "grupos": {"bolsos-de-viaje": {"label": "Bolsos de Viaje", "habilitado": true, "productos": [{"product_id": 332933689, "label": "Bolso De Viaje De Cuero Vacuno con Pelo - Holando", "url": "https://lederhd.com/productos/bolso-de-viaje-de-cuero-vacuno-con-pelo-holando/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-holando-1-50254129be82e06de217763473132246-1024-1024.jpg"}, {"product_id": 332936678, "label": "Bolso De Viaje De Cuero Vacuno con Pelo - Hereford", "url": "https://lederhd.com/productos/bolso-de-viaje-de-cuero-vacuno-con-pelo-hereford/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-hereford-1-5499199e6e382582fe17763473648058-1024-1024.jpg"}, {"product_id": 348788464, "label": "Bolso De Viaje De Cuero Vacuno - Azul", "url": "https://lederhd.com/productos/bolso-de-viaje-de-cuero-vacuno-azul/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-azul-1-66376959c3721f720317811025464121-1024-1024.png"}, {"product_id": 349166046, "label": "Bolso De Viaje De Cuero Vacuno -Beige Claro", "url": "https://lederhd.com/productos/bolso-de-viaje-de-cuero-vacuno-beige-claro/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-beige-claro-1-dc431702e8446eff3717811026260863-1024-1024.png"}, {"product_id": 349166770, "label": "Bolso De Viaje De Cuero Vacuno - Marrón", "url": "https://lederhd.com/productos/bolso-de-viaje-de-cuero-vacuno-marron/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-marron1-b8c667931587559b3917811026649719-1024-1024.png"}, {"product_id": 349167716, "label": "Bolso De Viaje De Cuero Vacuno - Vintage Dark", "url": "https://lederhd.com/productos/bolso-de-viaje-de-cuero-vacuno-vintage-dark/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-vintage-1-2ef58f78d83b65f20d17811055765049-1024-1024.png"}, {"product_id": 349169020, "label": "Bolso De Viaje De Cuero Vacuno - Blanco", "url": "https://lederhd.com/productos/bolso-de-viaje-de-cuero-vacuno-blanco/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-tiza-1-f6a3f512618365f7b717811055457510-1024-1024.png"}, {"product_id": 349169893, "label": "Bolso De Viaje De Cuero Vacuno - Negro", "url": "https://lederhd.com/productos/bolso-de-viaje-de-cuero-vacuno-negro/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/boslso-negro-1-e9f80d95b1df9f624717811055143066-1024-1024.png"}]}, "bolso-peak": {"label": "Bolso Peak", "habilitado": true, "productos": [{"product_id": 353636734, "label": "Bolso De Cuero Vacuno Peak - Black", "url": "https://lederhd.com/productos/bolso-de-viaje-peak-de-cuero-vacuno-black/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-peak-black-1-planchar-fbaaf144464d33de2c17830835369124-1024-1024.webp"}, {"product_id": 353777968, "label": "Bolso De Cuero Vacuno Peak - Dark Brown", "url": "https://lederhd.com/productos/bolso-de-viaje-peak-de-cuero-vacuno-dark-brown-1cfko/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/bolso-peak-chocolate-1-planchar-d984489ea8e9e9ad3217830833620098-1024-1024.webp"}]}}}, "cl": {"activo_global": false, "excluidos_widget": [], "anchor_selector": "#product_form", "anchor_posicion": "after", "grupos": {}}};

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
