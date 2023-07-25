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
  const handleAddCartProduct = (e) => {

    dispatch(addCartItem(productDisplay))
  }
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto bg-white md:flex ">
        <div className="w-full max-w-sm p-5 overflow-hidden">
          <img
            src={productDisplay.image}
            className="transition-all rounded hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-1 mx-5">
          <h3 className="text-2xl font-semibold capitalize text-slate-600 md:text-4xl ">
            {productDisplay.name}
          </h3>
          <p className="text-2xl font-medium text-slate-500">
            {productDisplay.category}
          </p>
          <p className="text-2xl font-bold ">
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3">
            <button className="bg-green-400 text-center my-4 px-2 w-full hover:bg-green-600 rounded min-w-[100px] ">
              Mua
            </button>
            <button className="bg-green-400 text-center my-4 px-2 w-full hover:bg-green-600 rounded min-w-[100px]  ">
              Thêm
            </button>
          </div>
          <div className=''>
            <p className='text-slate-400'>Mô tả :</p>
            <p className=''>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={'Sản phẩm liên quan'} />
    </div>
  );
};

export default Menu;
