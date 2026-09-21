/* CYB3R logo-ticker image deferral. v1.1.0  (site-wide, HEAD)
 *
 * WHY THIS EXISTS AND WHY IT IS IN THE HEAD:
 * The logo marquee sits ~14,400px down an ~18,600px page and every logo already
 * carries loading="lazy" - yet all 74 were still fetched BEFORE the window load
 * event. That matters because Webflow's IX2 engine (the intro splash and the hero
 * entrance animation) initialises on `load`, so anything still downloading keeps the
 * whole page dark. Cause: while the page is loading it is far SHORTER than its final
 * height (hero hidden, sections not yet laid out), so the marquee is briefly close to
 * the viewport and Chrome's lazy-load lookahead grabs the lot.
 *
 * Measured: the logo requests start at ~2550ms, while ticker-eager.js (footer) has not
 * even finished downloading until ~2767ms. A footer script therefore CANNOT prevent the
 * fetch - it can only park images that are already in flight. Hence a head script with a
 * MutationObserver that parks each logo the moment it is parsed, before layout runs.
 *
 * Parked = real URL moved to data-cyb-src, src swapped for a 1x1 gif. The injected CSS
 * rule holds the 115x96 box so the track keeps its width (the images have no width/height
 * attributes; their box comes from CSS). An IntersectionObserver restores everything
 * 800px before the marquee reaches the viewport, so it is always full by the time it is
 * seen, and any reflow happens ~14,000px off-screen where it costs no layout shift.
 * Fail-safes: no IntersectionObserver -> restore at once; observer never fires -> restore
 * after 12s. The marquee can never be left blank.
 */
(function () {
  var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  var SEL = 'img.logo-ticker-img';
  var released = 0, armed = 0;

  try {
    var st = document.createElement('style');
    st.appendChild(document.createTextNode(
      'img.logo-ticker-img[data-cyb-src]{width:115px;height:96px;object-fit:contain}'));
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}

  function parkOne(im) {
    if (released || !im || !im.getAttribute) return;
    var s = im.getAttribute('src');
    if (im.getAttribute('data-cyb-src') || !s || s.indexOf('data:') === 0) return;
    im.setAttribute('data-cyb-src', s);
    var ss = im.getAttribute('srcset');
    if (ss) { im.setAttribute('data-cyb-srcset', ss); im.removeAttribute('srcset'); }
    im.setAttribute('src', BLANK);
  }

  function parkAll() {
    if (released) return;
    var imgs = document.querySelectorAll(SEL);
    for (var i = 0; i < imgs.length; i++) parkOne(imgs[i]);
  }

  function release() {
    released = 1;
    try { mo.disconnect(); } catch (e) {}
    var imgs = document.querySelectorAll(SEL + '[data-cyb-src]');
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i], ss = im.getAttribute('data-cyb-srcset');
      if (ss) { im.setAttribute('srcset', ss); im.removeAttribute('data-cyb-srcset'); }
      /* sizes=140px keeps the browser off an 800px+ srcset variant for a ~115px slot */
      if (im.getAttribute('srcset') && im.getAttribute('sizes') !== '140px') im.setAttribute('sizes', '140px');
      /* EAGER on release is REQUIRED, not an optimisation: the marquee track is several
       * viewports WIDE, so most logos sit horizontally off-screen and loading="lazy"
       * simply refuses them - measured 28/74 filled after 12s on screen, 33/74 after 25s.
       * Forcing eager here is the original cyb3rTickerEager behaviour, just moved from
       * page-load time to near-view time, which is the whole point of this script. */
      im.setAttribute('loading', 'eager');
      im.loading = 'eager';
      im.setAttribute('src', im.getAttribute('data-cyb-src'));
      im.removeAttribute('data-cyb-src');
    }
  }

  var mo = new MutationObserver(function (recs) {
    if (released) { try { mo.disconnect(); } catch (e) {} return; }
    for (var i = 0; i < recs.length; i++) {
      var a = recs[i].addedNodes;
      for (var j = 0; j < a.length; j++) {
        var n = a[j];
        if (!n || n.nodeType !== 1) continue;
        if (n.matches && n.matches(SEL)) parkOne(n);
        else if (n.querySelectorAll) {
          var inner = n.querySelectorAll(SEL);
          for (var k = 0; k < inner.length; k++) parkOne(inner[k]);
        }
      }
    }
  });
  try { mo.observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}

  function arm() {
    parkAll();
    var t = document.querySelector('.logo-ticker-track');
    if (!t) return 0;
    if (!('IntersectionObserver' in window)) { release(); return 1; }
    new IntersectionObserver(function (es, o) {
      for (var i = 0; i < es.length; i++) {
        if (es[i].isIntersecting) { o.disconnect(); release(); return; }
      }
    }, { rootMargin: '800px 0px' }).observe(t);
    return 1;
  }

  document.addEventListener('DOMContentLoaded', function () { if (!armed) armed = arm(); });
  addEventListener('load', function () {
    if (!armed) armed = arm();
    setTimeout(function () { if (!released && !armed) release(); }, 12000);
  });
})();
