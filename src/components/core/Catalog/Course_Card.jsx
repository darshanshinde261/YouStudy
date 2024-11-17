import React, { useEffect } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from "../../../utils/avgRating"
import { Link } from 'react-router-dom'

import { useState } from 'react'

export const Course_Card = ({course,Height}) => {
    const [avgReviewCount,setAvgReviewCount] = useState(0);
        useEffect(() =>{
            const count = GetAvgRating(course.ratingAndReviews)
            setAvgReviewCount(count)
        },[course])

  return (
    <div className='bg-richblack-800 rounded-sm'>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-sm">
                    <img src={course?.thumbnail}
                    alt="thumbnail"
                    className={`${Height} w-full rounded-lg object-cover`} />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">
                        {course?.courseName}
                    </p>
                    <p className="text-sm text-richblack-50">
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-5">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}></RatingStars>
                        <span className="text-richblack-400">{course?.ratingAndReviews?.length} Rating</span>
                        
                    </div>
                    <p className="text-xl text-richblack-5">{course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}
