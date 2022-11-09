import './App.css';
import DbApp from './databaseConnections/databaseTesting';
import logo from './logo.svg'
import 'font-awesome/css/font-awesome.min.css';
import CustomerView from './customer-view/CustomerView.js'
import SideBar from './customer-view/SideBar';
//import Banner from './banner.png'


function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
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


    <CustomerView></CustomerView>
    </>
  );
}
export default App;
