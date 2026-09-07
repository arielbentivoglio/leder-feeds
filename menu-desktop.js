/* menu-desktop.js - generado por SyncPropio, no editar a mano
   Ultima publicacion: 2026-09-07T18:20:35.237771 */
(function () {
    "use strict";
    var CONFIG = {"alfombras":{"activo":true,"parent_category_id":36664698,"nombre_categoria":"ALFOMBRAS","categoria_url":"https://lederhd.com/alfombras/","link_ver_todo":"Ver todas las alfombras","ancho":"completo","color_titulos":"#8a8a8a","color_items":"#1a1a1a","columnas":[{"items":[{"categoria_id":36664825,"color":"","destacado":false,"label_custom":"CUEROS DE VACA","nombre_real":"CUEROS DE VACA","subtitulo":"","url":"https://lederhd.com/cueros-de-vaca/"},{"categoria_id":36664826,"color":"","destacado":false,"label_custom":"CUEROS DE OVEJA","nombre_real":"CUEROS DE OVEJA","subtitulo":"","url":"https://lederhd.com/cueros-de-oveja/"},{"categoria_id":36686239,"color":"","destacado":false,"label_custom":"CUEROS DE CABRA","nombre_real":"CUEROS DE CABRA","subtitulo":"","url":"https://lederhd.com/cueros-de-cabra/"}],"tipo":"links","titulo":"Por Material"},{"items":[{"categoria_id":36664827,"color":"","destacado":false,"label_custom":"ALFOMBRAS PATCHWORK","nombre_real":"ALFOMBRAS PATCHWORK","subtitulo":"","url":"https://lederhd.com/patchwork/"},{"categoria_id":38147185,"color":"","destacado":true,"label_custom":"ONE OF A KIND","nombre_real":"ONE OF A KIND","subtitulo":"Piezas Únicas","url":"https://lederhd.com/one-of-a-kind/"}],"tipo":"links","titulo":"POR ESTILO"},{"alto":220,"ancho":220,"cta_texto":"Ver más","cta_url":"/one-of-a-kind/","imagen_url":"https://raw.githubusercontent.com/arielbentivoglio/leder-feeds/main/menu-desktop/alfombras/img_20260907163019.webp","texto":"Diseños Únicos","tipo":"imagen","titulo":""}],"columnas_mobile":[{"items":[{"categoria_id":36664825,"color":"","destacado":false,"label_custom":"CUEROS DE VACA","nombre_real":"CUEROS DE VACA","subtitulo":"","url":"https://lederhd.com/cueros-de-vaca/"},{"categoria_id":36664826,"color":"","destacado":false,"label_custom":"CUEROS DE OVEJA","nombre_real":"CUEROS DE OVEJA","subtitulo":"","url":"https://lederhd.com/cueros-de-oveja/"},{"categoria_id":36686239,"color":"","destacado":false,"label_custom":"CUEROS DE CABRA","nombre_real":"CUEROS DE CABRA","subtitulo":"","url":"https://lederhd.com/cueros-de-cabra/"}],"tipo":"links","titulo":"Por Material"},{"items":[{"categoria_id":36664827,"color":"","destacado":false,"label_custom":"ALFOMBRAS PATCHWORK","nombre_real":"ALFOMBRAS PATCHWORK","subtitulo":"","url":"https://lederhd.com/patchwork/"},{"categoria_id":38147185,"color":"","destacado":true,"label_custom":"ONE OF A KIND","nombre_real":"ONE OF A KIND","subtitulo":"Piezas Únicas","url":"https://lederhd.com/one-of-a-kind/"}],"tipo":"links","titulo":"POR ESTILO"},{"alto":180,"ancho":180,"cta_texto":"Ver más","cta_url":"/one-of-a-kind/","imagen_url":"https://raw.githubusercontent.com/arielbentivoglio/leder-feeds/main/menu-desktop/alfombras/img_20260907163030.webp","texto":"Diseños Únicos","tipo":"imagen","titulo":""}]}};

    function esc(s) {
        return (s || "").replace(/[&<>"]/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
        });
    }

    function buildHtml(cfg) {
        var colorTitulos = cfg.color_titulos ? ' style="color:' + esc(cfg.color_titulos) + '"' : "";
        var colorItems = cfg.color_items ? ' style="color:' + esc(cfg.color_items) + '"' : "";
        var cols = (cfg.columnas || []).map(function (col) {
            if (col.tipo === "imagen") {
                var tieneContenido = col.imagen_url || col.titulo || col.texto || col.cta_url;
                if (!tieneContenido) return "";
                var imgSize = "";
                if (col.ancho) imgSize += "width:" + parseInt(col.ancho, 10) + "px;";
                if (col.alto) imgSize += "height:" + parseInt(col.alto, 10) + "px;";
                var imgStyle = imgSize ? ' style="' + imgSize + '"' : "";
                var img = col.imagen_url ? '<img src="' + esc(col.imagen_url) + '" alt=""' + imgStyle + ' loading="lazy" decoding="async">' : "";
                var titulo = col.titulo ? '<div class="ldr-menu-img-title">' + esc(col.titulo) + "</div>" : "";
                var texto = col.texto ? '<div class="ldr-menu-img-text">' + esc(col.texto) + "</div>" : "";
                var cta = col.cta_url ? '<a class="ldr-menu-img-cta" href="' + esc(col.cta_url) + '">' + esc(col.cta_texto || "Ver mas") + "</a>" : "";
                var colStyle = col.ancho ? ' style="width:' + parseInt(col.ancho, 10) + 'px"' : "";
                return '<div class="ldr-menu-col ldr-menu-col-imagen"' + colStyle + '>' + img + '<div class="ldr-menu-img-body">' + titulo + texto + cta + "</div></div>";
            }
            var itemsArr = col.items || [];
            if (!col.titulo && !itemsArr.length) return "";
            var items = itemsArr.map(function (it) {
                var cls = "ldr-menu-item" + (it.destacado ? " ldr-menu-item-highlight" : "");
                var label = esc(it.label_custom || it.nombre_real || "");
                var sub = it.subtitulo ? '<span class="ldr-menu-item-subtitle">' + esc(it.subtitulo) + "</span>" : "";
                var icon = it.destacado ? '<span class="ldr-menu-item-icon">+</span>' : "";
                return '<a class="' + cls + '" href="' + esc(it.url || "#") + '"' + (it.color ? ' style="color:' + esc(it.color) + '"' : colorItems) + '>' + icon + '<span class="ldr-menu-item-text">' + label + sub + "</span></a>";
            }).join("");
            var titulo2 = col.titulo ? '<div class="ldr-menu-col-title"' + colorTitulos + '>' + esc(col.titulo) + "</div>" : "";
            return '<div class="ldr-menu-col ldr-menu-col-links">' + titulo2 + items + "</div>";
        }).filter(function (html) { return html !== ""; }).join("");
        var viewall = cfg.link_ver_todo ? '<a class="ldr-menu-viewall" href="' + esc(cfg.categoria_url || "#") + '">' + esc(cfg.link_ver_todo) + "</a>" : "";
        return '<div class="ldr-menu-desktop-wrap"><div class="ldr-menu-desktop">' + cols + "</div>" + viewall + "</div>";
    }

    function norm(s) {
        return (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    function buildMobileHtml(cfg) {
        var colorTitulos = cfg.color_titulos ? ' style="color:' + esc(cfg.color_titulos) + '"' : "";
        var colorItems = cfg.color_items ? ' style="color:' + esc(cfg.color_items) + '"' : "";
        var fuente = (cfg.columnas_mobile && cfg.columnas_mobile.length) ? cfg.columnas_mobile : cfg.columnas;
        var cols = (fuente || []).map(function (col) {
            if (col.tipo === "imagen") {
                var tieneContenido = col.imagen_url || col.titulo || col.texto || col.cta_url;
                if (!tieneContenido) return "";
                var imgSize = "";
                if (col.alto) imgSize += "height:" + parseInt(col.alto, 10) + "px;";
                var imgStyle = imgSize ? ' style="' + imgSize + '"' : "";
                var img = col.imagen_url ? '<img src="' + esc(col.imagen_url) + '" alt=""' + imgStyle + ' loading="lazy" decoding="async">' : "";
                var titulo = col.titulo ? '<div class="ldr-menu-img-title">' + esc(col.titulo) + "</div>" : "";
                var texto = col.texto ? '<div class="ldr-menu-img-text">' + esc(col.texto) + "</div>" : "";
                var cta = col.cta_url ? '<a class="ldr-menu-img-cta" href="' + esc(col.cta_url) + '">' + esc(col.cta_texto || "Ver mas") + "</a>" : "";
                return '<div class="ldr-menu-col ldr-menu-col-imagen">' + img + '<div class="ldr-menu-img-body">' + titulo + texto + cta + "</div></div>";
            }
            var itemsArr = col.items || [];
            if (!col.titulo && !itemsArr.length) return "";
            var items = itemsArr.map(function (it) {
                var cls = "ldr-menu-item" + (it.destacado ? " ldr-menu-item-highlight" : "");
                var label = esc(it.label_custom || it.nombre_real || "");
                var sub = it.subtitulo ? '<span class="ldr-menu-item-subtitle">' + esc(it.subtitulo) + "</span>" : "";
                var icon = it.destacado ? '<span class="ldr-menu-item-icon">+</span>' : "";
                return '<a class="' + cls + '" href="' + esc(it.url || "#") + '"' + (it.color ? ' style="color:' + esc(it.color) + '"' : colorItems) + '>' + icon + '<span class="ldr-menu-item-text">' + label + sub + "</span></a>";
            }).join("");
            var titulo2 = col.titulo ? '<div class="ldr-menu-col-title"' + colorTitulos + '>' + esc(col.titulo) + "</div>" : "";
            return '<div class="ldr-menu-col ldr-menu-col-links">' + titulo2 + items + "</div>";
        }).filter(function (html) { return html !== ""; }).join("");
        var viewall = cfg.link_ver_todo ? '<a class="ldr-menu-viewall" href="' + esc(cfg.categoria_url || "#") + '">' + esc(cfg.link_ver_todo) + "</a>" : "";
        return '<div class="ldr-menu-mobile">' + cols + "</div>" + viewall;
    }

    function ajustarHorizontal(li, dropdownEl) {
        if (!dropdownEl) return;
        // position/top se dejan intactos (igual que el resto de los menus,
        // sin gap). Solo se corrige "left": con position:absolute, left es
        // relativo al li (contenedor posicionado), asi que restando su propia
        // posicion en pantalla el resultado queda anclado al borde real del
        // viewport, sin necesidad de position:fixed ni de tocar el top.
        var liRect = li.getBoundingClientRect();
        dropdownEl.style.setProperty("left", (-liRect.left) + "px", "important");
        if (dropdownEl.classList.contains("ldr-menu-fit")) {
            requestAnimationFrame(function () {
                var wrap = dropdownEl.querySelector(".ldr-menu-desktop-wrap");
                if (!wrap) return;
                var w = wrap.getBoundingClientRect().width;
                if (!w) return;
                var vw = document.documentElement.clientWidth || window.innerWidth;
                var liRect2 = li.getBoundingClientRect();
                var desiredLeft = Math.max(20, (vw - w) / 2);
                dropdownEl.style.setProperty("left", (desiredLeft - liRect2.left) + "px", "important");
            });
        }
    }

    function init() {
        var keys = Object.keys(CONFIG);
        if (!keys.length) return;
        var links = document.querySelectorAll(".js-nav-list-link[data-url-cleaned]");
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            var slug = a.getAttribute("data-url-cleaned");
            var cfg = CONFIG[slug];
            if (!cfg || cfg.activo === false) continue;
            var li = a.closest(".item-with-subitems");
            if (!li) continue;
            var container = li.querySelector(".desktop-dropdown-container");
            if (!container) continue;
            if (container.getAttribute("data-ldr-menu-built") === "1") continue;
            container.innerHTML = buildHtml(cfg);
            container.setAttribute("data-ldr-menu-built", "1");
            var dropdown = li.querySelector(".js-desktop-dropdown");
            if (dropdown) {
                if (cfg.ancho === "contenido") {
                    dropdown.classList.add("ldr-menu-fit");
                } else {
                    dropdown.classList.remove("ldr-menu-fit");
                }
            }
            // El centrado nativo de TN (300vw + translateX) centra respecto
            // al boton del menu, no al viewport real — con columnas anchas
            // eso saca contenido de pantalla en ventanas angostas. Se deja
            // position/top nativos intactos (cero riesgo de gap vertical,
            // es el mismo mecanismo que usan los demas menus) y solo se
            // corrige "left" en px exactos por JS.
            li.classList.add("ldr-menu-active");
            (function (liEl, dropdownEl) {
                ajustarHorizontal(liEl, dropdownEl);
                liEl.addEventListener("mouseenter", function () { ajustarHorizontal(liEl, dropdownEl); });
                liEl.addEventListener("focusin", function () { ajustarHorizontal(liEl, dropdownEl); });
                window.addEventListener("resize", function () { ajustarHorizontal(liEl, dropdownEl); });
            })(li, dropdown);
        }
    }

    function initMobile() {
        var keys = Object.keys(CONFIG);
        if (!keys.length) return;
        var buttons = document.querySelectorAll(".js-modal-open-private.nav-list-link");
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            var txt = norm(btn.textContent);
            for (var k = 0; k < keys.length; k++) {
                var slug = keys[k];
                var cfg = CONFIG[slug];
                if (!cfg || cfg.activo === false || !cfg.nombre_categoria) continue;
                if (norm(cfg.nombre_categoria) !== txt) continue;
                var targetAttr = btn.getAttribute("data-target") || btn.getAttribute("data-modal-url") || "";
                var targetId = targetAttr.replace(/^#/, "");
                if (!targetId) continue;
                // getElementById en vez de querySelector('#'+id): el id que arma
                // el theme puede tener un punto (nav-panel-id-0.xxxxx via random()),
                // y como selector CSS sin escapar eso rompe el match silenciosamente.
                var modal = document.getElementById(targetId);
                if (!modal) continue;
                var body = modal.querySelector(".modal-body");
                if (!body) continue; // sin body real no tocamos el modal entero (evita romper header/cerrar)
                if (body.getAttribute("data-ldr-mobile-built") === "1") continue;
                body.innerHTML = buildMobileHtml(cfg);
                body.setAttribute("data-ldr-mobile-built", "1");
            }
        }
    }

    function initAll() {
        init();
        initMobile();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }

    // Reintentos por hidratacion async del theme (mismo patron 40x150ms
    // usado en el resto de los Modulos Custom). initAll() es idempotente
    // (marca data-ldr-menu-built / data-ldr-mobile-built), asi que no hay
    // parpadeo ni loop.
    var tries = 0;
    var timer = setInterval(function () {
        tries++;
        initAll();
        if (tries >= 40) clearInterval(timer);
    }, 150);
})();
