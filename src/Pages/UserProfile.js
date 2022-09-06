import HeaderComp from '../Components/HeaderComp'
import './UserProfile.css'

import bck from '../assets/image/bck.png'
import { useDispatch, useSelector } from 'react-redux';
import { showDropDown } from '../app/features/settingsSlice';

const UserProfile = (props) => {
 let curruser = props.userdata[0]

   const dispatch = useDispatch();

  return (
    <>
    <HeaderComp userdata={curruser}/>
    <div onClick={()=> dispatch(showDropDown(false))} className='userProfile__con'>
      <div className="userProfile__right">
       <section className="userProfile__right_top">
        <img src={bck} alt="" />
        <div className='userProfilePic__con'>
         <img src={curruser.profilePic} alt="" />
        </div>
       </section>
       <div className="userProfile__right_bottom">
        <h4>{curruser.lastName} {curruser.firstName}</h4>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, nulla neque voluptatem nesciunt fugit a tempora culpa voluptatibus expedita. molestiae voluptatem quia iusto, fuga iste.</p>
         <article>
           <h6>Contact Info</h6>
           <p>{curruser.phoneNumber}</p>
         </article>
         
       </div>
       <hr />
       <section className="userProfile__right_bottom2">
        <div></div>
        <div></div>
       </section>
      </div>
    </div>
    </>
  )
}

export default UserProfile