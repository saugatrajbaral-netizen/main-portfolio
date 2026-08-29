import React, { useState } from 'react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Full Stack', 'Frontend', 'UI/UX'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FolderGit2 size={14} />
            <span>Featured Work</span>
          </div>
          <h2 className="section-title">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of recent web applications, libraries, and design projects I've built.
          </p>
        </div>

        {/* Category Filters */}
        <div className="filter-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card glass-panel">
              <div className="project-thumbnail">
                <div className="project-thumbnail-bg">
                  <span className="project-icon-large">{project.icon}</span>
                </div>
                <div className="project-overlay">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Github size={15} />
                    <span>Code</span>
                  </a>
                </div>
              </div>

              <div className="project-body">
                <div className="project-header-top">
                  <span className="project-category-tag">{project.category}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="project-tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-footer">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <ExternalLink size={14} />
                    <span>Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Github size={14} />
                    <span>Repo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
