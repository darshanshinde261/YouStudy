import React from 'react';
import { Home } from './pages/Home';
import {Route,Routes, useNavigate} from 'react-router-dom'
import { Navbar } from './components/common/Navbar';
import OpenRoute from './components/core/auth/OpenRoute';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import {VerifyEmail} from "./pages/VerifyEmail"
import { About } from './pages/About';
import Contact from "./pages/Contact";
import { MyProfile } from './components/core/Dashboard/MyProfile';
import {Dashboard} from "../src/pages/Dashboard"
import { PrivateRoute } from './components/core/auth/PrivateRoute';
import {Error} from "../src/pages/Error"
import {Settings} from "../src/components/core/Dashboard/Settings"
import { EnrolledCourses } from './components/core/Dashboard/EnrolledCourses';
import { Cart } from './components/core/Dashboard/Cart';
import Instructor from './components/core/Dashboard/Instructor'
import { getUserDetails } from './services/operations/profileAPI';
import { ACCOUNT_TYPE } from './utils/constants';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import  AddCourse  from './components/core/Dashboard/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourse';
import { Catalog } from './pages/Catalog';
import  CourseDetails  from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex-col font-inter'>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog/>}></Route>
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }
        />
        <Route
          path="contact"
          element={
              <Contact/>
          }
        />
        <Route 
        element={
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }
        >
          <Route path="dashboard/my-profile" element={<MyProfile></MyProfile>}></Route>
          {/* {Route only for Instructors } */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse></AddCourse>}></Route>
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>)}
          
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}></Route>
              <Route path="dashboard/cart" element={<Cart/>}></Route>
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}
          <Route path="dashboard/Settings" element={<Settings />} />
        </Route>

        {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </div>
  )
}
