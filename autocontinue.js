/* Jellyfin AutoContinue - experimental web client helper.
 * Paste into Jellyfin JavaScript Injector (as regular script).
 * Only clicks a visible 'still watching' continuation button.
 */
(() => {
  'use strict';
  if (window.__jellyfinAutoContinueInstalled) return;
  window.__jellyfinAutoContinueInstalled = true;

  const question = /(?:schaust\s+du\s+noch|siehst\s+du\s+noch\s+zu|are\s+you\s+still\s+watching|still\s+watching)/i;
  const affirmative = /^(?:weiter|weiterschauen|weiter ansehen|weiter abspielen|fortsetzen|ja|ich schaue noch|continue|keep watching|yes|still watching|continue watching)$/i;
  const visible = el => !!(el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
  let lastClick = 0;

  function check() {
    if (Date.now() - lastClick < 15000) return;
    const dialogs = document.querySelectorAll('[role="dialog"], [aria-modal="true"], .dialog, .dialogContainer, .MuiDialog-root');
    for (const dialog of dialogs) {
      if (!visible(dialog) || !question.test(dialog.textContent || '')) continue;
      const buttons = dialog.querySelectorAll('button, [role="button"]');
      for (const button of buttons) {
        if (!visible(button) || button.disabled) continue;
        const label = (button.textContent || button.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
        if (affirmative.test(label)) {
          lastClick = Date.now();
          button.click();
          console.info('[AutoContinue] Still-watching dialog confirmed.');
          return;
        }
      }
    }
  }
  const observer = new MutationObserver(check);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  setInterval(check, 2500);
  check();
  console.info('[AutoContinue] Web client helper loaded.');
})();
