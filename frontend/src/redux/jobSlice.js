import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [],
    },
    reducers: {

        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },

        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },

        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },

        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },

        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },

        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },

        // Add and Save Jobs

        addSavedJob: (state, action) => {
            const job = action.payload
            const exists = state.savedJobs.find((j) => j._id === job._id)

            if (!exists) {
                state.savedJobs.push(job)
            }
        },

        removeSavedJob: (state, action) => {
            state.savedJobs = state.savedJobs.filter(
                (job) => job._id !== action.payload
            )
        },
    }

});
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    addSavedJob,
    removeSavedJob,
} = jobSlice.actions;
export default jobSlice.reducer;