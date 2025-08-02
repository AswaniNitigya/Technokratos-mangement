import { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import './FeedbackForm.css'; // Reuse the same styles

const FeedbackDisplay = ({ maxItems }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const q = query(
          collection(db, 'feedbacks'),
          orderBy('timestamp', 'desc'),
          limit(maxItems)
        );
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const feedbacksArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setFeedbacks(feedbacksArray);
          setIsLoading(false);
        });
        
        return unsubscribe;
      } catch (err) {
        setError('Failed to load feedbacks');
        setIsLoading(false);
        console.error("Error fetching feedbacks: ", err);
      }
    };

    const unsubscribe = fetchFeedbacks();
    return () => unsubscribe();
  }, [maxItems]);

  if (isLoading) return <div className="loading-state">Loading feedback...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (feedbacks.length === 0) return <p className="no-feedback">No feedback yet</p>;

  return (
    <div className="feedback-grid">
      {feedbacks.map(feedback => (
        <div key={feedback.id} className="feedback-card">
          <div className="feedback-header">
            <span className="feedback-name">{feedback.name}</span>
            <span className="feedback-date">{feedback.date}</span>
            <div className="feedback-rating">
              {Array(feedback.rating).fill().map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
          <p className="feedback-text">{feedback.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackDisplay;