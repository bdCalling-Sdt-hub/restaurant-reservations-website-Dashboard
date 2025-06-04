
import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { Link } from 'react-router-dom';

const Otp = () => {

  const [otp, setOtp] = useState('');
  console.log(otp);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - form */}
      <div className='md:flex-[2] flex flex-col justify-center items-start px-6 md:px-20 p-20 md:pt-0  bg-white
                      md:ml-36 md:min-h-screen'>
        <div className='min-w-96'>
          <h2 className='text-3xl font-medium '>Verify OTP</h2>
          <p className=' mt-5 text-gray-600'>Please Enter the OTP sented to your email . </p>
          <div className='mt-5'>
            <label className='font-semibold' htmlFor="email">Enter OTP </label>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{ justifyContent: 'space-between' }}
              renderInput={(props) => (
                <input
                  {...props} // Spread props from OTPInput (like value, onChange, etc.)
                  className="!border-b-2  border-[#4b1c2f]  px-2 py-1" // Custom styles for the input
                  style={{ width: '50px', height: '50px', textAlign: 'center' }} // Optional: adjust input size if needed
                />
              )}
            />


          </div>
          <Link to="/update-password" className='mt-5 block'>
            <button className='cursor-pointer w-full p-2 bg-[#4b1c2f]  font-semibold text-white rounded-md'>Verify</button>
          </Link>
        </div>
      </div>

      {/* Right side - image with purple background */}
      <div className="md:flex-1  bg-[#4b1c2f] md:flex hidden justify-center items-center relative
                mt-8 md:mt-0 h-64 md:h-auto">
        <img
          src="/Auth/all.png" // your image path
          alt="Cafe interior"
          className="object-cover md:block hidden max-w-full max-h-full md:absolute md:left-0 md:-ml-[50%] shadow-lg"
          style={{ maxHeight: '600px' }}
        />
      </div>
    </div>
  );
}

export default Otp;
