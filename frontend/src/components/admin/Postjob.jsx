import React, { useState } from 'react'
import { Navbar } from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { JOB_API_END_POINT } from "../../utils/constant"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import useGetAllCompanies from "../../hooks/useGetAllCompanies"

const Postjob = () => {

    const navigate = useNavigate()
    useGetAllCompanies()

    const { companies } = useSelector(store => store.company)

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: "",
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectCompanyHandler = (value) => {
        setInput({ ...input, companyId: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                input,
                { withCredentials: true }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }

        } catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Error creating job")
        }

    }

    return (

        <div>

            <Navbar />

            <div className="max-w-5xl mx-auto my-10">

                <h1 className="text-2xl font-bold mb-6">
                    Create Job Posting
                </h1>

                <form
                    onSubmit={submitHandler}
                    className="bg-white shadow-lg rounded-lg p-8 space-y-6"
                >

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <Label>Job Title</Label>
                            <Input
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                         
                            <Select
                                value={input.jobType}
                                onValueChange={(value) =>
                                    setInput({ ...input, jobType: value })
                                }>

                               <SelectTrigger className="w-180px">
                                <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>

                                <SelectContent  className="bg-white z-50 shadow-lg border">
                                    <SelectItem value="Full Time">Full Time</SelectItem>
                                    <SelectItem value="Part Time">Part Time</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                    <SelectItem value="Remote">Remote</SelectItem>
                                </SelectContent>

                            </Select>
                        </div>


                        <div>
                            <Select
                                value={input.companyId}
                                onValueChange={selectCompanyHandler}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>

                                <SelectContent className="bg-white z-50 shadow-lg border">
                                    {companies.map((company) => (
                                        <SelectItem key={company._id} value={company._id}>
                                            {company.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>

                    </div>

                    <Button className="w-full mt-4">
                        Post Job
                    </Button>

                </form>

            </div>

        </div>

    )

}

export default Postjob