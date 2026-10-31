/**
 * ==========================================================================
 * NOVOTEL GRAND HORIZON RESORT & SUITES - CORE INTERACTIVE ENGINE
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. GLOBAL STATE & DATABASES
  // --------------------------------------------------------------------------
  const state = {
    currentCurrency: 'USD',
    rates: {
      USD: { rate: 1.0, symbol: '$', code: 'USD' },
      EUR: { rate: 0.92, symbol: '€', code: 'EUR' },
      GBP: { rate: 0.78, symbol: '£', code: 'GBP' },
      AUD: { rate: 1.52, symbol: 'A$', code: 'AUD' },
      JPY: { rate: 155.0, symbol: '¥', code: 'JPY' }
    },
    wishlist: JSON.parse(localStorage.getItem('novotel_wishlist') || '[]'),
    adults: 2,
    children: 0,
    rooms: 1,
    currentLightboxIndex: 0,
    activeHeroIndex: 0,
    activeReviewIndex: 0,
    heroTimer: null,
    reviewTimer: null
  };

  // Rooms Data
  const roomsData = [
    {
      id: 'room-std',
      name: 'Standard Heritage Room',
      category: 'standard business',
      basePriceUSD: 185,
      capacity: '2 Guests (2 Adults)',
      bedType: '1 King or 2 Single Beds',
      size: '32 m² / 344 sq ft',
      view: 'Garden & Courtyard View',
      badge: 'Classic Comfort',
      badgeClass: 'badge-navy',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      description: 'An oasis of calm crafted with soothing neutral tones, plush Novotel Live N Dream bedding, an ergonomic workstation, and smart connected tech.',
      features: ['Free High-Speed Wi-Fi', 'Novotel Live N Dream Bedding', 'Rainfall Eco-Shower', '55" 4K Smart TV & Chromecast', 'Organic Fair-Trade Tea & Coffee', 'Individual Climate Control'],
      amenityIcons: ['fa-wifi', 'fa-tv', 'fa-snowflake', 'fa-mug-hot']
    },
    {
      id: 'room-sup',
      name: 'Superior Coastal Room',
      category: 'standard ocean',
      basePriceUSD: 245,
      capacity: '2 Guests (2 Adults, 1 Child)',
      bedType: '1 King Bed with Luxury Duvet',
      size: '38 m² / 409 sq ft',
      view: 'Direct Mediterranean Sea View',
      badge: 'Popular Choice',
      badgeClass: 'badge-gold',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      description: 'Wake up to sunlit azure horizons. Featuring a private Juliet balcony, marble vanity bathroom, bespoke botanical amenities, and sunset lounge seating.',
      features: ['Panoramic Sea View', 'Private Glass Juliet Balcony', 'Nespresso Coffee Machine', 'Deep Soaking Tub & Separate Shower', 'Bespoke Plush Bathrobes & Slippers', 'Minibar with Local Delicacies'],
      amenityIcons: ['fa-water', 'fa-coffee', 'fa-bath', 'fa-wind']
    },
    {
      id: 'room-deluxe',
      name: 'Deluxe Horizon Panorama',
      category: 'ocean suites',
      basePriceUSD: 320,
      capacity: '3 Guests (2 Adults, 1 Child)',
      bedType: '1 Extra-Large King Bed',
      size: '46 m² / 495 sq ft',
      view: '180° Coastline & Sunset Panorama',
      badge: 'Best Panorama',
      badgeClass: 'badge-gold',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80',
      description: 'Expansive luxury designed for effortless rejuvenation. Unwind on a furnished private terrace, savor specialty espresso, and soak in endless coastal skies.',
      features: ['Furnished Sun Terrace', 'Complimentary Evening Aperitif', 'Bluetooth Sound System', 'Double Vanity Marble En-suite', 'Turndown Pillow Menu Service', 'High-Speed Fibre Wi-Fi'],
      amenityIcons: ['fa-binoculars', 'fa-umbrella-beach', 'fa-music', 'fa-martini-glass']
    },
    {
      id: 'room-exec',
      name: 'Executive Business Suite',
      category: 'business suites',
      basePriceUSD: 430,
      capacity: '2 Guests (2 Adults)',
      bedType: '1 Grand King Bed',
      size: '56 m² / 602 sq ft',
      view: 'Panoramic City & Marina Horizon',
      badge: 'Executive Lounge Access',
      badgeClass: 'badge-navy',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
      description: 'Tailored for discerning business leaders. Includes all-day access to the top-floor Executive Lounge, private board meeting room access, and concierge check-in.',
      features: ['Private Executive Lounge Privileges', 'Complimentary Daily Buffet Breakfast', 'Express Valet Garment Pressing', 'Ergonomic Herman Miller Seating', 'Wireless Dual-Device Charging Pads', 'VIP Welcome Champagne on Arrival'],
      amenityIcons: ['fa-briefcase', 'fa-champagne-glasses', 'fa-utensils', 'fa-shield-halved']
    },
    {
      id: 'room-fam',
      name: 'Family Harmony Suite',
      category: 'family',
      basePriceUSD: 490,
      capacity: '4 Guests (2 Adults, 2 Children)',
      bedType: '1 King Bed + 2 Twin Beds',
      size: '68 m² / 731 sq ft',
      view: 'Lush Gardens & Resort Pool',
      badge: 'Family Signature',
      badgeClass: 'badge-gold',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
      description: 'Our award-winning Novotel family experience. Interconnecting bedrooms, a child play corner, dedicated entertainment, and complimentary kids breakfast under 16.',
      features: ['Interconnecting Suite Layout', 'Children Welcome Pack & Games', 'Dual Bathrooms (Family Tub)', 'Kids Eat Free Privilege (Under 16)', 'Late 3:00 PM Sunday Checkout', 'Childproofing & Stroller Upon Request'],
      amenityIcons: ['fa-people-roof', 'fa-gamepad', 'fa-ice-cream', 'fa-clock']
    },
    {
      id: 'room-pres',
      name: 'The Grand Horizon Penthouse',
      category: 'suites ocean',
      basePriceUSD: 850,
      capacity: '4 Guests (4 Adults)',
      bedType: '2 King Master Bedrooms',
      size: '115 m² / 1,237 sq ft',
      view: 'Top-Floor 360° Coastline & Mountain View',
      badge: 'Ultimate Luxury',
      badgeClass: 'badge-gold',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80',
      description: 'The pinnacle of French Riviera hospitality. Private heated infinity plunge pool, open-concept grand salon, dedicated 24/7 butler service, and private helicopter transfers.',
      features: ['Private Heated Plunge Pool & Sun Deck', 'Dedicated 24/7 Butler & Sommelier', 'Private Bar with Premium Spirits', 'In-Suite Fine Dining Tasting Menu', 'Helipad Airport Chauffeur Transfer', 'Bulgari Luxury Spa Bath Collection'],
      amenityIcons: ['fa-crown', 'fa-water-ladder', 'fa-bell-concierge', 'fa-helicopter']
    }
  ];

  // Gallery Data
  const galleryData = [
    {
      category: 'architecture',
      title: 'Grand Horizon Sunset Facade',
      desc: 'Modern Mediterranean coastal architecture illuminated at dusk.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'wellness',
      title: 'Horizon Infinity Pool & Cabanas',
      desc: 'Temperature-controlled heated pool overlooking the turquoise sea.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'rooms',
      title: 'The Grand Horizon Penthouse Salon',
      desc: 'Sophisticated living lounge with curated modern art pieces.',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'dining',
      title: 'The Horizon Brasserie Waterfront Terrace',
      desc: 'Fresh Mediterranean catch and French culinary traditions by the sea.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'rooms',
      title: 'Superior Coastal Bedroom & Balcony',
      desc: 'Sunlit morning panorama with crisp luxury Egyptian cotton bedding.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'wellness',
      title: 'Le Spa Hydrotherapy & Sauna Suite',
      desc: 'Signature Thalassotherapy, Himalayan salt sauna, and eucalyptus steam.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'dining',
      title: 'Riviera Dining & Cocktail Bar',
      desc: 'Handcrafted mixology, grand cru vintages, and Mediterranean small plates in an intimate ambient lounge.',
      image: 'assets/images/dining-bar.jpg'
    },
    {
      category: 'architecture',
      title: 'Lobby Atrium & Grand Chandelier',
      desc: 'Welcoming double-height lobby with warm champagne gold accents.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  // Dining Menu Data
  const menuData = {
    starters: [
      { name: 'Riviera Truffle Burrata', priceUSD: 24, desc: 'Heirloom San Marzano tomatoes, 24-month aged balsamic reduction, toasted focaccia crisp.', tag: 'Vegetarian' },
      { name: 'Yellowfin Tuna Tartare', priceUSD: 28, desc: 'Avocado mousse, yuzu-ponzu emulsion, sesame cracker, sevruga caviar.', tag: 'Signature' },
      { name: 'French Onion Velouté', priceUSD: 21, desc: 'Caramelized Roscoff onions, rich beef broth, sourdough crouton, 18-month Comté gratin.', tag: 'Classic' },
      { name: 'Wild Mushroom Carpaccio', priceUSD: 22, desc: 'Shaved King Oyster mushrooms, black summer truffle, pine nuts, vegan pecorino.', tag: 'Vegan / GF' }
    ],
    mains: [
      { name: 'Pan-Seared Mediterranean Sea Bass', priceUSD: 46, desc: 'Artichoke barigoule, saffron fumet, crushed baby potatoes with chives.', tag: 'Chef Choice' },
      { name: 'Charred Prime Beef Tenderloin (250g)', priceUSD: 54, desc: 'Truffled potato mousseline, glazed baby carrots, green peppercorn cognac jus.', tag: 'Prime Cut' },
      { name: 'Provencal Herb Crusted Rack of Lamb', priceUSD: 48, desc: 'Rosemary polenta cake, braised shallots, thyme-infused lamb reduction.', tag: 'Locally Sourced' },
      { name: 'Handmade Black Truffle Tagliolini', priceUSD: 38, desc: 'Fresh egg pasta, Normandy churned butter, 30-month Parmigiano-Reggiano, fresh black truffle.', tag: 'Vegetarian' }
    ],
    desserts: [
      { name: 'Grand Horizon Soufflé Grand Marnier', priceUSD: 19, desc: 'Baked to order, Madagascan vanilla bean crème anglaise, orange zest crisp.', tag: 'Signature' },
      { name: 'Valrhona Dark Chocolate Sphere', priceUSD: 18, desc: 'Salted caramel core, hazelnut praline crunch, warm espresso ganache pour.', tag: 'Decadent' },
      { name: 'Lemon Verbena Tartlet', priceUSD: 16, desc: 'Menton lemon curd, torched Swiss meringue, candied citrus, basil sorbet.', tag: 'Citrus Fresh' }
    ],
    cocktails: [
      { name: 'The Azure Riviera Spritz', priceUSD: 19, desc: 'Grey Goose vodka, blue curaçao, elderflower liqueur, Champagne, rosemary sprig.', tag: 'Cocktail' },
      { name: 'Smoked Bourbon Old Fashioned', priceUSD: 21, desc: 'Woodford Reserve, aromatic bitters, orange oils, served under applewood smoke.', tag: 'Classic' },
      { name: 'Château Minuty Rose 2023 (Glass)', priceUSD: 17, desc: 'Côtes de Provence, crisp red berries, subtle citrus and mineral finish.', tag: 'Wine' }
    ]
  };

  // Experiences Data
  const experiencesData = {
    'exp-yacht': {
      id: 'exp-yacht',
      title: 'Sunset Yacht Excursions',
      tag: 'Coastal Adventure',
      tagline: 'Private Mediterranean Catamaran Cruise with Champagne & Canapés',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      priceUSD: 450,
      priceType: 'fixed',
      priceNote: 'Private Charter (up to 8 guests)',
      desc: 'Set sail from the hotel\'s private marina pier aboard our custom 52-foot luxury catamaran. Glide past the dramatic red sea cliffs of the Massif de l\'Estérel and tranquil secluded coves. As golden hour descends over the Mediterranean, our onboard sommelier uncorks chilled Moët & Chandon Champagne paired with hand-crafted canapés prepared by our culinary team. Enjoy sunset swimming stops, stand-up paddleboarding, or simply relax on the forward sunbeds as dusk paints the French Riviera horizon.',
      specs: [
        { label: 'Duration', value: '3.5 Hours (5:00 PM – 8:30 PM)', icon: 'fa-clock' },
        { label: 'Capacity', value: 'Private (Up to 8 Guests)', icon: 'fa-user-group' },
        { label: 'Departure', value: 'Hotel Marina Pier Dock 4', icon: 'fa-anchor' },
        { label: 'Beverages', value: 'Champagne & Artisanal Bar', icon: 'fa-champagne-glasses' }
      ],
      highlights: [
        'Private 52ft luxury catamaran charter with licensed captain & crew',
        'Complimentary Moët & Chandon Brut Champagne and vintage Provence Rosé',
        'Chef-curated gourmet sunset canapés and fresh local fruits',
        'Snorkeling masks, fins, and stand-up paddleboards provided',
        'Bluetooth surround sound system & heated freshwater deck shower',
        'Complimentary resort golf cart transfer to private pier'
      ]
    },
    'exp-yoga': {
      id: 'exp-yoga',
      title: 'Dawn Yoga & Sound Healing',
      tag: 'Wellness & Zen',
      tagline: 'Oceanfront Sunrise Vinyasa, Breathwork & Tibetan Sound Meditation',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      priceUSD: 0,
      priceType: 'complimentary',
      priceNote: 'Complimentary for Novotel Resort Guests',
      desc: 'Greet the Mediterranean dawn with an invigorating yet peaceful sensory wellness ritual. Hosted on our private oceanfront teak panorama deck, this morning sanctuary begins with gentle pranayama breathwork to center the mind, followed by a fluid Vinyasa flow suitable for all experience levels. The session concludes with a restorative 20-minute sound bath using handcrafted antique Tibetan singing bowls, harmonizing frequencies that wash away stress and restore deep serenity.',
      specs: [
        { label: 'Schedule', value: 'Tue, Thu & Sat at 7:30 AM', icon: 'fa-calendar-days' },
        { label: 'Duration', value: '75 Minutes', icon: 'fa-clock' },
        { label: 'Location', value: 'Oceanfront Teak Horizon Deck', icon: 'fa-water' },
        { label: 'Suitability', value: 'All Levels (Beginner to Advanced)', icon: 'fa-heart-pulse' }
      ],
      highlights: [
        'Guided by our resident certified Yoga Alliance Master',
        'Acoustic sound healing with authentic 7-metal Tibetan bowls',
        'Manduka PRO eco-mats, cork blocks, and organic cotton straps provided',
        'Post-session cold-pressed botanical juices and detox antioxidant elixirs',
        'Freshly infused lavender towels and herbal aromatherapy mists',
        'Small intimate groups ensuring personal posture alignment'
      ]
    },
    'exp-wine': {
      id: 'exp-wine',
      title: 'Vineyard Sommelier Masterclass',
      tag: 'Gastronomy',
      tagline: 'Exclusive Provence Terroir Tour, Barrel Tastings & Cellar Pairing',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      priceUSD: 195,
      priceType: 'per_person',
      priceNote: 'Per Guest (includes 5-course lunch & wine pairing)',
      desc: 'Embark on an unforgettable gastronomic pilgrimage into the sun-drenched terraced hills of the Côtes de Provence. Chauffeur-driven from the hotel lobby in a private Mercedes van, you\'ll walk through centuries-old biodynamic vineyards with our Chief Sommelier. Go behind locked cellar gates to taste rare vintages straight from French oak barrels, discover the intricate blending techniques behind Cru Classé Provence Rosé, and enjoy an exclusive 5-course farm-to-table wine pairing lunch overlooking the vines.',
      specs: [
        { label: 'Schedule', value: 'Wednesdays & Fridays, 10:00 AM', icon: 'fa-calendar-check' },
        { label: 'Duration', value: 'Half-Day (~4.5 Hours)', icon: 'fa-clock' },
        { label: 'Transport', value: 'Luxury Mercedes Chauffeur Transfer', icon: 'fa-van-shuttle' },
        { label: 'Group Size', value: 'Intimate Masterclass (Max 6 Guests)', icon: 'fa-users' }
      ],
      highlights: [
        'Private chauffeured door-to-door transfer from Novotel lobby',
        'Guided vineyard walk through historic biodynamic vines',
        'VIP cellar access with barrel tastings led by Winemaker & Sommelier',
        'Tasting of 6 award-winning Cru Classé Provençal red, white & rosé wines',
        '5-course Provençal tasting lunch paired with vineyard vintages',
        'Exclusive cellar door pricing on shipped vintage case orders'
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 2. CURRENCY FORMATTING UTILITY
  // --------------------------------------------------------------------------
  function formatCurrency(amountUSD) {
    const cur = state.rates[state.currentCurrency] || state.rates.USD;
    const converted = amountUSD * cur.rate;
    if (state.currentCurrency === 'JPY') {
      return `${cur.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${cur.symbol}${Math.round(converted).toLocaleString()}`;
  }

  function updateAllPricesOnPage() {
    // Update Room Card Prices
    document.querySelectorAll('[data-base-price]').forEach(el => {
      const base = parseFloat(el.getAttribute('data-base-price'));
      el.textContent = formatCurrency(base);
    });

    // Update Currency Symbols
    document.querySelectorAll('.currency-code-display').forEach(el => {
      el.textContent = state.currentCurrency;
    });

    // Update active experience modal price if open
    if (currentActiveExp && currentActiveExp.priceType !== 'complimentary') {
      const expPriceEl = document.getElementById('expModalPrice');
      if (expPriceEl) {
        expPriceEl.textContent = formatCurrency(currentActiveExp.priceUSD);
      }
    }
  }

  // Currency Selector Listener
  const currencySelect = document.getElementById('currencySelect');
  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      state.currentCurrency = e.target.value;
      updateAllPricesOnPage();
      showToast('Currency Updated', `Displaying all rates in ${state.currentCurrency}. Rates are illustrative demo values.`, 'fa-circle-info');
    });
  }

  // --------------------------------------------------------------------------
  // 3. THEME TOGGLE (LIGHT / DARK MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('novotel_theme') || 'light';
  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('novotel_theme', next);
      showToast('Theme Switched', `Active mode: ${next.toUpperCase()}`, next === 'dark' ? 'fa-moon' : 'fa-sun');
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. STICKY HEADER & NAVIGATION
  // --------------------------------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active nav link highlight
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Hamburger & Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');

  function openMobileNav() {
    hamburgerBtn.classList.add('active');
    mobileNavDrawer.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    hamburgerBtn.classList.remove('active');
    mobileNavDrawer.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // --------------------------------------------------------------------------
  // 5. HERO SLIDER CAROUSEL
  // --------------------------------------------------------------------------
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroIndicators = document.querySelectorAll('.hero-indicator-dot');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');

  function showHeroSlide(index) {
    if (!heroSlides.length) return;
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    heroIndicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    state.activeHeroIndex = index;
  }

  function nextHeroSlide() {
    const next = (state.activeHeroIndex + 1) % heroSlides.length;
    showHeroSlide(next);
  }

  function prevHeroSlide() {
    const prev = (state.activeHeroIndex - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prev);
  }

  if (heroNextBtn) heroNextBtn.addEventListener('click', () => {
    nextHeroSlide();
    resetHeroTimer();
  });

  if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => {
    prevHeroSlide();
    resetHeroTimer();
  });

  heroIndicators.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.slideIndex, 10);
      showHeroSlide(idx);
      resetHeroTimer();
    });
  });

  function startHeroTimer() {
    state.heroTimer = setInterval(nextHeroSlide, 6500);
  }

  function resetHeroTimer() {
    clearInterval(state.heroTimer);
    startHeroTimer();
  }

  startHeroTimer();

  // --------------------------------------------------------------------------
  // 6. BOOKING ENGINE: DATES, GUESTS & SEARCH
  // --------------------------------------------------------------------------
  const checkinInput = document.getElementById('checkinDate');
  const checkoutInput = document.getElementById('checkoutDate');

  // Set default dates: Today and Today + 2 nights
  const today = new Date();
  const defaultCheckin = new Date(today);
  defaultCheckin.setDate(today.getDate() + 1);

  const defaultCheckout = new Date(defaultCheckin);
  defaultCheckout.setDate(defaultCheckin.getDate() + 2);

  const formatDateYMD = (d) => d.toISOString().split('T')[0];

  if (checkinInput && checkoutInput) {
    checkinInput.min = formatDateYMD(today);
    checkinInput.value = formatDateYMD(defaultCheckin);

    checkoutInput.min = formatDateYMD(defaultCheckin);
    checkoutInput.value = formatDateYMD(defaultCheckout);

    checkinInput.addEventListener('change', () => {
      const inDate = new Date(checkinInput.value);
      const minOut = new Date(inDate);
      minOut.setDate(inDate.getDate() + 1);
      checkoutInput.min = formatDateYMD(minOut);

      const curOut = new Date(checkoutInput.value);
      if (curOut <= inDate) {
        checkoutInput.value = formatDateYMD(minOut);
      }
    });
  }

  // Guest & Room Popover
  const guestTrigger = document.getElementById('guestSelectorTrigger');
  const guestPopover = document.getElementById('guestPopover');
  const guestDisplayText = document.getElementById('guestDisplayText');

  if (guestTrigger && guestPopover) {
    guestTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      guestPopover.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!guestPopover.contains(e.target) && !guestTrigger.contains(e.target)) {
        guestPopover.classList.remove('active');
      }
    });

    // Steppers setup
    setupStepper('adultsStepperMinus', 'adultsStepperPlus', 'adultsValue', 1, 6, (val) => {
      state.adults = val;
      updateGuestSummary();
    });

    setupStepper('childrenStepperMinus', 'childrenStepperPlus', 'childrenValue', 0, 4, (val) => {
      state.children = val;
      updateGuestSummary();
    });

    setupStepper('roomsStepperMinus', 'roomsStepperPlus', 'roomsValue', 1, 4, (val) => {
      state.rooms = val;
      updateGuestSummary();
    });
  }

  function setupStepper(minusId, plusId, valueId, min, max, onChange) {
    const minusBtn = document.getElementById(minusId);
    const plusBtn = document.getElementById(plusId);
    const valEl = document.getElementById(valueId);

    if (!minusBtn || !plusBtn || !valEl) return;

    let current = parseInt(valEl.textContent, 10);

    const updateBtns = () => {
      minusBtn.disabled = current <= min;
      plusBtn.disabled = current >= max;
    };

    minusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (current > min) {
        current--;
        valEl.textContent = current;
        updateBtns();
        onChange(current);
      }
    });

    plusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (current < max) {
        current++;
        valEl.textContent = current;
        updateBtns();
        onChange(current);
      }
    });

    updateBtns();
  }

  function updateGuestSummary() {
    if (!guestDisplayText) return;
    const adultTxt = `${state.adults} Adult${state.adults > 1 ? 's' : ''}`;
    const childTxt = state.children > 0 ? `, ${state.children} Child${state.children > 1 ? 'ren' : ''}` : '';
    const roomTxt = ` · ${state.rooms} Room${state.rooms > 1 ? 's' : ''}`;
    guestDisplayText.textContent = `${adultTxt}${childTxt}${roomTxt}`;
  }

  // Booking Search Availability Form Submission
  const bookingSearchForm = document.getElementById('bookingSearchForm');
  if (bookingSearchForm) {
    bookingSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const inVal = new Date(checkinInput.value);
      const outVal = new Date(checkoutInput.value);

      if (isNaN(inVal.getTime()) || isNaN(outVal.getTime())) {
        showToast('Invalid Dates', 'Please select valid check-in and check-out dates.', 'fa-triangle-exclamation');
        return;
      }

      if (outVal <= inVal) {
        showToast('Date Error', 'Check-out date must be after check-in date.', 'fa-circle-exclamation');
        return;
      }

      const diffTime = Math.abs(outVal - inVal);
      const diffNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      openAvailabilityModal(diffNights, checkinInput.value, checkoutInput.value);
    });
  }

  // Availability Modal Flow
  function openAvailabilityModal(nights, checkinStr, checkoutStr) {
    const modal = document.getElementById('availabilityModal');
    const container = document.getElementById('availabilityResultsList');
    const stayDatesBadge = document.getElementById('availStayBadge');

    if (!modal || !container) return;

    stayDatesBadge.innerHTML = `<strong>${nights} Night${nights > 1 ? 's' : ''}</strong> (${checkinStr} &rarr; ${checkoutStr}) &middot; ${state.adults} Adults${state.children > 0 ? `, ${state.children} Children` : ''}`;

    // Filter available demo rooms
    let html = '';
    roomsData.forEach(room => {
      const totalUSD = room.basePriceUSD * nights * state.rooms;
      const taxesUSD = Math.round(totalUSD * 0.10);
      const grandTotalUSD = totalUSD + taxesUSD;

      html += `
        <div class="room-avail-item" style="display: flex; gap: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem; align-items: center; flex-wrap: wrap;">
          <img src="${room.image}" alt="${room.name}" style="width: 140px; height: 110px; object-fit: cover; border-radius: var(--radius-sm);">
          <div style="flex-grow: 1; min-width: 200px;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span class="badge ${room.badgeClass}" style="font-size: 0.7rem;">${room.badge}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${room.size}</span>
            </div>
            <h4 style="font-family: var(--font-serif); font-size: 1.125rem; margin-bottom: 0.35rem; color: var(--text-primary);">${room.name}</h4>
            <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 0.5rem;"><i class="fa-solid fa-bed" style="color: var(--accent-gold); margin-right: 0.35rem;"></i>${room.bedType} &middot; <i class="fa-solid fa-check" style="color: #10b981; margin-left: 0.25rem; margin-right: 0.25rem;"></i>Free Cancellation until 24h prior</p>
          </div>
          <div style="text-align: right; min-width: 160px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">${formatCurrency(room.basePriceUSD)} / night</div>
            <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0.15rem 0;">${formatCurrency(grandTotalUSD)}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.75rem;">Includes taxes &amp; fees (${nights} nights)</div>
            <button class="btn btn-primary btn-sm book-this-avail-btn" data-room-id="${room.id}" data-nights="${nights}" data-total-usd="${grandTotalUSD}">Select &amp; Reserve</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    openModal(modal);

    // Attach click listeners to "Select & Reserve" buttons
    container.querySelectorAll('.book-this-avail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const roomId = e.target.getAttribute('data-room-id');
        const roomNights = e.target.getAttribute('data-nights');
        const total = e.target.getAttribute('data-total-usd');
        closeModal(modal);
        openReservationCheckoutModal(roomId, roomNights, total, checkinStr, checkoutStr);
      });
    });
  }

  // Reservation Checkout Demo Modal
  function openReservationCheckoutModal(roomId, nights, totalUSD, checkinStr, checkoutStr) {
    const room = roomsData.find(r => r.id === roomId) || roomsData[0];
    const checkoutModal = document.getElementById('checkoutDemoModal');
    if (!checkoutModal) return;

    document.getElementById('checkoutRoomTitle').textContent = room.name;
    document.getElementById('checkoutRoomDates').textContent = `${nights} Nights (${checkinStr} to ${checkoutStr})`;
    document.getElementById('checkoutRoomGuests').textContent = `${state.adults} Adults${state.children > 0 ? `, ${state.children} Children` : ''} · ${state.rooms} Room`;
    document.getElementById('checkoutTotalAmount').textContent = formatCurrency(parseFloat(totalUSD));

    openModal(checkoutModal);
  }

  // Reservation Form Submission
  const reservationDemoForm = document.getElementById('reservationDemoForm');
  if (reservationDemoForm) {
    reservationDemoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('resGuestFirstName').value + ' ' + document.getElementById('resGuestLastName').value;
      const guestEmail = document.getElementById('resGuestEmail').value;
      const refNumber = 'NOV-' + Math.floor(100000 + Math.random() * 900000);

      closeModal(document.getElementById('checkoutDemoModal'));

      // Open Confirmation Voucher Modal
      const confModal = document.getElementById('bookingConfirmedModal');
      if (confModal) {
        document.getElementById('confGuestName').textContent = guestName;
        document.getElementById('confGuestEmail').textContent = guestEmail;
        document.getElementById('confRefCode').textContent = refNumber;
        openModal(confModal);
      }

      showToast('Reservation Confirmed!', `Booking ${refNumber} generated successfully!`, 'fa-circle-check');
    });
  }

  // --------------------------------------------------------------------------
  // 7. ROOMS FILTERING & DETAIL MODAL
  // --------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.filter-pill');
  const roomCards = document.querySelectorAll('.room-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterCategory = pill.getAttribute('data-filter');

      roomCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (filterCategory === 'all' || cardCat.includes(filterCategory)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Room View Details Modal Trigger
  document.querySelectorAll('.view-room-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const roomId = e.target.closest('[data-room-id]').getAttribute('data-room-id');
      const room = roomsData.find(r => r.id === roomId);
      if (room) {
        openRoomDetailsModal(room);
      }
    });
  });

  function openRoomDetailsModal(room) {
    const modal = document.getElementById('roomDetailsModal');
    if (!modal) return;

    document.getElementById('roomModalTitle').textContent = room.name;
    document.getElementById('roomModalImg').src = room.image;
    document.getElementById('roomModalImg').alt = room.name;
    document.getElementById('roomModalBadge').textContent = room.badge;
    document.getElementById('roomModalDesc').textContent = room.description;
    document.getElementById('roomModalCapacity').textContent = room.capacity;
    document.getElementById('roomModalBed').textContent = room.bedType;
    document.getElementById('roomModalSize').textContent = room.size;
    document.getElementById('roomModalView').textContent = room.view;
    document.getElementById('roomModalPrice').textContent = formatCurrency(room.basePriceUSD);

    const featList = document.getElementById('roomModalFeaturesList');
    if (featList) {
      featList.innerHTML = room.features.map(f => `
        <li style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.875rem; color: var(--text-secondary); padding: 0.35rem 0;">
          <i class="fa-solid fa-check" style="color: var(--accent-gold);"></i> ${f}
        </li>
      `).join('');
    }

    const modalBookBtn = document.getElementById('roomModalBookBtn');
    if (modalBookBtn) {
      modalBookBtn.onclick = () => {
        closeModal(modal);
        // Scroll to booking engine & prefill
        const engine = document.getElementById('bookingEngineSection');
        if (engine) {
          engine.scrollIntoView({ behavior: 'smooth' });
          showToast('Room Selected', `Ready to book ${room.name}. Choose your dates above!`, 'fa-bell-concierge');
        }
      };
    }

    openModal(modal);
  }

  // --------------------------------------------------------------------------
  // 8. WISHLIST MANAGEMENT
  // --------------------------------------------------------------------------
  const wishlistCounterBadge = document.getElementById('wishlistBadge');
  const wishlistBtn = document.getElementById('wishlistToggleBtn');
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const closeWishlistDrawerBtn = document.getElementById('closeWishlistDrawerBtn');

  function updateWishlistUI() {
    if (wishlistCounterBadge) {
      wishlistCounterBadge.textContent = state.wishlist.length;
      wishlistCounterBadge.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
    }

    // Update heart icons on cards
    document.querySelectorAll('.room-wishlist-btn').forEach(btn => {
      const card = btn.closest('[data-room-id]');
      if (!card) return;
      const roomId = card.getAttribute('data-room-id');
      const isSaved = state.wishlist.includes(roomId);
      btn.classList.toggle('active', isSaved);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      }
    });

    renderWishlistDrawerItems();
  }

  function toggleWishlist(roomId) {
    const idx = state.wishlist.indexOf(roomId);
    const room = roomsData.find(r => r.id === roomId);
    const name = room ? room.name : 'Room';

    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast('Removed from Wishlist', `${name} was removed from your saved items.`, 'fa-heart');
    } else {
      state.wishlist.push(roomId);
      showToast('Saved to Wishlist', `${name} is saved to your favorites.`, 'fa-heart');
    }

    localStorage.setItem('novotel_wishlist', JSON.stringify(state.wishlist));
    updateWishlistUI();
  }

  document.querySelectorAll('.room-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('[data-room-id]');
      if (card) {
        toggleWishlist(card.getAttribute('data-room-id'));
      }
    });
  });

  if (wishlistBtn && wishlistDrawer) {
    wishlistBtn.addEventListener('click', () => {
      wishlistDrawer.classList.add('active');
    });

    if (closeWishlistDrawerBtn) {
      closeWishlistDrawerBtn.addEventListener('click', () => {
        wishlistDrawer.classList.remove('active');
      });
    }
  }

  function renderWishlistDrawerItems() {
    const listContainer = document.getElementById('wishlistItemsContainer');
    if (!listContainer) return;

    if (state.wishlist.length === 0) {
      listContainer.innerHTML = `
        <div class="wishlist-empty-state">
          <i class="fa-regular fa-heart"></i>
          <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Your Wishlist is Empty</h4>
          <p style="font-size: 0.8125rem;">Save your favorite rooms and suites to compare rates and plan your perfect stay.</p>
        </div>
      `;
      return;
    }

    let html = '';
    state.wishlist.forEach(id => {
      const room = roomsData.find(r => r.id === id);
      if (!room) return;
      html += `
        <div class="wishlist-item-card">
          <img src="${room.image}" alt="${room.name}" class="wishlist-item-thumb">
          <div class="wishlist-item-info">
            <h5>${room.name}</h5>
            <p>${formatCurrency(room.basePriceUSD)} <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: normal;">/ night</span></p>
          </div>
          <button class="wishlist-item-remove" data-remove-id="${room.id}" title="Remove"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      `;
    });

    listContainer.innerHTML = html;

    listContainer.querySelectorAll('.wishlist-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rid = e.target.closest('[data-remove-id]').getAttribute('data-remove-id');
        toggleWishlist(rid);
      });
    });
  }

  updateWishlistUI();

  // --------------------------------------------------------------------------
  // 9. DINING: SAMPLE MENU & TABLE RESERVATION
  // --------------------------------------------------------------------------
  const openMenuModalBtn = document.getElementById('openMenuModalBtn');
  const diningMenuModal = document.getElementById('diningMenuModal');
  const menuTabs = document.querySelectorAll('.menu-tab-pill');

  if (openMenuModalBtn && diningMenuModal) {
    openMenuModalBtn.addEventListener('click', () => {
      renderMenuTab('starters');
      openModal(diningMenuModal);
    });

    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderMenuTab(tab.getAttribute('data-menu-category'));
      });
    });
  }

  function renderMenuTab(category) {
    const menuItemsList = document.getElementById('menuItemsList');
    if (!menuItemsList) return;

    const items = menuData[category] || [];
    menuItemsList.innerHTML = items.map(item => `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 1.125rem 0; border-bottom: 1px solid var(--border-color); gap: 1rem;">
        <div style="flex-grow: 1;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <h5 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">${item.name}</h5>
            <span class="badge badge-gold" style="font-size: 0.65rem;">${item.tag}</span>
          </div>
          <p style="font-size: 0.8125rem; color: var(--text-secondary);">${item.desc}</p>
        </div>
        <div style="font-family: var(--font-serif); font-size: 1.125rem; font-weight: 700; color: var(--accent-gold); white-space: nowrap;">
          ${formatCurrency(item.priceUSD)}
        </div>
      </div>
    `).join('');
  }

  // Reserve Table Modal
  const reserveTableBtn = document.getElementById('reserveTableBtn');
  const tableModal = document.getElementById('reserveTableModal');
  const tableForm = document.getElementById('tableReservationForm');

  if (reserveTableBtn && tableModal) {
    reserveTableBtn.addEventListener('click', () => {
      openModal(tableModal);
    });
  }

  if (tableForm) {
    tableForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('tableGuestName').value;
      const guests = document.getElementById('tablePartySize').value;
      const time = document.getElementById('tableTimeSlot').value;
      closeModal(tableModal);
      showToast('Table Reserved!', `Thank you ${guestName}, your table for ${guests} guests at ${time} is booked.`, 'fa-utensils');
    });
  }

  // --------------------------------------------------------------------------
  // 9.5 CURATED RESORT EXPERIENCES MODAL
  // --------------------------------------------------------------------------
  const expModal = document.getElementById('experienceDetailsModal');
  let currentActiveExp = null;

  function openExperienceModal(expId) {
    const exp = experiencesData[expId];
    if (!exp || !expModal) return;

    currentActiveExp = exp;

    const imgEl = document.getElementById('expModalImg');
    const tagEl = document.getElementById('expModalTag');
    const titleEl = document.getElementById('expModalTitle');
    const taglineEl = document.getElementById('expModalTagline');
    const subtitleEl = document.getElementById('expModalSubtitle');
    const priceEl = document.getElementById('expModalPrice');
    const priceNoteEl = document.getElementById('expModalPriceNote');
    const descEl = document.getElementById('expModalDesc');
    const specsGridEl = document.getElementById('expModalSpecsGrid');
    const highlightsEl = document.getElementById('expModalHighlights');
    const whatsappBtn = document.getElementById('expModalWhatsappBtn');

    if (imgEl) {
      imgEl.src = exp.image;
      imgEl.alt = exp.title;
    }
    if (tagEl) tagEl.textContent = exp.tag;
    if (titleEl) titleEl.textContent = exp.title;
    if (taglineEl) taglineEl.textContent = exp.tagline;
    if (subtitleEl) subtitleEl.textContent = exp.tagline;

    if (priceEl) {
      if (exp.priceType === 'complimentary') {
        priceEl.textContent = 'Complimentary';
        priceEl.style.color = '#10b981';
      } else {
        priceEl.textContent = formatCurrency(exp.priceUSD);
        priceEl.style.color = 'var(--text-primary)';
      }
    }
    if (priceNoteEl) priceNoteEl.textContent = exp.priceNote;
    if (descEl) descEl.textContent = exp.desc;

    // Build specs HTML
    if (specsGridEl) {
      specsGridEl.innerHTML = exp.specs.map(spec => `
        <div class="exp-spec-item">
          <div class="exp-spec-icon"><i class="fa-solid ${spec.icon}"></i></div>
          <div>
            <div class="exp-spec-label">${spec.label}</div>
            <div class="exp-spec-val">${spec.value}</div>
          </div>
        </div>
      `).join('');
    }

    // Build highlights HTML
    if (highlightsEl) {
      highlightsEl.innerHTML = exp.highlights.map(item => `
        <li class="exp-highlight-item">
          <i class="fa-solid fa-circle-check"></i>
          <span>${item}</span>
        </li>
      `).join('');
    }

    // Update WhatsApp link with pre-filled message
    if (whatsappBtn) {
      const msg = `Hello Novotel Concierge, I would like to inquire about reserving the "${exp.title}" experience (${exp.tag}).`;
      whatsappBtn.href = `https://wa.me/33493000000?text=${encodeURIComponent(msg)}`;
    }

    openModal(expModal);
  }

  // Reserve button in modal
  const expReserveBtn = document.getElementById('expModalReserveBtn');
  if (expReserveBtn) {
    expReserveBtn.addEventListener('click', () => {
      if (!currentActiveExp) return;
      closeModal(expModal);
      showToast(
        'Experience Reserved!',
        `Your reservation request for "${currentActiveExp.title}" has been placed. Our Concierge Desk will coordinate your itinerary.`,
        'fa-circle-check'
      );
    });
  }

  // Bind all buttons with .experience-explore-btn
  document.querySelectorAll('.experience-explore-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const expId = e.currentTarget.getAttribute('data-exp-id');
      if (expId) {
        openExperienceModal(expId);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 10. MEETINGS & EVENTS ENQUIRY
  // --------------------------------------------------------------------------
  const openEventModalBtn = document.getElementById('openEventModalBtn');
  const eventModal = document.getElementById('eventEnquiryModal');
  const eventForm = document.getElementById('eventEnquiryForm');

  if (openEventModalBtn && eventModal) {
    openEventModalBtn.addEventListener('click', () => {
      openModal(eventModal);
    });
  }

  if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('eventContactName').value;
      closeModal(eventModal);
      showToast('Proposal Requested!', `Thank you ${name}. Our dedicated Events Concierge will contact you within 24 hours.`, 'fa-handshake');
    });
  }

  // --------------------------------------------------------------------------
  // 11. SPECIAL OFFERS: CLAIM PROMO CODE AUTO-FILL
  // --------------------------------------------------------------------------
  document.querySelectorAll('.claim-offer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.target.getAttribute('data-promo-code');
      const promoInput = document.getElementById('promoCodeInput');
      if (promoInput) {
        promoInput.value = code;
        showToast('Promo Code Applied', `Special code "${code}" is activated in the booking engine!`, 'fa-tag');
        const bookingSection = document.getElementById('bookingEngineSection');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
          promoInput.focus();
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 12. GALLERY & INTERACTIVE LIGHTBOX
  // --------------------------------------------------------------------------
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-pill');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  function openLightbox(index) {
    state.currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = galleryData[state.currentLightboxIndex];
    if (!item) return;

    lightboxImg.src = item.image;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightboxCounter.textContent = `${state.currentLightboxIndex + 1} / ${galleryData.length}`;
  }

  function nextLightbox() {
    state.currentLightboxIndex = (state.currentLightboxIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    state.currentLightboxIndex = (state.currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
  });

  // --------------------------------------------------------------------------
  // 13. GUEST REVIEWS CAROUSEL
  // --------------------------------------------------------------------------
  const reviewsSlider = document.getElementById('reviewsSlider');
  const reviewSlides = document.querySelectorAll('.review-slide');
  const reviewDots = document.querySelectorAll('.review-dot');
  const reviewPrevBtn = document.getElementById('reviewPrevBtn');
  const reviewNextBtn = document.getElementById('reviewNextBtn');

  function showReviewSlide(idx) {
    if (!reviewsSlider || !reviewSlides.length) return;
    state.activeReviewIndex = idx;
    reviewsSlider.style.transform = `translateX(-${idx * 100}%)`;
    reviewDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  function nextReview() {
    const next = (state.activeReviewIndex + 1) % reviewSlides.length;
    showReviewSlide(next);
  }

  function prevReview() {
    const prev = (state.activeReviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
    showReviewSlide(prev);
  }

  if (reviewNextBtn) reviewNextBtn.addEventListener('click', nextReview);
  if (reviewPrevBtn) reviewPrevBtn.addEventListener('click', prevReview);

  reviewDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-review-index'), 10);
      showReviewSlide(idx);
    });
  });

  // Auto-play review slider with pause on hover
  state.reviewTimer = setInterval(nextReview, 7000);
  const reviewsWrap = document.querySelector('.reviews-carousel-wrap');
  if (reviewsWrap) {
    reviewsWrap.addEventListener('mouseenter', () => clearInterval(state.reviewTimer));
    reviewsWrap.addEventListener('mouseleave', () => state.reviewTimer = setInterval(nextReview, 7000));
  }

  // --------------------------------------------------------------------------
  // 14. FAQ ACCORDION
  // --------------------------------------------------------------------------
  document.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const body = item.querySelector('.faq-answer-collapse');
      const isActive = item.classList.contains('active');

      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.faq-answer-collapse');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 15. CONTACT & NEWSLETTER FORMS
  // --------------------------------------------------------------------------
  const mainContactForm = document.getElementById('mainContactForm');
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      showToast('Message Received', `Thank you ${name}. Our hospitality team will reply shortly.`, 'fa-paper-plane');
      mainContactForm.reset();
    });
  }

  const footerNewsletterForm = document.getElementById('footerNewsletterForm');
  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('footerNewsletterEmail').value;
      showToast('Exclusive Welcome Offer!', `Thank you for subscribing (${email}). Use code NOVOTEL10 for 10% off your first stay!`, 'fa-envelope-open-text');
      footerNewsletterForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 16. MODAL UTILITY HELPERS
  // --------------------------------------------------------------------------
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal(modal);
      });
    }
  });

  // --------------------------------------------------------------------------
  // 17. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 18. TOAST NOTIFICATION ENGINE
  // --------------------------------------------------------------------------
  function showToast(title, message, iconClass = 'fa-circle-check') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <button style="color: #94a3b8; font-size: 0.875rem;" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // --------------------------------------------------------------------------
  // 19. ADMIN & STAFF MANAGEMENT PORTAL ENGINE
  // --------------------------------------------------------------------------
  const adminState = {
    isLoggedIn: localStorage.getItem('novotel_admin_logged_in') === 'true',
    staffName: localStorage.getItem('novotel_admin_name') || 'Alexandre Laurent',
    staffRole: localStorage.getItem('novotel_admin_role') || 'Front Desk Manager',
    reservations: [
      { id: 'NV-8491', guest: 'Lady Eleanor Vance', room: 'The Grand Horizon Penthouse (#501)', dates: 'Oct 15 - Oct 19 (4 n)', rateUSD: 3400, status: 'Checked-In' },
      { id: 'NV-8492', guest: 'Marcus Lindqvist', room: 'Deluxe Horizon Panorama (#308)', dates: 'Oct 15 - Oct 18 (3 n)', rateUSD: 960, status: 'Checked-In' },
      { id: 'NV-8493', guest: 'Dr. David Sterling', room: 'Executive Business Suite (#412)', dates: 'Oct 16 - Oct 20 (4 n)', rateUSD: 1720, status: 'Confirmed' },
      { id: 'NV-8494', guest: 'Hélène & Pierre Morin', room: 'Family Harmony Suite (#204)', dates: 'Oct 16 - Oct 21 (5 n)', rateUSD: 2450, status: 'Confirmed' },
      { id: 'NV-8495', guest: 'Sophia Chen', room: 'Superior Coastal Room (#319)', dates: 'Oct 17 - Oct 19 (2 n)', rateUSD: 490, status: 'Pending Deposit' }
    ],
    conciergeTasks: [
      { id: 1, guest: 'Lady Eleanor Vance (Penthouse #501)', task: 'Private Catamaran Sunset Charter with Dom Pérignon', time: 'Today, 5:00 PM', done: false, icon: 'fa-sailboat' },
      { id: 2, guest: 'Dr. David Sterling (Suite #412)', task: 'Mercedes Maybach Chauffeur Transfer from Nice Airport', time: 'Tomorrow, 11:30 AM', done: false, icon: 'fa-van-shuttle' },
      { id: 3, guest: 'Marcus Lindqvist (Suite #308)', task: 'The Horizon Brasserie Chef Tasting Table for 2 with Wine Pairing', time: 'Tonight, 8:00 PM', done: true, icon: 'fa-utensils' },
      { id: 4, guest: 'Hélène Morin (Suite #204)', task: 'Kids Club Welcome Pack & Stroller Delivered to Suite', time: 'Tomorrow, 9:00 AM', done: false, icon: 'fa-people-roof' }
    ],
    staffMembers: [
      {
        id: 'GM-1001',
        name: 'Hélène Beaumont',
        role: 'General Manager',
        dept: 'Executive Office',
        shift: '08:00 - 18:00',
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 01',
        email: 'h.beaumont@novotel.com',
        radio: 'Ch. 1 Management',
        tenure: '8 Years with Accor',
        languages: 'French, English, German',
        certifications: 'Cornell Hospitality Leadership, Clefs d\'Or Honorary Member',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        zone: 'Executive Suite & Property-Wide'
      },
      {
        id: 'FD-2041',
        name: 'Alexandre Laurent',
        role: 'Front Desk & Guest Relations Manager',
        dept: 'Front Office',
        shift: '07:00 - 15:30',
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 02',
        email: 'a.laurent@novotel.com',
        radio: 'Ch. 2 Front Desk',
        tenure: '4 Years with Novotel',
        languages: 'French, English, Spanish',
        certifications: 'Amadeus CRS Certified, Opera Cloud PMS Master Trainer',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
        zone: 'Main Lobby & VIP Reception'
      },
      {
        id: 'CG-3012',
        name: 'Jean-Marc Dupont',
        role: 'Head Concierge',
        dept: 'Concierge & VIP Services',
        shift: '09:00 - 18:00',
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 03',
        email: 'concierge@novotel.com',
        radio: 'Ch. 3 Concierge',
        tenure: '12 Years Hospitality',
        languages: 'French, English, Italian, Russian',
        certifications: 'Union Internationale des Clefs d\'Or (Golden Keys)',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        zone: 'Concierge Desk & Private Marina'
      },
      {
        id: 'FB-4022',
        name: 'Chef Antoine Roussel',
        role: 'Executive Chef',
        dept: 'Culinary & F&B',
        shift: '10:00 - 22:00 (Split)',
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 04',
        email: 'chef.roussel@novotel.com',
        radio: 'Ch. 5 Kitchen Operations',
        tenure: '6 Years with Novotel',
        languages: 'French, English',
        certifications: 'Michelin Star Trained, Master Cuisinier de France',
        avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
        zone: 'The Horizon Brasserie & Banquets'
      },
      {
        id: 'RV-5018',
        name: 'Sophie Dubois',
        role: 'Director of Revenue & Reservations',
        dept: 'Revenue & Sales',
        shift: '08:30 - 17:30',
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 05',
        email: 's.dubois@novotel.com',
        radio: 'Ch. 1 Management',
        tenure: '5 Years with Accor',
        languages: 'French, English, Dutch',
        certifications: 'CRME Certified, IDeaS G3 RMS Specialist',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        zone: 'Commercial & Yield Office'
      },
      {
        id: 'WL-6031',
        name: 'Camille Moreau',
        role: 'Spa & Wellness Director',
        dept: 'Wellness & Recreation',
        shift: '10:00 - 19:00',
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 06',
        email: 'spa@novotel.com',
        radio: 'Ch. 6 Spa Operations',
        tenure: '3 Years with Novotel',
        languages: 'French, English, Japanese',
        certifications: 'CIDESCO International Diploma, Ayurveda Master',
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
        zone: 'Le Spa Hydrotherapy & Infinity Pool'
      },
      {
        id: 'HK-7015',
        name: 'Isabelle Fontaine',
        role: 'Executive Housekeeper',
        dept: 'Housekeeping & Rooms',
        shift: '06:30 - 15:00',
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 07',
        email: 'housekeeping@novotel.com',
        radio: 'Ch. 4 Housekeeping',
        tenure: '7 Years with Accor',
        languages: 'French, English, Portuguese',
        certifications: 'Bespoke Luxury Linen Care, Eco-Audit Gold Standard',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        zone: 'All Guest Floors & Penthouse Suites'
      },
      {
        id: 'SC-8004',
        name: 'Marc Delacroix',
        role: 'Chief of Security & VIP Protection',
        dept: 'Security & Safety',
        shift: '14:00 - 22:30',
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 08',
        email: 'security@novotel.com',
        radio: 'Ch. 8 Security Command',
        tenure: '9 Years Maritime & Hotel',
        languages: 'French, English, Arabic',
        certifications: 'First Responder Level 2, Maritime Port Security Officer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        zone: 'Resort Perimeter, Helipad & Marina'
      }
    ]
  };

  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const mobileAdminLoginBtn = document.getElementById('mobileAdminLoginBtn');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const adminDashboardModal = document.getElementById('adminDashboardModal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const fillDemoAdminBtn = document.getElementById('fillDemoAdminBtn');
  const toggleAdminPassBtn = document.getElementById('toggleAdminPassBtn');
  const adminPasswordInput = document.getElementById('adminPasswordInput');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  function updateAdminNavButton() {
    if (!adminLoginBtn) return;
    if (adminState.isLoggedIn) {
      adminLoginBtn.classList.add('logged-in');
      adminLoginBtn.innerHTML = `
        <i class="fa-solid fa-user-shield" style="color: #10b981;"></i>
        <span class="admin-status-dot"></span>
        <span class="admin-btn-text">Portal</span>
      `;
      adminLoginBtn.title = `Admin Portal Active (${adminState.staffName} - ${adminState.staffRole})`;
    } else {
      adminLoginBtn.classList.remove('logged-in');
      adminLoginBtn.innerHTML = `
        <i class="fa-solid fa-user-shield"></i>
        <span class="admin-btn-text">Admin</span>
      `;
      adminLoginBtn.title = 'Staff & Admin Portal Login';
    }
  }

  function handleAdminButtonClick() {
    if (adminState.isLoggedIn) {
      renderAdminDashboard();
      openModal(adminDashboardModal);
    } else {
      openModal(adminLoginModal);
    }
  }

  if (adminLoginBtn) adminLoginBtn.addEventListener('click', handleAdminButtonClick);
  if (mobileAdminLoginBtn) mobileAdminLoginBtn.addEventListener('click', () => {
    closeMobileNav();
    handleAdminButtonClick();
  });

  // Demo auto-fill
  if (fillDemoAdminBtn) {
    fillDemoAdminBtn.addEventListener('click', () => {
      document.getElementById('adminEmailInput').value = 'admin@novotel.com';
      if (adminPasswordInput) adminPasswordInput.value = 'novotel2026';
      showToast('Demo Credentials Loaded', 'Email: admin@novotel.com, Pass: novotel2026', 'fa-key');
    });
  }

  // Toggle password visibility
  if (toggleAdminPassBtn && adminPasswordInput) {
    toggleAdminPassBtn.addEventListener('click', () => {
      const isPass = adminPasswordInput.type === 'password';
      adminPasswordInput.type = isPass ? 'text' : 'password';
      toggleAdminPassBtn.querySelector('i').className = isPass ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });
  }

  // Admin login submit
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('adminEmailInput').value.trim();
      const pass = adminPasswordInput ? adminPasswordInput.value : '';
      const role = document.getElementById('adminRoleSelect').value;

      // Extract name from role choice
      let name = 'Alexandre Laurent';
      if (role.includes('General Manager')) name = 'Hélène Beaumont';
      if (role.includes('Concierge')) name = 'Jean-Marc Dupont';
      if (role.includes('Executive Chef')) name = 'Chef Antoine Roussel';
      if (role.includes('Revenue')) name = 'Sophie Dubois';
      if (role.includes('Spa')) name = 'Camille Moreau';
      if (role.includes('Housekeeper')) name = 'Isabelle Fontaine';
      if (role.includes('Security')) name = 'Marc Delacroix';

      adminState.isLoggedIn = true;
      adminState.staffName = name;
      adminState.staffRole = role;

      localStorage.setItem('novotel_admin_logged_in', 'true');
      localStorage.setItem('novotel_admin_name', name);
      localStorage.setItem('novotel_admin_role', role);

      updateAdminNavButton();
      closeModal(adminLoginModal);
      renderAdminDashboard();
      openModal(adminDashboardModal);

      showToast('Access Granted', `Welcome back, ${name} (${role})`, 'fa-circle-check');
    });
  }

  // Admin logout
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      adminState.isLoggedIn = false;
      localStorage.removeItem('novotel_admin_logged_in');
      localStorage.removeItem('novotel_admin_name');
      localStorage.removeItem('novotel_admin_role');

      updateAdminNavButton();
      closeModal(adminDashboardModal);
      showToast('Signed Out', 'You have securely signed out of the Novotel Management Console.', 'fa-arrow-right-from-bracket');
    });
  }

  // Shift clock
  function updateShiftClock() {
    const clockEl = document.getElementById('adminShiftClock');
    if (!clockEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    clockEl.textContent = `${dateStr} • ${timeStr}`;
  }
  setInterval(updateShiftClock, 1000);
  updateShiftClock();

  // Dashboard Tabs Switching
  document.querySelectorAll('.admin-tab-btn').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));

      tabBtn.classList.add('active');
      const targetId = `adminTab-${tabBtn.getAttribute('data-admin-tab')}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Render Dashboard
  function renderAdminDashboard() {
    const staffIdEl = document.getElementById('adminStaffIdentity');
    if (staffIdEl) {
      staffIdEl.textContent = `${adminState.staffName} • ${adminState.staffRole}`;
    }

    renderReservationsTable();
    renderInventoryTable();
    renderConciergeTasks();
    renderStaffTable();
  }

  // 1. Render Reservations Table
  function renderReservationsTable(searchQuery = '') {
    const tbody = document.getElementById('adminReservationsTbody');
    const badgeEl = document.getElementById('adminResCountBadge');
    if (!tbody) return;

    let list = adminState.reservations;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r => r.guest.toLowerCase().includes(q) || r.room.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }

    if (badgeEl) badgeEl.textContent = adminState.reservations.length;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No matching guest reservations found.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(r => {
      let statusBadge = '<span class="badge badge-navy">Confirmed</span>';
      if (r.status === 'Checked-In') {
        statusBadge = '<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">Checked In</span>';
      } else if (r.status === 'Pending Deposit') {
        statusBadge = '<span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);">Deposit Due</span>';
      }

      return `
        <tr>
          <td><strong style="font-family: monospace; color: var(--accent-gold);">${r.id}</strong></td>
          <td><strong>${r.guest}</strong></td>
          <td style="color: var(--text-secondary); font-size: 0.8125rem;">${r.room}</td>
          <td>${r.dates}</td>
          <td><strong>${formatCurrency(r.rateUSD)}</strong></td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; gap: 0.35rem;">
              <button type="button" class="btn btn-outline-dark btn-sm admin-checkin-btn" data-id="${r.id}" style="padding: 0.25rem 0.5rem; font-size: 0.6875rem;">
                ${r.status === 'Checked-In' ? '<i class="fa-solid fa-arrow-right-from-bracket"></i> Check Out' : '<i class="fa-solid fa-check"></i> Check In'}
              </button>
              <button type="button" class="btn btn-outline-dark btn-sm admin-folio-btn" data-id="${r.id}" style="padding: 0.25rem 0.5rem; font-size: 0.6875rem;" title="View Folio">
                <i class="fa-solid fa-receipt"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Check-in / Check-out button listeners
    tbody.querySelectorAll('.admin-checkin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const res = adminState.reservations.find(x => x.id === id);
        if (res) {
          if (res.status === 'Checked-In') {
            res.status = 'Checked-Out';
            showToast('Guest Checked Out', `${res.guest} has completed checkout. Room marked for housekeeping turn.`, 'fa-bell-concierge');
          } else {
            res.status = 'Checked-In';
            showToast('Guest Checked In', `Welcome keycards issued for ${res.guest} (${res.room}).`, 'fa-circle-check');
          }
          renderReservationsTable(document.getElementById('adminSearchGuest')?.value || '');
        }
      });
    });

    tbody.querySelectorAll('.admin-folio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const res = adminState.reservations.find(x => x.id === id);
        if (res) {
          showToast(`Folio for ${res.id}`, `Guest: ${res.guest} | Total Balance: ${formatCurrency(res.rateUSD)} | Status: Settled via Amex 3D-Secure.`, 'fa-receipt');
        }
      });
    });
  }

  // Live guest filter
  const adminSearchGuest = document.getElementById('adminSearchGuest');
  if (adminSearchGuest) {
    adminSearchGuest.addEventListener('input', (e) => {
      renderReservationsTable(e.target.value);
    });
  }

  // Add Walk-In Guest
  const adminAddWalkInBtn = document.getElementById('adminAddWalkInBtn');
  if (adminAddWalkInBtn) {
    adminAddWalkInBtn.addEventListener('click', () => {
      const guestName = prompt('Enter Walk-in Guest Full Name:', 'Viscount Charles Dupont');
      if (!guestName || !guestName.trim()) return;

      const newId = `NV-${Math.floor(1000 + Math.random() * 9000)}`;
      adminState.reservations.unshift({
        id: newId,
        guest: guestName.trim(),
        room: 'Deluxe Horizon Panorama (#305)',
        dates: 'Today - +2 nights',
        rateUSD: 640,
        status: 'Checked-In'
      });

      renderReservationsTable();
      showToast('Walk-In Check-In Completed', `Assigned ${guestName} to Deluxe Horizon Panorama (#305). Booking: ${newId}.`, 'fa-circle-check');
    });
  }

  // Export Ledger
  const adminExportLedgerBtn = document.getElementById('adminExportLedgerBtn');
  if (adminExportLedgerBtn) {
    adminExportLedgerBtn.addEventListener('click', () => {
      const csv = 'BookingID,Guest,Room,Dates,RateUSD,Status\n' +
        adminState.reservations.map(r => `"${r.id}","${r.guest}","${r.room}","${r.dates}",${r.rateUSD},"${r.status}"`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Novotel_Shift_Ledger_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('CSV Exported', 'Shift reservation ledger downloaded.', 'fa-file-csv');
    });
  }

  // 2. Render Inventory & Dynamic Rates Table
  function renderInventoryTable() {
    const tbody = document.getElementById('adminInventoryTbody');
    if (!tbody) return;

    tbody.innerHTML = roomsData.map(room => {
      return `
        <tr>
          <td>
            <strong>${room.name}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${room.size} &bull; ${room.capacity}</div>
          </td>
          <td>
            <strong style="font-size: 1.125rem; color: var(--text-primary);">${formatCurrency(room.basePriceUSD)}</strong>
            <span style="font-size: 0.6875rem; color: var(--text-muted);">/ night</span>
          </td>
          <td><span class="badge badge-navy">Available</span></td>
          <td>
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">
              In Allotment
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <button type="button" class="btn btn-outline-dark btn-sm admin-rate-btn" data-room-id="${room.id}" data-delta="-10" style="padding: 0.25rem 0.5rem; font-weight: 700;">
                -$10
              </button>
              <button type="button" class="btn btn-primary btn-sm admin-rate-btn" data-room-id="${room.id}" data-delta="10" style="padding: 0.25rem 0.5rem; font-weight: 700;">
                +$10
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach rate change listeners
    tbody.querySelectorAll('.admin-rate-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const roomId = e.currentTarget.getAttribute('data-room-id');
        const delta = parseInt(e.currentTarget.getAttribute('data-delta'), 10);
        const targetRoom = roomsData.find(r => r.id === roomId);
        if (targetRoom) {
          targetRoom.basePriceUSD = Math.max(50, targetRoom.basePriceUSD + delta);

          // Update data-base-price on matching room cards in the DOM
          document.querySelectorAll(`[data-room-id="${roomId}"] [data-base-price], .room-card:has([data-room-id="${roomId}"]) [data-base-price]`).forEach(el => {
            el.setAttribute('data-base-price', targetRoom.basePriceUSD);
          });

          updateAllPricesOnPage();
          renderInventoryTable();
          showToast('Room Rate Updated', `${targetRoom.name} rate adjusted by ${delta > 0 ? '+' : ''}$${delta} (Now ${formatCurrency(targetRoom.basePriceUSD)}/night). Live site updated!`, 'fa-arrow-trend-up');
        }
      });
    });
  }

  // 3. Render Concierge Tasks
  function renderConciergeTasks() {
    const listEl = document.getElementById('adminConciergeList');
    const badgeEl = document.getElementById('adminConciergeCountBadge');
    const tasksCountKpi = document.getElementById('adminTasksCount');
    if (!listEl) return;

    const pendingTasks = adminState.conciergeTasks.filter(t => !t.done);
    if (badgeEl) badgeEl.textContent = pendingTasks.length;
    if (tasksCountKpi) tasksCountKpi.textContent = pendingTasks.length;

    listEl.innerHTML = adminState.conciergeTasks.map(task => {
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem 1.25rem; gap: 1rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: rgba(212, 175, 55, 0.15); color: var(--accent-gold); display: flex; align-items: center; justify-content: center;">
              <i class="fa-solid ${task.icon}"></i>
            </div>
            <div>
              <div style="font-weight: 700; color: var(--text-primary); font-size: 0.875rem;">${task.task}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Guest: ${task.guest} &bull; Scheduled: <strong>${task.time}</strong></div>
            </div>
          </div>
          <div>
            <button type="button" class="btn ${task.done ? 'btn-outline-dark' : 'btn-primary'} btn-sm admin-task-toggle" data-id="${task.id}" style="font-size: 0.75rem;">
              ${task.done ? '<i class="fa-solid fa-check"></i> Fulfilled' : '<i class="fa-solid fa-circle-check"></i> Mark Fulfilled'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.admin-task-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        const task = adminState.conciergeTasks.find(t => t.id === id);
        if (task) {
          task.done = !task.done;
          renderConciergeTasks();
          showToast(task.done ? 'Task Completed' : 'Task Reopened', `Concierge task for ${task.guest} updated.`, 'fa-bell-concierge');
        }
      });
    });
  }

  // 4. Render Staff Directory & Roster
  let currentActiveStaff = null;

  function renderStaffTable(searchQuery = '', deptFilter = 'all') {
    const tbody = document.getElementById('adminStaffTbody');
    const badgeEl = document.getElementById('adminStaffCountBadge');
    if (!tbody) return;

    let list = adminState.staffMembers;
    if (deptFilter && deptFilter !== 'all') {
      list = list.filter(s => s.dept === deptFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q));
    }

    if (badgeEl) badgeEl.textContent = adminState.staffMembers.length;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No staff members match the selected criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(s => {
      let statusClass = 'on-duty';
      if (s.status === 'On Break') statusClass = 'on-break';
      if (s.status === 'Off Duty') statusClass = 'off-duty';

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <img src="${s.avatar}" alt="${s.name}" class="staff-table-avatar">
              <div>
                <strong>${s.name}</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${s.role}</div>
              </div>
            </div>
          </td>
          <td>
            <strong style="font-family: monospace; color: var(--accent-gold); font-size: 0.8125rem;">${s.id}</strong>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">${s.dept}</div>
          </td>
          <td>
            <div style="font-size: 0.8125rem; font-weight: 600; color: var(--text-primary);">${s.shift}</div>
            <div style="font-size: 0.6875rem; color: var(--text-muted);">${s.zone}</div>
          </td>
          <td>
            <div style="font-size: 0.8125rem; color: var(--text-primary);"><i class="fa-solid fa-walkie-talkie" style="color: var(--accent-gold); font-size: 0.75rem;"></i> ${s.radio}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${s.phone}</div>
          </td>
          <td>
            <span class="staff-duty-badge ${statusClass}">
              <span class="admin-status-dot" style="background: ${s.status === 'On Duty' ? '#10b981' : (s.status === 'On Break' ? '#f59e0b' : '#64748b')}; box-shadow: none;"></span>
              ${s.status}
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 0.35rem; align-items: center;">
              <button type="button" class="btn btn-outline-dark btn-sm admin-staff-view-btn" data-id="${s.id}" style="padding: 0.25rem 0.55rem; font-size: 0.6875rem;" title="View Staff Details">
                <i class="fa-solid fa-address-card"></i> Details
              </button>
              <button type="button" class="btn btn-outline-dark btn-sm admin-staff-duty-btn" data-id="${s.id}" style="padding: 0.25rem 0.5rem; font-size: 0.6875rem;" title="Change Duty Status">
                <i class="fa-solid fa-clock-rotate-left"></i>
              </button>
              <button type="button" class="btn btn-primary btn-sm admin-staff-page-btn" data-id="${s.id}" style="padding: 0.25rem 0.5rem; font-size: 0.6875rem;" title="Page on Radio">
                <i class="fa-solid fa-radio"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach listeners
    tbody.querySelectorAll('.admin-staff-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openStaffDetailsModal(id);
      });
    });

    tbody.querySelectorAll('.admin-staff-duty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const staff = adminState.staffMembers.find(x => x.id === id);
        if (staff) {
          if (staff.status === 'On Duty') staff.status = 'On Break';
          else if (staff.status === 'On Break') staff.status = 'Off Duty';
          else staff.status = 'On Duty';

          renderStaffTable(document.getElementById('adminSearchStaff')?.value || '', document.getElementById('adminFilterStaffDept')?.value || 'all');
          showToast('Duty Status Updated', `${staff.name} is now marked as ${staff.status}.`, 'fa-clock');
        }
      });
    });

    tbody.querySelectorAll('.admin-staff-page-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const staff = adminState.staffMembers.find(x => x.id === id);
        if (staff) {
          showToast('Direct Page Dispatched', `Radio alert sent to ${staff.name} on ${staff.radio}.`, 'fa-broadcast-tower');
        }
      });
    });
  }

  // Open Staff Details Modal
  function openStaffDetailsModal(staffId) {
    const staff = adminState.staffMembers.find(s => s.id === staffId);
    const modal = document.getElementById('staffDetailsModal');
    if (!staff || !modal) return;

    currentActiveStaff = staff;

    const avatarEl = document.getElementById('staffDetailAvatar');
    const nameEl = document.getElementById('staffDetailName');
    const roleEl = document.getElementById('staffDetailRole');
    const idEl = document.getElementById('staffDetailId');
    const deptEl = document.getElementById('staffDetailDept');
    const statusBadgeEl = document.getElementById('staffDetailStatusBadge');
    const phoneEl = document.getElementById('staffDetailPhone');
    const emailEl = document.getElementById('staffDetailEmail');
    const radioEl = document.getElementById('staffDetailRadio');
    const shiftEl = document.getElementById('staffDetailShift');
    const zoneEl = document.getElementById('staffDetailZone');
    const tenureEl = document.getElementById('staffDetailTenure');
    const certEl = document.getElementById('staffDetailCertifications');
    const langEl = document.getElementById('staffDetailLanguages');

    if (avatarEl) avatarEl.src = staff.avatar;
    if (nameEl) nameEl.textContent = staff.name;
    if (roleEl) roleEl.textContent = staff.role;
    if (idEl) idEl.textContent = staff.id;
    if (deptEl) deptEl.textContent = staff.dept;
    if (phoneEl) phoneEl.textContent = staff.phone;
    if (emailEl) emailEl.textContent = staff.email;
    if (radioEl) radioEl.textContent = staff.radio;
    if (shiftEl) shiftEl.textContent = staff.shift;
    if (zoneEl) zoneEl.textContent = staff.zone;
    if (tenureEl) tenureEl.textContent = staff.tenure;
    if (certEl) certEl.textContent = staff.certifications;
    if (langEl) langEl.textContent = staff.languages;

    if (statusBadgeEl) {
      let badgeBg = 'rgba(16, 185, 129, 0.2)';
      let badgeColor = '#10b981';
      if (staff.status === 'On Break') { badgeBg = 'rgba(245, 158, 11, 0.2)'; badgeColor = '#f59e0b'; }
      if (staff.status === 'Off Duty') { badgeBg = 'rgba(100, 116, 139, 0.2)'; badgeColor = '#64748b'; }

      statusBadgeEl.style.background = badgeBg;
      statusBadgeEl.style.color = badgeColor;
      statusBadgeEl.style.border = `1px solid ${badgeColor}`;
      statusBadgeEl.textContent = staff.status;
    }

    openModal(modal);
  }

  // Staff Modal Actions
  const staffToggleDutyBtn = document.getElementById('staffToggleDutyBtn');
  if (staffToggleDutyBtn) {
    staffToggleDutyBtn.addEventListener('click', () => {
      if (!currentActiveStaff) return;
      if (currentActiveStaff.status === 'On Duty') currentActiveStaff.status = 'On Break';
      else if (currentActiveStaff.status === 'On Break') currentActiveStaff.status = 'Off Duty';
      else currentActiveStaff.status = 'On Duty';

      openStaffDetailsModal(currentActiveStaff.id);
      renderStaffTable(document.getElementById('adminSearchStaff')?.value || '', document.getElementById('adminFilterStaffDept')?.value || 'all');
      showToast('Duty Status Changed', `${currentActiveStaff.name} is now ${currentActiveStaff.status}.`, 'fa-clock');
    });
  }

  const staffPageBtn = document.getElementById('staffPageBtn');
  if (staffPageBtn) {
    staffPageBtn.addEventListener('click', () => {
      if (!currentActiveStaff) return;
      showToast('Direct Page Dispatched', `Urgent page sent to ${currentActiveStaff.name} on ${currentActiveStaff.radio}.`, 'fa-broadcast-tower');
    });
  }

  // Staff Search & Department Filter
  const adminSearchStaff = document.getElementById('adminSearchStaff');
  const adminFilterStaffDept = document.getElementById('adminFilterStaffDept');

  if (adminSearchStaff) {
    adminSearchStaff.addEventListener('input', () => {
      renderStaffTable(adminSearchStaff.value, adminFilterStaffDept?.value || 'all');
    });
  }
  if (adminFilterStaffDept) {
    adminFilterStaffDept.addEventListener('change', () => {
      renderStaffTable(adminSearchStaff?.value || '', adminFilterStaffDept.value);
    });
  }

  // Add Staff Modal Trigger
  const adminAddStaffBtn = document.getElementById('adminAddStaffBtn');
  const addStaffModal = document.getElementById('addStaffModal');
  const addStaffForm = document.getElementById('addStaffForm');

  if (adminAddStaffBtn && addStaffModal) {
    adminAddStaffBtn.addEventListener('click', () => {
      openModal(addStaffModal);
    });
  }

  if (addStaffForm) {
    addStaffForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('newStaffName').value.trim();
      const dept = document.getElementById('newStaffDept').value;
      const role = document.getElementById('newStaffRole').value.trim();
      const shift = document.getElementById('newStaffShift').value;
      const radio = document.getElementById('newStaffRadio').value.trim();
      const email = document.getElementById('newStaffEmail').value.trim();
      const zone = document.getElementById('newStaffZone').value.trim();

      const newId = `ST-${Math.floor(1000 + Math.random() * 9000)}`;
      adminState.staffMembers.unshift({
        id: newId,
        name: name,
        role: role,
        dept: dept,
        shift: shift,
        status: 'On Duty',
        phone: '+33 (0)4 93 00 01 09',
        email: email,
        radio: radio || 'Ch. 2 Front Desk',
        tenure: 'Newly Appointed',
        languages: 'French, English',
        certifications: 'Accor Onboarding Excellence 2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        zone: zone || 'Property-Wide'
      });

      renderStaffTable();
      closeModal(addStaffModal);
      addStaffForm.reset();
      showToast('Staff Member Registered', `${name} (${role}) registered with Ref ID ${newId}.`, 'fa-circle-check');
    });
  }

  // Export Staff Roster
  const adminExportStaffBtn = document.getElementById('adminExportStaffBtn');
  if (adminExportStaffBtn) {
    adminExportStaffBtn.addEventListener('click', () => {
      const csv = 'ID,Name,Role,Department,Shift,DutyStatus,Radio,Phone,Email\n' +
        adminState.staffMembers.map(s => `"${s.id}","${s.name}","${s.role}","${s.dept}","${s.shift}","${s.status}","${s.radio}","${s.phone}","${s.email}"`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Novotel_Staff_Roster_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Roster Exported', 'Staff duty roster exported to CSV.', 'fa-file-csv');
    });
  }

  // Reset Demo Data
  const adminResetDataBtn = document.getElementById('adminResetDataBtn');
  if (adminResetDataBtn) {
    adminResetDataBtn.addEventListener('click', () => {
      adminState.conciergeTasks.forEach(t => t.done = false);
      renderAdminDashboard();
      showToast('Demo Data Restored', 'All sample reservations and tasks restored to default state.', 'fa-rotate-left');
    });
  }

  // Initialize admin state on page load
  updateAdminNavButton();

  // Expose globally for HTML onclick handlers
  window.openExperienceModal = openExperienceModal;
  window.openStaffDetailsModal = openStaffDetailsModal;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.showToast = showToast;
  window.adminState = adminState;
});
