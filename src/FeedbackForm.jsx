// FeedbackForm.jsx
import { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'feedbacks'), {
        name,
        email,
        rating,
        feedback,
        subscribe,
        timestamp: serverTimestamp(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      });

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setRating(5);
      setFeedback('');
      setSubscribe(false);

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="feedback-header">
          <h2>Share Your Feedback</h2>
          <p className="feedback-subtitle">We value your opinion to help us improve</p>
        </div>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="rating-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`rating-star ${star <= rating ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows="5"
              placeholder="Share your thoughts with us..."
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="subscribe"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
            />
            <label htmlFor="subscribe">Subscribe to our newsletter</label>
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Submitting...
              </>
            ) : (
              'Submit Feedback'
            )}
          </button>

          {submitSuccess && (
            <div className="feedback-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>Thank you for your valuable feedback!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;