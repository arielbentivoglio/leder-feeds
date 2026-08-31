/**
 * product-groups.js - generado automaticamente por SyncPropio (Variantes Vinculadas)
 * No editar a mano: se pisa en la proxima publicacion desde el panel.
 * Generado: 2026-08-31T14:06:05.701381
 */
(function () {
  "use strict";
  var DATA = {"ar": {"activo_global": true, "excluidos_widget": [336090341, 336090632, 336089743, 336092688, 336092826, 336096954], "grupos": {"tote-milano": {"label": "Tote Milano", "habilitado": true, "productos": [{"product_id": 332638161, "label": "Cartera Tote Milano De Cuero Vacuno Leopardo", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-leopardo/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/tote-leopardo-8df7f29122eabf1abd17691801897583-1024-1024-7733b5cb75dbfc7b9c17784648269140-1024-1024.jpg"}, {"product_id": 332638630, "label": "Cartera Tote Milano De Cuero Vacuno Split", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-split/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/milano-split-1-c28e18ab0ee0f32ea117784644322249-1024-1024.jpg"}, {"product_id": 332937607, "label": "Cartera Tote Milano De Cuero Vacuno - Vintage Dark", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-vintage-dark/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/milano-vd-1-1fbc00d2abf2bf7f8317784650256030-1024-1024.jpg"}, {"product_id": 332951062, "label": "Cartera Tote Milano De Cuero Vacuno Vintage Light", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-vintage-light/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/tote-vl2-c00bf9bec489319f9417784667346254-1024-1024.jpg"}, {"product_id": 336134171, "label": "Cartera Tote Milano De Cuero Vacuno - Brown", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-brown/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/miano-marron-1-94c242c1b0cac39e1717784659259145-1024-1024.jpg"}, {"product_id": 336135674, "label": "Cartera Tote Milano De Cuero Vacuno - Light Beige", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-light-beige/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/tote-beige-claro-1-d9da5c721d06c9689317784655189284-1024-1024.jpg"}, {"product_id": 336139291, "label": "Cartera Tote Milano De Cuero Vacuno - White", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-white/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/tote-tiza-1-87bfe9235b4e25d38717784651457648-1024-1024.jpg"}, {"product_id": 336139382, "label": "Cartera Tote Milano De Cuero Vacuno - Black", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-black/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/milano-negro-1-5280d90e8ad36d5ac417784668631380-1024-1024.jpg"}, {"product_id": 336139450, "label": "Cartera Tote Milano De Cuero Vacuno - Dark Brown", "url": "https://lederhd.com/productos/cartera-tote-milano-de-cuero-vacuno-dark-brown/", "img": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/leder-dia-10046-2-8426188bb7ee239b3317846628787714-1024-1024.png"}]}}}, "cl": {"activo_global": false, "excluidos_widget": [], "grupos": {}}};

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

  function render() {
    if (!window.LS || window.LS.template !== "product") return;
    var pid = currentProductId();
    if (!pid) return;
    if ((storeData.excluidos_widget || []).indexOf(pid) !== -1) return;

    var grupo = findGroupFor(pid);
    if (!grupo || grupo.productos.length < 2) return;

    var anchor = document.querySelector("#product_form .product-form-add-to-cart, #product_form .js-product-add-to-cart, #product_form");
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

    anchor.parentNode.insertBefore(wrap, anchor);
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
