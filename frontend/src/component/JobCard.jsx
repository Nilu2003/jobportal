import React from 'react'
import google from "../assets/google.webp"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import API from '../api/api'
import { deleteJob } from '../features/jobs/jobSlice'

const JobCard = ({ job }) => {
    const navigate = useNavigate()
    const { role } = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    const clickDeleteJob = async () => {
        try {
            const res = await API.delete(`/jobs/deletedjob/${job._id}`)
            dispatch(deleteJob(job._id))

        } catch (error) {
            console.log("something error while deleting job", error);

        }
    }

    return (

        <div className='flex flex-col h-50 md:h-45 lg:h-60 w-40 md:w-70 lg:w-90 gap-2 bg-white shadow-2xl justify-center rounded-2xl '>
            <div className='flex flex-row gap-2 ml-2'>
                <img src={job.logo} alt="logo" className=' w-8 md:w-10 lg:w-12  h-8 md:h-10 lg:h-12 rounded-full' />
                <div className='ml-2'>
                    <p className='text-[13px] md:text-[15px] lg:text-[18px]'>{job.companyName}</p>
                    <p className='text-8px md:text-[10px] lg:text-[12px]'>{job.location}</p>
                </div>
            </div>
            <div className='font-bold ml-2'>{job.title} </div>
            <div className='text-[12px] md:text-[13px] lg:text-[15px] ml-2'>{job.description}</div>
            <div className='flex flex-row gap-4 ml-2'>
                <p className='w-5 md:w-8 lg:w-11.25 h-2 md:h-3 lg:h-5 bg-white shadow-2xl text-[6px] md:text-[8px] lg:text-[10px] text-center rounded-sm text-blue-500 font-semibold'>Position:{job.position}</p>
                <p className='w-6 md:w-8 lg:w-11.25 h-2 md:h-3 lg:h-5 bg-amber-50 shadow-2xl text-[6px] md:text-[8px] lg:text-[10px]  text-center rounded-sm'>{job.Jobtype}</p>
                <p className='w-5 md:w-8 lg:w-11.25 h-2 md:h-3 lg:h-5 bg-amber-50 text-[6px] md:text-[8px] lg:text-[10px]  text-center rounded-sm'>{job.salary}</p>
                <p className='w-5 md:w-8 lg:w-11.25 h-2 md:h-3 lg:h-5 bg-amber-50 text-[6px] md:text-[8px] lg:text-[10px]  text-center rounded-sm'>{job.experienceYear}</p>

            </div>
            <div className='flex flex-row gap-2 ml-2'>
                {role == "admin" ?
                    <button className='border rounded-sm w-10 text-[10px] md:text-[12px] lg:text-[14px] font-semibold'
                        onClick={() => navigate(`/admin/edit-job/${job._id}`)}
                    >Edit</button>
                    : <button className='border rounded-sm text-[10px] md:text-[12px] lg:text-[14px] font-semibold'
                        onClick={() => navigate(`job/${job._id}`)}
                    >Details</button>
                }


                {role == "admin" ?
                    (<button className='border rounded-sm bg-red-600 text-[10px] md:text-[12px] lg:text-[14px] font-semibold'
                        onClick={() =>
                            clickDeleteJob()

                        }
                    >Delete</button>) :
                    (<button className='border rounded-sm bg-blue-500 text-[10px] md:text-[12px] lg:text-[14px] font-semibold'
                        onClick={() =>
                            navigate(`job/${job._id}`)

                        }
                    >Apply →</button>)
                }

                {role == "admin" &&
                (<button className='border rounded-sm bg-blue-500 text-[10px] md:text-[12px] lg:text-[14px] font-semibold'
                        onClick={() =>
                            navigate(`/admin/applicant/${job._id}`)
                        }
                    >Applicant View</button>) }
            </div>
        </div>
    )
}

export default JobCard