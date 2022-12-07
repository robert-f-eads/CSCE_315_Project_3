import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {LoginPage, LandingPage, StoreLocate} from './connectingViews';
import CustomerView from './customer-view/CustomerView.js'
import ServerView from './server-view/ServerView'
import ManagerViewTester from './managerView/src/managerViewTester';


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
            <Route path='/order' element={<CustomerView userData={userData} language={language}/>} />
            <Route path='/serverorder' element={<ServerView userData={userData} language={language}/>} />
            <Route path='/managerview' element={<ManagerViewTester userData={userData} language={language}/>} />
        </Routes>
    </Router>
  );
}
export default App;
