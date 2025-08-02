import { useState } from 'react';
import './GeminiChatbot.css';

export default function GeminiChatbot() {
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
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Technokratos Management System",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528:free",
          "messages": [
            {
              "role": "user",
              "content": input
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { text: data.choices[0].message.content, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling OpenRouter:", error);
      const errorMessage = { text: "Sorry, I couldn't process your request. Please try again.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>AI Assistant</h3>
        <button className="close-chatbot" onClick={() => window.close()}>×</button>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="message bot">
            Hello! I'm your AI assistant. How can I help you today?
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
