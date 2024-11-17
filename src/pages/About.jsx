import React from 'react'
import { HighLightText } from '../components/core/HomePage/HighLightText';
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import { Quote } from '../components/core/AboutPage/Quote';
import FoundingStory from "../assets/Images/FoundingStory.png"
import { StatsComponent } from '../components/core/AboutPage/StatsComponent';
import { LearningGrid } from '../components/core/AboutPage/LearningGrid';
import { ContactFormSection } from '../components/core/AboutPage/ContactFormSection';

export const About = () => {
  return (
    <div className=' text-white w-11/12 max-w-maxContent mx-auto'>
        {/* section 1 */}
        <section className='bg-richblack-700'>
            <div className='relative flex flex-col justify-between gap-10 text-center text-white'>
                <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
                    Driving innovation in online Education for a 
                    <HighLightText text={"Brighter Future"}></HighLightText>
                    <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">Studynotion is at the forefront of driving innovation is online education, we're
                    Studynotion is at the forefront of driving innovation is online education, we're
                    Studynotion is at the forefront of driving innovation is online education, we're
                    </p>
                </header>
                <div className="sm:h-[70px] lg:h-[150px]"></div>
                <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5 '>
                    <img src={BannerImage1} />
                    <img src={BannerImage2} />
                    <img src={BannerImage3} />
                </div>
            </div>
        </section>
        {/* section 2 */}
        <section className="border-b border-richblack-700 ">
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
            <div className="h-[100px] "></div>
                <Quote></Quote>
            </div>
        </section>
        {/* section 3 */}
        <section>
            <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
                <div className='flex flex-col items-center gap-10 lg:flex-row justify-between' >
                    
                    <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                        <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Founding Story</h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea veritatis minus labore repellat maxime voluptate doloribus soluta doloremque alias ipsum ratione officia eligendi harum voluptas, aut maiores perferendis in consequer natus minima soluta culpa voluptatem eligendi rerum incidunt dolorum! Totam quos tempore sit enim maxime, rerum, maiores blanditiis hic nobis, non voluptates laboriosam aspernatur. Laborum, beatae facilis. Unde?
                       s rlias nesciunt officiis suscipit fuga quae eligendi voluptate accusantium porro! Perspiciatis expedita deleniti maiores dolorum? Minima quo fuga, iste architecto perspiciatis praesentium animi deleniti! Magnam quaerat error suscipit?</p>
                       <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea veritatis minus labore rnt ver natus minima soluta culpa voluptatem eligendi rerum incidunt dolorum! Totam quos tempore sit enim maxime, rerum, maiores blanditiis hic nobis, non voluptates laboriosam aspernatur. Laborum, beatae facilis. Unde?
                       s rlias nesciunt officiis suscipit fuga quae eligendi voluptate accusantium porro! Perspiciatis expedita deleniti maiores dolorum? Minima quo fuga, iste architecto perspiciatis praesentium animi deleniti! Magnam quaerat error suscipit?</p>
                    </div>
                    <div>
                        <img src={FoundingStory} className="shadow-[0_0_20px_0] shadow-[#FC6767]"/>
                    </div>
                </div>
                <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                    <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                        <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our vision</h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, molestias? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, minima!</p>
                    </div>
                    <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                        <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">Our Mission</h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque reprehenderit voluptatem architecto! Quaerat reprehenderit facilis nemo ut, unde harum velit sit natus culpa vitae ad.</p>
                    </div>
                </div>
            </div>
        </section>
        {/* section 4 */}
        <StatsComponent></StatsComponent>
        {/* section 5 */}
        <section className='mx-auto flex flex-col items-center justify-between gap-'>
            <LearningGrid></LearningGrid>
            <ContactFormSection></ContactFormSection>
        </section>

    </div>
  )
}
