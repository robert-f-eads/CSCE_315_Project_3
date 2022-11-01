import {dateTime, orderItem} from "./dataStructuresExports"

/**
 * @author Robert Eads
 */
class orderTicket {
    private
        id = -1
        timestamp = null
        customerFirstName = ""
        rewardsMemberId = 0
        employeeId = -1
        orderPriceTotal = -1
        items = []

    /**
     * Constructor for the orderTicket class
     * @param {int} id id of the order ticket
     * @param {dateTime} timestamp date and time at which the order ticket was created
     * @param {string} customerFirstName first name of customer
     * @param {int} rewardsMemberId rewards id of the customer (if applicable)
     * @param {int} employeeId id of the employee taking the order
     * @param {double} orderPriceTotal total cost of the order ticket
     * @param {orderItem[]} items array of items in the order
     */
    constructor(id, timestamp, customerFirstName, rewardsMemberId, employeeId, orderPriceTotal, items) {
        this.id = id
        this.timestamp = timestamp
        this.customerFirstName = customerFirstName
        this.rewardsMemberId = rewardsMemberId
        this.employeeId = employeeId
        this.orderPriceTotal = orderPriceTotal
        this.items = items
    }

    //Getters
    /**
     * Gets the id of the order ticket
     * @return {int} the id of the order ticket
     */
    get getId() {return this.id}
    /**
     * Gets the time the order was made
     * @return {dateTime} the time the order was made
     */
    get getTimestamp() {return this.timestamp}
    /**
     * Gets the first name of the customer who made the order
     * @return {string} the first name of the customer who made the order
     */
    get getCustomerFirstName() {return this.customerFirstName}
    /**
     * Gets the rewards member id associated with the customer
     * @return {int} the rewards member id associated with the customer
     */
    get getRewardsMemberId() {return this.rewardsMemberId}
     /**
     * Gets the id of the employee who took the order
     * @return {int} the id of the employee who took the order
     */
    get getEmployeeId() {return this.employeeId}
     /**
     * Gets the total price of the order
     * @return {double} the total price of the order
     */
    get getOrderPriceTotal() {return this.orderPriceTotal}
    /**
     * Gets an array of orderItem objects which are in the current order ticket
     * @return {orderItem[]} an array of orderItem objects which are in the current order ticket
     */
    get getItems() {return this.items}

    //Setters
    /**
     * Sets id for the ticket
     * @param {int} id orderId for the ticket
     */
    set setId(id) {this.id = id}
    /**
     * Sets the time which the ticket order was placed
     * @param {dateTime} timestamp the time which the ticket order was placed
     */
    set setTimestamp(timestamp) {this.timestamp = timestamp}
    /**
     * Sets the first name of the customer who made the order
     * @param {string} customerFirstName the first name of the customer who made the order
     */
    set setCustomerFirstName(customerFirstName) {this.customerFirstName = customerFirstName}
    /**
     * Sets the rewards member id associated with the customer
     * @param {int} rewardsMemberId the rewards member id associated with the customer
     */
    set setRewardsMemberId(rewardsMemberId) {this.rewardsMemberId = rewardsMemberId}
    /**
     * Sets the employee id of the employee who took the order
     * @param {int} employeeId the employee id of the employee who took the order
     */
    set setEmployeeId(employeeId) {this.employeeId = employeeId}
    /**
     * Sets the total price of the order ticket
     * @param {double} orderPriceTotal the total price of the order ticket
     */
    set setOrderPriceTotal(orderPriceTotal) {this.orderPriceTotal = orderPriceTotal}
    /**
     * Sets the items array of this orderTicket to a passed in array 
     * @param {orderItem[]} items an array of items to set the items to in this orderTicket
     */
    set setItems(items) {this.items = items}

    //Methods
    /**
     * Adds an item to the orderTicket
     * @param {orderItem} item the item to be added to this orderTicket 
     */
    addItemToOrder(item) {this.items.push(item)}
    /**
     * Remove an item from the orderTicket
     * @param {orderItem} item the item to be removed from the orderTicket 
     */
    removeItemFromOrder(item) {
        let index = this.items.indexOf(item)
        if(index > -1) {this.items.splice(index, 1)}
    }
}

export default orderTicket