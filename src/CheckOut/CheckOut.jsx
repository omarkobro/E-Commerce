import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../Context/CartContext';

export default function CheckOut() {
  let {checkOutPayment} = useContext(CartContext)
    let {id} = useParams()
    let shippingForm = useFormik({
      initialValues:{
        details: "",
        city: "",
        phone: ""
      },
      onSubmit: sendPayment
    })

  async function sendPayment(val){
      let {data} = await checkOutPayment(id, val)
      console.log(data.session.url);
      window.location.href = data.session.url
      console.log(val);
    }
  return (
    <div className='container'>
      <form onSubmit={shippingForm.handleSubmit} action="">
        <label htmlFor="details">Details</label>
        <input onChange={shippingForm.handleChange} className=' form-control' type="text" name='details' id='details'/>
        <label htmlFor="city">City</label>
        <input  onChange={shippingForm.handleChange} className=' form-control' type="text" name='city' id='city'/>
        <label htmlFor="phone">Phone</label>
        <input  onChange={shippingForm.handleChange} className=' form-control' type="tel" name='phone' id='phone'/>
        <button type='submit' className='btn btn-outline-success w-100 my-3'>Proceed To Pay <i className="fa-brands fa-cc-visa"></i></button>
      </form>
    </div>
  )
}
