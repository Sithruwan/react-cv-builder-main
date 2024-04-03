import { Suspense } from 'react'
import './App.css'


import { Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

import {QueryClient,QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
  <QueryClientProvider client={queryClient}>
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/*" element={<HomePage/>} />
      <Route path="/auth" element={<AuthPage/>} />
    </Routes>
    </Suspense>
    <ToastContainer position='top-right' theme='dark'/>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
    
    </>
  )
}

export default App
