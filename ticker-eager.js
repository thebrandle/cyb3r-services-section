/* CYB3R logo ticker: eager-load + constant flow helper. v1.1.0
 *
 * The ticker logos are CMS images that Webflow renders with loading="lazy", so the marquee
 * could scroll into view half-empty while logos trickled in ("starts from an empty state").
 * This flips every ticker image to eager the moment scripts run (and re-runs to catch the
 * clone list built by cyb3rTickerLoop), so the strip is fully populated before it is seen.
 * The mid-flow start itself comes from the site-head CSS (animation-delay:-50s on the track).
 * Site-wide: the ticker exists on Home, Work and About.
 *
 * v1.1.0: also corrects sizes. Webflow stamps sizes="100vw" on these responsive images, so
 * browsers downloaded 800px+ variants for a ~115px slot. sizes="140px" makes srcset pick the
 * small variant (~8-16KB instead of ~100-200KB). Logos without srcset are unaffected - those
 * old full-size PNG uploads can only be slimmed by re-uploading smaller assets in the CMS.
 */
(function () {
  function eager() {
    var imgs = document.querySelectorAll('.logo-ticker-track img');
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].getAttribute('loading') !== 'eager') {
        imgs[i].setAttribute('loading', 'eager');
        imgs[i].loading = 'eager';
      }
      if (imgs[i].getAttribute('srcset') && imgs[i].getAttribute('sizes') !== '140px') {
        imgs[i].setAttribute('sizes', '140px');
      }
    }
  }
  eager();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', eager);
  setTimeout(eager, 600);
  setTimeout(eager, 1600);
  setTimeout(eager, 3200);

  /* Background-video autoplay kick (v1.1.0, site-wide): iOS Low Power Mode blocks even
   * muted autoplay, leaving hero background videos paused on their poster with a system
   * play glyph (the glyph is hidden by site-head CSS). Retrying .play() inside the first
   * real user gesture is allowed even in Low Power Mode, so the video starts on first touch. */
  function kick() {
    var vs = document.querySelectorAll('.hero-image video, .w-background-video video');
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i];
      if (v.paused && (v.hasAttribute('autoplay') || v.autoplay)) {
        v.muted = true;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      }
    }
  }
  addEventListener('touchstart', kick, { once: true, passive: true });
  addEventListener('click', kick, { once: true });
})();
