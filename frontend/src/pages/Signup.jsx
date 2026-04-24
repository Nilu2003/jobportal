import React, { useState } from 'react'
import API from "../api/api.js"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from '../features/auth/authSlice'

const Signup = () => {

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError("") // clear error when typing
  }

  const handleSubmit = async () => {
   
    const { username, fullName, email, password, phoneNumber, role } = formData

    if (!username || !fullName || !email || !password || !phoneNumber || !role) {
      return setError("All fields are required ❗")
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters ❗")
    }

    try {
      setLoading(true)
      setError("")

      const res = await API.post("/users/register", formData)

      dispatch(loginSuccess(res.data.data))

      navigate("/login")

    } catch (error) {
      
      if (error.response) {
        setError(error.response.data.message || "Something went wrong ❌")
      } else {
        setError("Server not responding ❌")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center mt-25 '>

      <div className='w-80 md:w-100 lg:w-120 bg-white shadow-2xl flex flex-col p-4 rounded-3xl'>

        <h2 className="text-center text-lg font-bold mb-3">Signup</h2>

        
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <label>Username:</label>
        <input
          type="text"
          name='username'
          value={formData.username}
          onChange={handleChange}
          className='border-2 m-1 rounded-md p-1'
        />

        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className='border-2 m-1 rounded-md p-1'
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className='border-2 m-1 rounded-md p-1'
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className='border-2 m-1 rounded-md p-1'
        />

        <label>Mobile Number:</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className='border-2 m-1 rounded-md p-1'
        />

        <div className='mt-2'>
          <p className='font-semibold'>Role:</p>

          <input
            type="radio"
            name='role'
            value='user'
            checked={formData.role === "user"}
            onChange={handleChange}
          />
          <span className='mr-3'>User</span>

          <input
            type="radio"
            name='role'
            value='admin'
            checked={formData.role === "admin"}
            onChange={handleChange}
          />
          <span>Admin</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-4 p-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </div>
    </div>
  )
}

export default Signup