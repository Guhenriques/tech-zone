import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastContainer } from "react-toastify";

import Home from './components/Home';
import NavBar from './components/NavBar';
import Cart from './components/Cart';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckOutSuccess from './components/CheckoutSuccess';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <div className='content-container'>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/products/:productId' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout-success' element={<CheckOutSuccess />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
