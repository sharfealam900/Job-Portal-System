import React, { useEffect, useState } from 'react'
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow} from "../ui/table"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
2
        const filteredJobs = allAdminJobs.filter((job) => {

            if (!searchJobByText) return true

            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            )

        })

        setFilterJobs(filteredJobs)

    }, [allAdminJobs, searchJobByText])

    return (

        <div className="bg-white shadow-md rounded-lg p-4">

            <Table>

                <TableCaption className="text-gray-500">
                    A list of your recent posted jobs
                </TableCaption>

                <TableHeader>

                    <TableRow>

                        <TableHead className="text-gray-500 w-[250px]">
                            Company
                        </TableHead>

                        <TableHead className="text-gray-500">
                            Role
                        </TableHead>

                        <TableHead className="text-gray-500">
                            Status
                        </TableHead>

                        <TableHead className="text-gray-500">
                            Posted Date
                        </TableHead>

                        <TableHead className="text-right text-gray-500">
                            Action
                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {
                        filterJobs.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={5}
                                    className="text-center text-gray-500 py-6" >
                                 "No jobs found."

                                </TableCell>

                            </TableRow>

                        ) : (

                            filterJobs.map((job) => (

                                <TableRow
                                    key={job._id}
                                    className="hover:bg-gray-50"
                                >

                                    {/* Company */}

                                    <TableCell className="flex items-center gap-3">

                                        <Avatar className="h-9 w-9">

                                            <AvatarImage
                                                src={
                                                    job?.company?.logo ||
                                                    "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg"
                                                }
                                                />

                                        </Avatar>

                                        <span className="font-medium text-gray-700">
                                            {job?.company?.name}
                                        </span>

                                    </TableCell>

                                    {/* Role */}

                                    <TableCell className="text-gray-700">
                                        {job?.title}
                                    </TableCell>

                                    {/* Status */}

                                    <TableCell>

                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                            Active
                                        </span>

                                    </TableCell>

                                    {/* Date */}

                                    <TableCell className="text-gray-600">
                                        {new Date(job?.createdAt).toLocaleDateString()}
                                    </TableCell>

                                    {/* Action */}

                                    <TableCell className="text-right">

                                        <Popover>

                                            <PopoverTrigger className="cursor-pointer">
                                                <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                            </PopoverTrigger>

                                            <PopoverContent className="w-32 bg-white z-50 shadow-lg border">

                                                <div
                                                    onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                                    className="flex items-center gap-2 cursor-pointer hover:text-purple-600">

                                                    <Edit2 className="w-4 h-4" />

                                                    <span>Edit</span>

                                                </div>
                                                <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 '>
                                                    <Eye className='w-4'/>
                                                    <span>Applicant</span>

                                                </div>

                                            </PopoverContent>

                                        </Popover>

                                    </TableCell>

                                </TableRow>

                            ))

                        )

                    }

                </TableBody>

            </Table>

        </div>

    )

}

export default AdminJobsTable