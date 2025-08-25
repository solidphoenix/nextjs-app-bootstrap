# Deployment-Anleitung - Pflegeschule Lernportal

## Übersicht
Diese Anleitung beschreibt die Schritte zur Bereitstellung des Pflegeschule Lernportals in verschiedenen Umgebungen.

## Voraussetzungen
- Node.js 18+ installiert
- npm, yarn, pnpm oder bun als Package Manager
- Git für Versionskontrolle

## Lokale Entwicklung

### Installation
```bash
# Repository klonen
git clone <repository-url>
cd pflegeschule-lernportal

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter `http://localhost:8000` erreichbar.

## Production Build

### Build erstellen
```bash
# Production Build erstellen
npm run build

# Build lokal testen
npm start
```

### Build-Optimierungen
- Automatische Code-Splitting
- Image-Optimierung durch Next.js
- CSS-Minifizierung
- JavaScript-Bundling mit Turbopack

## Deployment-Optionen

### 1. Vercel (Empfohlen)
```bash
# Vercel CLI installieren
npm i -g vercel

# Deployment
vercel

# Production Deployment
vercel --prod
```

**Vorteile:**
- Automatische SSL-Zertifikate
- CDN-Integration
- Serverless Functions
- Automatische Deployments bei Git-Push

### 2. Netlify
```bash
# Build-Kommando: npm run build
# Publish Directory: out
# Node Version: 18+
```

**Konfiguration in `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Docker
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Builder
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8000
ENV PORT 8000

CMD ["node", "server.js"]
```

### 4. Statisches Hosting
Für statisches Hosting (GitHub Pages, etc.):

```bash
# next.config.ts anpassen für statischen Export
npm run build
```

## Umgebungsvariablen

### Entwicklung (.env.local)
```env
NODE_ENV=development
PORT=8000
```

### Production
```env
NODE_ENV=production
PORT=8000
```

## Performance-Optimierungen

### 1. Caching-Strategien
- Browser-Caching für statische Assets
- Service Worker für Offline-Funktionalität
- LocalStorage für Benutzerdaten

### 2. Bundle-Optimierung
- Tree-shaking aktiviert
- Code-Splitting nach Routen
- Lazy Loading für Komponenten

### 3. Image-Optimierung
- Next.js Image-Komponente verwendet
- WebP-Format für moderne Browser
- Responsive Images

## Monitoring & Analytics

### 1. Performance-Monitoring
```javascript
// Web Vitals tracking
export function reportWebVitals(metric) {
  console.log(metric);
  // Analytics-Service integrieren
}
```

### 2. Error-Tracking
- Sentry.io Integration empfohlen
- Console-Logging für Entwicklung
- Error Boundaries implementiert

## Sicherheit

### 1. Content Security Policy
```javascript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  }
];
```

### 2. HTTPS
- SSL-Zertifikate in Production
- HSTS-Header aktivieren
- Secure Cookies

## Wartung

### 1. Updates
```bash
# Abhängigkeiten aktualisieren
npm update

# Sicherheitsupdates
npm audit fix
```

### 2. Backup
- Regelmäßige Code-Backups via Git
- Benutzerdaten-Export-Funktion
- Konfigurationsdateien sichern

### 3. Logs
- Application Logs überwachen
- Performance-Metriken verfolgen
- Error-Rates analysieren

## Troubleshooting

### Häufige Probleme

1. **Build-Fehler**
   ```bash
   # Cache löschen
   rm -rf .next
   npm run build
   ```

2. **Hydration-Fehler**
   - Server-Client-Mismatch prüfen
   - LocalStorage-Zugriffe überprüfen
   - Mounted-State verwenden

3. **Performance-Probleme**
   - Bundle-Analyzer verwenden
   - Lazy Loading implementieren
   - Caching optimieren

## Support
Bei Deployment-Problemen:
1. Logs überprüfen
2. Build-Prozess validieren
3. Abhängigkeiten aktualisieren
4. Community-Support nutzen

---
*Deployment-Anleitung für Pflegeschule Lernportal v1.0*
