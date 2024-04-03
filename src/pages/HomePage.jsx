import {React,Suspense} from 'react'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from '../container/HomeContainer'
import CreateTemplate from './CreateTemplate'
import UserProfile from './UserProfile'
import MainSpinner from '../components/MainSpinner'
import TemplateDesingPinDetail from './TemplateDesingPinDetail'
import CreateResume from './CreateResume'


const HomePage = () => {
  return (
    <div className='flex flex-col h-screen'>
    <Header/>
   <main className='w-full'>
   <Suspense fallback={<MainSpinner />}>
    
    <Routes>
      <Route path='/' element={<HomeContainer/>}/>
      <Route path='/template/create' element={<CreateTemplate/>}/>
      <Route path='/profile/:uid' element={<UserProfile/>}/>
      <Route path='/resume/*' element={<CreateResume/>}/>
      <Route path='/resumeDetail/:templateId' element={<TemplateDesingPinDetail/>}/>
    </Routes>
  </Suspense>
   </main>
    
    </div>
  )
}

export default HomePage