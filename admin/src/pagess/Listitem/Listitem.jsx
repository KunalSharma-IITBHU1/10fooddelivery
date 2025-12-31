import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Listitem.css";

const Listitem = () => {
  const [list, setList] = useState([]);

  const token = localStorage.getItem("adminToken");

  const fetchList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/food/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("Failed to load list");
      }
    } catch (err) {
      console.log("LIST ERROR:", err.response?.data || err.message);
      toast.error("Server error");
    }
  };

  const removeFood = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/food/remove",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error("Unable to delete");
      }
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h2>All Food Items</h2>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <button onClick={() => removeFood(item._id)}> Delete </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listitem;
