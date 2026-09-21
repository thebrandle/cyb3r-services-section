/* CYB3R homepage intro splash - show it DURING the load, not after it. v1.0.0
 *
 * Webflow's IX2 engine initialises on the window LOAD event, and only then sets
 * .intro to display:flex. Measured: w-mod-ix3 lands at loadEventEnd to the
 * millisecond. So the branded splash used to run AFTER everything had downloaded,
 * and the visitor stared at a bare dark background for 6-9s first.
 *
 * This injects the splash styling from the <head>, before the body is parsed, so
 * the splash paints at FIRST PAINT and its Vision/Design/Build/Impact flip runs on
 * CSS keyframes (IX2 is not available yet). The moment IX2 is ready - i.e. window
 * load, i.e. the hero video and images are done - html.w-mod-ix3 fades the splash
 * out and the homepage is revealed underneath, hero entrance animation intact.
 *
 * SPECIFICITY NOTE: Webflow's own pre-IX2 rule is
 *   html.w-mod-js:not(.w-mod-ix3) :is( ...44 selectors... ) {visibility:hidden!important}
 * and its heaviest :is() argument is .top-text.loader.animated._01 (4 classes), so
 * the rule computes to (0,6,1). The .intro.intro.intro repetition below is what
 * carries these overrides past it. Do not "tidy" it away.
 */
(function () {
  var css = "html.w-mod-js:not(.w-mod-ix3) body .intro.intro.intro{display:flex!important}\nhtml.w-mod-js:not(.w-mod-ix3) body .intro.intro.intro :is(.logo-loader-overflow,.logo-load,.loader-text-overflow,.top-text){visibility:visible!important}\nhtml.w-mod-js:not(.w-mod-ix3) body .intro.intro.intro .top-text.loader.scale{opacity:0;animation:cybIntroLogo .45s ease .05s forwards}\nhtml.w-mod-js:not(.w-mod-ix3) body .intro.intro.intro .loader-text-overflow .top-text{opacity:0;animation:cybIntroWord 4s cubic-bezier(.22,1,.36,1) infinite}\nhtml.w-mod-js:not(.w-mod-ix3) body .intro.intro.intro .loader-text-overflow ._01{animation-delay:.15s}\nhtml.w-mod-js:not(.w-mod-ix3) body .intro.intro.intro .loader-text-overflow ._02{animation-delay:1.15s}\nhtml.w-mod-js:not(.w-mod-ix3) body .intro.intro.intro .loader-text-overflow ._03{animation-delay:2.15s}\nhtml.w-mod-js:not(.w-mod-ix3) body .intro.intro.intro .loader-text-overflow ._04{animation-delay:3.15s}\n@keyframes cybIntroLogo{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}\n@keyframes cybIntroWord{0%{opacity:0;transform:translateY(105%)}7%{opacity:1;transform:translateY(0)}22%{opacity:1;transform:translateY(0)}29%{opacity:0;transform:translateY(-105%)}100%{opacity:0;transform:translateY(-105%)}}\nbody .intro{transition:opacity .45s ease}\nhtml.w-mod-ix3 body .intro.intro.intro{opacity:0!important;visibility:hidden!important;pointer-events:none!important}";
  try {
    var s = document.createElement('style');
    s.setAttribute('data-cyb3r', 'intro');
    s.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}
})();
