import Footer from '../SignUp-Login/Footer'
import blueLogo from '../assets/image/linkedin-logo-blue.png'
import "./Fof.css"
import { useNavigate } from 'react-router-dom'

const Fof = (props) => {
  const navigate = useNavigate()
  return (
    <>
    <img className='L-img' src={blueLogo} alt="" /> 
    <div className="Fof">
      <h1>404 Not Found</h1>
      <button onClick={()=> navigate("/")}>Back to Signup page</button>

    </div>
    <Footer/>
    </>
  )
}

export default Fof