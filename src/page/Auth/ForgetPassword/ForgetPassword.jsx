 
import React from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side - form */}
            <div className='md:flex-[2] flex flex-col justify-center items-start px-6 md:px-20 p-20 md:pt-0  bg-white
                      md:ml-36 md:min-h-screen'>
                <div className='min-w-96'>
                    <h2 className='text-3xl font-medium '>Forgot Password?</h2>
                    <p className=' mt-5 text-gray-600'>Please enter your email address <br /> to reset
                        your password.</p>
                    <div className='mt-5'>
                        <label className='font-semibold' htmlFor="email">Email</label>
                        <input placeholder='Enter your email' className='mt-2 w-full p-2 border border-[#4b1c2f] rounded-md focus:outline-0 ring-0 bg-white' type="email" name="email" id="email" />
                    </div>
                    <Link to={'/verify-otp'} className='mt-5 block'>
                        <button className='cursor-pointer w-full p-2 bg-[#4b1c2f] font-semibold text-white rounded-md'>Send OTP</button>
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

export default ForgetPassword;


