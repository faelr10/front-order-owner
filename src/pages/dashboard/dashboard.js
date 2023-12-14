import "./style.css";
import { LateralMenu } from "./components/lateral-menu/lateral-menu";
import { OrderList } from "./components/order-list/order-list";

export function Dashboard() {
  return (
    <div className="dashboard">
      <LateralMenu></LateralMenu>
      <OrderList></OrderList>
    </div>
  );
}
