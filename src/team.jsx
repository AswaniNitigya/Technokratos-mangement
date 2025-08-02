import React from 'react';
import './App.css';

const Team = () => {
  const teamMembers = [
  
    {
      name: "Shubhojeet",
      role: "President",
      description: "Leading the team with vision and dedication.",
      img: "https://i.postimg.cc/MpyfFjNR/PKS-5148.jpg",
      color: "#e74c3c"
    },
    {
      name: "Nitigya",
      role: "Vice President",
      description: "Assisting the president and leading initiatives.",
      img: "https://i.postimg.cc/zX79SdXR/nitigya-aswani.jpg",
      color: "#2ecc71"
    },
    {
      name: "Utkarsh",
      role: "Secretary",
      description: "Managing communications and documentation.",
      img: "https://i.postimg.cc/y8qSjTQs/Whats-App-Image-2025-08-01-at-16-05-33.jpg",
      color: "#f39c12"
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'fab fa-linkedin' },
    { name: 'Twitter', icon: 'fab fa-twitter' },
    { name: 'GitHub', icon: 'fab fa-github' },
    { name: 'Email', icon: 'fas fa-envelope' }
  ];

  return (
    <div className="team-container">
      <div className="team-header">
        <h1>Our Team</h1>
        <div className="header-divider"></div>
        <p className="subtitle">Meet the passionate individuals driving CSSE forward</p>
      </div>
      
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="team-card"
            style={{ '--accent-color': member.color }}
          >
            <div className="member-image-container">
              {member.img ? (
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="member-image"
                  loading="lazy"
                />
              ) : (
                <div className="team-avatar" style={{ backgroundColor: member.color }}>
                  {member.avatar}
                </div>
              )}
              <div className="image-overlay"></div>
            </div>
            
            <div className="member-info">
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-description">{member.description}</p>
              
              <div className="social-links">
                {socialLinks.map((link, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="social-link"
                    aria-label={`${member.name}'s ${link.name}`}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="team-cta">
        <h2>Want to Join Our Team?</h2>
        <p>We're always looking for passionate students to contribute to our organization.</p>
        <a href='https://wa.link/j4zm5x'><button className="cta-button" >Contact Us</button></a>
      </div>
    </div>
  );
};

export default Team;