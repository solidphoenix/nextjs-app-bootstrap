# Study Day Survey Website

A multilingual survey website for students to select their preferred study day and schedule.

## Features

- **Multilingual Support**: Available in German (DE), English (EN), and Russian (RU)
- **Medical-themed Design**: Professional color palette suitable for medical education
- **Survey Form**: Collect student information including:
  - Student name
  - Preferred study day (February 9 or 10, 2026)
  - Preferred time
  - Topics to cover
  - Desired study duration (2h, 4h, 6h, or full day)
- **Persistent Storage**: Responses stored in browser localStorage
- **Response Display**: View all submitted survey responses
- **Calendar Integration**: 
  - Download .ics file for calendar apps
  - Direct Google Calendar integration
- **GitHub Pages Compatible**: Static export ready for deployment

## Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Build the static site:

```bash
npm run build
```

The static files will be in the `out/` directory.

## Deployment to GitHub Pages

1. Build the static site: `npm run build`
2. The `out/` directory contains the static files
3. Configure GitHub Pages to serve from the `out/` directory or push it to the `gh-pages` branch

### GitHub Actions Deployment (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## Technology Stack

- **Next.js 14**: React framework with static export
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework with medical-themed colors
- **localStorage**: Client-side data persistence

## Color Palette

The medical-themed color palette includes:

- Primary Blue (#2563eb): Trust and professionalism
- Cyan (#06b6d4): Cleanliness and calm
- Green (#10b981): Health and wellness
- Light Blue (#f0f9ff): Clean background
- Dark Blue (#1e3a8a): Authority

## License

MIT
