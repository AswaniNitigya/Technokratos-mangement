// pages/Events.jsx
import { Link } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const events = [
    { id: 'bugbusters', name: 'Bug Busters', description: 'Debugging competition for coders' },
    { id: 'debate', name: 'Debate', description: 'Public speaking competition' },
    { id: 'extempore', name: 'Extempore', description: 'Impromptu speaking event' },
    { id: 'hackathon', name: 'Hackathon', description: '24-hour coding marathon' }
  ];

  return (
    <div className="events-page">
      <h1>College Events</h1>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <Link to={`/events/${event.id}`} className="participate-btn">
              Participate
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;