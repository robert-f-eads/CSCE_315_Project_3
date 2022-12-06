const {
    getTable, 
    generateSalesReport,
    generateRestockReport,
    addProduct,
    addProductIngredient,
    generateExcessReport,
    increaseIngredientQuantity,
    translateText,
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
    translateText,
    generateSalesReport,
    generateRestockReport,
    addProduct,
    addProductIngredient,
    generateExcessReport,
    getIngredinetsForProduct,
    createRewardsMember,
    googleAuth,
}