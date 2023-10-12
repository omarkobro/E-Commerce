import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function RestPassword() {
    let nav = useNavigate()
    let passwordregex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    
    let validationSchema = Yup.object({
        email: Yup.string().required("Email is Required").email("Enter Vaild Email"),
        newPassword : Yup.string().matches(passwordregex,`Has minimum 8 characters in length,
        At least one uppercase,
        At least one lowercase,
        At least one digit,
        At least one special character
        `).required("Password Is Required")
    })
    let resetPasswordForm = useFormik({
        initialValues:{
            email: "",
            newPassword: ""
        },
        validationSchema,
        onSubmit: resetPassword
    })

    async function resetPassword(val){
        let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, val)
        console.log(data);
        if(data.token){
            nav('/login')
            console.log("hello");
        }
    }

return (
    <div  className=' my-5 container'>
        <form action="" onSubmit={resetPasswordForm.handleSubmit} >
            <label htmlFor="email">Email</label> 
            <input onChange={resetPasswordForm.handleChange} onBlur={resetPasswordForm.handleBlur} className=' form-control' type="email" id='email' name='email' />
            <p className=' text-danger'>{resetPasswordForm.errors.email}</p>
            <label htmlFor="newPassword">New password</label> 
            <input onChange={resetPasswordForm.handleChange} onBlur={resetPasswordForm.handleBlur}  className=' form-control' type="newPassword" id='newPassword' name='newPassword'  />
            <p className=' text-danger'>{resetPasswordForm.errors.newPassword}</p>
            <button disabled={!(resetPasswordForm.dirty && resetPasswordForm.isValid)} className=' btn btn-success my-5'>Reset Password</button>
        </form>
    </div>
)
}


