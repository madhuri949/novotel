# Novotel Assets & Images Directory Guide

This directory is designated for your local photography, banners, and media assets.

## Recommended Image Specifications

| Section | Recommended Resolution | Aspect Ratio | Target File Format | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Slider** | `2000 x 1200 px` | 16:9 or 21:9 | WebP / Progressive JPEG | Full-bleed hero banner photography |
| **Room Cards & Modals** | `1000 x 667 px` | 3:2 | WebP / JPEG (80-85% quality) | Crisp bedroom & bathroom showcases |
| **Dining & Restaurant** | `1200 x 800 px` | 3:2 | WebP / JPEG | Culinary dishes, terrace, and wine cellar |
| **Experiences** | `800 x 600 px` | 4:3 | WebP / JPEG | Sailing, yoga, wellness, and excursions |
| **Gallery Masonry** | `1200 x 900 px` | 4:3 or 16:9 | WebP / JPEG | High-resolution lightbox photo views |
| **Review Avatars** | `150 x 150 px` | 1:1 | WebP / PNG | Circular guest profile photos |
| **Brand Logos** | Vector | Flexible | SVG | Crisp rendering across Retina displays |

## Directory Organization Best Practice

```text
assets/
├── icons/
│   ├── favicon.svg
│   ├── logo.svg
│   └── logo-white.svg
└── images/
    ├── hero/
    │   ├── hero-pool.jpg
    │   ├── hero-suite.jpg
    │   └── hero-dining.jpg
    ├── rooms/
    │   ├── standard-room.jpg
    │   ├── superior-room.jpg
    │   ├── deluxe-room.jpg
    │   ├── executive-suite.jpg
    │   ├── family-suite.jpg
    │   └── penthouse-suite.jpg
    ├── dining/
    │   ├── brasserie-terrace.jpg
    │   └── patisserie-buffet.jpg
    └── gallery/
        ├── resort-facade.jpg
        ├── spa-hydrotherapy.jpg
        └── lobby-atrium.jpg
```

## How to Switch from CDN to Local Images

In `index.html` and `script.js`:
- Replace `https://images.unsplash.com/...` with `assets/images/your-image-name.jpg`.
- When updating room cards in `script.js`, change the `image:` property in `roomsData` array.
- When updating the photo gallery in `script.js`, update the `image:` property in `galleryData` array.
