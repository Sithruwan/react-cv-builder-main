import React, { useState } from 'react'
import useUser from '../hooks/useUser';
import { useQuery } from 'react-query';
import{AnimatePresence} from "framer-motion"
import RenderATemplate from '../components/RenderATemplate';
import useTemplate from '../hooks/useTemplate';
import { getSavedResumes } from '../api';
import MainSpinner from '../components/MainSpinner';
const UserProfile = () => {
  const { data:userData} = useUser();
 
  const{data:tempAllData }=useTemplate();
  const [openCollection, setOpenCollection] = useState(false);
  const [openMyResumes, setOpenMyResumes] = useState(false);
  const [tabName, setTabName] = useState("");

  const {data:savedResumes, isLoading:temIsLoading}=useQuery(["savedResumes"],async()=>{
  return  getSavedResumes(userData?.uid);
  })

  // console.log('saved templates',savedResumes);


  const handleButtonClick=(op)=>{
    if(op==="collection"){
      setOpenCollection(true);
      setOpenMyResumes(false);
      setTabName("collection");
    }else{
      setOpenCollection(false);
      setOpenMyResumes(true);
      setTabName("resumes");
    }
  }
  if(temIsLoading){
    return <MainSpinner/>
  }
  return (
    <>
    <div className='w-full flex flex-col items-center justify-start py-6 gap-3 border-b-2 border-black'>
      <div className='w-full h-72  '>
        <img className='w-full h-full object-cover' src="https://cdn2.vectorstock.com/i/1000x1000/15/66/black-yellow-seamless-background-pattern-vector-15731566.jpg" alt="" />
      </div>
      
      <div className='w-full h-auto flex items-center justify-center  '>
        {
          userData?.photoURL ? 
          (<React.Fragment>
            <img src={userData?.photoURL} alt="logo" className="  w-15 h-[100px] object-contain rounded-full border-2 border-black"  />
          </React.Fragment>)
          :
          (<React.Fragment>
            <img src={`https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-head-ninja-robot-avatar-profile-logo-vector-png-image_6633234.png`} alt="logo" className="  w-15 h-[100px] object-contain rounded-full border-2 border-black"  />
          </React.Fragment>)
        }
          
      </div>
      <div className='w-full h-auto flex items-center justify-center  '>
        <h1 className='text-3xl font-bold  top-12'>{userData?.displayName}</h1>
      </div>
      <div className='w-full flex items-center justify-center gap-5'>
        <p 
        onClick={()=>handleButtonClick("collection")}
        className='text-sm text-black cursor-pointer px-2 py-2 border-2 bg-gray-400 rounded-md hover:text-white hover:bg-blue-400'>Collections</p>
        <p 
        onClick={()=>handleButtonClick("resumes")}
        className='text-sm text-black cursor-pointer px-2 py-2 border-2 bg-gray-400 rounded-md hover:text-white hover:bg-blue-400'>My resumes</p>
      </div>
      
    </div>

    {/* templates */}
    {
      tabName &&(
        <div className='flex w-full items-center justify-center py-2'>
     <h3>My {tabName}</h3>
    </div>
      )
    }
    <div className='w-full flex items-center justify-start p-3 gap-2'>
      
    { openCollection && (
        <AnimatePresence>
          {
            userData?.collection?.length > 0 && userData?.collection ?
             (<React.Fragment>
              <RenderATemplate templates={tempAllData?.filter((temp)=>userData?.collection?.includes(temp._id))}/>
              </React.Fragment>)
             :
             (<React.Fragment>
              <p className='text-lg text-txtPrimary'>No data to show</p>
             </React.Fragment>)
          }
        </AnimatePresence>
       )
       }

      { openMyResumes && (
        <AnimatePresence>
          {
            savedResumes?.length > 0 && savedResumes ?
             (<React.Fragment>
             {savedResumes?.map((resume, index) => (
              <RenderATemplate
                key={index}
                templates={tempAllData?.filter((temp) => savedResumes.some((r) => r._id === temp._id))}
              />
              ))}
              
              </React.Fragment>)
             :
             (<React.Fragment>
              <p className='text-lg text-txtPrimary'>No data to show</p>
             </React.Fragment>)
          }
        </AnimatePresence>
       )
       }
    </div>
   
    </>

  )
}

export default UserProfile