/* Jieun Sung — site behaviour. No dependencies. */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Signature element: a differential-expression rank strip.
     Genes sorted by logFC, up-regulated above the axis, down below.
     Values are synthetic and deterministic — no real or unpublished
     data is used, and the shape is identical on every load.
     ------------------------------------------------------------------ */
  function drawRankStrip(svg) {
    var N = 76;
    var W = 760;
    var H = 110;
    var MID = H / 2;
    var barW = 4;
    var gap = (W - N * barW) / (N - 1);

    // Fixed jitter, cycled — keeps the curve organic without randomness.
    var jitter = [0.94, 1.06, 0.88, 1.12, 0.97, 1.03, 0.91, 1.09, 1.0, 0.86];

    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("preserveAspectRatio", "none");

    var ns = "http://www.w3.org/2000/svg";
    var frag = document.createDocumentFragment();

    var axis = document.createElementNS(ns, "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", W);
    axis.setAttribute("y1", MID);
    axis.setAttribute("y2", MID);
    axis.setAttribute("class", "rankstrip__axis");
    frag.appendChild(axis);

    for (var i = 0; i < N; i++) {
      var x = 1 - (2 * i) / (N - 1);            // +1 -> -1
      var v = Math.sign(x) * Math.pow(Math.abs(x), 1.9); // flat middle, steep tails
      v *= jitter[i % jitter.length];
      var h = Math.max(1.5, Math.abs(v) * (MID - 6));

      var r = document.createElementNS(ns, "rect");
      r.setAttribute("x", i * (barW + gap));
      r.setAttribute("width", barW);
      r.setAttribute("height", h);
      r.setAttribute("y", v >= 0 ? MID - h : MID);
      r.setAttribute("rx", 1);
      r.setAttribute("fill", v >= 0 ? "var(--c-green)" : "var(--c-rule)");
      r.style.animationDelay = (i * 14) + "ms";
      frag.appendChild(r);
    }

    svg.appendChild(frag);
  }

  /* ------------------------------------------------------------------
     Scroll-spy: marks the nav item for the section in view.
     ------------------------------------------------------------------ */
  function initScrollSpy(links) {
    var byId = {};
    links.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });

    var targets = Object.keys(byId)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || !targets.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          var active = byId[entry.target.id];
          if (active) active.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach(function (t) { observer.observe(t); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var strip = document.getElementById("rankstrip");
    if (strip) drawRankStrip(strip);

    initScrollSpy(Array.prototype.slice.call(
      document.querySelectorAll(".nav__item")
    ));

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
