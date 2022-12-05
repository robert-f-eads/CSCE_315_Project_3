const {
    getTable, 
    generateSalesReport,
    generateRestockReport,
    addProduct,
    addProductIngredient,
    generateExcessReport,
    increaseIngredientQuantity,
} = require('./managerQueries')

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
    getIngredinetsForProduct,
    createRewardsMember,
    googleAuth,
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
    increaseIngredientQuantity,
    generateSalesReport,
    generateRestockReport,
    addProduct,
    addProductIngredient,
    generateExcessReport,
    getIngredinetsForProduct,
    createRewardsMember,
    googleAuth,
}