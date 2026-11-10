/*
 * NexaData GH — front-end interactions
 * This script handles the demo order form and mobile navigation only.
 * It does NOT collect payments or send data orders to a supplier.
 */
(function () {
  'use strict';

  function initNexaData() {
    const networkSelect = document.getElementById('network');
    const bundleSelect = document.getElementById('bundle');
    const phoneInput = document.getElementById('phone');
    const summary = document.getElementById('selectionSummary');
    const message = document.getElementById('formMessage');
    const status = document.getElementById('summaryStatus');
    const form = document.getElementById('bundleForm');
    const networkCards = document.querySelectorAll('.network-card');
    const year = document.getElementById('year');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (year) {
      year.textContent = String(new Date().getFullYear());
    }

    function setMessage(text, type) {
      if (!message) return;
      message.textContent = text;
      message.style.color = type === 'error'
        ? 'var(--danger, #ff9292)'
        : type === 'success'
          ? 'var(--mint, #74f0c2)'
          : 'var(--muted, #a8b9ce)';
    }

    function updateSummary() {
      if (!networkSelect || !bundleSelect || !summary) return;

      const network = networkSelect.value;
      const bundle = bundleSelect.value;
      summary.textContent = network && bundle
        ? network + ' · ' + bundle
        : 'No bundle selected';

      networkCards.forEach(function (card) {
        const selected = card.dataset.network === network && Boolean(network);
        card.classList.toggle('active', selected);
        card.setAttribute('aria-pressed', String(selected));
      });

      if (status && status.textContent !== 'Details checked') {
        status.textContent = network && bundle ? 'Selection updated' : 'Not submitted';
      }
    }

    networkCards.forEach(function (card) {
      card.addEventListener('click', function () {
        if (!networkSelect) return;
        networkSelect.value = card.dataset.network || '';
        updateSummary();

        const buySection = document.getElementById('buy');
        if (buySection) {
          buySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    if (networkSelect) networkSelect.addEventListener('change', updateSummary);
    if (bundleSelect) bundleSelect.addEventListener('change', updateSummary);

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        const network = networkSelect ? networkSelect.value : '';
        const rawPhone = phoneInput ? phoneInput.value.trim() : '';
        const phone = rawPhone.replace(/[\s()-]/g, '');
        const bundle = bundleSelect ? bundleSelect.value : '';
        const ghanaPhonePattern = /^(?:0\d{9}|\+233\d{9}|233\d{9})$/;

        if (!network || !rawPhone || !bundle) {
          if (status) status.textContent = 'Incomplete';
          setMessage('Please select a network, enter a phone number and choose a data bundle.', 'error');
          return;
        }

        if (!ghanaPhonePattern.test(phone)) {
          if (status) status.textContent = 'Check number';
          setMessage('Enter a valid Ghana phone number, such as 0241234567 or +233241234567.', 'error');
          if (phoneInput) phoneInput.focus();
          return;
        }

        if (summary) {
          summary.textContent = network + ' · ' + bundle + ' · ' + phone;
        }
        if (status) status.textContent = 'Details checked';
        setMessage(
          'Your selection is ready. This is a demo only: payment and automatic data delivery are not connected yet.',
          'success'
        );
      });
    }

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        menuToggle.textContent = isOpen ? '✕' : '☰';
      });

      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open navigation');
          menuToggle.textContent = '☰';
        });
      });
    }

    updateSummary();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNexaData, { once: true });
  } else {
    initNexaData();
  }
})();
