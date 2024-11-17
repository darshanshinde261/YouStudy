import React from 'react'
import { ContactUsForm } from '../ContactPage/ContactUsForm';

export const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
        <h1 className='text-center text-4xl font-semibold text-richblack-300'>
            Get in Touch
        </h1>
        <p className='text-richblack-600'>
            we're love to hear you, please fill out this form
        </p>
        <div className='w-[500px]'>
            <ContactUsForm></ContactUsForm>
        </div>
    </div>
  )
}
