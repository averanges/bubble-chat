import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useHandleForm from '../hooks/useHandleForm'
import { loginUser } from '../../../services/authService'
import { loginValidationSchema } from '../consts/validationForForm'
import { isLoadingOn } from '../../../slices/authSlice'
import ClipLoader from "react-spinners/ClipLoader";


const LoginForm = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(isLoadingOn)
    const {onBlurOn, placeholders, handleBlur, handleFocus} = useHandleForm()
    return (
      <div>
          <Formik 
          initialValues={{name: '', email: '', psw: '', confirmPsw: ''}}
          validationSchema={loginValidationSchema} 
          validateOnBlur
          onSubmit={values => {
            dispatch(loginUser(values))
          }}
          >
              {({errors}) => (                
              <Form className='flex flex-col gap-5'>
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
                  <div className='flex gap-4 xl:gap-8'>
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" name="" id="keep" />
                            <label htmlFor="keep">Keep me as signed in</label>
                        </div>
                    </div>
                    <button type="submit" className='mt-1 w-28 h-10 bg-rose-300 text-white rounded-lg shadow-lg hover:bg-white hover:text-black duration-500'>
                      {isLoading ? <ClipLoader size={30} color='white'/> : 'Login'}
                    </button>
              </Form>
              )}
          </Formik>
      </div>
    )
}

export default LoginForm