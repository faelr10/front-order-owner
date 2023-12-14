import React, { useEffect, useState } from "react";
import "./style-details.css";
import { CiViewList } from "react-icons/ci";
import { PiListNumbersFill } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineDescription } from "react-icons/md";
import axios from "axios";

const ModalDetails = ({ orderId, closeModal }) => {
  const [orders_list, setOrders] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/order/${orderId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {};
  }, []);

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className={`modal ${orders_list ? "show" : ""}`}>
      {orders_list ? (
        <>
          <div className="modal-content">
            <div className="detail-model-box">
              <div className="details-title">
                Detalhes do Pedido&nbsp; <CiViewList />
              </div>
              <div className="details-id">
                <strong>
                  <PiListNumbersFill />
                  &nbsp; Nº do Pedido:&nbsp;{" "}
                </strong>{" "}
                {orders_list.numer_order_id}
              </div>
              <div className="details-name">
                <strong>
                  <FaRegUser />
                  &nbsp; Nome do Cliente:&nbsp;{" "}
                </strong>{" "}
                {orders_list.Account.name}
              </div>
              <div className="details-value">
                <strong>
                  <RiMoneyDollarCircleLine />
                  &nbsp; Valor:&nbsp;{" "}
                </strong>{" "}
                {orders_list.price}
              </div>
              <div className="details-product" style={{ textAlign: "left" }}>
                <strong>
                  <CiViewList /> &nbsp;Detalhes:&nbsp;{" "}
                </strong>
                <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                  <li style={{ marginBottom: "5px" }}>
                    &nbsp;1x {orders_list.Product.name}
                  </li>
                </ul>
              </div>

              <div className="details-description">
                <strong>
                  <MdOutlineDescription />
                  &nbsp; Descrição:&nbsp;&nbsp;
                </strong>
                Muito molho especial!
              </div>
              <button
                className="closed-button-modal"
                onClick={handleCloseModal}
              >
                Fechar
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Detalhes do pedido não encontrados.</p>
      )}
    </div>
  );
};

export default ModalDetails;
