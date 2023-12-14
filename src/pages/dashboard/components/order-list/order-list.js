import { BoxList } from "./componentes/box-list";
import "./style.css";

export function OrderList() {
  return (
    <div className="order-list">
      <div className="title-order-list">PEDIDOS</div>
      <BoxList />
    </div>
  );
}
