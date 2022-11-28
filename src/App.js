import './App.css';
import { useState } from 'react';
//import DbApp from './databaseConnections/databaseTesting';
//import logo from './logo.svg'
import 'font-awesome/css/font-awesome.min.css';
import CustomerView from './customer-view/CustomerView.js'
import SideBar from './server-view/SideBar';
import MainPanel from './server-view/MainPanel';
import ViewSwitch from './landingPage/viewConnections';
import ManagerViewTester from './managerView/src/managerViewTester';
import HomeButton from './homeButton';
import Modifications from './customer-view/Modifications';
import LoginPage from './landingPage/loginPage';
//import Banner from './banner.png'


function App() {
  const [pageNum, setPageNum] = useState(0);

  return (
    <>
    {/*<LoginPage/>*/}
    {pageNum === 0 && <ViewSwitch setPageNum={setPageNum}/>}
    {pageNum === 1 && <CustomerView />}
    {pageNum === 2 && <div id="serverViewContainer">
      <MainPanel />
      <SideBar />
    </div>}
    {pageNum === 3 && <ManagerViewTester />}
    {pageNum !== 0 && <HomeButton setPageNum={setPageNum} />}
    </>
  );
}
export default App;
