/**
 * Gets all data from the requested table with optional limit
 * @param {string} tableName name of the table to get data from
 * @param {int} limit maximum number of rows you want back (default is all)
 * @returns {json} data promise containing table data
 */
function getTable(tableName, limit = 0) {
    let queryString
    if(limit === 0) {
        queryString = `http://localhost:3001/table/${tableName}`
    }
    else {
        queryString = `http://localhost:3001/table/${tableName}?limit=${limit}`
    }
    return fetch(queryString)
        .then((res) => res.json())
        .catch((err) => {console.log(err.message)})
}


export {getTable}