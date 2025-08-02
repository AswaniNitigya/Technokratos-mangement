// components/LiveGallery.jsx
import React, { useState } from 'react';
import './LiveGallery.css';

// Use public folder paths for images to work reliably in both dev and production
const images = [
  { src: '/assets/bugbusters.png', title: 'Bug Busters Event' },
  { src: '/assets/byteburst.png', title: 'Byte Burst Competition' },
  { src: '/assets/Csse-3.png', title: 'CSSE Department' },
  { src: '/assets/debate.png', title: 'Debate Competition' },
  { src: '/assets/Ds-sir.png', title: 'Faculty Interaction' },
  { src: '/assets/extempore.png', title: 'Extempore Event' },
  { src: '/assets/GD.png', title: 'Group Discussion' },
  { src: '/assets/leader.png', title: 'Leadership Workshop' },
  { src: '/assets/Mca-selection.png', title: 'MCA Selections' },
  { src: '/assets/pic-1.png', title: 'Campus Activity' },
  { src: '/assets/pic-2.png', title: 'Technical Workshop' },
  { src: '/assets/pic-3.png', title: 'Student Interaction' },
  { src: '/assets/pic4.png', title: 'College Event' },
  { src: '/assets/pic5.png', title: 'Guest Lecture' },
  { src: '/assets/pic6.png', title: 'Seminar Session' },
  { src: '/assets/pic7.png', title: 'Team Building' },
  { src: '/assets/pic8.png', title: 'Award Ceremony' },
  { src: '/assets/pic9.png', title: 'Cultural Event' },
  { src: '/assets/pooja.png', title: 'POPJA Event' },
  { src: '/assets/techno-celeb.png', title: 'Tech Celebration' }
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