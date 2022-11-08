import '../styles/managerHome.css';

import ManagerSideBar from './managerSideBar';
import GenericTable from './genericTable';
import { useState } from 'react';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import { getTable } from '../../databaseConnections/managerViewFunctions';
import { getProductsByName } from '../../databaseConnections/sharedFunctions';

function ManagerHome() {
    const [inventoryVisible, setInventoryVisible] = useState(false);
    const [orderHistoryVisible, setOrderHistoryVisible] = useState(false);
    const [products, setProducts] = useState();
    const [orders, setOrders] = useState();

    useEffect(() => {
        getTable("products").then(res => {
            setProducts(res);
        });
        getTable("ordertickets").then(res => {
            setOrders(res);
        });
    }, []);

    return (
        <>
            <div id="managerHomeContainer">
                <ManagerSideBar setInventoryVisible={setInventoryVisible} setOrderHistoryVisible={setOrderHistoryVisible} />
                <div id="contentContainer">
                    {
                        inventoryVisible ? 
                        <>
                            <GenericTable tableName="Products" tableInfo={products} />
                            <SearchBar
                                onClickFunction={(searchText) => {
                                    getProductsByName(searchText).then(res => {
                                        setProducts(res);
                                        console.log(res);
                                    });
                                }}/>
                        </>
                        : <></>
                    }
                    {orderHistoryVisible ? <GenericTable tableName="Order History" tableInfo={orders} /> : <></>}
                </div>
            </div>
        </>
    )
}

export default ManagerHome;