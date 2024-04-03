import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { GoogleAuthProvider , GithubAuthProvider, signInWithRedirect} from 'firebase/auth'
import { auth } from '../config/firebase.config';

const AuthBtnwithProvider = ({Icon,label,provider}) => {




const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
  const handleClick = async() => {
    switch (provider) {
      case 'GoogleAuthProvider':
        await signInWithRedirect(auth, googleAuthProvider).then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        })
        break
      case 'GithubAuthProvider':
        await signInWithRedirect(auth, githubAuthProvider).then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        })
        break
      default:
        await signInWithRedirect(auth, googleAuthProvider).then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        })
        break
    }
  }

  return (
    <div onClick={handleClick} className='w-full px-4 py-3 rounded-md border-2 border-blue-700 flex flex-row items-center justify-between gap-2 text-blue-700 text-sm font-semibold
    cursor-pointer group hover:bg-blue-700 hover:text-white active:scale-95 duration-150 hover:shadow-md'>
        <Icon className='text-txtPrimary text-xl group-hover:text-white'/>
        <p className='text-txtPrimary text-lg group-hover:text-white'>{label}</p>
        <FaChevronRight className='text-txtPrimary text-base group-hover:text-white'/>
    </div>
  )
}

export default AuthBtnwithProvider