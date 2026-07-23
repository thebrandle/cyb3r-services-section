/* CYB3R Work grid IDLE FLICKER (Latest Work cards, /work page). v1.0.0
 *
 * While the user is NOT hovering the grid, random cards briefly "light up" like flickering
 * lights - each flicker is a short synthetic hover (mouseenter/mouseleave dispatched on the
 * card), so it reuses the existing card-hover engine exactly: video cards blink their video,
 * splash cards blink their image cycle. Rules:
 *   - starts after load, only while the grid is on screen and the tab is visible
 *   - up to 3 cards lit at once, random pick, random 350-1100ms burst, random 260-720ms gaps
 *   - pointer enters the grid -> all flickers stop instantly (real hover takes over)
 *   - pointer leaves the grid -> flickering resumes
 *   - paused while the project popup (.wpop) is open; disabled for prefers-reduced-motion
 *   - only cards that actually have hover media (video URL or loaded splash frames) join in
 */
(function () {
  if ((location.pathname || '').replace(/\/+$/, '') !== '/work') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var MAX_LIT = 3;
  var active = new Map(); // card -> timeout
  var pool = [], grid = null, hovering = false, inView = true;

  function mediaReady(card) {
    var ov = card.querySelector('.card-hover');
    if (!ov || ov.classList.contains('w-condition-invisible')) return false;
    if (ov.querySelector('video')) return true;
    var fr = ov.querySelectorAll('.card-hover-frame');
    if (!fr.length) return false;
    var alt = (fr[0].getAttribute('alt') || '').trim();
    if (/^https?:\/\//i.test(alt)) return true; // hover video URL stored in first frame alt
    for (var i = 0; i < fr.length; i++) {
      if (fr[i].currentSrc && fr[i].naturalWidth > 0) return true;
    }
    return false;
  }

  function fire(card, type) { card.dispatchEvent(new Event(type)); }

  function extinguish(card) {
    var t = active.get(card);
    if (t) clearTimeout(t);
    active.delete(card);
    fire(card, 'mouseleave');
  }
  function extinguishAll() { Array.from(active.keys()).forEach(extinguish); }

  function light(card) {
    if (active.has(card)) return;
    fire(card, 'mouseenter');
    var t = setTimeout(function () { extinguish(card); }, 350 + Math.random() * 750);
    active.set(card, t);
  }

  function tick() {
    setTimeout(tick, 260 + Math.random() * 460);
    if (hovering || !inView || document.hidden) return;
    if (document.body.classList.contains('wpop-on')) return;
    if (active.size >= MAX_LIT || !pool.length) return;
    for (var k = 0; k < 6; k++) {
      var c = pool[Math.floor(Math.random() * pool.length)];
      if (!active.has(c)) { light(c); break; }
    }
  }

  function refreshPool() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.logo-content'));
    pool = cards.filter(mediaReady);
    return cards;
  }

  function init() {
    var cards = refreshPool();
    if (!cards.length) return false;
    grid = cards[0].closest('.w-dyn-list') || cards[0].parentElement;
    if (grid) {
      grid.addEventListener('pointerenter', function () { hovering = true; extinguishAll(); });
      grid.addEventListener('pointerleave', function () { hovering = false; });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          inView = en[0].isIntersecting;
          if (!inView) extinguishAll();
        }, { threshold: 0.12 }).observe(grid);
      }
    }
    document.addEventListener('visibilitychange', function () { if (document.hidden) extinguishAll(); });
    setTimeout(tick, 900);            // let the grid settle before the show starts
    setTimeout(refreshPool, 3500);    // re-scan once splash images have finished loading
    return true;
  }

  (function boot(n) {
    if (init()) return;
    if (n < 40) setTimeout(function () { boot(n + 1); }, 250);
  })(0);
})();
