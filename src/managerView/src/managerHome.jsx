import '../styles/managerHome.css';

import ManagerSideBar from './managerSideBar';
import ManagerInventory from './managerInventory';

function ManagerHome() {
    return (
        <>
            <div id="managerHomeContainer">
                <ManagerSideBar />
                <ManagerInventory debug="helo" />
            </div>
        </>
    )
}

export default ManagerHome;