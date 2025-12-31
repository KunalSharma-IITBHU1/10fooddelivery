import { useEffect, useContext } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/context";

const Payment = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { fetchOrders } = useContext(StoreContext);

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        await axios.post(
          "http://localhost:4000/api/order/verify",
          { orderId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await fetchOrders();

        setTimeout(() => {
          navigate("/orders");
        }, 300);

      } catch (error) {
        console.log(error);
      }
    };

    if (orderId && token) verifyAndFetch();
  }, [orderId, token]);

  return <h2 style={{ textAlign: "center" }}>Payment Successful 🎉</h2>;
};

export default Payment;
