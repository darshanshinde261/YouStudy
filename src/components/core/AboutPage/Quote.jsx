import React from 'react'
import { HighLightText } from '../HomePage/HighLightText'

export const Quote = () => {
  return (
    <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
        We are passionate about revolutionizing the way we learn. Our innovation platform 
        <HighLightText text={"combines Technology"}></HighLightText>
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">{" "}
            expertise
        </span>
        <span>{" "}and community to create an</span>
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}unparalleled education experience.
        </span>
    </div>
  )
}
