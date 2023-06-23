import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../components/cartProduct';

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  console.log(productCartItem);
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0,
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0,
  );
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600 ">
          Giỏ hàng của bạn
        </h2>
        {productCartItem[0]&&
          <div className="my-4 flex gap-3">
            {/* display cart */}
            <div className="w-full max-w-4xl">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                  />
                );
              })}
            </div>
            {/* total */}
            <div className="w-full max-w-xl ">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Hoá đơn</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p className="">Tổng số lượng</p>
                <p className="ml-auto w-32 font-bold ">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Tổng giá tiền</p>
                <p className="ml-auto w-32 font-bold ">{totalPrice}</p>
              </div>
              <button className="bg-red-500 w-full text-lg">Thanh toán</button>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default Cart;
