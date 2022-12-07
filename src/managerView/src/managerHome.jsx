import '../styles/managerHome.css';

import ManagerSideBar from './managerSideBar';
import GenericTable from './genericTable';
import AddProductForm from './addProductForm';
import { useState } from 'react';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import { generateExcessReport, generateRestockReport, generateSalesReport, getTable, increaseIngredientQuantity } from '../../databaseConnections/managerViewFunctions';
import { getProductsByName, getIngredientsByName } from '../../databaseConnections/sharedFunctions';
import SalesButton from './salesButton';
import ExcessButton from './excessButton';
import DateSelector from './dateSelector';

function getFormattedDate(date) {
    const year = date['$y'] 
    const month = ((Number(date['$M']) + 1) + '').padStart(2, '0')
    const day = (date['$D'] + '').padStart(2, '0')
    const formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
}

function ManagerHome(props) {
    const {userData, language} = props;

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
    const [sales, setSales] = useState();
    const [excess, setExcess] = useState();

    const [selectedInTable, setSelectedInTable] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [reloadPage, setReloadPage] = useState(false);

    useEffect(() => {
        if(userData[3]) {
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
                setRestock(res);
            });
            generateSalesReport().then(res => {
                setSales(res);
            });
            generateExcessReport().then(res => {
                setExcess(res);
            });
        } else {
            alert('Access Not Granted');
        }
    }, [reloadPage]);

    return (
        <>
            <div id="managerHomeContainer">
                <ManagerSideBar
                    setInventoryVisible={setInventoryVisible}
                    setOrderHistoryVisible={setOrderHistoryVisible}
                    setTrendsVisible={setTrendsVisible}
                    setSalesVisible={setSalesVisible}
                    setExcessVisible={setExcessVisible}
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
                            <GenericTable tableName="Ingredients" tableInfo={ingredients} language={language}/>
                        </>
                        : <></>
                    }
                    {orderHistoryVisible ? <GenericTable tableName="Order History" tableInfo={orders} language={language}/> : <></>}
                    {trendsVisible ?
                        <>
                            <div id='managerTrendsButtonsContainer'>
                                <SalesButton setSalesVisible={() => {setExcessVisible(false); setSalesVisible(true);}}/>
                                <ExcessButton setExcessVisible={() => {setSalesVisible(false); setExcessVisible(true);}}/>
                            </div>
                        </>
                        : <></>
                    }
                    {salesVisible || excessVisible ?
                        <>
                            <div id='managerDateSelectorContainer'>
                                <DateSelector label='Start Date' setSelectedDate={setStartDate} />
                                <DateSelector label='End Date' setSelectedDate={setEndDate} />
                            </div>
                            <button onClick={() => {
                                if (!startDate || !endDate) {
                                    if(salesVisible) {
                                        generateSalesReport().then(res => {
                                            setSales(res);
                                        });
                                    } else {
                                        generateExcessReport().then(res => {
                                            setExcess(res);
                                        })
                                    }
                                } else {
                                    const formattedStartDate = getFormattedDate(startDate) + ' 00:00:00'
                                    const formattedEndDate = getFormattedDate(endDate) + ' 23:59:59'
                                    if(salesVisible) {
                                        generateSalesReport(formattedStartDate, formattedEndDate).then(res => {
                                            setSales(res);
                                        });
                                    } else {
                                        generateExcessReport(formattedStartDate, formattedEndDate).then(res => {
                                            setExcess(res);
                                        })
                                    }
                                }
                            }}>Generate for Dates</button>
                        </>
                        : <></>
                    }
                    {salesVisible ?
                        <>
                            <GenericTable tableName="Sales" tableInfo={sales} language={language}/>
                        </>
                        : <></>}
                    {excessVisible ? <GenericTable tableName="Excess" tableInfo={excess} language={language}/> : <></>}
                    {addVisible ? 
                        <>
                            <SearchBar
                                onClickFunction={(searchText) => {
                                    getProductsByName(searchText).then(res => {
                                        setProducts(res);
                                    });
                                }}
                            />
                            <GenericTable tableName="Products" tableInfo={products} language={language}/>
                            <AddProductForm ingredientOptions={ingredients} />
                        </>
                        : <></>
                    }
                    {reorderVisible ?
                        <>
                            <GenericTable tableName="Restock Report" tableInfo={restock} setSelectedInTable={setSelectedInTable} language={language}/>
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