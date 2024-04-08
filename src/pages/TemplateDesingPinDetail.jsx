import React from 'react'
import { useParams } from 'react-router-dom';

const TemplateDesingPinDetail = () => {
  const {templateId:id} = useParams();
  console.log(id);
  return (
    <div>TemplateDesingPinDetail</div>
  )
}

export default TemplateDesingPinDetail