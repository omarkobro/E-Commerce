import React, { useState } from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
    let [erros, seterrors] = useState("")
    let navigate =  useNavigate()
    let validationSchema = Yup.object({
        email: Yup.string().email("Please Enter A Valid Email").required("Email Is Required"),
    })
    let forgetForm = useFormik({
        initialValues:{
            email : ""
        },
        validationSchema, 
        onSubmit:forgetPassword
    })

    async function forgetPassword(val){
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, val).catch((err)=>{
            console.log(err);
        })
        if(data.statusMsg === "success"){
            document.getElementById("resetForm").classList.remove("d-none")

            document.getElementById("forgetForm").classList.add("d-none")
        }
        console.log(data);
    }











    let validationSchema2 = Yup.object({
        resetCode : Yup.string().required("Rest Code Is Required").matches(/^[0-9]+$/, "Must Be Only Numbers")
    })

    let resetForm = useFormik({
        initialValues: {
            resetCode: ""
        },
        validationSchema:validationSchema2,
        onSubmit: sendResetCode
    })

    async function sendResetCode(val){
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val).catch((err)=>{
            console.log(err.response.data.message);
            seterrors(err.response.data.message)
            
        })

        if(data.status == "Success"){
            navigate("/resetpassword")
        }
        console.log(data);
    }
    return (
        <>
        <div id='forgetForm' className=' container my-5'>
        <form className='' onSubmit={forgetForm.handleSubmit} >
        <label htmlFor="email">Email</label>
        <input className=' form-control' onBlur={forgetForm.handleBlur} onChange={forgetForm.handleChange} name='email' id='email' type="email" placeholder='Enter Your Email' />
        {
            forgetForm.touched.email ? <p className=' text-danger'>{
                forgetForm.errors.email
            } </p>: ""
        }
        <button disabled={!(forgetForm.isValid && forgetForm.dirty)}  className='btn btn-success my-3'>Send Verification Code</button>
    </form>

    </div>







        <div id='resetForm' className='d-none container my-5'>
        {erros ? <div className='alert alert-danger'>{erros}</div> : ""}
        <form className='' onSubmit={resetForm.handleSubmit} >
        <label htmlFor="resetCode">Reset Password</label>
        <input className=' form-control' onBlur={resetForm.handleBlur} onChange={resetForm.handleChange} name='resetCode' id='resetCode' type="text" placeholder='Enter Verfication Code' />
        {
            resetForm.touched.resetCode ? <p className=' text-danger'>{
                resetForm.errors.resetCode
            } </p>: ""
        }
        <button disabled={!(resetForm.isValid && resetForm.dirty)}  className='btn btn-success my-3'>Verify Code</button>
    </form>

    </div>
        </>
)
}

