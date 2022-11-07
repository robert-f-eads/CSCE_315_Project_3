import apiURL from './sharedInfo'
import {runFetch} from "./sharedFunctions"

/**
 * Gets all data from the requested table with optional limit
 * @param {string} tableName name of the table to get data from
 * @param {int} limit maximum number of rows you want back (default is all)
 * @returns {json} data promise containing table data
 */
async function getTable(tableName, limit = 0) {
    let queryString
    if(limit === 0) {
        queryString = `${apiURL}/table/${tableName}`
    }
    else {
        queryString = `${apiURL}/table/${tableName}?limit=${limit}`
    }
    return await runFetch(queryString)
}

export {getTable}