import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { fadeInOutWithOpacity, scaleInAndOutBaseOnIndex } from '../animations'
import InnerBoxCard from './InnerBoxCard'
import {BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart} from 'react-icons/bi'
import  useUser  from '../hooks/useUser'
import  useTemplate  from '../hooks/useTemplate'
import { saveToCollection, saveToFavourite } from '../api'
import { useNavigate } from 'react-router-dom'


const TemplateDesignPin = ({data,index}) => {
    // console.log('DATA',data);
    const navigate = useNavigate();
    const [isHoverd,setIsHoverd]=useState(false);
    const{data:userData , refetch:userDataRefetch}=useUser();
    const{ refetch:userTempRefetch}=useTemplate();

    const handleRouteNavigation=()=>{
        navigate(`/resumeDetail/${data._id}`,{replace:true});
    }
    const addtoCollection=async(e)=>{
        e.stopPropagation();
        console.log("clicked collection");
        await saveToCollection(userData,data);
        userDataRefetch();
    }

    const addtoFavourites =async(e)=>{
        e.stopPropagation();
        console.log("clicked favourite");
        await saveToFavourite(userData,data);
        userTempRefetch();
    }

  return (
    <motion.div {...scaleInAndOutBaseOnIndex(index)} key={data._id}
    onMouseEnter={()=>setIsHoverd(true)}
    onMouseLeave={()=>setIsHoverd(false)}
    onClick={handleRouteNavigation}
    >
        <div className='w-full h-[400px] lg:h-[350px] 2xl:h-[450px] bg-gray-300 rounded-md relative'>
            <img className='w-full h-full object-cover rounded-md' src={data?.imageUrl}  />



            <AnimatePresence>
             {
                isHoverd && (
                    <motion.div {...fadeInOutWithOpacity} 
                    className='absolute flex flex-col inset-0 bg-[rgba(0,0,0,0.4)] items-center justify-start px-4 py-3 z-50 cursor-pointer rounded-md'
                    >
                        <div className='w-full flex-col items-end justify-start gap-8'>
                           
                                <InnerBoxCard 
                                label={userData?.collection?.includes(data._id) ? "Remove Collection" : "Add to Collection"} 
                                Icon={userData?.collection?.includes(data._id) ?  BiSolidFolderPlus :BiFolderPlus }
                                onHandle={addtoCollection}/>
                                <InnerBoxCard 
                                label={data?.favourite?.includes(userData.uid) ? "Remove favourite" : "Add to favourite"}
                                Icon={data?.favourite?.includes(userData.uid) ?  BiSolidHeart : BiHeart } 
                                onHandle={addtoFavourites}/>
                        </div>
    
                    </motion.div>
                )
             }
            </AnimatePresence>


        </div>
       
    </motion.div>
  )
}

export default TemplateDesignPin