/* CYB3R Work popup (Latest Work collection, /work page only). v1.13.4
 *
 * v1.13.4: an EXPLICIT Popup Layout always renders its grid - declared-but-empty slots
 * show as dark placeholder tiles even when NO images are uploaded yet (the old anyMedia
 * gate hid the whole collage until at least one slot had media, so freshly typed layouts
 * looked like they "did nothing"). The blank-field 3x3 default still requires media.
 * v1.13.3: media always fills its card - all collage flexGrow values are now >= 1 (flex
 * only fills a FRACTION of free space when grows sum below 1, which left the full-width
 * video row ~3% short of the band and some tiles short of their column).
 * v1.13.2: the direction flip alternates over MASONRY bands only (full-width rows are
 * skipped), so the band under the video mirrors the band above it.
 * v1.13.1: no two bands ever look the same - per-band random column WIDTHS + alternate
 * bands pack right-to-left (the odd-one-out tile flips sides) on top of the height jitter.
 * v1.13.0: MASONRY BANDS - "Popup Layout" = band sizes separated by x (any separator), top
 * to bottom. Each number = tiles in that horizontal band, packed masonry (random seeded
 * heights); a 1-tile band = a FULL-WIDTH row (e.g. for the video). Slots run sequentially
 * across bands (Popup Img 1-9 in order; the video takes its slot via "s: https://...").
 * BLANK now defaults to 3x3 (two masonry bands of 3, slots 1-6) - the collage still only
 * shows when at least one slot has media, else the single Popup Image fallback. Total
 * capped at 9. Example: 6x1x2 = 6 masonry, slot 7 full row, slots 8-9 masonry.
 * v1.12.0: the media collage was MASONRY with a single tile count.
 * v1.11.0: rich-text paragraphs/list items now INHERIT font-size/weight/line-height from
 * .wpop-desc (the site's global `p { font-size: var(--font--work-title); opacity:.7 }` rule was
 * overriding the class, which is why Designer font changes on wpop-desc "did nothing"). Also:
 * .wpop-head row at the top of the panel holds the logo + close button side by side.
 * v1.10.1: the industry line is a ROW - "INDUSTRY" label (.wpop-lab) on the left, the value
 * (.wpop-industry-val, from the Industry field) on the right; the row hides when empty.
 * v1.10.0: panel order is now LOGO -> INDUSTRY -> SERVICES -> TITLE -> DESCRIPTION -> CTAs.
 * v1.9.0: UNIFORM PANEL LAYOUT for all cards - top to bottom: LOGO (.wpop-toplogo native img,
 * filled from Popup Logo, height from Popup Logo Size), TITLE (.wpop-title, from the new
 * "Popup Title" field [data-pd="ptitle"], blank = item Name), DESCRIPTION (.wpop-desc, smaller
 * normal-weight; Popup Body rich text still overrides it), SERVICES stacked one per line
 * (.wpop-services native block: "SERVICES" label + .wpop-services-list; text from the new
 * multiline "Popup Services" field [data-pd="psvc"], fallback to old Services; lines split on
 * newlines, or on , | when single-line), then the CTAs. The old SERVICES/INDUSTRY/LOCATION/
 * YEAR rows are retired (.wpop-rows display:none via Designer style; toggles ignored).
 * v1.8.0: "Popup Body" RichText field ([data-pd="pbody"]) - when filled, its formatted HTML
 * (headings, paragraphs, bold, lists) REPLACES the plain Description text in the popup
 * (.wpop-desc gets .wpop-rich + the rich markup). Blank = plain Description as before.
 * v1.7.1: "Popup Logo Size" field ([data-pd="plogoh"]) sets the title-logo height per card
 * in px (clamped 20-240; blank = the CSS default 56px).
 * v1.7.0: FIXED SLOT GRID - Popup Img slots map to positions: 1-3 = row 1, 4-6 = row 2,
 * 7-9 = row 3, always. A 1-tile (full-width) row uses only its first slot (e.g. row 2 = slot 4;
 * slots 5-6 unused). A 2-tile row uses its first two. Video: "Popup Video URL" = "4: https://..."
 * puts the video in slot 4 (bare URL = slot 1). Declared-but-empty slots render as dark tiles.
 * Also: [data-pd="plogo"] (Popup Logo field) replaces the popup title TEXT with the logo image.
 * v1.6.1: layout parser accepts ANY separator between row sizes - "3x1x3", "3+1+3", "3 1 3"
 * all mean: row of 3, one full-width, row of 3. Every number = one row, top to bottom.
 * v1.6.0: collage is ROW-based per user: each number in "Popup Layout" = tiles in that ROW.
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
    '.wpop-collage .wc-band{flex:1 1 0;display:flex;gap:6px;min-height:0}' +
    '.wpop-collage .wc-col{flex:1;display:flex;flex-direction:column;gap:6px;min-width:0}' +
    '.wpop-collage .wc-tile{flex:1 1 0;position:relative;overflow:hidden;min-height:0}' +
    '.wpop-collage .wc-tile img,.wpop-collage .wc-tile video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}' +
    '.wpop-collage .wc-tile.wc-empty{background:#141b22}' +
    '.wpop.has-collage .wpop-img,.wpop.has-collage .wpop-logo{display:none!important}' +
    '.wpop-toplogo[src*="placeholder"]{display:none!important}' +
    '.wpop-desc.wpop-rich h1,.wpop-desc.wpop-rich h2,.wpop-desc.wpop-rich h3,.wpop-desc.wpop-rich h4,' +
    '.wpop-desc.wpop-rich h5,.wpop-desc.wpop-rich h6{color:#0f0e0e;font-weight:600;line-height:1.25;margin:1.15em 0 .4em}' +
    '.wpop-desc.wpop-rich h1{font-size:1.6em}.wpop-desc.wpop-rich h2{font-size:1.45em}' +
    '.wpop-desc.wpop-rich h3{font-size:1.2em}.wpop-desc.wpop-rich h4{font-size:1.05em}' +
    '.wpop-desc.wpop-rich p{margin:0 0 .85em}' +
    '.wpop-desc.wpop-rich ul,.wpop-desc.wpop-rich ol{margin:0 0 .9em;padding-left:1.25em}' +
    '.wpop-desc.wpop-rich li{margin:.3em 0}' +
    '.wpop-desc.wpop-rich blockquote{border-left:3px solid #39F1E0;margin:.9em 0;padding:.15em 0 .15em .9em}' +
    '.wpop-desc.wpop-rich figure{margin:.9em 0}.wpop-desc.wpop-rich img{max-width:100%;height:auto;display:block}' +
    '.wpop-desc.wpop-rich a{color:inherit;text-decoration:underline}' +
    '.wpop-desc.wpop-rich>:first-child{margin-top:0}.wpop-desc.wpop-rich>:last-child{margin-bottom:0}' +
    '.wpop-desc.wpop-rich p,.wpop-desc.wpop-rich li{font-size:inherit;font-weight:inherit;line-height:inherit;opacity:1}';

  function injectCSS() {
    if (document.getElementById('cyb3r-wpop-style')) return;
    var s = document.createElement('style');
    s.id = 'cyb3r-wpop-style';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }
  injectCSS();

  function T(el) { return el ? (el.textContent || '').replace(/ /g, ' ').trim() : ''; }
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
    var wurl = T(kids[6]); // Website URL

    var mc = pd.querySelector('[data-pd="ct"]');
    var xt = T(pd.querySelector('[data-pd="xt"]'));
    var xu = T(pd.querySelector('[data-pd="xu"]'));

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
      {
        // MASONRY BANDS: layout = band sizes top to bottom ("3x3" default when blank).
        // Each band is a horizontal strip: 1 tile = full-width row (e.g. the video),
        // 2 tiles = 2 columns, 3-4 = 2 columns, 5+ = 3 columns - tiles get seeded random
        // height weights inside the band. Slots run sequentially across bands.
        var segs = (layoutStr || '3 3').split(/[^0-9]+/).map(function (s) { return parseInt(s, 10) || 0; })
          .filter(function (n) { return n > 0; });
        if (!segs.length) segs = [3, 3];
        // Video slot: "4: https://..." puts the video in slot 4; a bare URL means slot 1.
        var vidSlot = 0, vidUrl = '';
        var vsm = pvidUrl.match(/^([1-9])\s*[:|,\s]\s*(https?:\/\/\S+)/i);
        if (vsm) { vidSlot = +vsm[1]; vidUrl = vsm[2]; }
        else if (/^https?:\/\//i.test(pvidUrl)) { vidSlot = 1; vidUrl = pvidUrl; }
        function slotMedia(s) {
          if (vidUrl && s === vidSlot) return { v: vidUrl };
          var pim = pd.querySelector('[data-pd="pm' + s + '"]');
          if (pim) {
            var psrc = pim.getAttribute('src') || '';
            if (psrc && pim.className.indexOf('w-condition-invisible') < 0 && psrc.indexOf('placeholder') < 0) return { i: psrc };
          }
          return null;
        }
        // trim bands to the 9 available slots
        var total = 0, useSegs = [];
        for (var gi = 0; gi < segs.length && total < 9; gi++) {
          var take = Math.min(segs[gi], 9 - total);
          useSegs.push(take);
          total += take;
        }
        if (total > 0) {
          // seeded PRNG (FNV hash of name + layout) - random-looking but stable per card
          var seedStr = (T(kids[0]) || '') + ':' + useSegs.join('x');
          var sh = 2166136261;
          for (var hc = 0; hc < seedStr.length; hc++) { sh ^= seedStr.charCodeAt(hc); sh = Math.imul(sh, 16777619); }
          function rnd() {
            sh = Math.imul(sh ^ (sh >>> 15), 2246822519);
            sh = Math.imul(sh ^ (sh >>> 13), 3266489917);
            return ((sh ^= sh >>> 16) >>> 0) / 4294967296;
          }
          var colWrap = document.createElement('div');
          colWrap.className = 'wpop-collage';
          var anyMedia = false, slotCursor = 0, mBand = 0;
          for (gi = 0; gi < useSegs.length; gi++) {
            var n = useSegs[gi];
            // alternate MASONRY bands mirror direction; full-width rows don't count,
            // so the band below the video flips against the band above it
            var flip = n > 1 && mBand % 2 === 1;
            if (n > 1) mBand++;
            var band = document.createElement('div');
            band.className = 'wc-band';
            var colN = n <= 2 ? n : (n <= 4 ? 2 : 3);
            // band height ~ its row count, with a little seeded variation.
            // Every flexGrow in the collage must be >= 1: flex only fills a fraction of the
            // free space when grow sums come in under 1 (that left the video row letterboxed).
            band.style.flexGrow = (Math.max(1, Math.ceil(n / colN)) * (1 + rnd() * 0.25)).toFixed(3);
            var colEls = [];
            for (var ci = 0; ci < colN; ci++) {
              var ce = document.createElement('div');
              ce.className = 'wc-col';
              // per-band random column WIDTHS so no two bands share the same skeleton
              // (always >= 1 so a lone column still fills the full band width)
              ce.style.flexGrow = (1 + rnd() * 0.7).toFixed(3);
              band.appendChild(ce);
              colEls.push(ce);
            }
            for (var ti = 0; ti < n; ti++) {
              var s = ++slotCursor;
              var tile = document.createElement('div');
              tile.className = 'wc-tile';
              tile.style.flexGrow = (1 + rnd() * 1.3).toFixed(3);
              var itm = slotMedia(s);
              if (itm && itm.v) {
                var vv = document.createElement('video');
                vv.src = itm.v; vv.muted = true; vv.loop = true; vv.autoplay = true;
                vv.playsInline = true; vv.setAttribute('playsinline', '');
                tile.appendChild(vv);
                var vp = vv.play(); if (vp && vp.catch) vp.catch(function () {});
                anyMedia = true;
              } else if (itm) {
                var ig = document.createElement('img');
                ig.src = itm.i; ig.alt = '';
                tile.appendChild(ig);
                anyMedia = true;
              } else {
                tile.className = 'wc-tile wc-empty';
              }
              var colIdx = ti % colN;
              if (flip) colIdx = colN - 1 - colIdx;
              colEls[colIdx].appendChild(tile);
            }
            colWrap.appendChild(band);
          }
          // An EXPLICIT Popup Layout always renders - empty slots show as dark tiles, so
          // the chosen grid is visible even before any images are uploaded. The blank-field
          // 3x3 default still requires real media, so untouched cards keep their single
          // Popup Image / logo fallback.
          if (anyMedia || layoutStr) {
            mediaBox.appendChild(colWrap);
            if (pop) pop.classList.add('has-collage');
          }
        }
      }
    }

    // --- rich body (optional, per card): Popup Body replaces the plain Description ---
    var desc = document.querySelector('.wpop-desc');
    if (desc) {
      var rb = pd.querySelector('[data-pd="pbody"]');
      if (rb && T(rb) && rb.className.indexOf('w-dyn-bind-empty') < 0) {
        desc.innerHTML = rb.innerHTML;
        desc.classList.add('wpop-rich');
      } else {
        desc.classList.remove('wpop-rich');
      }
    }

    // --- title: Popup Title field, else the item Name ---
    var ttl = document.querySelector('.wpop-title');
    if (ttl) ttl.textContent = T(pd.querySelector('[data-pd="ptitle"]')) || T(kids[0]) || 'Project';

    // --- logo on top (Popup Logo; height from Popup Logo Size px, clamped 20-240, blank = 56) ---
    var tl = document.querySelector('.wpop-toplogo');
    if (tl) {
      var lg = pd.querySelector('[data-pd="plogo"]');
      var lsrc = lg ? (lg.getAttribute('src') || '') : '';
      if (lsrc && lg.className.indexOf('w-condition-invisible') < 0 && lsrc.indexOf('placeholder') < 0) {
        var lh = parseInt(T(pd.querySelector('[data-pd="plogoh"]')), 10);
        tl.src = lsrc;
        tl.alt = T(kids[0]) || 'logo';
        tl.style.height = (lh > 0 ? Math.min(Math.max(lh, 20), 240) : 56) + 'px';
        tl.style.display = '';
      } else {
        tl.style.display = 'none';
      }
    }

    // --- industry row: INDUSTRY label left, value right; hidden when Industry is empty ---
    var ind = document.querySelector('.wpop-industry');
    if (ind) {
      var itext = T(kids[2]);
      var iv = ind.querySelector('.wpop-industry-val');
      if (iv) iv.textContent = itext;
      ind.style.display = (itext && iv) ? '' : 'none';
    }

    // --- services, stacked one per line (Popup Services; fallback = old Services split on , |) ---
    var svcBox = document.querySelector('.wpop-services');
    var svcList = document.querySelector('.wpop-services-list');
    if (svcBox && svcList) {
      var stext = T(pd.querySelector('[data-pd="psvc"]')) || services;
      if (stext) {
        var lines = (stext.indexOf('\n') > -1 ? stext.split('\n') : stext.split(/,|\|/))
          .map(function (s) { return s.trim(); }).filter(Boolean);
        svcList.textContent = lines.join('\n');
        svcBox.style.display = '';
      } else {
        svcBox.style.display = 'none';
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
