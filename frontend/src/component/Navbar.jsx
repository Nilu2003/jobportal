import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import profile from "../assets/logo.png"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice.js'
import API from '../api/api.js'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLogged, user, role } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await API.post("/users/logout");
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log("something error while logout", error);

    }
  }

  return (
    <div className='flex flex-row justify-around mt-3'>
      <div className='text-3xl font-bold'>Job-Hunt</div>
      <ul className='hidden md:flex flex-row gap-4 font-bold'>
        {role === "admin" ? (
          <>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
          </>
        )}
      </ul>
      <div className='hidden md:flex gap-4'>
        {isLogged ?
          <div className='relative'>
            <img
              src={profile}
              alt="photo"
              onClick={() => setShowProfile(!showProfile)}
              className='w-9 h-9 rounded-full' />
            {showProfile && (
              <div className='absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-3 flex flex-col gap-3'>
                <Link to="/profile" onClick={() => setShowProfile(false)}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    handleLogout()
                  }}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div> :
          <div className='flex flex-row gap-2'>
            <Link
              to="/login"
              className='border px-2 py-1 rounded-md font-semibold text-[15px] '
            >
              LogIn
            </Link>

            <Link
              to="/signup"
              className='border px-2 py-1 rounded-md bg-blue-600 text-white font-semibold text-[15px]'
            >
              SignUp
            </Link>
          </div>
        }




      </div>

      <div className='md:hidden'>
        <button onClick={() => setIsOpen(true)} className="text-2xl">
          ☰
        </button>
      </div>

      {(isOpen) &&
        <div className='fixed top-0 right-0 h-full w-64 bg-white shadow-lg flex flex-col p-5 gap-5 '>
          <button onClick={() => setIsOpen(false)} className='absolute top-4 right-4 text-xl'>
            ✖
          </button>
          <ul className='flex flex-col gap-4 mt-10 font-semibold'>
            {role==="admin"?
             <>
               <li><Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
             </>
             :
             <>
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link></li>
             </>  
          }
          </ul>
          <div >
            {isLogged ?
              <div className='flex flex-col gap-1'>
                <p><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></p>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className='text-left text-red-500 '>Logout</button>
              </div>
              :
              <div className='flex flex-row gap-3 mt-4'>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="border px-4 py-2 rounded-md text-center"
                >
                  LogIn
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="border px-4 py-2 rounded-md text-center"
                >
                  SignUp
                </Link>
              </div>
            }
          </div>
        </div>
      }

    </div>
  )
}

export default Navbar