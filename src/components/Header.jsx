import React, { useEffect, useState } from 'react'
import useUser from '../hooks/useUser'
import logo from '../assets/logo.jpg'
import {Link} from'react-router-dom'
import{AnimatePresence,motion} from "framer-motion"
import { PuffLoader } from 'react-spinners'
import AccountMenu from './AccountMenu'
import { auth } from "../config/firebase.config";
import { fadeInOutWithOpacity, slideIn } from '../animations'
import useFilters from '../hooks/useFilters'
import { useQueryClient } from 'react-query'
import { IoMdCloseCircleOutline } from "react-icons/io";


const Header = () => {
  const querclient = useQueryClient();
  const { data, isLoading, isError } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const {data:filteredData,refetch} = useFilters();


const handleSearchdata =(e)=>{
  const preState = querclient.getQueryData("globalFilter");
  querclient.setQueryData("globalFilter",{...preState,searchTerm:e.target.value});
}
const clearQuery =()=>{
  const preState = querclient.getQueryData("globalFilter");
  querclient.setQueryData("globalFilter",{...preState,searchTerm:''});
}
  // useEffect(() => {
  //   console.log(isOpen);
  // }, [isOpen]);


  return (
    <div className="w-full flex justify-between items-center px-3 py-3 lg:px-8 border-b border-gray-300 bg-bgPrimary z-50 top-0 sticky">
      <div className="px-4 py-1">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-12 h-auto object-contain"  />
        </Link>
      </div>

      <div className="flex-1 flex border border-gray-300 bg-gray-200 px-4 py-1 rounded-md items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 h-10 bg-transparent border-none outline-none font-semibold text-base"
          value={filteredData?.searchTerm ? filteredData?.searchTerm : ''}
          onChange={handleSearchdata}
        />
        <AnimatePresence>
         {
          filteredData.searchTerm.length > 0 && (
            <motion.div {...fadeInOutWithOpacity} className='flex flex-end'
            onClick={clearQuery}
            >
            <IoMdCloseCircleOutline size={25}/>
            </motion.div>
          )
         }
        </AnimatePresence>
      </div>

      <div>
        <AnimatePresence>
          {isLoading ? (
            <PuffLoader color="#498FCD" size={40} className='mx-3'/>
          ) : (
            <React.Fragment>
              {data ? (
                <motion.div className='relative' onClick={()=>setIsOpen(!isOpen)}>
                  {data?.photoURL ? 
                  <div className='flex w-12 h-12 rounded-md relative items-center justify-center mx-3 cursor-pointer'>
                    <img src={data?.photoURL} alt="profilePic" referrerpolicy="no-referrer" className='w-full h-full rounded-md object-cover ' />
                  </div> 
                :
                <div className='flex w-12 h-12 rounded-md relative items-center justify-center bg-blue-700 shadow-md text-white text-2xl mx-3 cursor-pointer'>
                  {data?.email?.charAt(0)}
                </div>}
                </motion.div>
              ) : (
                <Link to={"/auth"} className='mx-3'>
                  <motion.button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Login</motion.button>
                </Link>
              )}

              {isOpen && (
                <motion.div
                onMouseLeave={() => setIsOpen(false)}
                {...slideIn}
                className='absolute top-20 right-10 w-auto h-auto rounded-md bg-gray-200 shadow-md px-4 py-3 pt-7 gap-3 flex flex-col items-center'>
                  <AccountMenu data={data}  />
                </motion.div>
              )}

            </React.Fragment>
          )}
        </AnimatePresence>

        
      </div>
    </div>
  );
};

export default Header