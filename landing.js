/* CYB3R landing page module — Webflow page /landing-page.
 * Injects scoped markup + CSS into #cybLandingMount.
 * Uses Webflow's OWN gsap + ScrollTrigger. A second GSAP copy replaces
 * Webflow's instance and breaks every native reveal site-wide, so neither
 * is bundled here. Only SplitType ships with this file (different global,
 * no collision with Webflow's SplitText). */
(function(){
  if (window.__cybLP) return; window.__cybLP = 1;

  /* resolve landing.css next to this script, whatever commit it is pinned to */
  var me  = document.currentScript && document.currentScript.src;
  var CSS = me ? me.replace(/landing\.js(\?.*)?$/, 'landing.css') : '';

  var SECTIONS = {
  'hero': `<section class="section_hero">
    <div class="hero-text_wrapper">
      <div data-c="hero-div-1" class="text-size-large ix-fade" data-ix="load" data-ix-delay="300">The Alignment Agent for the Open Web</div>
      <h1 data-c="hero-h1-1" class="display-text intro-anim">Make every moment matter</h1>
      <div data-c="hero-div-2" class="text-size-large sub-anim ix-fade" data-ix="load" data-ix-delay="300">Agentic AI that makes real-time, placement-level decisions at scale.</div>
      <div class="margin-medium ix-fade ix-btn" data-ix="load" data-ix-variant="btn" data-ix-delay="2000"><a data-c="hero-a-1" href="#" class="button">Book a Discovery Call</a></div>
    </div>
  </section>`,
  'partners': `<section class="section_partners section-pad">
    <div class="carousel-horizontal">
      <div class="ticker-track" id="tickerTrack">
        <div class="ticker-group">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d4781430b7b79ed778a29_fenwick.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d47815575ed4c8b55a13a_hoka.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d4781bb693fbdfbc48558_bq.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1c1523bd358dea9af45598_estee.svg" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d461d2ca2508ff9f3e65e_ufc.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d461d5140de07b80f9519_network-rail.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d461dc77530f55617c06f_lego.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d91a2644ccb0bf6cd2d0c_volkswagen_02.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d461dbda46ca16cd10f0f_vue.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d461deb044d7d665cdc22_sandals.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d91a2dd14b078c9416258_greene-king_02.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d461ddb3fd286a25fec53_krispy-kreme.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d461f3e500c2560add64d_coors.png" loading="lazy" alt="">
          <img src="https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264/6a1d4629b2152996dca0a9c2_nhs.png" loading="lazy" alt=""><img src="https://cdn.prod.website-files.com/6a293cec4280dd8c699d4d08/6a856e1bc06e240ce9b06f5b_ticker-logo-fxpro-v2.svg" loading="lazy" alt="FxPro logo">
        </div>
      </div>
    </div>
  </section>`,
  'agent': `<section class="section_relevance-agent section-pad">
    <div class="bring-up">
      <div class="padding-global"><div class="container-large">
        <div class="title_wrapper">
          <h2 data-c="relevance-agent-h2-1" class="heading-style-h1 fancy-anim">Alignment Agent</h2>
          <div class="margin-medium"><div data-c="relevance-agent-div-1" class="text-size-large">Uniting creative and media intelligence</div></div>
        </div>
      </div></div>
    </div>
  </section>`,
  'scene': `<div id="cav-relevance-agent">
    <section class="cav_ra">
      <div class="cav_sticky"><div class="cav_canvas">
        <div class="cav_bulb cav_green"></div>
        <div class="cav_bulb cav_pink"></div>
        <div class="cav_bulb cav_merged"></div>
        <div class="cav_particles"></div>
        <div class="cav_sidecopy cav_leftcopy">
          <div data-c="sec4-div-1" class="cav_kicker">Match the brief</div>
          <div data-c="sec4-div-2" class="cav_title">Targeting<br>Context</div>
          <div data-c="sec4-div-3" class="cav_body">Billions of pages analysed</div>
        </div>
        <div class="cav_sidecopy cav_rightcopy">
          <div data-c="sec4-div-4" class="cav_kicker">Align one creative, or millions</div>
          <div data-c="sec4-div-5" class="cav_title">Creative<br>Messaging</div>
          <div data-c="sec4-div-6" class="cav_body">Millions of unique creatives served</div>
        </div>
        <div data-c="sec4-div-7" class="cav_center_text cav_text_1">Measures how closely the message<br>fits the page</div>
        <div data-c="sec4-div-8" class="cav_center_text cav_text_2">Only serve an ad when the<br>message meets the moment</div>
        <div class="cav_percent"><span class="cav_percent_num">50</span>%</div>
        <div class="cav_score">
          <div data-c="sec4-div-9" class="cav_score_label">Alignment Score</div>
          <div class="cav_score_value"><span class="cav_score_num">70</span>%</div>
        </div>
        <div data-c="sec4-div-10" class="cav_scale_text">Delivery at Scale</div>
        <div data-c="sec4-div-11" class="cav_final_text cav_ads_text">Millions of ad variations</div>
        <div data-c="sec4-div-12" class="cav_final_text">Millions of<br>aligned moments</div>
      </div></div>
    </section>
  </div>`,
  'examples': `<section class="section_examples section-pad">
    <div class="bokeh" id="bokeh"></div>
    <div class="padding-global"><div class="container-large">
      <div class="slider ix-fade" data-ix="scroll">
        <div class="slider-viewport" id="sliderViewport"></div>
        <button class="arrow-btn left" id="prevBtn" aria-label="Previous">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none"><path d="M8 1 2 7l6 6M2 7h20" stroke="#fff" stroke-width="1.5"/></svg>
        </button>
        <button class="arrow-btn right" id="nextBtn" aria-label="Next">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none"><path d="M14 1l6 6-6 6M20 7H0" stroke="#fff" stroke-width="1.5"/></svg>
        </button>
      </div>
    </div></div>
  </section>`,
  'results': `<section class="section_proven-results section-pad">
    <div class="padding-global"><div class="container-large">
      <div>
        <div data-c="proven-results-div-1" class="text-size-large" style="margin-bottom:1rem">Proven Results</div>
        <h2 data-c="proven-results-h2-1" class="heading-style-h1 fancy-anim">Relevance = Results</h2>
      </div>
      <div class="stats_wrapper">
        <div class="single-stat">
          <div class="notch"><svg viewBox="0 0 300 230" preserveAspectRatio="none" fill="none">
            <path d="M12 1 H221 L299 79 V218 a11 11 0 0 1 -11 11 H12 A11 11 0 0 1 1 218 V12 A11 11 0 0 1 12 1 Z" stroke="rgba(255,255,255,.55)" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg></div>
          <div data-c="proven-results-div-2" class="text-stat">30%</div>
          <div data-c="proven-results-div-3" class="stat-label">Decrease in CPA</div>
        </div>
        <div class="single-stat">
          <div class="notch"><svg viewBox="0 0 300 230" preserveAspectRatio="none" fill="none">
            <path d="M12 1 H221 L299 79 V218 a11 11 0 0 1 -11 11 H12 A11 11 0 0 1 1 218 V12 A11 11 0 0 1 12 1 Z" stroke="rgba(255,255,255,.55)" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg></div>
          <div data-c="proven-results-div-4" class="text-stat">3x</div>
          <div data-c="proven-results-div-5" class="stat-label">Longer Attention</div>
        </div>
        <div class="single-stat">
          <div class="notch"><svg viewBox="0 0 300 230" preserveAspectRatio="none" fill="none">
            <path d="M12 1 H221 L299 79 V218 a11 11 0 0 1 -11 11 H12 A11 11 0 0 1 1 218 V12 A11 11 0 0 1 12 1 Z" stroke="rgba(255,255,255,.55)" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg></div>
          <div data-c="proven-results-div-6" class="text-stat">21%</div>
          <div data-c="proven-results-div-7" class="stat-label">Uplift in Brand Awareness</div>
        </div>
      </div>
    </div></div>
  </section>`,
  'transparency': `<section class="section_backed-by section-pad">
    <div class="padding-global" style="padding-top:6rem"><div class="container-large">
      <div class="backed-by_wrapper">
        <div class="backed-by_title">
          <h2 data-c="backed-by-h2-1" class="heading-style-h1 fancy-anim">Built on Absolute Transparency</h2>
          <div class="margin-medium"><div data-c="backed-by-div-1" class="text-size-large">We work in the open. We bring a new standard of trust to programmatic display by sharing the exact data other platforms keep hidden.</div></div>
        </div>
        <div class="acc_wrapper" id="accWrapper">
          <div class="acc_single open">
            <div class="acc_label"><div data-c="backed-by-div-2" class="text-size-large">Full-Path URLs</div><span class="plus-icon"></span></div>
            <div class="acc_content"><div data-c="backed-by-div-3" class="text-size-small">No settling for a top-level domain. You get the complete page URL for every placement, so you always know exactly where your ad ran.</div></div>
          </div>
          <div class="acc_single">
            <div class="acc_label"><div data-c="backed-by-div-4" class="text-size-large">Impression-Level Data</div><span class="plus-icon"></span></div>
            <div class="acc_content"><div data-c="backed-by-div-5" class="text-size-small">Follow the numbers that matter. Review impressions, clicks, conversions and spend for every single placement, reported without rounding or hiding.</div></div>
          </div>
          <div class="acc_single">
            <div class="acc_label"><div data-c="backed-by-div-6" class="text-size-large">Creative Variants</div><span class="plus-icon"></span></div>
            <div class="acc_content"><div data-c="backed-by-div-7" class="text-size-small">Total clarity on your messaging. See which creative variant the agent chose for each page, and the context signals that drove that choice.</div></div>
          </div>
        </div>
      </div>
    </div></div>
    <div class="footer-bottom-gradient"></div>
  </section>`,
  'integration': `<section class="section_seamless-integration">
    <div class="padding-global" style="padding-top:8rem"><div class="container-large">
      <div class="title_wrapper">
        <div data-c="seamless-integration-div-1" class="text-size-large" style="margin-bottom:1rem">Proven Results</div>
        <h2 data-c="seamless-integration-h2-1" class="heading-style-h1 fancy-anim">Seamless Enterprise Integration</h2>
        <div class="margin-medium"><div data-c="seamless-integration-div-2" class="text-size-large">One intelligent infrastructure, built for enterprise scale.</div></div>
      </div>
      <div class="big-cards_wrapper">
        <div class="big-card">
          <div class="big-card_01">
            <div data-c="seamless-integration-div-3" class="subtitle">Activation Model</div>
            <h3 data-c="seamless-integration-h3-1" class="heading-style-h2">Managed Execution</h3>
            <div class="margin-medium"><div data-c="seamless-integration-div-4" class="text-size-large">We carry the heavy lifting. Our team runs your campaigns end-to-end, steering programmatic delivery toward the outcomes that matter most to you.</div></div>
          </div>
          <div class="big-card_02">
            <div data-c="seamless-integration-div-5" class="text-stat">01</div>
            <div class="pills_wrapper"><div data-c="seamless-integration-div-6" class="pill-text">End-to-End Partnership</div><div data-c="seamless-integration-div-7" class="pill-text">Zero Manual Setup</div><div data-c="seamless-integration-div-8" class="pill-text">Maximum Returns</div></div>
          </div>
        </div>
        <div class="big-card is-pink">
          <div class="big-card_01">
            <div data-c="seamless-integration-div-9" class="subtitle">Activation Model</div>
            <h3 data-c="seamless-integration-h3-2" class="heading-style-h2">DSP Overlays</h3>
            <div class="margin-medium"><div data-c="seamless-integration-div-10" class="text-size-large">Curate your own environments. Activate the agent as a single targeting line inside the buying platforms your teams already use every day, with no migration.</div></div>
          </div>
          <div class="big-card_02">
            <div data-c="seamless-integration-div-11" class="text-stat">02</div>
            <div class="pills_wrapper"><div data-c="seamless-integration-div-12" class="pill-text">Complete Buying Control</div><div data-c="seamless-integration-div-13" class="pill-text">Direct PMP Access</div><div data-c="seamless-integration-div-14" class="pill-text">Alignment Overlays</div></div>
          </div>
        </div>
        <div class="big-card is-dark-purple">
          <div class="big-card_01">
            <div data-c="seamless-integration-div-15" class="subtitle">Activation Model</div>
            <h3 data-c="seamless-integration-h3-3" class="heading-style-h2">Intelligent Creative</h3>
            <div class="margin-medium"><div data-c="seamless-integration-div-16" class="text-size-large">Let our creative technology respond to live signals and page context in real time. We wrap your existing assets or build bespoke, high-impact variants.</div></div>
          </div>
          <div class="big-card_02">
            <div data-c="seamless-integration-div-17" class="text-stat">03</div>
            <div class="pills_wrapper"><div data-c="seamless-integration-div-18" class="pill-text">Live Data Points</div><div data-c="seamless-integration-div-19" class="pill-text">Existing Asset Wrappers</div><div data-c="seamless-integration-div-20" class="pill-text">Placement-Level Matching</div></div>
          </div>
        </div>
      </div>
    </div></div>
  </section>`,
  'cta': `<section class="section_home-cta">
    <div class="cta-inner">
      <div class="padding-global"><div class="container-large">
        <div class="title_wrapper">
          <h2 data-c="home-cta-h2-1" class="heading-style-h1 fancy-anim">Ready to Own<br>Every Moment?</h2>
          <div class="_50-wrapper"><div class="margin-medium"><div data-c="home-cta-div-1" class="text-size-large">Partner with us to capture true human intent on the open web and drive stronger commercial outcomes.</div></div></div>
          <div class="margin-medium"><a data-c="home-cta-a-1" href="#" class="button is-pink">Book a Discovery Call</a></div>
        </div>
      </div></div>
    </div>
    <div class="footer-bottom-gradient"></div>
    <div class="padding-global"><div class="container-large">
      </div></div>
  </section>`
};

  function inject(){
    if (CSS && !document.getElementById('cyb-lp-css')) {
      var l = document.createElement('link');
      l.id='cyb-lp-css'; l.rel='stylesheet'; l.href=CSS;
      document.head.appendChild(l);
    }
    /* Preferred: one Webflow-native wrapper per section, so section spacing is
       editable in the Designer. Each embed carries <div id="cybLP-<key>">. */
    var n = 0;
    for (var k in SECTIONS){
      var el = document.getElementById('cybLP-' + k);
      if (el && el.getAttribute('data-lp') !== 'done'){
        el.innerHTML = SECTIONS[k];
        el.setAttribute('data-lp','done');
        n++;
      }
    }
    if (n) return true;
    /* Fallback: the original single mount, still supported so the module works
       whichever order the page restructure and the publish land in. */
    var mount = document.getElementById('cybLandingMount');
    if (!mount) return false;
    mount.className = 'cyb-lp';
    var out = '<div class="page-wrapper is-purple" id="pageWrapper">';
    for (var j in SECTIONS) out += SECTIONS[j];
    mount.innerHTML = out + '</div>';
    return true;
  }

  /* ---------- bundled SplitType ---------- */

/**
 * SplitType
 * https://github.com/lukePeavey/SplitType
 * @version 0.3.4
 * @author Luke Peavey <lwpeavey@gmail.com>
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).SplitType=e()}(this,(function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function e(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?r(Object(o),!0).forEach((function(e){n(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=t[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(t,e)||c(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||c(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){if(t){if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e){return Object.getOwnPropertyNames(Object(t)).reduce((function(n,r){var o=Object.getOwnPropertyDescriptor(Object(t),r),i=Object.getOwnPropertyDescriptor(Object(e),r);return Object.defineProperty(n,r,i||o)}),{})}function u(t){return"string"==typeof t}function f(t){return Array.isArray(t)}function p(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=l(e);return void 0!==n.types?t=n.types:void 0!==n.split&&(t=n.split),void 0!==t&&(n.types=(u(t)||f(t)?String(t):"").split(",").map((function(t){return String(t).trim()})).filter((function(t){return/((line)|(word)|(char))/i.test(t)}))),(n.absolute||n.position)&&(n.absolute=n.absolute||/absolute/.test(e.position)),n}function d(t){var e=u(t)||f(t)?String(t):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function h(t){return null!==t&&"object"==typeof t}function y(t){return h(t)&&/^(1|3|11)$/.test(t.nodeType)}function g(t){return f(t)?t:null==t?[]:function(t){return h(t)&&function(t){return"number"==typeof t&&t>-1&&t%1==0}(t.length)}(t)?Array.prototype.slice.call(t):[t]}function v(t){var e=t;return u(t)&&(e=/^(#[a-z]\w+)$/.test(t.trim())?document.getElementById(t.trim().slice(1)):document.querySelectorAll(t)),g(e).reduce((function(t,e){return[].concat(a(t),a(g(e).filter(y)))}),[])}!function(){function t(){for(var t=arguments.length,e=0;e<t;e++){var n=e<0||arguments.length<=e?void 0:arguments[e];1===n.nodeType||11===n.nodeType?this.appendChild(n):this.appendChild(document.createTextNode(String(n)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function n(){for(var t=this.parentNode,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var o=n.length;if(t)for(o||t.removeChild(this);o--;){var i=n[o];"object"!=typeof i?i=this.ownerDocument.createTextNode(i):i.parentNode&&i.parentNode.removeChild(i),o?t.insertBefore(this.previousSibling,i):t.replaceChild(i,this)}}"undefined"!=typeof Element&&(Element.prototype.append||(Element.prototype.append=t,DocumentFragment.prototype.append=t),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=n,DocumentFragment.prototype.replaceWith=n))}();var m=Object.entries,b="_splittype",w={},O=0;function j(t,e,n){if(!h(t))return console.warn("[data.set] owner is not an object"),null;var r=t[b]||(t[b]=++O),i=w[r]||(w[r]={});return void 0===n?e&&Object.getPrototypeOf(e)===Object.prototype&&(w[r]=o(o({},i),e)):void 0!==e&&(i[e]=n),n}function C(t,e){var n=h(t)?t[b]:null,r=n&&w[n]||{};return void 0===e?r:r[e]}function E(t){var e=t&&t[b];e&&(delete t[e],delete w[e])}var S="\\ud800-\\udfff",x="\\u0300-\\u036f\\ufe20-\\ufe23",T="\\u20d0-\\u20f0",W="\\ufe0e\\ufe0f",k="[".concat(S,"]"),A="[".concat(x).concat(T,"]"),P="\\ud83c[\\udffb-\\udfff]",D="(?:".concat(A,"|").concat(P,")"),N="[^".concat(S,"]"),R="(?:\\ud83c[\\udde6-\\uddff]){2}",$="[\\ud800-\\udbff][\\udc00-\\udfff]",B="\\u200d",F="".concat(D,"?"),I="[".concat(W,"]?"),L=I+F+("(?:\\u200d(?:"+[N,R,$].join("|")+")"+I+F+")*"),H="(?:".concat(["".concat(N).concat(A,"?"),A,R,$,k].join("|"),"\n)"),M=RegExp("".concat(P,"(?=").concat(P,")|").concat(H).concat(L),"g"),z=RegExp("[".concat([B,S,x,T,W].join(""),"]"));function V(t){return z.test(t)}function q(t){return V(t)?function(t){return t.match(M)||[]}(t):function(t){return t.split("")}(t)}function U(t){return null==t?"":String(t)}function X(t,e){var n=document.createElement(t);return e?(Object.keys(e).forEach((function(t){var r=e[t],o=u(r)?r.trim():r;null!==o&&""!==o&&("children"===t?n.append.apply(n,a(g(o))):n.setAttribute(t,o))})),n):n}var Y={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function _(t,e){var n,r=d((e=l(Y,e)).types),o=e.tagName,i=t.nodeValue,c=document.createDocumentFragment(),s=[];return/^\s/.test(i)&&c.append(" "),n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return(t?String(t):"").trim().replace(/\s+/g," ").split(e)}(i).reduce((function(t,n,i,l){var f,p;return r.chars&&(p=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return(t=U(t))&&u(t)&&!e&&V(t)?q(t):t.split(e)}(n).map((function(t){var n=X(o,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:t});return j(n,"isChar",!0),s=[].concat(a(s),[n]),n}))),r.words||r.lines?(j(f=X(o,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(r.words&&e.absolute?"position: relative;":""),children:r.chars?p:n}),{isWord:!0,isWordStart:!0,isWordEnd:!0}),c.appendChild(f)):p.forEach((function(t){c.appendChild(t)})),i<l.length-1&&c.append(" "),r.words?t.concat(f):t}),[]),/\s$/.test(i)&&c.append(" "),t.replaceWith(c),{words:n,chars:s}}function G(t,e){var n=t.nodeType,r={words:[],chars:[]};if(!/(1|3|11)/.test(n))return r;if(3===n&&/\S/.test(t.nodeValue))return _(t,e);var o=g(t.childNodes);if(o.length&&(j(t,"isSplit",!0),!C(t).isRoot)){t.style.display="inline-block",t.style.position="relative";var i=t.nextSibling,c=t.previousSibling,s=t.textContent||"",l=i?i.textContent:" ",u=c?c.textContent:" ";j(t,{isWordEnd:/\s$/.test(s)||/^\s/.test(l),isWordStart:/^\s/.test(s)||/\s$/.test(u)})}return o.reduce((function(t,n){var r=G(n,e),o=r.words,i=r.chars;return{words:[].concat(a(t.words),a(o)),chars:[].concat(a(t.chars),a(i))}}),r)}function J(t){C(t).isWord?(E(t),t.replaceWith.apply(t,a(t.childNodes))):g(t.children).forEach((function(t){return J(t)}))}function K(t,e,n){var r,o,a,c=d(e.types),s=e.tagName,l=t.getElementsByTagName("*"),u=[],f=[],p=null,h=[],y=t.parentElement,v=t.nextElementSibling,m=document.createDocumentFragment(),b=window.getComputedStyle(t),w=b.textAlign,O=.2*parseFloat(b.fontSize);return e.absolute&&(a={left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth},o=t.offsetWidth,r=t.offsetHeight,j(t,{cssWidth:t.style.width,cssHeight:t.style.height})),g(l).forEach((function(r){var o=r.parentElement===t,a=function(t,e,n,r){if(!n.absolute)return{top:e?t.offsetTop:null};var o=t.offsetParent,a=i(r,2),c=a[0],s=a[1],l=0,u=0;if(o&&o!==document.body){var f=o.getBoundingClientRect();l=f.x+c,u=f.y+s}var p=t.getBoundingClientRect(),d=p.width,h=p.height,y=p.x;return{width:d,height:h,top:p.y+s-u,left:y+c-l}}(r,o,e,n),s=a.width,l=a.height,d=a.top,h=a.left;/^br$/i.test(r.nodeName)||(c.lines&&o&&((null===p||d-p>=O)&&(p=d,u.push(f=[])),f.push(r)),e.absolute&&j(r,{top:d,left:h,width:s,height:l}))})),y&&y.removeChild(t),c.lines&&(h=u.map((function(t){var n=X(s,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(w,"; width: 100%;")});j(n,"isLine",!0);var r={height:0,top:1e4};return m.appendChild(n),t.forEach((function(t,e,o){var i=C(t),a=i.isWordEnd,c=i.top,s=i.height,l=o[e+1];r.height=Math.max(r.height,s),r.top=Math.min(r.top,c),n.appendChild(t),a&&C(l).isWordStart&&n.append(" ")})),e.absolute&&j(n,{height:r.height,top:r.top}),n})),c.words||J(m),t.replaceChildren(m)),e.absolute&&(t.style.width="".concat(t.style.width||o,"px"),t.style.height="".concat(r,"px"),g(l).forEach((function(t){var e=C(t),n=e.isLine,r=e.top,o=e.left,i=e.width,c=e.height,s=C(t.parentElement),l=!n&&s.isLine;t.style.top="".concat(l?r-s.top:r,"px"),t.style.left="".concat(n?a.left:o-(l?a.left:0),"px"),t.style.height="".concat(c,"px"),t.style.width="".concat(n?a.width:i,"px"),t.style.position="absolute"}))),y&&(v?y.insertBefore(t,v):y.appendChild(t)),h}var Q=l(Y,{});return function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.isSplit=!1,this.settings=l(Q,p(n)),this.elements=v(e),this.split()}return e(t,null,[{key:"clearData",value:function(){Object.keys(w).forEach((function(t){delete w[t]}))}},{key:"setDefaults",value:function(t){return Q=l(Q,p(t)),Y}},{key:"revert",value:function(t){v(t).forEach((function(t){var e=C(t),n=e.isSplit,r=e.html,o=e.cssWidth,i=e.cssHeight;n&&(t.innerHTML=r,t.style.width=o||"",t.style.height=i||"",E(t))}))}},{key:"create",value:function(e,n){return new t(e,n)}},{key:"data",get:function(){return w}},{key:"defaults",get:function(){return Q},set:function(t){Q=l(Q,p(t))}}]),e(t,[{key:"split",value:function(t){var e=this;this.revert(),this.elements.forEach((function(t){j(t,"html",t.innerHTML)})),this.lines=[],this.words=[],this.chars=[];var n=[window.pageXOffset,window.pageYOffset];void 0!==t&&(this.settings=l(this.settings,p(t)));var r=d(this.settings.types);r.none||(this.elements.forEach((function(t){j(t,"isRoot",!0);var n=G(t,e.settings),r=n.words,o=n.chars;e.words=[].concat(a(e.words),a(r)),e.chars=[].concat(a(e.chars),a(o))})),this.elements.forEach((function(t){if(r.lines||e.settings.absolute){var o=K(t,e.settings,n);e.lines=[].concat(a(e.lines),a(o))}})),this.isSplit=!0,window.scrollTo(n[0],n[1]),m(w).forEach((function(t){var e=i(t,2),n=e[0],r=e[1],o=r.isRoot,a=r.isSplit;o&&a||(w[n]=null,delete w[n])})))}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),t.revert(this.elements)}}]),t}()}));



  function run(){

(() => {
  "use strict";

  /* ═══════════════ YOUR MEDIA — drop-in slots (all optional) ═══════════════
     If this is your site, paste your own asset URLs (Webflow export or CDN
     links you control). Leave empty to keep the built-in stand-ins.       */
  const ASSETS = {
    tickerLogos: [],            // override logo image URLs if you move hosting
    slides: [null,null,null,null,null], // override per-slide media: {media:"assets/ad.mp4"}
  };
  function applyAssets(){
    if(ASSETS.tickerLogos.length){ document.querySelectorAll(".ticker-group").forEach(g=>{
      g.innerHTML=ASSETS.tickerLogos.map(u=>`<img src="${u}" style="height:38px;width:auto" alt="">`).join(""); }); }
    ASSETS.slides.forEach((sl,i)=>{ if(!sl||!sl.media) return; const slide=document.querySelectorAll(".slide")[i]; if(!slide) return;
      const box=slide.querySelector(".ads-preview"); const isVid=/\.(mp4|webm)($|\?)/.test(sl.media);
      box.innerHTML=isVid?`<video src="${sl.media}" muted loop autoplay playsinline style="width:100%;height:100%;object-fit:cover"></video>`
                         :`<img src="${sl.media}" style="width:100%;height:100%;object-fit:cover" alt="">`; });
  }

  /* ═══ cursor dot-mask (exact: lerp 0.065) ═══ */
  const wrapper=document.querySelector(".page-wrapper");
  let tx=-500, ty=-500, cx=-500, cy=-500;
  window.addEventListener("mousemove", e=>{ tx=e.clientX; ty=e.clientY; });
  window.addEventListener("mouseleave", ()=>{ tx=-500; ty=-500; });
  /* big-card scrub fade — traced live: opacity ramps 0→1 over ~1.8 viewport-heights per card */
  const bigCards=[...document.querySelectorAll(".big-card")].map(el=>({el, absTop:0}));
  const cardsWrap=document.querySelector(".big-cards_wrapper");

  (function dots(){ cx+=(tx-cx)*0.065; cy+=(ty-cy)*0.065;
    const _wr=wrapper.getBoundingClientRect();
    wrapper.style.setProperty("--mouse-x", (cx-_wr.left)+"px"); wrapper.style.setProperty("--mouse-y", (cy-_wr.top)+"px");
    const vh=innerHeight;
    bigCards.forEach(c=>{ const r=c.el.getBoundingClientRect();
      const p=Math.max(0,Math.min(1,(vh-r.top)/(vh*0.55))); c.el.style.opacity=p.toFixed(3); });
    requestAnimationFrame(dots); })();

  /* ═══ stats reveal (IO -10% / 0.1, stagger 250ms — observed on the
     untransformed wrapper: the rotated cards project outside the margin) ═══ */
  const statsWrap=document.querySelector(".stats_wrapper");
  const stats=document.querySelectorAll(".single-stat");

  /* Counters for the Relevance = Results figures. Scoped to .section_proven-results
     deliberately: .text-stat is also the 01/02/03 card numbers in the integration
     section, which are labels and must not tick. The target is parsed out of the DOM
     rather than hardcoded, so whatever is typed in the Designer stays the source of
     truth - prefix and suffix are preserved ("30%" -> 30 + "%", "3x" -> 3 + "x") and
     anything non-numeric is left exactly as written. */
  const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters=[...document.querySelectorAll(".section_proven-results .text-stat")].map(el=>{
    const m=(el.textContent||"").trim().match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
    if(!m) return null;
    const dp=(m[2].split(".")[1]||"").length;
    /* keep the written integer width so a value like "05%" does not tick up to "5%" */
    const intLen=m[2].split(".")[0].replace("-","").length;
    const c={ el, pre:m[1], to:parseFloat(m[2]), suf:m[3], dp, intLen };
    /* safe to zero now: the card is still opacity:0 until the reveal below */
    if(!reduceMotion) el.textContent=c.pre+(0).toFixed(dp).padStart(intLen+(dp?dp+1:0),"0")+c.suf;
    return c;
  }).filter(Boolean);
  function runCounter(c){
    const paint=v=>{
      const s=Math.abs(v).toFixed(c.dp), dot=s.indexOf(".");
      const ip=dot<0?s:s.slice(0,dot), fp=dot<0?"":s.slice(dot);
      c.el.textContent=c.pre+(v<0?"-":"")+ip.padStart(c.intLen,"0")+fp+c.suf;
    };
    if(reduceMotion){ paint(c.to); return; }
    const DUR=1400; let t0=null;
    const step=ts=>{ if(t0===null) t0=ts;
      const p=Math.min(1,(ts-t0)/DUR);
      paint(c.to*(1-Math.pow(1-p,3)));            /* easeOutCubic */
      if(p<1) requestAnimationFrame(step); else paint(c.to);
    };
    requestAnimationFrame(step);
  }

  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){
      stats.forEach((el,index)=>setTimeout(()=>{
        el.style.opacity=1; el.style.transform="translateY(0) rotateX(0)";
        /* matched by containment, not index, so the two lists cannot drift apart */
        const c=counters.find(x=>el.contains(x.el)); if(c) runCounter(c);
      }, index*250));
      io.disconnect();
    }});
  },{ rootMargin:"0px 0px -10%", threshold:0.1 });
  io.observe(statsWrap);

  /* ═══ accordion (item 1 open; height tween .5s; plus→minus) ═══ */
  document.querySelectorAll(".acc_single").forEach(item=>{
    const content=item.querySelector(".acc_content");
    const setH=open=>{ content.style.height=open ? content.scrollHeight+"px" : "0px"; };
    if(item.classList.contains("open")) requestAnimationFrame(()=>setH(true));
    item.addEventListener("click", ()=>{
      const open=!item.classList.contains("open");
      document.querySelectorAll(".acc_single.open").forEach(o=>{ if(o!==item){ o.classList.remove("open"); o.querySelector(".acc_content").style.height="0px"; } });
      item.classList.toggle("open", open); setH(open);
    });
  });

  /* ═══ IX2-equivalent fades (traced timings from the live site) ═══ */
  document.querySelectorAll('[data-ix="load"]').forEach(el=>{
    const d=parseInt(el.dataset.ixDelay||"0",10);
    window.addEventListener("load",()=>setTimeout(()=>el.classList.add("ix-in"), d), {once:true});
  });
  const ixIO=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("ix-in"); ixIO.unobserve(e.target); } }),{threshold:0.05, rootMargin:"0px 0px 120px 0px"});
  document.querySelectorAll('[data-ix="scroll"]').forEach(el=>{
    if(el.dataset.ixObserve==="parent"){
      const pio=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ el.classList.add("ix-in"); pio.disconnect(); } }),{threshold:0.05});
      pio.observe(el.parentElement);
    } else ixIO.observe(el);
  });

  /* ═══ ticker: duplicate group for seamless -50% loop ═══ */
  const track=document.getElementById("tickerTrack");
  track.appendChild(track.firstElementChild.cloneNode(true));

  /* ═══ bokeh field (examples decoration) ═══ */
  const bokeh=document.getElementById("bokeh");
  const B=[[4,10,90,0],[12,4,44,6],[21,16,26,2],[7,58,120,10],[16,74,60,4],[30,86,34,0],
           [70,6,70,8],[81,18,30,0],[90,10,110,12],[76,52,44,2],[88,68,90,8],[68,84,26,0],[45,90,54,6],[55,4,20,0]];
  B.forEach(([x,y,s,bl])=>{ const i=document.createElement("i");
    i.style.left=x+"%"; i.style.top=y+"%"; i.style.width=s+"px"; i.style.height=s+"px";
    if(bl) i.style.filter="blur("+bl+"px)"; bokeh.appendChild(i); });

  /* ═══ examples slider (out-in 500ms, infinite, manual) ═══ */
  /* Slides are editable in the Editor via the "Landing Page Slides" collection.
     A hidden Collection List (#cybSlideSrc) renders one row per slide; read it here.
     If the list is missing or every row is incomplete we fall back to the built-in
     list below, so the carousel can never end up empty. */
  function readSlidesFromCms(){
    var src = document.getElementById('cybSlideSrc');
    if (!src) return null;
    var rows = [];
    src.querySelectorAll('[data-scat]').forEach(function(catNode){
      var row = catNode.parentElement; if (!row) return;
      function g(sel){ var n = row.querySelector(sel); return n ? (n.textContent || '').trim() : ''; }
      var brand = g('[data-sbrand]'), video = g('[data-svideo]');
      if (!brand || !/^https?:/i.test(video)) return;      /* incomplete row */
      var o = parseFloat(g('[data-sorder]'));
      rows.push({ cat: (catNode.textContent || '').trim(), brand: brand,
                  desc: g('[data-sdesc]'), video: video, _o: isNaN(o) ? 999 : o });
    });
    if (!rows.length) return null;
    rows.sort(function(a, b){ return a._o - b._o; });
    return rows;
  }
  const SLIDES_FALLBACK=[
    { cat:"TRAVEL", brand:"Sandals", desc:"Caribbean luxury, placed in front of travellers ready to book.", video:"https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264%2F6a1cb1db31fed60b9bfd8ef6_Sandals_TRAVEL_Hotels_StLuci_970x250%20%281%29_mp4.mp4" },
    { cat:"AUTO", brand:"Volkswagen", desc:"Taking the new Golf to drivers already researching their next car.", video:"https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264%2F6a1cb05a6251df8cb0c1ef69_Volkswagen_AUTOMOTIVE_Q1_2026_Golf_970x250_mp4.mp4" },
    { cat:"RETAIL", brand:"B&Q", desc:"Meeting home and garden shoppers the moment inspiration strikes.", video:"https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264%2F6a1d1c53b187ffdba169e2b8_B%26Q%20_RETAIL_House%20%26%20Garden_Plants_mp4.mp4" },
    { cat:"ELECTRONICS", brand:"Hisense", desc:"Putting 100-inch TVs beside the blockbusters they were built for.", video:"https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264%2F6a1d1c6a7682ee1bfc2e980c_Hisense_ELECTRONICS_reacher_970x250_mp4.mp4" },
    { cat:"ENTERTAINMENT", brand:"VUE Cinemas", desc:"Filling seats by reaching film fans mid-review.", video:"https://cdn.prod.website-files.com/6a180c5b2a617f73fd65d264%2F6a1d1c73ce7c60654d87af21_VUE%20Cinemas_%20ENTERTAINMENT_HailMary_970x250_mp4.mp4" }
  ];
  const SLIDES = readSlidesFromCms() || SLIDES_FALLBACK;
  const vp=document.getElementById("sliderViewport");
  const NAV_SVG = {
    prev:'<svg width="20" height="13" viewBox="0 0 22 14" fill="none" aria-hidden="true"><path d="M8 1 2 7l6 6M2 7h20" stroke="currentColor" stroke-width="1.5"/></svg>',
    next:'<svg width="20" height="13" viewBox="0 0 22 14" fill="none" aria-hidden="true"><path d="M14 1l6 6-6 6M20 7H0" stroke="currentColor" stroke-width="1.5"/></svg>'
  };
  SLIDES.forEach((s,i)=>{
    const d=document.createElement("div"); d.className="slide"+(i===0?" active":"");
    /* The phone arrows live INSIDE .slider_video, one pair per slide, so they centre
       on the creative with a plain top:50% and stay put if the artwork is ever resized.
       Only the active slide is in the DOM flow, so only its pair is ever visible.
       .slide-brand replaces an inline font-size:3.75rem: that inline value beat every
       stylesheet but left Webflow's fixed line-height:30px in place, so the 60px brand
       name overflowed its own 30px line box and sat right on top of the paragraph. */
    d.innerHTML=`
      <div class="slider_content">
        <div class="slider_video">
          <div class="ads-preview">
            <video src="${s.video}" muted loop autoplay playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>
          </div>
          <button type="button" class="slider-side is-prev" aria-label="Previous example">${NAV_SVG.prev}</button>
          <button type="button" class="slider-side is-next" aria-label="Next example">${NAV_SVG.next}</button>
        </div>
        <div class="slider_text">
          <div class="subtitle">${s.cat}</div>
          <h3 class="heading-style-h2 slide-brand">${s.brand}</h3>
          <p class="slide-desc">${s.desc}</p>
        </div>
      </div>`;
    vp.appendChild(d);
  });
  const slides=[...vp.children]; let cur=0, animating=false;

  /* goTo drives every transition; go() is the relative wrapper. Split out so the
     dots can jump straight to an index - dir is passed explicitly by go() so the
     wrap from the last slide back to the first still animates forwards. */
  function goTo(next, dir){
    if(animating || next===cur || !slides[next]) return; animating=true;
    if(!dir) dir = next > cur ? 1 : -1;
    const out=slides[cur], inn=slides[next];
    // out-in, 500ms total, ease (matches data-animation="outin" data-duration="500")
    out.animate([{opacity:1, transform:"translateX(0)"},{opacity:0, transform:"translateX("+(dir>0?-40:40)+"px)"}],{duration:250, easing:"ease", fill:"forwards"}).onfinish=()=>{
      out.classList.remove("active"); out.style.opacity=""; out.style.transform="";
      inn.classList.add("active");
      inn.animate([{opacity:0, transform:"translateX("+(dir>0?40:-40)+"px)"},{opacity:1, transform:"translateX(0)"}],{duration:250, easing:"ease", fill:"forwards"}).onfinish=()=>{ cur=next; animating=false; paintDots(); };
    };
  }
  function go(dir){ goTo((cur+dir+slides.length)%slides.length, dir); }

  /* Dots only under the slide - the arrows sit on the creative itself (built into
     each slide above). Built here rather than in the section markup because the
     slide count comes from the CMS. */
  const nav=document.createElement("div"); nav.className="slider-nav";
  const dotsWrap=document.createElement("div"); dotsWrap.className="slider-dots";
  const dots=SLIDES.map((s,i)=>{
    const d=document.createElement("button"); d.type="button";
    d.className="slider-dot"+(i===0?" is-on":"");
    d.setAttribute("aria-label","Show "+(s.brand||("slide "+(i+1))));
    d.addEventListener("click",()=>goTo(i));
    dotsWrap.appendChild(d); return d;
  });
  function paintDots(){ dots.forEach((d,i)=>{
    d.classList.toggle("is-on", i===cur);
    d.setAttribute("aria-current", i===cur ? "true" : "false");
  }); }
  paintDots();
  nav.appendChild(dotsWrap);
  vp.parentElement.appendChild(nav);

  /* One pair of arrows per slide, so wire them all. stopPropagation keeps a tap on an
     arrow from also reaching the swipe handler on the viewport. */
  vp.querySelectorAll(".slider-side").forEach(b=>{
    b.addEventListener("click",e=>{ e.preventDefault(); e.stopPropagation();
      go(b.classList.contains("is-next") ? 1 : -1); });
  });

  /* Swipe. pan-y keeps vertical page scrolling with the browser and gives us the
     horizontal axis; the axis test then ignores mostly-vertical drags so a scroll
     that wanders sideways does not flip the slide. Mouse is excluded - the cards
     have a mousemove tilt effect and a drag would fight it. */
  vp.style.touchAction="pan-y";
  let sx=0, sy=0, swiping=false;
  vp.addEventListener("pointerdown",e=>{
    if(e.pointerType==="mouse") return;
    sx=e.clientX; sy=e.clientY; swiping=true;
  },{passive:true});
  vp.addEventListener("pointerup",e=>{
    if(!swiping) return; swiping=false;
    const dx=e.clientX-sx, dy=e.clientY-sy;
    if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)) go(dx<0?1:-1);
  },{passive:true});
  vp.addEventListener("pointercancel",()=>{ swiping=false; },{passive:true});

  document.getElementById("nextBtn").addEventListener("click",()=>go(1));
  document.getElementById("prevBtn").addEventListener("click",()=>go(-1));
  /* card hover tilt — traced on the live site (mouse-move rotate, heavy smoothing, decays after leave) */
  document.querySelectorAll(".slider_video, .showreel_frame").forEach(sv=>{
    const st={rx:0,ry:0,tx:0,ty:0};
    sv.style.transformStyle="preserve-3d";
    sv.addEventListener("mousemove",e=>{ const r=sv.getBoundingClientRect();
      st.ty=((e.clientX-r.left)/r.width-0.5)*3; st.tx=-((e.clientY-r.top)/r.height-0.5)*3; });
    sv.addEventListener("mouseleave",()=>{ st.tx=0; st.ty=0; });
    (function tick(){ st.rx+=(st.tx-st.rx)*0.05; st.ry+=(st.ty-st.ry)*0.05;
      sv.style.transform=`rotateX(${st.rx.toFixed(3)}deg) rotateY(${st.ry.toFixed(3)}deg)`; requestAnimationFrame(tick); })();
  });
  applyAssets();

  /* ═══ GSAP: text reveals (exact three patterns) + cav scene ═══ */
  function startMotion(){
  const gsapLib=window.gsap, ST=window.ScrollTrigger, SplitType=window.SplitType;
  gsapLib.registerPlugin(ST);

  /* .platform_heading is included by hand: that section is native Webflow now and the
     Designer API refuses to attach the shared .fancy-anim class to it (it reports the
     style as not found, same as heading-style-h1), so the selector carries it instead. */
  document.querySelectorAll(".fancy-anim, .platform_heading").forEach(el=>{
    const text=new SplitType(el,{types:"words"});
    gsapLib.from(text.words,{ scrollTrigger:{ trigger:el, start:"top 60%", end:"top 30%", scrub:true }, opacity:0.2, stagger:0.1 });
  });
  document.querySelectorAll(".intro-anim").forEach(el=>{
    const text=new SplitType(el,{types:"words"});
    gsapLib.from(text.words,{ scrollTrigger:{ trigger:el, start:"top 80%", toggleActions:"play none none none" },
      opacity:0, y:40, rotate:5, stagger:0.15, duration:0.8, ease:"power2.out", delay:0.5 });
  });
  document.querySelectorAll(".sub-anim").forEach(el=>{
    const text=new SplitType(el,{types:"words"});
    gsapLib.from(text.words,{ scrollTrigger:{ trigger:el, start:"top 80%", toggleActions:"play none none none" },
      opacity:0, y:40, rotate:5, stagger:0.25, duration:1.5, ease:"power2.out", delay:0.25 });
  });

  /* ─ cav scene: verbatim port of the original logic ─ */
  window.cavRelevanceAgentConfig = window.cavRelevanceAgentConfig || {
    particleCount:240, particleMinSize:18, particleMaxSize:86, scrollSpeed:1, randomSeed:12,
    countStart:50, countMid:60, countEnd:70,
  };
  (function(){
    const root=document.querySelector("#cav-relevance-agent"); if(!root) return;
    function seededRandom(seed){ let value=seed%2147483647; return function(){ value=(value*16807)%2147483647; return (value-1)/2147483646; }; }
    const cfg=window.cavRelevanceAgentConfig, gsap=window.gsap, ScrollTrigger=window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
    if(isIOS){ ScrollTrigger.normalizeScroll(true); }
    ScrollTrigger.config({ ignoreMobileResize:true });
    const q=sel=>root.querySelector(sel);
    const qAll=sel=>gsap.utils.toArray(root.querySelectorAll(sel));
    const isMobile=window.matchMedia("(max-width: 991px)").matches;

    const particlesWrap=q(".cav_particles");
    const rand=seededRandom(cfg.randomSeed||1);
    particlesWrap.innerHTML="";
    /* 240 particles is a desktop budget. On a phone each one is a separately
       composited, permanently will-change'd node that exists for the whole 14,000px
       page, not just while this scene is on screen - together they were the single
       largest source of scroll jank. The reveal stages below slice 28/70/135, so the
       build-up still reads as progressive at this count. */
    const particleCount = isMobile ? 96 : cfg.particleCount;
    for(let i=0;i<particleCount;i++){
      const el=document.createElement("span");
      el.className="cav_particle"+(i===0?" cav_core_particle":"");
      const isCore=i===0; let x,y,z,size,opacity,blur,scale;
      if(isCore){ x="0vw"; y="0vh"; z="180px"; size=Math.round(cfg.particleMaxSize*1.85); opacity=".98"; blur="0px"; scale="1"; }
      else{
        const angle=rand()*Math.PI*2;
        const radius=Math.sqrt(rand())*(isMobile?165:185);
        const avoidCenter=24+rand()*18;
        const r=Math.max(radius,avoidCenter);
        x=(Math.cos(angle)*r).toFixed(2)+"vw";
        y=(Math.sin(angle)*r*0.54).toFixed(2)+"vh";
        z=Math.round(rand()*900-450)+"px";
        size=Math.round(cfg.particleMinSize+rand()*(cfg.particleMaxSize-cfg.particleMinSize));
        opacity=(0.42+rand()*0.5).toFixed(2);
        blur=rand()>0.82?Math.round(rand()*5+2)+"px":"0px";
        scale=(0.72+rand()*0.68).toFixed(2);
      }
      el.dataset.fx=x; el.dataset.fy=y; el.dataset.fz=z; el.dataset.fo=opacity; el.dataset.fs=scale;
      el.style.setProperty("--s",size+"px"); el.style.setProperty("--o",opacity); el.style.setProperty("--b",blur);
      particlesWrap.appendChild(el);
    }
    const particles=qAll(".cav_particle");
    const coreParticle=q(".cav_core_particle");
    const restParticles=particles.filter(p=>!p.classList.contains("cav_core_particle"));
    const adsText=q(".cav_ads_text");
    const finalText=qAll(".cav_final_text").filter(el=>!el.classList.contains("cav_ads_text"))[0];

    gsap.set(particlesWrap,{ opacity:0, scale:5.4, transformOrigin:"50% 50%" });
    gsap.set(particles,{
      opacity:(i,t)=>t.classList.contains("cav_core_particle")?0.98:0,
      scale:(i,t)=>t.dataset.fs, x:(i,t)=>t.dataset.fx, y:(i,t)=>t.dataset.fy, z:(i,t)=>t.dataset.fz,
    });

    const percentObj={ value:cfg.countStart }, scoreObj={ value:cfg.countEnd };
    const percentNum=q(".cav_percent_num"), scoreNum=q(".cav_score_num");

    /* On phones the side captions are restacked to top:11% / bottom:9% (see the
       <=767px block in the stylesheet), which puts the RIGHT caption in the same
       bottom band as .cav_percent. Because .cav_percent is opacity:1 from the
       start, the "50%" sat on top of "Creative Messaging" in the opening frame.
       On phones we therefore hold the readout back until the captions have
       cleared (they fade 0.05 -> 0.60) and start the count then, so it still
       counts up from countStart instead of appearing mid-way. Desktop keeps the
       original timing - it has no overlap, the captions are off to the sides. */
    const cavPhone = window.matchMedia && window.matchMedia("(max-width:767px)").matches;
    const pctAt    = cavPhone ? 0.62 : 0.42;

    const tl=gsap.timeline({ defaults:{ ease:"none" },
      scrollTrigger:{ trigger:root, start:"top top", end:"bottom bottom", scrub:1.1/(cfg.scrollSpeed||1), invalidateOnRefresh:true,
        /* will-change on the particles is gated on this class (see the stylesheet), so
           the compositor only holds those layers while the scene is in view. */
        onToggle:self=>particlesWrap.classList.toggle("is-live", self.isActive) } });

    tl
      .fromTo(".cav_leftcopy",{opacity:1,x:0},{opacity:0,x:-80,duration:.55},0.05)
      .fromTo(".cav_rightcopy",{opacity:1,x:0},{opacity:0,x:80,duration:.55},0.05)
      .to(".cav_green",{scale:.9,duration:.8},0.15)
      .to(".cav_pink",{scale:.9,duration:.8},0.15)
      .fromTo(".cav_text_1",{opacity:0,y:42},{opacity:1,y:0,duration:.35},0.42)
      .to(percentObj,{ value:cfg.countMid, duration:.45, onUpdate:()=>{ percentNum.textContent=Math.round(percentObj.value); } },pctAt)
      .to(".cav_text_1",{opacity:0,y:-38,duration:.35},1.02)
      .to(".cav_green",{scale:.8,duration:.8},1.0)
      .to(".cav_pink",{scale:.8,duration:.8},1.0)
      .fromTo(".cav_text_2",{opacity:0,y:42},{opacity:1,y:0,duration:.35},1.16)
      .to(".cav_text_2",{opacity:0,y:-38,duration:.35},1.75)
      .to(".cav_percent",{opacity:0,scale:.75,duration:.35},1.78)
      .to(".cav_green",{left:"50%",top:"50%",xPercent:-50,yPercent:-50,x:0,y:0,scale:.58,opacity:1,duration:.55},1.84)
      .to(".cav_pink",{right:"auto",left:"50%",top:"50%",xPercent:-50,yPercent:-50,x:0,y:0,scale:.58,opacity:1,duration:.55},1.84)
      .to(".cav_green",{autoAlpha:0,duration:.18},2.38)
      .to(".cav_pink",{autoAlpha:0,duration:.18},2.38)
      .fromTo(".cav_merged",{opacity:0,scale:.58},{opacity:1,scale:.9,duration:.22},2.38)
      .fromTo(".cav_score",{opacity:0,y:26,scale:.9},{opacity:1,y:0,scale:1,duration:.45},2.5)
      .to(scoreObj,{ value:cfg.countEnd, duration:.35, onUpdate:()=>{ scoreNum.textContent=Math.round(scoreObj.value); } },2.5)
      .to(".cav_score",{opacity:0,y:-32,scale:.88,duration:.35},3.02)
      .to(".cav_merged",{scale:.32,duration:.55},3.08)
      .to(".cav_particles",{opacity:1,duration:.12},3.34)
      .to(coreParticle,{opacity:.98,duration:.12},3.34)
      .to(".cav_merged",{autoAlpha:0,duration:.12},3.58)
      .to(restParticles.slice(0,28),{opacity:(i,t)=>t.dataset.fo,stagger:.012,duration:.45},3.5)
      .to(".cav_particles",{scale:3.25,duration:.7},3.55)
      .fromTo(".cav_scale_text",{opacity:0,y:52},{opacity:1,y:0,duration:.38},3.75)
      .to(restParticles.slice(0,70),{opacity:(i,t)=>t.dataset.fo,stagger:.006,duration:.7},3.92)
      .to(".cav_particles",{scale:2.1,duration:.85},4.05)
      .to(".cav_scale_text",{opacity:0,y:-42,duration:.38},4.55)
      .fromTo(adsText,{opacity:0,y:52,scale:.98},{opacity:1,y:0,scale:1,duration:.38},4.62)
      .to(restParticles.slice(0,135),{opacity:(i,t)=>t.dataset.fo,stagger:.004,duration:.75},4.7)
      .to(".cav_particles",{scale:1.18,duration:.9},4.72)
      .to(adsText,{opacity:0,y:-42,duration:.35},5.22)
      .to(restParticles,{opacity:(i,t)=>t.dataset.fo,stagger:.002,duration:.9},5.25)
      .to(".cav_particles",{scale:.72,duration:1.05},5.28)
      .fromTo(finalText,{opacity:0,y:54,scale:.96},{opacity:1,y:0,scale:1,duration:.46},5.7)
      .to(coreParticle,{opacity:.98,duration:.4},5.85);

    /* Phones only: hold the percent readout hidden until the captions have gone.
       fromTo's immediateRender pins it to opacity 0 at t=0 - that opening frame is
       exactly where it used to collide - and it fades in as the count begins.
       Added after the chain on purpose: timeline positions are absolute, so this
       lands at pctAt regardless of insertion order, and the existing fade-out at
       1.78 still reads its start value as 1. */
    if (cavPhone) tl.fromTo(".cav_percent",{opacity:0},{opacity:1,duration:.22},pctAt);

    setTimeout(()=>ScrollTrigger.refresh(),300);
    setTimeout(()=>ScrollTrigger.refresh(),1000);
    setTimeout(()=>ScrollTrigger.refresh(),2000);
  })();

  ST.refresh();
  }
  Promise.all([
    new Promise(r=>{ if(document.readyState==="complete") r(); else window.addEventListener("load",r,{once:true}); }),
    (document.fonts&&document.fonts.ready)?document.fonts.ready:Promise.resolve()
  ]).then(()=>startMotion());
})();

  }


  /* ---- editable copy -------------------------------------------------
   * A hidden Collection List (#cybCopySrc, class .cyb-copy-src) renders one
   * row per "Landing Page Copy" item: a node carrying the key and a node
   * carrying the wording. We match each row's key to a [data-c] node in the
   * injected markup and swap the wording in. Runs BEFORE run() so SplitType
   * and the GSAP timelines split the final text, not the placeholder.
   * A blank Text field keeps the wording baked into this module. */
  function esc(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  // text-wrap:pretty is best-effort - Chrome still leaves a lone last word on some
  // paragraphs. Bind the final two words with a non-breaking space so a one-word
  // last line is impossible. Runs AFTER applyCopy so it acts on the final CMS wording.
  var ORPHAN_SEL = '.text-size-large, .text-size-small, .cav_body, .stat-label';
  function preventOrphans(){
    document.querySelectorAll('.cyb-lp ' + ORPHAN_SEL).forEach(function(el){
      if (el.children.length) return;                 // leave markup-bearing nodes alone
      var s = el.textContent.replace(/\u00A0/g, ' ').trim();
      var w = s.split(/\s+/);
      if (w.length < 4) return;                       // too short to orphan meaningfully
      var tail = w[w.length-2] + ' ' + w[w.length-1];
      if (tail.length > 22) return;                   // binding long words could overflow
      el.textContent = w.slice(0, -2).join(' ') + ' ' + w[w.length-2] + '\u00A0' + w[w.length-1];
    });
  }

  /* ═══ showreel video with sound ═══
     Webflow's Background Video element strips the audio track when it transcodes, so
     the hero is built here from a plain <video> pointed at an untranscoded asset
     (the frame's data-showreel-src). Every browser blocks autoplay WITH sound, so it
     starts muted (which is allowed) and the toggle supplies the user gesture that
     unlocks audio. To change the video, update data-showreel-src on .showreel_frame. */
  /* ═══ hero video (full-bleed, behind the copy) ═══
     Transparent video needs two encodings: HEVC-with-alpha in a .mov for Safari and
     VP9 yuva420p .webm for Chrome/Firefox. Safari picks the mov, everyone else the
     webm; data-hero-src is a plain mp4 fallback with no alpha. Source order matters -
     the mov must come first or Safari takes the webm and loses the alpha.
     Set data-hero-mov / data-hero-webm / data-hero-src on .hero-media. */
  function initHeroVideo(){
    var host = document.querySelector('.hero-media');
    if (!host || host.querySelector('video')) return;
    var mov  = (host.getAttribute('data-hero-mov')  || '').trim();
    var webm = (host.getAttribute('data-hero-webm') || '').trim();
    var mp4  = (host.getAttribute('data-hero-src')  || '').trim();
    if (!mov && !webm && !mp4) return;                 /* nothing set yet */

    var v = document.createElement('video');
    v.className = 'hero-vid';
    v.muted = true; v.setAttribute('muted','');
    v.autoplay = true; v.loop = true; v.playsInline = true;
    v.setAttribute('playsinline',''); v.setAttribute('webkit-playsinline','');
    v.preload = 'auto';
    var poster = (host.getAttribute('data-hero-poster') || '').trim();
    if (poster) v.poster = poster;

    /* Pick ONE file explicitly rather than listing <source>s and trusting the browser.
       With a source list the mov has to come first for Safari, which means any browser
       that merely *claims* it can play a quicktime container takes an HEVC file whose
       alpha lives in an auxiliary layer it may not decode - that renders as garbage
       rather than failing over. Choosing here makes the outcome deterministic. */
    var ua = navigator.userAgent;
    var isSafari = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android/.test(ua);
    var canWebm  = !!v.canPlayType('video/webm; codecs="vp9"');
    var chosen   = (isSafari && mov) ? mov : (canWebm && webm) ? webm : (mp4 || webm || mov);
    v.src = chosen;
    v.setAttribute('data-picked', isSafari ? 'safari-mov' : (canWebm && webm) ? 'vp9-webm' : 'mp4-fallback');

    host.appendChild(v);
    function tryPlay(){ var p = v.play(); if (p && p.catch) p.catch(function(){}); }
    tryPlay();

    /* ── player chrome, anchored to the monitor screen (see .hero-controls) ── */
    var I = {
      play :'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z"/></svg>',
      pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
      off  :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="m23 9-6 6M17 9l6 6"/></svg>',
      on   :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>'
    };
    function el(tag, cls){ var n = document.createElement(tag); if (cls) n.className = cls; return n; }
    function mmss(s){
      if (!isFinite(s) || s < 0) s = 0;
      var m = Math.floor(s / 60), r = Math.floor(s % 60);
      return m + ':' + (r < 10 ? '0' : '') + r;
    }

    var shell = el('div','hero-controls');
    var bar   = el('div','hero-ctrlbar');
    var bPlay = el('button','hero-cbtn is-play');  bPlay.type = 'button';
    var bMute = el('button','hero-cbtn is-sound'); bMute.type = 'button';
    var track = el('div','hero-progress');
    var fill  = el('div','hero-progress_fill');
    var knob  = el('div','hero-progress_knob');
    var time  = el('span','hero-time');
    track.appendChild(fill); track.appendChild(knob);

    function paintPlay(){
      bPlay.innerHTML = v.paused ? I.play : I.pause;
      bPlay.setAttribute('aria-label', v.paused ? 'Play video' : 'Pause video');
    }
    function paintMute(){
      bMute.innerHTML = v.muted ? I.off : I.on;
      bMute.setAttribute('aria-label', v.muted ? 'Turn sound on' : 'Turn sound off');
      bMute.setAttribute('aria-pressed', String(!v.muted));
    }
    function paintTime(){
      var d = v.duration, c = v.currentTime;
      var pct = (isFinite(d) && d > 0) ? (c / d) * 100 : 0;
      fill.style.width = pct + '%';
      knob.style.left  = pct + '%';
      time.textContent = mmss(c) + ' / ' + mmss(d);
      track.setAttribute('aria-valuenow', Math.round(pct));
    }

    bPlay.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      if (v.paused) tryPlay(); else v.pause();
    });
    bMute.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      v.muted = !v.muted;
      if (!v.muted) { v.volume = 1; tryPlay(); }
      paintMute();
    });

    /* click or drag anywhere on the track to seek */
    track.setAttribute('role','slider');
    track.setAttribute('aria-label','Seek video');
    function seekFromEvent(e){
      var r = track.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      var p = Math.min(1, Math.max(0, x / r.width));
      if (isFinite(v.duration)) { v.currentTime = p * v.duration; paintTime(); }
    }
    var dragging = false;
    track.addEventListener('mousedown', function(e){ dragging = true; bar.classList.add('is-held'); seekFromEvent(e); e.preventDefault(); });
    window.addEventListener('mousemove', function(e){ if (dragging) seekFromEvent(e); });
    window.addEventListener('mouseup',   function(){ dragging = false; bar.classList.remove('is-held'); });
    track.addEventListener('touchstart', function(e){ seekFromEvent(e); }, {passive:true});

    v.addEventListener('play',  paintPlay);
    v.addEventListener('pause', paintPlay);
    v.addEventListener('timeupdate', paintTime);
    v.addEventListener('loadedmetadata', paintTime);
    paintPlay(); paintMute(); paintTime();

    bar.appendChild(bPlay); bar.appendChild(track); bar.appendChild(time); bar.appendChild(bMute);
    shell.appendChild(bar);
    host.appendChild(shell);

    /* don't decode a full-bleed video while it is scrolled away */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function(en){
        en.forEach(function(e){
          if (e.isIntersecting) { var r = v.play(); if (r && r.catch) r.catch(function(){}); }
          else v.pause();
        });
      }, { threshold: 0.01 }).observe(host);
    }
  }

  function initShowreel(){
    var frame = document.querySelector('.showreel_frame[data-showreel-src]');
    if (!frame || frame.querySelector('video')) return;
    var src = frame.getAttribute('data-showreel-src');
    var poster = frame.getAttribute('data-showreel-poster') || '';

    var v = document.createElement('video');
    v.className = 'showreel_vid';
    v.src = src; if (poster) v.poster = poster;
    v.muted = true; v.setAttribute('muted','');       /* attribute form matters on iOS */
    v.autoplay = true; v.loop = true; v.playsInline = true;
    v.setAttribute('playsinline',''); v.setAttribute('webkit-playsinline','');
    v.preload = 'metadata';
    frame.appendChild(v);
    function tryPlay(){ var p = v.play(); if (p && p.catch) p.catch(function(){}); }
    tryPlay();

    var I = {
      /* default state is muted, so this crossed speaker is what shows first */
      soundOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="m23 9-6 6M17 9l6 6"/></svg>',
      soundOn :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>',
      pause   :'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
      play    :'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z"/></svg>'
    };

    function mkBtn(cls){
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'showreel_btn ' + cls;
      return b;
    }
    var bar = document.createElement('div');
    bar.className = 'showreel_ctrls';

    /* sound sits to the LEFT of play/pause */
    var sound = mkBtn('is-sound');
    function paintSound(){
      sound.innerHTML = v.muted ? I.soundOff : I.soundOn;
      sound.setAttribute('aria-label', v.muted ? 'Turn sound on' : 'Turn sound off');
      sound.setAttribute('aria-pressed', String(!v.muted));
      sound.title = v.muted ? 'Turn sound on' : 'Turn sound off';
    }
    sound.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      v.muted = !v.muted;
      if (!v.muted) { v.volume = 1; tryPlay(); }
      paintSound();
    });
    paintSound();

    var toggle = mkBtn('is-play');
    function paintPlay(){
      toggle.innerHTML = v.paused ? I.play : I.pause;
      toggle.setAttribute('aria-label', v.paused ? 'Play video' : 'Pause video');
      toggle.title = v.paused ? 'Play' : 'Pause';
    }
    toggle.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      if (v.paused) tryPlay(); else v.pause();
    });
    v.addEventListener('play', paintPlay);
    v.addEventListener('pause', paintPlay);
    paintPlay();

    bar.appendChild(sound);
    bar.appendChild(toggle);
    frame.appendChild(bar);

    /* pause while off-screen so a 55s track never plays to nobody, but never
       fight a deliberate pause by the visitor */
    var userPaused = false;
    toggle.addEventListener('click', function(){ userPaused = !v.paused ? false : true; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting) { if (!userPaused) tryPlay(); }
          else { v.pause(); if (!v.muted) { v.muted = true; paintSound(); } }
        });
      }, { threshold: 0.25 }).observe(frame);
    }
  }

  function applyCopy(){
    var src = document.getElementById('cybCopySrc');
    /* 49 of the 61 copy nodes are real Webflow elements now and are edited directly
       in the Designer, so the overlay MUST NOT touch them - it would silently
       overwrite every Designer edit on load. Only the 12 sec4-* nodes live inside
       the particle-scene HtmlEmbed, where the CMS is the only editing route, so the
       overlay is deliberately restricted to .w-embed descendants. */
    var mount = document.querySelector('.cyb-lp') || document;
    if (!src) return 0;
    var n = 0;
    src.querySelectorAll('[data-ck]').forEach(function(kNode){
      var row = kNode.parentElement; if (!row) return;
      var vNode = row.querySelector('[data-cv]'); if (!vNode) return;
      var key = (kNode.textContent || '').trim();
      var txt = (vNode.textContent || '').replace(/\r/g, '').trim();
      if (!key || !txt) return;                       /* blank = keep original */
      var target = mount.querySelector('.w-embed [data-c="' + key + '"]');
      if (!target) return;
      target.innerHTML = txt.split('\n').map(function(line){
        return esc(line.trim());
      }).join('<br>');
      n++;
    });
    return n;
  }

  function boot(t){
    if (!(window.gsap && window.ScrollTrigger)) {
      return t < 150 ? setTimeout(function(){ boot(t+1); }, 50) : void 0;
    }
    if (!inject()) {
      return t < 150 ? setTimeout(function(){ boot(t+1); }, 50) : void 0;
    }
    try { applyCopy(); } catch(e){ console.warn('[cyb-lp] copy', e); }
    try { preventOrphans(); } catch(e){ console.warn('[cyb-lp] orphans', e); }
    try { initHeroVideo(); } catch(e){ console.warn('[cyb-lp] hero video', e); }
    try { initShowreel(); } catch(e){ console.warn('[cyb-lp] showreel', e); }
    try { gsap.registerPlugin(ScrollTrigger); } catch(e){}
    try { run(); } catch(e){ console.warn('[cyb-lp]', e); }
    if (window.ScrollTrigger) setTimeout(function(){ ScrollTrigger.refresh(); }, 60);
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', function(){ boot(0); });
  else boot(0);
})();

/* ── Discovery Call modal ──────────────────────────────────────────
 * Branching qualifier in front of the NATIVE Webflow form (#cybDiscoveryNative).
 * The real <form> is a page element so Webflow's own JS binds it at load and
 * submissions land in Form Submissions. We only move it into the modal and
 * toggle which fields are on screen - we never rebuild or re-submit it. */
(function(){
  if (window.__cybDiscovery) return; window.__cybDiscovery = 1;

  var SERVICES = 'https://www.cyb3rmedia.com/services';

  /* the id may sit on the <form> or on the .w-form block depending on how
     Webflow rendered it - always work with the .w-form block so the success
     and error messages travel into the modal with the form */
  function findHost(){
    var el = document.getElementById('cybDiscoveryNative');
    if (!el) return null;
    return (el.closest && el.closest('.w-form')) || el;
  }
  (function hideEarly(){
    var h = findHost();
    if (h) h.style.display = 'none';
    else if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', hideEarly);
  })();

  var PLACEHOLDER = {
    cybSpend:   'Current monthly ad spend',
    cybName:    'Full name',
    cybEmail:   'Work email',
    cybWebsite: 'Company website',
    cybBudget:  'Budget for display advertising'
  };

  function build(){
    var host = findHost();
    if (!host || document.getElementById('cybModal')) return;

    var m = document.createElement('div');
    m.id = 'cybModal';
    m.className = 'cyb-modal';
    m.setAttribute('role','dialog');
    m.setAttribute('aria-modal','true');
    m.setAttribute('aria-label','Book a discovery call');
    m.innerHTML =
      '<div class="cyb-modal_backdrop" data-close></div>' +
      '<div class="cyb-modal_panel">' +
        '<button class="cyb-modal_x" data-close aria-label="Close">&times;</button>' +
        '<div class="cyb-modal_body">' +
          '<div class="cyb-step" data-step="q1">' +
            '<div class="cyb-eyebrow">Book a discovery call</div>' +
            '<h3>Are you currently running Google display adverts?</h3>' +
            '<div class="cyb-choices">' +
              '<button class="cyb-btn" data-a="q1-yes">Yes</button>' +
              '<button class="cyb-btn is-ghost" data-a="q1-no">No</button>' +
            '</div>' +
          '</div>' +
          '<div class="cyb-step" data-step="q2" hidden>' +
            '<div class="cyb-eyebrow">Book a discovery call</div>' +
            '<h3>Are you interested in running display adverts?</h3>' +
            '<div class="cyb-choices">' +
              '<button class="cyb-btn" data-a="q2-yes">Yes</button>' +
              '<button class="cyb-btn is-ghost" data-a="q2-no">No</button>' +
            '</div>' +
          '</div>' +
          '<div class="cyb-step" data-step="out" hidden>' +
            '<div class="cyb-eyebrow">Not the right fit</div>' +
            '<h3>This one is built for advertisers</h3>' +
            '<p>Our relevance platform is designed for brands already investing in ' +
            'display media, so it would not be much use to you yet. That said, ' +
            'display is only part of what we do - brand, web, SEO, social and ' +
            'production may be a far better place to start.</p>' +
            '<div class="cyb-choices">' +
              '<a class="cyb-btn" href="' + SERVICES + '">Explore our services</a>' +
              '<button class="cyb-btn is-ghost" data-close>Close</button>' +
            '</div>' +
          '</div>' +
          '<div class="cyb-step" data-step="form" hidden>' +
            '<div class="cyb-eyebrow">Book a discovery call</div>' +
            '<h3 data-formtitle>A few details and we will be in touch</h3>' +
            '<div class="cyb-formhost"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(m);

    /* move the real Webflow form into the modal - the handler is bound to the
       element itself, so relocating the node keeps submission working */
    m.querySelector('.cyb-formhost').appendChild(host);
    var innerForm = host.querySelector('form');
    if (innerForm) innerForm.style.display = 'block';
    host.style.display = 'block';   /* undoes the inline park from hideEarly */

    /* Webflow's auto-generated labels are redundant next to placeholders, and the
       two qualifier fields are answered by the buttons - keep both out of sight
       but in the form so their values still post. */
    m.querySelectorAll('.cyb-formhost label').forEach(function(l){ l.style.display = 'none'; });
    ['cybQ1','cybQ2'].forEach(function(id){
      var f = m.querySelector('#' + id);
      if (f) { f.type = 'hidden'; }
    });
    Object.keys(PLACEHOLDER).forEach(function(id){
      var f = m.querySelector('#' + id);
      if (f) f.setAttribute('placeholder', PLACEHOLDER[id]);
    });
    var submit = m.querySelector('.cyb-formhost input[type=submit]');
    if (submit) submit.value = 'Request my discovery call';

    var spendRow = m.querySelector('#cybSpend');   /* only for existing advertisers */
    spendRow.style.display = 'none';

    function show(name){
      m.querySelectorAll('.cyb-step').forEach(function(s){
        s.hidden = (s.getAttribute('data-step') !== name);
      });
    }
    function open(){
      m.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
      show('q1');
      var f = m.querySelector('#cybQ1'); if (f) f.value = '';
      var g = m.querySelector('#cybQ2'); if (g) g.value = '';
    }
    function close(){
      m.classList.remove('is-open');
      document.documentElement.style.overflow = '';
    }

    m.addEventListener('click', function(e){
      var t = e.target;
      if (t.hasAttribute && t.hasAttribute('data-close')) { e.preventDefault(); return close(); }
      var a = t.getAttribute && t.getAttribute('data-a');
      if (!a) return;
      e.preventDefault();
      if (a === 'q1-yes') {
        m.querySelector('#cybQ1').value = 'Yes';
        spendRow.style.display = '';
        spendRow.setAttribute('required','required');
        m.querySelector('[data-formtitle]').textContent = 'Tell us about your current activity';
        show('form');
      } else if (a === 'q1-no') {
        m.querySelector('#cybQ1').value = 'No';
        show('q2');
      } else if (a === 'q2-yes') {
        m.querySelector('#cybQ2').value = 'Yes';
        spendRow.style.display = 'none';
        spendRow.removeAttribute('required');
        spendRow.value = '';
        m.querySelector('[data-formtitle]').textContent = 'A few details and we will be in touch';
        show('form');
      } else if (a === 'q2-no') {
        m.querySelector('#cybQ2').value = 'No';
        show('out');
      }
    });

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && m.classList.contains('is-open')) close();
    });

    /* every "book a discovery call" CTA on the page opens this */
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a,button');
      if (!a || m.contains(a)) return;
      var txt = (a.textContent || '').trim().toLowerCase();
      if (txt.indexOf('discovery call') === -1) return;
      e.preventDefault();
      open();
    }, true);
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', build);
  else build();
  setTimeout(build, 1200);          /* the CTAs arrive with the injected markup */
})();
