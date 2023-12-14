import "./App.css";
import { Dashboard } from "./pages/dashboard/dashboard";

function App() {
  // const [product, setProduct] = useState("");
  // const [account, setAccount] = useState("");
  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/order")
  //     .then((response) => {
  //       setOrders(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   const newSocket = io("http://localhost:3000", {
  //     query: {
  //       authorization: "client_front",
  //     },
  //   });

  //   newSocket.on("connect", () => {
  //     console.log("Connected");
  //   });

  //   newSocket.on("new_order", (data) => {
  //     setOrders((prevOrders) => [
  //       {
  //         order_id: data.order_id,
  //         account_name: data.account_name,
  //         status: data.status,
  //       },
  //       ...prevOrders,
  //     ]);
  //     console.log(data);
  //   });

  //   newSocket.on("disconnect", () => {
  //     console.log("Disconnected");
  //   });

  //   return () => {
  //     console.log("Unmounting component, disconnecting socket");
  //     newSocket.disconnect();
  //   };
  // }, []);

  // const handleProductChange = (event) => {
  //   setProduct(event.target.value);
  // };

  // const handleAccountChange = (event) => {
  //   setAccount(event.target.value);
  // };

  // const handleOrderStatus = () => {
  //   console.log("Mudou para Processingo o pedido");
  // };

  // const handleSubmit = () => {
  //   axios
  //     .post("http://localhost:3002/order", {
  //       account_id: account,
  //       product_id: product,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //   setAccount("");
  //   setProduct("");
  // };

  return (
    <div className="App">
      <header className="App-header">
        <Dashboard></Dashboard>

        {/* <div className="box-list-orders">
          <div className="box-input">
            <h1>PEDIDOS</h1>

            <div className="menu-orders">
              <div className="menu-id">Order_ID</div>
              <div className="menu-name">Name</div>
              <div className="menu-status">Status</div>
            </div>

            {orders.map((order, index) => (
              <div key={index} className="list-orders">
                <a className="list-id" href="http://localhost:5000">
                  {order.order_id}
                </a>
                <div className="list-name">{order.account_name}</div>
                <div className="list-status">
                  <input
                    onClick={() => handleOrderStatus(order.id)}
                    className="status-order"
                    type="submit"
                    value={order.status}
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}

      </header>
    </div>
  );
}

export default App;
