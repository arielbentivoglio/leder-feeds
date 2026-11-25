(function() {

  // ===== Estilos de cuotas y Transferencia (panel /cuotas) =====
  (function() {
    var CSS = "@media (min-width:768px){html body .product-item .js-max-installments-container,html body .product-item .js-max-installments-container *{color:#000000 !important;font-weight:700 !important;}html body .product-item .js-max-installments-container,html body .product-item .js-max-installments-container span{font-size:14px !important;}html body .product-item .js-payment-discount-price-product-container{font-size:12px !important;}html body .product-item .js-payment-discount-price-product{color:#000000 !important;font-size:12px !important;font-weight:700 !important;}html body .product-item .js-payment-discount-price-product-container>span:not([class]){color:#000000 !important;font-size:12px !important;font-weight:600 !important;}html body .product-item .js-payment-discount-name-product{font-size:12px !important;font-weight:600 !important;}html body .product-item .js-payment-discount-name-product::after{color:#ff0000 !important;font-weight:600 !important;}html body .category-body .product-item .js-max-installments-container,html body .category-body .product-item .js-max-installments-container *{color:#000000 !important;font-weight:700 !important;}html body .category-body .product-item .js-max-installments-container,html body .category-body .product-item .js-max-installments-container span{font-size:14px !important;}html body .category-body .product-item .js-payment-discount-price-product-container{font-size:12px !important;}html body .category-body .product-item .js-payment-discount-price-product{color:#000000 !important;font-size:12px !important;font-weight:700 !important;}html body .category-body .product-item .js-payment-discount-price-product-container>span:not([class]){color:#000000 !important;font-size:12px !important;font-weight:600 !important;}html body .category-body .product-item .js-payment-discount-name-product{font-size:12px !important;font-weight:600 !important;}html body .category-body .product-item .js-payment-discount-name-product::after{color:#ff0000 !important;font-weight:600 !important;}html body #single-product .js-max-installments-container,html body #single-product .js-max-installments-container *{color:#e2001a !important;font-weight:700 !important;}html body #single-product .js-max-installments-container,html body #single-product .js-max-installments-container span{font-size:16px !important;}html body #single-product .js-payment-discount-price-product-container{font-size:16px !important;}html body #single-product .js-payment-discount-price-product{color:#000000 !important;font-size:16px !important;font-weight:400 !important;}html body #single-product .js-payment-discount-price-product-container>span:not([class]){color:#000000 !important;font-size:16px !important;font-weight:400 !important;}html body #single-product .js-payment-discount-name-product{font-size:16px !important;font-weight:400 !important;}html body #single-product .js-payment-discount-name-product::after{color:#ff0000 !important;font-weight:400 !important;}}@media (max-width:767px){html body .product-item .js-max-installments-container,html body .product-item .js-max-installments-container *{color:#000000 !important;font-weight:700 !important;}html body .product-item .js-max-installments-container,html body .product-item .js-max-installments-container span{font-size:14px !important;}html body .product-item .js-payment-discount-price-product-container{font-size:12px !important;}html body .product-item .js-payment-discount-price-product{color:#000000 !important;font-size:12px !important;font-weight:700 !important;}html body .product-item .js-payment-discount-price-product-container>span:not([class]){color:#000000 !important;font-size:12px !important;font-weight:600 !important;}html body .product-item .js-payment-discount-name-product{font-size:12px !important;font-weight:600 !important;}html body .product-item .js-payment-discount-name-product::after{color:#ff0000 !important;font-weight:600 !important;}html body .category-body .product-item .js-max-installments-container,html body .category-body .product-item .js-max-installments-container *{color:#000000 !important;font-weight:700 !important;}html body .category-body .product-item .js-max-installments-container,html body .category-body .product-item .js-max-installments-container span{font-size:12px !important;}html body .category-body .product-item .js-payment-discount-price-product-container{font-size:12px !important;}html body .category-body .product-item .js-payment-discount-price-product{color:#000000 !important;font-size:12px !important;font-weight:700 !important;}html body .category-body .product-item .js-payment-discount-price-product-container>span:not([class]){color:#000000 !important;font-size:12px !important;font-weight:600 !important;}html body .category-body .product-item .js-payment-discount-name-product{font-size:12px !important;font-weight:600 !important;}html body .category-body .product-item .js-payment-discount-name-product::after{color:#ff0000 !important;font-weight:600 !important;}html body #single-product .js-max-installments-container,html body #single-product .js-max-installments-container *{color:#e2001a !important;font-weight:700 !important;}html body #single-product .js-max-installments-container,html body #single-product .js-max-installments-container span{font-size:16px !important;}html body #single-product .js-payment-discount-price-product-container{font-size:16px !important;}html body #single-product .js-payment-discount-price-product{color:#000000 !important;font-size:16px !important;font-weight:400 !important;}html body #single-product .js-payment-discount-price-product-container>span:not([class]){color:#000000 !important;font-size:16px !important;font-weight:400 !important;}html body #single-product .js-payment-discount-name-product{font-size:16px !important;font-weight:400 !important;}html body #single-product .js-payment-discount-name-product::after{color:#ff0000 !important;font-weight:400 !important;}}";
    function aplicar() {
      var st = document.getElementById('ldr-cuotas-estilos');
      if (!st) {
        st = document.createElement('style');
        st.id = 'ldr-cuotas-estilos';
        (document.head || document.documentElement).appendChild(st);
      }
      if (st.textContent !== CSS) st.textContent = CSS;
    }
    aplicar();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aplicar);
  })();


  // ===== Redondeo de cuotas (hacia arriba, sin decimales) =====
  var RE_MONTO = /\$\s?(\d{1,3}(?:\.\d{3})*|\d+),(\d{2})(?!\d)/g;

  function redondearTexto(txt) {
    return txt.replace(RE_MONTO, function(m, entero, dec) {
      var centavos = parseInt(entero.replace(/\./g, ''), 10) * 100 + parseInt(dec, 10);
      var pesos = Math.floor((centavos + 99) / 100);  // ceil sin errores de float
      return '$' + String(pesos).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    });
  }

  function redondearEl(el) {
    // Solo nodos de texto, para no romper hijos (ej. spans dentro de la barra fija)
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    var n;
    while ((n = walker.nextNode())) {
      var nuevo = redondearTexto(n.nodeValue);
      if (nuevo !== n.nodeValue) n.nodeValue = nuevo;  // solo escribe si cambia: evita loops
    }
  }

  function redondearTodo() {
    var els = document.querySelectorAll('.js-installment-price, .ldr-satc__cuotas');
    for (var i = 0; i < els.length; i++) redondearEl(els[i]);
  }

  var pendiente = false;
  function programar() {
    if (pendiente) return;
    pendiente = true;
    setTimeout(function() { pendiente = false; redondearTodo(); }, 30);
  }

  // Tiendanube reescribe el importe al cambiar de variante / cargar carruseles
  new MutationObserver(programar).observe(document.documentElement, {
    childList: true, subtree: true, characterData: true
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', redondearTodo);
  } else {
    redondearTodo();
  }

})();