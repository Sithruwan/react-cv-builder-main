
import { AnimatePresence,motion } from 'framer-motion'
import  { useState } from 'react'
import {MdLayersClear} from 'react-icons/md'
import { slideUp } from '../animations'
import { FiltersData } from '../utils/helpers'
import useFilters from '../hooks/useFilters'
import { useQueryClient } from 'react-query'

const Filters = () => {
    const querclient = useQueryClient();
    const {data:filteredData,isLoading,isError,refetch} = useFilters();
    const [isClearHovered,setIsClearHovered]=useState(false)
    // const [isTagHovered,setITagHovered]=useState(false)



    const handleFilter=(value)=>{
        const preState = querclient.getQueryData("globalFilter");
        querclient.setQueryData("globalFilter",{...preState,searchTerm:value});
    }


  return (
    <div className="flex w-full items-center justify-start py-3">
        <div 
        onMouseEnter={()=>setIsClearHovered(true)}
        onMouseLeave={()=>setIsClearHovered(false)}
        className='border-2 border-gray-500 px-3 py-3 bg-gray-200 rounded-md group hover:shadow-md cursor-pointer mr-2 relative'>
            <MdLayersClear size={20}/>
         
            <AnimatePresence>
            {
                isClearHovered && (
                <motion.div {...slideUp} className='absolute -top-8 -left-3 px-3 py-1 bg-gray-200 rounded-md flex justify-center items-center shadow-md'>
                    <p className='whitespace-nowrap text-xs'>Clear all</p>
                </motion.div>
                )
            }
            </AnimatePresence>
            

        </div>

        <div className='w-full flex justify-start items-center gap-6 overflow-x-hidden scrollbar-none'>
            {
                FiltersData && FiltersData.map((tag,index)=>(
                  
                        <div 
                        key={index}
                        onClick={()=>{handleFilter(tag.value)}}
                        className={`cursor-pointer px-1 py-2 border-2 border-gray-500 rounded-md group hover:shadow-md 
                        ${filteredData?.searchTerm === tag.value && 'bg-blue-200'}
                        `}>
                            <p key={tag.id} className='text-sm text-txtPrimary group-hover:text-txtDark whitespace-nowrap'>{tag.label}</p>
                        </div>
                    
                ))
            }
        </div>
       
    </div>
  )
}

export default Filters