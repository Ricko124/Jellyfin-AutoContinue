# Jellyfin AutoContinue – Webclient-Testversion

Dieses experimentelle JavaScript versucht, im Jellyfin-Webplayer den sichtbaren Dialog „Schaust du noch?“ / „Are you still watching?“ automatisch mit einem passenden Weiter-Button zu bestätigen.

## Installation

1. Installiere das Jellyfin JavaScript Injector Plugin von n00bcodr über dessen Repository. Die Repository-URL ist `https://raw.githubusercontent.com/n00bcodr/jellyfin-plugins/main/manifest.json`.
2. Starte Jellyfin nach der Plugin-Installation neu.
3. Öffne die Konfiguration des JavaScript Injectors, lege ein neues normales Script an und füge den Inhalt von `autocontinue.js` ein.
4. Speichern und die Jellyfin-Weboberfläche neu laden (Strg+F5).
5. Teste mit einer Serie. Browser-Konsole: `[AutoContinue] Web client helper loaded.`

## Grenzen

- Kein eigenständiges DLL-Plugin und **keine** Jellyfin-Repository-Manifestdatei.
- Betrifft nur Webclients, in denen der Injector das Script tatsächlich lädt; nicht alle Smart-TV- oder Fire-TV-Apps.
- Die Schaltflächenbezeichnungen und die Dialogstruktur können sich zwischen Versionen unterscheiden. Es gibt keine Garantie, dass das Script in Jellyfin 12.4 funktioniert.
- Bei mehreren Sprachen muss gegebenenfalls der reguläre Ausdruck `affirmative` angepasst werden.
- Bestätigt nur sichtbare Dialoge, die eine bekannte Fortsetzen-Schaltfläche besitzen; umgeht keine serverseitige Wiedergabebegrenzung.
