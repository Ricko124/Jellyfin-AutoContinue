# Jellyfin AutoContinue – Projektvorlage

Dieses Repository enthält eine experimentelle Browser-JavaScript-Lösung für die Meldung „Schaust du noch?“.

**Wichtig:** Dies ist **kein installierbares Jellyfin-Plugin** und keine gültige Jellyfin-Plugin-Repository-Manifestdatei. Eine serverseitige Plugin-Integration erfordert eine zur konkreten Jellyfin-Server-API passende Implementierung und Tests.

## Nutzung im Browser

Das Script `autocontinue.user.js` kann in einem Userscript-Manager wie Tampermonkey verwendet werden. Es arbeitet ausschließlich im jeweiligen Browser und versucht, Dialoge mit dem Text „Schaust du noch?“ automatisch zu bestätigen.

Vor der Verwendung muss die `@match`-Zeile an die eigene Jellyfin-URL angepasst werden. Das Script ist experimentell und kann je nach Sprache und Dialoggestaltung nicht funktionieren.

## Sicherheit

Das Script klickt nur bei sichtbaren Dialogen mit einem passenden Text auf einen Fortsetzen-Button. Es sollte vor produktiver Verwendung getestet werden.
