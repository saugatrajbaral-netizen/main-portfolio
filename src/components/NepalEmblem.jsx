import React from 'react';

/**
 * Official Emblem of Nepal (नेपालको निशान छाप / Coat of Arms of Nepal)
 * Standard Government of Nepal Seal featuring:
 * - Mount Everest (Sagarmatha) in Royal Blue with Snow Glaciers
 * - White Silhouette Map of Nepal
 * - Green Hills (Pahad) & Fertile Yellow Base (Terai)
 * - Gender Equality Handshake (Female hand with red bangles & Male hand)
 * - Rhododendron Garland Wreath (16 Lali Gurans blossoms with green leaves)
 * - Golden Paddy/Wheat Sheaves
 * - Double-Pennant Flag of Nepal at Crest
 * - Red Ribbon Scroll with Sanskrit Motto: "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी"
 */
export default function NepalEmblem({
  className = '',
  style = {},
  variant = 'full',
  size = 120,
  alt = 'Government of Nepal Emblem'
}) {
  const isWatermark = variant === 'watermark';
  const isGold = variant === 'gold';
  const isMonoWhite = variant === 'white';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      width={size}
      height={size}
      className={`nepal-emblem-svg ${className}`}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-label={alt}
      role="img"
    >
      <defs>
        <filter id="emblemShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.2" />
        </filter>

        <linearGradient id="govRibbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e50914" />
          <stop offset="60%" stopColor="#c1121f" />
          <stop offset="100%" stopColor="#780000" />
        </linearGradient>

        <linearGradient id="govGoldBase" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5c71a" />
          <stop offset="100%" stopColor="#d49e00" />
        </linearGradient>

        <linearGradient id="govEverestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>

      <g opacity={isWatermark ? 0.35 : 1}>
        {/* =================================================================
            1. EVEREST & HIMALAYAS BACKGROUND
            ================================================================= */}
        <g id="everest-massif">
          {/* Blue Mountain Body */}
          <path
            d="M 180,480 L 220,380 L 320,320 L 400,225 L 480,320 L 580,380 L 620,480 Z"
            fill={isMonoWhite ? 'rgba(255,255,255,0.2)' : isGold ? 'rgba(200,169,81,0.3)' : 'url(#govEverestGrad)'}
          />
          {/* Main Peak Body */}
          <polygon
            points="400,225 320,330 380,380 430,370 480,325"
            fill={isMonoWhite ? 'rgba(255,255,255,0.3)' : isGold ? '#d4af37' : '#1e40af'}
          />

          {/* White Snow and Glaciers on Everest */}
          <g fill={isMonoWhite ? '#ffffff' : '#ffffff'} opacity="0.96">
            {/* Summit peak snow cap */}
            <polygon points="400,225 385,255 405,250 415,225" />
            <polygon points="400,225 370,270 390,265 400,285 415,255 425,275 400,225" />
            <polygon points="345,300 370,280 360,315 390,305 375,335 340,320" />
            <polygon points="445,290 425,275 440,320 465,305 450,335 480,320" />
            
            {/* Additional Himalayan Snow ridges */}
            <polygon points="260,360 285,340 275,375 305,360 290,390" />
            <polygon points="540,360 515,340 525,375 495,360 510,390" />
            <polygon points="400,340 380,370 420,365 395,395 400,340" />
          </g>

          {/* Green Middle Hills (Pahad) */}
          <path
            d="M 170,520 Q 280,440 400,475 Q 520,440 630,520 L 630,580 L 170,580 Z"
            fill={isMonoWhite ? 'rgba(255,255,255,0.25)' : isGold ? '#2d6a4f' : '#2d6a4f'}
          />
          <path
            d="M 170,545 Q 260,490 400,520 Q 540,490 630,545 L 630,600 L 170,600 Z"
            fill={isMonoWhite ? 'rgba(255,255,255,0.35)' : isGold ? '#1b4332' : '#1b4332'}
          />
        </g>

        {/* =================================================================
            2. WHITE MAP SILHOUETTE OF NEPAL
            ================================================================= */}
        <g id="nepal-map-silhouette" filter="url(#emblemShadow)">
          {/* Authentic simplified silhouette outline of Nepal */}
          <path
            d="M 270,470 
               C 275,465 285,468 295,462 
               C 305,455 315,460 325,452 
               C 335,445 345,450 355,442
               C 365,438 375,445 385,440
               C 395,442 410,445 425,450
               C 440,455 455,458 470,465
               C 485,472 505,475 520,485
               C 530,492 545,498 555,510
               C 558,520 550,530 540,535
               C 530,540 515,535 500,540
               C 485,545 470,542 455,548
               C 440,555 425,550 410,558
               C 395,565 375,560 360,565
               C 345,570 330,568 315,562
               C 300,555 285,558 275,550
               C 265,542 260,535 255,525
               C 250,515 255,500 260,490
               Z"
            fill={isMonoWhite ? 'rgba(255,255,255,0.85)' : '#ffffff'}
            stroke={isMonoWhite ? '#ffffff' : '#d9e2ec'}
            strokeWidth="2"
          />
        </g>

        {/* =================================================================
            3. FERTILE BASE (TERAI)
            ================================================================= */}
        <path
          d="M 230,590 Q 400,540 570,590 L 590,660 Q 400,600 210,660 Z"
          fill={isMonoWhite ? 'rgba(255,255,255,0.4)' : isGold ? '#d4af37' : 'url(#govGoldBase)'}
        />

        {/* =================================================================
            4. GENDER EQUALITY HANDSHAKE
            ================================================================= */}
        <g id="equality-handshake" transform="translate(400, 605)">
          {/* Female Arm (Left) with Traditional Red Bangles (रातो चुरा) */}
          <g id="female-arm">
            <path d="M -115,10 L -65,-5 L -55,30 L -110,40 Z" fill={isMonoWhite ? 'rgba(255,255,255,0.7)' : '#fcd5b5'} />
            {/* Red Bangles */}
            <rect x="-85" y="-6" width="7" height="38" rx="3" fill="#d90429" stroke="#b7094c" strokeWidth="1" transform="rotate(12 -85 10)" />
            <rect x="-75" y="-8" width="7" height="38" rx="3" fill="#ef233c" stroke="#b7094c" strokeWidth="1" transform="rotate(12 -75 10)" />
            <rect x="-65" y="-10" width="7" height="38" rx="3" fill="#d90429" stroke="#b7094c" strokeWidth="1" transform="rotate(12 -65 10)" />
            <rect x="-55" y="-12" width="7" height="38" rx="3" fill="#ff4d6d" stroke="#b7094c" strokeWidth="1" transform="rotate(12 -55 10)" />
          </g>

          {/* Male Arm (Right) */}
          <g id="male-arm">
            <path d="M 115,10 L 65,-5 L 55,30 L 110,40 Z" fill={isMonoWhite ? 'rgba(255,255,255,0.7)' : '#fcd5b5'} />
            {/* Shirt Cuff line */}
            <line x1="68" y1="-5" x2="58" y2="30" stroke="#003893" strokeWidth="3" />
          </g>

          {/* Clasping Hands */}
          <g fill={isMonoWhite ? '#ffffff' : '#fcd5b5'} stroke={isMonoWhite ? 'rgba(0,0,0,0.2)' : '#d4a373'} strokeWidth="1.5">
            {/* Left Hand palm & fingers */}
            <path d="M -45,10 C -25,5 -5,15 15,22 C 28,26 42,22 55,16 C 60,12 62,5 55,2 C 45,0 30,5 15,5 C -5,5 -25,2 -45,10 Z" />
            {/* Right Hand clasp */}
            <path d="M 45,10 C 25,5 5,15 -15,22 C -28,26 -42,22 -55,16 C -60,12 -62,5 -55,2 C -45,0 -30,5 -15,5 C 5,5 25,2 45,10 Z" />
            {/* Finger joints */}
            <path d="M -20,20 C -12,28 -2,32 10,26" />
            <path d="M -10,26 C -2,34 8,36 18,30" />
            <path d="M 0,32 C 8,38 18,38 26,32" />
          </g>
        </g>

        {/* =================================================================
            5. GOLDEN PADDY / WHEAT SHEAVES (धानको बाला)
            ================================================================= */}
        <g id="wheat-sheaves" fill={isMonoWhite ? 'rgba(255,255,255,0.8)' : '#e09f3e'} stroke={isMonoWhite ? '#fff' : '#bc6c25'} strokeWidth="1">
          {/* Left Sheaf */}
          <g transform="translate(0, 0)">
            <ellipse cx="230" cy="625" rx="9" ry="18" transform="rotate(-65 230 625)" fill="#f39c12" />
            <ellipse cx="260" cy="640" rx="9" ry="18" transform="rotate(-50 260 640)" fill="#e67e22" />
            <ellipse cx="295" cy="650" rx="9" ry="18" transform="rotate(-35 295 650)" fill="#f1c40f" />
            <ellipse cx="335" cy="658" rx="9" ry="18" transform="rotate(-20 335 658)" fill="#f39c12" />
            <ellipse cx="375" cy="662" rx="9" ry="18" transform="rotate(-5 375 662)" fill="#e67e22" />
          </g>

          {/* Right Sheaf */}
          <g transform="translate(0, 0)">
            <ellipse cx="570" cy="625" rx="9" ry="18" transform="rotate(65 570 625)" fill="#f39c12" />
            <ellipse cx="540" cy="640" rx="9" ry="18" transform="rotate(50 540 640)" fill="#e67e22" />
            <ellipse cx="505" cy="650" rx="9" ry="18" transform="rotate(35 505 650)" fill="#f1c40f" />
            <ellipse cx="465" cy="658" rx="9" ry="18" transform="rotate(20 465 658)" fill="#f39c12" />
            <ellipse cx="425" cy="662" rx="9" ry="18" transform="rotate(5 425 662)" fill="#e67e22" />
          </g>
        </g>

        {/* =================================================================
            6. RHODODENDRON GARLAND WREATH (लालीगुराँस) - 16 Blossoms
            ================================================================= */}
        <g id="rhododendron-wreath">
          {/* Leaves */}
          <g fill={isMonoWhite ? 'rgba(255,255,255,0.4)' : '#2d6a4f'} stroke={isMonoWhite ? '#fff' : '#1b4332'} strokeWidth="1.5">
            {/* Left Leaves */}
            <path d="M 330,190 Q 300,165 310,140 Q 335,160 330,190 Z" />
            <path d="M 250,225 Q 215,210 215,180 Q 245,195 250,225 Z" />
            <path d="M 190,290 Q 150,285 145,255 Q 180,265 190,290 Z" />
            <path d="M 150,370 Q 110,380 100,350 Q 135,350 150,370 Z" />
            <path d="M 135,460 Q 95,480 85,450 Q 120,445 135,460 Z" />
            <path d="M 145,550 Q 110,580 95,555 Q 130,540 145,550 Z" />
            <path d="M 180,625 Q 145,660 130,635 Q 165,615 180,625 Z" />

            {/* Right Leaves */}
            <path d="M 470,190 Q 500,165 490,140 Q 465,160 470,190 Z" />
            <path d="M 550,225 Q 585,210 585,180 Q 555,195 550,225 Z" />
            <path d="M 610,290 Q 650,285 655,255 Q 620,265 610,290 Z" />
            <path d="M 650,370 Q 690,380 700,350 Q 665,350 650,370 Z" />
            <path d="M 665,460 Q 705,480 715,450 Q 680,445 665,460 Z" />
            <path d="M 655,550 Q 690,580 705,555 Q 670,540 655,550 Z" />
            <path d="M 620,625 Q 655,660 670,635 Q 635,615 620,625 Z" />
          </g>

          {/* 16 Rhododendron Flowers (8 on left, 8 on right) */}
          {[
            // Left Arch
            [325, 215, 0.85],
            [255, 255, 0.9],
            [195, 315, 0.95],
            [155, 390, 1.0],
            [140, 475, 1.0],
            [150, 560, 0.95],
            [185, 635, 0.9],
            [240, 690, 0.85],
            // Right Arch
            [475, 215, 0.85],
            [545, 255, 0.9],
            [605, 315, 0.95],
            [645, 390, 1.0],
            [660, 475, 1.0],
            [650, 560, 0.95],
            [615, 635, 0.9],
            [560, 690, 0.85],
          ].map(([cx, cy, sc], i) => (
            <g key={i} transform={`translate(${cx}, ${cy}) scale(${sc})`} filter="url(#emblemShadow)">
              {/* Petals */}
              <circle cx="-14" cy="-8" r="15" fill={isMonoWhite ? '#ffffff' : '#d90429'} stroke={isMonoWhite ? '#e2e8f0' : '#800f2f'} strokeWidth="1.5" />
              <circle cx="14" cy="-8" r="15" fill={isMonoWhite ? '#ffffff' : '#d90429'} stroke={isMonoWhite ? '#e2e8f0' : '#800f2f'} strokeWidth="1.5" />
              <circle cx="-10" cy="14" r="15" fill={isMonoWhite ? '#ffffff' : '#ef233c'} stroke={isMonoWhite ? '#e2e8f0' : '#800f2f'} strokeWidth="1.5" />
              <circle cx="10" cy="14" r="15" fill={isMonoWhite ? '#ffffff' : '#ef233c'} stroke={isMonoWhite ? '#e2e8f0' : '#800f2f'} strokeWidth="1.5" />
              <circle cx="0" cy="-15" r="15" fill={isMonoWhite ? '#ffffff' : '#ff4d6d'} stroke={isMonoWhite ? '#e2e8f0' : '#800f2f'} strokeWidth="1.5" />
              {/* Flower Core */}
              <circle cx="0" cy="0" r="16" fill={isMonoWhite ? '#f8fafc' : '#c9184a'} stroke={isMonoWhite ? '#e2e8f0' : '#590d22'} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="6" fill={isMonoWhite ? '#001f3f' : '#ffb703'} />
              {/* Petal folds detail */}
              <path d="M -6,-6 Q 0,-10 6,-6 Q 10,0 6,6 Q 0,10 -6,6 Q -10,0 -6,-6 Z" fill="none" stroke={isMonoWhite ? '#cbd5e1' : '#ff758f'} strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* =================================================================
            7. NATIONAL FLAG OF NEPAL AT THE CREST
            ================================================================= */}
        <g id="crest-flag" transform="translate(400, 160)" filter="url(#emblemShadow)">
          {/* Flag Pole */}
          <line x1="-35" y1="5" x2="-35" y2="65" stroke={isMonoWhite ? '#ffffff' : '#6c584c'} strokeWidth="4" strokeLinecap="round" />

          {/* Double Pennant Flag Body */}
          {/* Outer Blue Border */}
          <polygon points="-35,5 35,28 -10,28 42,65 -35,65" fill={isMonoWhite ? '#ffffff' : '#003893'} stroke={isMonoWhite ? '#ffffff' : '#001f3f'} strokeWidth="2" />
          {/* Inner Crimson Field */}
          <polygon points="-30,10 24,28 -15,28 30,59 -30,59" fill={isMonoWhite ? 'rgba(255,255,255,0.4)' : '#dc143c'} />

          {/* Upper Moon (White) */}
          <g transform="translate(-16, 23) scale(0.65)" fill="#ffffff">
            <path d="M -8,0 C -8,7 8,7 8,0 C 6,3 -6,3 -8,0 Z" />
            <circle cx="0" cy="0" r="3.5" />
            <polygon points="0,-7 2,-3 -2,-3" />
            <polygon points="5,-5 3,-1 0,-3" />
            <polygon points="-5,-5 -3,-1 0,-3" />
          </g>

          {/* Lower 12-Rayed Sun (White) */}
          <g transform="translate(-14, 46) scale(0.7)" fill="#ffffff">
            <circle cx="0" cy="0" r="4.5" />
            <polygon points="0,-9 2.5,-3.5 -2.5,-3.5" />
            <polygon points="0,9 2.5,3.5 -2.5,3.5" />
            <polygon points="-9,0 -3.5,2.5 -3.5,-2.5" />
            <polygon points="9,0 3.5,2.5 3.5,-2.5" />
            <polygon points="-6.5,-6.5 -2,-3.5 -4.5,-1" />
            <polygon points="6.5,6.5 2,3.5 4.5,1" />
            <polygon points="-6.5,6.5 -3.5,2 -1,4.5" />
            <polygon points="6.5,-6.5 3.5,-2 1,-4.5" />
          </g>
        </g>

        {/* =================================================================
            8. BASE MOTTO BANNER / RIBBON (जननी जन्मभूमिश्च स्वर्गादपि गरीयसी)
            ================================================================= */}
        <g id="motto-ribbon" transform="translate(400, 720)" filter="url(#emblemShadow)">
          {/* Folded Ribbon Tails Left & Right */}
          <polygon points="-330,-10 -370,-45 -345,-55 -300,-20" fill={isMonoWhite ? 'rgba(255,255,255,0.4)' : '#590d22'} />
          <polygon points="330,-10 370,-45 345,-55 300,-20" fill={isMonoWhite ? 'rgba(255,255,255,0.4)' : '#590d22'} />

          {/* Main Flowing Ribbon Banner */}
          <path
            d="M -320,-30 
               Q 0,-65 320,-30 
               L 295,30 
               Q 0,-5 -295,30 
               Z"
            fill={isMonoWhite ? 'rgba(255,255,255,0.6)' : isGold ? '#d4af37' : 'url(#govRibbonGrad)'}
            stroke={isMonoWhite ? '#ffffff' : '#ffb703'}
            strokeWidth="3"
          />

          {/* Sanskrit Motto: "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी" */}
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill={isMonoWhite ? '#001f3f' : '#ffffff'}
            fontFamily="'Inter', 'Noto Sans Devanagari', 'Mangal', 'Segoe UI', sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="1.5"
            stroke={isMonoWhite ? 'none' : 'rgba(0,0,0,0.3)'}
            strokeWidth="0.5"
          >
            जननी जन्मभूमिश्च स्वर्गादपि गरीयसी
          </text>
        </g>
      </g>
    </svg>
  );
}
