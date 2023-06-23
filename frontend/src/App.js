import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;
        const url = serverDomain.endsWith('/')
          ? `${serverDomain}product`
          : `${serverDomain}/product`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
