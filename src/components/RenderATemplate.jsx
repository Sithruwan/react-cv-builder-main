import { AnimatePresence } from "framer-motion"
import React from "react"
import TemplateDesignPin from "./TemplateDesignPin"


const RenderATemplate = (templates) => {
    const Templates = templates.templates;
  return (
    <React.Fragment>
        {
            Templates && Templates.length > 0 ?(
                
                <React.Fragment>
                    <AnimatePresence>
                        {
                            Templates.map((template,index)=>
                            (
                                <TemplateDesignPin key={index} data={template} index={index}/>
                            )
                            )
                        }
                    </AnimatePresence>
                </React.Fragment>
            ) :
            (
                <React.Fragment>
                    <p className="text-lg text-txtDark">No template found</p>
                </React.Fragment>
            )
        }
    </React.Fragment>
  )
}

export default RenderATemplate