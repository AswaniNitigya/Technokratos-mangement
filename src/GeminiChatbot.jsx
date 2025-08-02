import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './GeminiChatbot.css'; // Ensure you have styles for the chatbot

export default function GeminiChatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_Openroute_API_KEY); // Replace with your key

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Generate response
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const botMessage = { text, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      const errorMessage = { text: "Sorry, I couldn't process your request.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Gemini Chatbot</h2>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot">Typing...</div>}
      </div>

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
  );
}
