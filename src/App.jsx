import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth";
import {login,logout} from "./store/authSlice"
import { Header } from './component/index';
import { Footer } from "./component/index";
import { Outlet } from "react-router";
function App() {
  //console.log(import.meta.env.VITE_APPWRITE_URL)
  const [loading,setloading]=useState(true) 
  const dispatch=useDispatch();
  useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
          if(userData){
            dispatch(login(userData));
          }
          else{
            dispatch(logout());
          }
          
      })
      .finally(()=>{
        setloading(false);
      })
  },[])
   return !loading ?(

    <div className='min-h-screen flex flex-wrap bg-gray-400 content-between'>
      <div className='w-full block'>
        <Header/>
        <main>
        TODO:{/*<Outlet/>*/}
        </main>
        <Footer/>
      </div>
    </div>
    
    )
    :<div>...loading</div>
}

export default App
