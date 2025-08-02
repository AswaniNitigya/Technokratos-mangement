import React, { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './JoinUs.css';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeId: '',
    department: '',
    year: '',
    phone: '',
    interests: [],
    skills: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const departments = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering'
  ];

  const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
  const interestOptions = [
    'Web Development',
    'App Development',
    'UI/UX Design',
    'Content Writing',
    'Event Management',
    'Graphic Design'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'join_us_applications'), {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'pending'
      });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        collegeId: '',
        department: '',
        year: '',
        phone: '',
        interests: [],
        skills: ''
      });

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="join-us-container">
      <div className="join-us-card">
        <div className="join-us-icon">✋</div>
        <h2 className="join-us-title">Join Our Community</h2>
        
        {submitSuccess ? (
          <div className="join-us-message">
            <p>Thank you for your application!</p>
            <p>We'll review your submission and get back to you soon.</p>
          </div>
        ) : (
          <>
            <div className="join-us-message">
              <p>Fill out the form below to apply for membership</p>
            </div>

            <form onSubmit={handleSubmit} className="join-us-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>College ID *</label>
                  <input
                    type="text"
                    name="collegeId"
                    value={formData.collegeId}
                    onChange={handleChange}
                    required
                    placeholder="Your college ID"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Year *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Areas of Interest (Select all that apply)</label>
                <div className="checkbox-group">
                  {interestOptions.map((interest, index) => (
                    <label key={index} className="checkbox-option">
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        checked={formData.interests.includes(interest)}
                        onChange={handleChange}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Skills/Experience</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Briefly describe your skills and experience"
                  rows="3"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </>
        )}

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