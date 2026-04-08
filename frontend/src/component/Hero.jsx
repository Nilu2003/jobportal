import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col justify-center items-center  mt-10 md:mt-15 lg:mt-20 gap-3'>
        <div className='bg-amber-50 shadow rounded-2xl w-34 md:w-38 lg:w-45 h-4 md:h-5 lg:h-7.5 text-red-400 text-center text-[8px] md:text-[12px] lg:text-[15px]'> No. 1 Jub Hunt  Website</div>
        <div className='text-2xl md:text-3xl lg:text-4xl text-center font-bold w-60 md:w-80 lg:w-100'>Search,apply & Get Your Dream Jobs</div>
        <div className='text-center w-80 md:w-100 lg:w-175'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, voluptates molestiae! Eaque, similique? Cupiditate dignissimos, ab voluptate of.</div>
        <div className=''>
          <input type="text" placeholder='Find your Dream jobs' className='bg-amber-50 shadow-2xl rounded-3xl outline-blue-500' />
          
        </div>
    </div>
  )
}

export default Hero