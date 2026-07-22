/* CYB3R Work popup (Latest Work collection, /work page only). v1.2.0
 *
 * Reads hidden markers inside each card's .pop-data (bound to CMS fields):
 *   [data-pd="si"|"sl"|"sy"] -> conditional-visibility markers for the Industry / Location / Year rows
 *                               (Webflow tags them w-condition-invisible when the switch is OFF)
 *   [data-pd="ct"]           -> "Website Link Text" value (textContent) -> label for the website link
 *
 * Behaviour:
 *  - A row shows only when its switch is ON *and* the field has a value (blank rows stop showing "-").
 *  - The old teal "Get in touch" button (.wpop-cta) is removed (CSS).
 *  - The website link (.wpop-link) is restyled as the teal CTA button (fill + arrow + hover). The base
 *    Work-page code already shows it only when a Website URL is set and hides it (.hide) otherwise.
 *    Its label is the per-item "Website Link Text" (falls back to "Go to the website").
 *
 * The visual CSS also lives in the site <head> (render-blocking) so there is no flash and it survives
 * even if this hosted script fails to load; the copy injected here is a harmless belt-and-suspenders.
 */
(function () {
  if ((location.pathname || '').replace(/\/+$/, '') !== '/work') return;

  var CSS =
    '.wpop-cta{display:none!important}' +
    '.wpop-link{display:inline-flex!important;align-items:center;gap:.5rem;margin:1.7rem 0 0!important;' +
    'padding:.9rem 1.7rem!important;background:#39F1E0!important;color:#0f0e0e!important;font-weight:600!important;' +
    'letter-spacing:.01em;text-decoration:none!important;border-radius:0;line-height:1.15;max-width:100%;' +
    'flex-wrap:wrap;overflow-wrap:anywhere;transition:background-color .25s ease,color .25s ease!important}' +
    '.wpop-link::after{content:"\\2192";font-weight:600}' +
    '.wpop-link:hover{background:#14a098!important;color:#fff!important;opacity:1!important}' +
    '.wpop-link.hide{display:none!important}';

  function injectCSS() {
    if (document.getElementById('cyb3r-wpop-style')) return;
    var s = document.createElement('style');
    s.id = 'cyb3r-wpop-style';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }
  injectCSS();

  function T(el) { return el ? (el.textContent || '').replace(/ /g, ' ').trim() : ''; }
  // Marker present and not conditionally hidden => shown. Missing marker => hidden (safe default).
  function vis(el) { return !!el && !el.classList.contains('w-condition-invisible'); }

  function apply(card) {
    if (!card) return;
    var pd = card.querySelector('.pop-data');
    if (!pd) return;
    var kids = pd.children;
    var services = T(kids[1]);
    var industry = T(kids[2]);
    var loc = T(kids[3]);
    var year = T(kids[4]);

    var mi = pd.querySelector('[data-pd="si"]');
    var ml = pd.querySelector('[data-pd="sl"]');
    var my = pd.querySelector('[data-pd="sy"]');
    var mc = pd.querySelector('[data-pd="ct"]');

    var rows = document.querySelectorAll('.wpop-rows .wpop-row'); // Services, Industry, Location, Year
    var shown = [!!services, vis(mi) && !!industry, vis(ml) && !!loc, vis(my) && !!year];
    var any = false;
    for (var i = 0; i < rows.length && i < 4; i++) {
      rows[i].style.display = shown[i] ? '' : 'none';
      if (shown[i]) any = true;
    }
    var wrap = document.querySelector('.wpop-rows');
    if (wrap) wrap.style.display = any ? '' : 'none';

    var link = document.querySelector('.wpop-link');
    if (link) {
      // strip a trailing arrow an editor might type, so CSS ::after is the only arrow
      var label = (T(mc) || 'Go to the website').replace(/\s*→\s*$/, '').trim() || 'Go to the website';
      link.textContent = label;
    }
  }

  // token: a stale deferred apply (rapid card switching) must not overwrite the latest card
  var seq = 0;
  function schedule(card) {
    var mine = ++seq;
    function run() { if (mine === seq) apply(card); }
    if (typeof queueMicrotask === 'function') queueMicrotask(run); else setTimeout(run, 0);
    setTimeout(run, 80);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.wpop') || e.target.closest('.wpop-x')) return;
    var card = e.target.closest('.logo-content');
    if (card) schedule(card);
  }, false);

  // Deep-link (/work?project=<Name>) auto-opens the popup via a synthetic card click. Run apply for
  // that card independently, in case this hosted script attaches after that click has already fired.
  function initDeepLink() {
    var proj = new URLSearchParams(location.search).get('project');
    if (!proj) return;
    var target = proj.trim().toLowerCase();
    var tries = 0;
    (function tick() {
      tries++;
      var items = document.querySelectorAll('.w-dyn-item');
      var card = null;
      for (var i = 0; i < items.length; i++) {
        var pd = items[i].querySelector('.pop-data');
        if (!pd) continue;
        var f = pd.querySelector('div');
        if (f && (f.textContent || '').trim().toLowerCase() === target) {
          card = items[i].querySelector('.logo-content') || items[i];
          break;
        }
      }
      if (card) apply(card);
      if (card && document.body.classList.contains('wpop-on')) return;
      if (tries < 40) setTimeout(tick, 200);
    })();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDeepLink);
  else initDeepLink();
})();
