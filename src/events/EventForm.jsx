import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './EventForm.css';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    collegeId: '',
    phone: '',
    department: '',
    year: '',
    event: '',
    transactionId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // List of available events
  const events = [
    'Bug Busters',
    'Debate Competition',
    'Hackathon',
    'Extempore',
    'Group Discussion',
    'Technical Workshop',
    'Coding Challenge',
    'Robotics Workshop'
  ];

  const departments = [
    { value: 'CSE', label: 'Computer Science & Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'ECE', label: 'Electronics & Communication' },
    { value: 'ME', label: 'Mechanical Engineering' },
    { value: 'CE', label: 'Civil Engineering' },
    { value: 'EE', label: 'Electrical Engineering' }
  ];

  const years = [
    { value: '1', label: 'First Year' },
    { value: '2', label: 'Second Year' },
    { value: '3', label: 'Third Year' },
    { value: '4', label: 'Fourth Year' }
  ];

  const genders = [
    'Male',
    'Female',
    'Other',
    'Prefer not to say'
  ];

  const navItems = [
    'Home',
    'Events',
    'Notices',
    'Team',
    'Join Us',
    'Buy T-shirt',
    'Feedback',
    'Live Gallery'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'event_registrations'), {
        ...formData,
        timestamp: serverTimestamp(),
        registrationDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        age: '',
        gender: '',
        email: '',
        collegeId: '',
        phone: '',
        department: '',
        year: '',
        event: '',
        transactionId: ''
      });

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="event-form-container">
      <div className="event-form-wrapper">
        <div className="event-header">
          <h1>Technokratos</h1>
          <nav className="event-nav">
            {navItems.map((item) => (
              <a key={item} href="#" className="nav-link">{item}</a>
            ))}
          </nav>
        </div>

        <div className="form-content">
          <h2 className="form-title">Event Registration</h2>
          
          {submitSuccess && (
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>Registration successful! We'll contact you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label>Select Event *</label>
              <select
                name="event"
                value={formData.event}
                onChange={handleChange}
                required
                className="event-select"
              >
                <option value="">-- Choose an event --</option>
                {events.map((event, index) => (
                  <option key={index} value={event}>{event}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="16"
                  max="30"
                  placeholder="18"
                />
              </div>
            </div>

            <div className="form-row">
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
              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Gender --</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>{gender}</option>
                  ))}
                </select>
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
                  placeholder="Enter your college ID"
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
                  <option value="">-- Select Department --</option>
                  {departments.map((dept) => (
                    <option key={dept.value} value={dept.value}>{dept.label}</option>
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
                  <option value="">-- Select Year --</option>
                  {years.map((year) => (
                    <option key={year.value} value={year.value}>{year.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Transaction ID (If any T-Shirt is bought)</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter your transaction ID (optional)"
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Registering...
                </>
              ) : (
                'Register Now'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;