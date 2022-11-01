const {getTable} = require('./managerQueries')
const {searchProducts, insertNewTicket, insertNewOrderItem} = require('./commonQueries')

module.exports = {
    getTable,
    searchProducts,
    insertNewTicket,
    insertNewOrderItem,
}