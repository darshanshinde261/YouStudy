import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import { Sidebar } from '../components/core/Dashboard/Sidebar'

export const Dashboard = () => {
    const {loading: authLoading} = useSelector((state) => state.auth)
    const {loading: profileLoading} = useSelector((state) => state.profile)

    if(profileLoading,authLoading) {
        return(
            <div className='spinner'>loading...</div>
        )
    }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar></Sidebar>
        <div className='h-[calc(100vh-3.5rem)] w-full overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet></Outlet>
            </div>
        </div>
    </div>
  )
}
