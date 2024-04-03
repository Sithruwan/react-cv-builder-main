import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase.config';
import { IoIosLogOut } from "react-icons/io";
import { useQueryClient } from 'react-query';
import { adminIds } from '../utils/helpers';

const AccountMenu = ({ data }) => {
  const queryClient = useQueryClient();

  const handleSignoutClick = async () => {
    console.log("clicked logout");
    await auth.signOut().then(() => {
        queryClient.setQueryData("user", null);
        console.log("You have been logged out successfully");
        toast.success("You have been logged out successfully");
    });
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      {data && ( // Check if data is not null or undefined
        <>
          <img src={data.photoURL} alt="profilePic" className='rounded-full object-cover w-12 h-12' />
          <p className='text-base'>{data.displayName}</p>
        </>
      )}
      <hr className='w-full border-black'/>
      <div className='flex flex-col gap-3 justify-start'>
        <Link to={'/profile'} className='pillStyle'>Profile</Link>
        {
         adminIds.includes(data?.uid) && (
          <Link to={'/template/create'} className='pillStyle'>Add new template</Link>
         )
        }
        
        <button onClick={handleSignoutClick} type='button' className='flex justify-between items-center pillStyle'>Sign Out <IoIosLogOut /></button>
      </div>
    </div>
  );
};

export default AccountMenu;
