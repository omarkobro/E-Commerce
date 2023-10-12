import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import   $  from 'jquery'
import { Link } from 'react-router-dom'

export default function Cart() {
  let [cartData, setCartData] = useState(null)
  let {getAllCart,deleteProduct,clearProducts,updateProductQuantity,setCartCount} = useContext(CartContext)


  useEffect( ()=>{
      getAll()
  },[])

  async function getAll(){
    $(".loading").fadeIn(0)
    let req = await getAllCart().catch((err)=>{
      if(err.response.data.statusMsg == "fail"){
        setCartData(null)
      }
    })


    if(req?.data.data.products.length > 0){
      setCartData(req?.data.data)
      setCartCount(req.data.numOfCartItems)
    }
    else{
      setCartData(null)
    }
    $(".loading").fadeOut(1000)
  }

  async function deleteItem(id){
    let {data} = await deleteProduct(id).catch((err)=>{
      console.log(err);
    })
    if(data.status == "success"){
      if(data.data.products.length > 0){
        toast.error("Item Has Been Removed From Cart")
        setCartData(data.data)
      }
      else{
        setCartData(null)
      }
    }
  }


  async function clearCart(){
    let {data} = await clearProducts().catch((err)=>{console.log(err);})
    if(data.message == "success"){ 
      setCartData(null)
      toast("wow.. Such Empty!")
    }
  }

  async function updateCount(id, count){
    if(count > 0){
      let {data} = await updateProductQuantity(id,count).catch((err)=>{
        console.log(err);
      })
      setCartData(data.data)
    }
    else{
      deleteItem(id)
    }

  }
  return (
    <div className='container cart'>
          <div className="loading position-fixed  top-0 end-0 start-0 bottom-0 bg-info">
    <i className=' fa-solid fa-spinner fa-spin fa-5x text-white'></i>
    </div>
      <Toaster></Toaster>
      {
        cartData? <div className=' d-flex flex-column  bg-light p-5'>
          {
            cartData.products.map((item,index)=>{
              return <div key={index} className="row border-bottom justify-content-between align-items-center py-3">
              <div className=' col-md-8'>
                <div className="row justify-content-center align-items-center">
                  <div className='col-md-2'>
                    <img className=' w-100' src={item.product.imageCover} alt="" />
                  </div>
                  <div className='col-md-8'>
                    <h6>{item.product.title}</h6>
                    <p>{item.price}</p>
                    <button onClick={()=>{deleteItem(item.product._id)}} className=' btn btn-outline-danger p-1 btn-sm'>Remove
                    <i className="fa-regular fa-trash-can mx-2"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className=' col-md-2'>
                <span onClick={()=>{updateCount(item.product._id, item.count-1)}} className='btn btn-danger btn-sm'>-</span>
                <span className='mx-2'>{item.count}</span>
                <span onClick={()=>{updateCount(item.product._id, item.count+1)}} className='btn bg-main text-white btn-sm'>+</span>
                </div>
            </div>
            })
          }
          <h3 className='text-main mt-5 text-main'>Total Price : {cartData.totalCartPrice} EGP</h3>
          <Link to={`/checkout/${cartData._id }`} className=' btn text-white bg-main d-block me-auto mt-5'>Check Out</Link>
          <button onClick={clearCart} className=' btn btn-danger btn-sm d-block ms-auto' >
            Clear Cart
          </button>
        </div>
        : <div className=' alert alert-danger'>Cart Is Empty</div>
      }
    </div>
  )
}
