/* menu-desktop.js - generado por SyncPropio, no editar a mano
   Ultima publicacion: 2026-09-07T14:09:36.133121 */
(function () {
    "use strict";
    var CONFIG = {"alfombras":{"activo":true,"parent_category_id":36664698,"categoria_url":"https://lederhd.com/alfombras/","link_ver_todo":"Ver todas las alfombras","ancho":"completo","columnas":[{"tipo":"links","titulo":"Por Material","items":[{"categoria_id":36664825,"nombre_real":"CUEROS DE VACA","label_custom":"CUEROS DE VACA","subtitulo":"","destacado":false,"url":"https://lederhd.com/cueros-de-vaca/"},{"categoria_id":36664826,"nombre_real":"CUEROS DE OVEJA","label_custom":"CUEROS DE OVEJA","subtitulo":"","destacado":false,"url":"https://lederhd.com/cueros-de-oveja/"},{"categoria_id":36686239,"nombre_real":"CUEROS DE CABRA","label_custom":"CUEROS DE CABRA","subtitulo":"","destacado":false,"url":"https://lederhd.com/cueros-de-cabra/"}]},{"tipo":"links","titulo":"POR ESTILO","items":[{"categoria_id":36664827,"nombre_real":"ALFOMBRAS PATCHWORK","label_custom":"ALFOMBRAS PATCHWORK","subtitulo":"","destacado":false,"url":"https://lederhd.com/patchwork/"},{"categoria_id":38147185,"nombre_real":"ONE OF A KIND","label_custom":"ONE OF A KIND","subtitulo":"Piezas Unicas","destacado":true,"url":"https://lederhd.com/one-of-a-kind/"}]}]}};

    function esc(s) {
        return (s || "").replace(/[&<>"]/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
        });
    }

    function buildHtml(cfg) {
        var cols = (cfg.columnas || []).map(function (col) {
            if (col.tipo === "imagen") {
                var tieneContenido = col.imagen_url || col.titulo || col.texto || col.cta_url;
                if (!tieneContenido) return "";
                var img = col.imagen_url ? '<img src="' + esc(col.imagen_url) + '" alt="" loading="lazy" decoding="async">' : "";
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
                return '<a class="' + cls + '" href="' + esc(it.url || "#") + '">' + icon + '<span class="ldr-menu-item-text">' + label + sub + "</span></a>";
            }).join("");
            var titulo2 = col.titulo ? '<div class="ldr-menu-col-title">' + esc(col.titulo) + "</div>" : "";
            return '<div class="ldr-menu-col ldr-menu-col-links">' + titulo2 + items + "</div>";
        }).filter(function (html) { return html !== ""; }).join("");
        var viewall = cfg.link_ver_todo ? '<a class="ldr-menu-viewall" href="' + esc(cfg.categoria_url || "#") + '">' + esc(cfg.link_ver_todo) + "</a>" : "";
        return '<div class="ldr-menu-desktop">' + cols + "</div>" + viewall;
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
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    // Reintentos por hidratacion async del theme (mismo patron 40x150ms
    // usado en el resto de los Modulos Custom). init() es idempotente
    // (marca data-ldr-menu-built), asi que no hay parpadeo ni loop.
    var tries = 0;
    var timer = setInterval(function () {
        tries++;
        init();
        if (tries >= 40) clearInterval(timer);
    }, 150);
})();
