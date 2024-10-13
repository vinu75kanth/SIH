import React, { useState } from 'react';
import './JobSeekerSignup.css';
import { useNavigate } from 'react-router-dom';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const JobSeekerSignup = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Toggles for showing and hiding passwords
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

   
     if (password.length < 8) {
      alert('Password should be at least 8 characters long');
      return; // Stop further execution if password is too short
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return; // Stop further execution if passwords don't match
    }
    // Uncomment the following lines for API integration
    
    try {
      const response = await fetch(process.env.REACT_APP_usersignup_api, {
        method: process.env.REACT_APP_usersignup_method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          country,
          state,
          city,
          age,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Signup successful');
        navigate('/jobseeker/login');
      } else {
        alert('Signup failed: ' + data.message);
        if (data.message === 'User Already Exists') {
          navigate('/jobseeker/login');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  return (
    <div className="signup-container">
      <h1 className="form-title">Student or Job Seeker</h1>
      <div id="i145" className="signup-form">
        <h2 id="i146" className="form-subtitle">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="i147"
            placeholder="Name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
          id="i147"
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
 <div className="password-container">
            <input
            id="i147"
              type={showPassword ? '' : 'password'}
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={togglePasswordVisibility} className="password-toggle">
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="password-container">
            <input
            id="i147"
              type={showConfirmPassword ? '' : 'password'}
              placeholder="Confirm Password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={toggleConfirmPasswordVisibility} className="password-toggle">
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>


          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setCountry(e.name); // Set the selected country name
              setState(''); // Reset state and city when country changes
              setCity('');
            }}
            placeHolder="Select Country"
            value={countryid} // Set selected country id
          />
          <br />

          <StateSelect
            countryid={countryid}
            onChange={(e) => {
              setStateid(e.id);
              setState(e.name); // Set the selected state name
              setCity(''); // Reset city when state changes
            }}
            placeHolder="Select State"
            value={stateid} // Set selected state id
          />
          <br />

          <CitySelect
            countryid={countryid}
            stateid={stateid}
            onChange={(e) => {
              setCity(e.name); // Set the selected city name
            }}
            placeHolder="Select City"
            value={city} // Set selected city name
          />
          <br />

          <div className="address-container">
            <input
            id="i147"
              type="number"
              placeholder="Age"
              className="form-input small-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button  id="i148" type="submit" className="submit-button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerSignup;
