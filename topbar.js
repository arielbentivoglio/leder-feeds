/**
 * topbar.js — generado automaticamente por SyncPropio (panel de Top Bar)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-08-18 17:28:23
 */
(function () {
  "use strict";
  var TOPBARS = [
  {
    "id": "global",
    "activo": true,
    "stores": [
      "cl"
    ],
    "mensajes": [
      "6 CUOTAS SIN INTERÉS",
      "ENVÍOS A REGIONES"
    ],
    "intervalMs": 4000,
    "bgColor": "#000000",
    "textColor": "#f6f1e7",
    "accentColor": "#c6a875",
    "mostrarAcento": true,
    "sticky": false,
    "negrita": false,
    "cursiva": false
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

  function injectStyle() {
    if (document.getElementById("ldr-topbar-style")) return;
    var css =
      ".ldr-topbar{width:100%;box-sizing:border-box;text-align:center;padding:8px 14px;font-size:12px;font-weight:400;letter-spacing:.03em;line-height:1.4}" +
      ".ldr-topbar__viewport{position:relative;height:1.4em;overflow:hidden;max-width:100%;margin:0 auto}" +
      ".ldr-topbar__item{position:absolute;left:0;right:0;top:0;opacity:0;transform:translateY(6px);transition:opacity .45s ease,transform .45s ease;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}" +
      ".ldr-topbar__item.is-active{opacity:1;transform:translateY(0);pointer-events:auto}" +
      ".ldr-topbar__accent{margin:0 8px;display:inline-block}" +
      "@media(max-width:480px){.ldr-topbar{font-size:11px;padding:7px 10px}.ldr-topbar__accent{margin:0 5px}}";
    var st = document.createElement("style");
    st.id = "ldr-topbar-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function render(tb) {
    injectStyle();

    var bar = document.createElement("div");
    bar.className = "ldr-topbar";
    bar.id = "ldr-topbar-mod";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Anuncios");
    bar.style.background = tb.bgColor || "#000000";
    bar.style.color = tb.textColor || "#ffffff";
    bar.style.fontWeight = tb.negrita ? "700" : "400";
    bar.style.fontStyle = tb.cursiva ? "italic" : "normal";
    if (tb.sticky) {
      bar.style.position = "sticky";
      bar.style.top = "0";
      bar.style.zIndex = "999";
    }

    var vp = document.createElement("div");
    vp.className = "ldr-topbar__viewport";
    vp.id = "ldr-topbar-vp";

    var accentHtml = tb.mostrarAcento
      ? '<span class="ldr-topbar__accent" style="color:' + esc(tb.accentColor || "#ffffff") + '">&#9670;</span>'
      : "";

    var msgs = (tb.mensajes || []).filter(function (m) { return (m || "").trim() !== ""; });
    if (!msgs.length) return;

    msgs.forEach(function (msg, i) {
      var span = document.createElement("span");
      span.className = "ldr-topbar__item" + (i === 0 ? " is-active" : "");
      span.innerHTML = accentHtml + esc(msg) + accentHtml;
      vp.appendChild(span);
    });

    bar.appendChild(vp);
    document.body.insertBefore(bar, document.body.firstChild);

    if (msgs.length > 1) {
      var idx = 0;
      var items = vp.querySelectorAll(".ldr-topbar__item");
      setInterval(function () {
        items[idx].classList.remove("is-active");
        idx = (idx + 1) % items.length;
        items[idx].classList.add("is-active");
      }, Math.max(1500, tb.intervalMs || 4000));
    }
  }

  function init() {
    var store = getStore();
    var tb = null;
    for (var i = 0; i < TOPBARS.length; i++) {
      var t = TOPBARS[i];
      if (t.activo && (t.stores || []).indexOf(store) !== -1) { tb = t; break; }
    }
    if (!tb) return;
    render(tb);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
