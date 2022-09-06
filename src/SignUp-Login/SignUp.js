import React, { useState } from 'react'
import './SignUp.css'
import blueLogo from '../assets/image/linkedin-logo-blue.png'
import googleLogo from '../assets/image/google-icon.png'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { auth, db, storage } from '../firebase-config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import SignUpNext from './SignUpNext'
import FormInput from '../MComponents/Inputs/FormInput'
import SpecialButton from '../MComponents/Button/SpecialButton'
import Button from '../MComponents/Button/Button'


const Regex = RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

const SignUp = () => {
 const [userInitialState ,setUserInitialState] = useState({email: '', password:'',  phoneNumber:'', firstName:'', lastName:'', errors:{
  email:'', password:'', firstName:'', lastName:'', phoneNumber:''
 }})

const [profilePic, setProfilePic] = useState();
const [userLikes, setUserLikes] = useState(0)

  const [isSubmitting, setIsSubmitting]= useState(false)
  const [isSubmitting2, setIsSubmitting2]= useState(false)
  const [isSubmitting3, setIsSubmitting3]= useState(false)
  const [visible, setVisibility] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false)
    const [successMsg2, setSuccessMsg2] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');

  const navigate = useNavigate()


 const handleProfilePic = (e) =>{
  let selectedFile = e.target.files[0];

  if(selectedFile){
   setProfilePic(selectedFile)
  }else{
   setErrorMsg("Please select your profile picture")
  }
  
 }



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
  case 'firstName':
   errors.firstName = value.length <=0 ?  'First Name is required!':'';
   break;
  case 'lastName':
   errors.lastName = value.length <=0 ?  'Last Name is required!':'';
   break;
  case 'phoneNumber':
   errors.phoneNumber = value.length <=0 ?  'Phone number is required!':'';
   break;
  default:
   break;
 }
 setUserInitialState(Object.assign({...userInitialState,errors, [name]:value}))  
}


const resetForm = () => {
    userInitialState.phoneNumber=''
    userInitialState.firstName=''
    userInitialState.lastName=''
    userInitialState.email=''
    userInitialState.password=''
    setProfilePic()
    setIsRegistering(false)
    setIsSubmitting(false)
}


const handleSubmit = (e) => {
 e.preventDefault()
  


    if(userInitialState.email.trim() === '' || userInitialState.password.trim() === ''){
        setErrorMsg("Please fill all fields")
        setTimeout(() => {
          setErrorMsg("")
        }, 1500);     
      }
    else if(userInitialState.errors.email.length || userInitialState.errors.password.length){
        console.log('error found')
        setErrorMsg("Please fill required field")
        setTimeout(() => {
          setErrorMsg("")
        }, 1500);
    }
    else{
      //navigate to the next page      
        setIsSubmitting(true)  
    }


   if(userInitialState.firstName.trim() === '' || userInitialState.lastName.trim() === ''){
        setErrorMsg2("Please fill all fields")
        setTimeout(() => {
          setErrorMsg2("")
        }, 1500);
   }else if(userInitialState.errors.firstName.length || userInitialState.errors.lastName.length){
        setErrorMsg2("Please fill required field")
        setTimeout(() => {
          setErrorMsg2("")
        })
   }
   else{  
       //navigate to the next page 
       setIsSubmitting2(true)    
   }

  if(userInitialState.phoneNumber.trim() === ''){
      setErrorMsg("Please fill all fields")
      setTimeout(() => {
        setErrorMsg("")
      }, 1500);
   }else if(!profilePic){
      setErrorMsg("Please input a profile picture")
      setTimeout(() => {
        setErrorMsg("")
      }, 1500);
   }
    else if(userInitialState.errors.phoneNumber.length){
      setErrorMsg("Please fill required field")
      setTimeout(() => {
      setErrorMsg("")
     })
   }

   if(userInitialState.email && userInitialState.password && userInitialState.firstName && userInitialState.lastName && userInitialState.phoneNumber && profilePic  
    )
    {
       setIsRegistering(true)
       createUserWithEmailAndPassword(auth, userInitialState.email, userInitialState.password)
          .then((userCredentials)=>{
            const user = userCredentials.user;
            console.log(user);
            const storageRef = ref(storage, `profile-images/${Date.now()}`);
            uploadBytes(storageRef, profilePic)
              .then(()=>{
                getDownloadURL(storageRef)
                  .then(url=>{
                  addDoc(collection(db, "users"), {
                    email: userInitialState.email, password: userInitialState.password, firstName: userInitialState.firstName, lastName: userInitialState.lastName, phoneNumber: userInitialState.phoneNumber, profilePic: url, uid: user.uid
                  })
                      .then(()=>{
                        setErrorMsg('')        
                        setSuccessMsg('New user added successfully,redirecting to login page.')
                    
                        //set inputs back to string
                        resetForm()

                        setTimeout(()=>{
                        setSuccessMsg('')
                        navigate("/login")     
                        }, 2000)    
                      })
                      .catch((error)=>{
                          setIsSubmitting(false)
                          setTimeout(()=>{
                            setErrorMsg('')
                            // navigate("/login")
                            }, 1500) 
                      })
                  })
               })
              .catch((error)=>{
              })
          })
       .catch((error)=>{
         const message = error.message
          if (message.includes("auth/invalid-email") || message.include("auth/ admin-restricted-operation"))
          {
              setSuccessMsg('')
              setErrorMsg('Please fill all required fields')
              setIsRegistering(false)
          }
          else if (message.includes("auth/email-already-in-use"))
          {
              setSuccessMsg('')
              setErrorMsg('User already exists')
              setIsRegistering(false)
          }else{
            return message
          }
          setTimeout(()=>{
          setErrorMsg('');
          }, 2000);
        })
   }
 }

  const signUpWithGoogle = () => {
      setErrorMsg("This action is not active at this time, Please use the form");
      setTimeout(()=>{
        setErrorMsg("");
      }, 2000);
  }
  return (
   <>
      <div className='sign_up'>
        <img className='L-img' src={blueLogo} alt="" /> 
        <div className='sl_con'>      
            <h2>Make the most of your professional life</h2> 
            {!isSubmitting? 
            <>
            <form onSubmit={handleSubmit}>
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
                <section className='form_control'>
                    <FormInput
                    labelName="Email or phone number"
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

                <section className='form_control'>
                  <p onClick={() => setVisibility( visibility => !visibility)}>Show</p>
                    <FormInput
                  labelName="Password (6 or more characters)"
                  labelClass="form-label fs-6 fw-bolder text-dark"
                  className={userInitialState.errors.password.length? 'form_control_input_error' : 'form_control_input'}
                  type={!visible? "text" : "password"}
                  name="password"
                  id="password"
                  value={userInitialState.password}
                  onChange={handleChange}
                   />
                  {userInitialState.errors.password.length > 0 && <span className="errorMessage">{userInitialState.errors.password}</span>}
                </section>

                <p>By clicking Agree & Join you agree to the LinkedIn <span>User Agreement Privacy Policy</span> and <span>Cookie Policy</span></p>

                <Button
                type="submit"
                id="kt_sign_in_submit"
                className=""
                >
                  <span className="indicator-label">Agree & Join</span>
                </Button>

                <div className='line_con'>
                    <div className='line'></div>
                    <p>or</p>
                    <div className='line'></div>
                </div>

                <SpecialButton click={signUpWithGoogle} className={"sl_google_con"} image={googleLogo} info={"Continue with Google"}/>

                <h2>Already on LinkedIn? <Link className='sl_link' to='/login'><span>Sign in</span></Link></h2>
              
            </form>

            
            <h4>Looking to create a page for a business? <span onClick={()=> navigate("/*")} >Get Help</span></h4>
            </>
            :
            <>
            <SignUpNext isRegistering={isRegistering} successMsg={successMsg} errorMsg={errorMsg} setErrorMessage={setErrorMsg} setSuccessMessage={setSuccessMsg} handleProfilePic={handleProfilePic} handleSubmit={handleSubmit} errors= {userInitialState.errors} firstName={userInitialState.firstName} lastName={userInitialState.lastName} isSubmitting2={isSubmitting2} phoneNumber={userInitialState.phoneNumber} profilePic={profilePic} handleChange={handleChange}/>
            </>
            }
      </div>
      
       <Footer/>
   </div>
    
    </>
  )
}

export default SignUp