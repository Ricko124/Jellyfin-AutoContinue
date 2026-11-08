// ==UserScript==
// @name         Jellyfin AutoContinue (experimentell)
// @namespace    https://github.com/Ricko124/Jellyfin-AutoContinue
// @version      0.1.0
// @description  Bestätigt nach Möglichkeit den Jellyfin-Dialog „Schaust du noch?“.
// @match        http://localhost:8096/*
// @grant        none
// ==/UserScript==
(() => {
  'use strict';
  const question = /schaust du noch|siehst du noch zu|are you still watching/i;
  const answer = /^(ja|weiter|fortsetzen|weiter ansehen|weiterschauen|continue|yes|keep watching|i.m still watching)$/i;
  let lastClick = 0;
  function check() {
    if (Date.now() - lastClick < 5000) return;
    const dialogs = [...document.querySelectorAll('[role="dialog"], .dialog, .dialogContainer, .modal, .MuiDialog-root')];
    for (const dialog of dialogs) {
      if (!question.test(dialog.textContent || '')) continue;
      const buttons = [...dialog.querySelectorAll('button, [role="button"]')];
      const button = buttons.find(b => answer.test((b.textContent || b.getAttribute('aria-label') || '').trim()));
      if (button && !button.disabled && button.getClientRects().length) {
        lastClick = Date.now();
        button.click();
        break;
      }
    }
  }
  const observer = new MutationObserver(check);
  observer.observe(document.documentElement, {subtree: true, childList: true});
  setInterval(check, 2000);
})();
