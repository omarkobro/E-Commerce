import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()
export default function CartContextProvider(props){
    let baseUrl = `https://ecommerce.routemisr.com`
    let [cartCount, setCartCount] = useState(0)
    let header = {
        token: localStorage.getItem("userToken") 
    }

    useEffect(()=>{
        if(localStorage.getItem("userToken")){
            getAllCart().then((req)=>{
                setCartCount(req?.data.numOfCartItems)
            }).catch(()=>{
                setCartCount(0)
            })
        }
    },[])

    function addProductToCart(id){
        let body = {
            productId :id
        }
        return axios.post(`${baseUrl}/api/v1/cart`,body,{
            headers: header
        })
    }
    function updateProductQuantity(id, count){
        let body = {
            count: count
        }
        return axios.put(`${baseUrl}/api/v1/cart/${id}`,body,{
            headers: header
        }) 
    }
    function deleteProduct(id){
        return axios.delete(`${baseUrl}/api/v1/cart/${id}`,{
            headers: header
        })
    }
    function clearProducts(){
        return axios.delete(`${baseUrl}/api/v1/cart/`,{
            headers: header
        })
    }
    function getAllCart(){
        return axios.get(`${baseUrl}/api/v1/cart`,{
            headers: header 
        })
    }

    function checkOutPayment(cartID, shipping){
        let body = {
            shippingAddress: shipping
        }
        return axios.post(`${baseUrl}/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`,body,{
            headers:header
        })
    }
    return <CartContext.Provider value={{cartCount,setCartCount,addProductToCart,getAllCart,deleteProduct,clearProducts,updateProductQuantity,checkOutPayment}}>
        {props.children}
    </CartContext.Provider>
} 