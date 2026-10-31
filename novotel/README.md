# Novotel Grand Horizon Resort & Suites — Luxury Hotel Web Platform

A complete, responsive, international hospitality web platform inspired by the premium Novotel hospitality experience. Built with pure semantic HTML5, modern CSS3, and vanilla JavaScript without heavy external runtime dependencies.

---

## Table of Contents
1. [Project Overview & Architectural Highlights](#project-overview--architectural-highlights)
2. [File & Directory Structure](#file--directory-structure)
3. [Core Technical Features](#core-technical-features)
4. [Assets Directory Guidance & Media Optimization](#assets-directory-guidance--media-optimization)
5. [Setup Instructions for Visual Studio Code](#setup-instructions-for-visual-studio-code)
6. [Running the Website using Live Server & Local Browser](#running-the-website-using-live-server--local-browser)
7. [Comprehensive Customization Guide](#comprehensive-customization-guide)
8. [Interactive Testing & QA Checklist](#interactive-testing--qa-checklist)
9. [Genuine Booking API & Backend Integration Architecture](#genuine-booking-api--backend-integration-architecture)

---

## Project Overview & Architectural Highlights

The **Novotel Grand Horizon Resort & Suites** website is designed to deliver a 5-star digital guest experience:
- **Design Language**: Deep French Riviera navy (`#0b1e36`), warm ivory backgrounds, champagne gold accents (`#d4af37`), and subtle glassmorphic elements.
- **Brand Typography**: Google Fonts *Plus Jakarta Sans* paired with *Cinzel Decorative* for regal hospitality branding.
- **No Heavy Frameworks**: Pure Vanilla HTML5/CSS3/JavaScript ensuring instant load times, zero build step requirement, and complete customizability.
- **Modern Theme System**: Full Light and Dark Mode toggle with persistent guest preference saved in `localStorage`.
- **International Hospitality Ready**: Live multi-currency rate engine supporting USD ($), EUR (€), GBP (£), AUD (A$), and JPY (¥).

---

## File & Directory Structure

```text
novotel/
├── index.html              # Main single-page hospitality portal (1,950+ lines)
├── style.css               # Complete responsive CSS design system (2,100+ lines)
├── script.js               # Interactive state engine & client-side logic (1,190+ lines)
├── README.md               # Master engineering & deployment documentation
└── assets/
    ├── icons/
    │   ├── favicon.svg     # SVG luxury crest browser favicon
    │   ├── logo.svg        # Deep navy vector logo for light navigation
    │   └── logo-white.svg  # Crisp ivory/white vector logo for footer & dark mode
    └── images/
        └── README.md       # Media specs, resolutions, and directory organization
```

---

## Core Technical Features

1. **Floating Real-Time Booking Engine**:
   - Dynamic check-in and check-out date validation (minimum stay, prevent past dates, auto check-out sync).
   - Adult, children, and room increment/decrement counters with sensible occupancy limits.
   - Live availability calculator with night calculation and total estimated stay cost.
   - Interactive 2-step booking modal demo (room selection & simulated guest confirmation).

2. **Interactive Room Showcase & Filtering**:
   - Filterable tabs: *All Rooms*, *Suites*, *Ocean View*, and *Family Collection*.
   - Modal details drawer displaying full specs: square footage, bed configuration, guest capacity, and amenity icons.
   - Dynamic Wishlist engine: Guests can bookmark rooms; bookmarks persist in browser `localStorage`.

3. **Dynamic Currency Conversion**:
   - Top utility bar selector updates all room prices, dining menus, and package rates instantly across the entire DOM.

4. **Culinary Showcase & Interactive Menus**:
   - The Horizon Brasserie fine dining presentation.
   - Tabbed menu categories: Starters, Mains, Desserts, and Cocktails/Wines with tags (*Signature*, *Vegetarian*, *Locally Sourced*).

5. **Interactive Masonry Gallery & Lightbox**:
   - High-resolution photo masonry with category filters (*Architecture*, *Rooms*, *Dining*, *Wellness*).
   - Fullscreen keyboard-accessible Lightbox with previous/next navigation and ESC key dismiss.

6. **Reviews & Social Proof Carousel**:
   - Testimonials from verified international guests with star ratings and auto/manual navigation.

7. **Guest Care & Direct Concierge**:
   - Floating WhatsApp direct chat link pre-populated with concierge greetings.
   - Smooth scroll-to-top button with passive scroll listener.
   - Interactive FAQ accordion with animated indicators.
   - Contact form with regex validation and toast notification feedback.

---

## Assets Directory Guidance & Media Optimization

### Recommended Image Dimensions & Formats

| Asset Type | Optimal Size | Aspect Ratio | Format |
| :--- | :--- | :--- | :--- |
| **Hero Slider Slides** | `2000 x 1200 px` | 16:9 or 21:9 | WebP or JPG (< 300 KB) |
| **Room Showcase Cards** | `1000 x 667 px` | 3:2 | WebP or JPG (< 180 KB) |
| **Dining & Restaurant** | `1200 x 800 px` | 3:2 | WebP or JPG (< 200 KB) |
| **Experiences & Wellness**| `800 x 600 px` | 4:3 | WebP or JPG (< 150 KB) |
| **Gallery Lightbox Images**| `1400 x 933 px` | 3:2 / 4:3 | WebP or JPG (< 250 KB) |
| **Review Guest Avatars** | `150 x 150 px` | 1:1 | WebP or PNG (< 40 KB) |
| **Vector Logos** | Vector | Any | SVG |

### Media Optimization Commands

To batch convert and optimize local images using modern tools:
```bash
# Using WebP CLI
cwebp -q 82 input.jpg -o output.webp

# Or using Sharp in Node.js
# sharp(input).webp({ quality: 82 }).toFile(output)
```

---

## Setup Instructions for Visual Studio Code

1. **Open Workspace**:
   - Launch Visual Studio Code.
   - Click **File > Open Folder...** and select `C:\Users\admin\Desktop\novotel`.
2. **Recommended Extensions**:
   - **Live Server** (`ritwickdey.liveserver`): For real-time hot-reloading.
   - **Prettier - Code formatter** (`esbenp.prettier-vscode`): For standardized code indentation.
   - **HTML CSS Support** (`ecmel.vscode-html-css`): For intelligent class autocompletion.
3. **Recommended Settings** (`.vscode/settings.json`):
   ```json
   {
     "liveServer.settings.port": 5500,
     "liveServer.settings.donotShowInfoMsg": true,
     "editor.formatOnSave": true
   }
   ```

---

## Running the Website using Live Server & Local Browser

### Option A: Using VS Code Live Server (Recommended)
1. Open [index.html](file:///c:/Users/admin/Desktop/novotel/index.html) in VS Code.
2. Click the **"Go Live"** button in the bottom-right status bar, or right-click anywhere in `index.html` and choose **"Open with Live Server"**.
3. Your default browser will launch at `http://127.0.0.1:5500/index.html`.

### Option B: Direct Local Browser Open
1. Double-click [index.html](file:///c:/Users/admin/Desktop/novotel/index.html) in Windows File Explorer.
2. It will open instantly in Microsoft Edge, Google Chrome, or Mozilla Firefox under the `file:///` protocol.

---

## Comprehensive Customization Guide

### 1. Hotel Name & Branding
- **HTML Title & Meta**: [index.html:12-25](file:///c:/Users/admin/Desktop/novotel/index.html#L12-L25)
- **Top Utility & Header Logos**: [index.html:84-88](file:///c:/Users/admin/Desktop/novotel/index.html#L84-L88) and [index.html:128-132](file:///c:/Users/admin/Desktop/novotel/index.html#L128-L132)
- **Footer Brand & Bio**: [index.html:1465-1485](file:///c:/Users/admin/Desktop/novotel/index.html#L1465-L1485)

### 2. Room Rates, Names & Amenities
Room configurations are managed centrally in JavaScript for dynamic filtering, currency conversions, and modal views:
- **Room Database in JS**: [script.js:34-131](file:///c:/Users/admin/Desktop/novotel/script.js#L34-L131)
  - Edit `name`, `basePriceUSD`, `capacity`, `bedType`, `size`, `view`, and `features`.
- **Static HTML Room Fallbacks**: [index.html:410-630](file:///c:/Users/admin/Desktop/novotel/index.html#L410-L630)

### 3. Currency Rates
- **Exchange Multipliers**: [script.js:15-21](file:///c:/Users/admin/Desktop/novotel/script.js#L15-L21)
  ```javascript
  rates: {
    USD: { rate: 1.0, symbol: '$', code: 'USD' },
    EUR: { rate: 0.92, symbol: '€', code: 'EUR' },
    GBP: { rate: 0.78, symbol: '£', code: 'GBP' },
    AUD: { rate: 1.52, symbol: 'A$', code: 'AUD' },
    JPY: { rate: 155.0, symbol: '¥', code: 'JPY' }
  }
  ```

### 4. Dining Menus
- **Interactive Restaurant Menu Data**: [script.js:186-209](file:///c:/Users/admin/Desktop/novotel/script.js#L186-L209)
  - Add or adjust starters, main courses, desserts, cocktails, and dietary tags.

### 5. Hotel Contact & WhatsApp Concierge
- **Phone, Email & Address**: [index.html:1370-1420](file:///c:/Users/admin/Desktop/novotel/index.html#L1370-L1420)
- **WhatsApp Concierge Number**: [index.html:1925-1930](file:///c:/Users/admin/Desktop/novotel/index.html#L1925-L1930) (Update `https://wa.me/33493000000` with your hotel's international phone number).

---

## Interactive Testing & QA Checklist

- [x] **Header Navigation**: Smooth scrolls to sections (`#hero`, `#rooms`, `#amenities`, `#dining`, `#experiences`, `#contact`).
- [x] **Light / Dark Mode**: Toggles theme smoothly and preserves choice in `localStorage`.
- [x] **Currency Switcher**: Changes currency code and recalculates all prices across cards and modals instantly.
- [x] **Booking Engine Date Validation**: Check-in defaults to today, check-out defaults to 2 days later, prevents past dates, and updates nights count dynamically.
- [x] **Guest Increment/Decrement**: Prevents invalid values (minimum 1 adult, maximum 6 adults).
- [x] **Availability Modal**: Opens on clicking "Check Availability", lists available rooms with calculated total costs for the chosen stay duration, and proceeds to guest checkout demo.
- [x] **Room Filter Tabs**: Filters between All, Suites, Ocean View, and Family collection without layout shift.
- [x] **Room Details Modal**: Clicking "Details" opens the full room modal with specifications, feature checklist, and price per night.
- [x] **Room Wishlist Drawer**: Clicking heart icons toggles room in wishlist, updates header badge counter, and persists across reloads.
- [x] **Dining Menu Tabs**: Switches between Starters, Mains, Desserts, and Cocktails with fade animations.
- [x] **Gallery Lightbox**: Clicking any image opens fullscreen view; Left/Right buttons and keyboard arrows change images; ESC key closes modal.
- [x] **Video Modal**: Clicking "Watch Film" opens embedded cinematic YouTube showcase modal.
- [x] **Reviews Carousel**: Cycles through testimonials automatically and allows manual prev/next button navigation.
- [x] **FAQ Accordion**: Expands and collapses questions with smooth transition and rotating chevron.
- [x] **Contact Form**: Validates email format and required fields; displays a toast alert confirming submission.
- [x] **Newsletter Subscription**: Validates email address and alerts user with welcome discount toast.
- [x] **Mobile Drawer Navigation**: Hamburger toggle displays slide-out menu with smooth touch navigation on smartphones and tablets.
- [x] **Scroll to Top**: Floating button appears after scrolling 400px and returns to top smoothly.
- [x] **Reduced Motion**: Respects `prefers-reduced-motion` media queries for accessibility.

---

## Genuine Booking API & Backend Integration Architecture

When transitioning this frontend concept into a production hotel booking engine, follow this production architecture:

```text
[ Browser Client (HTML/JS) ]
             │
             ▼  (HTTPS / JSON REST or GraphQL)
[ API Gateway / Node.js / Python / Go Backend ]
             │
   ┌─────────┼──────────────────────────┬────────────────────────┐
   ▼         ▼                          ▼                        ▼
[ PMS / CRS ]                  [ Payment Gateway ]      [ Email / CRM ]
- Amadeus Hospitality          - Stripe Elements         - SendGrid / Resend
- Sabre SynXis Central Res     - Adyen Hospitality       - Salesforce Hospitality
- Cloudbeds / Mews API         - Apple Pay / Google Pay  - Twilio WhatsApp API
```

### 1. Essential API Endpoints

| Endpoint | Method | Payload | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/availability` | `GET` | `checkIn, checkOut, adults, children, roomType` | Queries real-time PMS inventory & room allotments |
| `/api/v1/rates/live` | `GET` | `currency` | Returns real-time exchange rates from fixer.io / OpenExchangeRates |
| `/api/v1/bookings/quote` | `POST` | `roomId, nights, guests, promoCode` | Calculates final rate with local occupancy taxes, VAT, resort fees |
| `/api/v1/bookings/checkout`| `POST` | `guestDetails, paymentMethodToken` | Initiates 3D-Secure charge and creates confirmed reservation in PMS |
| `/api/v1/newsletter` | `POST` | `email, preferences` | Adds guest to email marketing automation (Mailchimp, Klaviyo) |

### 2. Recommended Hospitality Integrations
- **PMS / Central Reservation Systems (CRS)**:
  - **Amadeus Hospitality Web Services** or **Sabre SynXis API**: Standard enterprise integrations for Accor/Novotel properties.
  - **Cloudbeds API** or **Mews Systems API**: Modern, developer-friendly REST APIs for boutique resorts and hotel groups.
- **Payment Processing**:
  - Integrate **Stripe Elements** or **Adyen Hospitality SDK** for PCI-DSS Level 1 compliance. Never store raw credit card numbers on your servers.
- **Dynamic Pricing Engine**:
  - Connect with **IDeaS Revenue Solutions** or **Duetto** for demand-based dynamic room rate yield management.

---

## License & Intellectual Property Notice

*This project is an architectural concept, development demonstration, and design template created for educational and professional demonstration purposes. "Novotel" and related trademarks are the property of Accor S.A.*
