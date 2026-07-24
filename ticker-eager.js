/* CYB3R logo ticker: eager-load + constant flow helper. v1.0.0
 *
 * The ticker logos are CMS images that Webflow renders with loading="lazy", so the marquee
 * could scroll into view half-empty while logos trickled in ("starts from an empty state").
 * This flips every ticker image to eager the moment scripts run (and re-runs to catch the
 * clone list built by cyb3rTickerLoop), so the strip is fully populated before it is seen.
 * The mid-flow start itself comes from the site-head CSS (animation-delay:-50s on the track).
 * Site-wide: the ticker exists on Home, Work and About.
 */
(function () {
  function eager() {
    var imgs = document.querySelectorAll('.logo-ticker-track img');
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].getAttribute('loading') !== 'eager') {
        imgs[i].setAttribute('loading', 'eager');
        imgs[i].loading = 'eager';
      }
    }
  }
  eager();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', eager);
  setTimeout(eager, 600);
  setTimeout(eager, 1600);
  setTimeout(eager, 3200);
})();
