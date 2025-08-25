```markdown
# Detaillierter Implementierungsplan – PDF-Upload für Admins

## Übersicht
Ziel: Als Admin soll über die Navigationsleiste (oben rechts) die Möglichkeit bestehen, PDF-Dokumente in einem Lernunterlagensystem hochzuladen, damit alle Benutzer diese Dokumente später herunterladen können. Dabei wird eine moderne, klare Benutzeroberfläche realisiert, die Fehlerbehandlung, Authentifizierung und best practices berücksichtigt.

## Abhängige Dateien und Übersicht der Änderungen
- **src/components/Navigation.tsx**  
  – Erweiterung der Navigationsleiste, um einen zusätzlichen Button (z. B. "Lernunterlagen") für Admins anzuzeigen.  
- **src/contexts/AuthContext.tsx & src/lib/types.ts**  
  – Bereits vorhandene Admin-Rollen (role: "admin") verwenden, um die Navigation und den Zugriff einzuschränken.  
- **Neues API-Endpunkt**:  
  – **src/app/api/upload/route.ts**: API-Endpoint für Datei-Uploads, der PDF-Dateien validiert und (simuliert) speichert.  
- **Neues Dokumentenverwaltung-Modul**:  
  – **src/lib/documents.ts**: Helferfunktionen zum Verwalten der hochgeladenen Dokumente (getDocuments, addDocument), z. B. unter Verwendung von localStorage als Simulation.  
- **Neues Admin-Upload-Interface**:  
  – **src/components/AdminPDFUpload.tsx**: Komponenten-UI für den Datei-Upload, Anzeige von Fehlermeldungen, Erfolgsmeldungen und Liste der vorhandenen PDF-Dokumente.  
- **Neue Admin-Seite**:  
  – **src/app/admin/documents/page.tsx**: Eine dedizierte Seite, die das AdminPDFUpload-Interface rendert. Nur für Admins zugänglich; nicht autorisierte Benutzer erhalten eine entsprechende Meldung.
- **Dokumentation und Benutzerhandbuch** (z. B. BENUTZERHANDBUCH.md, DEPLOYMENT.md)  
  – Abschnitt ergänzen, der den neuen PDF-Upload erklärt.

## Schritt-für-Schritt Änderungen

### 1. Anpassung der Navigation
- **Datei:** `src/components/Navigation.tsx`
- **Änderungen:**
  - Importiere `useAuth` aus dem AuthContext.
  - Prüfe innerhalb der Komponente, ob der aktuell angemeldete Benutzer die Rolle `admin` hat.
  - Füge rechts in der Navigation (neben den bestehenden Buttons) einen zusätzlichen Button hinzu:
    - Button-Label: "Lernunterlagen"
    - Bei Klick wird der Admin zur neuen Admin-Seite geleitet (z. B. mittels Next.js `Link`-Komponente zu `/admin/documents`).
- **UI/UX:** Der Button soll im gleichen modernen Stil wie die anderen Navigationsbuttons gestaltet werden. Verwende klare Farben, Hover-Effekte und ausreichende Abstände.

### 2. Neues Admin-Dokumente Upload-Interface
- **Datei:** `src/components/AdminPDFUpload.tsx`
- **Funktionalität:**
  - Rendern eines Formulars mit:
    - Einem Dateieingabefeld (accept="application/pdf") mit Label "Wählen Sie eine PDF-Datei aus".
    - Einem Button "Datei hochladen".
    - Anzeige eines Ladeindikators während des Upload-Prozesses.
    - Darstellung von Fehlermeldungen (z. B. falls falscher Dateityp ausgewählt wird oder der Upload fehlschlägt).
    - Eine Liste unten, in der alle bisher hochgeladenen PDF-Dokumente in einem cardartigen Layout angezeigt werden.
      - Jede Karte zeigt den Dateinamen und einen Download-Link, der in einem neuen Tab öffnet.
  - **Validierung:** Vor dem Upload wird geprüft, ob eine Datei ausgewählt wurde und ob der MIME-Type exakt "application/pdf" ist.
- **UI/UX:** Moderne, klare Layouts mit gut lesbarer Typografie, ausreichend Padding und responsivem Design (Tailwind CSS-Klassen). Keine Icons – ausschließlich Text und CSS-Stile.

### 3. Neuen API-Endpunkt für den Datei-Upload erstellen
- **Datei:** `src/app/api/upload/route.ts`
- **Funktionalität:**
  - Unterstütze POST-Anfragen, die FormData enthalten.
  - Validierung: Stelle sicher, dass die hochgeladene Datei vom Typ PDF ist.
  - Speichere (simuliert) die Datei in einem „uploads“-Verzeichnis im `public`-Ordner (oder speichere den Dateinamen in localStorage über das Dokumentenmodul).
  - Rückgabe der URL der hochgeladenen Datei im JSON-Format (z. B. `{ "url": "/uploads/dateiname.pdf" }`).
  - Fehlerbehandlung: Bei ungültigen Dateitypen oder Serverfehlern wird ein entsprechender HTTP-Fehlercode und Nachricht zurückgegeben.
- **Best Practices:** Nutze try-catch-Blöcke zur Fehlerbehandlung und gib aussagekräftige Fehler zurück.

### 4. Dokumentenverwaltung implementieren
- **Datei:** `src/lib/documents.ts`
- **Funktionalität:**
  - Exportiere Methoden wie:
    - `getDocuments()`: Ruft die Liste der hochgeladenen PDFs aus localStorage (als Simulation) ab.
    - `addDocument(document: { fileName: string, url: string })`: Speichert die neue Dokumenteninfo in localStorage.
  - Diese Methoden werden von der AdminPDFUpload-Komponente verwendet, um die Dokumentenliste zu aktualisieren und darzustellen.
- **Error Handling:** Fange Parsing-Fehler ab und gib eine leere Liste zurück, falls keine Dokumente gefunden werden.

### 5. Neue Admin-Seite erstellen
- **Datei:** `src/app/admin/documents/page.tsx`
- **Funktionalität:**
  - Rendering des `AdminPDFUpload`-Komponenten.
  - Authentifizierung: Prüfe, ob der aktuelle Benutzer im AuthContext die Rolle `admin` besitzt.
    - Falls nicht, zeige eine "Nicht autorisiert" Meldung und ggf. einen Link zurück zum Dashboard.
- **Routing:** Diese Seite ist unter `/admin/documents` erreichbar.

### 6. Testen und Integration
- Aktualisiere Testfälle und führe manuelle Tests durch:
  - Login als Admin (User "luca", Passwort "Cassy321").
  - Überprüfe, ob der zusätzliche "Lernunterlagen"-Button in der Navigationsleiste angezeigt wird.
  - Navigiere zur Admin-Seite und versuche PDF-Dateien hochzuladen.
  - Bestätige, dass die Filme in der Liste erscheinen und dass der Download-Link funktioniert.
  - Teste Fehlerfälle: Datei nicht ausgewählt, falscher Dateityp, etc.
- Update Dokumentation (README, BENUTZERHANDBUCH) um die neuen Features zu beschreiben.

## Zusammenfassung
- Admins erhalten über die Navigation einen neuen Button "Lernunterlagen", der nur für Benutzer mit Rolle "admin" sichtbar ist.
- Die neue Komponente `AdminPDFUpload.tsx` bietet ein modernes Formular zum Upload von PDF-Dateien, inklusive Validierung und Fehlerbehandlung.
- Ein API-Endpunkt (`src/app/api/upload/route.ts`) wird erstellt, um PDF-Dateien zu empfangen, zu validieren und (simuliert) zu speichern.
- Ein Dokumentenverwaltungstool (`src/lib/documents.ts`) speichert und verwaltet die Liste der hochgeladenen PDFs über localStorage.
- Eine neue Admin-Seite (`/admin/documents`) integriert das Upload-Interface und prüft die Admin-Berechtigung.
- Alle Änderungen werden unter Berücksichtigung moderner UI/UX-Prinzipien, responsivem Design und robuster Fehlerbehandlung implementiert.
