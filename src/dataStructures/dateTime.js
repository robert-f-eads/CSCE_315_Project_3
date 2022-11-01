/**
 * @author Robert Eads
 */
class dateTime {
    private
        month = ""
        day = ""
        year = ""
        hour = ""
        minute = ""
        second = ""

    /**
     * Constructor for the dateTime class
     * @param {string} date date to be stored (mm-dd-yyyy) 
     * @param {string} time time to be stored (hh:mm:ss)
     */
    constructor(date, time = "00:00:00") {
        let dateParts = date.split("-")
        this.month = dateParts[0]
        this.day = dateParts[1]
        this.year = dateParts[2]

        let timeParts = time.split(":")
        this.hour = timeParts[0]
        this.minute = timeParts[1]
        this.second = timeParts[2]
    }

    //Getters
    /**
     * Gets the stored month
     * @return {string} two digit month code representing the stored month
     */
    get getMonth() {return this.month}
    /**
     * Gets the stored day
     * @return {string} two digit day representing the stored day
     */
    get getDay() {return this.day}
    /**
     * Gets the stored year
     * @return {string} four digit year representing the stored year
     */
    get getYear() {return this.year}
    /**
     * Gets the stored hour
     * @return {string} two digit hour code representing the stored hour
     */
    get getHour() {return this.hour}
    /**
     * Gets the stored minute
     * @return {string} two digit minute code representing the stored minute
     */
    get getMinute() {return this.minute}
    /**
     * Gets the stored seconds
     * @return {string} two digit second code representing the stored seconds
     */
    get getSecond() {return this.second}

    //Setters
    /**
     * Sets the stored month
     * @param {string} month two digit month code of new month 
     */
    set setMonth(month) {this.month = month}
    /**
     * Sets the stored day
     * @param {string} day two digit day code of new day
     */
    set setDay(day) {this.day = day}
    /**
     * Sets the stored year
     * @param {string} year four digit year representation of new year
     */
    set setYear(year) {this.year = year}
    /**
     * Sets the stored hour
     * @param {string} hour two digit code of new hour
     */
    set setHour(hour) {this.hour = hour}
    /**
     * Sets the stored minute
     * @param {string} minute two digit code of new minute
     */
    set setMinute(minute) {this.minute = minute}
    /**
     * Sets the stored seconds
     * @param {string} second two digit code of new seoncds
     */
    set setSecond(second) {this.second = second}


    //Methods
    /**
     * Converts the stored date into database ready format
     * @returns {string} stored date in format yyyy-mm-dd 
     */
    formatDate() {return `${this.year}-${this.month}-${this.day}`}
    /**
     * Converts the stored date and time into database ready format
     * @returns {string} stored date and time in format yyyy-MM-dd hh:mm:ss
     */
    formatDateTime() {return `${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}:${this.second}`}
    /**
     * Converts the stored time into database ready format
     * @returns {string} stored time in format hh:mm:ss
     */
    formatTimeOfDay() {return `${this.hour}-${this.minute}-${this.second}`}
    /**
     * Formats proper time code for the start of the day
     * @returns {string} start of the day in format hh:mm:ss
     */
    formatStartOfDay() {return '00:00:00'}
    /**
     * Formats proper time code for the end of the day
     * @returns {string} end of the day in format hh:mm:ss
     */
    formatEndOfDay() {return '23:59:59'}
}

export default dateTime