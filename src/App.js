import { useEffect, useState } from 'react';
import './App.css';
import SignUp from './SignUp-Login/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './SignUp-Login/LogIn';
import UserProfile from './Pages/UserProfile'

import Dashboard from './Pages/Dashboard'

import Fof from './Pages/Fof';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase-config/firebase-config';
import UserDrop from './Components/UserDrop';
import HeaderLinks from './Components/HeaderLinks';

function App() {
 const [user, setUser] = useState('')

 function GetCurrentUser(){
  useEffect(()=>{
  auth.onAuthStateChanged(userlogged => {
    if(userlogged){
      const getUser = async () => {
        const q = query(collection( db, "users"),where("uid","==",userlogged.uid))
        const data = await getDocs(q)
        setUser(data.docs.map((doc) => ({...doc.data() , id: doc.id})))
      };
      getUser();
    }
    else{
      setUser(null)
    }
  })
  },[])
  return user
 }
 GetCurrentUser()

  return (
  <>
   <BrowserRouter>
    {user?    
      <div className=''>
      <div 
       className='app__body'>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/dashboard" element={<Dashboard userdata={user}/>}/>
        <Route path="/profile" element={<UserProfile userdata={user}/>}/>
        <Route path="/*" element={<Fof userdata={user}/>} />
      </Routes>      
    </div>
    <UserDrop userdata={user}/>
    <div  className="mv_icons"><HeaderLinks userdata={user}/></div>
    
    </div>
    :
    <div className='app__body'>
    <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/*" element={<Fof/>} />
    </Routes>    
    </div>
    }
   </BrowserRouter>
   </>

  );
}

export default App;
