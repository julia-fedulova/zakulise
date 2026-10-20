(function () {
  var early = new Date(2026, 9, 26);
  var door = new Date(2026, 9, 31);
  var after = new Date(2026, 10, 1);
  var today = new Date();
  today.setHours(12, 0, 0, 0);

  var tier = "early";
  if (today >= after) tier = "past";
  else if (today >= door) tier = "door";
  else if (today >= early) tier = "late";

  var copy = {
    early: { sum: "3\u00a0000", until: "при оплате до 25 октября" },
    late: { sum: "3\u00a0666", until: "с 26 октября" },
    door: { sum: "4\u00a0000", until: "в день представления, 31 октября" },
    past: { sum: "—", until: "вечер 31 октября уже прошёл" }
  };

  var sum = document.querySelector("[data-hero-price]");
  var until = document.querySelector("[data-hero-until]");
  if (sum && copy[tier]) sum.textContent = copy[tier].sum;
  if (until && copy[tier]) until.textContent = copy[tier].until;

  document.querySelectorAll("[data-tier]").forEach(function (row) {
    row.classList.toggle("is-current", row.dataset.tier === tier);
  });

  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (!("IntersectionObserver" in window)) return;
  var byId = {};
  links.forEach(function (link) {
    byId[link.getAttribute("href")] = link;
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var current = byId["#" + entry.target.id];
      links.forEach(function (link) { link.classList.toggle("is-on", link === current); });
    });
  }, { rootMargin: "-15% 0px -70% 0px", threshold: 0.1 });
  document.querySelectorAll(".qa").forEach(function (section) { observer.observe(section); });
})();
