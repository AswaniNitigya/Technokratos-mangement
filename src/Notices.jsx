import React from 'react';

const Notices = () => {
  const notices = [
    {
      id: 1,
      title: "Upcoming Events",
      content: "Stay tuned for exciting events and workshops coming soon!",
      date: "2024-01-15",
      priority: "high"
    },
    {
      id: 2,
      title: "Registration Open",
      content: "Event registrations are now open for all students.",
      date: "2024-01-10",
      priority: "medium"
    },
    {
      id: 3,
      title: "Team Meeting",
      content: "Regular team meetings will be held every Friday.",
      date: "2024-01-05",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#7f8c8d';
    }
  };

  return (
    <div className="notices-container">
      <div className="notices-header">
        <h1>Notices & Announcements</h1>
        <p>Stay updated with the latest news and announcements</p>
      </div>
      
      <div className="notices-grid">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-card">
            <div className="notice-priority" style={{ backgroundColor: getPriorityColor(notice.priority) }}>
              {notice.priority.toUpperCase()}
            </div>
            <div className="notice-content">
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <span className="notice-date">{notice.date}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="notices-message">
        <h2>No New Notices</h2>
        <p>Check back later for new announcements and updates!</p>
      </div>
    </div>
  );
};

export default Notices; 