/**
 * @author Robert Eads
 */
class orderItem {
    private
        id = -1
        orderId = -1
        itemNumberInOrder = -1
        itemAmount = -1
        itemSize = -1
        additions = []
        subtractions = []
        product = null

    /**
     * Constructor for orderItem class
     * @param {int} id id of the item on the order ticket
     * @param {int} orderId id of ther order this item is part of
     * @param {int} itemNumberInOrder the index of this item in the order ticket
     * @param {int} itemAmount number of this specific item in the order ticket
     * @param {int} itemSize size of the item (20, 32, 40s)
     * @param {product} product the product that this item represents
     */
    constructor(id, orderId, itemNumberInOrder, itemAmount, itemSize, product) {
        this.id = id
        this.orderId = orderId
        this.itemNumberInOrder = itemNumberInOrder
        this.itemAmount = itemAmount
        this.itemSize = itemSize
        this.product = product
    }

    //Getters
    /**
     * Gets the id of the order item
     * @return {int} the id of the order item
     */
    get getId() {return this.id}
    /**
     * Gets the order id of the order ticket this item is a part of 
     * @return {int} the order id of the order ticket this item is a part of 
     */
    get getOrderId() {return this.orderId}
    /**
     * Gets the index of the item in the order ticket
     * @return {int} the index of the item in the order ticket
     */
    get getItemNumberInOrder() {return this.itemNumberInOrder}
    /**
     * Gets the count of this specific item in the order ticket
     * @return {int} the count of this specific item in the order ticket
     */
    get getItemAmount() {return this.itemAmount}
    /**
     * Gets the size of the item
     * @return {int} the size of the item
     */
    get getItemSize() {return this.itemSize}
    /**
     * Gets the additions to the default item
     * @return {orderItemModification[]} the additions to the default item
     */
    get getAdditions() {return this.additions}
     /**
     * Gets the subtractions from the default item
     * @return {orderItemModification[]} the subtractions from the default item
     */
    get getSubtractions() {return this.subtractions}
    /**
     * Gets the product represented by this item
     * @return {product} product object that this item represents
     */
    get getProduct() {return this.product}

    //Setters
    /**
     * Sets the id of the order item
     * @param {int} id the id of the order item
     */
    set setId(id) {this.id = id}
    /**
     * Sets the order id of the order ticket this item is a part of 
     * @param {int} orderId the order id of the order ticket this item is a part of 
     */
    set setOrderId(orderId) {this.orderId = orderId}
    /**
     * Sets the index of the item in the order
     * @param {int} itemNumberInOrder the index of the item in the order
     */
    set setItemNumberInOrder(itemNumberInOrder) {this.itemNumberInOrder = itemNumberInOrder}
    /**
     * Sets the count of the item in the order ticket
     * @param {int} itemAmount the count of the item in the order ticket
     */
    set setItemAmount(itemAmount) {this.itemAmount = itemAmount}
     /**
     * Sets the size of the item
     * @param {int} itemSize the size of the item
     */
    set setItemSize(itemSize) {this.itemSize = itemSize}
    /**
     * Sets the additions for this orderItem
     * @param {orderItemModification[]} additions array of additions for this product
     */
    set setAdditions(additions) {this.additions = additions}
    /**
     * Sets the subtractions for this orderItem
     * @param {orderItemModification[]} subtractions array of subtractions for this product
     */
    set setSubtractions(subtractions) {this.subtractions = subtractions}
    /**
     * Sets the product that this item is representing
     * @param {product} product the new product this item represents
     */
    set setProduct(product) {this.product = product}

    //Methods
    /**
     * Adds an addition to the item
     * @param {orderItemModification} addition addition modification to be added to this item
     */
    addAddition(addition) {this.additions.push(addition)}
    /**
     * Removes an addition from the item
     * @param {orderItemModification} addition addition modification to be removed from this item
     */
    removeAddition(addition) {
        let index = this.additions.indexOf(addition)
        if(index > -1) {this.additions.splice(index, 1)}
    }
    /**
     * Adds a subtraction to the item
     * @param {orderItemModification} subtraction subtraction modification to be added to this item 
     */
    addSubtraction(subtraction) {this.subtractions.push(subtraction)}
    /**
     * Removes a subtraction from the item
     * @param {orderItemModification} subtraction subtraction modification to be removed from this item 
     */
    removeSubtraction(subtraction) {
        let index = this.subtractions.indexOf(subtraction)
        if(index > -1) {this.subtractions.splice(index, 1)}
    }
    /**
     * Checks if subractions exists in the item
     * @param {orderItemModification} targetSubraction target subtraction modification to be searched for
     * @returns {int} index of item if found, if not -1
     */
    findSubtraction(targetSubraction) {
        if(this.subtractions.length === 0) {return -1}
        for(var i = 0; i < this.subtractions.length; i++) {
            if(targetSubraction.ingredientId === this.subtractions.at(i).ingredientId) {return i}
        }
        return -1
    }
    /**
     * Updates the number in order of the item and modifications 
     * @param {int} newIndex new item number in the order 
     */
    updateNumberInOrder(newIndex) {
        this.itemNumberInOrder = newIndex
        if(this.additions.length > 0) this.additions.forEach(element => {element.setItemNumberInOrder = newIndex})
        if(this.subtractions.length > 0) this.subtractions.forEach(element => {element.setItemNumberInOrder = newIndex})
    }
}

export default orderItem