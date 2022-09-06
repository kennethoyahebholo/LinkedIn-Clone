import React from 'react'
import { Link } from 'react-router-dom'
import HeaderOption from './HeaderOption'
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './HeaderLinks.css'

const HeaderLinks = () => {
  return (
    <>
    <article>
      <section className="icons">
       <Link to='/dashboard'><HeaderOption Icon={HomeIcon} title='Home'/></Link>
       <HeaderOption Icon={SupervisorAccountIcon} title='My Network'/>
       <HeaderOption Icon={BusinessCenterIcon} title='Jobs'/>
       <HeaderOption Icon={ChatIcon} title='Messaging'/>
       <HeaderOption Icon={NotificationsIcon} title='Notifications'/>
       </section>
    </article>     
    </>
  )
}

export default HeaderLinks