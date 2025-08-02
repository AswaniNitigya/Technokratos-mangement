import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import FeedbackForm from './FeedbackForm';
import TShirtPage from './t-shirt';
import EventsPage from './events/EventForm';
import JoinUs from './JoinUs';
import GeminiChatbot from './GeminiChatbot';
import LiveGallery from './LiveGallery';
import Team from './team';
import Notices from './Notices';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);

  // Fetch feedback data
  useEffect(() => {
    const q = query(
      collection(db, 'feedbacks'), 
      orderBy('timestamp', 'desc'),
      limit(3)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedbackArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedbacks(feedbackArray);
      setFeedbackLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const features = [
    {
      title: "Comprehensive Resources",
      description: "Access to notes, previous year questions, and essential study materials"
    },
    {
      title: "Technical Excellence",
      description: "Leveraging technology to enhance your learning experience"
    },
    {
      title: "Student-Driven",
      description: "Built by students, for students, understanding your needs"
    },
    {
      title: "Community Focus",
      description: "Supporting and empowering the student community"
    }
  ];

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo-wrapper">
          <div className="logo">CSSE</div>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            {['Home','Events', 'Notices', 'Team', 'Join Us', 'Buy T-shirt', 'Feedback','Live Gallery'].map((item) => (
              <li
                key={item}
                className={`nav-item ${activeTab === item ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item);
                  setShowChatbot(false); // Close chatbot when switching tabs
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="main-content">
        {activeTab === 'Buy T-shirt' ? (
          <TShirtPage />
        ) : activeTab === 'Feedback' ? (
          <div className="feedback-page">
            <FeedbackForm />
            <div className="all-feedback-section">
              <h2>All Community Feedback</h2>
              {feedbackLoading ? (
                <p>Loading feedback...</p>
              ) : feedbacks.length === 0 ? (
                <p>No feedback yet. Be the first to share!</p>
              ) : (
                <div className="feedback-grid">
                  {feedbacks.map((fb) => (
                    <div key={fb.id} className="feedback-card">
                      <div className="feedback-header">
                        <strong>{fb.name}</strong> — <span>{fb.date}</span>
                        <div className="feedback-rating">{"★".repeat(fb.rating)}</div>
                      </div>
                      <p>{fb.feedback}</p>
                      {fb.subscribe && <span className="feedback-subscriber">✓ Subscribed</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'Events' ? (
          <EventsPage />
        ) : activeTab === 'Join Us' ? (
          <JoinUs />
        ) : activeTab === 'Team' ? (
          <Team />
        ) : activeTab === 'Notices' ? (
          <Notices />
        ) : activeTab === 'Live Gallery' ? (
          <LiveGallery />
        ) : (
          <div className="centered-content">
            <section className="about-section">
              <h2>About Us</h2>
              <div className="logo-container">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmE1Kje8g-quAjvNnhZFxMi_20wEcV2oH5Cw&s" 
                  alt="CSSE Logo" 
                  className="csse-logo"
                />
              </div>
              <p className="about-description">
                At CSSE, we are dedicated to creating an accessible and dynamic learning environment 
                that promotes academic and cultural excellence and continuous growth.
              </p>

              <div className="features">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="action-buttons">
              <button 
                className="join-button"
                onClick={() => setActiveTab('Join Us')}
              >
                Join Us
              </button>
              <button 
                className="chatbot-toggle-button"
                onClick={toggleChatbot}
              >
                {showChatbot ? 'Hide Assistant' : 'Ask Our AI Assistant'}
              </button>
            </div>

            <section className="home-feedback-section">
              <h2>Recent Community Feedback</h2>
              {feedbackLoading ? (
                <p>Loading feedback...</p>
              ) : feedbacks.length === 0 ? (
                <p>No feedback yet. Be the first to share!</p>
              ) : (
                <div className="feedback-grid">
                  {feedbacks.map((fb) => (
                    <div key={fb.id} className="feedback-card">
                      <div className="feedback-header">
                        <strong>{fb.name}</strong> — <span>{fb.date}</span>
                        <div className="feedback-rating">{"★".repeat(fb.rating)}</div>
                      </div>
                      <p>{fb.feedback}</p>
                      {fb.subscribe && <span className="feedback-subscriber">✓ Subscribed</span>}
                    </div>
                  ))}
                </div>
              )}
              <button 
                className="view-all-feedback" 
                onClick={() => setActiveTab('Feedback')}
              >
                View All Feedback
              </button>
            </section>
          </div>
        )}
      </main>

      {/* Render chatbot outside main content for proper positioning */}
      {showChatbot && <GeminiChatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
}

export default App;