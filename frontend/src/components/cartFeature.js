import React from 'react';
import { Link } from 'react-router-dom';
import { addCartItem } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
const CartFeature = ({ image, name, price, category, loading, id }) => {
  
  const handleAddCartProduct = (e)=>{

    dispatch(addCartItem({
      _id: id,
      name : name,
      price : price,
      category : category,
      image : image,

    }))
  }
  const dispatch = useDispatch()
  return (
    <div className="w-full min-w-[200px] max-w-[300px] bg-white hover:shadow-xl drop-shadow-lg pt-5 px-4 cursor-pointer">
      {image ? (
        <>
        <Link to ={`/menu/${id}`} onClick={()=>window.scrollTo({top:'0', behavior:"smooth"})}> 
          <div className="h-28 flex flex-col justify-center items-center">
            <img src={image} className="h-full" />
          </div>
          <h3 className="font-semibold text-slate-600 text-center capitalize text-lg whitespace-normal overflow-hidden">
            {name}
          </h3>
          <p className="text-center text-slate-400 font-medium">{category}</p>
          <p className="text-center font-bold">
            <span>{price}</span>
          </p>
          </Link>
          <button className="bg-yellow-400 text-center my-4 px-2 w-full hover:bg-yellow-500 rounded " onClick={ handleAddCartProduct}>
            + Thêm
          </button>
          
        </>
      ) : (
        <div className='min-h-[200px] flex justify-center items-center'>
        <p>{loading}</p>
        </div>
        
      )}
    </div>
  );
};

export default CartFeature;
