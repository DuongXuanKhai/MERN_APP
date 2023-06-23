import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllProduct from '../components/allProduct';
import { addCartItem } from '../redux/productSlice';

const Menu = () => {
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  console.log(productDisplay);
  const dispatch = useDispatch()
  const handleAddCartProduct = (e)=>{

    dispatch(addCartItem(productDisplay))
  }
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white ">
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img
            src={productDisplay.image}
            className="hover:scale-105 transition-all rounded"
          />
        </div>
        <div className="flex flex-col gap-1 mx-5">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl ">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 font-medium text-2xl">
            {productDisplay.category}
          </p>
          <p className=" font-bold text-2xl">
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3">
            <button className="bg-yellow-500 text-center my-4 px-2 w-full hover:bg-yellow-600 rounded min-w-[100px] ">
              Mua
            </button>
            <button className="bg-yellow-500 text-center my-4 px-2 w-full hover:bg-yellow-600 rounded min-w-[100px]  ">
              Thêm
            </button>
          </div>
          <div className=''>
            <p className='text-slate-400'>Mô tả :</p>
            <p className=''>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={'Related Product'}/>
    </div>
  );
};

export default Menu;
