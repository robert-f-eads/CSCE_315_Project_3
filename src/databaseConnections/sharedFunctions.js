/**
 * Gets products from the database that contain or equal the given name
 * @param {string} partialName partial name of a product to search for
 * @returns data promise containing results data
 */
function getProductsByName(partialName) {
    let queryString = `http://localhost:3001/searchProducts/${partialName}`
    return fetch(queryString)
        .then((res) => res.json())
        .catch((err) => {console.log(err.message)})
}

export {getProductsByName}