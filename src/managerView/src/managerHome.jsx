import '../styles/managerHome.css';

import ManagerSideBar from './managerSideBar';
import GenericTable from './genericTable';
import AddProductForm from './addProductForm';
import { useState } from 'react';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import { getTable } from '../../databaseConnections/managerViewFunctions';
import { getProductsByName, getIngredientsByName } from '../../databaseConnections/sharedFunctions';

function ManagerHome() {
    const [inventoryVisible, setInventoryVisible] = useState(false);
    const [orderHistoryVisible, setOrderHistoryVisible] = useState(false);
    const [trendsVisible, setTrendsVisible] = useState(false);
    const [salesVisible, setSalesVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [products, setProducts] = useState();
    const [ingredients, setIngredients] = useState();
    const [orders, setOrders] = useState();

    useEffect(() => {
        getTable("products").then(res => {
            setProducts(res);
        });
        getTable("ordertickets").then(res => {
            setOrders(res);
        });
        getTable("ingredients").then(res => {
            setIngredients(res);
        });
    }, []);

    return (
        <>
            <div id="managerHomeContainer">
                <ManagerSideBar
                    setInventoryVisible={setInventoryVisible}
                    setOrderHistoryVisible={setOrderHistoryVisible}
                    setTrendsVisible={setTrendsVisible}
                    setSalesVisible={setSalesVisible}
                    setAddVisible={setAddVisible}
                />
                <div id="contentContainer">
                    {inventoryVisible ? 
                        <>
                            <GenericTable tableName="Ingredients" tableInfo={ingredients} />
                            <SearchBar
                                onClickFunction={(searchText) => {
                                    getIngredientsByName(searchText).then(res => {
                                        setIngredients(res);
                                    });
                                }}
                            />
                        </>
                        : <></>
                    }
                    {orderHistoryVisible ? <GenericTable tableName="Order History" tableInfo={orders} /> : <></>}
                    {trendsVisible ? <GenericTable tableName="Order History" tableInfo={orders} /> : <></>}
                    {salesVisible ? <GenericTable tableName="Order History" tableInfo={orders} /> : <></>}
                    {addVisible ? 
                        <>
                            <GenericTable tableName="Products" tableInfo={products} />
                            <SearchBar
                                onClickFunction={(searchText) => {
                                    getProductsByName(searchText).then(res => {
                                        setProducts(res);
                                    });
                                }}
                            />
                            <AddProductForm ingredientOptions={ingredients} />
                        </>
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default ManagerHome;