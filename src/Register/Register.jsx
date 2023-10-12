import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"

export default function Register() {
  let navigate = useNavigate()
  let [error, setError] = useState(null)
  let [isLoading, setLoading] = useState(false)
  async function sendRegister(values){
    setLoading(true)
    console.log(values);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>{
      setLoading(false)
    setError(err.response.data.message)
    })
    if(data.message === "success"){
      navigate("/login") 
      setLoading(false)
    }
  }
  // let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  let passwordregex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  let validationSchema = Yup.object({
    name:Yup.string().min(2, "Name Must be At Least 2 Charachters").max(10, "Name Can't Be More Than 10 Charachters").required("Name Is Required"),
    email : Yup.string().email("Please Enter A Valid Email").required("Email Is Required"),
    phone : Yup.string().required("Phone Is Required"),
    password : Yup.string().matches(passwordregex,`Has minimum 8 characters in length,
    At least one uppercase,
    At least one lowercase,
    At least one digit,
    At least one special character
    `).required("Password Is Required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")],"Repassword and password don't match").required("Repassword Is Required")
  })
  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },validationSchema,
    onSubmit:sendRegister
    
  })


  return (
    <div className=' container my-5'>
      {error !== null ? <div className=' alert alert-danger '>{error } </div>: ""}
      
      <h3> Register Now</h3>

      <form onSubmit={registerForm.handleSubmit} action="" className=''>
        <div className=' my-2'>
          <label htmlFor="name">Name:</label>
          <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className=' form-control' type="text" name='name' id='name' />
          {
            registerForm.errors.name && registerForm.touched.name?<p className=' text-danger'>{registerForm.errors.name}</p>: ""
          }
        </div>
        <div className=' my-2'>
          <label htmlFor="email">Email:</label>
          <input  onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className=' form-control' type="email" name='email' id='email' />
          {
            registerForm.errors.email && registerForm.touched.email?<p className=' text-danger'>{registerForm.errors.email}</p>: ""
          }

        </div>
        <div className=' my-2'>
          <label htmlFor="password">Password:</label>
          <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className=' form-control' type="password" name='password' id='password' />
          {
            registerForm.errors.password && registerForm.touched.password?<p className=' text-danger'>{registerForm.errors.password}</p>: ""
          }
          </div>
        <div className=' my-2'>
          <label htmlFor="rePassword">Repassword:</label>
          <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className=' form-control' type="password" name='rePassword' id='rePassword' />
          {
            registerForm.errors.rePassword && registerForm.touched.rePassword?<p className=' text-danger'>{registerForm.errors.rePassword}</p>: ""
          }

        </div>
        <div className=' my-2'>
          <label htmlFor="phone">Phone</label>
          <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className=' form-control' type="tel" name='phone' id='phone' />
          {
            registerForm.errors.phone && registerForm.touched.phone?<p className=' text-danger'>{registerForm.errors.phone }</p>: ""
          }
        </div>
        {
          isLoading?<button type='button' className=' btn btn-success d-block ms-auto mt-4'> <i className=' fas fa-spinner fa-spin'></i></button> : <button disabled={!(registerForm.isValid && registerForm.dirty)} type='submit' className=' btn btn-success d-block ms-auto mt-4'>Register</button>
        }
      </form>
    </div>
  )
}
