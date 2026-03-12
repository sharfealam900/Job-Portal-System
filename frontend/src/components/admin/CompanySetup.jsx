import React, { useEffect, useState } from 'react'
import { Navbar } from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById'

const CompanySetup = () => {
   const params = useParams();
    useGetCompanyById(params.id);
   const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const {singleCompany}=useSelector(store=>store.company);

  const [loading,setLoading] = useState(false)

 
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name",input.name);
    formData.append("description",input.description);
    formData.append("website",input.website);
    formData.append("location",input.location);

    if(input.file){
      formData.append("file",input.file);
    }

    try {

      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers:{ 'Content-Type':'multipart/form-data' },
          withCredentials:true
        }
      );

      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/companies");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

useEffect(()=>{
  if(!singleCompany) return;

  setInput({
    name:singleCompany.name || "",
    description:singleCompany.description || "",
    website:singleCompany.website || "",
    location:singleCompany.location || "",
    file:null
  });

},[singleCompany]);

  return (

    <div className="min-h-screen bg-gray-50">

      <Navbar/>

      <div className="max-w-3xl mx-auto py-10">

        <form onSubmit={submitHandler} className="bg-white shadow-md rounded-lg p-8">

          
          <div className="flex items-center gap-4 mb-8">

            <Button
              type="button"
              variant="outline"
              onClick={()=>navigate("/admin/companies")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16}/>
              Back
            </Button>

            <h1 className="text-2xl font-semibold">
              Company Setup
            </h1>

          </div>

          <div className="grid md:grid-cols-2 gap-6">


            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>


            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>


            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>


            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>


            <div className="space-y-2 md:col-span-2">
              <Label>Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>

          </div>

          <div className="mt-8">

            {
              loading
                ?
                <Button className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Please wait
                </Button>

                :

                <Button type="submit" className="w-full">
                  Update Company
                </Button>
            }

          </div>

        </form>

      </div>

    </div>
  )
}

export default CompanySetup