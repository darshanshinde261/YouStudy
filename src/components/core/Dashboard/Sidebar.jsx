import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useSelector } from 'react-redux';
import { SidebarLink } from './SidebarLink';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import { ConfirmationModal } from '../../common/ConfirmationModal';

export const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const {user,loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth)
    const [confirmationModal,setConfirmationModal] = useState(null);

    if(profileLoading,authLoading){
        return(
            <div className='spinner'>Loading...</div>
        )
    }
  return (
    <div className='text-white'>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link,index)=>{
                        if(link.type && user?.accountType !== link.type) return null;
                        return(
                            <SidebarLink id={link.id} link={link} key={index} iconName={link.icon}/>
                        )
                    })
                }
            </div>
            <div className='mx-auto mt-4 mb-4 h-[1px] w-10/12 bg-richblack-600'></div>
            <div className='flex flex-col'>
                <SidebarLink link={{name:"settings",path:"dashboard/settings"}}
                icon="VscSettingsGear">
                </SidebarLink>
                <button
                onClick={()=>
                    setConfirmationModal({
                        text1:"are you Sure ?",
                        text2:"You will be logged out of your Account",
                        btn1Text:"Logout",
                        btn2Text:"Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })
                } 
                className='text-sm font-medium text-richblack-300 px-8 py-2'>
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut></VscSignOut>
                        <span>LogOut</span>
                    </div>
                </button>
            </div>
            
        </div>
        {confirmationModal && <ConfirmationModal 
        modalData={confirmationModal}></ConfirmationModal>}
    </div>
  )
}
