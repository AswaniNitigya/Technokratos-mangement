// pages/events/Debate.jsx
import EventForm from './EventForm';

const bugbusters = () => {
  return (
    <div className="event-page-container">
      <div className="event-description">
        <h1>Bug Busters</h1>
        <p>
          Showcase your debugging skills in our annual Bug Busters competition.
          Participants will work in teams to resolve real-world software bugs.
        </p>
      </div>
      <EventForm eventName="Bug Busters" />
    </div>
  );
};

export default bugbusters;