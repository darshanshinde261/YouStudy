import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi"


export const SidebarLink = ({link,iconName}) => {
    const Icon = Icons[iconName] ?? FiTrash2;
    const location = useLocation();
    const dispatch = useDispatch();
    const matchRoute = (route) =>{
        return matchPath({path:route},location.pathname)
    }

  return (
    <div>
        <NavLink to={link.path}
        className={`relative px-8 py-2 text-sm font-medium${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50":"bg-opacity-0 text-richblack-300"} transition-all duration-200`}>
            <span className={`absolute left-0 top-4 h-[40px] my-auto w-[0.15rem] animation: ping 3s ease-in transition-all duration-200 bg-yellow-50 
                ${matchRoute(link.path) ? "opacity-100 ":"opacity-0"}`}> </span>
                <div className='flex items-center gap-x-2 pl-2'>
                    <Icon className='text-lg'></Icon>
                    <span>{link.name}</span>
                </div>
        </NavLink>
    </div>
  )
}
