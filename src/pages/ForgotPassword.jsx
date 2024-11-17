import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import toast from 'react-hot-toast';

export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [emailSend,setEmailSend] = useState(false);
    const [email,setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth)

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSend));
    }

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-white">
            {
                loading ? (<div className='spinner'></div>) : 
                (<div className="max-w-[500px] p-4 lg:p-8 border-r-[2px] border-opacity-20 border-l-[2px] border-white">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {
                            !emailSend ? "Reset your Password" : "Check your Email"
                        }
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        {
                            !emailSend ? "Have no fear. We will email your instructor to reset your password. If you don't have access your email we can try account recovery" :
                             `we have send reset email to ${email}`
                        }
                    </p>
                    <form onSubmit={handleOnSubmit}>
            {!emailSend && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style text-black w-full h-7"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSend ? "Sumbit" : "Resend Email"}
            </button>
          </form>
                    <div className='mt-2'>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>)
            }
        </div>
    )
}
 