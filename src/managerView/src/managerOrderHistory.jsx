import { useEffect, useState } from 'react';
import { getTable } from '../../databaseConnections/managerViewFunctions';
import '../styles/managerOrderHistory.css'

function ManagerOrderHistory() {
    const [getOrderHistory, setOrderHistory] = useState();
    useEffect(() => {
        getTable("ordertickets").then(res => {
            console.log(res.length);
        });
    });

    return (
        <>
            <p>This is manager order history</p>
        </>
    );
}

export default ManagerOrderHistory;