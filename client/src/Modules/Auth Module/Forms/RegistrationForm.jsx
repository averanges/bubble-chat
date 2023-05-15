import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../services/authService'
import useHandleForm from '../hooks/useHandleForm'
import { registerValidationSchema } from '../consts/validationForForm'
import { isLoadingOn } from '../../../slices/authSlice'
import ClipLoader from 'react-spinners/ClipLoader'

const RegistrationForm = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(isLoadingOn)
  const {onBlurOn, placeholders, handleBlur, handleFocus} = useHandleForm()
  return (
    <div>
        <Formik 
        initialValues={{name: '', email: '', psw: '', confirmPsw: ''}}
        validationSchema={registerValidationSchema} 
        validateOnBlur
        onSubmit={values => {
          if(values.confirmPsw === ''){
            return
          }
          dispatch(registerUser(values))
        }}
        >
            {({errors}) => (                
            <Form className='flex flex-col gap-5'>
                <Field 
                  type='text' 
                  name='name'
                  placeholder={placeholders.name} 
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  className='border-b-2 pb-3 focus:outline-none focus:border-rose-300'  
                />
                {onBlurOn.name && errors.name ? (<p className='text-red-500'>{errors.name}</p>) : null}
                <Field 
                  type='text' 
                  name='email'
                  placeholder={placeholders.email}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  className='border-b-2 pb-3 focus:outline-none focus:border-rose-300'  
                />
                {onBlurOn.email && errors.email && <p className='text-red-500'>{errors.email}</p>}
                <Field 
                  type='password' 
                  name='psw'
                  placeholder={placeholders.psw}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  className='border-b-2 pb-3 focus:outline-none focus:border-rose-300'  
                />
                {onBlurOn.psw && errors.psw && <p className='text-red-500'>{errors.psw}</p>}
                <Field 
                  type='password' 
                  name='confirmPsw'
                  placeholder={placeholders.confirmPsw}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  className='border-b-2 pb-3 focus:outline-none focus:border-rose-300'  
                />
                {onBlurOn.confirmPsw && errors.confirmPsw && <p className='text-red-500'>{errors.confirmPsw}</p>}
                <button type="submit" className='mt-1 w-28 h-10 bg-rose-300 text-white rounded-lg shadow-lg hover:bg-white hover:text-black duration-500'>
                {isLoading ? <ClipLoader size={30} color='white'/> : 'Sign Up'}
                </button>
            </Form>
            )}

        </Formik>
    </div>
  )
}

export default RegistrationForm