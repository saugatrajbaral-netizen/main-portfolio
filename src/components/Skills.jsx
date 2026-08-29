import React from 'react';
import { Layout, Server, Database, Cpu, Layers, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skillCategories } = portfolioData;

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Layout':
        return <Layout size={22} />;
      case 'Server':
        return <Server size={22} />;
      case 'Database':
        return <Database size={22} />;
      case 'Cpu':
        return <Cpu size={22} />;
      default:
        return <Layers size={22} />;
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Wrench size={14} />
            <span>Tech Stack</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Tools, libraries, and frameworks I leverage to create resilient, scalable, and responsive digital products.
          </p>
        </div>

        <div className="skills-categories">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-category-card glass-panel">
              <div className="category-header">
                <div className="category-icon">
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="category-title">{cat.title}</h3>
              </div>

              <div className="skill-tags">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
