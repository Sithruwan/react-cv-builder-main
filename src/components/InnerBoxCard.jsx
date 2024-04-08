import { AnimatePresence,motion } from "framer-motion"
import { useState } from "react"
import { slideUpX } from "../animations";


const InnerBoxCard = ({label,Icon,onHandle}) => {
  const[isHoverd,setIsHoverd]=useState(false);
  return (
   
        
        <div 
        className='text-base text-txtPrimary px-2 py-2 bg-gray-50 w-12 h-12 rounded-full mb-3 flex items-center justify-center relative'
        onClick={onHandle}
        onMouseEnter={()=>setIsHoverd(true)}
        onMouseLeave={()=>setIsHoverd(false)}
        >

            <Icon />

               <AnimatePresence>
                    {
                      isHoverd && (
                        <motion.div >
                          <div className='absolute top-3 left-20 bg-gray-200 px-3 py-1 rounded-md'>
                            <p className='whitespace-nowrap text-sm text-txtPrimary'>{label}</p>
                          </div>
                        </motion.div>
                      )
                    }
               </AnimatePresence>


        </div>

      
    

  

    

   
  )
}

export default InnerBoxCard