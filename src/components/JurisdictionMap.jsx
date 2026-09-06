import React, { useState } from 'react';
import { MapPin, ShieldCheck, Compass, CheckCircle2, Building, ExternalLink } from 'lucide-react';
import NepalEmblem from './NepalEmblem';

export default function JurisdictionMap() {
  const [activeDistrict, setActiveDistrict] = useState('tanahun');

  const districts = [
    {
      id: 'tanahun',
      name: 'Tanahun',
      nepali: 'तनहुँ',
      hq: 'Damauli (दमौली)',
      tag: 'Office Headquarters',
      color: '#dc143c',
      role: 'Zonal Tax Office HQ, Corporate Assessments & Main Taxpayer Service Center',
      pin: { x: 395, y: 155 },
      path: 'M 375,142 L 415,138 L 425,160 L 395,175 L 368,160 Z'
    },
    {
      id: 'gorkha',
      name: 'Gorkha',
      nepali: 'गोरखा',
      hq: 'Gorkha Bazaar (गोरखा बजार)',
      tag: 'Revenue Oversight',
      color: '#003893',
      role: 'Historic District Jurisdiction, Enterprise Taxation & Tourism Audits',
      pin: { x: 440, y: 125 },
      path: 'M 418,95 L 465,108 L 452,152 L 420,138 Z'
    },
    {
      id: 'lamjung',
      name: 'Lamjung',
      nepali: 'लमजुङ',
      hq: 'Besisahar (बेसीशहर)',
      tag: 'Commercial Unit',
      color: '#0284c7',
      role: 'Commercial Trade, Agro-Enterprise & Hydropower Fiscal Monitoring',
      pin: { x: 388, y: 118 },
      path: 'M 370,105 L 415,100 L 415,138 L 372,140 Z'
    },
    {
      id: 'manang',
      name: 'Manang',
      nepali: 'मनाङ',
      hq: 'Chame (चामे)',
      tag: 'Himalayan Zone',
      color: '#059669',
      role: 'Himalayan Tourism, Hotel Industry & Trans-Himalayan Commercial Base',
      pin: { x: 365, y: 82 },
      path: 'M 335,70 L 410,65 L 412,98 L 365,104 Z'
    }
  ];

  const current = districts.find((d) => d.id === activeDistrict) || districts[0];

  return (
    <div className="jurisdiction-map-container">
      {/* Header Banner */}
      <div className="jurisdiction-map-header">
        <div className="jurisdiction-badge">
          <NepalEmblem size={22} variant="full" />
          <div>
            <div className="jurisdiction-sub">Government of Nepal · Ministry of Finance</div>
            <div className="jurisdiction-title">Inland Revenue Office, Damauli (आ.रा.का. दमौली)</div>
          </div>
        </div>
        <div className="jurisdiction-stat-tag">
          <span className="live-pulse-dot" />
          <span>4 Districts Jurisdiction · Gandaki Province</span>
        </div>
      </div>

      {/* Main Map Visualizer */}
      <div className="jurisdiction-visual-panel">
        <svg
          viewBox="0 0 700 300"
          className="nepal-jurisdiction-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nepalBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0f2b48" />
              <stop offset="100%" stop-color="#071b30" />
            </linearGradient>

            <linearGradient id="gandakiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1e3a8a" />
              <stop offset="100%" stop-color="#172554" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ff4d6d" flood-opacity="0.6" />
            </filter>
          </defs>

          {/* Outline of Nepal */}
          <path
            d="M 60,110 
               C 85,95 120,90 155,75 
               C 190,60 220,65 255,50 
               C 290,38 335,42 370,48 
               C 405,52 445,60 480,72 
               C 515,82 555,88 590,105 
               C 625,120 655,135 675,150
               C 685,160 670,180 650,195 
               C 620,215 580,225 540,230 
               C 500,235 460,238 420,235 
               C 380,232 340,225 300,215 
               C 260,205 220,195 180,185 
               C 140,175 100,165 60,150 
               C 45,140 45,120 60,110 Z"
            fill="url(#nepalBaseGrad)"
            stroke="#2a4365"
            stroke-width="1.8"
          />

          {/* Regional Grid & Province Dividing Lines */}
          <path
            d="M 190,65 Q 210,140 220,195"
            stroke="#1a365d"
            stroke-width="1"
            stroke-dasharray="3 3"
            fill="none"
          />
          <path
            d="M 315,45 Q 330,130 330,220"
            stroke="#1a365d"
            stroke-width="1"
            stroke-dasharray="3 3"
            fill="none"
          />
          <path
            d="M 480,75 Q 480,150 470,235"
            stroke="#1a365d"
            stroke-width="1"
            stroke-dasharray="3 3"
            fill="none"
          />

          {/* Province Background Labels */}
          <text x="120" y="130" fill="#475569" font-size="10" font-family="'Space Mono', monospace" letter-spacing="1">SUDURPASCHIM / KARNALI</text>
          <text x="240" y="145" fill="#475569" font-size="10" font-family="'Space Mono', monospace" letter-spacing="1">LUMBINI</text>
          <text x="530" y="145" fill="#475569" font-size="10" font-family="'Space Mono', monospace" letter-spacing="1">BAGMATI / KOSHI</text>

          {/* GANDAKI PROVINCE HIGHLIGHT ZONE */}
          <path
            d="M 325,50 
               L 470,75 
               L 460,190 
               L 330,215 
               Z"
            fill="url(#gandakiGrad)"
            opacity="0.75"
            stroke="#3b82f6"
            stroke-width="1.5"
          />
          <text x="390" y="240" fill="#60a5fa" font-size="11" font-weight="700" font-family="'Space Mono', monospace" text-anchor="middle" letter-spacing="1.5">
            GANDAKI PROVINCE JURISDICTION
          </text>

          {/* 4 JURISDICTION DISTRICTS POLYGONS */}
          {districts.map((d) => {
            const isSelected = activeDistrict === d.id;
            return (
              <g
                key={d.id}
                onClick={() => setActiveDistrict(d.id)}
                style={{ cursor: 'pointer' }}
                className={`district-polygon-group ${isSelected ? 'active' : ''}`}
              >
                <path
                  d={d.path}
                  fill={isSelected ? d.color : `${d.color}66`}
                  stroke={isSelected ? '#ffffff' : d.color}
                  stroke-width={isSelected ? '2.5' : '1.5'}
                  filter={isSelected ? 'url(#glowEffect)' : 'none'}
                />

                {/* District Pin */}
                <circle
                  cx={d.pin.x}
                  cy={d.pin.y}
                  r={isSelected ? 6 : 4}
                  fill="#ffffff"
                  stroke={d.color}
                  stroke-width="2"
                />

                {/* Pin Pulse when Active */}
                {isSelected && (
                  <circle
                    cx={d.pin.x}
                    cy={d.pin.y}
                    r="10"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    opacity="0.8"
                  />
                )}

                {/* Label */}
                <text
                  x={d.pin.x}
                  y={d.pin.y - 10}
                  text-anchor="middle"
                  fill={isSelected ? '#ffffff' : '#cbd5e1'}
                  font-size={isSelected ? '11' : '10'}
                  font-weight={isSelected ? '800' : '600'}
                  font-family="'Inter', sans-serif"
                >
                  {d.nepali} ({d.name})
                </text>
              </g>
            );
          })}

          {/* HQ Anchor Callout: Damauli */}
          <g transform="translate(395, 155)">
            <circle cx="0" cy="0" r="3" fill="#ffb703" />
          </g>
        </svg>
      </div>

      {/* Interactive 4 Districts Selector Cards */}
      <div className="jurisdiction-districts-grid">
        {districts.map((d) => {
          const isSelected = activeDistrict === d.id;
          return (
            <button
              type="button"
              key={d.id}
              onClick={() => setActiveDistrict(d.id)}
              className={`district-card-btn ${isSelected ? 'active' : ''}`}
              style={{
                borderColor: isSelected ? d.color : '#e2e8f0',
                borderTopColor: d.color
              }}
            >
              <div className="district-card-top">
                <div className="district-tag-pill" style={{ color: d.color, background: `${d.color}15` }}>
                  {d.tag}
                </div>
                {isSelected && <CheckCircle2 size={15} color={d.color} />}
              </div>

              <div className="district-name-row">
                <strong className="district-nep-name">{d.nepali}</strong>
                <span className="district-eng-name">{d.name}</span>
              </div>

              <div className="district-hq-row">
                <MapPin size={12} color="var(--slate)" />
                <span>HQ: {d.hq}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active District Detail Banner */}
      <div className="active-district-detail-box" style={{ borderLeftColor: current.color }}>
        <div className="detail-box-left">
          <div className="detail-district-title">
            <span className="highlight-badge" style={{ background: current.color }}>
              {current.tag}
            </span>
            <h4>
              {current.nepali} ({current.name} District)
            </h4>
          </div>
          <p className="detail-district-desc">{current.role}</p>
        </div>
        <div className="detail-box-right">
          <div className="detail-hq-tag">
            <small>Field Jurisdiction HQ</small>
            <strong>{current.hq}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
