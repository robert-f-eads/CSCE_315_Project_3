import './App.css';
import DbApp from './databaseConnections/databaseTesting';
import logo from './logo.svg'
import SideBar from './SideBar'
import 'font-awesome/css/font-awesome.min.css';
//import Banner from './banner.png'

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <DbApp />
          <SideBar />
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
          <div className="row" style={{ "background-image": "url(banner.png)", "height": "100px", "background-size": "cover" }}></div>
        </div>

      </main>
    </>
  );
}
export default App;
