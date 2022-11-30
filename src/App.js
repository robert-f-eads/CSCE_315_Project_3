import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {LoginPage, LandingPage} from './connectingViews';
import CustomerView from './customer-view/CustomerView.js'
import ManagerViewTester from './managerView/src/managerViewTester';

import SideBar from './server-view/SideBar';
import MainPanel from './server-view/MainPanel';
import HomeButton from './homeButton';
import Modifications from './customer-view/Modifications';


function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/order' element={<CustomerView/>} />
            <Route path='/serverorder' element={(
                <div id="serverViewContainer">
                <MainPanel />
                <SideBar />
                </div>
             )} />
            <Route path='/managerview' element={<ManagerViewTester/>} />
        </Routes>
    </Router>
  );
}
export default App;
