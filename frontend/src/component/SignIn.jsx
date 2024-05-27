import React, { useState } from 'react';
import axios from 'axios';

const signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    console.log('submitting');
    e.preventDefault();
    try {
      const data = await axios.post('http://127.0.0.1:2000/api/v1/signup', {
        email,
        password,
      });
      console.log(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section className="mx-auto my-20 px-6 ">
        <div className="flex items-center justify-center h-screen  text-black text-2xl">
          <div className=" bg-indigo-100  border border-black-300 py-6 px-4 mx-auto rounded relative text-center flex-align middle">
            <h2 className="text-3xl text-center font-semibold mb-6 ">
              sign up
            </h2>
            <form action="">
              <input
                type="text"
                placeholder="Email"
                className="mt-2"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <br />

              <input
                type="password"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              <input type="text" placeholder="address" required />
              <br />
              <br />
              <input type="number" placeholder="phone number" required />
              <br />
              <br />
              <input type="text" placeholder="location" required />
              <br />
              <br />

              <button
                className="bg-sky-200 rounded-md py-2 px-5 mx-3 hover:gray hover:text-blue-300 text-white-300"
                onClick={(e) => submitHandler(e)}
              >
                signup
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default signin;
