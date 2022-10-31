import dateTime from "./dataStructuresExports"

/**
 * @author Robert Eads
 */
 class ingredient {
    private
        id = -1
        name = ""
        expirationDate = ""
        quantityRemaining = -1
        quantityTarget = -1
        measurementUnits = ""
        pricePerUnitLastOrder = -1
        lastorderDate = ""
        unitsInLastOrder = -1

    /**
     * Constructor for ingredient object
     * @param {int} id the id of the ingredient
     * @param {string} name the name of the ingredient
     * @param {dateTime} expirationDate the expiration date of the ingredient
     * @param {double} quantityRemaining the amount of the ingredient that is remaining
     * @param {double} quantityTarget the amount of the ingredient we want to have stocked at a minimum
     * @param {string} measurementUnits the units we use to measure the ingredient
     * @param {double} pricePerUnitLastOrder the price we payed per unit in our last order
     * @param {dateTime} lastOrderDate the last time we ordered more of this ingredient
     * @param {double} unitsInLastOrder the number of units which were in our last order
     */
    constructor(id, name, expirationDate, quantityRemaining, quantityTarget, measurementUnits, pricePerUnitLastOrder, lastorderDate, unitsInLastOrder) {
        this.id = id
        this.name = name
        this.expirationDate = expirationDate
        this.quantityRemaining = quantityRemaining
        this.quantityTarget = quantityTarget
        this.measurementUnits = measurementUnits
        this.pricePerUnitLastOrder = pricePerUnitLastOrder
        this.lastorderDate = lastorderDate
        this.unitsInLastOrder = unitsInLastOrder
    }

    //Getters
    /**
     * Gets the id of the ingredient
     * @return {int} the id of the ingredient
     */
    get getId() {return this.id}
    /**
     * Gets the name of the ingredient
     * @return {string} the name of the ingredient
     */
    get getName() {return this.name}
     /**
     * Gets the expiration date of the ingredient
     * @return {dateTime} the expiration date of the ingredient
     */
    get getExpirationDate() {return this.expirationDate}
    /**
     * Gets the amount of the ingredient we have remaining
     * @return {double} the amount of the ingredient we have remaining
     */
    get getQuantityRemaining() {return this.quantityRemaining}
    /**
     * Gets the amount of the ingredient we would like to have in stock at a minimum
     * @return {double} the amount of the ingredient we would like to have in stock at a minimum
     */
    get getQuantityTarget() {return this.quantityTarget}
    /**
     * Gets the units we use to measure the ingredient
     * @return {string} the units we use to measure the ingredient
     */
    get getMeasurementUnits() {return this.measurementUnits}
    /**
     * Gets the price per unit we paid in our last order
     * @return {double} the price per unit we paid in our last order
     */
    get getPricePerUnitLastOrder() {return this.pricePerUnitLastOrder}
    /**
     * Gets the last date we ordered more of this ingredient
     * @return {dateTime} the last date we ordered more of this ingredient
     */
    get getLastOrderDate() {return this.lastorderDate}
    /**
     * Gets the amount of the ingredient we bought in the last order
     * @return {double} the amount of the ingredient we bought in the last order
     */
    get getUnitsInLastOrder() {return this.unitsInLastOrder}

    //Setters
    /**
     * Sets the id of the ingredient
     * @param {int} id the id of the ingredient
     */
    set setId(id) {this.id = id}
    /**
     * Sets the name of the ingredient
     * @param {string} name the name of the ingredient
     */
    set setName(name) {this.name = name}
     /**
     * Sets the date that the ingredient will expire in our stock
     * @param {dateTime} expirationDate the date that the ingredient will expire in our stock
     */
    set setExpirationDate(expirationDate) {this.expirationDate = expirationDate}
    /**
     * Sets the amount of the ingredient we have remaining
     * @param {double} quantityRemaining the amount of the ingredient we have remaining
     */
    set setQuantityReamining(quantityRemaining) {this.quantityRemaining = quantityRemaining}
    /**
     * Sets the amount of the ingredient we want to have on hand
     * @param {double} quantityTarget the amount of the ingredient we want to have on hand
     */
    set setQuantityTarget(quantityTarget) {this.quantityTarget = quantityTarget}
   /**
     * Sets the units we use to measure this ingredient
     * @param {string} measurementUnits the units we use to measure this ingredient
     */
    set setMeasurementUnits(measurementUnits) {this.measurementUnits = measurementUnits}
    /**
     * Sets the price we paid per unit in our last order
     * @param {double} pricePerUnitLastOrder the price we paid per unit in our last order
     */
    set setPricePerUnitLastOrder(pricePerUnitLastOrder) {this.pricePerUnitLastOrder = pricePerUnitLastOrder}
    /**
     * Sets the last date we ordered this ingredient
     * @param {dateTime} lastOrderDate the last date we ordered this ingredient
     */
    set setLastOrderDate(lastOrderDate) {this.lastorderDate = lastOrderDate}
    /**
     * Sets the number of units in the last order we made
     * @param {double}unitsInLastOrder the number of units in the last order we made
     */
    set setUnitsInLastOrder(unitsInLastOrder) {this.unitsInLastOrder = unitsInLastOrder}
    
    //Methods
    /**
     * Determine whether this ingredient and an arbitrary object are equal
     * @param {ingredient} otherIngredient an object to compare this ingredient against
     * @return {boolean} whether this ingredient is equal to another
     */
    equals(otherIngredient) {
        if(otherIngredient === this) {return true}
        if(!(otherIngredient instanceof ingredient)) {return false}
        if(otherIngredient.getId === id) {return true}
        return false
    }
}

export default ingredient