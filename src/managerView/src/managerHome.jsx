import '../styles/managerHome.css';

import ManagerSideBar from './managerSideBar';
import GenericTable from './genericTable';
import AddProductForm from './addProductForm';
import { useState } from 'react';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import { generateRestockReport, getTable, increaseIngredientQuantity } from '../../databaseConnections/managerViewFunctions';
import { getProductsByName, getIngredientsByName } from '../../databaseConnections/sharedFunctions';
import SalesButton from './salesButton';
import ExcessButton from './excessButton';
import { useRouteLoaderData } from 'react-router-dom';

function ManagerHome() {
    const [inventoryVisible, setInventoryVisible] = useState(false);
    const [orderHistoryVisible, setOrderHistoryVisible] = useState(false);
    const [trendsVisible, setTrendsVisible] = useState(false);
    const [salesVisible, setSalesVisible] = useState(false);
    const [excessVisible, setExcessVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [reorderVisible, setReorderVisible] = useState(false);
    const [products, setProducts] = useState();
    const [ingredients, setIngredients] = useState();
    const [orders, setOrders] = useState();
    const [restock, setRestock] = useState();
    const [selectedInTable, setSelectedInTable] = useState();

    const [reloadPage, setReloadPage] = useState(false);

    useEffect(() => {
        getTable("products").then(res => {
            setProducts(res);
        });
        getTable("ingredients").then(res => {
            setIngredients(res);
        });
        getTable("ordertickets").then(res => {
            setOrders(res);
        });
        generateRestockReport().then(res => {
            console.log(res);
            setRestock(res);
        });
        console.log('using effect to load manager home')
    }, [reloadPage]);

    return (
        <>
            <div id="managerHomeContainer">
                <ManagerSideBar
                    setInventoryVisible={setInventoryVisible}
                    setOrderHistoryVisible={setOrderHistoryVisible}
                    setTrendsVisible={setTrendsVisible}
                    setAddVisible={setAddVisible}
                    setReorderVisible={setReorderVisible}
                />
                <div id="contentContainer">
                    {inventoryVisible ? 
                        <>
                            <SearchBar
                                onClickFunction={(searchText) => {
                                    getIngredientsByName(searchText).then(res => {
                                        setIngredients(res);
                                    });
                                }}
                            />
                            <GenericTable tableName="Ingredients" tableInfo={ingredients} />
                        </>
                        : <></>
                    }
                    {orderHistoryVisible ? <GenericTable tableName="Order History" tableInfo={orders} /> : <></>}
                    {trendsVisible ?
                        <>
                            <div id='managerTrendsButtonsContainer'>
                                <SalesButton setSalesVisible={() => {setExcessVisible(false); setSalesVisible(true);}}/>
                                <ExcessButton setExcessVisible={() => {setSalesVisible(false); setExcessVisible(true);}}/>
                            </div>
                        </>
                        : <></>
                    }
                    {salesVisible ? <GenericTable tableName="Order History" tableInfo={orders} /> : <></>}
                    {excessVisible ? <GenericTable tableName="Order History" tableInfo={orders} /> : <></>}
                    {addVisible ? 
                        <>
                            <SearchBar
                                onClickFunction={(searchText) => {
                                    getProductsByName(searchText).then(res => {
                                        setProducts(res);
                                    });
                                }}
                            />
                            <GenericTable tableName="Products" tableInfo={products} />
                            <AddProductForm ingredientOptions={ingredients} />
                        </>
                        : <></>
                    }
                    {reorderVisible ?
                        <>
                            <GenericTable tableName="Restock Report" tableInfo={restock} setSelectedInTable={setSelectedInTable} />
                            <button onClick={() => {
                                let ingredientUpdates = []
                                for(let i = 0; i < selectedInTable?.length; i++) {
                                    let id = selectedInTable[i];
                                    let amountUnderTarget = restock[id]['Amount Under Target'];
                                    ingredientUpdates.push({'id': id, 'amountUnderTarget': amountUnderTarget});
                                }
                                Promise.all(ingredientUpdates.map(async ingredientUpdate => {
                                    await increaseIngredientQuantity(ingredientUpdate.id, ingredientUpdate.amountUnderTarget)
                                })).then(() => {
                                    setReloadPage(!reloadPage);
                                })
                            }}>Reorder Selected</button>
                        </>
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default ManagerHome;