import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {

  const { allAppliedJobs } = useSelector(store => store.job);
  
  const getStatusColor = (status) => {
  const s = status?.toLowerCase();

  if (s === "rejected") return "bg-red-500 text-white";
  if (s === "accepted") return "bg-green-500 text-white";
  return "bg-yellow-500 text-white"; // pending
};

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {
            allAppliedJobs?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No Jobs Applied
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs?.map((item) => (
                <TableRow key={item._id}>

                  <TableCell>
                    {item?.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell>
                    {item?.job?.title}
                  </TableCell>

                  <TableCell>
                    {item?.job?.company?.name}
                  </TableCell>

                  <TableCell className='text-right'>
                    <Badge className={`${getStatusColor(item?.status)} text-white`}>
                      {item?.status}
                    </Badge>
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

export default AppliedJobTable