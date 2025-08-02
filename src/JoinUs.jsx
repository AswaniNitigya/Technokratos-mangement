import React from 'react';
import './JoinUs.css'; // We'll create this CSS file next

const JoinUs = () => {
  return (
    <div className="join-us-container">
      <div className="join-us-card">
        <div className="join-us-icon">✋</div>
        <h2 className="join-us-title">Join Our Community</h2>
        <div className="join-us-message">
          <p>We are not currently accepting induction forms.</p>
          <p>We'll get back to you soon!</p>
        </div>
        <div className="join-us-decoration">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;