const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create the master SVG matching the user's uploaded "kilimonet logo.jpg"
const masterSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <!-- Background subtle radial ambient light -->
    <radialGradient id="bgGleam" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fdfdfd" />
    </radialGradient>

    <!-- Vertical Column - Left Dark Face -->
    <linearGradient id="stemLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#24282c" />
      <stop offset="40%" stop-color="#181b1e" />
      <stop offset="100%" stop-color="#0e1012" />
    </linearGradient>

    <!-- Vertical Column - Front/Right Bevel -->
    <linearGradient id="stemRightBevel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3d444c" />
      <stop offset="50%" stop-color="#4f5963" />
      <stop offset="100%" stop-color="#2b3137" />
    </linearGradient>

    <!-- Vertical Column - Top Bevel -->
    <linearGradient id="stemTopBevel" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#55606b" />
      <stop offset="100%" stop-color="#2f353b" />
    </linearGradient>

    <!-- Circuit Trace Gold -->
    <linearGradient id="circuitGold" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#c9972c" />
      <stop offset="50%" stop-color="#fad66d" />
      <stop offset="100%" stop-color="#e8b438" />
    </linearGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#ffd76a" flood-opacity="0.45" />
    </filter>

    <!-- Upper Arm - Emerald Green Top Face -->
    <linearGradient id="greenTopFace" x1="0%" y1="100%" x2="80%" y2="0%">
      <stop offset="0%" stop-color="#006c31" />
      <stop offset="45%" stop-color="#008a3f" />
      <stop offset="85%" stop-color="#00a84d" />
      <stop offset="100%" stop-color="#14bd5c" />
    </linearGradient>

    <!-- Upper Arm - Emerald Green Highlight Edge -->
    <linearGradient id="greenBevelHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2fe07b" />
      <stop offset="100%" stop-color="#009945" />
    </linearGradient>

    <!-- Upper Arm - Underside Shadow -->
    <linearGradient id="greenUnderside" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#004a21" />
      <stop offset="100%" stop-color="#002d14" />
    </linearGradient>

    <!-- Lower Arm - Chrome Silver Top Face -->
    <linearGradient id="silverTopFace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#e8edf1" />
      <stop offset="70%" stop-color="#c8d2db" />
      <stop offset="100%" stop-color="#a6b2bd" />
    </linearGradient>

    <!-- Lower Arm - Silver Front/Side Face -->
    <linearGradient id="silverSideFace" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#bdc6cf" />
      <stop offset="50%" stop-color="#939fa9" />
      <stop offset="100%" stop-color="#67737d" />
    </linearGradient>

    <!-- Lower Arm - Bevel Edge -->
    <linearGradient id="silverBevel" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#5a646c" />
      <stop offset="100%" stop-color="#8a96a0" />
    </linearGradient>

    <!-- 3D Gold Ribbon - Body Gradient -->
    <linearGradient id="goldRibbonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b67f17" />
      <stop offset="20%" stop-color="#dfa931" />
      <stop offset="45%" stop-color="#fae27c" />
      <stop offset="70%" stop-color="#e5b236" />
      <stop offset="90%" stop-color="#c28b1e" />
      <stop offset="100%" stop-color="#eed168" />
    </linearGradient>

    <!-- Gold Ribbon - Upper Sheen Edge -->
    <linearGradient id="goldRibbonSheen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff5b8" />
      <stop offset="50%" stop-color="#ffd966" />
      <stop offset="100%" stop-color="#b88319" />
    </linearGradient>

    <!-- Gold Ribbon - Inner Rim Shadow -->
    <linearGradient id="goldInnerRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6d4808" />
      <stop offset="40%" stop-color="#9b6c13" />
      <stop offset="100%" stop-color="#553805" />
    </linearGradient>

    <!-- Soft Drop Shadow for Ribbon and Arms -->
    <filter id="softShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="12" stdDeviation="10" flood-color="#0b1612" flood-opacity="0.32" />
    </filter>

    <filter id="castShadowOnK" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="7" result="blur" />
      <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.45 0"/>
    </filter>

    <!-- Wordmark Letter O Gold Ring Gradient -->
    <radialGradient id="goldRingGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fae482" />
      <stop offset="40%" stop-color="#e5b035" />
      <stop offset="80%" stop-color="#be871b" />
      <stop offset="100%" stop-color="#8a5c0b" />
    </radialGradient>
  </defs>

  <!-- Background (Pure Crisp White) -->
  <rect width="1000" height="1000" fill="#ffffff" />

  <!-- ============================================================== -->
  <!-- 3D "K" EMBLEM                                                  -->
  <!-- ============================================================== -->
  <g id="k-emblem" transform="translate(0, -10)">

    <!-- 1. SHADOW UNDER K -->
    <ellipse cx="490" cy="635" rx="260" ry="24" fill="#000000" opacity="0.12" filter="blur(14px)" />
    <ellipse cx="480" cy="630" rx="190" ry="14" fill="#000000" opacity="0.18" filter="blur(7px)" />

    <!-- 2. VERTICAL STEM (LEFT PILLAR) -->
    <!-- Stem Back / Bottom Base Depth -->
    <polygon points="340,605 455,626 455,610 340,590" fill="#0a0c0e" />

    <!-- Stem Left Main Dark Face -->
    <polygon points="340,215 455,160 455,618 340,600" fill="url(#stemLeftGrad)" />

    <!-- Stem Top Bevel Edge -->
    <polygon points="340,215 455,160 458,162 343,218" fill="url(#stemTopBevel)" />

    <!-- Circuit Board Pattern on Left Face -->
    <g id="circuit-traces" filter="url(#goldGlow)">
      <!-- Left Trace (Short, single node) -->
      <path d="M 366,540 L 366,375 L 392,342 L 418,342" 
            fill="none" stroke="url(#circuitGold)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="426" cy="342" r="14" fill="url(#circuitGold)" />
      <circle cx="426" cy="342" r="7" fill="#181b1e" />

      <!-- Middle Trace (Medium, higher dogleg) -->
      <path d="M 384,545 L 384,400 L 405,376 L 405,376" 
            fill="none" stroke="url(#circuitGold)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="408" cy="372" r="14" fill="url(#circuitGold)" />
      <circle cx="408" cy="372" r="7" fill="#181b1e" />

      <!-- Right Trace (Tallest, branches towards the upper arm) -->
      <path d="M 404,550 L 404,450 L 440,412 L 452,412" 
            fill="none" stroke="url(#circuitGold)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="452" cy="412" r="13" fill="url(#circuitGold)" />
      <circle cx="452" cy="412" r="6" fill="#181b1e" />
    </g>

    <!-- Stem Front/Right Bevel Column -->
    <polygon points="455,160 458,162 458,620 455,618" fill="url(#stemRightBevel)" />


    <!-- 3. LOWER DIAGONAL ARM (CHROME / SILVER) -->
    <!-- Base shadow cast on ground / stem -->
    <g id="silver-arm">
      <!-- Lower Arm Underside / Bevel Shadow -->
      <polygon points="455,420 590,560 690,622 715,622 575,485 455,420" fill="url(#silverBevel)" />

      <!-- Lower Arm Front Face -->
      <polygon points="455,410 615,580 715,622 650,622 510,505 455,455" fill="url(#silverSideFace)" />

      <!-- Lower Arm Top Reflective Face -->
      <polygon points="455,395 650,570 715,622 615,580 455,430" fill="url(#silverTopFace)" filter="url(#softShadow)" />

      <!-- Chrome Sheen Highlight Strip -->
      <polygon points="460,402 642,568 648,564 466,398" fill="#ffffff" opacity="0.8" />
    </g>


    <!-- 4. UPPER DIAGONAL ARM (EMERALD GREEN) -->
    <g id="green-arm">
      <!-- Green Arm Underside Face / Dark Green Depth -->
      <polygon points="455,390 625,245 710,215 570,360 455,410" fill="url(#greenUnderside)" />

      <!-- Green Arm Main Top Face (Bright Emerald) -->
      <polygon points="455,370 590,215 710,215 560,380 455,430" fill="url(#greenTopFace)" filter="url(#softShadow)" />

      <!-- Green Arm Top Bevel Highlight Edge -->
      <polygon points="590,215 710,215 706,223 586,223" fill="url(#greenBevelHighlight)" />

      <!-- Green Arm Faceted Left Joint -->
      <polygon points="455,370 455,430 468,415 468,360" fill="#005224" />
      
      <!-- Vivid Surface Reflection line -->
      <polygon points="480,380 670,225 680,228 490,385" fill="#38f08c" opacity="0.4" />
    </g>


    <!-- 5. 3D CURVED GOLD RIBBON (SWOOSH) -->
    <g id="gold-ribbon" filter="url(#softShadow)">
      <!-- Contact Shadow beneath ribbon onto the arms -->
      <path d="M 315,570 C 315,595 380,630 450,605 C 510,580 575,490 635,340 C 600,430 520,530 440,560 C 370,580 325,565 315,570 Z" 
            fill="#05140d" opacity="0.3" filter="blur(6px)" />

      <!-- Gold Ribbon Outer / Back Loop Depth -->
      <path d="M 318,525 C 310,555 320,590 350,605 C 390,622 435,605 460,575 L 452,560 C 430,585 390,600 360,588 C 335,575 328,550 334,530 Z" 
            fill="url(#goldInnerRim)" />

      <!-- Gold Ribbon Main Front 3D Body -->
      <path d="M 318,525 
               C 310,575 350,612 405,605 
               C 460,598 510,545 560,470 
               C 595,415 625,355 632,340 
               C 628,360 595,450 540,520 
               C 490,580 435,618 385,612 
               C 340,606 312,570 318,525 Z" 
            fill="url(#goldRibbonGrad)" />

      <!-- Gold Ribbon Top/Front Brilliant Facet -->
      <path d="M 318,525 
               C 328,580 380,612 440,580 
               C 500,548 555,475 632,340 
               C 625,360 560,480 495,548 
               C 440,582 375,585 332,545 Z" 
            fill="url(#goldRibbonSheen)" opacity="0.9" />

      <!-- Sharp Ribbon Tip Highlight -->
      <polygon points="632,340 626,355 620,358" fill="#ffffff" />
    </g>

  </g>

  <!-- ============================================================== -->
  <!-- TYPOGRAPHY: WORDMARK & SUBTITLE                                -->
  <!-- ============================================================== -->
  <g id="brand-typography">

    <!-- 1. MAIN WORDMARK: K I L I M O N E T -->
    <g id="wordmark-letters" transform="translate(120, 745)">

      <!-- K -->
      <path d="M 0,-70 L 17,-70 L 17,-38 L 44,-70 L 67,-70 L 33,-31 L 70,0 L 46,0 L 17,-25 L 17,0 L 0,0 Z" fill="#111315" />

      <!-- I -->
      <path d="M 100,-70 L 117,-70 L 117,0 L 100,0 Z" fill="#111315" />

      <!-- L -->
      <path d="M 148,-70 L 165,-70 L 165,-15 L 205,-15 L 205,0 L 148,0 Z" fill="#111315" />

      <!-- I -->
      <path d="M 238,-70 L 255,-70 L 255,0 L 238,0 Z" fill="#111315" />

      <!-- M -->
      <path d="M 285,-70 L 306,-70 L 328,-26 L 350,-70 L 371,-70 L 371,0 L 355,0 L 355,-44 L 335,0 L 321,0 L 301,-44 L 301,0 L 285,0 Z" fill="#111315" />

      <!-- O (DISTINCTIVE 3D GOLD RING) -->
      <g transform="translate(438, -35)">
        <circle cx="0" cy="0" r="38" fill="url(#goldRingGrad)" />
        <circle cx="0" cy="0" r="23" fill="#ffffff" />
        <!-- Inner ring metallic edge -->
        <circle cx="0" cy="0" r="23" fill="none" stroke="#ba851a" stroke-width="2" />
        <circle cx="0" cy="0" r="38" fill="none" stroke="#fad868" stroke-width="1.5" />
      </g>

      <!-- N -->
      <path d="M 505,-70 L 522,-70 L 560,-18 L 560,-70 L 576,-70 L 576,0 L 559,0 L 521,-52 L 521,0 L 505,0 Z" fill="#111315" />

      <!-- E (STYLIZED TRIPLE GREEN BARS) -->
      <g transform="translate(605, -70)">
        <!-- Top Green Bar -->
        <rect x="0" y="0" width="56" height="15" rx="3" fill="#00843d" />
        <!-- Middle Green Bar -->
        <rect x="0" y="27" width="48" height="15" rx="3" fill="#00843d" />
        <!-- Bottom Green Bar -->
        <rect x="0" y="55" width="56" height="15" rx="3" fill="#00843d" />
      </g>

      <!-- T -->
      <path d="M 688,-70 L 748,-70 L 748,-55 L 727,-55 L 727,0 L 709,0 L 709,-55 L 688,-55 Z" fill="#111315" />

    </g>

    <!-- 2. SUBTITLE: — INTEGRATED AGRISYSTEMS LIMITED — -->
    <g id="wordmark-subtitle" transform="translate(0, 788)">
      <!-- Left Green Accent Rule -->
      <line x1="120" y1="0" x2="195" y2="0" stroke="#00843d" stroke-width="4.5" stroke-linecap="round" />

      <!-- Subtitle Text -->
      <text x="500" y="5" 
            text-anchor="middle" 
            font-family="'Montserrat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            font-size="20" 
            font-weight="700" 
            letter-spacing="5.5" 
            fill="#14181b">INTEGRATED AGRISYSTEMS LIMITED</text>

      <!-- Right Green Accent Rule -->
      <line x1="805" y1="0" x2="880" y2="0" stroke="#00843d" stroke-width="4.5" stroke-linecap="round" />
    </g>

  </g>
</svg>`;

// Standalone Emblem Icon SVG (For Favicons, App Icons, PWA Icons)
const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background rounded squircle / transparent -->
    <linearGradient id="iconStemLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#24282c" />
      <stop offset="40%" stop-color="#181b1e" />
      <stop offset="100%" stop-color="#0e1012" />
    </linearGradient>
    <linearGradient id="iconCircuitGold" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#c9972c" />
      <stop offset="50%" stop-color="#fad66d" />
      <stop offset="100%" stop-color="#e8b438" />
    </linearGradient>
    <linearGradient id="iconGreenTop" x1="0%" y1="100%" x2="80%" y2="0%">
      <stop offset="0%" stop-color="#006c31" />
      <stop offset="45%" stop-color="#008a3f" />
      <stop offset="85%" stop-color="#00a84d" />
      <stop offset="100%" stop-color="#14bd5c" />
    </linearGradient>
    <linearGradient id="iconSilverTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#e8edf1" />
      <stop offset="70%" stop-color="#c8d2db" />
      <stop offset="100%" stop-color="#a6b2bd" />
    </linearGradient>
    <linearGradient id="iconSilverSide" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#bdc6cf" />
      <stop offset="50%" stop-color="#939fa9" />
      <stop offset="100%" stop-color="#67737d" />
    </linearGradient>
    <linearGradient id="iconGoldRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b67f17" />
      <stop offset="20%" stop-color="#dfa931" />
      <stop offset="45%" stop-color="#fae27c" />
      <stop offset="70%" stop-color="#e5b236" />
      <stop offset="90%" stop-color="#c28b1e" />
      <stop offset="100%" stop-color="#eed168" />
    </linearGradient>
    <filter id="iconSoftShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="2" dy="8" stdDeviation="6" flood-color="#0b1612" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Clean Background with subtle roundness -->
  <rect width="512" height="512" rx="96" fill="#ffffff" />

  <!-- 3D "K" Mark scaled and centered -->
  <g transform="translate(256, 256) scale(0.82) translate(-500, -400)">
    <!-- Shadow -->
    <ellipse cx="490" cy="635" rx="240" ry="22" fill="#000000" opacity="0.12" filter="blur(12px)" />

    <!-- Stem Left Face -->
    <polygon points="340,215 455,160 455,618 340,600" fill="url(#iconStemLeft)" />

    <!-- Circuit Board Pattern -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <path d="M 366,540 L 366,375 L 392,342 L 418,342" fill="none" stroke="url(#iconCircuitGold)" stroke-width="7" />
      <circle cx="426" cy="342" r="14" fill="url(#iconCircuitGold)" />
      <circle cx="426" cy="342" r="7" fill="#181b1e" />

      <path d="M 384,545 L 384,400 L 405,376" fill="none" stroke="url(#iconCircuitGold)" stroke-width="7" />
      <circle cx="408" cy="372" r="14" fill="url(#iconCircuitGold)" />
      <circle cx="408" cy="372" r="7" fill="#181b1e" />

      <path d="M 404,550 L 404,450 L 440,412 L 452,412" fill="none" stroke="url(#iconCircuitGold)" stroke-width="7" />
      <circle cx="452" cy="412" r="13" fill="url(#iconCircuitGold)" />
      <circle cx="452" cy="412" r="6" fill="#181b1e" />
    </g>

    <!-- Stem Right Bevel -->
    <polygon points="455,160 458,162 458,620 455,618" fill="#3d444c" />

    <!-- Silver Arm -->
    <polygon points="455,410 615,580 715,622 650,622 510,505 455,455" fill="url(#iconSilverSide)" />
    <polygon points="455,395 650,570 715,622 615,580 455,430" fill="url(#iconSilverTop)" filter="url(#iconSoftShadow)" />

    <!-- Green Arm -->
    <polygon points="455,390 625,245 710,215 570,360 455,410" fill="#004a21" />
    <polygon points="455,370 590,215 710,215 560,380 455,430" fill="url(#iconGreenTop)" filter="url(#iconSoftShadow)" />
    <polygon points="590,215 710,215 706,223 586,223" fill="#2fe07b" />

    <!-- Gold Ribbon -->
    <path d="M 318,525 
             C 310,575 350,612 405,605 
             C 460,598 510,545 560,470 
             C 595,415 625,355 632,340 
             C 628,360 595,450 540,520 
             C 490,580 435,618 385,612 
             C 340,606 312,570 318,525 Z" 
          fill="url(#iconGoldRibbon)" filter="url(#iconSoftShadow)" />
  </g>
</svg>`;

async function run() {
  console.log('Writing kilimonet-logo.svg...');
  fs.writeFileSync(path.join(__dirname, 'kilimonet-logo.svg'), masterSvg, 'utf8');

  console.log('Writing kilimonet-icon.svg...');
  fs.writeFileSync(path.join(__dirname, 'kilimonet-icon.svg'), iconSvg, 'utf8');

  console.log('Generating high-res PNG & WebP assets using Sharp...');
  const svgBuffer = Buffer.from(masterSvg);
  const iconBuffer = Buffer.from(iconSvg);

  // 1. High-res kilimonet.logo.png (1000x1000)
  await sharp(svgBuffer)
    .resize(1000, 1000)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(__dirname, 'kilimonet.logo.png'));
  console.log('Created kilimonet.logo.png (1000x1000)');

  // 2. Official WebP logo (1000x1000)
  await sharp(svgBuffer)
    .resize(1000, 1000)
    .webp({ quality: 95, lossless: false })
    .toFile(path.join(__dirname, 'kilimonet.logo.official.webp'));
  console.log('Created kilimonet.logo.official.webp');

  // 3. Full WebP logo
  await sharp(svgBuffer)
    .resize(1000, 1000)
    .webp({ quality: 95, lossless: false })
    .toFile(path.join(__dirname, 'kilimonet.logo.full.webp'));
  console.log('Created kilimonet.logo.full.webp');

  // 4. Center crop / emblem focus (600x600)
  await sharp(svgBuffer)
    .resize(600, 600)
    .png({ quality: 95 })
    .toFile(path.join(__dirname, 'kilimonet.logo.center.png'));
  console.log('Created kilimonet.logo.center.png');

  // 5. Navbar brand logo kilimonet.logo.small.webp (240x240 crisp 3D K emblem)
  await sharp(iconBuffer)
    .resize(240, 240)
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(__dirname, 'kilimonet.logo.small.webp'));
  console.log('Created kilimonet.logo.small.webp');

  // 6. Favicon / PWA icon kilimonet.icon.png (192x192 & 512x512)
  await sharp(iconBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, 'kilimonet.icon.png'));
  console.log('Created kilimonet.icon.png');

  console.log('All logo assets successfully updated to official brand logo!');
}

run().catch(err => {
  console.error('Error generating logos:', err);
  process.exit(1);
});
