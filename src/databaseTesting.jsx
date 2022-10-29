import {useState} from 'react';

const DbApp = () => {
    const [posts, setPosts] = useState([]);

    function getURL() {
        let name = document.getElementById('pName').value
        
        fetch(`http://localhost:3001/data/${name}?number=5`)
        .then((res) => res.json())
        .then((data) => {
            setPosts(data)
        })
        .catch((err) => {
            console.log(err.message);
        });
    
    }

    /*var searchBar = document.getElementById("pName")
    searchBar.addEventListener("keypress", (event) => {
        //let keyCode - event.
        if(event.keyCode === 13) {
            document.getElementById("testButton").click()
        }
    })*/
    

    return (
        
        <div>
            <form>
                <label for="product name">Product Name:</label><br/>
                <input type="text" id="pName" name="product name" placeholder='Search' onKeyDown={(e) => {
                    if(e.key === "Enter") {
                        //alert("Worked")
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