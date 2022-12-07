import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {LoginPage, LandingPage, StoreLocate} from './connectingViews';
import CustomerView from './customer-view/CustomerView.js'
import ManagerViewTester from './managerView/src/managerViewTester';

import SideBar from './server-view/SideBar';
import MainPanel from './server-view/MainPanel';
import HomeButton from './homeButton';
import Modifications from './customer-view/Modifications';

/**
 * Functions and display for the website
 * @returns web pages for the website
 */
function App() {
  const [userData, setUserData] = useState([])
  const [language, setLanguage] = useState('en');

  return (
    <Router>
        <Routes>
            <Route path='/' element={<LandingPage language={language} setLanguage={setLanguage}/>} />
            <Route path='/login' element={<LoginPage setUserData={setUserData} language={language} setLanguage={setLanguage}/>} />
            <Route path='/order' element={<CustomerView userData={userData}/>} />
            <Route path='/serverorder' element={(
                <div id="serverViewContainer">
                <MainPanel />
                <SideBar />
                </div>
             )} />
            <Route path='/managerview' element={<ManagerViewTester userData={userData}/>} />
        </Routes>
    </Router>
  );
}
export default App;
