import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { UserContext } from '../Context/UserContext';

export default function Login() { 
  let {setUserToken} = useContext(UserContext)
  let navigate = useNavigate()
  let [error, setError] = useState(null)
  let [isLoading, setLoading] = useState(false)
  async function sendLogin(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((err)=>{
      setLoading(false)
    setError(err.response.data.message)
    console.log(data);
    })
    if(data.message === "success"){
      localStorage.setItem("userToken", data.token)
      setUserToken(data.token)
      navigate("/") 
      setLoading(false)
      console.log(data.token);
    }
  }
  let passwordregex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  let validationSchema = Yup.object({
    email : Yup.string().email("Please Enter A Valid Email").required("Email Is Required"),
    password : Yup.string().matches(passwordregex,`Has minimum 8 characters in length,
    At least one uppercase,
    At least one lowercase,
    At least one digit,
    At least one special character
    `).required("Password Is Required"),
  })
  let registerForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },validationSchema,
    onSubmit:sendLogin
    
  })


  return (
    <div className=' container my-5'>
      {error !== null ? <div className=' alert alert-danger '>{error } </div>: ""}
      <h3> Login Now</h3>

      <form onSubmit={registerForm.handleSubmit} action="" className=''>

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

          <Link to={`/forgetpassword`} >Forget Password ?</Link>
        {
          isLoading?<button type='button' className=' btn btn-success d-block ms-auto mt-4'> <i className=' fas fa-spinner fa-spin'></i></button> : <button disabled={!(registerForm.isValid && registerForm.dirty)} type='submit' className=' btn btn-success d-block ms-auto mt-4'>Login</button>
        }
      </form>
    </div>
  )
}
