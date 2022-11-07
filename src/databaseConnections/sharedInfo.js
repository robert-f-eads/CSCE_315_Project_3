const productionBuild = false

var apiURL;
if(productionBuild) {apiURL = "https://node-api-postgres.onrender.com"}
else {apiURL = "http://localhost:3001"}


export default apiURL