import React from "react"
import { useSelector } from "react-redux"
import Job from "./Job"
import { Navbar } from "./shared/Navbar"
import { motion } from 'framer-motion';

const SavedJobs = () => {

    const { savedJobs } = useSelector((store) => store.job)

    return (
        <div>
            <Navbar />

            <div className="max-w-7xl mx-auto my-10">
                <h1 className="text-2xl font-bold mb-5">
                    Saved Jobs ({savedJobs.length})
                </h1>

                <div className="grid grid-cols-3 gap-4">
                    {savedJobs.length === 0 ? (
                        <p>No saved jobs</p>
                    ) : (
                        savedJobs.map((job) => (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                key={job?._id}>
                                <Job job={job} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

        </div>
    )
}

export default SavedJobs