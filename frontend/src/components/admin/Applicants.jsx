import React, { useEffect } from 'react'
import { Navbar } from '../shared/Navbar'
import ApplicantJobTable from './ApplicantTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'

const Applicants = () => {
  const params=useParams();
  const dispatch=useDispatch();
  const {applicants}=useSelector(store=>store.application)
  useEffect(()=>{
    const fetchAllAplicants=async()=>{
      try {
        const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
        dispatch(setAllApplicants(res.data.job));

        
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllAplicants();
  },[]);
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto m-10 '>
        <h1 className='font-bold text-xl'>Applicants {applicants?.application?.length} </h1>
        <ApplicantJobTable/>

      </div>
    </div>
  )
}

export default Applicants