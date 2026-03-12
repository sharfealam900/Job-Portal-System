import React, { useEffect } from 'react'
import { Loader, Loader2, LogIn as LogInIcon, Store } from "lucide-react"
import { UserPlus } from "lucide-react"
import { Navbar } from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'




const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,user } = useSelector(Store => Store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[])

  return (
    <div className="min-h-screen from-gray-50 to-gray-100">

      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>

        <form onSubmit={submitHandler} className='w-full md:w-1/2 bg-white shadow-xl rounded-xl p-8 my-12 border border-gray-100 transition-all duration-300 hover:shadow-2xl'>


          <h1 className='font-bold text-2xl mb-6 text-center'>Login</h1>

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
            <Label>password</Label>
            <Input
              type="Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter the password" />
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
          </div>
          
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
              <Button type="submit" className='w-full mt-6'>Login</Button>
          }

          <span className='text-sm'>Don't have an account?<Link to="/signup" className='text-blue-600'>Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
