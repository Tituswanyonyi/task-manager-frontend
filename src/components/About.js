import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">Task Manager App</h1>
      <p className="about-description">
        It allows users to create tasks, view their tasks, update tasks, delete tasks, update tasks, and mark tasks as Complete or Incomplete.
      </p>
      <p className="about-login-link">
        <Link to="/login" className="login-link">Login</Link> to get started.
      </p>
    </div>
  );
};

export default About;
