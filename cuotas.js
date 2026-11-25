(function() {

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