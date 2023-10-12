import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Context/CartContext'
import logo from "../Images/freshcart-logo.svg"

export default function Nav() {
  let {userToken,setUserToken} = useContext(UserContext)
  let {cartCount,setCartCount} = useContext(CartContext)
  let navigate = useNavigate();
  function logOut(){
    localStorage.removeItem("userToken")
    setUserToken(null)
    navigate("/login")
  }
  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
        <Link className="navbar-brand" to={"/"}> <img src={logo} alt="" /> </Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            {userToken !== null ?             <>
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/cart"}>Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/products"}>Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/catgories"}>Catgories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/brands"}>Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/wishlist"}>Wish List</Link>
            </li>
            
            </>:
            ""
            }
            
          </ul>
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex  justify-content-center align-items-center">
          <li className="nav-item d-flex align-items-center">
              <i className="fa-brands fa-facebook mx-2"></i>
              <i className="fa-brands fa-instagram mx-2"></i>
              <i className="fa-brands fa-twitter mx-2"></i>
              <i className="fa-brands fa-tiktok mx-2"></i>
              <i className="fa-brands fa-youtube mx-2"></i>
            </li>
            {
              userToken !== null ? <>
            <li className="nav-item">
            <Link  className="nav-link position-relative"  to={"/cart"}><i className="fa-solid fa-cart-shopping "></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main mt-1">
                {cartCount}
              </span>
              
              </Link>
            </li>
              <li className="nav-item">
              <span className="nav-link cursor-pointer" onClick={logOut}>Logout</span>
            </li>
              
              </>: <>
              <li className="nav-item">
              <Link className="nav-link" to={"/login"}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/register"}>Register</Link>
            </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
    
    </>
  )
}
