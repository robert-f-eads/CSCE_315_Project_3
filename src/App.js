import './App.css';
import DbApp from './databaseConnections/databaseTesting';
import SearchBar from './server-view/SearchBar';
import MainPanel from './server-view/MainPanel';
import SideBar from './server-view/SideBar';
import { useState } from 'react';

function App() {
  const [pageNum, setPageNum] = useState(0);

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <DbApp/>
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
      </div> */}

    
      <div id="allContent">
        <MainPanel></MainPanel>
        <SideBar></SideBar>
        {/* <SearchBar></SearchBar> */}

      </div>

      
    </>
  );
}
export default App;
