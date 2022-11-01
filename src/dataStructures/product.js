import ingredient from "./dataStructuresExports"

/**
 * @author Robert Eads
 */
class product {
    private
        id = -1
        name = ""
        price = -1
        ingredients = []

    /**
     * Constructor for product object
     * @param {int} id id of the product
     * @param {string} name name of the product
     * @param {double} price price of the product
     * @param {ingredient[]} ingredients ingredients in product
     */
    constructor(id, name, price, ingredients) {
        this.id = id
        this.name = name
        this.price = price
        this.ingredients = ingredients
    }

    //Getters
    /**
     * Gets the id of the product
     * @return {int} the id of the product
     */
    get getId() {return this.id}
    /**
     * Gets the name of the product
     * @return {string} the name of the product
     */
    get getName() {return this.name}
    /**
     * Gets the price of the product
     * @return {double} the price of the product
     */
    get getPrice() {return this.price}
    /**
     * Gets the ingredients that make up this product
     * @return {ingredient[]} the ingredients that make up this product
     */
    get getIngredients() {return this.ingredients}


    //Setters
    /**
     * Sets the id of the product
     * @param {int} id the id of the product
     */
    set setId(id) {this.id = id}
    /**
     * Sets the name of the product
     * @param {string} name the name of the product
     */
    set setName(name) {this.name = name}
    /**
     * Sets the price of the product
     * @param {double} price the price of the product
     */
    set setPrice(price) {this.price = price}
    /**
     * Sets the ingredients array of this product to a passed in array
     * @param {ingredient[]} ingredients an array of ingredients to use to set the ingredients for this product
     */
    set setIngredients(ingredients) {this.ingredients = ingredients}
    
    //Methods
     /**
     * Adds an ingredient to this product
     * @param {ingredient} ingredientAdded the ingredient to be added to the product
     */
    addIngredient(ingredient) {this.ingredients.push(ingredient)}
    /**
     * Removes an ingredient from this product
     * @param {ingredient} ingredientRemoved the ingredient to be removed from the product
     */
    removeIngredient(ingredient) {
        let index = this.ingredients.indexOf(ingredient)
        if(index > -1) {this.ingredients.splice(index, 1)}
    }
}

export default product