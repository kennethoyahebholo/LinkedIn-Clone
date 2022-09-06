import React from 'react'
import { useNavigate } from 'react-router-dom';
import lkdIcon from '../assets/image/linkedin-logob.png'

const FooterLogin = () => {
  const navigate = useNavigate();
  return (
    <div className='sl2_footer'>
     <img src={lkdIcon} alt="" />
     <p>&copy; 2021</p>
     <ul>
      <li onClick={()=> navigate("/*")} >User Agreement</li>
      <li onClick={()=> navigate("/*")} >Privacy Policy</li>
      <li onClick={()=> navigate("/*")} >Cookie Policy</li>
      <li onClick={()=> navigate("/*")} >Copyright Policy</li>
      <li onClick={()=> navigate("/*")} >Brand Policy</li>
      <li onClick={()=> navigate("/*")} >Guest Controls</li>
      <li onClick={()=> navigate("/*")} >Community Guidelines</li>
      <li onClick={()=> navigate("/*")} >Language</li>
     </ul>
    </div>
  )
}

export default FooterLogin