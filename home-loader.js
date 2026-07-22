/* CYB3R homepage sections loader (Selected Work .wk + Design in Motion .dm helix).
 * Loads three.js then the section CSS/JS from thebrandle/cyb3r-services-section@main.
 * Forked from muteebuilds/cyb3r-sections (that repo is not pushable by this account).
 * Sub-resources are pinned to an immutable @<commit> (jsDelivr @main resolution was
 * documented as unreliable/stale up to 12h). To update: push new js/css, bump B to the
 * new commit, re-register this loader (bumped version), re-apply, publish. */
(function () {
  if (!document.querySelector('.wk,.dm')) return;
  var d = document, h = d.head,
      B = 'https://cdn.jsdelivr.net/gh/thebrandle/cyb3r-services-section@a796c3ecc5e3bcb8d3265730cb02661e87327315/';
  var l = d.createElement('link'); l.rel = 'stylesheet'; l.href = B + 'cyb3r-sections.css'; h.appendChild(l);
  function j(u, c) { var s = d.createElement('script'); s.src = u; if (c) s.onload = c; h.appendChild(s); }
  j('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', function () { j(B + 'cyb3r-sections.js'); });
})();
