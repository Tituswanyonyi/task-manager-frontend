import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignupForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './components/About';

const App = () => {
  return (
    <Router>
       <Navbar /> 
      <Routes>
        {/* Define your routes using the Route element */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
