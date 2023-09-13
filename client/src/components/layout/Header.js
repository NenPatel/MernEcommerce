import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink,Link } from 'react-router-dom'
import { userLogout } from '../../redux/slices/UserSlice'
import  toast  from 'react-hot-toast';
import useCategory from '../../hooks/useCategory';
import SearchInput from '../form/SearchInput';
import { getCartTotal } from '../../redux/slices/CartSlice';
// import {GiShoppingBag} from "react-icons/gi"

const Header = () => {
    const {user,token} = useSelector(state => state.userData)
    const {cart} = useSelector(state => state.cartData)
    const dispatch = useDispatch()
    const categories = useCategory()
    const handleLogout = () => {
        dispatch(userLogout())
        localStorage.clear()
        toast.success("Logout Successfull")
    }
    useEffect(() => {
      dispatch(getCartTotal()) 
      // console.log("here nav");
    },[cart])
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" > 🛒 Ecommerce App</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
              <li className="nav-item ">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  // to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
          {
            !user ? (
                <>
                <li className="nav-item">
                    <NavLink to="/register" className="nav-link" >Register</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link" >Login</NavLink>
                </li>
                </>
            )
            : (
              <>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" style={{ border: "none" }} aria-expanded="false">
                  {user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink to={`/dashboard/${user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" >Dashboard</NavLink></li>
                  <li><NavLink to="/login" className="dropdown-item" onClick={handleLogout} >Logout</NavLink></li>
                </ul>
              </li>
              </>
            )
        }
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link">Cart({cart.length})</NavLink>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Header