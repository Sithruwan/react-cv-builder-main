import React, { useEffect } from 'react'
import logo from '../assets/logo.jpg'
import Footer from '../components/Footer'
import AuthBtnwithProvider from '../components/AuthBtnwithProvider'
import {FaGithub, FaGoogle} from 'react-icons/fa'
import useUser from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import MainSpinner from '../components/MainSpinner'


const AuthPage = () => {

  const {data,isLoading,isError} = useUser();

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoading && data){
      navigate("/", {replace:true});
    }
  },[isLoading,data])

 if(isLoading){
  return <MainSpinner/>
 }

  return (
    <div className='auth-section'>
      <img src={logo} alt="logo" className='logo'/>
      <div className='w-full flex flex-1 flex-col justify-center items-center gap-6'>
          <h1 className='text-3xl lg:text-4xl text-blue-700'>Welcome to FastCV</h1>
          <p className='text-base  text-gray-700'>fast way to create CV</p>
          <h2 className='text-2xl text-gray-600 '>Authenticate</h2>
          <div className='flex flex-col  w-full lg:w-96 rounded-md items-center justify-center gap-6'>
            <AuthBtnwithProvider Icon={FaGoogle} label='Sign in with Google' provider='GoogleAuthProvider'/>
            <AuthBtnwithProvider Icon={FaGithub} label='Sign in with Github' provider='GithubAuthProvider'/>
            
          </div>
      </div>
     
      <Footer/>
    </div>
  )
}

export default AuthPage