import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const instagramUrl = 'https://www.instagram.com/its.__.editor/';

const edits = [
  {
    id: 1,
    title: 'Midnight Drive',
    category: 'Cinematic',
    description: 'A moody night drive edit with layered motion and atmospheric color grading.',
    thumbnail:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    video: 'https://player.vimeo.com/external/419552154.sd.mp4?s=bf74b71c5db7d9d884b2470988e2f954f8e72023&profile_id=164&download=1',
    download: '/downloads/midnight-drive.mp4',
    downloadable: true,
    resolution: '4K',
    format: 'MP4',
    fileSize: '42 MB',
    usage: 'Personal use / creator portfolio / social promos',
    tags: ['cinematic', 'night', 'travel'],
    duration: '00:32',
    featured: true,
  },
  {
    id: 2,
    title: 'Arena Pulse',
    category: 'Gaming',
    description: 'High-energy gameplay moments with sharp transitions and punchy color contrast.',
    thumbnail:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    video: 'https://player.vimeo.com/external/420747359.sd.mp4?s=212d818264d4069be9ebb2dd4d4b1e3d2d13d2a6&profile_id=164&download=1',
    download: '/downloads/arena-pulse.mp4',
    downloadable: true,
    resolution: '1080p',
    format: 'MP4',
    fileSize: '27 MB',
    usage: 'Gaming content / streaming highlights / fan edits',
    tags: ['gaming', 'highlight', 'fast'],
    duration: '00:45',
    featured: false,
  },
  {
    id: 3,
    title: 'Skyline Echo',
    category: 'Anime',
    description: 'Clean anime-inspired motion with dramatic framing and stylized transitions.',
    thumbnail:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    video: '#',
    download: null,
    downloadable: false,
    resolution: '1080p',
    format: 'MP4',
    fileSize: 'N/A',
    usage: 'Preview only',
    tags: ['anime', 'stylized', 'motion'],
    duration: '00:28',
    featured: false,
  },
  {
    id: 4,
    title: 'Vortex Clash',
    category: 'AMV',
    description: 'Fast-cut action rhythm built around impact moments and cinematic pacing.',
    thumbnail:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    video: '#',
    download: '/downloads/vortex-clash.mp4',
    downloadable: true,
    resolution: '4K',
    format: 'MP4',
    fileSize: '55 MB',
    usage: 'Fan edits / social posts / portfolio',
    tags: ['amv', 'battle', 'action'],
    duration: '00:51',
    featured: false,
  },
  {
    id: 5,
    title: 'Short Circuit',
    category: 'Shorts',
    description: 'Punchy vertical storytelling built to land instantly in a short-form feed.',
    thumbnail:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80',
    video: '#',
    download: '/downloads/short-circuit.mp4',
    downloadable: true,
    resolution: '1080x1920',
    format: 'MP4',
    fileSize: '14 MB',
    usage: 'Short-form content / creator reels / portfolio',
    tags: ['shorts', 'vertical', 'viral'],
    duration: '00:20',
    featured: false,
  },
  {
    id: 6,
    title: 'Neon Motion',
    category: 'Trending',
    description: 'Trending aesthetic edit with crisp transitions and polished visual rhythm.',
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    video: '#',
    download: null,
    downloadable: false,
    resolution: '1080p',
    format: 'MP4',
    fileSize: 'N/A',
    usage: 'Preview only',
    tags: ['trending', 'neon', 'viral'],
    duration: '00:39',
    featured: false,
  },
  {
    id: 7,
    title: 'City Fade',
    category: 'Cinematic',
    description: 'Slow cinematic movement layered with subtle texture and premium pacing.',
    thumbnail:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    video: '#',
    download: '/downloads/city-fade.mp4',
    downloadable: true,
    resolution: '4K',
    format: 'MP4',
    fileSize: '48 MB',
    usage: 'Portfolio / social use / content previews',
    tags: ['cinematic', 'city', 'ambient'],
    duration: '00:36',
    featured: false,
  },
  {
    id: 8,
    title: 'Wake Up Match',
    category: 'Gaming',
    description: 'Gameplay with crisp highlights, competitive pacing, and a polished cinematic finish.',
    thumbnail:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
    video: '#',
    download: '/downloads/wake-up-match.mp4',
    downloadable: true,
    resolution: '1080p',
    format: 'MP4',
    fileSize: '31 MB',
    usage: 'Streaming / highlights / creator content',
    tags: ['gaming', 'match', 'competitive'],
    duration: '00:42',
    featured: false,
  },
];

const categories = ['All', 'Cinematic', 'Gaming', 'Anime', 'AMV', 'Shorts', 'Trending'];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredEdits = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return edits.filter((edit) => {
      const matchesCategory = activeCategory === 'All' || edit.category === activeCategory;
      const haystack = [edit.title, edit.category, ...(edit.tags || [])].join(' ').toLowerCase();
      const matchesSearch = !searchTerm || haystack.includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  const featuredEdit = filteredEdits.find((edit) => edit.featured) || edits[0];
  const downloadableEdits = edits.filter((edit) => edit.downloadable && edit.download);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <div className="page-shell">
      <header className="site-header">
        <nav className="nav container" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="its.__.editor home">
            its.__.editor
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={handleNavClick}>Home</a>
            <a href="#edits" onClick={handleNavClick}>Edits</a>
            <a href="#downloads" onClick={handleNavClick}>Downloads</a>
            <a href="#about" onClick={handleNavClick}>About</a>
            <a className="instagram-link" href={instagramUrl} target="_blank" rel="noreferrer" onClick={handleNavClick}>
              @its.__.editor
            </a>
          </div>
        </nav>
      </header>

      <main id="home">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">Creative edits for creators</p>
            <h1>EDIT. CREATE. INSPIRE.</h1>
            <p className="subtitle">Creative video edits made for creators.</p>
            <div className="hero-actions">
              <a className="button primary" href="#edits">Explore Edits</a>
              <a className="button secondary" href={instagramUrl} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Featured edit preview">
            <div className="preview-frame">
              <div className="preview-badge">Featured Edit</div>
              <div className="play-btn" aria-hidden="true">▶</div>
              <div className="preview-meta">
                <span>4K</span>
                <span>01:12</span>
                <span>Cinematic</span>
              </div>
            </div>
          </div>
        </section>

        <section className="edit-section container" id="edits">
          <div className="section-header">
            <div>
              <p className="eyebrow">Collection</p>
              <h2>Latest Edits</h2>
            </div>
          </div>

          <div className="toolbar">
            <div className="filter-bar" role="tablist" aria-label="Edit categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === activeCategory ? 'filter active' : 'filter'}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="search-box" aria-label="Search edits">
              <span className="search-icon">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search edits..."
                aria-label="Search edits"
              />
            </label>
          </div>

          {isLoading ? (
            <div className="card-grid loading-grid" aria-live="polite">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-card" aria-hidden="true" />
              ))}
            </div>
          ) : filteredEdits.length > 0 ? (
            <div className="card-grid">
              {filteredEdits.map((edit) => (
                <article key={edit.id} className="edit-card">
                  <div className="thumb" style={{ backgroundImage: `url(${edit.thumbnail})` }}>
                    <span className="duration">{edit.duration}</span>
                    <button type="button" className="watch-pill" aria-label={`Watch ${edit.title}`}>
                      Watch
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="meta-row">
                      <span className="category-tag">{edit.category}</span>
                    </div>

                    <h3>{edit.title}</h3>
                    <p>{edit.description}</p>

                    <div className="card-actions">
                      <a className="card-button secondary" href={edit.video !== '#' ? edit.video : '#edits'}>
                        Watch
                      </a>
                      {edit.downloadable && edit.download ? (
                        <a className="card-button primary" href={edit.download} download>
                          Download
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status" aria-live="polite">
              <h3>No edits match your search.</h3>
              <p>Try another category or search term.</p>
            </div>
          )}
        </section>

        <section className="featured container" aria-labelledby="featured-title">
          <div className="featured-visual">
            <div className="featured-frame" style={{ backgroundImage: `url(${featuredEdit.thumbnail})` }}>
              <div className="featured-badge">Featured</div>
              <button type="button" className="play-btn large" aria-label={`Play ${featuredEdit.title}`}>
                ▶
              </button>
            </div>
          </div>

          <div className="featured-copy">
            <p className="eyebrow">Featured Edit</p>
            <h2 id="featured-title">{featuredEdit.title}</h2>
            <p className="featured-description">{featuredEdit.description}</p>

            <div className="featured-meta">
              <span>{featuredEdit.category}</span>
              <span>{featuredEdit.duration}</span>
            </div>

            <div className="tag-list">
              {featuredEdit.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>

            <div className="feature-actions">
              <a className="button primary" href={featuredEdit.video !== '#' ? featuredEdit.video : '#edits'}>
                Watch
              </a>
              {featuredEdit.downloadable && featuredEdit.download ? (
                <a className="button secondary" href={featuredEdit.download} download>
                  Download
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="downloads-section container" id="downloads">
          <div className="section-header">
            <div>
              <p className="eyebrow">Downloads</p>
              <h2>Free Downloads</h2>
            </div>
          </div>

          <p className="downloads-description">
            Download selected edits and use them according to the usage information provided with each edit.
          </p>

          <div className="downloads-grid">
            {downloadableEdits.map((edit) => (
              <article key={edit.id} className="download-card">
                <div className="download-thumb" style={{ backgroundImage: `url(${edit.thumbnail})` }} />
                <div className="download-details">
                  <div className="download-head">
                    <h3>{edit.title}</h3>
                    <span className="category-tag">{edit.category}</span>
                  </div>

                  <div className="download-specs">
                    <span>Resolution: {edit.resolution}</span>
                    <span>Format: {edit.format}</span>
                    <span>File size: {edit.fileSize}</span>
                  </div>

                  <p className="usage-info">Usage: {edit.usage}</p>

                  <a className="button primary full" href={edit.download} download>
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section container" id="about">
          <div className="section-header narrow">
            <div>
              <p className="eyebrow">About</p>
              <h2>About its.__.editor</h2>
            </div>
          </div>
          <p className="about-copy">
            its.__.editor is a creative editing page focused on making high-quality video edits for creators and viewers.
          </p>
        </section>

        <section className="instagram-cta container" aria-labelledby="instagram-heading">
          <div className="cta-box">
            <p className="eyebrow">Instagram</p>
            <h2 id="instagram-heading">Follow the edits.</h2>
            <p>See the latest edits and updates on Instagram.</p>
            <div className="cta-handle">@its.__.editor</div>
            <a className="button primary" href={instagramUrl} target="_blank" rel="noreferrer">
              Follow on Instagram
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-brand">its.__.editor</div>
            <p>Creative edits for creators.</p>
          </div>

          <div className="footer-social">
            <span>Instagram:</span>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              @its.__.editor
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
