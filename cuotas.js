(function() {
  var reglas = {"9": {"activo": true, "mensaje": "Abonando por MercadoPago", "color": "#888888"}};

  // Solo actuar en páginas de producto (body tiene clase template-product)
  if (!document.body.classList.contains('template-product')) return;

  function inyectar() {
    document.querySelectorAll('div.installment-no-interest').forEach(function(el) {
      if (el.dataset.mpInyectado) return;
      var amountEl = el.querySelector('.js-installment-amount');
      if (!amountEl) return;
      var cuotas = amountEl.textContent.trim();
      if (reglas[cuotas]) {
        var span = document.createElement('span');
        span.className = 'leder-cuotas-msg';
        span.style.cssText = 'font-size:0.85em;display:block;margin-top:2px;color:' + reglas[cuotas].color + ';';
        span.textContent = reglas[cuotas].mensaje;
        el.appendChild(span);
        el.dataset.mpInyectado = '1';
      }
    });
  }

  var observer = new MutationObserver(inyectar);
  observer.observe(document.body, { childList: true, subtree: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inyectar);
  } else {
    inyectar();
  }
})();