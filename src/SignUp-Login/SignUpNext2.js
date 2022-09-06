import React, { useEffect } from 'react'
import './SignUpNext'
import FormInput from '../MComponents/Inputs/FormInput'
import Button from '../MComponents/Button/Button'


const SignUpNext2 = ({phoneNumber, profilePic, isRegistering, successMsg, errorMsg , setErrorMessage,setSuccessMessage, handleProfilePic, handleSubmit, isSubmitting3, handleChange, errors}) => {

    useEffect(() => {
      setErrorMessage('')
      setSuccessMessage('')
  },[])

  return (
    <>
     {!isSubmitting3 && 
        <>
            <div className='sl_con_ex'>      
                <form onSubmit={handleSubmit}>
                    {errorMsg && 
                    <>
                    <div className='errMessage'>
                      <p>{errorMsg}</p>
                    </div>
                    </>}
                    {successMsg &&
                    <>
                    <div className='sucMessage'>
                      <p>{successMsg}</p>
                    </div>
                    </>
                    }
                    <section className='form_control'>
                        <FormInput
                        labelName="Phone number"
                        labelClass="form-label fs-6 fw-bolder text-dark"
                        className={errors.phoneNumber.length? 'form_control_input_error' : 'form_control_input'}
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChange}
                        />
                        {errors.phoneNumber.length > 0 && <span className="errorMessage">{errors.phoneNumber}</span>} 
                    </section>
                    
                    <section className='form_control'>
                        <FormInput
                        labelName="Profile picture"
                        labelClass="form-label fs-6 fw-bolder text-dark"
                        className={'form_control_input'}
                        type="file"
                        accept="image/png , image/jpg, image/gif, image/jpeg"
                        name="profilePic"
                        id="profilePic"
                        onChange={handleProfilePic}
                        />
                    </section>

                    <Button
                        type="submit"
                        id="kt_sign_in_submit"
                        className=""
                    >
                        {!isRegistering && <span className="indicator-label">Continue</span>}
                        {isRegistering && (
                          <span className="indicator-progress" style={{ display: 'block' }}>
                            Registering...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        )}
                    </Button>
                  
                  
                </form>
            </div>
        
        </> 
    }
    </>
   
  )
}

export default SignUpNext2