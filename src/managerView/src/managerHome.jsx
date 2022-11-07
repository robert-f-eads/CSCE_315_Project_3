import '../styles/managerHome.css';

import ManagerSideBar from './managerSideBar';
import ManagerInventory from './managerInventory';
import ManagerOrderHistory from './managerOrderHistory';
import GenericTable from './genericTable';

function ManagerHome() {
    return (
        <>
            <div id="managerHomeContainer">
                <ManagerSideBar />
                <div id="contentContainer"></div>
                {/**<GenericTable tableName="ordertickets"/>*/}
            </div>
        </>
    )
}

export default ManagerHome;