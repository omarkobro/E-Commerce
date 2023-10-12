import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../Context/WishListContext'
import { CartContext } from '../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'


export default function WishList() {
    let [wishListData, setwishListData] = useState([])
    let {getWishList,deleteItemFromWishList} = useContext(WishListContext)
    let {addProductToCart,setCartCount} = useContext(CartContext)


    useEffect(()=>{
        myWishList()
    },[])

    async function myWishList(){
        let {data} = await getWishList().catch((err)=>{
            console.log(err);
        })
        console.log(data.data);
        setwishListData(data.data)
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

    async function removeProduct(id){
        let {data} = await deleteItemFromWishList(id).catch((err)=>{
            console.log(err);
        })
        if(data.status == "success"){
            if(data.data.length > 0){
            toast.error("Item Has Been Removed From Cart")
            myWishList()
            }
            else{
                setwishListData([])
            }
        }
    }
return (
    <div className=' container wishlist'>
        <Toaster></Toaster>
        <h2>Wish List</h2>
        {wishListData.length > 0 ?
            wishListData.map((el)=>{
                return <div class="row justify-content-between align-items-center bg-body-tertiary border-bottom py-3">
                <div className='col-md-2'>
                    <img src={el.imageCover} className='w-100' alt="" />
                </div>
                <div className=' col-md-10'>
                    <div class="row justify-content-between align-items-center">
                        <div className='col-md-3'>
                            <h4>{el.slug}</h4>
                            <p className='my-3'>{el.price}</p>
                            <span onClick={()=>{removeProduct(el._id)}} className='btn btn-outline-danger d-block'>Remove Item
                            <i className="fa-regular fa-trash-can mx-2"></i>
                            </span>
                        </div>
                        <div className='col-md-3'>
                            <button onClick={() => {addCart(el._id)}} className='btn bg-main text-white'>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        }) : <div className=' alert alert-danger'>Wish List Is Empty</div>}
    </div>
)
}
