# Jellyfin AutoContinue — experimenteller Webplayer-Prototyp

Dieses Projekt enthält ein JavaScript, das **sichtbare** „Schaust du noch?“-Dialoge im Jellyfin-Webplayer erkennt und einen passenden „Weiter“-Button betätigt.

## Status

**Noch kein installierbares Jellyfin-Plugin.** Eine `.dll`, Plugin-Repository-`manifest.json` und die serverseitige JavaScript-Einbindung fehlen. Die bisherige GitHub-Repository-URL darf **nicht** in Jellyfins Plugin-Repositories eingetragen werden.

## Unterstützte Geräte

- PC-Browser: JavaScript kann bei korrekter Einbindung funktionieren (nicht mit Jellyfin 12.4 getestet).
- Webview-basierte Apps: eventuell, sofern sie die vom Server ausgelieferte Weboberfläche verwenden.
- Native Fire-TV-/Android-TV-/Smart-TV-Apps: **nicht garantiert**; ein Web-Script kann deren native Dialoge nicht kontrollieren.

## Verwendung / Test

Für einen ersten Test im PC-Browser das Script mit einem vertrauenswürdigen Userscript-Manager oder einer bereits vorhandenen Script-Einbindung laden. Der Code ist absichtlich **kein** `@match`-Userscript; die Datei muss von einer Einbindung ausgeführt werden. Keine produktive Installation ohne Test.

## Fehlersuche

Prüfe zuerst in jedem Client die Einstellung „Schaust du noch?“ bzw. Autoplay. Bei Jellyfin 12 kann die Einstellung client-/profilabhängig sein. Deaktiviere keine anderen Plugins ohne Diagnose.

## Datenschutz und Verhalten

Das Script sendet keine Daten nach außen. Es klickt ausschließlich bei sichtbaren Dialogen, deren Text eine bekannte „Schaust du noch?“-Formulierung enthält, und nur auf eindeutig beschriftete Fortsetzen-Buttons. Bei anderen Texten oder abweichender Oberfläche passiert nichts.

## Nächster Entwicklungsschritt

Eine serverseitige Plugin-Implementierung für die tatsächlich eingesetzte Jellyfin-API entwickeln, kompilieren, auf einer Testinstallation prüfen und erst dann ein gültiges Jellyfin-Plugin-Repository veröffentlichen. Native Clients benötigen möglicherweise separate Lösungen.
