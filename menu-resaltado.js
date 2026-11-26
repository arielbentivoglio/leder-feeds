/**
 * menu-resaltado.js - generado automaticamente por SyncPropio (Modulos Custom > Menu - Resaltados)
 * No editar a mano: los cambios se pisan en la proxima publicacion desde el panel.
 * Generado: 2026-11-26 12:41:44
 */
(function () {
  "use strict";
  var ITEMS = [
  {
    "id": "black-friday",
    "texto": "BLACK FRIDAY",
    "stores": [
      "ar"
    ],
    "dispositivos": "ambos",
    "color": "#e10600",
    "negrita": true,
    "fondo": false,
    "colorFondo": "#fde8e8",
    "estilo": "color",
    "imgSrc": "https://arielbentivoglio.github.io/leder-feeds/modules/menu-resaltado-black-friday/menu/20261126124142893621-black-friday-logo-negro.webp",
    "imgAnchoDesktop": 140,
    "imgAltoDesktop": 50,
    "imgAltoMobile": 40,
    "imgFondo": false,
    "imgColorFondo": "#ffffff",
    "pLabel": "",
    "pFondo": "#111111",
    "pColorTexto": "#ffffff",
    "pPunto": "#1a2bff",
    "pHover": "#1a2bff",
    "pPulso": true,
    "pSizeDesktop": 13,
    "pSizeMobile": 12,
    "ajusteY": 0,
    "desde": null,
    "hasta": null
  }
];

  var STORE = (function () {
    var h = location.hostname || "";
    if (h.indexOf("leder.cl") !== -1) return "cl";
    if (h.indexOf("lederhd.com") !== -1) return "ar";
    return null;
  })();
  if (!STORE) return;

  function norm(s) {
    return (s || "").toString().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ").trim();
  }

  // Filtra por tienda y por rango de fechas (se evalua en cada carga de
  // pagina, asi se prende/apaga solo sin republicar).
  var ahora = Date.now();
  var activos = ITEMS.filter(function (it) {
    if ((it.stores || []).indexOf(STORE) === -1) return false;
    if (it.desde && ahora < it.desde) return false;
    if (it.hasta && ahora >= it.hasta) return false;
    return true;
  });
  if (!activos.length) return;

  function hexRgba(hex, a) {
    var h = String(hex || "").replace("#", "");
    if (h.length !== 6) return "rgba(0,0,0," + a + ")";
    return "rgba(" + parseInt(h.substr(0, 2), 16) + "," + parseInt(h.substr(2, 2), 16) + "," +
           parseInt(h.substr(4, 2), 16) + "," + a + ")";
  }

  // Flecha del theme en mobile: el texto del <button> queda transparente,
  // asi que la flecha (svg con currentColor) necesita color propio.
  var ARROW = "font-size:16px!important;color:#111!important;";
  // En mobile el item ocupa toda la fila: imagen/pastilla a la izquierda,
  // flecha a la derecha, sin que la flecha se caiga de linea.
  var MOBILE_ROW = "display:flex!important;justify-content:space-between!important;" +
                   "align-items:center!important;flex-wrap:nowrap!important;" +
                   "font-size:0!important;color:transparent!important;";

  function cssColor(it, sel) {
    var decl = "color:" + it.color + "!important;";
    if (it.negrita) decl += "font-weight:700!important;";
    if (it.fondo) {
      decl += "background:" + it.colorFondo + "!important;border-radius:999px!important;" +
              "padding-left:10px!important;padding-right:10px!important;";
    }
    return sel + "," + sel + ":hover," + sel + ":focus{" + decl + "}" +
           sel + " svg{fill:currentColor}";
  }

  // Con font-size:0 el <a> pierde su linea base y el theme lo alinea por el
  // borde inferior: queda mas bajo que el resto del menu. Se centra y se
  // corrige con un ajuste fino en px (top relativo, configurable por item).
  function alineado(it) {
    return "vertical-align:middle!important;align-self:center!important;margin-top:0!important;" +
           "margin-bottom:0!important;position:relative!important;top:" + it.ajusteY + "px!important;";
  }

  function cssImagen(it, selD, selM) {
    if (!it.imgSrc) return "";
    var bg = (it.imgFondo ? it.imgColorFondo : "transparent") + " url(" + JSON.stringify(it.imgSrc) + ") center/contain no-repeat!important";
    var wD = it.imgAnchoDesktop, hD = it.imgAltoDesktop, hM = it.imgAltoMobile;
    var wM = Math.round(hM * wD / hD);
    return (
      selD + "," + selD + ":hover," + selD + ":focus{display:inline-block!important;width:" + wD +
        "px!important;height:" + hD + "px!important;padding:0!important;font-size:0!important;" +
        "color:transparent!important;" + alineado(it) + "background:" + bg + "}" +
      selM + "{" + MOBILE_ROW + "}" +
      selM + "::before{content:\"\"!important;display:inline-block!important;position:static!important;" +
        "flex:0 0 auto!important;width:" + wM + "px!important;max-width:none!important;height:" + hM +
        "px!important;margin:0!important;padding:0!important;background:" + bg + "}" +
      selM + " .nav-list-arrow{" + ARROW + "}"
    );
  }

  function cssPastilla(it, selD, selM, idx) {
    var anim = "ldrMhPulse" + idx;
    var css = "";
    if (it.pPulso) {
      css += "@keyframes " + anim + "{0%{box-shadow:0 0 0 0 " + hexRgba(it.pPunto, 0.6) +
             "}70%{box-shadow:0 0 0 7px " + hexRgba(it.pPunto, 0) +
             "}100%{box-shadow:0 0 0 0 " + hexRgba(it.pPunto, 0) + "}}";
    }
    // Desktop: la pastilla es el propio <a>; punto en ::before, rotulo en ::after.
    css += selD + "{" + alineado(it) + "display:inline-flex!important;align-items:center!important;" +
           "padding:4px 12px 4px 22px!important;border-radius:999px!important;background:" + it.pFondo +
           "!important;font-size:0!important;line-height:1!important;color:" + it.pColorTexto +
           "!important;transition:background .2s}";
    css += selD + ":hover," + selD + ":focus{background:" + it.pHover + "!important}";
    css += selD + "::before{content:\"\"!important;position:absolute!important;left:9px!important;top:50%!important;" +
           "width:6px!important;height:6px!important;margin:-3px 0 0!important;border-radius:50%!important;" +
           "background:" + it.pPunto + "!important;" + (it.pPulso ? "animation:" + anim + " 1.8s infinite;" : "") + "}";
    css += selD + ":hover::before{background:" + it.pColorTexto + "!important}";
    css += selD + "::after{content:attr(data-ldr-mh-label)!important;position:static!important;display:inline!important;" +
           "width:auto!important;height:auto!important;background:none!important;font-size:" + it.pSizeDesktop +
           "px!important;font-weight:500!important;letter-spacing:.06em!important;line-height:1.2!important;" +
           "color:" + it.pColorTexto + "!important}";
    // Mobile: la pastilla se dibuja en ::before del <button>, a su ancho.
    css += selM + "{" + MOBILE_ROW + "}";
    css += selM + "::before{content:attr(data-ldr-mh-label)!important;display:inline-block!important;position:static!important;" +
           "width:auto!important;height:auto!important;max-width:max-content!important;flex:0 0 auto!important;" +
           "margin:0!important;padding:5px 12px 5px 22px!important;border-radius:999px!important;font-size:" +
           it.pSizeMobile + "px!important;font-weight:500!important;letter-spacing:.06em!important;line-height:1.2!important;" +
           "color:" + it.pColorTexto + "!important;background:radial-gradient(circle," + it.pPunto +
           " 2.5px,transparent 3px) 9px center/6px 6px no-repeat," + it.pFondo + "!important}";
    css += selM + " .nav-list-arrow{" + ARROW + "}";
    css += "@media (prefers-reduced-motion:reduce){" + selD + "::before{animation:none!important}}";
    return css;
  }

  function injectStyle() {
    if (document.getElementById("ldr-mh-style")) return;
    var css = activos.map(function (it, idx) {
      var sel = '[data-ldr-mh="' + it.id + '"]';
      var selD = sel + '[data-ldr-mh-dev="desktop"]';
      var selM = sel + '[data-ldr-mh-dev="mobile"]';
      if (it.estilo === "imagen") return cssImagen(it, selD, selM);
      if (it.estilo === "pastilla") return cssPastilla(it, selD, selM, idx);
      return cssColor(it, sel);
    }).join("");
    var st = document.createElement("style");
    st.id = "ldr-mh-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // Solo items de primer nivel (ver docstring del panel).
  function linksDesktop() {
    return document.querySelectorAll(
      ".js-nav-desktop-list > li > .js-nav-list-link," +
      ".js-nav-desktop-list > li > .nav-item-container > .js-nav-list-link"
    );
  }

  function linksMobile() {
    return document.querySelectorAll(
      "#nav-hamburger .modal-body > .nav-list > .nav-item > .nav-list-link"
    );
  }

  function marcar(nodos, dispositivo) {
    var marcados = 0;
    for (var i = 0; i < nodos.length; i++) {
      var el = nodos[i];
      var txt = norm(el.textContent);
      for (var k = 0; k < activos.length; k++) {
        var it = activos[k];
        if (it.dispositivos !== "ambos" && it.dispositivos !== dispositivo) continue;
        if (norm(it.texto) !== txt) continue;
        el.setAttribute("data-ldr-mh", it.id);
        el.setAttribute("data-ldr-mh-dev", dispositivo);
        if (it.estilo === "pastilla") {
          el.setAttribute("data-ldr-mh-label", it.pLabel || (el.textContent || "").replace(/\s+/g, " ").trim());
        }
        marcados++;
        break;
      }
    }
    return marcados;
  }

  function run() {
    injectStyle();
    marcar(linksDesktop(), "desktop");
    marcar(linksMobile(), "mobile");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  // Reintentos por hidratacion async del theme (mismo patron 40x150ms del
  // resto de los Modulos Custom). run() es idempotente.
  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    run();
    if (tries >= 40) clearInterval(timer);
  }, 150);
})();
