import { useEffect, useState } from "react";
import "./style.css";
import { AiTwotoneEye } from "react-icons/ai";
import axios from "axios";
import { io } from "socket.io-client";
import ModalDetails from "./modal/modal-details";

export function BoxList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          number_order_id: data.order_id,
          Account: {
            name: data.Account.name,
          },
          price: data.price,
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

  const handleStatusChange = (orderId, newStatus) => {
    axios.patch(`http://localhost:3005/order/${orderId}`, {
      status: newStatus,
    });

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.number_order_id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

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

  return (
    <div className="box-list">
      <div className="column-title-list">
        <p className="title-id">Nº do pedido</p>
        <p className="title-name">Nome do cliente</p>
        <p className="title-valor">Valor</p>
        <p className="title-status">Status</p>
      </div>
      <div
        className="box-all-list"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {orders_list.map((order, index) => {
          const rowClass = index % 2 === 0 ? "even-row" : "odd-row";
          return (
            <div className={`column-data-list ${rowClass}`} key={index}>
              <button
                type="button"
                className="data-id"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedOrderId(order.number_order_id);
                }}
              >
                <AiTwotoneEye /> &nbsp;&nbsp;{order.number_order_id}
              </button>

              <p className="data-name">{order.Account.name}</p>
              <p className="data-valor">R$ {order.price}</p>
              <div className="data-status">
                <select
                  style={{
                    backgroundColor: getStatusButtonColor(order.status),
                  }}
                  className="option-id"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.number_order_id, e.target.value)
                  }
                >
                  <option
                    value="PENDING"
                    className={`option-class-pending ${
                      order.status === "PENDING" ? "selected" : ""
                    }`}
                  >
                    PENDING
                  </option>
                  <option
                    value="PROCESSING"
                    className={`option-class-processing ${
                      order.status === "PROCESSING" ? "selected" : ""
                    }`}
                  >
                    PROCESSING
                  </option>
                  <option
                    value="COMPLETED"
                    className={`option-class-completed ${
                      order.status === "COMPLETED" ? "selected" : ""
                    }`}
                  >
                    COMPLETED
                  </option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <ModalDetails
          orderId={selectedOrderId}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
