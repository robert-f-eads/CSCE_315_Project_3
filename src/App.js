import './App.css';
import DbApp from './databaseConnections/databaseTesting';
import logo from './logo.svg'
import SideBar from './customer-view/SideBar.js'
import CartView from './customer-view/CartView.js'
import 'font-awesome/css/font-awesome.min.css';
import {orderTicket, dateTime, orderItem, product} from './dataStructures/dataStructuresExports'
//import Banner from './banner.png'

var ticket = new orderTicket(0, new dateTime("06-03-2002"), "Alexia", 0, 0, 10);
ticket.addItemToOrder(new orderItem(4,0,1,1,32, new product(1, "Temp-item", 6.99)))
ticket.addItemToOrder(new orderItem(5,0,2,1,20, new product(4, "Temp-item2", 7.99)))

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <DbApp />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>


      <main class="d-flex flex-nowrap" style={{ "height": "100vh" }}>
        <SideBar />

        <div className="container-fluid">
          <div className="row" style={{ "background-image": "url(banner.png)", "height": "100px", "background-size": "cover", "padding-bottom": "100px" }}></div>
          <div className="row" style={{ "padding-top": "100px" }}>
            <ListPanel></ListPanel>
          </div>
        </div>

        <div className="row" style={{ "padding-top": "100px" }}>
          <ListPanel></ListPanel>
        </div>
      </main>
    </>
  );
}
export default App;
