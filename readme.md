# Freelancermap Watcher
Dieses Open-Source-Tool überprüft im 15-Minuten-Takt automatisch neue **Freelancermap-Projekte** mit einem frei wählbaren **Suchbegriff** (z.B. `angular`, `java`, `python`).
Bei neu gefundenen Projekten wird automatisch eine **Push-Benachrichtigung** über den Dienst **[ntfy.sh](https://ntfy.sh)** verschickt, kostenlos und anonym.

---

## Funktionsweise
- Abfrage der Freelancermap-AJAX-API mit `query`-Parameter 
- Automatischer Aufruf via GitHub Actions alle 15 Minuten
- Push-Nachricht für jedes neue Projekt mit Link zur Detailseite
- Konfigurierbar über Umgebungsvariable `QUERY`

---

## Verwendung (lokal)
```bash
# Beispiel: Angular-Projekte überwachen
QUERY=angular npm start

# Beispiel: Java-Projekte überwachen
QUERY=java npm start
```

---

## Push-Benachrichtigungen erhalten

Dieses Projekt nutzt **[ntfy.sh](https://ntfy.sh)**, einen datenschutzfreundlichen, Open-Source Push-Service.

### So bekommst du die Pushs:

1. Öffne im Browser:  
   `https://ntfy.sh/freelancermap-angular`  
   _(ersetze `angular` durch deinen gewählten Suchbegriff)_
2. Erlaube im Browser die Benachrichtigungen.
3. Du erhältst automatisch eine Push-Nachricht, sobald neue Projekte erscheinen.

Du kannst alternativ auch die **ntfy-App für Android oder iOS** nutzen.

---

## GitHub Actions

Die GitHub Action läuft **alle 15 Minuten** automatisch.  
Zusätzlich kannst du sie manuell mit einem anderen Suchbegriff auslösen:

1. Gehe auf GitHub → **Actions** → `Check Freelancermap Projects`
2. Klicke auf **Run workflow**
3. Gib z.B. `python` oder `angular` als `query` ein

---

## Release-Prozess

Für semantische Versionierung:

```bash
npm run release
git push --follow-tags
```
