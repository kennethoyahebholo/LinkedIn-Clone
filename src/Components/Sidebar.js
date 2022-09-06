import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import './Sidebar.css'
import bck from '../assets/image/bck.png'

const  Sidebar = (props) => {
  let curruser = props.userdata

 const recentItem = (topic) => (
   <div className="sidebar__recentItem">
    <span className="sidebar__hash">#</span>
    <p>{topic}</p>
   </div>
 )

 
  console.log(curruser.lastName+"ertyuiop")
  return (
    <div className='sidebar'>
     <div className="sidebar__top">
       <img 
       src={bck}
       alt="" />
       <section>
                <img className='sidebar__avatar' src={curruser.profilePic} alt="" />
       </section>

       <h2>{curruser.lastName} {curruser.firstName}</h2>
       <h4>{curruser.email}</h4>
     </div>

     <div className="sidebar__stats">
      <div className="sidebar__stat">
        <p className='sidebar__statp'>who viewed you</p>
        <p className="sidebar__statNumber">2,543</p>
      </div>
      <div className="sidebar__stat">
         <p className='sidebar__statp'>Views on post</p>
        <p className="sidebar__statNumber">2,543</p> 
      </div>
     </div>

     <div className="sidebar__bottom">
      <p>Recent</p>
      {recentItem('react js')}
      {recentItem('programming')}
      {recentItem('software Engineering')}
      {recentItem('Projects')}
     </div>
     </div>
  )
}

export default Sidebar