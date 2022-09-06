import React, { useEffect, useState } from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post'; 
import { addDoc, collection, query, serverTimestamp, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config/firebase-config';
import Flipmove from "react-flip-move"
import Button from '@mui/material/Button';


// var dateObj = new Date();
//  var month = dateObj.getUTCMonth() + 1; //months from 1-12
//  var day = dateObj.getUTCDate();
//  var year = dateObj.getUTCFullYear();
//  var hours = dateObj.getHours();
//  var mins = dateObj.getMinutes();
//  var seconds = dateObj.getSeconds();

const Feed = (props) => {
 let curruser = props.userdata
 const [input, setInput] = useState('')
 const [posts, setPosts] = useState([])
 const [successMsg, setSuccessMsg] = useState('');
 const [errorMsg, setErrorMsg] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false)
 const usersTodosRef = query(collection(db , "posts"), 
   orderBy("timestamp", "desc")
)


// snapshot database
   useEffect(()=>{
     const unsub = onSnapshot(usersTodosRef, (snapshot) => {
      setPosts(snapshot.docs.map(doc =>({id: doc.id, ...doc.data()})))
   })
   return unsub;
      
   },[])

//////////////////////////////////////////////

//database won't be real time like with this code

//  useEffect(()=>{
//    const getPosts = async () => {
//     const postsArray = [];
//     const querySnapshot = await getDocs(collection(db, "posts"));

//     querySnapshot.forEach((doc) => {
//      postsArray.push({...doc.data(), id: doc.id})
// });
// setPosts(postsArray)
//    }
//    getPosts()
//  },[])

////////////////////////////////////////////////////

 console.log(posts)

 const sendPost = (e) => {
  e.preventDefault();
  setIsSubmitting(true)
   const user = curruser;
     addDoc(collection(db, `posts`), {
      name: user.firstName,
      profilePic: user.profilePic,
      message: input,
      photoUrl: '',
      timestamp: serverTimestamp(),
     })
     .then(()=>{
      setSuccessMsg('posted successfully');
      setIsSubmitting(false)
      setInput('')
      setTimeout(()=>{
       setSuccessMsg('');
      }, 2000)
     })
   .catch((error) => {
    setIsSubmitting(false)
    console.log(error.message)
   })
 }

  return (
    <div className='feed'>
     <div className="feed__inputContainer">
      <div className="feed__input">
       <CreateIcon/>
       <form onSubmit={sendPost} >
        <input value={input} onChange={(e) => {setInput(e.target.value)}} type="text" />
        <Button className="btn" variant="contained" disabled={!input} type="submit">Send</Button>
       </form>
      </div>
      <div className="feed__inputOptions">
        <InputOption title="Photo" Icon={ImageIcon} color="#70B5F9"/>

        <InputOption title="Video" Icon={SubscriptionsIcon} color="#E7A33E"/>

        <InputOption title="Event" Icon={EventNoteIcon} color="#C0CBCD"/>

        <InputOption title="write article" Icon={CalendarViewDayIcon} color="#7FC15E"/>
      </div>
     </div>

     <Flipmove>
       {posts.map((post)=>{
      return <div key={post.id}>
          <Post key={post.id} photoUrl={post.profilePic} time={new Date(post.timestamp?.seconds * 1000).toUTCString()} name={post.name} description={post.description} message={post.message}/>
          </div>
     })}
     </Flipmove>
     
    </div>
  )
}

export default Feed