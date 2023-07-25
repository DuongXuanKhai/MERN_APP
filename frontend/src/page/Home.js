import React, { useEffect, useRef, useState } from 'react';
import HomeCard from '../components/homeCard';
import { useSelector } from 'react-redux';
import CartFeature from '../components/cartFeature';
import { GrNext, GrPrevious } from 'react-icons/gr';
import FilterProduct from '../components/filterProduct';
import AllProduct from '../components/allProduct';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(0, 5);
  const homeProductCartListFried = productData.filter(
    (el) => el.category === 'Món Chiên',
    [],
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };
  const categoryList = [...new Set(productData.map((el) => el.category))];

  return (
    <div className="p-2 md:p-4">
      <div className="gap-4 py-2 md:flex">
        <div className="md:w-1/2 ">
          <h2 className="py-2 text-4xl font-bold md:text-7xl">
            Thực phẩm chay
            <span className="text-green-400"> Xuan Khai</span>
          </h2>
          <p className="py-3 text-base">
            Ẩm thực chay đang dần trở thành xu hướng của mọi gia đình. Đây là một lối ẩm thực thuần túy,
            thanh tịnh. Để đáp ứng đầy đủ nhu cầu của khách hàng về ẩm thực chay. Thực phẩm chay Bảo Toàn
            chuyên cung cấp thực phẩm chay cho đại lý, nhà hàng hân hạnh được phục vụ bạn.
          </p>
          <button className="px-4 py-2 font-bold text-white bg-green-400 rounded-md">
            Mua Ngay
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-5 p-4 md:w-1/2">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
              return (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
            : loadingArray.map((el, index) => {
              return (
                <HomeCard key={index + 'loading'} loading={'loading...'} />
              );
            })}
        </div>
      </div>
      <div>
        <div className="flex items-center w-full">
          <h2 className="mb-4 text-2xl font-bold text-slate-700">
            Sản phẩm nổi bật
          </h2>
          <div className="flex gap-4 ml-auto">
            <button
              onClick={preveProduct}
              className="p-1 text-lg bg-slate-300 hover:bg-slate-400"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="p-1 text-lg bg-slate-300 hover:bg-slate-400"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll transition-all scrollbar-none scroll-smooth"
          ref={slideProductRef}
        >
          {homeProductCartListFried[0]
            ? homeProductCartListFried.map((el) => {
              return (
                <CartFeature
                  key={el._id + 'Món Chiên'}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
            : loadingArrayFeature.map((el, index) => (
              <CartFeature loading="Loading..." key={index + 'cartLoading'} />
            ))}
        </div>
      </div>
      <AllProduct heading={'Sản phẩm của bạn'} />
    </div>
  );
};

export default Home;
