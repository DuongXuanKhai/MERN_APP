import React from 'react';
import { TiPlus } from 'react-icons/ti';
import { TiMinus } from 'react-icons/ti';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteCartItem, increaseQty, decreaseQty } from '../redux/productSlice';
const CartProduct = ({
  name,
  image,
  category,
  price,
  id,
  loading,
  total,
  qty,
}) => {
  const dispacth = useDispatch()
  return (
    <div className="bg-slate-200 p-2 flex gap-3 rounded border-2 border-slate-300">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} className="h-28 w-36 object-cover " />
      </div>
      <div className="flex flex-col gap-1 mx-5 w-full">
        <div className='flex justify-between'>
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-2xl ">
            {name}
          </h3>
          <div className="ml-auto cursor-pointer text-slate-700 hover:text-red-400" onClick={()=> dispacth(deleteCartItem(id))}>
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500 font-medium text-lg">{category}</p>
        <p className=" font-bold text-lg text-base">
          <span>{price}</span>
        </p>
        <div className="flex justify-between w-full">
          <div className="flex gap-3 items-center">
            <button onClick={()=>dispacth(increaseQty(id))} className="bg-slate-300  my-2 pt-1  hover:bg-slate-400 rounded p-1 min-w-[10px]">
              <TiPlus />
            </button>
            <p className="font-semibold">{qty}</p>
            <button onClick={()=>dispacth(decreaseQty(id))} className="bg-slate-300 my-2 pt-1  hover:bg-slate-400 rounded p-1 min-w-[10px]">
              <TiMinus />
            </button>
          </div>
          <div className="flex justify-center gap-2 font-bold text-slate-700">
            <p>Total: </p>
            <p>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
