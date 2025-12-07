// LoadingSpinner.jsx
import React, { useState, useEffect } from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  const [currentStatus, setCurrentStatus] = useState(0);

  const statusMessages = [
    "Initializing database connection",
    "Retrieving case records",
    "Processing legal citations",
    "Loading user preferences",
    "Finalizing setup",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(
        (prevStatus) => (prevStatus + 1) % statusMessages.length
      );
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [statusMessages.length]);

  return (
    <div className="loading-container-box">
      <div className="loading-container">
        <div className="logo">
          BUK<span>Law</span>Report
        </div>

        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>

        <div className="loading-text">Loading case data...</div>

        <div className="progress-bar">
          <div className="progress"></div>
        </div>

        <div className="status">{statusMessages[currentStatus]}</div>
        <div className="hint">This may take a few moments</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
