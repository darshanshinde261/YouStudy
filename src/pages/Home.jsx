import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { HighLightText } from '../components/core/HomePage/HighLightText';
import { CTAButton } from '../components/core/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4"
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks';
import Footer from "../components/common/Footer"
//import ReviewSlider from "../components/Common/ReviewSlider"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/Timeline"
import ExploreMore from "../components/core/HomePage/ExploreMore"

export const Home = () => {
  return (
    <div className='overflow-x-hidden'> 
        {/*section1 */}
        <div className="relative mx-auto max-w-maxContent flex flex-col w=11/12 items-center text-white
        justify-between">
            <Link to={"/signup"}>
                <div className='mx-auto group mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200
                 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
                    <div className='flex flex-row items-center gap-2 z-[-20]
                     rounded-full px-10 py-[5px] group-hover:bg-richblack-900 transition-all duration-200'>
                        <p>Become an instructor </p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower your future with
                <HighLightText text={"Coding Skills"}></HighLightText>
            </div>
            <div className='w-[90%] mt-4 text-center text-lg font-bold text-richblack-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, alias error quibusdam ing elit. Fuga, alias error quibusdam 
            </div>
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>

            </div>
            <div className=' mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video
                className="shadow-[20px_20px_rgba(255,255,255)]"
                muted
                loop
                autoPlay
                >
                <source src={Banner} type="video/mp4"/>
                </video>
            </div>
            <div>
                <CodeBlocks
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your 
                        <HighLightText text={"coding potential "}>
                            with our online courses
                        </HighLightText>
                    </div>
                } 
                subheading={"Our courses are designed and tought by industry experts who have years of experience of teaching so trust your future on safe hands"}
                ctabtn1={
                    {
                        btnText:"try it yourself",
                        linkto:"/signup",
                        active:true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"learn more",
                        linkto:"/login",
                        active:false,
                    }
                }
                CodeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                codecolor={"text-yellow-25"}
                backgroundGradient={<div className="codeblock1 absolute"></div>}
                ></CodeBlocks>
            </div>
            <div>
                <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your 
                        <HighLightText text={"coding potential"}>
                            
                        </HighLightText>with our online courses
                    </div>
                } 
                subheading={"Our courses are designed and tought by industry experts who have years of experience of teaching so trust your future on safe hands"}
                ctabtn1={
                    {
                        btnText:"try it yourself",
                        linkto:"/signup",
                        active:true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"learn more",
                        linkto:"/login",
                        active:false,
                    }
                }
                CodeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                codecolor={"text-yellow-25"}
                backgroundGradient={<div className="codeblock2 absolute"></div>}
                ></CodeBlocks>
            </div>
            <ExploreMore />
        </div>
        
        {/*Section2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[310px]'>
                    <div className='w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto'>
                        <div className='h-[150px]'></div>
                        <div className='flex flex-row gap-7 text-white'>
                            <CTAButton active={true} linkto={"/signup"} >
                                <div className='flex items-center gap-3'>Explore full catalog
                                <FaArrowRight></FaArrowRight>
                                </div>
                                
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More 
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between'>
                    <div className='flex gap-5 flex-row mb-10 mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the Skill you need for a
                            <HighLightText text={"job that is in demand"}></HighLightText>
                        </div>
                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>
                            the modern StudyNotion is the dictates its own terms todays
                            the modern StudyNotion is the dictates its own terms todays 
                        </div>
                        <CTAButton action={true} linkto={"/signup"}>
                            <div className='text-white'>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>
                    </div>
                    <TimelineSection />
                    <LearningLanguageSection />
                    
                </div>
            </div>
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>
       <Footer></Footer>
    </div>
  );
}

export default Home

