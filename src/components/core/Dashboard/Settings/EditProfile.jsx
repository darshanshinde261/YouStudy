import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {updateProfile} from '../../../../services/operations/SettingsAPI'
import { IconBtn } from '../../../common/Iconbtn'


export const EditProfile = () => {
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm()

    const submitProfileForm = async(data) =>{
            try{
                dispatch(updateProfile(token,data))
            }catch(error){
                console.log("Error Message", error.message)
            }
        }
    console.log(user)
    
  return (
    <div>
        <form onSubmit={handleSubmit(submitProfileForm)}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
            
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstName" className="lable-style text-white">
                            First Name
                        </label>
                        <input type="text"
                        name='fistName'
                        id="firstName"
                        placeholder='enter first name'
                        className='form-style h-7 pl-1 font-sans outline-none hover:border-richblue-300 hover:border-[1px]'
                        {...register("firstName",{required:true})}
                        defaultValue={user?.firstName} />
                        {errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your first name.
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastName" className='label-style text-white'>
                            Last Name
                        </label>
                        <input type="text"
                        name="lastName"
                        id="lastName"
                        placeholder='Enter last name'
                        className='form-style h-7 pl-1 font-sans outline-none hover:border-richblue-300 hover:border-[1px]'
                        {...register("lastName",{required:true})}
                        defaultValue={user?.lastName} />
                        {errors.lastName && (
                            <span className='mt-1 text-[12px] text-yellow-100'>
                                Please enter your name
                            </span>
                        )}
                    </div>
                </div>
                <div> 
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <label htmlFor="dateOfBirth" className='label-style text-white'>Date of Birth
                        </label>
                        
                        <input type="date"
                        name='dateOfBirth'
                        id="dateOfBirth"
                        className='form-style h-7 pl-1 font-sans outline-none hover:border-richblue-300 hover:border-[1px]'
                        {...register("dateOfBirth",{required:{value:true,message:"Please enter your Date of Birth"},
                        max:{value:new Date().toISOString().split("T")[0],
                            message:"Date of Birth cannot be in the future"
                        }})}
                        defaultValue={user?.additionalDetails?.dateOfBirth} />
                        {errors.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="gender" className='label-style text-white'>
                            Gender
                        </label>
                        <select name="gender" type="text" id="gender"
                        className='form-style h-7 pl-1 font-sans outline-none hover:border-richblue-300 hover:border-[1px]'
                        {...register("gender",{required:true})}
                        defaultValue={user?.additionalDetails?.gender}>
                            {genders.map((ele,i) =>(
                                <option value={ele} key={i}>{ele}</option>
                            ))}
                        </select>
                        {errors.gender && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please enter your Date of Birth.
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="contactNumber" className='label-style text-white'>
                            Contact Number
                        </label>
                        <input type="tel"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        className="form-style h-7 pl-1 font-sans outline-none hover:border-richblue-300 hover:border-[1px]"
                        {...register("contactNumber",{
                            required : {
                                value:true,
                                message:"Please enter your Contact Number.",
                            },
                            maxLength:{value:12, message:"Invalid Contact Number"},
                            minLength:{value:10, meassge:"Invalid Contact Number"}
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                        ></input>
                        {errors.contactNumber && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                {errors.contactNumber.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="about" className='label-style text-white'>
                            About
                        </label>
                        <input type="text"
                        name="about"
                        id="about"
                        placeholder='Enter Bio Details'
                        className='form-style h-7 pl-1 font-sans outline-none hover:border-richblue-300 hover:border-[1px]'
                        {...register("about",{required:true})} 
                        defaultValue={user?.additionalDetails?.about}/>
                        {errors.about && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your About.
                        </span>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-2'>
                <button onClick={()=>{
                    navigate("/dashboard/my-profile")
                }} 
                className='cursor-pointer outline-none hover:border-richblue-300 hover:border-[1px] rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                >Cancel</button>
                <IconBtn type="submit" text="Save"></IconBtn>
            </div>
        </form>
    </div>
  )
}
