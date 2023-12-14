import { useEffect, useState } from "react";
import "./style.css";
import { AiTwotoneEye } from "react-icons/ai";
import axios from "axios";
import { io } from "socket.io-client";
import ModalStatus from "./modal/modal-status";
import ModalDetails from "./modal/modal-details";

export function BoxList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders_list, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/order")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    const newSocket = io("http://localhost:3005", {
      query: {
        authorization: "client_front",
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected");
    });

    newSocket.on("new_order", (data) => {
      setOrders((prevOrders) => [
        {
          order_id: data.order_id,
          account_name: data.account_name,
          status: data.status,
        },
        ...prevOrders,
      ]);
      console.log(data);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      console.log("Unmounting component, disconnecting socket");
      newSocket.disconnect();
    };
  }, []);

  const getStatusButtonColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#ff4d4d";
      case "processing":
        return "#ffd966";
      case "completed":
        return "#a5d6a7";
      default:
        return "#fff";
    }
  };

  const handleUpdateOrder = () => {
    setIsModalStatusOpen(false);
    setTimeout(()=>{
      axios
      .get("http://localhost:3005/order")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    },1000)
    
  };

  return (
    <div className="box-list">
      <div className="column-title-list">
        <p className="title-id">Nº do pedido</p>
        <p className="title-name">Nome do cliente</p>
        <p className="title-valor">Valor</p>
        <p className="title-status">Status</p>
      </div>

      {orders_list.map((order, index) => {
        const rowClass = index % 2 === 0 ? "even-row" : "odd-row";

        return (
          <div className={`column-data-list ${rowClass}`} key={index}>
            <button
              type="button"
              className="data-id"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedOrderId(order.numer_order_id);
              }}
            >
              <AiTwotoneEye /> &nbsp;&nbsp;{order.numer_order_id}
            </button>

            <p className="data-name">{order.account_name}</p>
            <p className="data-valor">{order.price}</p>
            <p className="data-status">
              <input
                className="data-status-button"
                type="button"
                value={order.status}
                style={{
                  backgroundColor: getStatusButtonColor(order.status),
                }}
                onClick={() => {
                  setIsModalStatusOpen(true);
                  setSelectedOrderId(order.numer_order_id);
                }}
              />
            </p>
          </div>
        );
      })}

      {isModalOpen && (
        <ModalDetails
          orderId={selectedOrderId}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {isModalStatusOpen && (
        <ModalStatus
          orderId={selectedOrderId}
          closeModal={() => handleUpdateOrder()}
        />
      )}
    </div>
  );
}
