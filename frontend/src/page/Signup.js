import React, { useState } from 'react';
import loginSignupImage from '../assest/loginsignup2.png';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { ImageToBase64 } from '../utility/ImageToBase64';
import { toast } from 'react-hot-toast';
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });
  console.log(data);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadProfileImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);
    console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/signup`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );

        const dataRes = await fetchData.json();
        console.log(dataRes);
        // alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate('/login');
        }
      } else {
        alert('password and confirm password not equal');
      }
    } else {
      alert('Please enter required fields');
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="flex flex-col w-full max-w-sm p-4 m-auto bg-white rounded-xl">
        {/* <h1 className="text-xl font-bold text-center">Signup</h1> */}
        <div className="relative w-20 h-20 m-auto overflow-hidden rounded-full shadow-md drop-shadow-md">
          <img
            src={data.image ? data.image : loginSignupImage}
            className="w-full h-full"
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 w-full text-center bg-opacity-50 cursor-pointer h-1/3 bg-slate-500">
              <p className="p-1 text-sm text-white">Upload</p>
            </div>
            <input
              type={'file'}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>
        <form className="flex flex-col w-full py-3" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={'text'}
            id="firstName"
            name="firstName"
            className="w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={'text'}
            id="lastName"
            name="lastName"
            className="w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={'email'}
            id="email"
            name="email"
            className="w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300 ">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full border-none outline-none bg-slate-200"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300 ">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full border-none outline-none bg-slate-200"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button
            type="submit"
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ... max-w-[120px] w-full m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-2 text-sm text-left">
          Already have account ?
          <Link to={'/login'} className="mx-1 text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
