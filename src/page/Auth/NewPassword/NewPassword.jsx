 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewPassword = () => {
    // State to toggle password visibility for each field
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Function to toggle password visibility
    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    // Function to toggle confirm password visibility
    const toggleConfirmPassword = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    return (

        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side - form */}
            <div className='md:flex-[2] flex flex-col justify-center items-start px-6 md:px-20 p-20 md:pt-0  bg-white
                      md:ml-36 md:min-h-screen'>
                <div className='min-w-80'>
                    <h2 className='text-3xl font-medium text-center'>Update Password</h2>
                    <p className='text-center mt-5 text-gray-600'>Please Enter your New Password and Confirm Password</p>

                    <div className='mt-5'>
                        <label className='font-semibold' htmlFor="password">Password</label>
                        <div className='relative'>
                            <input
                                placeholder='Enter your password'
                                className='mt-2 w-full p-2 border border-[#4b1c2f] rounded-md focus:outline-0 ring-0 bg-white'
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                name="password"
                                id="password"
                            />
                            {/* Show/Hide Password Icon */}
                            <button
                                type="button"
                                onClick={togglePassword}
                                className='absolute cursor-pointer right-3 top-[30px] transform -translate-y-1/2 text-gray-500'
                            >
                                {!showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <label className='font-semibold' htmlFor="confirm-password">Confirm Password</label>
                        <div className='relative'>
                            <input
                                placeholder='Confirm your password'
                                className='mt-2 w-full p-2 rounded border border-[#4b1c2f]rounded-md focus:outline-0 ring-0 bg-white'
                                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                                name="confirm-password"
                                id="confirm-password"
                            />
                            {/* Show/Hide Password Icon */}
                            <button
                                type="button"
                                onClick={toggleConfirmPassword}
                                className='absolute cursor-pointer right-3 top-[30px] transform -translate-y-1/2 text-gray-500'
                            >
                                {!showConfirmPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <Link to={'/login'} className='mt-5 block'>
                        <button className='cursor-pointer w-full p-2 bg-[#4b1c2f] font-semibold text-white rounded-md'>
                            Update
                        </button>
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
};

export default NewPassword;
