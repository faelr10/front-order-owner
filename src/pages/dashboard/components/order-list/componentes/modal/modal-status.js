import React, { useEffect, useState } from "react";
import "./style-status.css";
import { CiViewList } from "react-icons/ci";
import { PiListNumbersFill } from "react-icons/pi";
import { GrStatusWarning } from "react-icons/gr";
import axios from "axios";

const ModalStatus = ({ orderId, closeModal }) => {
  const [ordersList, setOrders] = useState();
  const [newStatus, setNewStatus] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

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
  }, [orderId]);

  const handleStatusChange = (status) => {
    setNewStatus(status);
    setIsConfirmationVisible(true);
  };

  const handleConfirmNoStatusChange = () => {
    setIsConfirmationVisible(false);
  };

  const handleConfirmYesStatusChange = () => {
    setIsConfirmationVisible(false);
    axios.patch(`http://localhost:3005/order/${orderId}`, {
      status: newStatus,
    });
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className={`modal ${ordersList ? "show" : ""}`}>
      {ordersList ? (
        <>
          <div className="modal-content">
            <div className="status-model-box">
              <div className="status-title">
                Alterar Status &nbsp; <CiViewList />
              </div>
              <div className="status-id">
                <strong>
                  <PiListNumbersFill />
                  &nbsp; Nº do Pedido:&nbsp;{" "}
                </strong>{" "}
                {ordersList.order_list_id}
              </div>
              <div className="status-value">
                <strong>
                  <GrStatusWarning />
                  &nbsp; Status atual:&nbsp;{" "}
                </strong>{" "}
                {ordersList.status}
              </div>
              {isConfirmationVisible ? (
                <div className="data-status-confirmation">
                  Tem certeza que deseja alterar o status do pedido para{" "}
                  {newStatus}?
                  <div className="confirmation-buttons">
                    <button
                      className="confirmation-button-no"
                      onClick={() => {
                        handleConfirmNoStatusChange(false);
                      }}
                    >
                      Não
                    </button>
                    <button
                      className="confirmation-button-yes"
                      onClick={() => {
                        handleConfirmYesStatusChange(true);
                        handleCloseModal();
                      }}
                    >
                      Sim
                    </button>
                  </div>
                </div>
              ) : (
                <div className="data-status-type">
                  <input
                    className="data-status-button-processing"
                    type="button"
                    value="PROCESSING"
                    onClick={() => handleStatusChange("PROCESSING")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <input
                    className="data-status-button-completed"
                    type="button"
                    value="COMPLETED"
                    onClick={() => handleStatusChange("COMPLETED")}
                  />
                </div>
              )}

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

export default ModalStatus;
