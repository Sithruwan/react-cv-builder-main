import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import {  FaTrash, FaUpload } from 'react-icons/fa';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { db, storage } from '../config/firebase.config';
import { adminIds, initiatTags } from '../utils/helpers';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import useTemplate from '../hooks/useTemplate';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';




const CreateTemplate = () => {
  const [formData, setFormData]=useState({
    title:'',
    imageUrl:null,
  });

  const [imageAsset,setImageAsset]=useState({
    isImageLoaded:false,
    uri:null,
    progress:0
  });

  const [tags,setTags]=useState([]);

  const {data : templates ,isLoading : templatesIsloading ,isError : templatesIsError ,refetch :templatesRefetch} = useTemplate();

  const {data: user , isLoading:userLoading} = useUser();

  const navigate = useNavigate(); 

  const handleFormData =(e)=>{
    const {name,value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]:value

    }))

  }
  const handleFile = async (e) =>{
    
   
    const file = e.target.files[0];
    if(file && isAllowed(file)){
      setImageAsset((preRec)=>({...preRec, isImageLoaded:true}))
      const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        const nowProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       
        setImageAsset((preRec)=>({...preRec, progress:nowProgress}))
        if(nowProgress === 100){
          setImageAsset((preRec)=>({...preRec, isImageLoaded:false}));
          toast.success("Image uploaded successfully");
        }
      }, (error) => {
        if(error.message.includes("storage/unauthorized")){
          toast.error("You are not authorized to upload image");
        }
      else{
        toast.error(`Error : ${error.message}`);
      }
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          
          setImageAsset(prevState => ({
           ...prevState,
            uri:url
          }))
        })
      })

    }else{
      toast.info("Invalid file type");
    }
  }


const isAllowed=(file)=>{

  const allowedTypes = ['image/jpeg','image/png','image/jpg'];
  if(allowedTypes.includes(file.type)){
    return true;
  }else{
    return false;
  }

}

const deleteImage=()=>{

const desertRef = ref(storage, imageAsset.uri);
setInterval(()=>{ 
  setImageAsset((preRec)=>(
    {
      ...preRec,
      isImageLoaded:false,
      uri:null,
      progress:0
    }
  ))
},2000);
deleteObject(desertRef).then(() => {
  toast.success("Image deleted successfully");
 
}).catch((error) => {
  toast.error(`Error : ${error.message}`);
});
}

const deleteTemplate =async(temp)=>{
  const docRef = ref(storage, temp.imageUrl);
  await deleteObject(docRef).then(async() => {
    await deleteDoc(doc(db,'Templates',temp._id)).then(()=>{
      toast.success("Template deleted successfully");
      templatesRefetch();
    })
  }).catch((error) => {
    toast.error(`Error : ${error.message}`);
  });
}

const handleTag=(tag)=>{
  if(tags.includes(tag)){
    setTags(prevState => prevState.filter(prevTag => prevTag!== tag))
  }else{
    setTags(prevState => [...prevState, tag])
  }
} 

const pushToCloud =async()=>{
  const timeStamp = serverTimestamp();
  const id = `${Date.now()}`;
  const _doc ={
    _id:id,
    title:formData.title,
    imageUrl:imageAsset.uri,
    tags:tags,
    name: templates && templates.length > 0 ? `Template${templates.length+1}` : `Template1`,
    timestamp:timeStamp,

  };

  
  await setDoc(doc(db,'Templates',id),_doc).then(()=>{
    
    setFormData((preData)=>(
      {
        ...preData,
        title:'',
        imageUrl:null,
      }
    ));
    setImageAsset((preData)=>({
      ...preData,
      isImageLoaded:false,
      uri:null,
      progress:0
    }
    ));
    setTags([]);
    templatesRefetch();
    toast.success("Template created successfully");
  }).catch((error)=>{
    toast.error(`Error : ${error.message}`);
  })

}

useEffect(()=>{
  if(!userLoading && !adminIds.includes(user?.uid)){
    navigate('/',{replace:true})
  }
},[user,userLoading])

  return (
    <div className='w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12'>
      <div className='col-span-12 lg:col-span-4 2xl:col-span-3 flex flex-1  justify-start w-full flex-col gap-4 px-2' >

        <div className='w-full '>
          <p className='text-lg text-txtPrimary'>Create a new Template </p>
        </div>
        <div className='w-full items-center justify-end flex'>
          <p className='text-base text-txtDark uppercase font-semibold'>tempid: {""}</p>
          <p className='text-base text-txtLight  font-bold capitalize'>
            {templates && templates.length > 0 ? `Template${templates.length+1}` : `Template1`}
            </p>
        </div>
        <div className='w-full'>
        <input type="text" id="input" aria-label="input "
         className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400
            dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Template Tittle" onChange={handleFormData} value={formData.title} name="title"/>
        </div>
        <div className='w-full flex bg-gray-200 backdrop-blur-md
        cursor-pointer h-[420px] lg:h-[520px] 2xl:h-[620px]
         items-center justify-center border-2 border-dotted
          border-gray-300 rounded-md'>
          {
            imageAsset.isImageLoaded?
            (
              <>
                <div className='flex flex-col items-center justify-center gap-4'>
                <PuffLoader color='#498FCD' size={40} />
                <p className='font-bold'>{imageAsset?.progress.toFixed(2)}%</p>
                </div>
             </>
            )
            :
            (
              <>
               {!imageAsset?.uri ?
                (
               <>
                <label className='w-full h-full cursor-pointer flex justify-center'>
                  <div className='flex flex-col justify-center items-center gap-4'> 
                    <FaUpload className='text-2xl'/>
                    <p className='text-lg'>Click to upload</p>
                  </div>

                  <input 
                  type="file" 
                  className='w-0 h-0' 
                  accept='.jpeg,.jpg,.png' onChange={handleFile}/>

                </label>
               </>
               )
               :
               (
               <>
               <div className='w-full h-full relative overflow-hidden '>
                <img src={imageAsset?.uri} alt="template" className='w-full h-full object-cover rounded-md' loading='lazy'/>
                <div className='absolute w-8 h-8 top-5 right-5 bg-red-500 rounded-md flex justify-center items-center'  onClick={deleteImage}>
                  <FaTrash className='text-lg text-white cursor-pointer hover:text-black'/>
                  
                </div>
               </div>
               </>
               ) }
              </>
            )
          }
        </div>


          <div className='w-full flex flex-wrap px-2 py-1 gap-2 items-center'>
            {initiatTags.map((tag,index)=>(
              <div className={`cursor-pointer  border-2 border-black px-2 py-1 rounded-md ${tags.includes(tag)?'bg-blue-500 text-white' : ''}`}
              
               key={index} onClick={()=>{handleTag(tag)}}>
                <p className='text-sm'>{tag}</p>
              </div>
            ))}
          </div>
          
          <button className='w-full bg-blue-700 text-white rounded-md py-2' onClick={pushToCloud}>Save</button>

      </div>
      {/* =========right container========= */}
      <div className='col-span-12 lg:col-span-8 2xl:col-span-9 bg-red-200 flex flex-1 w-full px-2 py-2'>
              {
                templatesIsloading ?
                 (<React.Fragment>
                  <div className='w-full h-full flex justify-center items-center'>
                    <PuffLoader color='#498FCD' size={150} />
                  </div>
                 </React.Fragment>)
                 :
                 (<React.Fragment>
                  {templates && templates.length > 0 ? 
                  (<React.Fragment>
                    <div className='flex  '>
                      {templates?.map((template)=>(
                        <div key={template._id} className='w-full h-[500px] relative overflow-hidden p-4 rounded-md  grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-4 justify-between items-center'>
                          <img src={template.imageUrl} alt="templateImage" className='w-full h-full object-cover rounded-md' loading='lazy'/>
                          
                        <div className='absolute w-8 h-8 top-5 right-5 bg-red-500 rounded-md flex justify-center items-center'  onClick={()=>{deleteTemplate(template)}}>
                        <FaTrash className='text-lg text-white cursor-pointer hover:text-black'/>
                        
                        </div>
                        </div>
                        
                      ))}
                    </div>
                  </React.Fragment>)
                  :
                  (<React.Fragment>
                    <p className='text-xl capitalize text-txtPrimary tracking-wider'>No data</p>
                  </React.Fragment>)}
                 </React.Fragment>)
              }

      </div>
      
    </div>
  )
}

export default CreateTemplate