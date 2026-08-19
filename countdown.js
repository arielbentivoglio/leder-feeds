/**
 * countdown.js — generado automaticamente por SyncPropio (panel de Countdown)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-08-19 12:01:26
 */
(function () {
  "use strict";
  var COUNTDOWNS = [
  {
    "id": "countdown-chile-cojines",
    "activo": true,
    "stores": [
      "cl"
    ],
    "alcance": {
      "tipo": "todos",
      "valores": [],
      "labels": []
    },
    "posicion": "top",
    "anchorSelector": "",
    "anchorPosition": "before",
    "sticky": false,
    "alto": "",
    "link": "/productos/cojin/",
    "fechaFin": "2026-08-19 12:00",
    "textoChico": {
      "texto": "",
      "color": "#f6f1e7",
      "tamano": 11,
      "negrita": false,
      "cursiva": false
    },
    "titulo": {
      "texto": "Chairpad 6x5",
      "color": "#f6f1e7",
      "tamano": 15,
      "negrita": true,
      "cursiva": false
    },
    "etiqueta": {
      "texto": "TERMINA EN",
      "color": "#f6f1e7",
      "tamano": 12,
      "negrita": false,
      "cursiva": false
    },
    "digitos": {
      "color": "#f6f1e7",
      "tamano": 18,
      "negrita": true,
      "cursiva": false,
      "border_color": "#c6a875",
      "border_width": 1
    },
    "bgColor": "#211913",
    "textColor": "#f6f1e7",
    "accentColor": "#211913",
    "borderColor": "#c6a875",
    "borderWidth": 0
  },
  {
    "id": "countdown-chile-cojines-producto",
    "activo": true,
    "stores": [
      "cl"
    ],
    "alcance": {
      "tipo": "producto",
      "valores": [
        "340096104"
      ],
      "labels": [
        {
          "id": "340096104",
          "nombre": "Cojín Decorativo De Piel De Oveja Natural Para Sillas – 38cm"
        }
      ]
    },
    "posicion": "anchor",
    "anchorSelector": "#product_form",
    "anchorPosition": "after",
    "sticky": false,
    "alto": "",
    "link": "/productos/cojin/",
    "fechaFin": "2026-08-19 13:00",
    "textoChico": {
      "texto": "",
      "color": "#f6f1e7",
      "tamano": 11,
      "negrita": false,
      "cursiva": false
    },
    "titulo": {
      "texto": "Chairpad 6x5",
      "color": "#f6f1e7",
      "tamano": 15,
      "negrita": true,
      "cursiva": false
    },
    "etiqueta": {
      "texto": "TERMINA EN",
      "color": "#f6f1e7",
      "tamano": 12,
      "negrita": false,
      "cursiva": false
    },
    "digitos": {
      "color": "#f6f1e7",
      "tamano": 18,
      "negrita": true,
      "cursiva": false,
      "border_color": "#c6a875",
      "border_width": 1
    },
    "bgColor": "#211913",
    "textColor": "#f6f1e7",
    "accentColor": "#211913",
    "borderColor": "#c6a875",
    "borderWidth": 0
  }
];
  // Offset fijo por tienda (sin manejo de horario de verano/DST — mismo
  // criterio ya usado en store.js.tpl para estas dos tiendas):
  //   Argentina (America/Argentina/Buenos_Aires) = UTC-3, sin DST
  //   Chile (America/Santiago)                   = UTC-4, horario estandar
  var TZ_OFFSET_MS = { ar: 3 * 3600 * 1000, cl: 4 * 3600 * 1000 };

  function getStore() {
    var h = location.hostname || "";
    if (h.indexOf("leder.cl") !== -1) return "cl";
    return "ar";
  }

  function getTzOffsetMs(store) {
    return TZ_OFFSET_MS[store] || TZ_OFFSET_MS.ar;
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  // ─── Contexto de pagina para el alcance (Categoria/Producto/Pagina) ─────
  // OJO: LS.category / LS.product sin verificar contra el DOM real, ver
  // nota al pie del panel. Si no matchean, revisar con la extension.
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
    return { template: tpl, path: location.pathname || "/", categoriaIds: categoriaIds, productoIds: productoIds };
  }

  function matchesAlcance(cd, ctx) {
    var al = cd.alcance || { tipo: "todos", valores: [] };
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
        if (v.charAt(v.length - 1) === "*") {
          return ctx.path.indexOf(v.slice(0, -1)) === 0;
        }
        return ctx.path === v || ctx.path === (v + "/");
      });
    }
    return false;
  }

  // ─── Calculo del timestamp de fin ────────────────────────────────────────
  function parseFechaFinLocal(fechaFin, offsetMs) {
    // Espera "AAAA-MM-DD HH:MM" (o con T) interpretado como hora local de
    // la tienda (Argentina o Chile, segun corresponda).
    var m = String(fechaFin || "").match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
    if (!m) return null;
    var utcMs = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) + offsetMs;
    return Math.floor(utcMs / 1000);
  }

  function proximaMedianocheLocal(offsetMs) {
    var localMs = Date.now() - offsetMs; // "shiftea" para leer los campos como si fueran hora local
    var d = new Date(localMs);
    var medianocheLocalMs = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0);
    return Math.floor((medianocheLocalMs + offsetMs) / 1000);
  }

  function getEndTimestamp(cd, offsetMs) {
    if (cd.fechaFin) {
      var fijo = parseFechaFinLocal(cd.fechaFin, offsetMs);
      if (fijo) return { ts: fijo, fijo: true };
    }
    return { ts: proximaMedianocheLocal(offsetMs), fijo: false };
  }

  // ─── Estilos ──────────────────────────────────────────────────────────────
  function injectStyle() {
    if (document.getElementById("ldr-cd-style")) return;
    var css =
      ".ldr-cd{width:100%;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 22px;padding:14px 20px;font-size:13px;line-height:1.3}" +
      ".ldr-cd__col{display:flex;flex-direction:column;align-items:center;line-height:1.25}" +
      ".ldr-cd__small{font-size:11px;opacity:.85;letter-spacing:.02em}" +
      ".ldr-cd__row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px 18px}" +
      ".ldr-cd__title{font-size:15px}" +
      ".ldr-cd__label{font-size:11px;opacity:.85;letter-spacing:.08em;text-transform:uppercase}" +
      ".ldr-cd__clock{display:flex;align-items:center;gap:6px}" +
      ".ldr-cd__unit{display:flex;flex-direction:column;align-items:center;min-width:46px;border-radius:6px;padding:6px 10px}" +
      ".ldr-cd__num{font-size:20px;font-variant-numeric:tabular-nums;line-height:1.1}" +
      ".ldr-cd__u-label{font-size:9px;letter-spacing:.08em;opacity:.75;text-transform:uppercase;margin-top:2px}" +
      ".ldr-cd__sep{font-size:20px;opacity:.55;margin:0 1px;align-self:center}" +
      "@media(max-width:480px){.ldr-cd{padding:10px 12px;gap:6px 14px}.ldr-cd__title{font-size:13px}.ldr-cd__unit{min-width:38px;padding:4px 8px}}";
    var st = document.createElement("style");
    st.id = "ldr-cd-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function segStyle(seg) {
    seg = seg || {};
    var s = "";
    if (seg.color) s += "color:" + seg.color + ";";
    s += "font-weight:" + (seg.negrita ? "700" : "400") + ";";
    s += "font-style:" + (seg.cursiva ? "italic" : "normal") + ";";
    if (seg.tamano) s += "font-size:" + seg.tamano + "px;";
    return s;
  }

  function digitoStyle(dig, isLabel) {
    dig = dig || {};
    var tamano = dig.tamano || 16;
    var s = "";
    if (dig.color) s += "color:" + dig.color + ";";
    s += "font-weight:" + (dig.negrita ? "700" : "400") + ";";
    s += "font-style:" + (dig.cursiva ? "italic" : "normal") + ";";
    s += "font-size:" + (isLabel ? Math.max(7, Math.round(tamano * 0.45)) : tamano) + "px;";
    return s;
  }

  function unidad(valor, label, cd) {
    var wrap = document.createElement("div");
    wrap.className = "ldr-cd__unit";
    wrap.style.background = cd.accentColor || "transparent";
    var dig = cd.digitos || {};
    if (dig.border_width && Number(dig.border_width) > 0) {
      wrap.style.boxSizing = "border-box";
      wrap.style.border = dig.border_width + "px solid " + (dig.border_color || "#000000");
    }
    var num = document.createElement("span");
    num.className = "ldr-cd__num js-ldr-cd-num";
    num.setAttribute("data-unit", label);
    num.setAttribute("style", digitoStyle(cd.digitos, false));
    num.textContent = valor;
    var lbl = document.createElement("span");
    lbl.className = "ldr-cd__u-label";
    lbl.setAttribute("style", digitoStyle(cd.digitos, true));
    lbl.textContent = label;
    wrap.appendChild(num);
    wrap.appendChild(lbl);
    return wrap;
  }

  function render(cd, offsetMs) {
    injectStyle();

    var bar = document.createElement("div");
    bar.className = "ldr-cd";
    bar.id = "ldr-countdown-mod";
    bar.setAttribute("data-inserted", "true");
    bar.style.background = cd.bgColor || "#000000";
    bar.style.color = cd.textColor || "#ffffff";
    if (cd.alto) {
      bar.style.minHeight = cd.alto + "px";
    }
    if (cd.borderWidth && Number(cd.borderWidth) > 0) {
      bar.style.boxSizing = "border-box";
      bar.style.border = cd.borderWidth + "px solid " + (cd.borderColor || "#000000");
    }
    if (cd.sticky) {
      bar.style.position = "sticky";
      bar.style.top = "0";
      bar.style.zIndex = "998";
    }

    // Link opcional: si esta cargado, toda la barra es clickeable y lleva
    // ahi. Si no esta cargado, no se agrega ningun comportamiento de click.
    if (cd.link) {
      bar.style.cursor = "pointer";
      bar.setAttribute("role", "link");
      bar.setAttribute("tabindex", "0");
      bar.addEventListener("click", function () {
        window.location.href = cd.link;
      });
      bar.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = cd.link;
        }
      });
    }

    if (cd.textoChico && (cd.textoChico.texto || "").trim()) {
      var chico = document.createElement("span");
      chico.className = "ldr-cd__small";
      chico.setAttribute("style", segStyle(cd.textoChico));
      chico.textContent = cd.textoChico.texto;
      bar.appendChild(chico);
    }

    var row = document.createElement("div");
    row.className = "ldr-cd__row";

    if (cd.titulo && (cd.titulo.texto || "").trim()) {
      var tit = document.createElement("span");
      tit.className = "ldr-cd__title";
      tit.setAttribute("style", segStyle(cd.titulo));
      tit.textContent = cd.titulo.texto;
      row.appendChild(tit);
    }

    if (cd.etiqueta && (cd.etiqueta.texto || "").trim()) {
      var lab = document.createElement("span");
      lab.className = "ldr-cd__label";
      lab.setAttribute("style", segStyle(cd.etiqueta));
      lab.textContent = cd.etiqueta.texto;
      row.appendChild(lab);
    }

    var clock = document.createElement("div");
    clock.className = "ldr-cd__clock";
    clock.appendChild(unidad("00", "HRS", cd));
    var sep1 = document.createElement("span"); sep1.className = "ldr-cd__sep"; sep1.textContent = ":";
    clock.appendChild(sep1);
    clock.appendChild(unidad("00", "MIN", cd));
    var sep2 = document.createElement("span"); sep2.className = "ldr-cd__sep"; sep2.textContent = ":";
    clock.appendChild(sep2);
    clock.appendChild(unidad("00", "SEG", cd));
    row.appendChild(clock);

    bar.appendChild(row);

    if (cd.posicion === "anchor" && cd.anchorSelector) {
      var target = document.querySelector(cd.anchorSelector);
      if (target) {
        if (cd.anchorPosition === "after") target.parentNode.insertBefore(bar, target.nextSibling);
        else if (cd.anchorPosition === "prepend") target.insertBefore(bar, target.firstChild);
        else if (cd.anchorPosition === "append") target.appendChild(bar);
        else target.parentNode.insertBefore(bar, target); // before (default)
      } else {
        document.body.insertBefore(bar, document.body.firstChild); // fallback: arriba de todo
      }
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }

    var nums = bar.querySelectorAll(".js-ldr-cd-num");
    var numHrs = nums[0], numMin = nums[1], numSeg = nums[2];

    function tick() {
      var info = getEndTimestamp(cd, offsetMs);
      var now = Math.floor(Date.now() / 1000);
      var left = info.ts - now;
      if (left <= 0) {
        if (info.fijo) {
          // fecha fija vencida: se saca el modulo del DOM
          bar.remove();
          clearInterval(iv);
          return;
        }
        // sin fecha fija: se reinicio solo (proximo tick ya calcula la
        // nueva medianoche), no hace falta hacer nada especial aca
        left = 0;
      }
      var h = Math.floor(left / 3600);
      var mnt = Math.floor((left % 3600) / 60);
      var s = Math.floor(left % 60);
      numHrs.textContent = String(h).padStart(2, "0");
      numMin.textContent = String(mnt).padStart(2, "0");
      numSeg.textContent = String(s).padStart(2, "0");
    }

    tick();
    var iv = setInterval(tick, 1000);
  }

  function init() {
    var store = getStore();
    var ctx = contextoActual();
    var cd = null;
    for (var i = 0; i < COUNTDOWNS.length; i++) {
      var c = COUNTDOWNS[i];
      if (!c.activo) continue;
      if ((c.stores || []).indexOf(store) === -1) continue;
      if (!matchesAlcance(c, ctx)) continue;
      cd = c;
      break;
    }
    if (!cd) return;
    render(cd, getTzOffsetMs(store));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
