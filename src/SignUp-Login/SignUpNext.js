import React, { useState, useEffect } from 'react'
import './SignUpNext'
import SignUpNext2 from './SignUpNext2';
import FormInput from '../MComponents/Inputs/FormInput'
import Button from '../MComponents/Button/Button'

const SignUpNext = ({firstName, isRegistering, lastName, successMsg, errorMsg , setErrorMessage,setSuccessMessage, handleProfilePic, isSubmitting3, handleSubmit, handleChange,profilePic, phoneNumber, isSubmitting2, errors}) => {

  useEffect(() => {
      setErrorMessage('')
      setSuccessMessage('')
  },[])
  

  return (
   <>
   {!isSubmitting2?
   <>
     <div className='sl_con_ex'>      
        <form 
        onSubmit={handleSubmit}
        >
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
                    labelName="First Name"
                    labelClass="form-label fs-6 fw-bolder text-dark"
                    className={errors.firstName.length? 'form_control_input_error' : 'form_control_input'}
                    type="firstName"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={handleChange}
                    />
                    {errors.firstName.length > 0 && <span className="errorMessage">{errors.firstName}</span>}  
          </section>
          
          <section className='form_control'>
              <FormInput
                    labelName="Last Name"
                    labelClass="form-label fs-6 fw-bolder text-dark"
                    className={errors.lastName.length? 'form_control_input_error' : 'form_control_input'}
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={handleChange}
                    />
                    {errors.lastName.length > 0 && <span className="errorMessage">{errors.lastName}</span>} 
          </section>

          <Button
                type="submit"
                id="kt_sign_in_submit"
                className=""
                >
                  <span className="indicator-label">Continue</span>
          </Button>
          
        </form>
     </div>
   </>
   :
   <>
        <SignUpNext2 isRegistering={isRegistering} successMsg={successMsg} errorMsg={errorMsg} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}  isSubmitting3={isSubmitting3} handleSubmit={handleSubmit} handleProfilePic={handleProfilePic} errors= {errors} phoneNumber={phoneNumber} profilePic={profilePic} handleChange={handleChange}/>
   </>
  }     
    </>
  )
}

export default SignUpNext