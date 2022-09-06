import { signOut } from 'firebase/auth'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config/firebase-config'
import { useDispatch, useSelector } from 'react-redux';
import { dropDownState, showDropDown } from '../app/features/settingsSlice';
import './UserDrop.css'

const UserDrop = (props) => {
 let curruser = props.userdata[0]
 const navigate = useNavigate()

 const show = useSelector(dropDownState)
  const dispatch = useDispatch();


 const handleLogOut = (e) => {
  e.preventDefault()
    signOut(auth)
   .then((response) => {
    alert('user logged out')
    dispatch(showDropDown(false))
    navigate('/login')   
   })
   .catch((error) => console.log(error.message))

 }
  return (
    <>
    {show && 
     <div className='userDrop'>
      <div className='top_section'>
        <article className='top_section_con'>
          <section>
            <img src={curruser.profilePic} alt="" />
          </section>        
        <section className='top_section_con2'>
          <h2>{curruser.lastName} {curruser.firstName}</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, nulla neque voluptatem nesciunt fugit a tempora culpa voluptatibus expedita. molestiae voluptatem quia iusto, fuga iste.</p>
        </section>
        </article>
        <button onClick={()=>dispatch(showDropDown(false))}><Link to='/profile'>View Profile</Link></button>
      </div>
      <hr />
      <div className='middle_section'>
        <h4>Account</h4>
        <section>
          <h6>Try Premium for free</h6>
        </section>
        <p>Settings & Privacy</p>
        <p>Help</p>
        <p>Language</p>
      </div>
      <hr/>
      <div className='middle_section'>
        <h4>Manage</h4>
        <p>Posts & Activity</p>
        <p>Job Posting Account</p>
      </div>
      <hr />
      <div className="middle_section">
         <p 
         onClick={handleLogOut}
         >Sign Out</p>
      </div>
    
    </div>
    }
    </>
  )
}

export default UserDrop