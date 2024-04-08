import React from "react";
import Filters from "../components/Filters"
import useTemplate from '../hooks/useTemplate'
import RenderATemplate from "../components/RenderATemplate";

const HomeContainer = () => {
  const {data:temp_data,isError:temp_isError,isLoading,refetch}=useTemplate();
  return (
    <div className="w-full px-4 lg:px-12 py-6 justify-center items-center flex flex-col">

    {/* filter Section */}

      <Filters/>
      
      {
        temp_isError ? 
        (
          <React.Fragment>
            <p className="text-lg text-txtDark">Something went wrong</p>
          </React.Fragment>
        )
        :
        (
          <React.Fragment>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-2">
                <RenderATemplate templates={temp_data}/>
            </div>
          </React.Fragment>
        )
      }

    
      

    </div>
  )
}

export default HomeContainer