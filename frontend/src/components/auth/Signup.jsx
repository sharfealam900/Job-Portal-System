import React, { useEffect, useState } from 'react'
import { Loader2 } from "lucide-react"
import { Navbar } from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom'
import { RadioGroup, } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Toaster } from 'sonner'

const SignupPage = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, user } = useSelector(Store => Store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        Toaster.success(res.data.message);
      }

    } catch (error) {
      console.log(error);

    }
    finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen from-gray-50 to-gray-100">

      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>

        <form onSubmit={submitHandler} className='w-full md:w-1/2 bg-white shadow-xl rounded-xl p-8 my-12 border border-gray-100 transition-all duration-300 hover:shadow-2xl'>


          <h1 className='font-bold text-2xl mb-6 text-center'>Create Account</h1>


          <div className='space-y-1 mb-4'>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="user name" />
          </div>


          <div className='space-y-1 mb-4'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="user@gmail.com" />
          </div>


          <div className='space-y-1 mb-4'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Mobile" />
          </div>

          <div className='space-y-1 mb-4'>
            <Label>password</Label>
            <Input
              type="Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Create password" />
          </div>


          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4'>


            <RadioGroup className="flex items-center gap-4 my-5  ">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="Student">Student</Label>
              </div>


              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="Recruiter">Recruiter</Label>
              </div>


            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>

          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
              <Button type="submit" className='w-full mt-6'>Signup</Button>
          }
          <span className='text-sm'>Already have an account?<Link to="/login" className='text-blue-600'>Login</Link></span>

        </form>
      </div>
    </div>

  )
}

export default SignupPage
