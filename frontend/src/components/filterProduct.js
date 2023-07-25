import React from 'react';
import { GiForkKnifeSpoon } from 'react-icons/gi';
const filterProduct = ({ category, onClick }) => {
  return (
    <div className='w-16' onClick={onClick}>
      <div className="p-5 text-2xl bg-green-400 rounded-full ">
        <GiForkKnifeSpoon />
      </div>
      <p className='my-1 font-medium text-center capitalize'>{category}</p>
    </div>
  );
};

export default filterProduct;
