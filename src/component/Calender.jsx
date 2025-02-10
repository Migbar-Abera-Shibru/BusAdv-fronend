import React, { useEffect, useState } from "react";
import './Calender.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState(null);

  // Check for the auth_success query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get("auth_success");

    if (authSuccess === "true") {
      setIsSignedIn(true);
      fetchEvents();
    }
  }, []);

  const handleSignIn = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data.events);
      setError(null);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again.");
    }
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Google Calendar Integration</h1>
      {isSignedIn ? (
        <>
          <button className="sign-out-btn" onClick={() => setIsSignedIn(false)}>
            Sign Out
          </button>
          <button className="fetch-events-btn" onClick={fetchEvents}>
            Refresh Events
          </button>
          {error && <p className="error-message">{error}</p>}
          <div className="calendar-view">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <span className="event-title">{event.summary}</span>
                    <span className="event-time">
                      {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                    </span>
                  </div>
                  <p className="event-description">
                    {event.description || "No description available"}
                  </p>
                </div>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </>
      ) : (
        <button className="sign-in-btn" onClick={handleSignIn}>
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default Calendar;