import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('http://127.0.0.1:2000/api/v1/signin', {
        email,
        password,
      });
      console.log(response.data);
      const token = response.data.token;
      // Store the token in local storage or session storage for future authenticated requests
      localStorage.setItem('token', token);
      // Optionally, redirect the user to a different page upon successful login
      // history.push('/dashboard');
     
      } catch (error) {
        console.error('Signup failed:', error);
        setError('Failed to signup. Please try again.'); // Set error message for user feedback
      }
    } 

  return (
    <>
      <section className="bg-indigo-100 py-5 pr-5 my-20 px-6 mr-4 ml-1 w-min">
        <h2 className="text-3xl text-center font-semibold mb-6">Sign In</h2>
        <div className="flex items-center justify-center h-screen bg-gray-600 text-black text-2xl">
          <div className="border border-black-300 py-23 px-4 mx-auto rounded relative text-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email"
                id="email"
                className="mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <br />
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <br />
              <button className="bg-green-200 rounded-md py-2 px-3 mx-5 hover:gray hover:text-blue-300 text-white">
                login
              </button>
              <Link to="/signup">Click here to register</Link>
            </form>
            {error && <p className="text-red-500 mt-3">{error}</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
