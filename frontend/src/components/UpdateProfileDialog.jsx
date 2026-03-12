import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import axios, { Axios } from "axios";
import { setUser } from '../redux/authSlice'
import { toast } from 'sonner'
import { USER_API_END_POINT } from "../utils/constant";
import { Loader2 } from "lucide-react";
import { DialogDescription } from "@/components/ui/dialog";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(store => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null
  });
  const dispatch = useDispatch();


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    if (user?.role === "student") {
      formData.append("skills", input.skills);
    }
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/update/Profile`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message)
        setOpen(false);

      }

    } catch (error) {
      console.log("FRONTEND ERROR:");
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);

    console.log(input);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-425px" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Make changes to your Profile information here.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4" >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">Name :</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">Email :</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>


            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">Number :</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>



            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">Bio :</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>


            {user?.role === "student" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-center">Skills :</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
            )}


            {user?.role === "student" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-center">Resume :</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  className="col-span-3"
                />
              </div>
            )}
            <DialogFooter>
              {
                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /></Button> : <Button type="submit" className="w-full my-4">Update</Button>
              }
            </DialogFooter>

          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default UpdateProfileDialog