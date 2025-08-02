import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: "CSSE Team",
      role: "Student Organization",
      description: "Dedicated students working together to create an amazing learning environment."
    }
  ];

  return (
    <div className="team-container">
      <div className="team-header">
        <h1>Our Team</h1>
        <p>Meet the dedicated members behind CSSE</p>
      </div>
      
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-avatar">
              <span>👥</span>
            </div>
            <h3>{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p className="team-description">{member.description}</p>
          </div>
        ))}
      </div>
      
      <div className="team-message">
        <h2>Join Our Team</h2>
        <p>We're always looking for passionate students to join our organization. 
           Contact us to learn more about opportunities!</p>
      </div>
    </div>
  );
};

export default Team;
