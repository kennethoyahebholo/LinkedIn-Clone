import { Avatar } from '@mui/material'
import React from 'react'
import './HeaderOption.css'

const HeaderOption = ({avatar , Icon, title, pic}) => {
  return (
    <div className='headerOption'>
     {Icon && <Icon className='headerOption__icon'/>}
     {avatar && (<Avatar className='headerOption__icon' src={avatar}/>)}
     {pic && <img className='headerOption__pic' src={pic} alt="profilepicture"></img>}
     <h3 className='headerOption__title'>{title}</h3>
    </div>
  )
}

export default HeaderOption