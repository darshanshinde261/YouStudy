import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { contactusEndpoint } from '../../../services/api';
import {apiConnector} from "../../../services/apiConnector"
import CountryCode from "../../../data/countrycode.json"


export const ContactUsForm = () => {
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessful}
  } = useForm();

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstname:"",
        lastname:"",
        message:"",
        phoneNo:""
      })
    }
  },[isSubmitSuccessful,reset]);

  const submitContactForm = async(data) =>{
    console.log(data)
    try{

      setLoading(true);
      const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
      console.log(response);
      setLoading(false);
    }catch(error){
      console.log(error.message);
      setLoading(false);
    }
  }
  
  

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7 text-black">

      <div className="flex flex-col gap-4 lg:flex-col">
      <div className="flex items-center gap-2">
        {/* firstname */}
        <div className='flex flex-col w-[49%]'>
          <label htmlFor='firstname' className="lable-style text-white">first Name</label>
          <input type="text"
          name="firstname"
          className="form-style h-7 border-none"
          id="firstname"
          placeholder='Enter you name'
          {...register("firstname",{required:true})} />
          {
            errors.firstname && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Plese enter your name</span>
            )
          }
        </div>
        {/* lastname */}
        <div className="flex flex-col w-[49%]">
          <label htmlFor='lastname' className="text-white lable-style">last Name</label>
          <input type="text"
          name="lastname"
          className="form-style h-7"
          id="lastname"
          placeholder='Enter you last name'
          {...register("lastname")} />
        </div>
        
      </div>
        {/* email */}
        <div className='flex flex-col'>
          <label htmlFor="email" className="lable-style text-white">Email Address</label>
          <input type="email"
          name="email"
          id="email"
          className='form-style h-7'
          placeholder='Enter your email'
          {...register("email",{required:true})} />
          {
            errors.email && (
              <span>
                Please enter your email address
              </span>
            )
          }
        </div>
        {/* phone no */}
        <div className='flex gap-2 flex-col'>
          <label htmlFor="phonenumber" className='label-style text-white'>Phone number</label>
          <div className='flex gap-5 text-black items-center'>
            {/* dropdown */}
            <div className="flex w-[90px] flex-col gap-2">
              <select name="dropdown" id="dropdown"
              className="form-style h-7"
              {...register("countrycode",{required:"true"})}>
                {
                  CountryCode.map((element,index) =>{
                    return(
                       <option key={index} value={element.code}>{element.code} - {element.country}</option>
                    )
                  })
                }
              </select>
            </div>

            {/* number */}
            <div>
              <input type="text"
                name="phonenumber"
                id="phonenumber"
                placeholder="123 456 789 0"
                className="flex h-7 w-full flex-col gap-2"
                {...register("phoneNo",
                {required:true,
                maxLength:{value:10,message:"Invalid phone no"},
                minLength:{value:8,message:"Invalid phone no"}
               })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="-mt-1 text-[12px] text-yellow-100">{errors.phoneNo.message}</span>
          )}
        </div>
        {/* message */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="message" className='text-white'>message</label>
          <textarea name="message" id="message" col='30' rows="7"
          placeholder='enter your message here'
          {...register("message",{required:true})}
          ></textarea>
          {
            errors.message && (
              <span className="-mt-1 text-[12px] text-yellow-100">Please enter the message</span>
            )
          }
        </div>
        {/* button */}
        <button type="submit" className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}>
          Send
        </button>
      </div>
       
    </form>
  )
}
