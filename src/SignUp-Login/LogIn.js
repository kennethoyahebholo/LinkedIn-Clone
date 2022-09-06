import React, { useState } from 'react'
import './Login.css'
import blueLogo from '../assets/image/linkedin-logo-blue.png'
import googleLogo from '../assets/image/google-icon.png'
import FooterLogin from './FooterLogin'
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router';
import AppleIcon from '@mui/icons-material/Apple';
import FormInput from '../MComponents/Inputs/FormInput'
import Button from '../MComponents/Button/Button'
import SpecialButton from '../MComponents/Button/SpecialButton'

const Regex = RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

const LogIn = () => {
  const navigate = useNavigate();
  const [userInitialState ,setUserInitialState] = useState({email: '', password:'', errors:{
  email:'', password:''
   }})
 //understand the difference between useState and useRef, useCallback and useMemo, tailwind,  when and why to use any of them 
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting]= useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target 
    const errors = userInitialState.errors
    switch(name){
      case 'email':
      errors.email = Regex.test(value)? '': 'Email is not valid!'
      break;
      case 'password':
      errors.password = value.length <= 5 ?  'Password should be at least 6 characters!':'';
          break;
      
      default:
      break;
    }

    setUserInitialState(prv=> ({...prv, errors, [name]: value }))
}

const resetForm = (errorMsg = '')=> {
    userInitialState.email=''
    userInitialState.password=''
    setIsSubmitting(false)
    setErrorMsg(errorMsg)
    setIsSigningIn(false)
}


//DRY => DON'T REPEAT YOURSELF


// starting of function to handle submit
const handleSubmit = (e) => {
  e.preventDefault()
  
  //leave a comment here
  setIsSigningIn(true)
  
  //leave a comment here
  if( userInitialState.email.trim() === "" || userInitialState.password.trim() === "" || userInitialState.errors.email  || userInitialState.errors.password ){
      setIsSubmitting(false)
      setErrorMsg('Please fill all required fields')
      setIsSigningIn(false)
      setTimeout(()=>{
        setErrorMsg('')
      }, 1500)
   }
  else{
     signInWithEmailAndPassword(auth ,userInitialState.email, userInitialState.password)
     //getting the promise
      .then((userCredentials)=>{
        //to see the logged user console log userCredentials.user
        setSuccessMsg('successful, redirecting to your Dashboard.')
        setIsSigningIn(false)
        //reset form
        resetForm()
        //set timeout
        setTimeout(()=>{
        setSuccessMsg('')
        navigate("/dashboard")
        }, 2000)    
      }) 
     .catch((error) => {
        const message = error.message
        console.log(message)
        if(message.includes('auth/wrong-password'))
        {
            resetForm('Wrong Password')
        }
        else if(message.includes('auth/too-many-requests'))
        {
            resetForm('Too many attempts, try again later')
        }        
        else if(message.includes('auth/invalid-email'))
        {
            resetForm('Invalid Email')
        }
        else if (message.includes('auth/user-not-found'))
        {
            resetForm('User not registered, please Sign up first')
        }
        else if (message.includes('auth/missing-email') || message.include('auth/internal-error'))
        {
            resetForm("Fields can't be empty")
        }

        setTimeout(()=>{
        resetForm('')
        }, 2000);

      })
    }   
 }
// ending of function to handle submit




// starting of function to sign in with google
const signUpWithGoogle = () => {
    setErrorMsg("Action not active at this time, Please use the form");
    setTimeout(()=>{
      setErrorMsg("");
    }, 2000);
 }
// ending of function to sign in with google


  return (
   <>
     <div className='L2-img-con'>
         <img className='L2-img' src={blueLogo} alt="" />
     </div>    
     <div className='sl_con2'>     
        <form onSubmit={handleSubmit}>
          {/* Beginning of error and success message */}
            {errorMsg && 
                <>
                  <div className={errorMsg? 'errMessage' : 'hide'}>
                    <p>{errorMsg}</p>
                  </div>
                </>
            }
            {successMsg && 
                <>
                  <div className='sucMessage'>
                    <p>{successMsg}</p>
                  </div>
                </>
            }
            {/* End of error and success message */}


            {/* Beginning of header message */}
            <div className='login_header'>
                <h2>Sign in</h2> 
                <p>Stay updated on your professional world</p>
            </div>
            {/* End of header message */}


            {/* Beginning of form*/}
            <section>
              <FormInput
                  labelName="Email or phone"
                  labelClass="form-label fs-6 fw-bolder text-dark"
                  className={userInitialState.errors.email.length? 'form_control_input_error' : 'form_control_input'}
                  type="email"
                  name="email"
                  id="email"
                  value={userInitialState.email}
                  onChange={handleChange}
              />
              {userInitialState.errors.email.length > 0 && <span className="errorMessage">{userInitialState.errors.email}</span>}
            </section>  

            <section>
              <FormInput
                  labelName="Password (6 or more characters)"
                  labelClass="form-label fs-6 fw-bolder text-dark"
                  className={userInitialState.errors.password.length? 'form_control_input_error' : 'form_control_input'}
                  type="password"
                  name="password"
                  id="password"
                  value={userInitialState.password}
                  onChange={handleChange}
              />
              {userInitialState.errors.password.length > 0 && <span className="errorMessage">{userInitialState.errors.password}</span>}
            </section> 
            <div className='fp_con' onClick={()=> navigate("/*")}>
               <p> <span>Forgot password?</span></p>
            </div>

            <Button
                type="submit"
                id="kt_sign_in_submit"
                className="btn btn-lg btn-primary w-100 mb-5"
             >
                {!isSigningIn && <span className="indicator-label">Sign in</span>}
                {isSigningIn && (
                  <span className="indicator-progress" style={{ display: 'block' }}>
                    Signing In...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
            </Button>
          
            <div className='line_con2'>
                <div className='line2'></div>
                <p>or</p>
                <div className='line2'></div>
            </div>
            
            
            <SpecialButton click={signUpWithGoogle} className={"sl2_google_con"} image={googleLogo} info={"Sign in with Google"}/>

            <SpecialButton click={signUpWithGoogle} className={"sl2_google_con"} Icon={AppleIcon} info={"Sign in with Apple"}/>
                      
        </form>
        {/* End of form */}


        {/* Beginning of info */}
        <div className='jn_log'>
          <h1>New to LinkedIn?</h1>
          <Link className='sl_link' to='/'>Join now</Link>
        </div>
        {/* End of info */}

     </div>


     {/* Beginning of footer */}
     <FooterLogin/>
     {/* End of footer */}
    
    </>
  )
}

export default LogIn