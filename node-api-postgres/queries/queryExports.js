const {getTable, generateSalesReport,} = require('./managerQueries')
const {
    searchProducts,
    searchIngredients, 
    insertNewTicket, 
    insertNewOrderItem, 
    insertNewItemAddition, 
    insertNewOrderSubtraction, 
    loginEmployee,
    loginRewardsMember,
    updateIngredient,
} = require('./commonQueries')


module.exports = {
    getTable,
    searchProducts,
    searchIngredients, 
    insertNewTicket, 
    insertNewOrderItem, 
    insertNewItemAddition, 
    insertNewOrderSubtraction, 
    loginEmployee,
    loginRewardsMember,
    updateIngredient,
    generateSalesReport,
}