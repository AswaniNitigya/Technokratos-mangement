import React, { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './JoinUs.css';

const JoinUs = () => {
  // Configurable form fields
  const formFields = {
    personalInfo: [
      { id: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your.email@example.com' },
      { id: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '9876543210', pattern: '[0-9]{10}' }
    ],
    academicInfo: [
      { 
        id: 'department', 
        label: 'Department', 
        type: 'select', 
        required: true,
        options: [
          'Computer Science & Engineering',
          'Information Technology',
          'Electronics & Communication',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electrical Engineering'
        ]
      },
      { 
        id: 'year', 
        label: 'Year', 
        type: 'select', 
        required: true,
        options: ['First Year', 'Second Year', 'Third Year', 'Fourth Year']
      }
    ],
    additionalInfo: [
      { id: 'age', label: 'Age', type: 'number', required: true, min: 16, max: 30, placeholder: '18' },
      { 
        id: 'gender', 
        label: 'Gender', 
        type: 'select', 
        required: true,
        options: ['Male', 'Female', 'Other', 'Prefer not to say']
      },
      { 
        id: 'interests', 
        label: 'Areas of Interest', 
        type: 'checkbox-group',
        options: [
          'Programming',
          'Design',
          'Management',
          'Content Writing',
          'Event Planning'
        ]
      },
      { id: 'portfolio', label: 'Portfolio Link', type: 'url', placeholder: 'https://yourportfolio.com' }
    ]
  };

  const [formData, setFormData] = useState(
    Object.values(formFields).reduce((acc, section) => {
      section.forEach(field => {
        if (field.type === 'checkbox-group') {
          acc[field.id] = [];
        } else {
          acc[field.id] = '';
        }
      });
      return acc;
    }, {})
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'induction_applications'), {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'pending'
      });

      setSubmitSuccess(true);
      // Reset form
      setFormData(
        Object.values(formFields).reduce((acc, section) => {
          section.forEach(field => {
            if (field.type === 'checkbox-group') {
              acc[field.id] = [];
            } else {
              acc[field.id] = '';
            }
          });
          return acc;
        }, {})
      );

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
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            name={field.id}
            value={formData[field.id]}
            onChange={handleChange}
            required={field.required}
          >
            <option value="">-- Select {field.label} --</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'checkbox-group':
        return (
          <div className="checkbox-group">
            {field.options.map((option, index) => (
              <label key={index} className="checkbox-option">
                <input
                  type="checkbox"
                  name={field.id}
                  value={option}
                  checked={formData[field.id].includes(option)}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            name={field.id}
            value={formData[field.id]}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            pattern={field.pattern}
          />
        );
    }
  };

  return (
    <div className="induction-container">
      <div className="induction-header">
        <h1>Join CSSE</h1>
        <p>Fill out the form to apply for induction</p>
      </div>

      {submitSuccess && (
        <div className="success-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <p>Application submitted successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="induction-form">
        {Object.entries(formFields).map(([sectionName, fields]) => (
          <div key={sectionName} className="form-section">
            <h3>{sectionName.split(/(?=[A-Z])/).join(' ')}</h3>
            <div className="form-grid">
              {fields.map((field) => (
                <div key={field.id} className="form-group">
                  <label>
                    {field.label}
                    {field.required && <span className="required"> *</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinUs;