import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './header.css'
import HeaderOption from './HeaderOption';
import lkdIcon from '../assets/image/linkedin-logoJI.png'
import { useDispatch, useSelector } from 'react-redux';
import { dropDownState, showDropDown } from '../app/features/settingsSlice';
import HeaderLinks from './HeaderLinks';
const HeaderComp = (props) => {
  let curruser = props.userdata

   const show = useSelector(dropDownState)
  const dispatch = useDispatch();

  const handleShow = () => {
     dispatch(showDropDown(!show));

  }


    // const navigate = useNavigate()

      //  const [findUser, setFindUser] =useState('')

//  const [findUserDoc, setFindUserDoc] = useState('')

//   const searchUser = (e) => {
//    e.preventDefault()
//    const getUser = async () => {
//     const q = query(collection( db, "users"),where("email", "==", findUser));
//     const data = await getDocs(q);
//     setFindUserDoc(data.docs.map((doc) => (
//       {...doc.data(), id: doc.id})))
//     // console.log(findUserDoc)

//     if(findUserDoc.length !== 0){
//       navigate(`/searchedprofile/${findUserDoc[0].uid}`)
//     }
//    }
//    getUser()
//  }


  // console.log(curruser + 'hiiiiiii')


  return (
    <>
    <div className='header'>
     <div className="header__left">         
         {/* <LinkedInIcon className='linkedin__icon'/> */}
         <img src={lkdIcon} alt="" />

         <form  className="header__search">
          <SearchIcon  className='search_Icon'/>

        {curruser !== undefined ? 
          <div className='header__search'>
          <input type="text" placeholder='search a friend by email...' 
          // onChange={(e) => {setFindUser(e.target.value)}}
           />
         </div>
      :
      <>
      
      </>}
         </form>
     </div>

     <div className="header__right">
      <section className="icons">
      <HeaderLinks/>
      </section>
       <div onClick={handleShow}>      
         <HeaderOption        
          pic={curruser.profilePic} 
          title={curruser.firstName}
       /></div>
     
     </div>
    </div>
    </>
  )
}

export default HeaderComp