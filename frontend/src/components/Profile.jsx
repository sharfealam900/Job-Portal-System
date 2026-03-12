import React, { useState } from "react";
import { Navbar } from "./shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import UpdateProfileDialog from "./UpdateProfileDialog";

const Profile = () => {

  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>

          </div>

          <Button onClick={() => setOpen(true)} variant="outline">
            Edit Profile
          </Button>

        </div>

        <div className="my-6">

          <div className="flex items-center gap-3 my-2 text-gray-700">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 my-2 text-gray-700">
            <User2 />
            <span>{user?.phoneNumber}</span>
          </div>

        </div>

        {user?.role === "student" && (
          <div>

            <h2 className="font-semibold text-lg mb-2">Skills</h2>

            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>

          </div>
        )}

      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />

    </div>
  );
};
export default Profile;