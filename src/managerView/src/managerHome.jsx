import '../styles/managerHome.css';
import InventoryButton from './inventoryButton';
import OrderHistoryButton from './orderHistoryButton';
import ServerViewButton from './serverViewButton';

function ManagerHome() {
    return (
        <>
            <ServerViewButton />
            <p id="managerHomeP">Manager home is here</p>
            <OrderHistoryButton />
            <InventoryButton />
        </>
    )
}

export default ManagerHome;