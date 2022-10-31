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

function getProductsByName(partialName) {
    let queryString = `http://localhost:3001/searchProducts/${partialName}`
    return fetch(queryString)
        .then((res) => res.json())
        .catch((err) => {console.log(err.message)})
}

export {getTable, getProductsByName}