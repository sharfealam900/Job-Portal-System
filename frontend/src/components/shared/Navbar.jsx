import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { LogOut, User2, Bookmark } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../../redux/authSlice";
import { USER_API_END_POINT } from "../../utils/constant";

export const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);


      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    }
  }

  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-5 max-w-10xl h-11 mt-5 ml-15 mr-15 '>

        <div>
          <h1 className='text-4xl font-bold'>
            Job<span className='text-[#F83002]'>Portal</span>
          </h1>
        </div>

        <div className='flex gap-12'>
          <ul className='flex font-medium items-center gap-5'>

            {
              user && user.role === 'recruiter' ? (
                <>
                  <li className='cursor-pointer hover:scale-110 transition-transform duration-200'>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li className='cursor-pointer hover:scale-110 transition-transform duration-200'>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='cursor-pointer hover:scale-110 transition-transform duration-200'>
                    <Link to="/">Home</Link>
                  </li>
                  <li className='cursor-pointer hover:scale-110 transition-transform duration-200'>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li className='cursor-pointer hover:scale-110 transition-transform duration-200'>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )
            }
          </ul>

          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-70 mr-2 bg-white z-50 shadow-lg border">
                <div className='flex gap-2'>
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-gray-600 mt-4 text-sm font-normal">

                  {
                    user && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 transition"
                      >
                        <User2 className="w-4 h-4" />
                        View Profile
                      </Link>
                    )
                  }

                  {
                    user && user.role === "student" && (
                      <Link
                        to="/saved/jobs"
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-black transition"
                      >
                        <Bookmark className="w-4 h-4" />
                        Saved Jobs
                      </Link>

                    )
                  }


                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 hover: text-red-600 transition">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>

                </div>

              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}