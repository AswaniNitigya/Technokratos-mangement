import { useState } from 'react';
import './GeminiChatbot.css';

export default function GeminiChatbot({ onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      console.log('Processing user input:', input);
      
      // For now, let's use a smart mock response system
      let response = '';
      
      if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        response = "Hello! I'm your AI assistant for the Technokratos Management System. How can I help you today?";
      } else if (input.toLowerCase().includes('help')) {
        response = "I can help you with information about CSSE events, team details, notices, and general questions about the Technokratos Management System. What would you like to know?";
      } else if (input.toLowerCase().includes('event') || input.toLowerCase().includes('events')) {
        response = "We have various events including technical workshops, debates, group discussions, and cultural activities. You can check the Events tab for registration details.";
      } else if (input.toLowerCase().includes('team') || input.toLowerCase().includes('member')) {
        response = "Our team consists of dedicated CSSE students working together to create an amazing learning environment. Check the Team tab to learn more about us.";
      } else if (input.toLowerCase().includes('notice') || input.toLowerCase().includes('announcement')) {
        response = "We regularly post notices and announcements about upcoming events, registrations, and important updates. Check the Notices tab for the latest information.";
      } else if (input.toLowerCase().includes('join') || input.toLowerCase().includes('participate')) {
        response = "Great! You can join us by visiting the 'Join Us' tab. We're always looking for passionate students to be part of our organization.";
      } else if (input.toLowerCase().includes('gallery') || input.toLowerCase().includes('photo')) {
        response = "You can view our event photos and memories in the Live Gallery tab. We capture all our best moments there!";
      } else if (input.toLowerCase().includes('feedback') || input.toLowerCase().includes('suggest')) {
        response = "We value your feedback! You can share your thoughts and suggestions in the Feedback tab. Your input helps us improve.";
      } else if (input.toLowerCase().includes('t-shirt') || input.toLowerCase().includes('merchandise')) {
        response = "You can purchase CSSE merchandise including t-shirts in the 'Buy T-shirt' tab. Show your support for our organization!";
      } else if (input.toLowerCase().includes('thank')) {
        response = "You're welcome! I'm here to help. Feel free to ask me anything about CSSE or the Technokratos Management System.";
      } else if (input.toLowerCase().includes('bye') || input.toLowerCase().includes('goodbye')) {
        response = "Goodbye! Have a great day. Don't hesitate to ask if you need help again!";
      } else {
        response = "I understand you're asking about '" + input + "'. While I'm currently in demo mode, I can help you navigate the Technokratos Management System. Try asking about events, team, notices, or other features available in the navigation tabs.";
      }
      
      // Simulate API delay
      setTimeout(() => {
        const botMessage = { text: response, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error in chatbot:", error);
      const errorMessage = { 
        text: "I'm having trouble processing your request right now. Please try again or contact support.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>AI Assistant</h3>
        <button className="close-chatbot" onClick={handleClose}>×</button>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="message bot">
            Hello! I'm your AI assistant for the Technokratos Management System. I can help you with information about events, team, notices, and more. Try asking me something!
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot">Typing...</div>}
      </div>

      <div className="chat-input-container">
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
