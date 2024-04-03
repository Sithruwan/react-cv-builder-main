import React from 'react'
import logo from '../assets/logo.jpg'
import { Link } from'react-router-dom'
const Footer = () => {
  return (
    <div className='flex w-full items-center justify-between border-t border-gray-300 py-3' >
        <div className='flex items-center'>
        <img src={logo} alt="logo" className='logo mr-2'/> <span className=''>FastCV</span>
        </div>
        <div className='flex flex-row items-center gap-2'>
            <ul className='flex flex-row gap-2'>
                <Link to={'/'} className='text-blue-700 text-sm whitespace-nowrap'>Home</Link>
                <Link to={'/contact'} className='text-blue-700 text-sm whitespace-nowrap'>Contact</Link>
                <Link to={'/terms'} className='text-blue-700 text-sm whitespace-nowrap'>Terms</Link>
            </ul>
        </div>
    </div>
  )
}

export default Footer