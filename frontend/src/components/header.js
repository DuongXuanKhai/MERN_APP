import React, { useState } from 'react';
import logo from '../assest/logo.png';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { BsFillCartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast('Logout Successfully');
  };
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const cartItemNumber = useSelector((state) => state.product.cartItem)
  return (
    <header className="fixed z-50 w-full h-16 px-2 bg-white shadow-md md:px-4 ">
      {/*desktop*/}
      <div className="flex items-center justify-between h-full">
        <Link to={''}>
          <div className="h-10">
            <img src={logo} className="h-full " />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="hidden gap-4 text-base  md:gap-6 md:text-lg md:flex">
            <Link to={''}>Home</Link>
            <Link to={'menu/6486ffb914b03f396a71f158'}>Menu</Link>
            <Link to={'about'}>About</Link>
            <Link to={'contact'}>Contact</Link>
          </nav>
          <div className="relative text-2xl text-slate-600">
            <Link to={'cart'}>
              <BsFillCartFill />
              <div className="absolute w-4 h-4 p-0 m-0 text-sm text-center text-white bg-red-500 rounded-full -top-1 -right-1">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="overflow-hidden text-3xl rounded-full cursor-pointer w-7 h-7 drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="w-full h-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[100px] text-center ">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={'newproduct'}
                    className="px-2 cursor-pointer whitespace-nowarp"
                  >
                    New product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="px-2 text-white bg-blue-400 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                    {userData.firstName}
                  </p>
                ) : (
                  <Link
                    to={'login'}
                    className="px-2 cursor-pointer whitespace-nowarp"
                  >
                    Login
                  </Link>
                )}
                <nav className="flex flex-col text-base md:text-lg md:hidden">
                  <Link to={''} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={'menu/6486ffb914b03f396a71f158'}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={'about'} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={'contact'} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
    </header>
  );
};

export default Header;
