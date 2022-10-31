import {useState} from 'react';
import {getTable, getProductsByName} from './exports'

const DbApp = () => {
    const [posts, setPosts] = useState([]);

    function getURL() {
        let name = document.getElementById('pName').value
        //getProductsByName(name).then((data) => {setPosts(data)})
        //getTable(name, 5).then((data) => {setPosts(data)})
    }
    
    return (
        
        <div>
            <form>
                <label for="product name">Product Name:</label><br/>
                <input type="text" id="pName" name="product name" placeholder='Search' onKeyDown={(e) => {
                    if(e.key === "Enter") {
                        e.preventDefault()
                        document.getElementById("testButton").click()
                    }
                }}/>
                
                <button id="testButton" type="button" onClick={getURL}>Search</button>
            </form>
            <p>Data below me</p>
            {posts && posts.length>0 && posts.map((item)=> <div>
                                <h2>Product Name: {item.name}</h2> 
                                <p>Product Id: {item.id} Product Price: {item.price}</p>
                                </div>)}
            <p>Data above me</p>
        </div>   
    )

}

export default DbApp