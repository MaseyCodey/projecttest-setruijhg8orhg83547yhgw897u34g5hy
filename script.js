/* Navigation, donation links, and accessible site controls. No dependencies. */
(() => {
  'use strict';

  const config = window.LOLA_SITE_CONFIG || {};
  const menuButton = document.querySelector('#menu-button');
  const navigation = document.querySelector('#site-navigation');
  const mobile = window.matchMedia('(max-width: 980px)');

  function setMenu(open, restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
    if (restoreFocus) menuButton.focus();
  }
  menuButton.hidden = false;
  document.documentElement.classList.add('js');
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) setMenu(false);
  });
  mobile.addEventListener('change', () => setMenu(false));

  function stripeUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      // Payment Links supplied by the foundation must use Stripe's standard host.
      if (url.protocol !== 'https:' || url.hostname !== 'buy.stripe.com' || url.username || url.password || url.pathname === '/') return null;
      return url;
    } catch (_) {
      return null;
    }
  }

  const donationConfig = config.donations || {};
  const oneTimeUrl = stripeUrl(donationConfig.oneTimeUrl);
  const monthlyLinks = Array.isArray(donationConfig.monthlyLinks)
    ? donationConfig.monthlyLinks.map(item => ({ label: typeof item?.label === 'string' ? item.label.trim() : '', url: stripeUrl(item?.url) })).filter(item => item.label && item.url)
    : [];
  const donationPanel = document.querySelector('#donation-controls');
  const unavailable = document.querySelector('#donation-unavailable');
  const frequencyChoices = document.querySelector('#frequency-choices');
  const oneTimeChoices = document.querySelector('#one-time-choices');
  const monthlyChoices = document.querySelector('#monthly-choices');
  const checkout = document.querySelector('#donation-checkout');
  const selectionStatus = document.querySelector('#donation-selection-status');

  if (oneTimeUrl || monthlyLinks.length) {
    unavailable.hidden = true;
    donationPanel.hidden = false;
    frequencyChoices.hidden = !(oneTimeUrl && monthlyLinks.length);

    monthlyLinks.forEach((item, index) => {
      const label = document.createElement('label');
      label.className = 'amount-choice';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'monthly-amount';
      radio.value = String(index);
      radio.checked = index === 0;
      const text = document.createElement('span');
      text.textContent = item.label;
      label.append(radio, text);
      document.querySelector('#monthly-options').append(label);
    });

    if (!oneTimeUrl) document.querySelector('#frequency-monthly').checked = true;

    function updateDonation() {
      const monthly = document.querySelector('input[name="frequency"]:checked').value === 'monthly';
      oneTimeChoices.hidden = monthly;
      monthlyChoices.hidden = !monthly;
      let destination;
      if (monthly) {
        const index = Number(document.querySelector('input[name="monthly-amount"]:checked')?.value || 0);
        destination = new URL(monthlyLinks[index].url.href);
        destination.searchParams.delete('prefilled_amount');
        selectionStatus.textContent = `Monthly gift: ${monthlyLinks[index].label}. Review the recurring payment details on Stripe before confirming.`;
      } else {
        const amount = document.querySelector('input[name="gift-amount"]:checked').value;
        destination = new URL(oneTimeUrl.href);
        if (amount === 'other') destination.searchParams.delete('prefilled_amount');
        else destination.searchParams.set('prefilled_amount', amount);
        selectionStatus.textContent = amount === 'other'
          ? 'Choose your one-time gift amount on Stripe.'
          : `One-time gift: $${Number(amount) / 100} USD. You can adjust your amount on Stripe.`;
      }
      checkout.href = destination.href;
      document.querySelector('#checkout-note').textContent = monthly
        ? 'A recurring monthly gift. Review and confirm securely on Stripe.'
        : 'A one-time gift in USD. Review and confirm securely on Stripe.';
    }
    donationPanel.addEventListener('change', updateDonation);
    updateDonation();
  }

  const email = typeof config.contactEmail === 'string' ? config.contactEmail.trim() : '';
  if (/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) && !/[?&#]/.test(email)) {
    const link = document.querySelector('#contact-email');
    link.href = `mailto:${email}`;
    link.querySelector('span').textContent = email;
    link.hidden = false;
  }

  document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
})();
