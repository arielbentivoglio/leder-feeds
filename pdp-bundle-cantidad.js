/*!
 * LEDER — PDP Bundle por cantidad (runtime)
 * Generado/publicado por bundle_cantidad_panel.py — NO editar a mano, lo pisa
 * cada guardado del panel.
 * Generado: 2026-11-24 11:50:29
 *
 * Solo muestra precios. El descuento real lo aplica la promocion nativa
 * "Descuento progresivo" de Tiendanube, que tiene que tener los mismos
 * escalones que este modulo.
 */
(function () {
  "use strict";

  var SETS = /*__BUNDLE_SETS__*/ [{"id": "individuales", "activo": true, "stores": ["ar"], "alcance": {"tipo": "categoria", "valores": ["37062390"], "productos": ["320847490", "320849117", "320851596", "320858418", "320860883", "320861265", "320863164", "320864136"], "handles": ["individuales"]}, "titulo": "Llevá más y ahorrá", "tiers": [{"cantidad": 1, "descuento_pct": 0, "etiqueta": "Lleva 1 a 3", "subtitulo": "", "badges": [], "preseleccionado": true, "permitir_mas": true}, {"cantidad": 4, "descuento_pct": 10.0, "etiqueta": "Lleva 4 o más", "subtitulo": "Ideal para regalar", "badges": [{"texto": "MÁS VENDIDO", "color": "#ef4444"}], "preseleccionado": false, "permitir_mas": true}], "color_acento": "#1a1a1a", "color_ahorro": "#0f8a5f", "mostrar_ahorro": true, "mostrar_tachado": true, "mostrar_cuotas": true, "ocultar_cantidad_nativa": true, "fuente_descuento": "promo_tn", "ocultar_promo_nativa": true, "anchor_selector": "", "anchor_position": "before"}] /*__END_SETS__*/;
  var TRAMOS_AR = /*__TRAMOS_AR__*/ [{"umbral": 499990.0, "cuotas": 12}, {"umbral": 399990.0, "cuotas": 9}, {"umbral": 149990.0, "cuotas": 6}, {"umbral": 0.0, "cuotas": 3}] /*__END_TRAMOS__*/;

  var MOUNT_ID = "ldr-bundle-qty";
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
      return cats.map(function (c) { return String(c && c.id != null ? c.id : c); });
    } catch (e) { return []; }
  }

  // Segmentos de las URLs del breadcrumb (ej. /deco/accesorios_de_mesa/individuales/
  // -> deco, accesorios_de_mesa, individuales). En Brasilia LS.product NO trae
  // categorias, asi que el breadcrumb es lo unico de categoria que hay en la ficha.
  function breadcrumbHandles() {
    var out = [];
    var links = document.querySelectorAll('.breadcrumbs a, [class*="breadcrumb"] a');
    for (var i = 0; i < links.length; i++) {
      var path = (links[i].getAttribute("href") || "").replace(/^https?:\/\/[^\/]+/, "");
      path.split("/").forEach(function (seg) { if (seg) out.push(seg.toLowerCase()); });
    }
    return out;
  }

  function matches(set) {
    if (!set.activo) return false;
    if ((set.stores || []).indexOf(currentStore()) === -1) return false;
    var al = set.alcance || {};
    var vals = (al.valores || []).map(String);
    var pid = currentProductId();
    if (al.tipo === "producto") return vals.indexOf(pid) !== -1;
    if (al.tipo === "categoria") {
      // 1) productos de la categoria resueltos por el panel al publicar
      if ((al.productos || []).indexOf(pid) !== -1) return true;
      // 2) productos agregados despues: handle de la categoria en el breadcrumb
      var hs = al.handles || [];
      if (hs.length) {
        var bc = breadcrumbHandles();
        if (hs.some(function (h) { return bc.indexOf(h) !== -1; })) return true;
      }
      // 3) por si algun theme expone LS.product.categories
      var cats = currentCategoryIds();
      return vals.some(function (v) { return cats.indexOf(v) !== -1; });
    }
    return false;
  }

  // Producto le gana a Categoria si los dos matchean
  function pickSet() {
    var c = SETS.filter(matches);
    if (!c.length) return null;
    c.sort(function (a, b) {
      return ((b.alcance || {}).tipo === "producto" ? 1 : 0) - ((a.alcance || {}).tipo === "producto" ? 1 : 0);
    });
    return c[0];
  }

  // ─── Formato de moneda (separadores de LS.currency) ───────────────────────
  function fmt(n) {
    var cur = (window.LS && window.LS.currency) || {};
    var th = cur.thousands_separator || ".";
    var dc = cur.cents_separator || ",";
    var sym = cur.display_short || "$";
    var neg = n < 0;
    n = Math.abs(Math.round(n * 100) / 100);
    var ent = Math.floor(n);
    var cents = Math.round((n - ent) * 100);
    var s = String(ent).replace(/\B(?=(\d{3})+(?!\d))/g, th);
    if (cents > 0) s += dc + (cents < 10 ? "0" : "") + cents;
    return (neg ? "-" : "") + sym + s;
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  // ─── Variante elegida / precio / stock ────────────────────────────────────
  function form() { return document.getElementById("product_form"); }

  function qtyInput() {
    var f = form();
    return f ? f.querySelector(".js-quantity-input") : null;
  }

  function selectedVariant() {
    var vs = (window.LS && window.LS.variants) || [];
    if (!vs.length) return null;
    if (vs.length === 1) return vs[0];
    var f = form();
    var opts = [];
    if (f) {
      var sels = f.querySelectorAll("select.js-variation-option");
      for (var i = 0; i < sels.length; i++) {
        var m = (sels[i].name || "").match(/variation\[(\d+)\]/);
        if (m) opts[parseInt(m[1], 10)] = sels[i].value;
      }
    }
    for (var j = 0; j < vs.length; j++) {
      var v = vs[j], ok = true;
      for (var k = 0; k < 3; k++) {
        if (opts[k] != null && v["option" + k] != null && String(v["option" + k]) !== String(opts[k])) { ok = false; break; }
      }
      if (ok) return v;
    }
    return vs[0];
  }

  function precioBase(v) {
    if (!v) return null;
    var p = v.price_number;
    return (typeof p === "number" && p > 0) ? p : null;
  }

  function hayStock(v, cantidad) {
    if (!v) return false;
    if (v.available === false) return false;
    if (v.stock == null) return true; // sin limite de stock
    return v.stock >= cantidad;
  }

  // ─── Descuento: promo nativa de Tiendanube o manual ──────────────────────
  // fuente_descuento "promo_tn": el % sale del bloque nativo que Tiendanube
  // renderiza server-side en la ficha (solo con las promos que aplican a ese
  // producto): div[data-store="product-promotion-info"]
  // [data-promotion-type="quantity-discounts"] > table > tr > th "10% OFF" /
  // td "Comprando 4 unidades o más". Si dos promos repiten el mismo escalon
  // se cuenta una vez; si difieren, gana el mayor % (Tiendanube aplica el
  // mejor descuento). Sin promo -> 0%: nunca se promete un descuento que el
  // carrito no cobra.
  var PROMO_TN = null;

  function leerPromoTN() {
    var filas = [];
    var conts = document.querySelectorAll('[data-store="product-promotion-info"][data-promotion-type="quantity-discounts"]');
    for (var c = 0; c < conts.length; c++) {
      var trs = conts[c].querySelectorAll("tr");
      for (var i = 0; i < trs.length; i++) {
        var th = trs[i].querySelector("th"), td = trs[i].querySelector("td");
        if (!th || !td) continue;
        var mp = (th.textContent || "").match(/(\d+(?:[.,]\d+)?)\s*%/);
        var mq = (td.textContent || "").match(/(\d+)/);
        if (!mp || !mq) continue;
        filas.push({ min: parseInt(mq[1], 10), pct: parseFloat(mp[1].replace(",", ".")) });
      }
    }
    var porMin = {};
    filas.forEach(function (f) { if (!(f.min in porMin) || f.pct > porMin[f.min]) porMin[f.min] = f.pct; });
    return Object.keys(porMin).map(function (k) { return { min: +k, pct: porMin[k] }; })
      .sort(function (a, b) { return a.min - b.min; });
  }

  function pctPara(set, t, q) {
    if (set.fuente_descuento !== "promo_tn") return t.descuento_pct || 0;
    if (PROMO_TN === null) PROMO_TN = leerPromoTN();
    var pct = 0;
    for (var i = 0; i < PROMO_TN.length; i++) {
      if (q >= PROMO_TN[i].min && PROMO_TN[i].pct > pct) pct = PROMO_TN[i].pct;
    }
    return pct;
  }

  function cuotasPara(total) {
    if (currentStore() !== "ar" || !TRAMOS_AR.length) return null;
    for (var i = 0; i < TRAMOS_AR.length; i++) {
      if (total >= TRAMOS_AR[i].umbral) return TRAMOS_AR[i].cuotas;
    }
    return null;
  }

  // ─── Estilos ──────────────────────────────────────────────────────────────
  function injectStyles(set) {
    if (document.getElementById("ldr-bq-style")) return;
    var ac = set.color_acento || "#1a1a1a";
    var css =
      "#" + MOUNT_ID + "{margin:0 0 18px;font-family:inherit}" +
      ".ldr-bq__title{font-size:18px;font-weight:600;margin:0 0 14px;color:" + ac + "}" +
      ".ldr-bq__opt{position:relative;border:1px solid #dcdcdc;border-radius:8px;margin-top:14px;cursor:pointer;background:#fff;transition:border-color .15s}" +
      ".ldr-bq__opt:first-of-type{margin-top:0}" +
      ".ldr-bq__opt.has-badges{margin-top:20px}" +
      ".ldr-bq__opt.is-sel{border-color:" + ac + ";box-shadow:0 0 0 1px " + ac + ";cursor:default}" +
      ".ldr-bq__opt.is-off{opacity:.45;cursor:not-allowed}" +
      ".ldr-bq__main{display:flex;align-items:center;gap:12px;padding:16px 12px}" +
      ".ldr-bq__radio{flex:0 0 18px;width:18px;height:18px;border:1.5px solid " + ac + ";border-radius:50%;position:relative}" +
      ".ldr-bq__opt.is-sel .ldr-bq__radio:after{content:'';position:absolute;inset:3px;border-radius:50%;background:" + ac + "}" +
      ".ldr-bq__info{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}" +
      ".ldr-bq__name{font-size:16px;font-weight:600;line-height:1.2}" +
      ".ldr-bq__sub{font-size:12px;opacity:.8}" +
      ".ldr-bq__save{align-self:flex-start;font-size:11px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;color:#fff;border-radius:4px;padding:3px 8px;margin-top:3px}" +
      ".ldr-bq__price{text-align:right;display:flex;flex-direction:column;gap:2px;white-space:nowrap}" +
      ".ldr-bq__strike{font-size:12px;text-decoration:line-through;opacity:.55}" +
      ".ldr-bq__big{font-size:17px;font-weight:700}" +
      ".ldr-bq__small{font-size:12px;opacity:.7}" +
      ".ldr-bq__badges{position:absolute;top:-11px;right:12px;display:flex;gap:6px}" +
      ".ldr-bq__badge{font-size:10px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:#fff;border-radius:4px;padding:3px 8px;line-height:1.3}" +
      ".ldr-bq__steprow{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid #ececec;padding:10px 12px 12px 42px}" +
      ".ldr-bq__range{font-size:13px;opacity:.75}" +
      ".ldr-bq__step{display:flex;align-items:center;border:1px solid #d0d0d0;border-radius:6px}" +
      ".ldr-bq__btn{width:40px;height:40px;background:none;border:0;font-size:20px;line-height:1;cursor:pointer;color:inherit;font-family:inherit;padding:0}" +
      ".ldr-bq__btn:disabled{opacity:.3;cursor:not-allowed}" +
      ".ldr-bq__qty{min-width:30px;text-align:center;font-size:16px;font-weight:600}" +
      // al ocultar la cantidad nativa, la fila del theme (grid-auto-1) deja
      // el boton en una columna "auto" angosta -> forzar una sola columna
      (set.fuente_descuento === "promo_tn" && set.ocultar_promo_nativa
        ? '[data-store="product-promotion-info"][data-promotion-type="quantity-discounts"]{display:none!important}'
        : "") +
      (set.ocultar_cantidad_nativa
        ? "#product_form .form-quantity-container{display:none!important}" +
          "#product_form .ldr-bq-fila{grid-template-columns:1fr!important}"
        : "");
    var st = document.createElement("style");
    st.id = "ldr-bq-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // ─── Rangos de cantidad ───────────────────────────────────────────────────
  // Escalon con permitir_mas: va desde su cantidad hasta la del siguiente
  // escalon menos 1 (el ultimo, sin tope salvo el stock). Sin permitir_mas:
  // pack cerrado, exactamente su cantidad.
  var MAX_SIN_STOCK = 99;

  function rango(set, i) {
    var tiers = set.tiers || [];
    var t = tiers[i];
    if (!t) return null;
    if (t.permitir_mas === false) return { min: t.cantidad, max: t.cantidad };
    var sig = tiers[i + 1];
    return { min: t.cantidad, max: sig ? sig.cantidad - 1 : Infinity };
  }

  function stockMax(v) {
    if (!v || v.available === false) return 0;
    return v.stock == null ? MAX_SIN_STOCK : v.stock;
  }

  // Escalon que corresponde a una cantidad q (null si ninguno la cubre)
  function tierParaCantidad(set, q) {
    var tiers = set.tiers || [];
    for (var i = 0; i < tiers.length; i++) {
      var r = rango(set, i);
      if (q >= r.min && q <= r.max) return i;
    }
    return null;
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  var STATE = { set: null, sel: 0, qty: 1, root: null };

  function tierHtml(set, t, i, v) {
    var base = precioBase(v);
    var sel = i === STATE.sel;
    var q = sel ? STATE.qty : t.cantidad;
    var pct = pctPara(set, t, q);
    var unit = base != null ? Math.round(base * (1 - pct / 100) * 100) / 100 : null;
    var total = unit != null ? unit * q : null;
    var ahorro = base != null ? (base - unit) * q : 0;
    var off = !hayStock(v, t.cantidad);
    var r = rango(set, i);
    var flexible = r.max > r.min;

    var badges = (t.badges || []).filter(function (b) { return b && b.texto; });
    var badgesHtml = badges.length
      ? '<span class="ldr-bq__badges">' + badges.map(function (b) {
          return '<span class="ldr-bq__badge" style="background:' + esc(b.color || "#1a1a1a") + '">' + esc(b.texto) + "</span>";
        }).join("") + "</span>"
      : "";

    var subs = [];
    if (t.subtitulo) subs.push(esc(t.subtitulo));
    if (set.mostrar_cuotas && total != null) {
      var n = cuotasPara(total);
      if (n && n > 1) subs.push(n + " cuotas sin inter&eacute;s");
    }
    if (off) subs.push("Sin stock suficiente");
    var subHtml = subs.length ? '<span class="ldr-bq__sub">' + subs.join(" &middot; ") + "</span>" : "";

    var saveHtml = (set.mostrar_ahorro && ahorro > 0.5)
      ? '<span class="ldr-bq__save" style="background:' + esc(set.color_ahorro || "#0f8a5f") + '">Ahorr&aacute;s ' + fmt(ahorro) + "</span>"
      : "";

    // con mas de una unidad, el numero grande es el TOTAL (cambia con +/-)
    // y el precio c/u queda chico debajo
    var priceHtml = "";
    if (unit != null) {
      priceHtml =
        '<span class="ldr-bq__price">' +
          (pct > 0 && set.mostrar_tachado ? '<span class="ldr-bq__strike">' + fmt(base * q) + "</span>" : "") +
          '<span class="ldr-bq__big">' + fmt(q > 1 ? total : unit) + "</span>" +
          (q > 1 ? '<span class="ldr-bq__small">' + fmt(unit) + " c/u</span>" : "") +
        "</span>";
    }

    var stepHtml = "";
    if (sel && flexible && !off) {
      var smax = stockMax(v);
      var rangoTxt = r.max === Infinity ? ("Desde " + r.min + " unidades") : ("De " + r.min + " a " + r.max + " unidades");
      stepHtml =
        '<div class="ldr-bq__steprow">' +
          '<span class="ldr-bq__range">' + rangoTxt + "</span>" +
          '<span class="ldr-bq__step">' +
            '<button type="button" class="ldr-bq__btn" data-act="minus" aria-label="Quitar una unidad"' + (puedePasarA(STATE.qty - 1, v) ? "" : " disabled") + ">&minus;</button>" +
            '<span class="ldr-bq__qty" aria-live="polite">' + STATE.qty + "</span>" +
            '<button type="button" class="ldr-bq__btn" data-act="plus" aria-label="Agregar una unidad"' + (puedePasarA(STATE.qty + 1, v) && STATE.qty < smax ? "" : " disabled") + ">+</button>" +
          "</span>" +
        "</div>";
    }

    return (
      '<div class="ldr-bq__opt' + (badges.length ? " has-badges" : "") + (sel ? " is-sel" : "") + (off ? " is-off" : "") +
        '" role="radio" tabindex="0" aria-checked="' + sel + '" data-i="' + i + '">' +
        badgesHtml +
        '<div class="ldr-bq__main">' +
          '<span class="ldr-bq__radio"></span>' +
          '<span class="ldr-bq__info"><span class="ldr-bq__name">' + esc(t.etiqueta || ("Lleva " + t.cantidad)) + "</span>" + subHtml + saveHtml + "</span>" +
          priceHtml +
        "</div>" +
        stepHtml +
      "</div>"
    );
  }

  // Se puede ir a la cantidad q si algun escalon la cubre y hay stock
  function puedePasarA(q, v) {
    if (q < 1) return false;
    if (q > stockMax(v)) return false;
    return tierParaCantidad(STATE.set, q) !== null;
  }

  function render() {
    var set = STATE.set, root = STATE.root;
    if (!set || !root) return;
    var v = selectedVariant();
    var tiers = set.tiers || [];

    // cambio de variante con menos stock: primero intentar bajar la cantidad
    // dentro del mismo escalon; si no alcanza, bajar al escalon mas grande
    // que tenga stock (en su minimo)
    var smax = stockMax(v);
    if (STATE.qty > smax) {
      var r = rango(set, STATE.sel);
      if (r && smax >= r.min) {
        STATE.qty = smax;
      } else {
        for (var k = tiers.length - 1; k >= 0; k--) {
          if (hayStock(v, tiers[k].cantidad)) { STATE.sel = k; STATE.qty = tiers[k].cantidad; break; }
        }
      }
    }

    root.innerHTML =
      (set.titulo ? '<p class="ldr-bq__title">' + esc(set.titulo) + "</p>" : "") +
      tiers.map(function (t, i) { return tierHtml(set, t, i, v); }).join("");
    aplicarCantidad();
  }

  // Pone la cantidad elegida en el input nativo; el theme lee ese input al
  // agregar al carrito.
  function aplicarCantidad() {
    var inp = qtyInput();
    if (!inp) return;
    var q = String(STATE.qty);
    if (inp.value !== q) {
      inp.value = q;
      inp.dispatchEvent(new Event("input", { bubbles: true }));
      inp.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function elegir(i) {
    if (i === STATE.sel) return; // tocar la tarjeta ya elegida no resetea la cantidad
    var t = (STATE.set.tiers || [])[i];
    if (!t || !hayStock(selectedVariant(), t.cantidad)) return;
    STATE.sel = i;
    STATE.qty = t.cantidad;
    render();
  }

  // +/- : cambia la cantidad y, si cruza el limite del escalon, pasa solo al
  // escalon que corresponde (asi nunca queda una cantidad con un precio que
  // no le toca)
  function paso(delta) {
    var q = STATE.qty + delta;
    if (!puedePasarA(q, selectedVariant())) return;
    STATE.qty = q;
    STATE.sel = tierParaCantidad(STATE.set, q);
    render();
  }

  function bind(root) {
    root.addEventListener("click", function (e) {
      var btn = e.target.closest(".ldr-bq__btn");
      if (btn) {
        e.preventDefault();
        if (!btn.disabled) paso(btn.getAttribute("data-act") === "plus" ? 1 : -1);
        return;
      }
      var opt = e.target.closest(".ldr-bq__opt");
      if (opt) elegir(parseInt(opt.getAttribute("data-i"), 10));
    });
    root.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (e.target.closest(".ldr-bq__btn")) return; // el boton ya responde solo
      var opt = e.target.closest(".ldr-bq__opt");
      if (opt) { e.preventDefault(); elegir(parseInt(opt.getAttribute("data-i"), 10)); }
    });

    var f = form();
    if (!f) return;
    // cambio de variante (select o botones de color) -> recalcular precios
    var t = null;
    function recalcular(e) {
      if (e && e.target && root.contains(e.target)) return;
      clearTimeout(t);
      t = setTimeout(render, 80);
    }
    f.addEventListener("change", recalcular);
    f.addEventListener("click", recalcular);
    // red de seguridad: justo antes de agregar al carrito (boton nativo o el
    // boton fijo mobile, que dispara el mismo boton) re-aplicar la cantidad
    f.addEventListener("submit", aplicarCantidad, true);
    document.addEventListener("click", function (e) {
      if (e.target && e.target.closest && e.target.closest("#product_form .js-addtocart")) aplicarCantidad();
    }, true);
  }
  function insertar(set) {
    if (document.getElementById(MOUNT_ID)) return true;
    var node = document.createElement("div");
    node.id = MOUNT_ID;
    node.setAttribute("role", "radiogroup");

    if (set.anchor_selector) {
      var target = document.querySelector(set.anchor_selector);
      if (!target) return false;
      var pos = set.anchor_position || "before";
      if (pos === "after") target.parentNode.insertBefore(node, target.nextSibling);
      else if (pos === "prepend") target.insertBefore(node, target.firstChild);
      else if (pos === "append") target.appendChild(node);
      else target.parentNode.insertBefore(node, target);
    } else {
      // automatico: antes de la fila cantidad + boton "Agregar al carrito"
      var f = form();
      var qc = f && f.querySelector(".form-quantity-container");
      if (!qc) return false;
      var fila = qc.parentElement && qc.parentElement !== f ? qc.parentElement : qc;
      fila.parentNode.insertBefore(node, fila);
    }

    if (set.ocultar_cantidad_nativa) {
      var qcont = form() && form().querySelector(".form-quantity-container");
      if (qcont && qcont.parentElement && qcont.parentElement !== form()) qcont.parentElement.classList.add("ldr-bq-fila");
    }
    injectStyles(set);
    STATE.root = node;
    bind(node);
    render();
    return true;
  }

  function init() {
    try { if (!window.LS || window.LS.template !== "product") return; } catch (e) { return; }
    var set = pickSet();
    if (!set || !(set.tiers || []).length) return;
    STATE.set = set;
    var pre = 0;
    (set.tiers || []).forEach(function (t, i) { if (t.preseleccionado) pre = i; });
    STATE.sel = pre;
    STATE.qty = set.tiers[pre].cantidad;

    var attempts = 0;
    (function intentar() {
      if (insertar(set)) return;
      if (++attempts < RETRY_MAX) setTimeout(intentar, RETRY_MS);
    })();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
