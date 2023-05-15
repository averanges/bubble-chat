import * as Yup from 'yup'

export const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
    .min(4,'Name must be at least 4 characters')
    .required('Name is required'),
    email: Yup.string()
    .email('Valid email required')
    .required('Email is required'),
    psw: Yup.string()
    .required('Password is required'),
    confirmPsw: Yup.string()
    .oneOf([Yup.ref('psw')], 'Passwords must match')
})
export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Valid email required')
    .required('Email is required'),
    psw: Yup.string()
    .required('Password is required')
})