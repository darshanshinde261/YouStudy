import React from 'react'

const Stats = [
    {count:"5+",label:"Active Students"},
    {count:"10+",label:"Mentorss"},
    {count:"200+",label:"Courses"},
    {count:"50+",label:"Awards"},
]

export const StatsComponent = () => {
  return (
    <section className=' bg-richblack-700 '>
        <div>
            <div className='flex bg-richblack-600 items-center justify-evenly'>
                {
                    Stats.map((data,index)=>{
                        return(
                            <div key={index} className='flex flex-col py-4 justify-center'>
                                <h1 className='text-2xl font-bold text-white mx-auto'>{data.count}</h1>
                                <h2 className='opacity-40'>{data.label}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}
