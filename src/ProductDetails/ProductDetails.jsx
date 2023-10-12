import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { CartContext } from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {
    let {addProductToCart} = useContext(CartContext)

    let {id} = useParams()
    let [product , setProduct]= useState(null)
    useEffect(()=>{
        getProductDetails()
    },[])
    async function getProductDetails(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        console.log(data);
        setProduct(data.data)
    }

    async function addCart(id){
        let {data} = await addProductToCart(id).catch((err)=>{
          console.log(err);
        })
        console.log(data);
        if(data.status == "success"){
          toast.success(data.message)
        }
      }
return (

    <>
    <Toaster></Toaster>
        {product != null? <div className="container my-5">
        <div className='row align-items-center'>
        <div className="col-md-3">
        <OwlCarousel className='owl-theme' items={1} autoPlay={true}   loop margin={10} dots={true} >
            {
                product.images.map((el)=>{
                    return  <div class='item'>
                    <img src={el} className='w-100' alt="" />
                    </div>
                })
            }

    </OwlCarousel>
        </div>
        <div className="col-md-9">
            <h2>{product.title}</h2>
            <p className=' text-muted'>{product.description }</p>

                    <h3 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                    <div className=' d-flex justify-content-between'>
                        <span>{product.price} EGP</span>
                        <span><i className=' fas fa-star text-warning'></i> {product.ratingsAverage}</span>
                    </div>
                    <button onClick={()=>{
                        addCart(product._id)
                    }} className='btn bg-success text-white mt-5 p-1 w-100'>add to cart </button>
                            </div>
    </div>
        </div>: ""}
    </>
)
}
