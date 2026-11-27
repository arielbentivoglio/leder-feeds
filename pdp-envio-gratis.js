/**
 * pdp-envio-gratis.js -- generado automaticamente por SyncPropio
 * (panel Modulos Custom > PDP - Envio gratis)
 * No editar a mano: se pisa en la proxima publicacion desde el panel.
 * Generado: 2026-11-27 14:43:42
 */
(function () {
  "use strict";
  var CFG = {
  "ar": {
    "activo": true,
    "texto": "🚚  Envío GRATIS a CABA y GBA En compras superiores a $149.990 · Llega en 24hs hábiles",
    "bg": "#f0f4e8",
    "borde": "#c8d9a0",
    "color": "#555555",
    "excepciones": [
      {
        "categoria": "muebles",
        "ocultar": false,
        "texto": "🚚  Envío GRATIS a CABA y GBA En compras superiores a $149.990",
        "bg": "#f0f4e8",
        "borde": "#c8d9a0",
        "color": "#555555"
      }
    ]
  },
  "cl": {
    "activo": true,
    "texto": "🚚  Envíos a todo Chile · Llega entre 2 y 4 días hábiles",
    "bg": "#f0f4e8",
    "borde": "#c8d9a0",
    "color": "#555555",
    "excepciones": [
      {
        "categoria": "producto-con-plazo-de-entrega",
        "ocultar": false,
        "texto": "⚠️  Producto a pedido vía importación. Entrega estimada: 30 a 45 días desde la compra",
        "bg": "#fdf6e3",
        "borde": "#e8c468",
        "color": "#5c4a1a"
      }
    ]
  }
};
  var BLOCK_ID = "ldr-envio-pdp";
  var FORM_SELECTOR = ".product-info .js-product-form";

  function getStore() {
    var h = location.hostname || "";
    if (h.indexOf("leder.cl") !== -1) return "cl";
    return "ar";
  }

  var c = CFG[getStore()];
  if (!c || !c.activo) return;
  if (!window.LS || window.LS.template !== "product") return;

  // Apaga la regla vieja del CSS avanzado (::before) mientras el modulo
  // este activo, para que nunca convivan los dos mensajes.
  if (!document.getElementById("ldr-envio-pdp-style")) {
    var st = document.createElement("style");
    st.id = "ldr-envio-pdp-style";
    st.textContent = FORM_SELECTOR + "::before{content:none!important;display:none!important}";
    (document.head || document.documentElement).appendChild(st);
  }

  // Rutas de categoria del producto, leidas del breadcrumb (mismo criterio
  // que el script "cat-muebles" de layout.tpl) + LS.category por si acaso.
  function categoriasActuales() {
    var out = [];
    var links = document.querySelectorAll("a.crumb");
    for (var i = 0; i < links.length; i++) {
      var p = (links[i].pathname || "").toLowerCase();
      p.split("/").forEach(function (seg) { if (seg) out.push(seg); });
    }
    try {
      if (window.LS && window.LS.category && window.LS.category.handle) {
        out.push(String(window.LS.category.handle).toLowerCase());
      }
    } catch (e) {}
    return out;
  }

  function elegirMensaje() {
    var cats = categoriasActuales();
    var exs = c.excepciones || [];
    for (var i = 0; i < exs.length; i++) {
      if (exs[i].categoria && cats.indexOf(exs[i].categoria) !== -1) return exs[i];
    }
    return c;
  }

  function insertar(form) {
    if (document.getElementById(BLOCK_ID)) return;
    var m = elegirMensaje();
    if (m.ocultar || !m.texto) return;
    var div = document.createElement("div");
    div.id = BLOCK_ID;
    div.textContent = m.texto;
    div.style.cssText =
      "display:block;white-space:pre-line;border-radius:8px;padding:12px 14px;" +
      "margin-bottom:12px;font-size:13px;line-height:1.8;" +
      "background-color:" + (m.bg || c.bg) + ";" +
      "border:1px solid " + (m.borde || c.borde) + ";" +
      "color:" + (m.color || c.color) + ";";
    form.insertBefore(div, form.firstChild);
  }

  // El script carga al final del body: el form ya suele estar. Si el theme
  // todavia no lo hidrato, mismo reintento que el resto (40 x 150ms).
  function intentar(n) {
    var form = document.querySelector(FORM_SELECTOR);
    if (form) { insertar(form); return; }
    if (n > 0) setTimeout(function () { intentar(n - 1); }, 150);
  }
  intentar(40);
})();
