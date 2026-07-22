/* ============================================================================
   CYB3R Media — Services scroll section (stacked, pinned panels)
   Self-contained: injects its own scoped CSS + markup right after the hero on
   the Services page, hides the old "Work in Motion" (.dm) section it replaces,
   builds 6 service panels (video left, copy right) and runs the pinned-stack
   scroll. Dark theme, sharp corners. Ported from the trionn-style section.
   Load once on the Services page (registered hosted script, footer).
   ========================================================================== */
(function () {
  "use strict";
  if (window.__cybSvcSection) return; window.__cybSvcSection = 1;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ===== CONTENT: CYB3R's 6 services + Cloudinary videos (edit freely) ===== */
  var V = "https://res.cloudinary.com/dq0likrb8/video/upload/c_fill,ar_812:568,q_auto,w_800/";
  var PLUS = "https://cdn.prod.website-files.com/6a293cec4280dd8c699d4d08/6a44c6196a38f1b057c124e8_svglogoplus.png"; /* CYB3R teal plus icon */
  var services = [
    { title: "Brand & Identity", caption: "Identity systems built to travel across every touchpoint.",
      desc: "Positioning, naming and visual identity that give your brand credibility, clarity and lasting recognition.",
      caps: ["Brand strategy & positioning", "Visual identity systems", "Logo & wordmark design", "Brand guidelines", "Creative direction", "Messaging & tone of voice"],
      video: V + "v1783637909/branding01_exa3fq.mp4" },
    { title: "Web Design & Development", caption: "Designed to perform on every screen.",
      desc: "High-fidelity websites and web apps designed to attract, engage and convert, built for speed and scale.",
      caps: ["Web design (UX/UI)", "Webflow & headless builds", "Responsive, motion-first interfaces", "Landing pages & funnels", "CMS & integrations", "Performance & SEO foundations"],
      video: V + "v1784713152/webdesign_lvcpfw.mp4" },
    { title: "SEO & Google Ads", caption: "Engineered to scale measurable growth.",
      desc: "Organic search and paid media built to put you in front of high-intent buyers and grow qualified pipeline.",
      caps: ["Technical & on-page SEO", "Content & link strategy", "Google Ads (Search, PMax)", "Paid media management", "Conversion tracking", "Reporting & optimisation"],
      video: V + "v1784713150/seonew_o32y58.mp4" },
    { title: "Social Media & Content", caption: "Content that compounds attention into demand.",
      desc: "Social-first content and community that build audience, authority and a steady stream of inbound interest.",
      caps: ["Social strategy", "Content production", "Short-form video", "Community management", "Paid social", "Influencer & partnerships"],
      video: V + "v1783637914/social_kdyleo.mp4" },
    { title: "Commercial Print & Production", caption: "Tactile brand experiences, produced end to end.",
      desc: "Print, packaging and physical collateral produced to the same standard as everything you do online.",
      caps: ["Print & packaging design", "Merchandise", "Large-format & signage", "Event & retail collateral", "Artwork & pre-press", "Production management"],
      video: V + "v1783637911/merch_sqjwqw.mp4" },
    { title: "AI-Driven Advertising", caption: "Smarter campaigns, powered by automation.",
      desc: "AI-assisted creative, targeting and optimisation that make every ad dollar work harder across the funnel.",
      caps: ["AI creative & iteration", "Audience modelling", "Automated bidding & budgets", "Predictive optimisation", "Full-funnel measurement", "Continuous experimentation"],
      video: V + "v1783637914/ai_ads_hojtor.mp4" }
  ];

  /* ===== scoped CSS (dark, sharp corners; all under .cyb-svc) ===== */
  var CSS =
  ".cyb-svc{--ink:#EDEDEF;--ink-2:#A7ACB4;--ink-dim:#727782;--line:rgba(255,255,255,.12);--line-2:rgba(255,255,255,.24);--accent:#39F1E0;--bg:#1A232D;--mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace}" +
  ".cyb-svc *{box-sizing:border-box}" +
  ".cyb-svc .svc-pin{position:relative;height:800vh;background:var(--bg)}" +
  ".cyb-svc .svc-stage{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--bg)}" +
  ".cyb-svc .panel{position:absolute;inset:0;display:flex;will-change:transform;background:var(--bg)}" +
  ".cyb-svc .pinner{position:absolute;inset:0;display:flex}" +
  ".cyb-svc .col-left{width:50%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;padding:5vh 3vw;background:#202A36}" +
  ".cyb-svc .panel.blk-dark .col-left{background:#39F1E0}" +
  ".cyb-svc .panel.blk-dark .p-caption{color:#0d1116}" +
  ".cyb-svc .p-caption{font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);text-align:center;max-width:32ch;line-height:1.5}" +
  ".cyb-svc .p-caption .w{display:inline-block;white-space:pre;will-change:filter,opacity}" +
  ".cyb-svc .v-card{position:relative;width:min(88%,660px);aspect-ratio:3/2;overflow:hidden;border-radius:0;background:#000;border:1px solid var(--line)}" +
  ".cyb-svc .v-card video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:0;display:block}" +
  ".cyb-svc .v-card .v-tag{position:absolute;left:0;right:0;bottom:0;padding:16px;font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:linear-gradient(180deg,transparent,rgba(0,0,0,.74));display:flex;justify-content:space-between;align-items:flex-end;gap:10px}" +
  ".cyb-svc .v-card .v-tag b{color:var(--accent);font-weight:600}" +
  ".cyb-svc .divider{position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--line);z-index:5}" +
  ".cyb-svc .divider .x{position:absolute;left:50%;width:15px;height:15px;transform:translateX(-50%);object-fit:contain}" +
  ".cyb-svc .divider .x.t{top:9vh}.cyb-svc .divider .x.b{bottom:9vh}" +
  ".cyb-svc .col-right{width:50%;height:100%;display:flex;flex-direction:column;justify-content:center;padding:8vh 5vw 8vh 4vw;background:var(--bg);color:var(--ink)}" +
  ".cyb-svc .col-right h2{font-weight:500;letter-spacing:-.02em;font-size:clamp(1.6rem,2.6vw,2.3rem);margin:0 0 18px;color:#fff}" +
  ".cyb-svc .col-right .s-desc{color:var(--ink-2);font-size:1rem;line-height:1.55;max-width:46ch;margin:0 0 40px}" +
  ".cyb-svc .col-right .s-label{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-dim);margin-bottom:6px}" +
  ".cyb-svc .cap-row{position:relative;padding:16px 0}" +
  ".cyb-svc .cap-row .cap-line{position:absolute;left:0;top:0;height:1px;width:100%;background:var(--line);transform:scaleX(0);transform-origin:left}" +
  ".cyb-svc .cap-row .cap-txt{font-size:1.04rem;letter-spacing:-.01em;color:var(--ink)}" +
  "@media(max-width:860px){.cyb-svc .svc-pin{height:auto}.cyb-svc .svc-stage{position:static;height:auto;overflow:visible}.cyb-svc .panel{position:relative;inset:auto;flex-direction:column;transform:none!important}.cyb-svc .pinner{position:relative;inset:auto;flex-direction:column;transform:none!important}.cyb-svc .col-left,.cyb-svc .col-right{width:100%}.cyb-svc .divider{display:none}.cyb-svc .col-left{padding:40px 24px}.cyb-svc .col-right{padding:10px 24px 48px}.cyb-svc .cap-row .cap-line{transform:scaleX(1)!important}}" +
  "@media (prefers-reduced-motion:reduce){.cyb-svc .cap-row .cap-line{transform:scaleX(1)!important}.cyb-svc .p-caption .w{opacity:1!important;filter:none!important}}" +
  ".dm{display:none!important}"; /* replaces the old Work in Motion section */

  function boot() {
    if (document.querySelector(".cyb-svc")) return;
    var mc = document.querySelector(".main-content"); if (!mc) return;
    var st = document.createElement("style"); st.id = "cyb-svc-css"; st.textContent = CSS; document.head.appendChild(st);
    var hero = mc.querySelector(".hero.for-inner");
    var wrap = document.createElement("div"); wrap.className = "cyb-svc";
    wrap.innerHTML = '<div class="svc-pin" id="svcPin"><div class="svc-stage" id="svcStage"></div></div>';
    if (hero) hero.insertAdjacentElement("afterend", wrap); else mc.insertBefore(wrap, mc.firstChild);
    build();
  }

  function build() {
    var N = services.length;
    var stage = document.getElementById("svcStage");
    var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); };
    var panels = services.map(function (s, i) {
      var p = document.createElement("div");
      p.className = "panel blk-" + (i % 2 ? "dark" : "light"); p.style.zIndex = String(10 + i);
      p.innerHTML =
        '<div class="pinner">' +
          '<div class="col-left">' +
            '<div class="p-caption" data-cap>' + esc(s.caption) + '</div>' +
            '<div class="v-card"><video muted loop playsinline preload="metadata" src="' + s.video + '"></video>' +
              '<div class="v-tag"><span>' + esc(s.title) + '</span><b>0' + (i + 1) + ' / 0' + N + '</b></div></div>' +
          '</div>' +
          '<div class="divider"><img class="x t" src="' + PLUS + '" alt=""><img class="x b" src="' + PLUS + '" alt=""></div>' +
          '<div class="col-right">' +
            '<h2>' + esc(s.title) + '</h2>' +
            '<p class="s-desc">' + esc(s.desc) + '</p>' +
            '<div class="s-label">Our core capabilities</div>' +
            s.caps.map(function (c) { return '<div class="cap-row"><span class="cap-line"></span><span class="cap-txt">' + esc(c) + '</span></div>'; }).join("") +
          '</div>' +
        '</div>';
      stage.appendChild(p);
      return { el: p, vid: p.querySelector("video"), capEl: p.querySelector("[data-cap]"),
        capWords: null, lines: [].slice.call(p.querySelectorAll(".cap-line")), revealed: false };
    });

    panels.forEach(function (pn) {
      var el = pn.capEl, text = el.textContent; el.textContent = "";
      pn.capWords = text.split(" ").map(function (w, i, arr) {
        var s = document.createElement("span"); s.className = "w"; s.textContent = w + (i < arr.length - 1 ? " " : ""); el.appendChild(s); return s;
      });
    });

    function reveal(pn) {
      if (pn.vid) { try { var pr = pn.vid.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {} }
      pn.capWords.forEach(function (w, i) {
        w.style.opacity = "0"; w.style.filter = "blur(10px)";
        w.animate([{ opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)" }], { duration: 600, delay: i * 60, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" });
      });
      pn.lines.forEach(function (ln, i) {
        ln.style.transform = "scaleX(0)";
        ln.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 900, delay: i * 80, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" });
      });
    }
    function hide(pn) {
      if (pn.vid) { try { pn.vid.pause(); } catch (e) {} }
      pn.capWords.forEach(function (w) { w.getAnimations().forEach(function (a) { a.cancel(); }); w.style.opacity = "0"; w.style.filter = "blur(10px)"; });
      pn.lines.forEach(function (ln) { ln.getAnimations().forEach(function (a) { a.cancel(); }); ln.style.transform = "scaleX(0)"; });
    }

    panels.forEach(function (pn, i) { pn.el.style.transform = "translateY(" + (i === 0 ? 0 : 100) + "%)"; if (i > 0) hide(pn); });
    panels[0].revealed = true;
    if (!reduce) requestAnimationFrame(function () { reveal(panels[0]); }); else panels.forEach(reveal);

    var pin = document.getElementById("svcPin");
    var progress = 0, _last = performance.now();
    function targetProgress() { var r = pin.getBoundingClientRect(); var total = pin.offsetHeight - innerHeight; return clamp(-r.top / total, 0, 1); }
    var SEG = N - 1;
    function render() {
      progress = reduce ? targetProgress() : progress + (targetProgress() - progress) * (1 - Math.pow(0.0016, Math.min(0.05, (performance.now() - _last) / 1000)));
      _last = performance.now();
      panels.forEach(function (pn, i) {
        if (i === 0) { pn.el.style.transform = "translateY(0%)"; return; }
        var segStart = (i - 1) / SEG, span = 1 / SEG;
        var raw = clamp((progress - segStart) / span, 0, 1);
        var slide = clamp(raw / 0.7, 0, 1);
        pn.el.style.transform = "translateY(" + ((1 - slide) * 100) + "%)";
        if (slide > 0.25 && !pn.revealed) { pn.revealed = true; reveal(pn); }
        if (slide < 0.05 && pn.revealed) { pn.revealed = false; hide(pn); }
      });
      requestAnimationFrame(render);
    }
    render();
  }

  if (document.readyState !== "loading") boot(); else document.addEventListener("DOMContentLoaded", boot);
})();
