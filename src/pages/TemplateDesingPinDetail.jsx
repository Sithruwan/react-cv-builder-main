
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getTemplateDetailsById, saveToCollection, saveToFavourite } from '../api';
import MainSpinner from '../components/MainSpinner';
import { FaHouse } from "react-icons/fa6";
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi';
import useUser from '../hooks/useUser';
import useTemplate from '../hooks/useTemplate';
import RenderATemplate from '../components/RenderATemplate';

const TemplateDesingPinDetail = () => {
  const {templateId:id} = useParams();
  const{data:userData , refetch:userDataRefetch}=useUser();
  const{data:tempAllData ,refetch:userTempRefetch}=useTemplate();
  const {data,isLoading,isError,refetch} = useQuery(
    ['template',id],
    ()=>getTemplateDetailsById(id)
  );

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
    refetch();
}



  if(isLoading) return <MainSpinner/>
  if(isError) {
  return (
    <div className='w-full h-[60vh] justify-center items-center flex flex-col'>
      <p className='text-lg text-txtPrimary'>Something went wrong, Try again Later</p>
    </div>
  )  
  }
  return (
    <div className='w-full  justify-center items-center flex flex-col px-4 py-6 '>
      {/* breadCumb */}
      <div className='w-full h-[50px] flex items-center text-txtPrimary'>
        <Link to={'/'} className='flex justify-center items-center '>
         <FaHouse />
         <p className='mx-1'>Home / </p>
        </Link>
        {data?.name}
      </div>

      {/* main section */}

      <div className='w-full grid grid-cols-1 lg:grid-cols-12 gap-1'> 

        {/* leftsection */}
        <div className='col-span-1 lg:col-span-8 flex flex-col gap-4 '>
          {/* load template image */}
          <img className="w-full h-auto object-contain rounded-md" src={data.imageUrl} alt="template image" />
          {/* title section */}
          <div className='w-full flex items-center  justify-between gap-4 '>
            <p className='text-sm text-txtPrimary'>{data?.title}</p>
            <div className='flex items-center justify-center mx-1 gap-1'>
              <BiHeart color='red'/>
              <p>{data?.favourite?.length}</p>
              <p>Likes</p>
            </div>
          </div>

          {
            userData && (
              <div className='w-full flex items-center  justify-start gap-4  '>
            <div 
            onClick={addtoCollection}
            className='w-auto gap-3 cursor-pointer text-txtPrimary text-sm whitespace-nowrap flex items-center justify-center px-2 py-2 rounded-md border-2 border-gray-500 hover:bg-gray-200'>
              
              {userData?.collection?.includes(data?._id)? <BiSolidFolderPlus/>:<BiFolderPlus/>}
              
              <p >{userData?.collection?.includes(data?._id)?"Remove from Collection":"Add to Collection"}</p>
            </div>
            <div 
            onClick={addtoFavourites}
            className='w-auto gap-3 cursor-pointer text-txtPrimary text-sm whitespace-nowrap flex items-center justify-center px-2 py-2 rounded-md border-2 border-gray-500  hover:bg-gray-200'>
              {data?.favourite?.includes(userData.uid)?<BiSolidHeart/>:<BiHeart/>}
              <p>{data?.favourite?.includes(userData.uid)?"Remove from favourite":"Add to favourite"}</p>
            </div>
          </div>
            )
          }
          
        </div>
        {/* rightSection */}
        <div className='w-full items-center justify-start  px-3 gap-6 col-span-1 lg:col-span-4 flex flex-col rounded-md'>
          <div className='relative w-full h-72 overflow-hidden rounded-md bg-blue-200 '>
            <img src={`https://cdn.pixabay.com/photo/2018/04/22/12/25/flowers-3340913_1280.png`}  />
            <Link to={'/'}>
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-dark text-3xl font-semibold whitespace-nowrap border-2 border-black bg-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-400 hover:text-white'>Discover More</p>
            </Link>
          </div>
        
           {
            userData && (
              <Link to={`/resume/${data?.name}?templateId=${data?._id}`} className='w-full '>
                <div className='w-full flex items-center justify-center bg-green-500 py-2 rounded-md'>
                <p className='text-xl text-white'>Edit this template</p>
                </div>
              </Link>
            )
           }
         
          <div className='w-full flex flex-wrap gap-1 items-center justify-start'>
            {
              data?.tags?.map((tag,index)=>(
                <p key={index} className='text-sm whitespace-nowrap px-1 py-2 border-2 border-gray-400 rounded-md text-txtPrimary'>{tag}</p>
              ))
            }
           
          </div>
        </div>
        
      </div>

      {/* similara templates */}


      {
        tempAllData?.length >0  && (
          <div className='w-full flex flex-col py-8 items-start justify-start gap-3 '>
          <p className='text-xl text-txtPrimary font-semibold'>You might also like</p>
          <div className='w-full grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            
          <RenderATemplate templates={tempAllData?.filter(temp=>temp?._id !== id)}/>
          </div>
        </div>
          
        )
      }
         
      



    </div>


    


  )
}

export default TemplateDesingPinDetail