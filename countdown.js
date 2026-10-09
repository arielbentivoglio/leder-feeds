/**
 * countdown.js — generado automaticamente por SyncPropio (panel de Countdown)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-10-08 21:48:22
 */
(function () {
  "use strict";
  var COUNTDOWNS = [
  {
    "id": "countdown-chile-cojines-copia",
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
    "marginTop": 0,
    "marginBottom": 0,
    "link": "",
    "fechaFin": "2026-10-11 23:59",
    "mostrarDias": true,
    "textoChico": {
      "texto": "",
      "color": "#f6f1e7",
      "tamano": 11,
      "negrita": false,
      "cursiva": false
    },
    "titulo": {
      "texto": "CYBER",
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
  // Zona horaria real de cada tienda. El offset se calcula con Intl para
  // cada instante, asi el horario de verano de Chile (UTC-3 de septiembre
  // a abril, UTC-4 el resto del año) se respeta solo. Si el navegador no
  // soporta Intl con timeZone, cae a los offsets fijos de antes.
  var TZ_NAME = { ar: "America/Argentina/Buenos_Aires", cl: "America/Santiago" };
  var TZ_FALLBACK_MS = { ar: 3 * 3600 * 1000, cl: 4 * 3600 * 1000 };
  var _tzFormatters = {};

  function getStore() {
    var h = location.hostname || "";
    if (h.indexOf("leder.cl") !== -1) return "cl";
    return "ar";
  }

  // Devuelve (UTC - hora local de la tienda) en ms para el instante utcMs.
  // Ej.: Argentina -> 3h; Chile en verano -> 3h, en invierno -> 4h.
  function tzOffsetMsAt(store, utcMs) {
    var tz = TZ_NAME[store] || TZ_NAME.ar;
    try {
      var fmt = _tzFormatters[tz];
      if (!fmt) {
        fmt = new Intl.DateTimeFormat("en-US", {
          timeZone: tz, hourCycle: "h23",
          year: "numeric", month: "2-digit", day: "2-digit",
          hour: "2-digit", minute: "2-digit", second: "2-digit"
        });
        _tzFormatters[tz] = fmt;
      }
      var p = {};
      fmt.formatToParts(new Date(utcMs)).forEach(function (x) { p[x.type] = x.value; });
      var hora = +p.hour === 24 ? 0 : +p.hour;
      var paredMs = Date.UTC(+p.year, +p.month - 1, +p.day, hora, +p.minute, +p.second);
      var segundos = Math.floor(utcMs / 1000) * 1000;
      return segundos - paredMs;
    } catch (e) {
      return TZ_FALLBACK_MS[store] || TZ_FALLBACK_MS.ar;
    }
  }

  // Convierte una hora "de pared" de la tienda (campos leidos como UTC) al
  // instante UTC real. Se verifica el offset dos veces por si el instante
  // cae justo en un cambio de horario.
  function paredAUtcMs(store, paredMs) {
    var off = tzOffsetMsAt(store, paredMs + (TZ_FALLBACK_MS[store] || 0));
    var utc = paredMs + off;
    var off2 = tzOffsetMsAt(store, utc);
    return off2 === off ? utc : paredMs + off2;
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
  function parseFechaFinLocal(fechaFin, store) {
    // Espera "AAAA-MM-DD HH:MM" (o con T) interpretado como hora local de
    // la tienda (Argentina o Chile, segun corresponda).
    var m = String(fechaFin || "").match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
    if (!m) return null;
    var paredMs = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
    return Math.floor(paredAUtcMs(store, paredMs) / 1000);
  }

  function proximaMedianocheLocal(store) {
    var ahora = Date.now();
    var d = new Date(ahora - tzOffsetMsAt(store, ahora)); // campos UTC = hora local de la tienda
    var medianocheParedMs = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0);
    return Math.floor(paredAUtcMs(store, medianocheParedMs) / 1000);
  }

  // La fecha fija no cambia: se calcula una sola vez por countdown.
  var _finFijoCache = {};

  function getEndTimestamp(cd, store) {
    if (cd.fechaFin) {
      var key = store + "|" + cd.fechaFin;
      if (!(key in _finFijoCache)) _finFijoCache[key] = parseFechaFinLocal(cd.fechaFin, store);
      var fijo = _finFijoCache[key];
      if (fijo) return { ts: fijo, fijo: true };
    }
    return { ts: proximaMedianocheLocal(store), fijo: false };
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

  function unidad(valor, label, cd, key) {
    var wrap = document.createElement("div");
    wrap.className = "ldr-cd__unit";
    wrap.setAttribute("data-unit-wrap", key || label);
    wrap.style.background = cd.accentColor || "transparent";
    var dig = cd.digitos || {};
    if (dig.border_width && Number(dig.border_width) > 0) {
      wrap.style.boxSizing = "border-box";
      wrap.style.border = dig.border_width + "px solid " + (dig.border_color || "#000000");
    }
    var num = document.createElement("span");
    num.className = "ldr-cd__num js-ldr-cd-num";
    num.setAttribute("data-unit", key || label);
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

  function render(cd, store) {
    injectStyle();

    var bar = document.createElement("div");
    bar.className = "ldr-cd";
    bar.id = "ldr-countdown-mod-" + (cd.id || Math.random().toString(36).slice(2));
    bar.setAttribute("data-countdown-id", cd.id || "");
    bar.setAttribute("data-inserted", "true");
    bar.style.background = cd.bgColor || "#000000";
    bar.style.color = cd.textColor || "#ffffff";
    if (cd.alto) {
      bar.style.minHeight = cd.alto + "px";
    }
    if (cd.marginTop && Number(cd.marginTop) > 0) {
      bar.style.marginTop = cd.marginTop + "px";
    }
    if (cd.marginBottom && Number(cd.marginBottom) > 0) {
      bar.style.marginBottom = cd.marginBottom + "px";
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
    // Casilla de DIAS opcional (toggle "Mostrar dias" del panel). Se oculta
    // sola cuando falta menos de 1 dia; con el toggle apagado el reloj
    // queda como siempre (todo sumado en horas).
    var unitDias = null, sepDias = null;
    if (cd.mostrarDias) {
      unitDias = unidad("00", "DÍAS", cd, "DIAS");
      clock.appendChild(unitDias);
      sepDias = document.createElement("span"); sepDias.className = "ldr-cd__sep"; sepDias.textContent = ":";
      clock.appendChild(sepDias);
    }
    clock.appendChild(unidad("00", "HRS", cd, "HRS"));
    var sep1 = document.createElement("span"); sep1.className = "ldr-cd__sep"; sep1.textContent = ":";
    clock.appendChild(sep1);
    clock.appendChild(unidad("00", "MIN", cd, "MIN"));
    var sep2 = document.createElement("span"); sep2.className = "ldr-cd__sep"; sep2.textContent = ":";
    clock.appendChild(sep2);
    clock.appendChild(unidad("00", "SEG", cd, "SEG"));
    row.appendChild(clock);

    bar.appendChild(row);

    colocarBarra(cd, bar, function () {
      var numDias = bar.querySelector('.js-ldr-cd-num[data-unit="DIAS"]');
      var numHrs = bar.querySelector('.js-ldr-cd-num[data-unit="HRS"]');
      var numMin = bar.querySelector('.js-ldr-cd-num[data-unit="MIN"]');
      var numSeg = bar.querySelector('.js-ldr-cd-num[data-unit="SEG"]');

      function tick() {
        var info = getEndTimestamp(cd, store);
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
        var h;
        if (unitDias) {
          var dias = Math.floor(left / 86400);
          var visible = dias > 0;
          unitDias.style.display = visible ? "" : "none";
          sepDias.style.display = visible ? "" : "none";
          if (numDias) numDias.textContent = String(dias).padStart(2, "0");
          h = Math.floor((left % 86400) / 3600);
        } else {
          h = Math.floor(left / 3600);
        }
        var mnt = Math.floor((left % 3600) / 60);
        var s = Math.floor(left % 60);
        numHrs.textContent = String(h).padStart(2, "0");
        numMin.textContent = String(mnt).padStart(2, "0");
        numSeg.textContent = String(s).padStart(2, "0");
      }

      tick();
      var iv = setInterval(tick, 1000);
    });
  }

  // Coloca la barra ya construida en el DOM. Si el alcance es "anchor", el
  // selector puede no existir todavia al momento de correr este script
  // (muchos themes de Tiendanube hidratan partes de la pagina — como el
  // formulario de producto — despues del DOMContentLoaded), asi que se
  // reintenta cada 150ms hasta 40 veces (~6s) antes de caer al fallback de
  // "arriba de todo". Mismo patron ya validado en produccion en
  // modulos_custom_panel.py y video_carousel_panel.py.
  function colocarBarra(cd, bar, onPlaced, attemptsLeft) {
    attemptsLeft = attemptsLeft === undefined ? 40 : attemptsLeft;
    if (cd.posicion === "anchor" && cd.anchorSelector) {
      var target = document.querySelector(cd.anchorSelector);
      if (target) {
        if (cd.anchorPosition === "after") target.parentNode.insertBefore(bar, target.nextSibling);
        else if (cd.anchorPosition === "prepend") target.insertBefore(bar, target.firstChild);
        else if (cd.anchorPosition === "append") target.appendChild(bar);
        else target.parentNode.insertBefore(bar, target); // before (default)
        onPlaced();
        return;
      }
      if (attemptsLeft > 0) {
        setTimeout(function () { colocarBarra(cd, bar, onPlaced, attemptsLeft - 1); }, 150);
        return;
      }
      document.body.insertBefore(bar, document.body.firstChild); // fallback: arriba de todo
      onPlaced();
      return;
    }
    document.body.insertBefore(bar, document.body.firstChild);
    onPlaced();
  }

  // No hay "un solo countdown por pagina": pueden convivir varios al mismo
  // tiempo siempre que no terminen en el mismo lugar visual (ej. uno
  // "Todos" arriba de todo + otro "Producto" anclado despues del formulario
  // de compra, como en el caso real de LEDER). Cada uno se posiciona segun
  // su propia config; si dos terminan apuntando exactamente al mismo lugar
  // (ej. dos "arriba de todo" activos para la misma tienda), van a
  // apilarse uno arriba del otro — es una colision de configuracion del
  // admin, no algo que el runtime deba resolver adivinando cual "gana".
  function init() {
    var store = getStore();
    var ctx = contextoActual();
    for (var i = 0; i < COUNTDOWNS.length; i++) {
      var c = COUNTDOWNS[i];
      if (!c.activo) continue;
      if ((c.stores || []).indexOf(store) === -1) continue;
      if (!matchesAlcance(c, ctx)) continue;
      render(c, store);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
