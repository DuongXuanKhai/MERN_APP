import React, { useEffect, useState } from 'react';
import FilterProduct from '../components/filterProduct';
import CartFeature from '../components/cartFeature';
import { useSelector } from 'react-redux';

const AllProduct = ({ heading, loading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];
  const loadingArrayFeature = new Array(10).fill(null);
  //display filter
  const [filterby, setFilterBy] = useState();
  const [dataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);
  const handleFilterProduct = (category) => {
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase(),
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  return (
    <div>
      <div className="my-5 ">
        <h2 className="font-bold text-2xl text-slate-700 mb-4">{heading}</h2>
        <div className="flex flex-wrap gap-2 justify-center overflow-scroll scrollbar-none">
          {categoryList[0] ? (
            categoryList.map((el) => {
              return (
                <FilterProduct
                  category={el}
                  key={el}
                  onClick={() => handleFilterProduct(el)}
                />
              );
            })
          ) : (
            <div className="min-h-[200px] flex justify-center items-center">
              <p>Loading...</p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 my-4">
          {dataFilter[0]
            ? dataFilter.map((el) => {
                return (
                  <CartFeature
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CartFeature loading="Loading..." key={index + 'allProduct'} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
