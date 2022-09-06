import React from 'react'
import InputOption from './InputOption'
import './Post.css'

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const Post = ({ name, description, time, message, photoUrl}) => {

  return (
    <div className='post'>
     <div className="post__header">
      {/* <Avatar /> */}
      <section className='post__pic'>
        <img src={photoUrl} alt="" />
      </section>
      <div className="pos__info">
       <h2>{name}</h2>
       <p>{time}</p>
      </div>
     </div>

     <div className="post__body">
      <p>{message}</p>
     </div>

     <div className="post__buttons">
      <InputOption Icon={ThumbUpOutlinedIcon} title="Like"/>

      <InputOption Icon={ChatOutlinedIcon} title="Comment"/>

      <InputOption Icon={ShareOutlinedIcon} title="Share"/>

      <InputOption Icon={SendOutlinedIcon} title="Send"/>
     </div>
    </div>
  )
}

export default Post