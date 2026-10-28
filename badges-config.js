window.BADGES_CONFIG = (function () {
  var all = [{"text": "🔥¡10% OFF 4 o más!", "bg_color": "#000000", "text_color": "#ffffff", "border_color": "#000000", "pos_v": "bottom", "pos_h": "left", "style": "rect", "stores": ["ar"], "ids_url_ar": "https://arielbentivoglio.github.io/leder-feeds/individuales-ids-ar.js", "var_name_ar": "INDIVIDUALES_IDS_AR"}, {"text": "🔥¡10% OFF 4 o más!", "bg_color": "#000000", "text_color": "#ffffff", "border_color": "#000000", "pos_v": "bottom", "pos_h": "left", "style": "rect", "stores": ["ar"], "ids_url_ar": "https://arielbentivoglio.github.io/leder-feeds/chairpad-vacuno-ids-ar.js", "var_name_ar": "CHAIRPAD_VACUNO_IDS_AR"}, {"text": "🔥¡25% OFF 3 o más!", "bg_color": "#000000", "text_color": "#ffffff", "border_color": "#000000", "pos_v": "top", "pos_h": "right", "style": "rect", "stores": ["ar"], "inicio": "2026-10-23 00:00", "fin": "2026-11-02 00:00", "ids_url_ar": "https://arielbentivoglio.github.io/leder-feeds/almohadones-40x40-ids-ar.js", "var_name_ar": "ALMOHADONES_40X40_IDS_AR"}, {"text": "🔥¡50% OFF en segunda unidad!", "bg_color": "#000000", "text_color": "#ffffff", "border_color": "#000000", "pos_v": "top", "pos_h": "right", "style": "rect", "stores": ["ar"], "ids_url_ar": "https://arielbentivoglio.github.io/leder-feeds/zapatillas-ids-ar.js", "var_name_ar": "ZAPATILLAS_IDS_AR"}, {"text": "ONE OF A KIND", "bg_color": "rgba(255,255,255,0.5)", "text_color": "#000000", "border_color": "#000000", "pos_v": "top", "pos_h": "left", "style": "rect", "stores": ["ar"], "ids_url_ar": "https://arielbentivoglio.github.io/leder-feeds/one-of-a-kind-ids-ar.js", "var_name_ar": "ONE_OF_A_KIND_IDS_AR"}, {"text": "🔥¡Llevá 2, pagá 1!", "bg_color": "#000000", "text_color": "#ffffff", "border_color": "#000000", "pos_v": "top", "pos_h": "right", "style": "rect", "stores": ["ar"], "inicio": "2026-11-01 23:00", "fin": "2026-11-10 00:00", "ids_url_ar": "https://arielbentivoglio.github.io/leder-feeds/2x1-ids-ar.js", "var_name_ar": "2X1_IDS_AR"}, {"text": "🔥 3x2", "bg_color": "#000000", "text_color": "#ffffff", "border_color": "", "pos_v": "top", "pos_h": "left", "style": "rect", "stores": ["ar"], "inicio": "2026-11-01 23:00", "fin": "2026-11-10 00:00", "ids_url_ar": "https://arielbentivoglio.github.io/leder-feeds/3x2-almohadones-ids-ar.js", "var_name_ar": "3X2_ALMOHADONES_IDS_AR"}, {"text": "CyberMonday", "bg_color": "#05208a", "text_color": "#ffffff", "border_color": "", "pos_v": "bottom", "pos_h": "right", "style": "rect", "stores": ["ar"], "inicio": "2026-11-01 23:00", "fin": "2026-11-10 00:00", "ids_url_ar": "https://arielbentivoglio.github.io/leder-feeds/cyber-monday-ids-ar.js", "var_name_ar": "CYBER_MONDAY_IDS_AR"}];
  try {
    var store = (location.hostname || '').indexOf('leder.cl') !== -1 ? 'cl' : 'ar';
    var tz = store === 'cl' ? 'America/Santiago' : 'America/Argentina/Buenos_Aires';
    var fmt = null;
    try {
      fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) { fmt = null; }
    var offsetMin = function (ms) {
      if (!fmt || !fmt.formatToParts) return -180;
      var p = {};
      fmt.formatToParts(new Date(ms)).forEach(function (x) { p[x.type] = x.value; });
      var asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, (+p.hour) % 24, +p.minute, +p.second);
      return Math.round((asUtc - ms) / 60000);
    };
    var toMs = function (s) {
      var m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(s || '');
      if (!m) return null;
      var naive = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
      var guess = naive - offsetMin(naive) * 60000;
      return naive - offsetMin(guess) * 60000;
    };
    var now = Date.now();
    return all.filter(function (b) {
      var i = toMs(b.inicio), f = toMs(b.fin);
      if (i !== null && now < i) return false;
      if (f !== null && now >= f) return false;
      return true;
    });
  } catch (e) {
    return all;
  }
})();
