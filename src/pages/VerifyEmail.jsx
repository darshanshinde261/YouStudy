import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import {signUp} from '../services/operations/authAPI'
import OTPInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';

///import OTPInput
export const VerifyEmail = () => {
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const {loading,signupData} = useSelector((state) => state.auth)

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData
        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate));
    }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] text-white grid place-items-center">
        {
            loading ?
            (<div className='spinner w-full'>hello</div>):
            (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A Verification code has been sent to you, Enter that code</p>
                    <form onSubmit={handleOnSubmit}>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (<input {...props} 
                             placeholder="-"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                              ></input>)}
                              containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                              }}
                            
                        />

                        <button type='submit'
                        className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                        >Verify Email</button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <Link to='/signup' className='flex gap-2 items-center'>
                        <BiArrowBack /><p>Back to signup</p>
                        </Link>
                    </div>
                    <button className="flex items-center text-blue-100 gap-x-2" onClick={() => dispatch(sendOtp(signupData.email,navigate))}>
                        Resent It
                    </button>
                </div>
            )
        }
    </div>
  )
}
