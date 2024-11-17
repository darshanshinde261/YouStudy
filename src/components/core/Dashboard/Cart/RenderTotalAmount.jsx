 import React from 'react'
import { useSelector } from 'react-redux'
import { IconBtn } from '../../../common/Iconbtn';

 export const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state) => state.auth);
    const handelBuyCourse = () =>{
        const courses = cart.map((course) => course.id);
        console.log("Brought id", courses)
    }

   return (
     <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
        <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}</p>
        <IconBtn text="Buy Now"
        customclasses={"w-full justify-center"}
        onclick={handelBuyCourse}></IconBtn>
     </div>
   )
 }
 