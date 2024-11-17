import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiFillEyeInvisible,AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';


export const UpdatePassword = () => {
    const location = useLocation;
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth);
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const {password,confirmPassword} = formData;
    const handleOnChange = (e) =>{
        setFormData((prevData) =>(
            {
                ...prevData,
                [e.target.name]:e.target.value 
            }
        ))
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password,confirmPassword))
    }
  return (
    <div>
        {
            loading ? (
                <div className='spinner'></div>
            ):( 
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done enter your new password and your all set</p>
                <form onSubmit={handleOnSubmit}>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password</p>
                        <input 
                        type={showPassword ? "text" : "password"}
                        name='password'
                        value={password}
                        onChange={handleOnChange}
                        placeholder='new password'
                        required
                        className="form-style w-full !pr-10"
                         />
                         <span onClick={()=>{setShowPassword((prev) =>!prev)}}>
                            {
                                showPassword ? 
                                <AiFillEyeInvisible></AiFillEyeInvisible>
                                :<AiFillEye></AiFillEye>
                            }
                         </span>
                    </label>
                    <label className="relative mt-3 block">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">confirm New Password</p>
                        <input 
                        type={showConfirmPassword ? "text" : "password"}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder='confirmpassword'
                        required
                        className="form-style w-full !pr-10"
                         />
                         <span onClick={()=>{setShowConfirmPassword((prev) =>!prev)}} 
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                            {
                                showConfirmPassword ? 
                                <AiFillEyeInvisible></AiFillEyeInvisible>
                                :<AiFillEye></AiFillEye>
                            }
                            
                         </span>
                    </label>
                    <button type='submit' className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">Reset Password</button>
                </form>
                <div className="mt-6 flex items-center justify-between">
                    <Link to='/login'>
                        <p className="flex items-center gap-x-2 text-richblack-5">Back to login</p>
                    </Link>
                </div>
            </div>
            )
        }
    </div>
  )
}
