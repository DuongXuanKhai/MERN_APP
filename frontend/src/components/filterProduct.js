import React from 'react';
import { GiForkKnifeSpoon } from 'react-icons/gi';
const filterProduct = ({category, onClick}) => {
  return (
    <div className='w-16' onClick={onClick}>
      <div className="text-2xl p-5 bg-yellow-400 rounded-full ">
        <GiForkKnifeSpoon />
      </div>
      <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  );
};

export default filterProduct;
