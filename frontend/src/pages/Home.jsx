import { useEffect, useState } from "react"
import API from "../api/api"
import JobCard from "../component/JobCard"

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const delay = setTimeout(() => {
      const fetchJobs = async () => {
        try {
          const res = await API.get("/jobs/getalljob", {
            params: {
              keyword:search,

            }
          })

          setJobs(res.data.data)

          // console.log(res.data.data);
          

        } catch (error) {
          console.log("Error fetching jobs", error)
        } finally {
          setLoading(false)
        }
      }

      fetchJobs()
    }, 500)

    return () => clearTimeout(delay)

  }, [search, location, jobType, page])

  return (
    <div className='flex flex-col justify-center items-center mt-10 md:mt-15 lg:mt-20 gap-3'>

      
      <div className='bg-amber-50 shadow rounded-2xl w-34 md:w-38 lg:w-45 h-4 md:h-5 lg:h-7.5 text-red-400 text-center text-[8px] md:text-[12px] lg:text-[15px]'>
        No. 1 Job Hunt Website
      </div>

      <div className='text-2xl md:text-3xl lg:text-4xl text-center font-bold w-60 md:w-80 lg:w-100'>
        Search, apply & Get Your Dream Jobs
      </div>

      <div className='text-center w-80 md:w-100 lg:w-175'>
        Find jobs easily with live search experience 🚀
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Find your Dream jobs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='bg-amber-50 shadow-2xl p-2 rounded-3xl mt-5 w-72 md:w-96 border border-blue-500 outline-none'
      />

      {/* Jobs Section */}
      <div className='mt-10 w-full flex justify-center'>
        {loading ? (
          // Loader (centered but NOT full page)
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500 text-center">No jobs found 😢</p>
        ) : (
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Home