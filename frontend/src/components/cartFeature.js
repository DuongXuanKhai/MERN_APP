import React from 'react';
import { Link } from 'react-router-dom';
import { addCartItem } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
const CartFeature = ({ image, name, price, category, loading, id }) => {

  const handleAddCartProduct = (e) => {

    dispatch(addCartItem({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image,

    }))
  }
  const dispatch = useDispatch()
  return (
    <div className="w-full min-w-[200px] max-w-[300px] bg-white hover:shadow-xl drop-shadow-lg pt-5 px-4 cursor-pointer">
      {image ? (
        <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: '0', behavior: "smooth" })}>
            <div className="flex flex-col items-center justify-center h-28">
              <img src={image} className="h-full" />
            </div>
            <h3 className="overflow-hidden text-lg font-semibold text-center capitalize whitespace-normal text-slate-600">
              {name}
            </h3>
            <p className="font-medium text-center text-slate-400">{category}</p>
            <p className="font-bold text-center">
              <span>{price}</span>
            </p>
          </Link>
          <button className="w-full px-2 my-4 text-center bg-green-400 rounded hover:bg-green-500 " onClick={handleAddCartProduct}>
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
