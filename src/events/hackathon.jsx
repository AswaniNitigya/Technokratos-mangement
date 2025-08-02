// pages/events/Hackathon.jsx
import EventForm from './events/EventForm';

const Hackathon = () => {
  return (
    <div className="event-page-container">
      <div className="event-description">
        <h1>Hackathon</h1>
        <p>
          24-hour coding marathon to build innovative solutions for real-world problems.
          Prizes for top three teams!
        </p>
      </div>
      <EventForm eventName="Hackathon" />
    </div>
  );
};

export default Hackathon;