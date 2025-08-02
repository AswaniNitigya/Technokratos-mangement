// pages/events/Debate.jsx
import EventForm from './EventForm';

const Debate = () => {
  return (
    <div className="event-page-container">
      <div className="event-description">
        <h1>Debate Competition</h1>
        <p>
          Showcase your public speaking skills in our annual debate competition.
          Topics will cover current affairs and technical innovations.
        </p>
      </div>
      <EventForm eventName="Debate Competition" />
    </div>
  );
};

export default Debate;