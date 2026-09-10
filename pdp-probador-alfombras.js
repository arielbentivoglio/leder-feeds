/*!
 * LEDER — PDP Probador de Alfombras (runtime)
 * Publicado en GitHub Pages (arielbentivoglio/leder-feeds).
 * Generado/publicado por probador_alfombras_panel.py — NO editar a mano
 * el bloque __PROBADOR_ALFOMBRAS_SETS__, lo pisa cada guardado del panel.
 *
 * Patrón: mismo que pdp-talles.js / pdp-faq.js / pdp-unboxing.js
 *   - Solo corre si window.LS.template === "product"
 *   - Elige el set mas especifico que matchea tienda + alcance
 *     (Producto > Categoria > Pagina > Todos)
 *   - Inserta con retry 40x150ms, chequea que no exista ya (dedupe)
 */
(function () {
  "use strict";

  // ─── Datos publicados por el panel (placeholder reemplazado al publicar) ──
  var PROBADOR_SETS = /*__PROBADOR_ALFOMBRAS_SETS__*/ [{"id": "pa-20260910154309190410", "nombre": "Alfombra Patchwork Pampa 110x60cm Marrón", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319850972"], "labels": [{"id": "319850972", "nombre": "Alfombra Patchwork Pampa 110x60cm"}]}, "anchor_selector": ".js-product-variants", "anchor_position": "after", "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090258777, "src": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/av60110-10mron-601a53cc4fc030c1e417690055171263-1024-1024.jpg", "width": 1200, "height": 1200}, "ancho_cm": 110.0, "alto_cm": 60.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}] /*__END_SETS__*/;

  var MOUNT_ID = "ldr-pdp-probador-alfombras";
  var RETRY_MAX = 40;
  var RETRY_MS = 150;

  function currentStore() {
    return location.hostname.indexOf("leder.cl") !== -1 ? "cl" : "ar";
  }

  function currentProductId() {
    try { return String((window.LS.product || {}).id || ""); } catch (e) { return ""; }
  }

  function currentCategoryIds() {
    try {
      var cats = (window.LS.product || {}).categories || [];
      return cats.map(function (c) { return String(c.id != null ? c.id : c); });
    } catch (e) { return []; }
  }

  // Producto > Categoria > Pagina > Todos
  function specificity(set) {
    var tipo = (set.alcance || {}).tipo;
    if (tipo === "producto") return 3;
    if (tipo === "categoria") return 2;
    if (tipo === "pagina") return 1;
    return 0;
  }

  function matches(set) {
    if (!set.activo) return false;
    if ((set.stores || []).indexOf(currentStore()) === -1) return false;
    var alcance = set.alcance || { tipo: "todos", valores: [] };
    var valores = (alcance.valores || []).map(String);
    if (alcance.tipo === "todos") return true;
    if (alcance.tipo === "producto") return valores.indexOf(currentProductId()) !== -1;
    if (alcance.tipo === "categoria") {
      var cats = currentCategoryIds();
      return valores.some(function (v) { return cats.indexOf(v) !== -1; });
    }
    if (alcance.tipo === "pagina") return true; // template ya filtrado a "product"
    return false;
  }

  function pickSet() {
    var candidatos = PROBADOR_SETS.filter(matches);
    if (!candidatos.length) return null;
    candidatos.sort(function (a, b) { return specificity(b) - specificity(a); });
    return candidatos[0];
  }

  // ─── Estilos (inyectados una sola vez) ─────────────────────────────────────
  function injectStyles(set) {
    if (document.getElementById("ldr-pa-styles")) return;
    var accent = set.accent_color || "#a6512e";
    var btnBg = set.boton_bg_color || "#1a1a1a";
    var btnText = set.boton_text_color || "#ffffff";
    var radius = set.bordes_estilo === "cuadrado" ? "4px" : "10px";
    var css = "" +
      ".ldr-pa-trigger{display:inline-flex;align-items:center;gap:8px;padding:12px 18px;" +
      "border-radius:" + radius + ";border:1px solid " + btnBg + ";background:" + btnBg + ";" +
      "color:" + btnText + ";font-size:14px;font-weight:600;cursor:pointer;margin:10px 0;}" +
      ".ldr-pa-trigger svg{width:16px;height:16px;flex:0 0 auto;}" +
      ".ldr-pa-overlay{position:fixed;inset:0;background:rgba(20,15,10,0.55);z-index:99998;display:none;}" +
      ".ldr-pa-overlay.ldr-pa-open{display:block;}" +
      ".ldr-pa-modal{position:fixed;z-index:99999;left:50%;top:50%;transform:translate(-50%,-50%);" +
      "width:min(720px,92vw);max-height:90vh;overflow:auto;background:#fbf9f4;border-radius:6px;" +
      "padding:22px;display:none;box-shadow:0 20px 60px rgba(0,0,0,0.35);}" +
      ".ldr-pa-modal.ldr-pa-open{display:block;}" +
      ".ldr-pa-modal h3{font-family:Georgia,serif;font-weight:normal;font-size:22px;margin:0 0 6px;}" +
      ".ldr-pa-modal p.ldr-pa-intro{font-size:13.5px;color:#5b5145;margin:0 0 16px;line-height:1.5;}" +
      ".ldr-pa-close{position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:50%;" +
      "border:1px solid rgba(0,0,0,0.15);background:#fff;cursor:pointer;font-size:16px;line-height:1;}" +
      ".ldr-pa-stage{position:relative;width:100%;aspect-ratio:16/10.5;overflow:hidden;border-radius:3px;" +
      "background:#DCD3BE;touch-action:none;user-select:none;}" +
      ".ldr-pa-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;" +
      "flex-direction:column;gap:10px;color:#5b5145;font-size:13px;text-align:center;padding:20px;}" +
      ".ldr-pa-room{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none;}" +
      ".ldr-pa-shadow,.ldr-pa-rug{position:absolute;top:0;left:0;transform-origin:0 0;pointer-events:none;}" +
      ".ldr-pa-shadow{background:rgba(15,10,5,0.38);filter:blur(9px);}" +
      ".ldr-pa-rug{background-repeat:no-repeat;background-size:100% 100%;box-shadow:0 0 0 1px rgba(0,0,0,0.18) inset;}" +
      ".ldr-pa-handle{position:absolute;width:22px;height:22px;margin-left:-11px;margin-top:-11px;" +
      "border-radius:50%;background:#fbf9f4;border:2px solid " + accent + ";box-shadow:0 1px 3px rgba(0,0,0,0.3);" +
      "cursor:grab;touch-action:none;display:none;}" +
      ".ldr-pa-handle.ldr-pa-show{display:block;}" +
      ".ldr-pa-actions{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;}" +
      ".ldr-pa-btn{flex:1 1 auto;padding:11px 14px;border-radius:3px;font-size:13.5px;font-weight:600;cursor:pointer;text-align:center;}" +
      ".ldr-pa-btn.primary{background:" + btnBg + ";color:" + btnText + ";border:1px solid " + btnBg + ";}" +
      ".ldr-pa-btn.secondary{background:transparent;color:#241c15;border:1px solid rgba(0,0,0,0.15);}" +
      ".ldr-pa-caption{font-size:12px;color:#5b5145;margin-top:8px;}" +
      "@media(max-width:480px){.ldr-pa-modal{padding:16px;} .ldr-pa-actions{flex-direction:column;}}";
    var style = document.createElement("style");
    style.id = "ldr-pa-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ─── Álgebra de homografía (proyección de 4 puntos) ────────────────────────
  function adj(m) {
    return [
      m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
      m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
      m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]
    ];
  }
  function multmm(a, b) {
    var c = Array(9);
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
      var s = 0;
      for (var k = 0; k < 3; k++) s += a[3*i+k]*b[3*k+j];
      c[3*i+j] = s;
    }
    return c;
  }
  function multmv(m, v) {
    return [
      m[0]*v[0]+m[1]*v[1]+m[2]*v[2],
      m[3]*v[0]+m[4]*v[1]+m[5]*v[2],
      m[6]*v[0]+m[7]*v[1]+m[8]*v[2]
    ];
  }
  function basisToPoints(x1,y1,x2,y2,x3,y3,x4,y4) {
    var m = adj([x1,x2,x3, y1,y2,y3, 1,1,1]);
    var v = multmv(m, [x4,y4,1]);
    return multmm(m, [v[0],0,0, 0,v[1],0, 0,0,v[2]]);
  }
  function general2DProjection(x1s,y1s,x2s,y2s,x3s,y3s,x4s,y4s,x1d,y1d,x2d,y2d,x3d,y3d,x4d,y4d) {
    var s = basisToPoints(x1s,y1s,x2s,y2s,x3s,y3s,x4s,y4s);
    var d = basisToPoints(x1d,y1d,x2d,y2d,x3d,y3d,x4d,y4d);
    return multmm(d, adj(s));
  }
  function matrixTo3dCss(m) {
    return [m[0],m[3],0,m[6], m[1],m[4],0,m[7], 0,0,1,0, m[2],m[5],0,m[8]];
  }

  // ─── Construcción del modal ─────────────────────────────────────────────
  function buildModal(set) {
    var overlay = document.createElement("div");
    overlay.className = "ldr-pa-overlay";
    var modal = document.createElement("div");
    modal.className = "ldr-pa-modal";

    var productName = "";
    try { productName = (window.LS.product || {}).name || ""; } catch (e) {}

    modal.innerHTML =
      '<button type="button" class="ldr-pa-close" aria-label="Cerrar">\u2715</button>' +
      '<h3>' + (set.titulo_modal || "Prob\u00e1 la alfombra en tu ambiente") + '</h3>' +
      '<p class="ldr-pa-intro">' + (set.texto_instructivo ||
        "Sub\u00ed una foto de tu ambiente y arrastr\u00e1 las cuatro esquinas hasta el piso.") + '</p>' +
      '<div class="ldr-pa-stage">' +
        '<div class="ldr-pa-placeholder">Sub\u00ed una foto para empezar</div>' +
        '<img class="ldr-pa-room" alt="Tu ambiente">' +
        '<div class="ldr-pa-shadow"></div>' +
        '<div class="ldr-pa-rug"></div>' +
        '<div class="ldr-pa-handle" data-i="0"></div>' +
        '<div class="ldr-pa-handle" data-i="1"></div>' +
        '<div class="ldr-pa-handle" data-i="2"></div>' +
        '<div class="ldr-pa-handle" data-i="3"></div>' +
      '</div>' +
      '<p class="ldr-pa-caption">' + (productName ? productName + " \u2014 " : "") +
        (set.ancho_cm && set.alto_cm ? set.ancho_cm + "\u00d7" + set.alto_cm + " cm" : "") + '</p>' +
      '<div class="ldr-pa-actions">' +
        '<label class="ldr-pa-btn primary" style="margin:0;">Subir o sacar una foto' +
          '<input type="file" accept="image/*" capture="environment" style="display:none;" class="ldr-pa-file"></label>' +
        '<button type="button" class="ldr-pa-btn secondary ldr-pa-reset">Reiniciar esquinas</button>' +
      '</div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    var stage = modal.querySelector(".ldr-pa-stage");
    var placeholder = modal.querySelector(".ldr-pa-placeholder");
    var roomImg = modal.querySelector(".ldr-pa-room");
    var rug = modal.querySelector(".ldr-pa-rug");
    var shadow = modal.querySelector(".ldr-pa-shadow");
    var handles = [].slice.call(modal.querySelectorAll(".ldr-pa-handle"));
    var fileInput = modal.querySelector(".ldr-pa-file");
    var resetBtn = modal.querySelector(".ldr-pa-reset");
    var closeBtn = modal.querySelector(".ldr-pa-close");

    var baseW = 400;
    var anchoCm = parseFloat(set.ancho_cm) || 170;
    var altoCm = parseFloat(set.alto_cm) || 120;
    var baseH = Math.round(baseW * (altoCm / anchoCm));
    var imgSrc = (set.imagen || {}).src || "";

    rug.style.width = baseW + "px";
    rug.style.height = baseH + "px";
    shadow.style.width = baseW + "px";
    shadow.style.height = baseH + "px";
    if (imgSrc) rug.style.backgroundImage = "url(" + imgSrc + ")";

    var defaultCorners = [
      { x: 0.30, y: 0.56 }, { x: 0.72, y: 0.56 },
      { x: 0.88, y: 0.90 }, { x: 0.16, y: 0.90 }
    ];
    var corners = defaultCorners.map(function (c) { return { x: c.x, y: c.y }; });
    var handlesVisible = false;

    function update() {
      var rect = stage.getBoundingClientRect();
      var pts = corners.map(function (c) { return { x: c.x * rect.width, y: c.y * rect.height }; });
      var m = general2DProjection(
        0, 0, baseW, 0, baseW, baseH, 0, baseH,
        pts[0].x, pts[0].y, pts[1].x, pts[1].y, pts[2].x, pts[2].y, pts[3].x, pts[3].y
      );
      var css = "matrix3d(" + matrixTo3dCss(m).join(",") + ")";
      rug.style.transform = css;
      shadow.style.transform = "translate(4px,8px) " + css;
      handles.forEach(function (h, i) {
        h.style.left = (corners[i].x * 100) + "%";
        h.style.top = (corners[i].y * 100) + "%";
      });
    }

    function showRugUI() {
      if (handlesVisible) return;
      handlesVisible = true;
      handles.forEach(function (h) { h.classList.add("ldr-pa-show"); });
      rug.style.display = "block";
      shadow.style.display = "block";
      update();
    }

    var dragIndex = null;
    handles.forEach(function (h, i) {
      h.addEventListener("pointerdown", function (e) {
        dragIndex = i;
        try { h.setPointerCapture(e.pointerId); } catch (err) {}
      });
    });
    stage.addEventListener("pointermove", function (e) {
      if (dragIndex === null) return;
      var rect = stage.getBoundingClientRect();
      var x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      var y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      corners[dragIndex] = { x: x, y: y };
      update();
    });
    window.addEventListener("pointerup", function () { dragIndex = null; });

    fileInput.addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (ev) {
        roomImg.src = ev.target.result;
        roomImg.style.display = "block";
        placeholder.style.display = "none";
        showRugUI();
      };
      reader.readAsDataURL(file);
    });

    resetBtn.addEventListener("click", function () {
      corners = defaultCorners.map(function (c) { return { x: c.x, y: c.y }; });
      update();
    });

    function close() {
      overlay.classList.remove("ldr-pa-open");
      modal.classList.remove("ldr-pa-open");
    }
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);
    modal.addEventListener("click", function (e) { e.stopPropagation(); });

    window.addEventListener("resize", function () { if (handlesVisible) update(); });

    return {
      open: function () {
        overlay.classList.add("ldr-pa-open");
        modal.classList.add("ldr-pa-open");
        if (handlesVisible) update();
      }
    };
  }

  // ─── Inserción del boton disparador en el anchor ───────────────────────────
  function insertTrigger(set) {
    if (document.getElementById(MOUNT_ID)) return; // dedupe

    var target = document.querySelector(set.anchor_selector || "#product_form");
    if (!target) return;

    injectStyles(set);
    var modalApi = buildModal(set);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = MOUNT_ID;
    btn.className = "ldr-pa-trigger";
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
      '<rect x="3" y="3" width="18" height="18" rx="1"></rect>' +
      '<path d="M3 9h18M9 21V9"></path></svg>' +
      (set.boton_label || "Probar en tu ambiente");
    btn.addEventListener("click", function () { modalApi.open(); });

    var pos = set.anchor_position || "after";
    if (pos === "before") target.parentNode.insertBefore(btn, target);
    else if (pos === "prepend") target.insertBefore(btn, target.firstChild);
    else if (pos === "append") target.appendChild(btn);
    else target.parentNode.insertBefore(btn, target.nextSibling); // after
  }

  // ─── Bootstrap con retry (mismo patron que el resto de modulos PDP) ────────
  function init() {
    try {
      if (!window.LS || window.LS.template !== "product") return;
    } catch (e) { return; }

    var set = pickSet();
    if (!set) return;

    var attempts = 0;
    var timer = setInterval(function () {
      attempts++;
      if (document.getElementById(MOUNT_ID) || attempts >= RETRY_MAX) {
        clearInterval(timer);
        return;
      }
      insertTrigger(set);
    }, RETRY_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
