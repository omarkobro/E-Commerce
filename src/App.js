import logo from './logo.svg';
import './App.css';

import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import Products from './Products/Products';
import Cart from './Cart/Cart';
import Login from './Login/Login';
import Register from './Register/Register';
import Notfound from './Notfound/Notfound';
import Catgories from './Catgories/Catgories';
import Brands from './Brands/Brands';
import ProductDetails from './ProductDetails/ProductDetails';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
// import { QueryClient, QueryClientProvider } from 'react-query';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import RestPassword from './ResetPassword/RestPassword';
import CartContextProvider from './Context/CartContext';
import CheckOut from './CheckOut/CheckOut';
import { Provider } from 'react-redux';
import { store } from './Stores/store';
import WishList from './WishList/WishList';
import WishListContextProvider from './Context/WishListContext';






function App() {
  let router = createHashRouter([{
    path: "/", element:<Layout></Layout>, children:[
      {index:true, element:<ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:"products", element:<ProtectedRoute><Products></Products></ProtectedRoute>},
      {path:"cart", element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:"wishList", element:<ProtectedRoute><WishList></WishList></ProtectedRoute>},
      {path:"login", element:<Login></Login>},
      {path:"register", element:<Register></Register>},
      {path:"forgetpassword", element:<ForgetPassword></ForgetPassword>},
      {path:"resetpassword", element:<RestPassword></RestPassword>},
      {path:"catgories", element:<ProtectedRoute><Catgories></Catgories></ProtectedRoute>},
      {path:"ProductDetails/:id", element:<ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
      {path:"checkout/:id", element:<ProtectedRoute><CheckOut></CheckOut></ProtectedRoute>},
      {path:"brands", element:<ProtectedRoute><Brands></Brands></ProtectedRoute>},
      {path:"*", element:<Notfound></Notfound>},
  ]
  }])

  // let queryClient = new QueryClient();

  return <>

<Provider store={store}>
  <CartContextProvider>
    <WishListContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </UserContextProvider>
    </WishListContextProvider>
  </CartContextProvider>
</Provider>

  </>
  ;
}

export default App;
