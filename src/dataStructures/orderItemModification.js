/**
 * @author Robert Eads
 */
class orderItemModification {
    private
        id = -1
        orderId = -1
        itemNumberInOrder = -1
        ingredientId = -1
        ingredientName = ""
    
    /**
     * Constructor for orderItemModification class
     * @param {int} id id of the modification
     * @param {int} orderId id of the order this modification is a part of
     * @param {int} itemNumberInOrder the idex of the item in the order this modification applies to 
     * @param {int} ingredientId id of the ingredient this modification represents
     * @param {string} ingredientName name of the ingredient this modification represents
     */
    constructor(id, orderId, itemNumberInOrder, ingredientId, ingredientName) {
        this.id = id
        this.orderId = orderId
        this.itemNumberInOrder = itemNumberInOrder
        this.ingredientId = ingredientId
        this.ingredientName = ingredientName
    }

    //Getters
    /**
     * Gets the id of the order item modification
     * @return {int} the id of the order item modification
     */
    get getId() {return this.id}
     /**
     * Gets the id of the order ticket this modification is a part of
     * @return {int} the id of the order ticket this modification is a part of
     */
    get getOrderId() {return this.orderId}
    /**
     * Gets the index of the item in the order ticket this modification applies to
     * @return {int} the index of the item in the order ticket this modification applies to
     */
    get getItemNumberInOrder() {return this.itemNumberInOrder}
    /**
     * Gets the id of the ingredient brepresented in this modification
     * @return {int} the id of the ingredient being used to modify an order item
     */
    get getIngredientId() {return this.ingredientId}
    /**
     * Gets the name of the ingredient represented in this modification
     * @return {string} the name of the ingredient being used to modify the order item
     */
    get getIngredientName() {return this.ingredientName}

    //Setters
    /**
     * Sets the id of the order item modification
     * @param {int} id the id of the order item modification
     */
    set setId(id) {this.id = id}
    /**
     * Sets the id of the order this modification is a part of
     * @param {int} orderId the id of the order this modification is a part of
     */
    set setOrderId(orderId) {this.orderId = orderId}
     /**
     * Sets the index of the item in the order ticket this modification applies to
     * @param {int} itemNumberInOrder the index of the item in the order ticket this modification applies to
     */
    set setItemNumberInOrder(itemNumberInOrder) {this.itemNumberInOrder = itemNumberInOrder}
     /**
     * Sets the id of the ingredient being used to modify the order item
     * @param {int} ingredientId the id of the ingredient being used to modify the order item
     */
    set setIngredientId(ingredientId) {this.ingredientId = ingredientId}
    /**
     * Sets the name of the ingredient being used to modify the order item
     * @param {string} ingredientName the name of the ingredient being used to modify the order item
     */
    set setIngredientName(ingredientName) {this.ingredientName = ingredientName}

    //Methods
    /**
     * Determine whether this order item modification is that same as another
     * @param {orderItemModification} otherModification the modification to compare to
     * @returns whether this modification is the same as another
     */
    equals(otherModification) {
        if(otherModification === this) {return true}
        if(!(otherModification instanceof orderItemModification)) {return false}
        if(otherModification.getIngredientId = this.ingredientId) {return true}
        return false
    }
    /**
     * Copy other modification to this modification
     * @param {orderItemModification} otherModification modification to be copied 
     */
    copy(otherModification) {
        this.id = otherModification.getId
        this.orderId = otherModification.getOrderId
        this.itemNumberInOrder = otherModification.getItemNumberInOrder
        this.ingredientId = otherModification.getIngredientId
        this.getIngredientName  = otherModification.getIngredientName
    }
}

export default orderItemModification