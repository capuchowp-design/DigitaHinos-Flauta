// Só age dentro do app Android (Capacitor). No navegador comum não faz nada.
(function () {
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;

  var origClick = HTMLAnchorElement.prototype.click;

  function toBase64(blob) {
    return new Promise(function (ok, err) {
      var r = new FileReader();
      r.onload = function () { ok(String(r.result).split(',')[1]); };
      r.onerror = err;
      r.readAsDataURL(blob);
    });
  }

  async function salvarECompartilhar(a) {
    var nome = (a.download || 'arquivo').replace(/[\\/:*?"<>|]+/g, '_');
    try {
      var P = C.Plugins || {};
      var blob = await (await fetch(a.href)).blob();
      var dados = await toBase64(blob);
      var w = await P.Filesystem.writeFile({ path: nome, data: dados, directory: 'CACHE' });
      await P.Share.share({ title: nome, files: [w.uri], dialogTitle: 'Salvar ou compartilhar' });
    } catch (e) {
      var msg = String((e && e.message) || e);
      if (/cancel/i.test(msg)) return;
      alert('Não foi possível salvar o arquivo: ' + msg);
    }
  }

  HTMLAnchorElement.prototype.click = function () {
    if (this.download && /^blob:/.test(this.href)) {
      salvarECompartilhar(this);
      return;
    }
    return origClick.apply(this, arguments);
  };
})();
