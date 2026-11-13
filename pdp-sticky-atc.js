/**
 * pdp-sticky-atc.js — generado automaticamente por SyncPropio (Modulos Custom > Boton fijo + stock)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-11-13 11:28:26
 *
 * Dos funciones independientes, cada una con su switch en el panel:
 *  1) barra: boton "Agregar al carrito" fijo abajo en mobile (<=767px) y,
 *     si esta habilitado, tambien en escritorio (una fila con miniatura,
 *     nombre, variante, precio, cuotas y boton). No
 *     reemplaza el form nativo: al tocarla dispara el boton real de
 *     #product_form, asi siguen andando la validacion, el "Agregando..." y
 *     el carrito lateral del theme.
 *  5) descripcion en acordeon (opcional, solo mobile), mismo look que el
 *     acordeon "Medios de envio".
 *  4) SKU debajo de la descripcion (opcional, mobile o todos): copia que
 *     sigue al SKU original del theme, que queda oculto arriba.
 *  3) galeria mobile (opcional): sin miniaturas, con la foto siguiente
 *     asomando o con puntitos. Solo <=767px; escritorio no cambia.
 *  2) salto de stock: si la variante elegida no tiene stock, pasa sola a la
 *     variante con stock mas parecida (mantiene las demas opciones, busca la
 *     opcion mas cercana en el orden de los botones). Corre en todos los
 *     dispositivos.
 *
 * Todo se busca DENTRO de #product_form: la ficha tiene otros
 * .js-addtocart / .js-product-variants-group de las compras rapidas de
 * productos relacionados.
 *
 * Modo prueba: solo corre si la URL trae ?ldr_test=1 (queda recordado en
 * este navegador hasta abrir una URL con ?ldr_test=0).
 */
(function () {
  "use strict";
  var CFG = {"barra": true, "escritorio": true, "saltoStock": true, "avisoCambio": true, "galeriaMobile": "puntos", "skuAbajo": "todos", "descAcordeon": "mobile", "modo": "test", "stores": ["ar", "cl"], "aparece": "scroll", "mostrarPrecio": true, "mostrarVariante": true, "textoBoton": "Agregar al carrito", "colorBoton": "#000000", "colorTexto": "#ffffff", "excluirCategorias": []};

  // ─── Tienda / modo prueba ─────────────────────────────────────────────
  function getStore() {
    var h = location.hostname || "";
    if (h.indexOf("leder.cl") !== -1) return "cl";
    if (h.indexOf("lederhd.com") !== -1) return "ar";
    return null;
  }

  function modoPruebaHabilitado() {
    var m = /[?&]ldr_test=([01])/.exec(location.search);
    try {
      if (m) {
        if (m[1] === "1") localStorage.setItem("ldr_test", "1");
        else localStorage.removeItem("ldr_test");
      }
      return localStorage.getItem("ldr_test") === "1";
    } catch (e) {
      return !!(m && m[1] === "1");
    }
  }

  function esMobile() {
    try { return window.matchMedia("(max-width: 767px)").matches; } catch (e) { return false; }
  }

  function categoriaExcluida() {
    var excl = (CFG.excluirCategorias || []).map(function (c) { return String(c).toLowerCase().trim(); }).filter(Boolean);
    if (!excl.length) return false;
    var links = document.querySelectorAll("a.crumb");
    for (var i = 0; i < links.length; i++) {
      var href = (links[i].getAttribute("href") || "").toLowerCase();
      for (var j = 0; j < excl.length; j++) {
        if (href.indexOf("/" + excl[j] + "/") !== -1) return true;
      }
    }
    return false;
  }

  // ─── Variantes (data-variants de #single-product) ─────────────────────
  var form, realBtn, variants = [], selects = [];

  function leerVariantes() {
    var sp = document.getElementById("single-product");
    if (!sp) return [];
    try { return JSON.parse(sp.getAttribute("data-variants") || "[]") || []; } catch (e) { return []; }
  }

  // selects[i] corresponde a optionI de data-variants (name="variation[i]")
  function leerSelects() {
    var out = [];
    Array.prototype.forEach.call(form.querySelectorAll("select.js-variation-option"), function (s) {
      var m = /variation\[(\d+)\]/.exec(s.name || "");
      if (m) out[parseInt(m[1], 10)] = s;
    });
    return out;
  }

  function opcionesActuales() {
    return selects.map(function (s) { return s ? s.value : null; });
  }

  function varianteDe(opts) {
    for (var i = 0; i < variants.length; i++) {
      var v = variants[i], ok = true;
      for (var k = 0; k < opts.length; k++) {
        if (opts[k] != null && v["option" + k] !== opts[k]) { ok = false; break; }
      }
      if (ok) return v;
    }
    return null;
  }

  function tieneStock(v) {
    if (!v) return false;
    if (v.available === false) return false;
    return v.stock === null || v.stock === undefined || v.stock > 0;
  }

  // Posicion de una opcion dentro de su variacion (orden de los botones/select)
  function indiceOpcion(k, valor) {
    var s = selects[k];
    if (!s) return 0;
    for (var i = 0; i < s.options.length; i++) {
      if (s.options[i].value === valor) return i;
    }
    return 0;
  }

  function nombreVariacion(k) {
    var s = selects[k];
    if (!s) return "";
    var lbl = form.querySelector('label[for="' + s.id + '"]');
    var txt = lbl ? lbl.textContent : "";
    return txt.replace(/:.*$/, "").trim();
  }

  // Elige la variante con stock que menos cambia: primero la que comparte
  // mas opciones con la actual; a igualdad, la que queda mas cerca en el
  // orden de cada opcion que cambia; a igualdad, la siguiente (mas grande).
  // fijo: indice de la variacion que el cliente acaba de tocar (ej. eligio
  // talle 40 -> se mantiene el 40 y se cambia el color, no al reves).
  function mejorAlternativa(actual, fijo) {
    var mejor = null, mejorScore = null;
    variants.forEach(function (v) {
      if (!tieneStock(v)) return;
      var respetaFijo = (fijo == null || v["option" + fijo] === actual[fijo]) ? 1 : 0;
      var coinciden = 0, distancia = 0, haciaArriba = 0;
      for (var k = 0; k < actual.length; k++) {
        if (actual[k] == null) continue;
        var val = v["option" + k];
        if (val === actual[k]) { coinciden++; continue; }
        var d = indiceOpcion(k, val) - indiceOpcion(k, actual[k]);
        distancia += Math.abs(d);
        if (d < 0) haciaArriba++;
      }
      var score = [respetaFijo, coinciden, -distancia, -haciaArriba];
      if (!mejorScore || comparar(score, mejorScore) > 0) { mejor = v; mejorScore = score; }
    });
    return mejor;
  }

  function comparar(a, b) {
    for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return a[i] - b[i]; }
    return 0;
  }

  // Cambia de variante como lo haria el cliente: clic en el boton real del
  // theme (.js-insta-variant). Cambiar solo el <select> deja los botones y
  // el texto "Talle: X" desactualizados (verificado en lederhd.com).
  var aplicandoSalto = false;
  var ultimaVariacionTocada = null;
  function seleccionarOpcion(k, valor) {
    var s = selects[k];
    if (!s) return;
    var vid = s.name.replace(/^variation\[|\]$/g, "");
    var btn = form.querySelector('.js-insta-variant[data-variation-id="' + vid + '"][data-option="' + cssEsc(valor) + '"]');
    if (btn) {
      btn.click();
    } else {
      s.value = valor;
      var ev;
      try { ev = new Event("change", { bubbles: true }); }
      catch (e) { ev = document.createEvent("HTMLEvents"); ev.initEvent("change", true, false); }
      s.dispatchEvent(ev);
    }
  }

  function indiceDeVariationId(vid) {
    for (var k = 0; k < selects.length; k++) {
      if (selects[k] && selects[k].name === "variation[" + vid + "]") return k;
    }
    return null;
  }

  function cssEsc(s) {
    return String(s).replace(/["\\]/g, "\\$&");
  }

  function revisarStock() {
    if (!CFG.saltoStock || aplicandoSalto || !variants.length || !selects.length) return;
    var actual = opcionesActuales();
    var v = varianteDe(actual);
    if (!v || tieneStock(v)) return;
    var fijo = ultimaVariacionTocada;
    var alt = mejorAlternativa(actual, fijo);
    ultimaVariacionTocada = null;
    if (!alt) return; // sin stock en ninguna variante: queda "Sin stock"
    aplicandoSalto = true;
    var cambios = [];
    for (var k = 0; k < actual.length; k++) {
      if (actual[k] == null) continue;
      var val = alt["option" + k];
      if (val !== actual[k]) {
        cambios.push({ nombre: nombreVariacion(k), de: actual[k], a: val });
        seleccionarOpcion(k, val);
      }
    }
    setTimeout(function () { aplicandoSalto = false; sincronizar(); }, 250);
    if (CFG.avisoCambio && cambios.length) {
      var fijoInfo = (fijo != null && alt["option" + fijo] === actual[fijo])
        ? { nombre: nombreVariacion(fijo), valor: actual[fijo] } : null;
      mostrarAviso(cambios, fijoInfo);
    }
  }

  // ─── Aviso de cambio de variante ──────────────────────────────────────
  var avisoEl = null, avisoTimer = null;
  // Ej: "Talle M sin stock, te mostramos L." /
  //     "Talle 39 no tiene stock en Stone, te mostramos Cognac."
  function mostrarAviso(cambios, fijoInfo) {
    var c = cambios[0];
    var txt;
    if (cambios.length > 1) {
      txt = "Esa combinaci\u00f3n no tiene stock, te mostramos " + cambios.map(function (x) { return x.a; }).join(" / ") + ".";
    } else if (fijoInfo) {
      txt = (fijoInfo.nombre ? fijoInfo.nombre + " " : "") + fijoInfo.valor + " no tiene stock en " + c.de + ", te mostramos " + c.a + ".";
    } else {
      txt = (c.nombre ? c.nombre + " " : "") + c.de + " sin stock, te mostramos " + c.a + ".";
    }
    if (!avisoEl) {
      avisoEl = document.createElement("div");
      avisoEl.className = "ldr-satc-aviso";
      avisoEl.setAttribute("role", "status");
      var cont = form.querySelector(".js-product-variants");
      if (cont && cont.parentNode) cont.parentNode.insertBefore(avisoEl, cont.nextSibling);
      else form.insertBefore(avisoEl, form.firstChild);
    }
    avisoEl.textContent = txt;
    avisoEl.style.display = "block";
    if (barNotice) { barNotice.textContent = txt; barNotice.style.display = "block"; }
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(function () {
      if (avisoEl) avisoEl.style.display = "none";
      if (barNotice) barNotice.style.display = "none";
      medirBarra();
    }, 6000);
    medirBarra();
  }

  // ─── Barra fija ───────────────────────────────────────────────────────
  var bar, barNotice, barVar, barVarTxt, barPrice, barBtn, botonVisible = true;

  // Mobile (<=767px): barra apilada (aviso / variante + Cambiar / precio + boton).
  // Escritorio (>=768px, solo si CFG.escritorio): una fila centrada en el ancho
  // del contenido del theme: miniatura + nombre/variante + precio/cuotas + boton.
  function injectStyle() {
    if (document.getElementById("ldr-satc-style")) return;
    var css =
      ".ldr-satc-aviso{display:none;margin:-8px 0 16px;padding:8px 10px;border-radius:6px;background:#fdf3e6;color:#7a4a12;font-size:13px;line-height:1.35}" +
      ".ldr-satc{display:none}" +
      ".ldr-satc{position:fixed;left:0;right:0;bottom:0;z-index:900;background:#fff;border-top:1px solid #ececec;" +
        "box-shadow:0 -4px 14px rgba(0,0,0,.08);transform:translateY(110%);transition:transform .25s ease;box-sizing:border-box}" +
      ".ldr-satc.is-on{transform:translateY(0)}" +
      ".ldr-satc__notice{display:none;font-size:13px;line-height:1.35;color:#7a4a12;background:#fdf3e6;border-radius:6px;padding:7px 10px}" +
      ".ldr-satc__img,.ldr-satc__name,.ldr-satc__cuotas{display:none}" +
      ".ldr-satc__var{display:flex;align-items:center;font-size:14px;min-width:0}" +
      ".ldr-satc__vartxt{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      ".ldr-satc__var a{flex-shrink:0;font-size:13px;text-decoration:underline;color:inherit;padding:4px 0}" +
      ".ldr-satc__row{display:flex;align-items:center;gap:12px}" +
      ".ldr-satc__price{display:flex;flex-direction:column;white-space:nowrap;line-height:1.15}" +
      ".ldr-satc__old{display:flex;gap:6px;align-items:center;font-size:12px}" +
      ".ldr-satc__old s{opacity:.6}" +
      ".ldr-satc__off{font-weight:700;color:#c0392b}" +
      ".ldr-satc__now{font-size:19px;font-weight:700}" +
      ".ldr-satc__btn{min-height:48px;border:0;border-radius:6px;font-size:16px;font-weight:500;font-family:inherit;cursor:pointer}" +
      ".ldr-satc__btn[disabled]{opacity:.5;cursor:default}" +
      // WhatsApp y aviso de cookies del theme (fixed abajo): se suben arriba de
      // la barra en vez de quedar tapados. body.ldr-satc-on solo esta puesto
      // mientras la barra se ve (mobile, o escritorio si esta habilitado).
      "body.ldr-satc-on .btn-whatsapp{bottom:calc(var(--ldr-satc-h,90px) + 12px)!important;transition:bottom .25s ease}" +
      "body.ldr-satc-on .js-notification-cookie-private{bottom:calc(var(--ldr-satc-h,90px) + 8px)!important}" +
      "@media (max-width:767px){" +
        ".ldr-satc{display:flex;flex-direction:column;gap:8px;padding:10px 16px 12px;padding-bottom:calc(12px + env(safe-area-inset-bottom))}" +
        ".ldr-satc__in{display:flex;flex-direction:column;gap:8px}" +
        ".ldr-satc__var{justify-content:space-between}" +
        ".ldr-satc__vartxt{flex:1;margin-right:10px}" +
        ".ldr-satc__btn{flex:1}" +
        // teclado abierto (ej. codigo postal del calculador de envio): en
        // Android la barra fija se pega arriba del teclado y tapa el campo
        ".ldr-satc.is-on.is-kbd{transform:translateY(110%)}" +
      "}" +
      "@media (min-width:768px){" +
        ".ldr-satc.ldr-satc--desk{display:block;padding:14px 24px}" +
        // ancho = el del contenedor del theme (medido en vivo -> --ldr-satc-w),
        // asi la barra queda alineada con los bordes de la ficha en cualquier monitor
        ".ldr-satc--desk .ldr-satc__notice{max-width:var(--ldr-satc-w,1270px);margin:0 auto 10px}" +
        ".ldr-satc--desk .ldr-satc__in{display:flex;align-items:center;gap:16px;max-width:var(--ldr-satc-w,1270px);margin:0 auto}" +
        ".ldr-satc--desk .ldr-satc__img{display:block;width:52px;height:52px;object-fit:cover;object-position:center 20%;border-radius:4px;flex:none}" +
        ".ldr-satc--desk .ldr-satc__info{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}" +
        ".ldr-satc--desk .ldr-satc__name{display:block;font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
        ".ldr-satc--desk .ldr-satc__var{font-size:13px;opacity:.8}" +
        ".ldr-satc--desk .ldr-satc__var a{margin-left:8px;font-size:13px;padding:0}" +
        ".ldr-satc--desk .ldr-satc__row{gap:20px}" +
        ".ldr-satc--desk .ldr-satc__price{align-items:flex-end}" +
        ".ldr-satc--desk .ldr-satc__now{font-size:20px}" +
        ".ldr-satc--desk .ldr-satc__cuotas{display:block;font-size:12px;opacity:.75}" +
        ".ldr-satc--desk .ldr-satc__btn{width:240px;flex:none}" +
      "}" +
      // tablets / notebooks chicas: boton mas angosto para que entre el nombre
      "@media (min-width:768px) and (max-width:1023px){" +
        ".ldr-satc--desk .ldr-satc__btn{width:190px}" +
        ".ldr-satc--desk .ldr-satc__row{gap:14px}" +
        ".ldr-satc--desk .ldr-satc__in{gap:12px}" +
      "}" +
      "@media (prefers-reduced-motion:reduce){.ldr-satc{transition:none}}";
    var st = document.createElement("style");
    st.id = "ldr-satc-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  var barImg, barName, barCuotas;
  function crearBarra() {
    bar = document.createElement("div");
    bar.className = "ldr-satc" + (CFG.escritorio ? " ldr-satc--desk" : "");
    bar.setAttribute("aria-hidden", "true");
    bar.innerHTML =
      '<div class="ldr-satc__notice" role="status"></div>' +
      '<div class="ldr-satc__in">' +
        '<img class="ldr-satc__img" alt="">' +
        '<div class="ldr-satc__info">' +
          '<span class="ldr-satc__name"></span>' +
          '<div class="ldr-satc__var"><span class="ldr-satc__vartxt"></span><a href="#">Cambiar</a></div>' +
        "</div>" +
        '<div class="ldr-satc__row">' +
          '<div class="ldr-satc__price"></div>' +
          '<button type="button" class="ldr-satc__btn"></button>' +
        "</div>" +
      "</div>";
    document.body.appendChild(bar);
    // El alto cambia con el aviso o con 2 lineas de variantes: el WhatsApp y
    // el aviso de cookies se suben segun el alto real
    if ("ResizeObserver" in window) new ResizeObserver(medirBarra).observe(bar);
    barNotice = bar.querySelector(".ldr-satc__notice");
    barVar = bar.querySelector(".ldr-satc__var");
    barVarTxt = bar.querySelector(".ldr-satc__vartxt");
    barPrice = bar.querySelector(".ldr-satc__price");
    barBtn = bar.querySelector(".ldr-satc__btn");
    barImg = bar.querySelector(".ldr-satc__img");
    barName = bar.querySelector(".ldr-satc__name");
    barBtn.style.background = CFG.colorBoton || "#000000";
    barBtn.style.color = CFG.colorTexto || "#ffffff";
    if (!CFG.mostrarPrecio) barPrice.style.display = "none";
    var nombreEl = document.querySelector("#single-product .js-product-name");
    barName.textContent = nombreEl ? nombreEl.textContent.replace(/\s+/g, " ").trim() : "";
    barImg.addEventListener("error", function () { barImg.style.visibility = "hidden"; });

    barBtn.addEventListener("click", function () {
      if (realBtn.disabled) return;
      realBtn.click();
    });
    barVar.querySelector("a").addEventListener("click", function (e) {
      e.preventDefault();
      var cont = form.querySelector(".js-product-variants") || form;
      var head = document.querySelector(".js-head-main");
      var off = head ? head.getBoundingClientRect().height : 0;
      var y = cont.getBoundingClientRect().top + window.pageYOffset - off - 16;
      try { window.scrollTo({ top: y, behavior: "smooth" }); } catch (err) { window.scrollTo(0, y); }
    });
  }

  // "$45.832,50" con el mismo formato que usa la tienda ($ + . miles + , decimales)
  function formatoMoneda(n) {
    var entero = Math.floor(n), dec = Math.round((n - entero) * 100);
    if (dec === 100) { entero++; dec = 0; }
    var txt = String(entero).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "$" + txt + (dec ? "," + (dec < 10 ? "0" : "") + dec : "");
  }

  // Mayor cantidad de cuotas sin interes de la variante, de cualquier medio de pago
  function textoCuotas(v) {
    if (!v || !v.installments_data) return "";
    var data;
    try { data = JSON.parse(v.installments_data); } catch (e) { return ""; }
    var mejorN = 1, mejorValor = 0;
    for (var prov in data) {
      if (!data.hasOwnProperty(prov)) continue;
      for (var n in data[prov]) {
        if (!data[prov].hasOwnProperty(n)) continue;
        var c = data[prov][n], num = parseInt(n, 10);
        if (c && c.without_interests && num > mejorN) { mejorN = num; mejorValor = c.installment_value; }
      }
    }
    return mejorN > 1 ? mejorN + " x " + formatoMoneda(mejorValor) + " sin interés" : "";
  }

  function textoVariantes() {
    var partes = [];
    selects.forEach(function (s, k) {
      if (!s) return;
      var op = s.options[s.selectedIndex];
      var nombre = nombreVariacion(k);
      partes.push((nombre ? nombre + ": " : "") + (op ? op.text : s.value));
    });
    return partes.join(" · ");
  }

  function varianteActual() {
    if (!variants.length) return null;
    if (!selects.length) return variants[0];
    return varianteDe(opcionesActuales());
  }

  function textoDe(sel) {
    var el = document.querySelector("#single-product " + sel);
    if (!el || el.style.display === "none") return "";
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function sincronizar() {
    if (!bar) return;
    // Variante
    var tv = CFG.mostrarVariante ? textoVariantes() : "";
    barVar.style.display = tv ? "flex" : "none";
    barVarTxt.textContent = tv;
    // Precio
    if (CFG.mostrarPrecio) {
      var ahora = textoDe(".js-price-display");
      var antes = textoDe(".js-compare-price-display");
      var off = textoDe(".js-offer-percentage");
      var offVisible = (function () {
        var el = document.querySelector("#single-product .js-offer-percentage");
        return el && el.parentNode && el.parentNode.style.display !== "none";
      })();
      barPrice.innerHTML = "";
      if (antes) {
        var old = document.createElement("div");
        old.className = "ldr-satc__old";
        var s = document.createElement("s"); s.textContent = antes; old.appendChild(s);
        if (off && offVisible) { var o = document.createElement("span"); o.className = "ldr-satc__off"; o.textContent = off + "% OFF"; old.appendChild(o); }
        barPrice.appendChild(old);
      }
      if (ahora) {
        var n = document.createElement("span"); n.className = "ldr-satc__now"; n.textContent = ahora; barPrice.appendChild(n);
      }
      // cuotas: solo se ven en escritorio (CSS)
      var cuotas = ahora ? textoCuotas(varianteActual()) : "";
      if (cuotas) {
        var cq = document.createElement("span"); cq.className = "ldr-satc__cuotas"; cq.textContent = cuotas; barPrice.appendChild(cq);
      }
      barPrice.style.display = ahora ? "flex" : "none";
    }
    // Miniatura (solo escritorio): imagen de la variante elegida
    if (barImg) {
      var va = varianteActual();
      var src = va && va.image_url ? (va.image_url.indexOf("//") === 0 ? "https:" + va.image_url : va.image_url) : "";
      if (!src) {
        var g = document.querySelector("#single-product .js-product-slide-img");
        src = g ? (g.currentSrc || g.getAttribute("data-src") || g.src || "") : "";
      }
      if (src && barImg.getAttribute("src") !== src) { barImg.style.visibility = ""; barImg.setAttribute("src", src); }
    }
    // Boton: mismo estado que el real
    var esCarrito = /(^|\s)cart(\s|$)/.test(realBtn.className);
    barBtn.textContent = esCarrito ? (CFG.textoBoton || realBtn.value) : realBtn.value;
    barBtn.disabled = !!realBtn.disabled;
    medirBarra();
  }

  function medirBarra() {
    if (!bar) return;
    var h = bar.getBoundingClientRect().height || 90;
    document.body.style.setProperty("--ldr-satc-h", h + "px");
    if (CFG.escritorio) {
      var c = document.querySelector("#single-product .container") || document.querySelector(".container");
      if (c) {
        var cs = window.getComputedStyle(c);
        var w = c.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
        if (w > 300) bar.style.setProperty("--ldr-satc-w", Math.round(w) + "px");
      }
    }
  }

  function actualizarVisibilidad() {
    if (!bar) return;
    var on = (esMobile() || !!CFG.escritorio) && (CFG.aparece === "siempre" || !botonVisible);
    bar.classList.toggle("is-on", on);
    bar.setAttribute("aria-hidden", on ? "false" : "true");
    document.body.classList.toggle("ldr-satc-on", on);
    if (on) medirBarra();
  }

  // ─── Galeria mobile (solo <=767px) ───────────────────────────────────
  // El theme (store.js.tpl > productSliderNav) arma la galeria con Swiper
  // sobre .js-swiper-product (slidesPerView 1, paginacion "fraction" en
  // .js-swiper-product-pagination) y las miniaturas en otro Swiper aparte
  // (.js-swiper-product-thumbs). Se toma la MISMA instancia del theme
  // (elemento.swiper) y solo se le cambian parametros, asi el salto de imagen
  // al cambiar de variante (productSwiper.slideTo del theme) sigue andando.
  //   "asoma":  sin miniaturas, se ve ~13% de la foto siguiente
  //   "puntos": sin miniaturas, puntitos debajo en vez del contador "1 / 7"
  function iniciarGaleria(intentos) {
    var modo = CFG.galeriaMobile;
    if (modo !== "asoma" && modo !== "puntos") return;
    if (!esMobile()) return;
    intentos = intentos === undefined ? 40 : intentos;
    var el = document.querySelector("#single-product .js-swiper-product") || document.querySelector(".js-swiper-product");
    var sw = el && el.swiper;
    if (!sw || !sw.slides) {
      // el theme inicializa Swiper en LS.ready, puede ser despues que nosotros
      if (intentos > 0) setTimeout(function () { iniciarGaleria(intentos - 1); }, 150);
      else if (window.console) console.warn("[ldr-satc] galeria: no se encontro el Swiper de .js-swiper-product");
      return;
    }
    if (el.getAttribute("data-ldr-gal")) return;
    el.setAttribute("data-ldr-gal", modo);
    injectGaleriaStyle();
    ocultarMiniaturas();
    if (sw.slides.length < 2) return; // una sola foto: solo se sacan las miniaturas

    if (modo === "asoma") {
      sw.params.slidesPerView = 1.15;
      sw.params.spaceBetween = 8;
      sw.params.centerInsufficientSlides = false;
      if (sw.params.lazy && typeof sw.params.lazy === "object") sw.params.lazy.loadPrevNext = true;
      sw.update();
      cargarFotosCercanas(sw);
      if (typeof sw.on === "function") sw.on("slideChange", function () { cargarFotosCercanas(sw); });
    } else {
      crearPuntitos(el, sw);
    }
  }

  function injectGaleriaStyle() {
    if (document.getElementById("ldr-gal-style")) return;
    var css =
      "@media (max-width:767px){" +
        ".ldr-gal-oculto{display:none!important}" +
        ".js-swiper-product[data-ldr-gal=puntos] ~ .js-swiper-product-pagination," +
        ".js-swiper-product[data-ldr-gal=puntos] .js-swiper-product-pagination{display:none!important}" +
        ".ldr-gal-dots{display:flex;justify-content:center;gap:7px;padding:10px 0 2px}" +
        ".ldr-gal-dots span{width:6px;height:6px;border-radius:3px;background:#c9c9c9;transition:width .2s ease,background .2s ease}" +
        ".ldr-gal-dots span.is-on{width:18px;background:#111}" +
      "}";
    var st = document.createElement("style");
    st.id = "ldr-gal-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // Oculta el carrusel de miniaturas y sus flechas. Si el contenedor que las
  // envuelve no tiene otra cosa adentro, se oculta tambien (sino deja su margen).
  function ocultarMiniaturas() {
    var thumbs = document.querySelectorAll("#single-product .js-swiper-product-thumbs, #single-product .js-swiper-product-thumbs-prev, #single-product .js-swiper-product-thumbs-next");
    Array.prototype.forEach.call(thumbs, function (t) { t.classList.add("ldr-gal-oculto"); });
    var base = document.querySelector("#single-product .js-swiper-product-thumbs");
    var padre = base && base.parentElement;
    if (padre && !padre.querySelector(".js-swiper-product") && padre.id !== "single-product") {
      var otros = Array.prototype.filter.call(padre.children, function (c) { return !c.classList.contains("ldr-gal-oculto"); });
      if (!otros.length) padre.classList.add("ldr-gal-oculto");
    }
  }

  // Con slidesPerView 1.15 la foto siguiente se ve desde el principio: si el
  // theme la tiene en lazy (data-src / data-srcset) se carga ya.
  function cargarFotosCercanas(sw) {
    for (var i = sw.activeIndex; i <= sw.activeIndex + 2 && i < sw.slides.length; i++) {
      var imgs = sw.slides[i].querySelectorAll("img");
      Array.prototype.forEach.call(imgs, function (img) {
        var ds = img.getAttribute("data-srcset"), d = img.getAttribute("data-src");
        if (ds && !img.getAttribute("srcset")) img.setAttribute("srcset", ds);
        if (d && (!img.getAttribute("src") || /^data:/.test(img.getAttribute("src")))) img.setAttribute("src", d);
        img.classList.add("lazyloaded");
      });
    }
  }

  function crearPuntitos(el, sw) {
    var n = sw.slides.length;
    var cont = document.createElement("div");
    cont.className = "ldr-gal-dots";
    cont.setAttribute("aria-hidden", "true");
    for (var i = 0; i < n; i++) cont.appendChild(document.createElement("span"));
    // debajo del bloque de la galeria (despues de la flecha/paginacion del theme si estan afuera)
    el.parentNode.insertBefore(cont, el.nextSibling);
    var pag = document.querySelectorAll("#single-product .js-swiper-product-pagination");
    Array.prototype.forEach.call(pag, function (p) { p.classList.add("ldr-gal-oculto"); });
    function marcar() {
      var idx = typeof sw.realIndex === "number" ? sw.realIndex : sw.activeIndex;
      Array.prototype.forEach.call(cont.children, function (d, i) { d.classList.toggle("is-on", i === idx); });
    }
    marcar();
    if (typeof sw.on === "function") sw.on("slideChange", marcar);
  }

  // ─── SKU debajo de la descripcion ─────────────────────────────────────
  // El SKU es guia para los vendedores: no se oculta, se baja. El original
  // (.js-product-sku, que el theme actualiza solo al cambiar de variante) NO
  // se mueve: se oculta en su lugar y se muestra una copia debajo de la
  // descripcion (.user-content, selector confirmado en vivo en el modulo
  // PDP - Descripcion) que copia el texto del original cada vez que cambia.
  // CFG.skuAbajo: "off" | "mobile" (solo <=767px) | "todos"
  function iniciarSku(intentos) {
    var modo = CFG.skuAbajo;
    if (modo !== "mobile" && modo !== "todos") return;
    intentos = intentos === undefined ? 40 : intentos;
    var orig = document.querySelector("#single-product .js-product-sku");
    var desc = buscarDescripcion();
    if (!orig || !desc) {
      if (intentos > 0) setTimeout(function () { iniciarSku(intentos - 1); }, 150);
      return; // producto sin SKU visible o sin descripcion: queda como esta
    }
    if (document.querySelector(".ldr-sku")) return;
    var origCont = orig.parentElement;

    var css = modo === "mobile"
      ? "@media (max-width:767px){.ldr-sku-arriba{display:none!important}}@media (min-width:768px){.ldr-sku{display:none!important}}"
      : ".ldr-sku-arriba{display:none!important}";
    var st = document.createElement("style");
    st.id = "ldr-sku-style";
    st.textContent = ".ldr-sku{font-size:12px;opacity:.6;margin:16px 0 8px}" + css;
    document.head.appendChild(st);

    var copia = document.createElement("div");
    copia.className = "ldr-sku";
    var etiqueta = (origCont.textContent || "").replace(orig.textContent || "", "").replace(/\s+/g, " ").trim() || "SKU:";
    copia.appendChild(document.createTextNode(etiqueta + " "));
    var val = document.createElement("span");
    copia.appendChild(val);
    function copiar() { val.textContent = (orig.textContent || "").trim(); }
    copiar();
    new MutationObserver(copiar).observe(orig, { childList: true, characterData: true, subtree: true });

    // Despues de la descripcion y de cualquier bloque de nuestros modulos que
    // haya quedado pegado a ella (ej. PDP - Descripcion, prefijo ldr-)
    var ref = desc;
    var acc = desc.closest && desc.closest(".ldr-desc-acc");
    if (acc) ref = acc; // con acordeon el SKU queda afuera, siempre visible
    while (ref.nextElementSibling && /(^|\s|-)ldr-|^ldr-/.test((ref.nextElementSibling.className || "") + " " + (ref.nextElementSibling.id || ""))) {
      ref = ref.nextElementSibling;
    }
    ref.parentNode.insertBefore(copia, ref.nextSibling);
    origCont.classList.add("ldr-sku-arriba");
  }

  // La descripcion es el .user-content de la ficha; se descartan los de
  // modales (ej. guia de talles, que tambien usa .user-content).
  function buscarDescripcion() {
    var lista = document.querySelectorAll(".user-content");
    var primera = null;
    for (var i = 0; i < lista.length; i++) {
      var el = lista[i];
      if (el.closest && el.closest(".modal, .js-modal-private, [id*='modal']")) continue;
      var prev = el.previousElementSibling;
      if (prev && /descrip/i.test(prev.textContent || "") && (prev.textContent || "").length < 40) return el;
      if (!primera) primera = el;
    }
    return primera;
  }

  // ─── Descripcion en acordeon (solo mobile) ────────────────────────────
  // Mismo look que el acordeon "Medios de envio" que ya esta en layout.tpl
  // (.ldr-shipping-accordion: borde arriba, titulo en mayusculas, flecha que
  // gira). El titulo nativo "Descripcion" (hermano anterior de .user-content)
  // pasa a ser el boton; la descripcion queda adentro, cerrada al cargar.
  // El texto sigue en el HTML (SEO), solo se oculta visualmente.
  // No se aplica si el producto usa PDP - Descripcion (secciones full-width:
  // ese modulo oculta el titulo nativo y agrega bloques ldr- pegados).
  // CFG.descAcordeon: "off" | "mobile"
  function iniciarAcordeon(intentos) {
    if (CFG.descAcordeon !== "mobile" || !esMobile()) return;
    intentos = intentos === undefined ? 40 : intentos;
    var desc = buscarDescripcion();
    if (!desc) {
      if (intentos > 0) setTimeout(function () { iniciarAcordeon(intentos - 1); }, 150);
      return;
    }
    if (desc.closest && desc.closest(".ldr-desc-acc")) return;
    var titulo = desc.previousElementSibling;
    var tituloOk = titulo && /descrip/i.test(titulo.textContent || "") && (titulo.textContent || "").length < 40;
    if (tituloOk && window.getComputedStyle(titulo).display === "none") return; // PDP - Descripcion activo
    var sig = desc.nextElementSibling;
    if (sig && /(^|\s)ldr-pdesc|ldr-pdp-desc/.test((sig.className || "") + " " + (sig.id || ""))) return;
    if (window.getComputedStyle(desc).display === "none") return;

    injectAcordeonStyle();
    var texto = tituloOk ? (titulo.textContent || "").replace(/\s+/g, " ").trim() : "Descripción";

    var wrap = document.createElement("div");
    wrap.className = "ldr-desc-acc";
    var btn = document.createElement("a");
    btn.href = "#";
    btn.className = "ldr-desc-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "ldr-desc-content");
    btn.innerHTML =
      '<span class="ldr-desc-title"></span>' +
      '<svg class="ldr-desc-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">' +
      '<path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btn.querySelector(".ldr-desc-title").textContent = texto;
    var cont = document.createElement("div");
    cont.className = "ldr-desc-content";
    cont.id = "ldr-desc-content";
    cont.style.display = "none";

    var ref = tituloOk ? titulo : desc;
    ref.parentNode.insertBefore(wrap, ref);
    wrap.appendChild(btn);
    wrap.appendChild(cont);
    if (tituloOk) titulo.classList.add("ldr-desc-titulo-orig");
    cont.appendChild(desc);

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var abierto = wrap.classList.contains("is-open");
      wrap.classList.toggle("is-open", !abierto);
      btn.setAttribute("aria-expanded", String(!abierto));
      cont.style.display = abierto ? "none" : "block";
    });
  }

  function injectAcordeonStyle() {
    if (document.getElementById("ldr-desc-style")) return;
    var css =
      "@media (max-width:767px){" +
        ".ldr-desc-titulo-orig{display:none!important}" +
        ".ldr-desc-acc{border-top:1px solid #e5e5e5;margin-bottom:12px}" +
        ".ldr-desc-toggle{display:flex;align-items:center;justify-content:space-between;padding:14px 4px 14px 0;color:inherit;text-decoration:none;cursor:pointer}" +
        ".ldr-desc-toggle:hover,.ldr-desc-toggle:focus{color:inherit;text-decoration:none}" +
        ".ldr-desc-title{font-weight:600;text-transform:uppercase;font-size:.85rem}" +
        ".ldr-desc-chevron{transition:transform .25s ease;flex-shrink:0}" +
        ".ldr-desc-acc.is-open .ldr-desc-chevron{transform:rotate(180deg)}" +
        ".ldr-desc-content{padding-bottom:12px}" +
      "}";
    var st = document.createElement("style");
    st.id = "ldr-desc-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // ─── Arranque ─────────────────────────────────────────────────────────
  function iniciar() {
    variants = leerVariantes();
    selects = leerSelects();

    // Cambios de variante: clic en botones del theme o cambio de select
    form.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".js-insta-variant");
      if (b) {
        if (!aplicandoSalto) ultimaVariacionTocada = indiceDeVariationId(b.getAttribute("data-variation-id"));
        setTimeout(function () { revisarStock(); sincronizar(); }, 120);
      }
    });
    form.addEventListener("change", function (e) {
      if (e.target.classList && e.target.classList.contains("js-variation-option")) {
        if (!aplicandoSalto) ultimaVariacionTocada = indiceDeVariationId((e.target.name || "").replace(/^variation\[|\]$/g, ""));
        setTimeout(function () { revisarStock(); sincronizar(); }, 120);
      }
    });

    // Al cargar (ej. ?variant= de una variante sin stock)
    revisarStock();

    if (CFG.barra) {
      injectStyle();
      crearBarra();
      // El theme cambia texto/disabled/clase del boton real y el precio al
      // cambiar de variante: se observa solo ese boton y ese contenedor.
      new MutationObserver(sincronizar).observe(realBtn, { attributes: true, attributeFilter: ["value", "disabled", "class"] });
      var pc = document.querySelector("#single-product .js-price-container");
      if (pc) new MutationObserver(sincronizar).observe(pc, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["style"] });

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          botonVisible = entries[0].isIntersecting;
          actualizarVisibilidad();
        }).observe(realBtn);
      } else {
        botonVisible = false;
      }
      window.addEventListener("resize", function () { actualizarVisibilidad(); medirBarra(); });
      document.addEventListener("focusin", function (e) {
        var t = e.target;
        if (t && !bar.contains(t) && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !/^(submit|button|checkbox|radio|hidden)$/i.test(t.type || "")) {
          bar.classList.add("is-kbd");
        }
      });
      document.addEventListener("focusout", function () {
        setTimeout(function () {
          var a = document.activeElement;
          if (!a || !/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) bar.classList.remove("is-kbd");
        }, 50);
      });
      sincronizar();
      actualizarVisibilidad();
    } else {
      injectStyle(); // solo para el aviso de cambio de variante
    }
  }

  function run(intentos) {
    intentos = intentos === undefined ? 40 : intentos;
    var conGaleria = CFG.galeriaMobile === "asoma" || CFG.galeriaMobile === "puntos";
    var conSku = CFG.skuAbajo === "mobile" || CFG.skuAbajo === "todos";
    var conAcordeon = CFG.descAcordeon === "mobile";
    if (!CFG.barra && !CFG.saltoStock && !conGaleria && !conSku && !conAcordeon) return;
    var store = getStore();
    if (!store || (CFG.stores || []).indexOf(store) === -1) return;
    if (CFG.modo !== "live" && !modoPruebaHabilitado()) return;
    if (!window.LS || window.LS.template !== "product") {
      if (intentos > 0 && !window.LS) setTimeout(function () { run(intentos - 1); }, 150);
      return;
    }
    form = document.getElementById("product_form");
    realBtn = form && form.querySelector(".js-addtocart.js-prod-submit-form");
    if (!form || !realBtn) {
      if (intentos > 0) setTimeout(function () { run(intentos - 1); }, 150);
      return;
    }
    if (categoriaExcluida()) return;
    if (window.__ldrSatc) return; // ya inicializado
    window.__ldrSatc = true;
    iniciar();
    iniciarGaleria();
    iniciarSku();
    iniciarAcordeon();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { run(); });
  } else {
    run();
  }
})();
