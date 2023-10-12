import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
export default function Brands() {
  let[categories, setCategories] = useState([])
  let [isLoading, setIsLoading] = useState(false)

  async function getCategories(){
    setIsLoading(true)
    $(".loading").fadeIn(0) 
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setCategories(data.data)
    $(".loading").fadeOut(1000) 
    setIsLoading(false)
}


useEffect(()=>{
  getCategories()
},[])


  return (
  <div className='container'>
      <h2 className='text-main text-center mt-5 fs-1'>All Brands</h2>
    <div className="row g-3">
      {
        categories.map((category)=>{
          return <div className='col-md-3 brandCol'>
            <div className='imgBox'>
              <img src={category.image} className='w-100' alt="" />
            <p className=' text-center'>{category.name}</p>
            </div>
            </div>
        })
      }
      </div>
  </div>
  )
}
