/* Jellyfin AutoContinue — experimental web-client helper.
 * Only confirms a visible "still watching" prompt. Does not bypass native-app dialogs.
 * Install via a trusted script injection mechanism; NOT a Jellyfin server plugin by itself.
 */
(() => {
  'use strict';
  if (window.__jellyfinAutoContinueLoaded) return;
  window.__jellyfinAutoContinueLoaded = true;
  const PROMPT = /(?:schaust\s+du\s+noch|siehst\s+du\s+noch\s+zu|are\s+you\s+still\s+watching|still\s+watching)/i;
  const CONTINUE = /^(?:ja|weiter|weiterschauen|weiter\s*ansehen|fortsetzen|continue|keep\s*watching|yes|resume)(?:[\s.!?]*)$/i;
  let lastClick = 0;
  function check() {
    if (Date.now() - lastClick < 5000) return;
    const dialogs = document.querySelectorAll('[role="dialog"], [aria-modal="true"], .dialog, .dialogContainer, .modal');
    for (const dialog of dialogs) {
      if (!(dialog instanceof HTMLElement) || !dialog.getClientRects().length) continue;
      const text = (dialog.innerText || '').slice(0, 2000);
      if (!PROMPT.test(text)) continue;
      const buttons = dialog.querySelectorAll('button, [role="button"]');
      for (const button of buttons) {
        if (!(button instanceof HTMLElement) || !button.getClientRects().length) continue;
        const label = (button.innerText || button.getAttribute('aria-label') || '').trim();
        if (!CONTINUE.test(label)) continue;
        lastClick = Date.now();
        button.click();
        console.info('[AutoContinue] Confirmed visible still-watching prompt');
        return;
      }
    }
  }
  let pending = false;
  const observer = new MutationObserver(() => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; check(); });
  });
  observer.observe(document.documentElement, {childList:true, subtree:true, characterData:true});
  check();
})();
