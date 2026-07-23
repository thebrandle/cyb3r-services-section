/* CYB3R Work popup (Latest Work collection, /work page only). v1.6.0
 *
 * v1.6.0: collage is ROW-based per user: each number in "Popup Layout" = tiles in that ROW,
 * top to bottom. "3+1+2" = row of 3, then one full-width tile, then a row of 2. "3x3" = 3 rows of 3.
 * v1.5.0: per-card MEDIA COLLAGE on the popup's left half. Markers in .pop-data:
 *   [data-pd="playout"] -> "Popup Layout" pattern
 *   [data-pd="pvid"]    -> "Popup Video URL" (optional; takes the first tile, muted autoplay loop)
 *   [data-pd="pm1..9"]  -> bound imgs for "Popup Img 1..9" (fill tiles in order; empties skipped)
 * When a layout + at least one media exists, the collage replaces the single photo/logo.
 *
 * Reads hidden markers inside each card's .pop-data (bound to CMS fields):
 *   [data-pd="si"|"sl"|"sy"] -> conditional-visibility markers for the Industry / Location / Year rows
 *   [data-pd="ct"]           -> "Website Link Text" -> label for the website link (.wpop-link)
 *   [data-pd="xt"]           -> "Extra Button Text"  -> label for the optional 2nd button (.wpop-link2)
 *   [data-pd="xu"]           -> "Extra Button URL"   -> href for the 2nd button; it only shows when set
 *
 * The website link (.wpop-link, teal CTA button) + the optional extra button (.wpop-link2, same style)
 * sit side-by-side in a .wpop-cta-row flex row. The website link shows only when a Website URL is set
 * (base code adds .hide otherwise); the extra button shows only when Extra Button URL is filled.
 * The old "Get in touch" CTA (.wpop-cta) is removed via CSS.
 *
 * Visual CSS also lives render-blocking in the site <head>; the copy injected here is belt-and-suspenders.
 */
(function () {
  if ((location.pathname || '').replace(/\/+$/, '') !== '/work') return;

  var CSS =
    '.wpop-cta{display:none!important}' +
    '.wpop-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:.9rem;margin:1.7rem 0 0}' +
    '.wpop-link,.wpop-link2{display:inline-flex!important;align-items:center;gap:.5rem;margin:1.7rem 0 0!important;' +
    'padding:.9rem 1.7rem!important;background:#39F1E0!important;color:#0f0e0e!important;font-weight:600!important;' +
    'letter-spacing:.01em;text-decoration:none!important;border-radius:0;line-height:1.15;max-width:100%;' +
    'flex-wrap:wrap;overflow-wrap:anywhere;transition:background-color .25s ease,color .25s ease!important}' +
    '.wpop-cta-row .wpop-link,.wpop-cta-row .wpop-link2{margin:0!important}' +
    '.wpop-link::after,.wpop-link2::after{content:"\\2192";font-weight:600}' +
    '.wpop-link:hover,.wpop-link2:hover{background:#14a098!important;color:#fff!important;opacity:1!important}' +
    '.wpop-link.hide,.wpop-link2.hide{display:none!important}' +
    '.wpop-collage{position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;background:#0f0e0e}' +
    '.wpop-collage .wc-row{flex:1;display:flex;gap:6px;min-height:0}' +
    '.wpop-collage .wc-tile{flex:1;position:relative;overflow:hidden;min-width:0}' +
    '.wpop-collage .wc-tile img,.wpop-collage .wc-tile video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}' +
    '.wpop.has-collage .wpop-img,.wpop.has-collage .wpop-logo{display:none!important}';

  function injectCSS() {
    if (document.getElementById('cyb3r-wpop-style')) return;
    var s = document.createElement('style');
    s.id = 'cyb3r-wpop-style';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }
  injectCSS();

  function T(el) { return el ? (el.textContent || '').replace(/ /g, ' ').trim() : ''; }
  function vis(el) { return !!el && !el.classList.contains('w-condition-invisible'); }
  function clean(s, fb) { return (s || fb).replace(/\s*→\s*$/, '').trim() || fb; }

  // Wrap the website link in a flex row (once) and add the empty 2nd button beside it.
  function ensureRow() {
    var link = document.querySelector('.wpop-link');
    if (!link) return null;
    var row = document.querySelector('.wpop-cta-row');
    if (!row) {
      row = document.createElement('div');
      row.className = 'wpop-cta-row';
      link.parentNode.insertBefore(row, link);
      row.appendChild(link);
      var b2 = document.createElement('a');
      b2.className = 'wpop-link2 hide';
      row.appendChild(b2);
    }
    return row;
  }

  function apply(card) {
    if (!card) return;
    var pd = card.querySelector('.pop-data');
    if (!pd) return;
    var kids = pd.children;
    var services = T(kids[1]);
    var industry = T(kids[2]);
    var loc = T(kids[3]);
    var year = T(kids[4]);
    var wurl = T(kids[6]); // Website URL

    var mi = pd.querySelector('[data-pd="si"]');
    var ml = pd.querySelector('[data-pd="sl"]');
    var my = pd.querySelector('[data-pd="sy"]');
    var mc = pd.querySelector('[data-pd="ct"]');
    var xt = T(pd.querySelector('[data-pd="xt"]'));
    var xu = T(pd.querySelector('[data-pd="xu"]'));

    var rows = document.querySelectorAll('.wpop-rows .wpop-row'); // Services, Industry, Location, Year
    var shown = [!!services, vis(mi) && !!industry, vis(ml) && !!loc, vis(my) && !!year];
    var any = false;
    for (var i = 0; i < rows.length && i < 4; i++) {
      rows[i].style.display = shown[i] ? '' : 'none';
      if (shown[i]) any = true;
    }
    var wrap = document.querySelector('.wpop-rows');
    if (wrap) wrap.style.display = any ? '' : 'none';

    // CTA row: website link + optional extra button. The website link is managed here so a Website
    // URL entered without an http(s):// scheme still shows (the base engine's strict regex would
    // otherwise add .hide and drop the button) - the scheme is prepended for the href.
    var row = ensureRow();
    var link = document.querySelector('.wpop-link');
    var linkShown = false;
    if (link) {
      if (wurl) {
        link.setAttribute('href', /^https?:\/\//i.test(wurl) ? wurl : 'https://' + wurl.replace(/^\/+/, ''));
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
        link.classList.remove('hide');
        link.textContent = clean(T(mc), 'Go to the website');
        linkShown = true;
      } else {
        link.classList.add('hide');
      }
    }

    var extraShown = false;
    var b2 = row ? row.querySelector('.wpop-link2') : null;
    if (b2) {
      if (xu) {
        b2.textContent = clean(xt, 'Learn more');
        b2.setAttribute('href', xu);
        if (/^https?:\/\//i.test(xu)) { b2.setAttribute('target', '_blank'); b2.setAttribute('rel', 'noopener'); }
        else { b2.removeAttribute('target'); b2.removeAttribute('rel'); }
        b2.classList.remove('hide');
        extraShown = true;
      } else {
        b2.classList.add('hide');
      }
    }
    if (row) row.style.display = (linkShown || extraShown) ? '' : 'none';

    // --- media collage (left half) ---
    var pop = document.querySelector('.wpop');
    var mediaBox = document.querySelector('.wpop-media');
    if (mediaBox) {
      var oldCol = mediaBox.querySelector('.wpop-collage');
      if (oldCol) oldCol.remove();
      if (pop) pop.classList.remove('has-collage');
      var layoutStr = T(pd.querySelector('[data-pd="playout"]'));
      var pvidUrl = T(pd.querySelector('[data-pd="pvid"]'));
      if (layoutStr) {
        var media = [];
        if (/^https?:\/\//i.test(pvidUrl)) media.push({ v: pvidUrl });
        for (var mi2 = 1; mi2 <= 9; mi2++) {
          var pim = pd.querySelector('[data-pd="pm' + mi2 + '"]');
          if (!pim) continue;
          var psrc = pim.getAttribute('src') || '';
          if (psrc && pim.className.indexOf('w-condition-invisible') < 0 && psrc.indexOf('placeholder') < 0) media.push({ i: psrc });
        }
        var cols = [];
        var nm = layoutStr.match(/^(\d)\s*x\s*(\d)$/i);
        if (nm) { for (var kk = 0; kk < +nm[2]; kk++) cols.push(+nm[1]); }
        else cols = layoutStr.split('+').map(function (s) { return parseInt(s, 10) || 0; }).filter(Boolean);
        if (media.length && cols.length) {
          var colWrap = document.createElement('div');
          colWrap.className = 'wpop-collage';
          var mIdx = 0;
          for (var ci = 0; ci < cols.length && mIdx < media.length; ci++) {
            var colEl = document.createElement('div');
            colEl.className = 'wc-row';
            for (var ti = 0; ti < cols[ci] && mIdx < media.length; ti++) {
              var tile = document.createElement('div');
              tile.className = 'wc-tile';
              var itm = media[mIdx++];
              if (itm.v) {
                var vv = document.createElement('video');
                vv.src = itm.v; vv.muted = true; vv.loop = true; vv.autoplay = true;
                vv.playsInline = true; vv.setAttribute('playsinline', '');
                tile.appendChild(vv);
                var vp = vv.play(); if (vp && vp.catch) vp.catch(function () {});
              } else {
                var ig = document.createElement('img');
                ig.src = itm.i; ig.alt = '';
                tile.appendChild(ig);
              }
              colEl.appendChild(tile);
            }
            if (colEl.children.length) colWrap.appendChild(colEl);
          }
          if (colWrap.children.length) {
            mediaBox.appendChild(colWrap);
            if (pop) pop.classList.add('has-collage');
          }
        }
      }
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

  // Deep-link (/work?project=<Name>) auto-opens the popup via a synthetic card click.
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
