import React from 'react'

const navbar = () => {
  return (
    <div className="bg-slate-700 flex justify-between m-auto py-2">
      <div className="logo">
        <span className='font-bold test-xl text-white mx-8'>TODO</span>
      </div>
      <ul className='text-white flex justify-center gap-[40px] mx-8'>
        <li className='cursor-pointer hover:font-bold'>Home</li>
        <li className='cursor-pointer hover:font-bold'>Task</li>
        
        </ul>
    </div>
  )
}

export default navbar
