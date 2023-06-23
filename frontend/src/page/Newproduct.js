import React, { useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { ImageToBase64 } from '../utility/ImageToBase64';
import { toast } from 'react-hot-toast';
const Newproduct = () => {
  const [data, setData] = useState({
    name: '',
    category: '',
    image: '',
    price: '',
    description: '',
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const {name, image, category, price} = data
    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method:'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const fetchRes = await fetchData.json()
      console.log(fetchRes)
      toast(fetchRes.message)
      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }
    else{
      toast('Enter required fields')
    }
    
  };

  const uploadImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);
    // console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  return (
    <div className="">
      <form
        className="m-auto w-full max-w-md p-4 shadow flex flex-col bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={'text'}
          name="name"
          className="bg-slate-100 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-100 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={'other'}>Select</option>
          <option value={'Món Kho'}>Món Kho</option>
          <option value={'Món Xào'}>Món Xào</option>
          <option value={'Món Luộc'}>Món Luộc</option>
          <option value={'Món Chiên'}>Món Chiên</option>
          <option value={'Canh Súp'}>Canh/Súp</option>
          <option value={'Tráng Miệng'}>Tráng Miệng</option>
        </select>
        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-400 my-1 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className=" h-full" />
            ) : (
              <span className="text-3xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={'file'}
              id="image"
              onChange={uploadImage}
              className="hidden"
              accept="image/*"
            />
          </div>
        </label>

        <label htmlFor="price">Price</label>
        <input
          type={'text'}
          name="price"
          className="bg-slate-100 p-1 my-1"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          className="bg-slate-100 p-1 my-1 resize-none"
          rows={3}
          onChange={handleOnChange}
          value={data.description}
        ></textarea>

        <button className="bg-blue-300 hover:bg-blue-400 text-white text-lg font-medium drop-shadow-md my-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
