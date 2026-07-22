/* CYB3R Work popup: per-item row toggles + editable CTA (Latest Work collection).
 * Reads hidden markers inside each card's .pop-data (bound to CMS fields):
 *   [data-pd="si"|"sl"|"sy"] -> conditional-visibility markers for the Industry / Location / Year rows
 *                               (Webflow tags them w-condition-invisible when the switch is OFF)
 *   [data-pd="ct"]           -> Button Text value (textContent) + conditional visibility for the CTA button
 * A row is shown only when its switch is ON *and* the field has a value, so blank rows stop
 * rendering the "-" placeholder. The teal "Get in touch" button (.wpop-cta, added by the Work
 * page head code) gets its label from Button Text and hides when Show CTA Button is OFF.
 * Runs after the base popup fill (deferred via setTimeout) so it just overrides visibility + label.
 */
(function () {
  if ((location.pathname || '').replace(/\/+$/, '') !== '/work') return;

  function T(el) { return el ? (el.textContent || '').replace(/ /g, ' ').trim() : ''; }
  // A marker means "shown" unless Webflow flagged it hidden. A missing marker (feature not yet
  // published for this card) defaults to shown, so nothing disappears unexpectedly.
  function vis(el) { return !el || !el.classList.contains('w-condition-invisible'); }

  function apply(card) {
    var pd = card.querySelector('.pop-data');
    if (!pd) return;
    var kids = pd.children;
    var services = T(kids[1]);
    var industry = T(kids[2]);
    var location = T(kids[3]);
    var year = T(kids[4]);

    var mi = pd.querySelector('[data-pd="si"]');
    var ml = pd.querySelector('[data-pd="sl"]');
    var my = pd.querySelector('[data-pd="sy"]');
    var mc = pd.querySelector('[data-pd="ct"]');

    var rows = document.querySelectorAll('.wpop-rows .wpop-row'); // order: Services, Industry, Location, Year
    function row(i, show) { if (rows[i]) rows[i].style.display = show ? '' : 'none'; }
    row(0, !!services);
    row(1, vis(mi) && !!industry);
    row(2, vis(ml) && !!location);
    row(3, vis(my) && !!year);

    var cta = document.querySelector('.wpop-cta');
    if (cta) {
      cta.textContent = (T(mc) || 'Get in touch') + ' →';
      cta.style.display = vis(mc) ? '' : 'none';
    }
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.wpop') || e.target.closest('.wpop-x')) return;
    var card = e.target.closest('.logo-content');
    if (!card) return;
    // Defer so the site's base popup fill (same click) sets the row text first.
    setTimeout(function () { apply(card); }, 0);
    setTimeout(function () { apply(card); }, 80);
  }, false);
})();
