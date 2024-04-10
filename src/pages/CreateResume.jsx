import { Route, Routes } from "react-router-dom"
import { TemplateData } from "../utils/helpers"


const CreateResume = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-4">
      <Routes>
        {
          TemplateData.map(({id,name,component})=>{
            return <Route 
            path={`/${name}`} 
            Component={component}
            key={id} />
          })
        }
      </Routes>
    </div>
  )
}

export default CreateResume