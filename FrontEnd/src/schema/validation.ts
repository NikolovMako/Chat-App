import * as yup from 'yup'

export const userValidation = yup.object(
).shape({
    username: yup.string().required('usr is required').min(8, 'usr must be atleast 8 chars').max(30, 'usr must be 30 chars at most'),
    password: yup.string().required('pwd is required').min(8, 'pwd must be atleast 8 chars').max(30, 'pwd must be 30 chars at most'),
})