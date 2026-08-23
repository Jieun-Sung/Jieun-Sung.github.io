/* Jieun Sung — site behaviour. No dependencies. */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Scroll-spy: marks the tab for the section in view, and keeps that
     tab scrolled into view inside the horizontally scrollable bar.
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
          if (!active) return;
          active.setAttribute("aria-current", "true");
          // Keep the active tab visible when the bar overflows horizontally.
          // "nearest" on both axes so this never scrolls the page itself.
          if (active.scrollIntoView) {
            active.scrollIntoView({ block: "nearest", inline: "nearest" });
          }
        });
      },
      // Top inset clears the sticky bar; bottom inset keeps one section active.
      { rootMargin: "-25% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach(function (t) { observer.observe(t); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initScrollSpy(Array.prototype.slice.call(
      document.querySelectorAll(".nav__item")
    ));

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
