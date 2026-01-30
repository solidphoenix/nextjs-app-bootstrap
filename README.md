# Study Day Survey Website

A multilingual survey website for students to select their preferred study day and schedule.

## 🌟 Features

- **🌐 Multilingual Support**: Available in German (DE), English (EN), and Russian (RU)
- **🏥 Medical-themed Design**: Professional color palette suitable for medical education
- **📋 Comprehensive Survey Form**: Collect student information including:
  - Student name
  - Preferred study day (February 9 or 10, 2026)
  - Preferred time slot
  - Topics to cover
  - Desired study duration (2h, 4h, 6h, or full day)
- **💾 Persistent Storage**: Responses stored in browser localStorage
- **📊 Response Display**: View all submitted survey responses in a clean interface
- **📅 Calendar Integration**: 
  - Download .ics files compatible with all major calendar apps
  - Direct Google Calendar integration with one click
- **🚀 GitHub Pages Compatible**: Static export ready for free hosting

## Screenshots

### English Interface
![English Survey](https://github.com/user-attachments/assets/e85a2e36-3d7f-4e45-b67c-08bda161e375)

### German Interface
![German Survey](https://github.com/user-attachments/assets/6347008c-b364-4c7a-9ba1-71a163e8bbd7)

### Russian Interface
![Russian Survey](https://github.com/user-attachments/assets/98fd3077-a8ab-43b7-a2ef-91e8bb0e1c6b)

### Multiple Responses
![Multiple Responses](https://github.com/user-attachments/assets/48869367-ccc6-447c-894e-3f9223fb0cc8)

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

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages"
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Deploy**
   - Push to the `main` branch
   - Or manually trigger the workflow from the Actions tab

3. **Access Your Site**
   ```
   https://[username].github.io/[repository-name]/
   ```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## Technology Stack

- **Next.js 14**: React framework with static export capability
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework with custom medical-themed colors
- **localStorage**: Client-side data persistence

## Color Palette

The medical-themed color palette includes:

| Color | Hex Code | Purpose |
|-------|----------|---------|
| Primary Blue | `#2563eb` | Trust and professionalism |
| Cyan | `#06b6d4` | Cleanliness and calm |
| Green | `#10b981` | Health and wellness |
| Light Blue | `#f0f9ff` | Clean background |
| Dark Blue | `#1e3a8a` | Authority |

## Important Notes

### Data Persistence

- Survey responses are stored in browser **localStorage**
- Data is **not** shared between users or devices
- Data persists only in the browser where it was entered
- Each user sees only their own responses
- For a production survey with shared responses across users, consider integrating a backend service (e.g., Supabase, Firebase, or a custom API)

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage must be enabled
- JavaScript must be enabled

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── SurveyForm.tsx      # Survey form component
│   │   └── ResponsesList.tsx   # Responses display
│   ├── lib/
│   │   ├── database.ts         # LocalStorage utilities
│   │   └── calendar.ts         # Calendar export utilities
│   └── translations/
│       └── index.ts            # i18n translations
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
