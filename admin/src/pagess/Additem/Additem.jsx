import React, { useState } from "react";
import "./Additem.css";
import assets from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddFood = () => {

  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image", image);

      const res = await axios.post(
        "https://one0fooddelivery-backend.onrender.com/api/food/add",
        formData
      );

      if (res.data.success === true) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(res.data.message);
      }else{
          toast.error(res.data.message);
      }

    } catch (err) {
      console.log(err);
       toast.error("Server error");
    }
  };

  return (
    <div className="addfood">
      <h2>Add Food</h2>
      <form onSubmit={onSubmitHandler} className="addfood-form">
        <label htmlFor="image">
          <img src={image ? URL.createObjectURL(image) : assets.upload} className="upload-preview" alt=""/>
        </label>
        <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} required />
        <input name="name" value={data.name} onChange={onChangeHandler} placeholder="Food name" required />
        <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder="Food description" required />
        <select name="category" value={data.category} onChange={onChangeHandler} >
          <option value="Salad">Salad</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Drinks">Drinks</option>
        </select>
        <input type="number" name="price" value={data.price} onChange={onChangeHandler} placeholder="Price" required />
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
