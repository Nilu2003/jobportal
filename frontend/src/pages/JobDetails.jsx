import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/api'


const JobDetails = () => {


    const [job, setJob] = useState(null)
    const { id } = useParams()
    const [showModal, setShowModal] = useState(false);
    const [resume, setResume] = useState(null);

    


    useEffect(() => {
        const fetchjob = async () => {
            try {
                const res = await API.get(`/jobs/getjob/${id}`)
                console.log(res);

                setJob(res.data.data)

            } catch (error) {
                console.log("error while fetching job details", error);

            }
        }

        fetchjob()


    }, [id])




    const handleApply = async () => {
        if (!resume) {
            alert("Please upload resume");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("resume", resume);
            const res = await API.post(`/applications/apply-application/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            // console.log("applied sucessfully", res);
            setShowModal(false);
             setResume(null);

        } catch (error) {
            console.log("resume not uploaded sucessfully", error);

        }
    }



    if (!job) return <p>Loading....</p>

    return (
        <div className='m-10 '>
            <div className='flex flex-row justify-between'>
                <div>
                    <div className='text-[20px] font-bold mb-2'>{job.title}</div>
                    <div className='flex flex-row gap-4 ml-2'>
                        <p className='w-5 md:w-8 lg:w-11.25 h-2 md:h-3 lg:h-5 bg-white shadow-2xl text-[6px] md:text-[8px] lg:text-[10px] text-center rounded-sm text-blue-500 font-semibold'>Position:{job.position}</p>
                        <p className='w-6 md:w-8 lg:w-11.25 h-2 md:h-3 lg:h-5 bg-amber-50 shadow-2xl text-[6px] md:text-[8px] lg:text-[10px]  text-center rounded-sm'>{job.Jobtype}</p>
                        <p className='w-5 md:w-8 lg:w-11.25 h-2 md:h-3 lg:h-5 bg-amber-50 text-[6px] md:text-[8px] lg:text-[10px]  text-center rounded-sm'>{job.salary}</p>
                        <p className='w-5 md:w-8 lg:w-11.25 h-2 md:h-3 lg:h-5 bg-amber-50 text-[6px] md:text-[8px] lg:text-[10px]  text-center rounded-sm'>{job.experienceYear}</p>
                    </div>
                </div>
                <div><button className='border bg-blue-500 border-blue-500 rounded-sm text-white'
                    onClick={() => setShowModal(true)}
                >Apply Now</button></div>
            </div>




            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-white/30 backdrop-blur-sm">

                    <div className="bg-white p-6 rounded-xl shadow-xl w-80">

                        <p className="text-lg font-semibold mb-4">Upload Resume</p>

                        {/* Hidden Input */}
                        <input
                            type="file"
                            id="resumeUpload"
                            className="hidden"
                            onChange={(e) => setResume(e.target.files[0])}
                        />

                        {/* Custom Button */}
                        <label
                            htmlFor="resumeUpload"
                            className="block w-full text-center bg-blue-500 text-white py-2 rounded cursor-pointer hover:bg-blue-600"
                        >
                            Choose Resume
                        </label>

                        {/* File Name Display */}
                        {resume && (
                            <p className="mt-2 text-sm text-gray-600 truncate">
                                {resume.name}
                            </p>
                        )}

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                className="px-4 py-1 bg-gray-400 text-white rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={handleApply}
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            )}


            <div className='mt-2'>
                <p className='text-[16px] font-semibold'>Job Description</p>
                <hr />
                <div className='flex flex-row'>
                    <p className='font-semibold'>Role:</p>
                    <p className='ml-2'> {job.title}</p>
                </div>
                <div className='flex flex-row'>
                    <p className='font-semibold'>Location:</p>
                    <p className='ml-2'> {job.location}</p>
                </div>
                <div className='flex flex-row'>
                    <p className='font-semibold'>Description:</p>
                    <p className='ml-2'> {job.description}</p>
                </div>
                <div className='flex flex-row'>
                    <p className='font-semibold'>Experience:</p>
                    <p className='ml-2'> {job.experienceYear}</p>
                </div>
                <div className='flex flex-row'>
                    <p className='font-semibold'>Salary:</p>
                    <p className='ml-2'> {job.salary}</p>
                </div>
                <div className='flex flex-row'>
                    <p className='font-semibold'>Total Applicants:</p>
                    <p className='ml-2'> {job.position}</p>
                </div>
                <div className='flex flex-row'>
                    <p className='font-semibold'>Posted Date:</p>
                    <p className='ml-2'> {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default JobDetails