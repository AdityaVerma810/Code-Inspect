import React from 'react'
import { Snail } from 'lucide-react';
import { LoaderPinwheel } from 'lucide-react';


const Navbar = () => {
  return (
	<>
	  <div className="nav flex items-center justify-between h-[90px] bg-zinc-900" style={{padding:"0px 150px"}}>
		<Snail />
		<div className="logo flex items-center gap-[10px]">
          <Snail size={30} color='#33ea8f'/>
          <span className="text-2xl font-bold text-white ml-2">Code Inspect</span>
        </div>
		 <div className="icons flex items-center gap-[20px]">
          <i className='cursor-pointer transition-all hover:text-[#33ea8f]'><LoaderPinwheel/></i>
        </div>
	  </div>
	</>
  )
}

export default Navbar
 