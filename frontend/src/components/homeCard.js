import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({ name, image, category, price, loading, id }) => {
  return (
    <div className="bg-white min-w-[150px] shadow-md p-2 rounded ">
      {name ? (
        <>
        <Link to ={`/menu/${id}`} onClick={()=>window.scrollTo({top:'0', behavior:"smooth"})}> 
          <div className="w-40 min-h-[120px] ">
            <img src={image} className=" h-full w-full rounded-sm" />
          </div>
          <h3 className="font-semibold text-slate-600 text-center whitespace-normal capitalize text-lg">
            {name}
          </h3>
          <p className="text-center text-slate-400 font-medium">{category}</p>
          <p className="text-center font-bold">
            <span>{price}</span>
          </p>
          </Link>
        </>
      )
      :
      <div className='min-h-[150px] flex justify-center items-center'><p>{loading}</p></div>
      }
    </div>
  );
};

export default HomeCard;
