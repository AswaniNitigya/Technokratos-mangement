// components/LiveGallery.jsx
import React, { useState } from 'react';
import './LiveGallery.css';

// Use dynamic imports for images to work properly in production
const images = [
  /* @vite-ignore */
  { src: new URL('../assets/bugbusters.png', import.meta.url).href, title: 'Bug Busters Event' },
  /* @vite-ignore */
  { src: new URL('../assets/byteburst.png', import.meta.url).href, title: 'Byte Burst Competition' },
  /* @vite-ignore */
  { src: new URL('../assets/Csse-3.png', import.meta.url).href, title: 'CSSE Department' },
  /* @vite-ignore */
  { src: new URL('../assets/debate.png', import.meta.url).href, title: 'Debate Competition' },
  /* @vite-ignore */
  { src: new URL('../assets/Ds-sir.png', import.meta.url).href, title: 'Faculty Interaction' },
  /* @vite-ignore */
  { src: new URL('../assets/extempore.png', import.meta.url).href, title: 'Extempore Event' },
  /* @vite-ignore */
  { src: new URL('../assets/GD.png', import.meta.url).href, title: 'Group Discussion' },
  /* @vite-ignore */
  { src: new URL('../assets/leader.png', import.meta.url).href, title: 'Leadership Workshop' },
  /* @vite-ignore */
  { src: new URL('../assets/Mca-selection.png', import.meta.url).href, title: 'MCA Selections' },
  /* @vite-ignore */
  { src: new URL('../assets/pic-1.png', import.meta.url).href, title: 'Campus Activity' },
  /* @vite-ignore */
  { src: new URL('../assets/pic-2.png', import.meta.url).href, title: 'Technical Workshop' },
  /* @vite-ignore */
  { src: new URL('../assets/pic-3.png', import.meta.url).href, title: 'Student Interaction' },
  /* @vite-ignore */
  { src: new URL('../assets/pic4.png', import.meta.url).href, title: 'College Event' },
  /* @vite-ignore */
  { src: new URL('../assets/pic5.png', import.meta.url).href, title: 'Guest Lecture' },
  /* @vite-ignore */
  { src: new URL('../assets/pic6.png', import.meta.url).href, title: 'Seminar Session' },
  /* @vite-ignore */
  { src: new URL('../assets/pic7.png', import.meta.url).href, title: 'Team Building' },
  /* @vite-ignore */
  { src: new URL('../assets/pic8.png', import.meta.url).href, title: 'Award Ceremony' },
  /* @vite-ignore */
  { src: new URL('../assets/pic9.png', import.meta.url).href, title: 'Cultural Event' },
  /* @vite-ignore */
  { src: new URL('../assets/pooja.png', import.meta.url).href, title: 'POPJA Event' },
  /* @vite-ignore */
  { src: new URL('../assets/techno-celeb.png', import.meta.url).href, title: 'Tech Celebration' }
];

const LiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="gallery-container">
      <h1>Live Gallery</h1>
      <p className="gallery-subtitle">Capturing our best moments</p>
      
      <div className="filter-controls">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Events
        </button>
        <button 
          className={filter === 'event' ? 'active' : ''}
          onClick={() => setFilter('event')}
        >
          Events
        </button>
        <button 
          className={filter === 'workshop' ? 'active' : ''}
          onClick={() => setFilter('workshop')}
        >
          Workshops
        </button>
      </div>

      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.src} 
              alt={image.title}
              loading="lazy"
            />
            <div className="image-overlay">
              <p>{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <h3>{selectedImage.title}</h3>
            <button 
              className="close-modal"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveGallery;