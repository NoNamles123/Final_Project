# VPN Service Website

A responsive multi-page front-end website created as a portfolio project for Fiverr. It presents a fictional VPN service with pricing, company information, team profiles, authentication screens, FAQs, and support interfaces.

## Highlights

- Responsive layouts for desktop and mobile devices
- Multi-page navigation and mobile burger menus
- Pricing, team, company story, FAQ, login, and registration pages
- Interactive local-only account demonstration
- Interactive local-only support chat demonstration
- Tailwind CSS and PostCSS build workflow
- No external credentials, databases, or back-end services required

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the stylesheet:

   ```bash
   npm run build
   ```

3. Open `index.html` with a local development server such as the VS Code Live Server extension.

## Demo behavior

The login, registration, and chat features are front-end demonstrations. Account information is stored only in the visitor's browser using `localStorage`; chat messages remain on the current page and are not transmitted. Do not enter real credentials or sensitive information.

## Project structure

- `index.html` — landing page
- `Html/` — secondary pages
- `CSS/` — generated stylesheet
- `global.css` — Tailwind CSS source and custom styles
- `JavaScript/` — navigation and local demo interactions
- `Images/` — project imagery and icons

## License

This repository is intended for portfolio demonstration. Replace the text, brand identity, and imagery as needed before using it in a commercial production project.
