import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import $ from 'jquery'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import { useQuery } from 'react-query'
import { CartContext } from '../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import { WishListContext } from '../Context/WishListContext'


export default function Products() {
  let {addProductToWishList} = useContext(WishListContext)
  let {addProductToCart,setCartCount} = useContext(CartContext)
  let[products, setProducts] = useState([])
  let[products2, setProducts2] = useState([])

  let [isLoading, setIsLoading] = useState(false)
  async function getFeaturedProducts(page){
      setIsLoading(true)
      $(".loading").fadeIn(0) 

      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      setProducts(data.data)
      setProducts2(data.data)
      $(".loading").fadeOut(1000) 
      setIsLoading(false)
  }

  useEffect(()=>{
    getFeaturedProducts()
    $(".pageItem").on("click", function(e){
      let pg = $(e.target).html() 
      console.log(pg);
      getFeaturedProducts(pg)
    }
    )
    
  },[])

  function search(event){
    let searchValue = event.target.value
    let ProductsCopy = [...products2]
    ProductsCopy = products2.filter((el)=>{
      return el.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    console.log(ProductsCopy);
    setProducts(ProductsCopy)
  }
  async function addCart(id){
    let {data} = await addProductToCart(id).catch((err)=>{
      console.log(err);
    })
    console.log(data);
    if(data.status == "success"){
      setCartCount(data.numOfCartItems)
      toast.success(data.message)
    }
  }

  async function addToMyWishList(id , e){
    let {data} = await addProductToWishList(id).catch((err)=>{
      console.log(err);
    })
    e.target.classList.add("text-danger")
    console.log(data);
    toast.success(data.message)
  }
  return (
    <>
    <Toaster />
    <div className="loading position-fixed  top-0 end-0 start-0 bottom-0 bg-info">
    <i className=' fa-solid fa-spinner fa-spin fa-5x text-white'></i>
    </div>
    <div className="container py-2">
      <input onChange={(e)=>{search(e)}}  className="form-control my-5" type="text" placeholder='Search For Products' />
        <div className="row g-4">
            {products.map((product)=>{
            return <div key={product.id} className="col-md-3">
                  <div className="product p-3">
                <Link style={{textDecoration: "none", }} to={"/ProductDetails/" + product._id} >
                    <img className='w-100 my-2' src={product.imageCover} alt="" />
                    <span className=' font-sm fw-bolder text-main'>{product.category.name}</span>
                    <h3 style={{color: "black", }} className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                    <div style={{textDecoration: "none", color: "black", }} className=' d-flex justify-content-between'>
                        <span>{product.price} EGP</span>
                        <span><i className=' fas fa-star text-rating'></i> {product.ratingsAverage}</span>
                    </div>
                </Link>
                  <div class="row justify-content-between align-items-center">
                    <div className='col-md-9 py-0'>
                    <button  onClick={() => {addCart(product._id)}} className='btn bg-main text-white p-1 my-2 w-100'>add to cart </button>
                    </div>
                    <div className='col-md-3 py-0'>
                    <i id='wishList' onClick={(e) => {addToMyWishList(product._id,e)}} class="fa-solid fa-1x fa-heart text-end cursor-pointer"></i>
                    </div>
                  </div>
                </div>
            </div>  
  })}
        </div>
    </div>
    <>
    
    <nav className='mt-5 d-flex justify-content-center align-items-center align-content-center' aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link pageItem">1</a></li>
    <li className="page-item"><a className="page-link pageItem" >2</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
  
    
    </>
    </>
    
  )
}
