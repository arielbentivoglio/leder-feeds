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
  var PROBADOR_SETS = /*__PROBADOR_ALFOMBRAS_SETS__*/ [{"id": "pa-20260910154309190410", "nombre": "Alfombra Patchwork Pampa 110x60cm Marrón", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319850972"], "labels": [{"id": "319850972", "nombre": "Alfombra Patchwork Pampa 110x60cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": false, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090258777, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260910154309190410-default.webp", "width": 724, "height": 405}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260910154309190410-marrón.webp", "width": 753, "height": 435}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260910154309190410-beige.webp", "width": 750, "height": 434}, "Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260910154309190410-blanco.webp", "width": 752, "height": 438}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260910154309190410-negro.webp", "width": 751, "height": 434}, "Mix": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260910154309190410-mix.webp", "width": 748, "height": 435}}, "ancho_cm": 110.0, "alto_cm": 60.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911123901769076", "nombre": "Alfombra Patchwork Pampa 170x120cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319855468"], "labels": [{"id": "319855468", "nombre": "Alfombra Patchwork Pampa 170x120cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090283647, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-default.webp", "width": 900, "height": 619}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-marrón.webp", "width": 903, "height": 627}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-beige.webp", "width": 900, "height": 623}, "Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-blanco.webp", "width": 898, "height": 627}, "Gris Claro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-gris-claro.webp", "width": 899, "height": 628}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-gris.webp", "width": 911, "height": 629}, "Gris Oscuro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-gris-oscuro.webp", "width": 906, "height": 626}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-negro.webp", "width": 904, "height": 632}, "Mix": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911123901769076-mix.webp", "width": 905, "height": 623}}, "ancho_cm": 120.0, "alto_cm": 170.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911124308779759", "nombre": "Alfombra Patchwork Pampa 170X240cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319892440"], "labels": [{"id": "319892440", "nombre": "Alfombra Patchwork Pampa 170X240cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090465518, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911124308779759-default.webp", "width": 914, "height": 667}, "imagen_variantes": {"Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911124308779759-blanco.webp", "width": 920, "height": 671}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911124308779759-beige.webp", "width": 922, "height": 676}, "Marrón": {"src": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/vc10g-2000d-c17cfd1a7922db65cd17690183420068-1024-1024.jpg", "width": 0, "height": 0}, "Moca": {"src": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/vc10g-moca-51ac886976d94b90cf17768908171660-1024-1024.jpg", "width": 0, "height": 0}, "Mix": {"src": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/vc10g-6000d-3d69a0c3aad98b94fa17690183419049-1024-1024.jpg", "width": 0, "height": 0}, "Gris": {"src": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/vc10g-4000d-6e6baec981997f40bc17690183419004-1024-1024.jpg", "width": 0, "height": 0}, "Gris Medio": {"src": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/vc10g-4001d-cb83b9a40cb762e83417690183419679-1024-1024.jpg", "width": 0, "height": 0}, "Negro": {"src": "https://acdn-us.mitiendanube.com/stores/006/872/288/products/vc10g-1000d-57fbc482516b17438a17690183416870-1024-1024.jpg", "width": 0, "height": 0}}, "ancho_cm": 170.0, "alto_cm": 240.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911124719404415", "nombre": "Alfombra Patchwork Diamante 155x100cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319851489"], "labels": [{"id": "319851489", "nombre": "Alfombra Patchwork Diamante 155x100cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090264488, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911124719404415-default.webp", "width": 931, "height": 611}, "imagen_variantes": {}, "ancho_cm": 100.0, "alto_cm": 155.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911124958874363", "nombre": "Alfombra Patchwork Triángulos 170x125cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319859224"], "labels": [{"id": "319859224", "nombre": "Alfombra Patchwork Triángulos 170x125cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090301405, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911124958874363-default.webp", "width": 931, "height": 663}, "imagen_variantes": {}, "ancho_cm": 125.0, "alto_cm": 170.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "redondeado"}, {"id": "pa-20260911125213438456", "nombre": "Alfombra Patchwork Ovalada 180x150cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319858036"], "labels": [{"id": "319858036", "nombre": "Alfombra Patchwork Ovalada 180x150cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090292476, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-default.webp", "width": 828, "height": 703}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-marrón.webp", "width": 862, "height": 715}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-beige.webp", "width": 854, "height": 718}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-gris.webp", "width": 851, "height": 715}, "Gris Oscuro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-gris-oscuro.webp", "width": 857, "height": 717}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-negro.webp", "width": 862, "height": 717}, "Mix": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-mix.webp", "width": 864, "height": 718}, "Vintage Light": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-vintage-light.webp", "width": 859, "height": 714}, "Vintage Dark": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911125213438456-vintage-dark.webp", "width": 860, "height": 716}}, "ancho_cm": 150.0, "alto_cm": 180.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911153535509259", "nombre": "Alfombra Cuero De Vaca Marrón y Blanco", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["327059195"], "labels": [{"id": "327059195", "nombre": "Alfombra Cuero De Vaca Marrón y Blanco"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1122547389, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911153535509259-default.webp", "width": 797, "height": 864}, "imagen_variantes": {"Small (Aprox 140x160 cm)": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911153535509259-small-aprox-140x160-cm.webp", "width": 801, "height": 868}, "Medium (Aprox 160x180 cm)": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911153535509259-medium-aprox-160x180-cm.webp", "width": 801, "height": 868}, "Large (Aprox 180x200 cm)": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911153535509259-large-aprox-180x200-cm.webp", "width": 801, "height": 868}}, "ancho_cm": 160.0, "alto_cm": 180.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911154606378944", "nombre": "Alfombra Patchwork Paraiso 175cm Diametro", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319863972"], "labels": [{"id": "319863972", "nombre": "Alfombra Patchwork Paraiso 175cm Diametro"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090319217, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911154606378944-default.webp", "width": 853, "height": 861}, "imagen_variantes": {}, "ancho_cm": 175.0, "alto_cm": 175.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911155356902739", "nombre": "Alfombra Patchwork Paraiso Vintage 180cm Diametro", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319864850"], "labels": [{"id": "319864850", "nombre": "Alfombra Patchwork Paraiso Vintage 180cm Diametro"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090329530, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155356902739-default.webp", "width": 865, "height": 863}, "imagen_variantes": {"Vintage Light": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155356902739-vintage-light.webp", "width": 865, "height": 863}, "Vintage Dark": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155356902739-vintage-dark.webp", "width": 881, "height": 865}}, "ancho_cm": 180.0, "alto_cm": 180.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911155454855040", "nombre": "Alfombra Patchwork Ladrillos 240x150cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319888196"], "labels": [{"id": "319888196", "nombre": "Alfombra Patchwork Ladrillos 240x150cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090446346, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155454855040-default.webp", "width": 923, "height": 578}, "imagen_variantes": {"Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155454855040-beige.webp", "width": 923, "height": 578}, "Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155454855040-blanco.webp", "width": 926, "height": 575}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155454855040-gris.webp", "width": 914, "height": 563}, "Gris Oscuro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155454855040-gris-oscuro.webp", "width": 923, "height": 574}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155454855040-negro.webp", "width": 908, "height": 556}, "Mix": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155454855040-mix.webp", "width": 910, "height": 557}, "Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155454855040-marrón.webp", "width": 924, "height": 578}}, "ancho_cm": 150.0, "alto_cm": 240.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911155605775898", "nombre": "Alfombra Patchwork Ladrillos Bicolor", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319868411"], "labels": [{"id": "319868411", "nombre": "Alfombra Patchwork Ladrillos Bicolor 240x150cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090347545, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155605775898-default.webp", "width": 931, "height": 584}, "imagen_variantes": {"Blanco y Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155605775898-blanco-y-negro.webp", "width": 924, "height": 589}, "Blanco y Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155605775898-blanco-y-marrón.webp", "width": 931, "height": 584}}, "ancho_cm": 150.0, "alto_cm": 240.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911155657259537", "nombre": "Alfombra Patchwork Fantasía 200x140cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319886666"], "labels": [{"id": "319886666", "nombre": "Alfombra Patchwork Fantasía 200x140cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090441637, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155657259537-default.webp", "width": 849, "height": 621}, "imagen_variantes": {}, "ancho_cm": 140.0, "alto_cm": 200.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911155734634014", "nombre": "Alfombra Patchwork Mosaico 240x180cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319892559"], "labels": [{"id": "319892559", "nombre": "Alfombra Patchwork Mosaico 240x180cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090471535, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155734634014-default.webp", "width": 915, "height": 656}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155734634014-marrón.webp", "width": 910, "height": 651}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155734634014-beige.webp", "width": 911, "height": 645}, "Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155734634014-blanco.webp", "width": 904, "height": 648}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155734634014-gris.webp", "width": 915, "height": 656}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155734634014-negro.webp", "width": 911, "height": 652}, "Vintage Light": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155734634014-vintage-light.webp", "width": 909, "height": 650}}, "ancho_cm": 180.0, "alto_cm": 240.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911155858867178", "nombre": "Alfombra Patchwork India 240x170cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319894968"], "labels": [{"id": "319894968", "nombre": "Alfombra Patchwork India 240x170cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090478160, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155858867178-default.webp", "width": 877, "height": 622}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155858867178-marrón.webp", "width": 881, "height": 625}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155858867178-beige.webp", "width": 876, "height": 624}, "Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155858867178-blanco.webp", "width": 871, "height": 623}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155858867178-gris.webp", "width": 877, "height": 622}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155858867178-negro.webp", "width": 877, "height": 624}}, "ancho_cm": 170.0, "alto_cm": 240.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911155948382106", "nombre": "Alfombra Patchwork India XL 200x300cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319896114"], "labels": [{"id": "319896114", "nombre": "Alfombra Patchwork India XL 200x300cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090482992, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155948382106-default.webp", "width": 881, "height": 644}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155948382106-marrón.webp", "width": 881, "height": 644}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155948382106-beige.webp", "width": 876, "height": 624}, "Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155948382106-blanco.webp", "width": 871, "height": 623}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155948382106-gris.webp", "width": 877, "height": 622}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911155948382106-negro.webp", "width": 877, "height": 624}}, "ancho_cm": 200.0, "alto_cm": 300.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911160040460955", "nombre": "Alfombra Patchwork Suede Gamuzada 260x170cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319869882"], "labels": [{"id": "319869882", "nombre": "Alfombra Patchwork Suede Gamuzada 260x170cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090356436, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160040460955-default.webp", "width": 828, "height": 621}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160040460955-marrón.webp", "width": 828, "height": 621}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160040460955-beige.webp", "width": 828, "height": 620}, "Mix": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160040460955-mix.webp", "width": 828, "height": 614}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160040460955-gris.webp", "width": 827, "height": 620}}, "ancho_cm": 170.0, "alto_cm": 260.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911160142506939", "nombre": "Alfombra Patchwork Degrade 240x150cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319888793"], "labels": [{"id": "319888793", "nombre": "Alfombra Patchwork Degrade 240x150cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1090451532, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160142506939-default.webp", "width": 933, "height": 576}, "imagen_variantes": {"Blanco y Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160142506939-blanco-y-marrón.webp", "width": 933, "height": 576}, "Blanco y Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160142506939-blanco-y-negro.webp", "width": 935, "height": 583}}, "ancho_cm": 150.0, "alto_cm": 240.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911160315302492", "nombre": "Alfombra De Cuero De Oveja Natural 240x180cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319683020"], "labels": [{"id": "319683020", "nombre": "Alfombra De Cuero De Oveja Natural 240x180cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1089618905, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160315302492-default.webp", "width": 844, "height": 582}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160315302492-marrón.webp", "width": 851, "height": 587}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160315302492-beige.webp", "width": 844, "height": 581}, "Beige Oscuro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160315302492-beige-oscuro.webp", "width": 849, "height": 585}, "Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160315302492-blanco.webp", "width": 844, "height": 582}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160315302492-gris.webp", "width": 847, "height": 584}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160315302492-negro.webp", "width": 851, "height": 587}}, "ancho_cm": 180.0, "alto_cm": 240.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911160442785617", "nombre": "Alfombra Cuero De Oveja Pelo Largo Natural 240x300cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319685991"], "labels": [{"id": "319685991", "nombre": "Alfombra Cuero De Oveja Pelo Largo Natural 240x300cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1089624561, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160442785617-default.webp", "width": 849, "height": 585}, "imagen_variantes": {"Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160442785617-blanco.webp", "width": 844, "height": 582}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160442785617-beige.webp", "width": 844, "height": 581}, "Beige Oscuro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160442785617-beige-oscuro.webp", "width": 849, "height": 585}, "Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160442785617-marrón.webp", "width": 851, "height": 587}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160442785617-negro.webp", "width": 851, "height": 587}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160442785617-gris.webp", "width": 847, "height": 584}}, "ancho_cm": 240.0, "alto_cm": 300.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}, {"id": "pa-20260911160535534933", "nombre": "Alfombra Redonda De Cuero De Oveja Natural 140cm", "activo": true, "stores": ["ar"], "alcance": {"tipo": "producto", "valores": ["319731670"], "labels": [{"id": "319731670", "nombre": "Alfombra Redonda De Cuero De Oveja Natural 140cm"}]}, "anchor_selector": "#product_form", "anchor_position": "after", "boton_alineacion": "izquierda", "boton_ancho_completo": true, "whatsapp_habilitado": true, "whatsapp_numero": "5491151857964", "whatsapp_texto": "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente", "whatsapp_link_texto": "¿Preferís que te la simulemos nosotros? Escribinos por WhatsApp", "rotar_habilitado": true, "boton_label": "Probar en tu ambiente", "titulo_modal": "Probá la alfombra en tu ambiente", "texto_instructivo": "Subí una foto de tu ambiente y arrastrá las cuatro esquinas hasta el piso.", "imagen": {"id": 1089754413, "src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160535534933-default.webp", "width": 684, "height": 667}, "imagen_variantes": {"Marrón": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160535534933-marrón.webp", "width": 685, "height": 668}, "Beige": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160535534933-beige.webp", "width": 684, "height": 672}, "Beige Oscuro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160535534933-beige-oscuro.webp", "width": 684, "height": 667}, "Blanco": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160535534933-blanco.webp", "width": 680, "height": 662}, "Gris": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160535534933-gris.webp", "width": 683, "height": 667}, "Negro": {"src": "https://arielbentivoglio.github.io/leder-feeds/probador-alfombras/pa-20260911160535534933-negro.webp", "width": 686, "height": 668}}, "ancho_cm": 140.0, "alto_cm": 140.0, "accent_color": "#a87c4f", "boton_bg_color": "#1a1a1a", "boton_text_color": "#ffffff", "bordes_estilo": "cuadrado"}] /*__END_SETS__*/;

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

  // ─── Deteccion del color/variante activo en la PDP ─────────────────────────
  // Best-effort con varios fallbacks, en el mismo orden de confianza que ya
  // usa el resto del sitio (colores_panel.py / store.js.tpl):
  //   1) bullet nativo con clase .selected (".js-insta-variant"/".js-color-variant")
  //   2) <select> nativo de variante (".js-variation-option"), texto de la opcion elegida
  // Si ninguno matchea contra el mapa de imagenes por color del modulo, cae
  // al "imagen" default configurado en el panel — no rompe nada si el theme
  // no tiene ninguno de estos selectores.
  function colorSeleccionadoActual() {
    var sel = document.querySelector(".js-insta-variant.selected, .js-color-variant.selected");
    if (sel) {
      var v = sel.getAttribute("data-option");
      if (v) return v.trim();
    }
    var selects = document.querySelectorAll("select.js-variation-option");
    for (var i = 0; i < selects.length; i++) {
      var opt = selects[i].options[selects[i].selectedIndex];
      if (opt && opt.text) return opt.text.trim();
    }
    return null;
  }

  function imagenActual(set) {
    var mapa = set.imagen_variantes || {};
    var color = colorSeleccionadoActual();
    if (color && mapa[color] && mapa[color].src) return mapa[color];
    return set.imagen;
  }

  // ─── Estilos (inyectados una sola vez) ─────────────────────────────────────
  function injectStyles(set) {
    if (document.getElementById("ldr-pa-styles")) return;
    var accent = set.accent_color || "#a6512e";
    var btnBg = set.boton_bg_color || "#1a1a1a";
    var btnText = set.boton_text_color || "#ffffff";
    var radius = set.bordes_estilo === "cuadrado" ? "4px" : "10px";
    var css = "" +
      ".ldr-pa-trigger-wrap{display:flex;}" +
      ".ldr-pa-trigger{display:inline-flex;align-items:center;gap:8px;padding:12px 18px;" +
      "border-radius:" + radius + ";border:1px solid " + btnBg + ";background:" + btnBg + ";" +
      "color:" + btnText + ";font-size:14px;font-weight:600;cursor:pointer;margin:10px 0;}" +
      ".ldr-pa-trigger.ldr-pa-trigger-full{display:block;width:100%;justify-content:center;}" +
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
      ".ldr-pa-shadow,.ldr-pa-rug{position:absolute;top:0;left:0;transform-origin:0 0;display:none;}" +
      ".ldr-pa-shadow{background:rgba(15,10,5,0.38);filter:blur(9px);pointer-events:none;}" +
      ".ldr-pa-rug{pointer-events:none;}" +
      ".ldr-pa-rug.ldr-pa-borrando{pointer-events:auto;cursor:crosshair;}" +
      ".ldr-pa-modo-toggle{display:flex;border:1px solid rgba(0,0,0,.15);border-radius:3px;overflow:hidden;margin-top:10px;}" +
      ".ldr-pa-modo-toggle button{flex:1;padding:9px;font-size:12.5px;border:none;background:#fbf9f4;cursor:pointer;color:#5b5145;}" +
      ".ldr-pa-modo-toggle button.ldr-pa-on{background:#5c6b4f;color:#fff;font-weight:600;}" +
      ".ldr-pa-brush-row{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#5b5145;margin-top:10px;display:none;}" +
      ".ldr-pa-brush-row.ldr-pa-show{display:flex;}" +
      ".ldr-pa-brush-row input{flex:1;}" +
      ".ldr-pa-handle{position:absolute;width:22px;height:22px;margin-left:-11px;margin-top:-11px;" +
      "border-radius:50%;background:#fbf9f4;border:2px solid " + accent + ";box-shadow:0 1px 3px rgba(0,0,0,0.3);" +
      "cursor:grab;touch-action:none;display:none;}" +
      ".ldr-pa-handle.ldr-pa-show{display:block;}" +
      ".ldr-pa-handle.ldr-pa-fade{opacity:.25;pointer-events:none;}" +
      ".ldr-pa-actions{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;}" +
      ".ldr-pa-actions .ldr-pa-rot-izq,.ldr-pa-actions .ldr-pa-rot-der{flex:0 0 auto;padding:11px 16px;font-size:16px;}" +
      ".ldr-pa-btn{flex:1 1 auto;padding:11px 14px;border-radius:3px;font-size:13.5px;font-weight:600;cursor:pointer;text-align:center;}" +
      ".ldr-pa-btn.primary{background:" + btnBg + ";color:" + btnText + ";border:1px solid " + btnBg + ";}" +
      ".ldr-pa-btn.secondary{background:transparent;color:#241c15;border:1px solid rgba(0,0,0,0.15);}" +
      ".ldr-pa-caption{font-size:12px;color:#5b5145;margin-top:8px;}" +
      ".ldr-pa-whatsapp{display:flex;align-items:center;gap:7px;margin-top:12px;font-size:12.5px;color:#3d5c2f;text-decoration:none;justify-content:center;}" +
      ".ldr-pa-whatsapp:hover{text-decoration:underline;}" +
      "@media(max-width:480px){.ldr-pa-modal{padding:16px;} .ldr-pa-actions{flex-direction:column;}}";
    var style = document.createElement("style");
    style.id = "ldr-pa-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ─── Álgebra de homografía (proyección de 4 puntos) ────────────────────────
  // Metodo de Heckbert (1989) para mapear el rectangulo fuente (0,0)-(w,0)-
  // (w,h)-(0,h) al cuadrilatero de destino. Corregido 2026-09: la version
  // anterior (basada en adjugate de una matriz 3x3 completa sin dividir por
  // el determinante) producia matrices con componentes astronomicos
  // (~1e24) que posicionaban la alfombra fuera de la pantalla — invisible
  // pero con la imagen y el elemento perfectamente validos (asi se detecto:
  // getBoundingClientRect() daba x negativo enorme). Esta version se
  // verifico numericamente: los 4 puntos fuente mapean EXACTO a los 4
  // puntos de destino, sin excepcion.
  function multmm(a, b) {
    var c = Array(9);
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
      var s = 0;
      for (var k = 0; k < 3; k++) s += a[3*i+k]*b[3*k+j];
      c[3*i+j] = s;
    }
    return c;
  }
  function squareToQuad(x0,y0,x1,y1,x2,y2,x3,y3) {
    var dx1 = x1-x2, dy1 = y1-y2;
    var dx2 = x3-x2, dy2 = y3-y2;
    var sx = x0-x1+x2-x3, sy = y0-y1+y2-y3;
    var den = dx1*dy2 - dx2*dy1;
    var g = (sx*dy2 - dx2*sy) / den;
    var h = (dx1*sy - sx*dy1) / den;
    return [
      x1-x0+g*x1, x3-x0+h*x3, x0,
      y1-y0+g*y1, y3-y0+h*y3, y0,
      g, h, 1
    ];
  }
  function general2DProjection(x1s,y1s,x2s,y2s,x3s,y3s,x4s,y4s,x1d,y1d,x2d,y2d,x3d,y3d,x4d,y4d) {
    var w = x2s, h = y3s; // la fuente siempre es 0,0 - w,0 - w,h - 0,h en este widget
    var Msrc = [1/w,0,0, 0,1/h,0, 0,0,1];
    var Mdst = squareToQuad(x1d,y1d,x2d,y2d,x3d,y3d,x4d,y4d);
    return multmm(Mdst, Msrc);
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
        '<canvas class="ldr-pa-rug"></canvas>' +
        '<div class="ldr-pa-handle" data-i="0"></div>' +
        '<div class="ldr-pa-handle" data-i="1"></div>' +
        '<div class="ldr-pa-handle" data-i="2"></div>' +
        '<div class="ldr-pa-handle" data-i="3"></div>' +
      '</div>' +
      '<p class="ldr-pa-caption">' + (productName ? productName + " \u2014 " : "") +
        (set.ancho_cm && set.alto_cm ? set.ancho_cm + "\u00d7" + set.alto_cm + " cm" : "") + '</p>' +
      '<div class="ldr-pa-modo-toggle">' +
        '<button type="button" class="ldr-pa-modo-esquinas ldr-pa-on">Ajustar esquinas</button>' +
        '<button type="button" class="ldr-pa-modo-borrador">Tapar con muebles</button>' +
      '</div>' +
      '<div class="ldr-pa-brush-row">' +
        '<span>Grosor</span><input type="range" class="ldr-pa-brush" min="10" max="60" value="26">' +
      '</div>' +
      '<div class="ldr-pa-actions">' +
        '<label class="ldr-pa-btn primary" style="margin:0;">Subir o sacar una foto' +
          '<input type="file" accept="image/*" capture="environment" style="display:none;" class="ldr-pa-file"></label>' +
        '<button type="button" class="ldr-pa-btn secondary ldr-pa-rot-izq" title="Girar">\u21b6</button>' +
        '<button type="button" class="ldr-pa-btn secondary ldr-pa-rot-der" title="Girar">\u21b7</button>' +
        '<button type="button" class="ldr-pa-btn secondary ldr-pa-reset">Reiniciar esquinas</button>' +
        '<button type="button" class="ldr-pa-btn secondary ldr-pa-restaurar">Restaurar alfombra completa</button>' +
      '</div>' +
      '<a href="#" target="_blank" rel="noopener" class="ldr-pa-whatsapp">' +
        '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.35A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.27 1.2-1.75 1.24-.45.05-.9.22-3.03-.63-2.57-1.02-4.22-3.62-4.35-3.78-.13-.17-1.04-1.38-1.04-2.63 0-1.25.66-1.87.9-2.12.24-.25.52-.31.7-.31h.5c.16 0 .38-.03.58.44.22.53.75 1.83.82 1.96.07.13.11.29.02.46-.09.17-.14.28-.27.43-.13.15-.28.34-.4.46-.13.13-.27.27-.12.53.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.58-.07.16-.18.68-.79.87-1.07.18-.27.36-.22.6-.13.25.09 1.58.75 1.85.88.27.13.45.2.51.31.07.11.07.65-.15 1.27z"/></svg>' +
        '<span class="ldr-pa-whatsapp-texto"></span>' +
      '</a>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    var stage = modal.querySelector(".ldr-pa-stage");
    var placeholder = modal.querySelector(".ldr-pa-placeholder");
    var roomImg = modal.querySelector(".ldr-pa-room");
    var rug = modal.querySelector(".ldr-pa-rug"); // ahora es un <canvas>
    var ctxRug = rug.getContext("2d");
    var shadow = modal.querySelector(".ldr-pa-shadow");
    var handles = [].slice.call(modal.querySelectorAll(".ldr-pa-handle"));
    var fileInput = modal.querySelector(".ldr-pa-file");
    var resetBtn = modal.querySelector(".ldr-pa-reset");
    var rotIzqBtn = modal.querySelector(".ldr-pa-rot-izq");
    var rotDerBtn = modal.querySelector(".ldr-pa-rot-der");
    var restaurarBtn = modal.querySelector(".ldr-pa-restaurar");
    var closeBtn = modal.querySelector(".ldr-pa-close");
    var whatsappLink = modal.querySelector(".ldr-pa-whatsapp");

    if (set.whatsapp_habilitado === false || !set.whatsapp_numero) {
      whatsappLink.style.display = "none";
    } else {
      whatsappLink.querySelector(".ldr-pa-whatsapp-texto").textContent =
        set.whatsapp_link_texto || "\u00bfPrefer\u00eds que te la simulemos nosotros? Escribinos por WhatsApp";
      var numeroLimpio = String(set.whatsapp_numero).replace(/\D/g, "");
      var plantilla = set.whatsapp_texto || "Hola LEDER estoy interesado en la alfombra y quiero que me simulen esta alfombra ({link}) en mi ambiente";
      var mensaje = plantilla.replace("{link}", window.location.href);
      whatsappLink.href = "https://wa.me/" + numeroLimpio + "?text=" + encodeURIComponent(mensaje);
    }

    var btnModoEsquinas = modal.querySelector(".ldr-pa-modo-esquinas");
    var btnModoBorrador = modal.querySelector(".ldr-pa-modo-borrador");
    var brushRow = modal.querySelector(".ldr-pa-brush-row");
    var brushInput = modal.querySelector(".ldr-pa-brush");

    var baseW = 400;
    var anchoCm = parseFloat(set.ancho_cm) || 170;
    var altoCm = parseFloat(set.alto_cm) || 120;
    var baseH = Math.round(baseW * (altoCm / anchoCm));

    rug.width = baseW; rug.height = baseH;
    rug.style.width = baseW + "px";
    rug.style.height = baseH + "px";
    shadow.style.width = baseW + "px";
    shadow.style.height = baseH + "px";

    function aplicarImagenActual() {
      var img = imagenActual(set);
      if (!img || !img.src) return;
      var tmp = new Image();
      tmp.onload = function () {
        ctxRug.clearRect(0, 0, baseW, baseH);
        ctxRug.drawImage(tmp, 0, 0, baseW, baseH);
      };
      tmp.src = img.src;
    }
    aplicarImagenActual();

    // Si el cliente cambia de color con el modal abierto, la alfombra se
    // actualiza en vivo sin perder las esquinas que ya arrastro (aunque se
    // pierde lo borrado - la textura nueva arranca limpia).
    document.addEventListener("change", function (e) {
      if (e.target && e.target.matches && e.target.matches("select.js-variation-option")) {
        aplicarImagenActual();
      }
    });
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest(".js-insta-variant, .js-color-variant");
      if (t) setTimeout(aplicarImagenActual, 60);
    });

    var defaultCorners = [
      { x: 0.30, y: 0.56 }, { x: 0.72, y: 0.56 },
      { x: 0.88, y: 0.90 }, { x: 0.16, y: 0.90 }
    ];
    var corners = defaultCorners.map(function (c) { return { x: c.x, y: c.y }; });
    var handlesVisible = false;
    var modo = "esquinas";

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

    // Gira las 4 esquinas alrededor del centro del cuadrilatero, sin tocar
    // cada una a mano - util para alinear el rectangulo con el angulo del
    // piso en la foto en vez de arrastrar esquina por esquina.
    function rotar(deltaGrados) {
      var rect = stage.getBoundingClientRect();
      var pxPts = corners.map(function (c) { return { x: c.x * rect.width, y: c.y * rect.height }; });
      var cx = 0, cy = 0;
      pxPts.forEach(function (p) { cx += p.x; cy += p.y; });
      cx /= pxPts.length; cy /= pxPts.length;
      var rad = deltaGrados * Math.PI / 180;
      var cos = Math.cos(rad), sin = Math.sin(rad);
      var rotados = pxPts.map(function (p) {
        var dx = p.x - cx, dy = p.y - cy;
        return { x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos };
      });
      corners = rotados.map(function (p) { return { x: p.x / rect.width, y: p.y / rect.height }; });
      update();
    }
    rotIzqBtn.addEventListener("click", function () { rotar(-10); });
    rotDerBtn.addEventListener("click", function () { rotar(10); });
    if (set.rotar_habilitado === false) {
      rotIzqBtn.style.display = "none";
      rotDerBtn.style.display = "none";
    }

    function setModo(m) {
      modo = m;
      btnModoEsquinas.classList.toggle("ldr-pa-on", m === "esquinas");
      btnModoBorrador.classList.toggle("ldr-pa-on", m === "borrador");
      brushRow.classList.toggle("ldr-pa-show", m === "borrador");
      rug.classList.toggle("ldr-pa-borrando", m === "borrador");
      handles.forEach(function (h) { h.classList.toggle("ldr-pa-fade", m === "borrador"); });
    }
    btnModoEsquinas.addEventListener("click", function () { setModo("esquinas"); });
    btnModoBorrador.addEventListener("click", function () { setModo("borrador"); });

    var dragIndex = null;
    handles.forEach(function (h, i) {
      h.addEventListener("pointerdown", function (e) {
        if (modo !== "esquinas") return;
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

    // Borrador: offsetX/offsetY del pointer ya vienen en el espacio LOCAL
    // del canvas (el navegador deshace el matrix3d solo al hacer hit-test),
    // asi que no hace falta invertir la matriz de perspectiva a mano.
    var borrando = false;
    function borrarEn(x, y) {
      var radio = parseInt(brushInput.value, 10) || 26;
      ctxRug.save();
      ctxRug.globalCompositeOperation = "destination-out";
      var grad = ctxRug.createRadialGradient(x, y, 0, x, y, radio);
      grad.addColorStop(0, "rgba(0,0,0,1)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctxRug.fillStyle = grad;
      ctxRug.beginPath(); ctxRug.arc(x, y, radio, 0, Math.PI * 2); ctxRug.fill();
      ctxRug.restore();
    }
    rug.addEventListener("pointerdown", function (e) {
      if (modo !== "borrador") return;
      borrando = true;
      borrarEn(e.offsetX, e.offsetY);
    });
    rug.addEventListener("pointermove", function (e) {
      if (modo !== "borrador" || !borrando) return;
      borrarEn(e.offsetX, e.offsetY);
    });
    window.addEventListener("pointerup", function () { borrando = false; });

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
    restaurarBtn.addEventListener("click", aplicarImagenActual);

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
        aplicarImagenActual();
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

    var wrap = document.createElement("div");
    wrap.className = "ldr-pa-trigger-wrap";
    var justify = { izquierda: "flex-start", centro: "center", derecha: "flex-end" }[set.boton_alineacion] || "flex-start";
    wrap.style.justifyContent = justify;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = MOUNT_ID;
    btn.className = "ldr-pa-trigger" + (set.boton_ancho_completo ? " ldr-pa-trigger-full" : "");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
      '<rect x="3" y="3" width="18" height="18" rx="1"></rect>' +
      '<path d="M3 9h18M9 21V9"></path></svg>' +
      (set.boton_label || "Probar en tu ambiente");
    btn.addEventListener("click", function () { modalApi.open(); });
    wrap.appendChild(btn);

    var pos = set.anchor_position || "after";
    if (pos === "before") target.parentNode.insertBefore(wrap, target);
    else if (pos === "prepend") target.insertBefore(wrap, target.firstChild);
    else if (pos === "append") target.appendChild(wrap);
    else target.parentNode.insertBefore(wrap, target.nextSibling); // after
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
