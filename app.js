// Tema düğmesi ve yıl — satır içi script yok, tüm davranış burada.
(function () {
  "use strict";

  var root = document.documentElement;
  var KEY = "crew-theme";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* depolama kapalıysa sistem teması kalır */ }
  }
  function effective() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var saved = stored();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var label = btn.querySelector(".theme-toggle__label");
      var sync = function () {
        var next = effective() === "dark" ? "light" : "dark";
        label.textContent = next === "dark" ? "Koyu tema" : "Açık tema";
        btn.setAttribute("aria-label", next === "dark" ? "Koyu temaya geç" : "Açık temaya geç");
      };
      btn.hidden = false;
      sync();
      btn.addEventListener("click", function () {
        var next = effective() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        store(next);
        sync();
      });
    }

    var yil = document.getElementById("yil");
    if (yil) yil.textContent = String(new Date().getFullYear());
  });
})();
