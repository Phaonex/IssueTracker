/** A simple due time calculator function.
 * @description using simple functions to calculate many date to due time based on a single max of tunarround hour. 
 * @param {[{date: string, time: string}]} submit the dates to be used in the single tournArround calculation.
 * @param {number} turnArround
 * @returns {string[]}
*/
function calculatedDueDate(submit = [{date: "3 October 2023", time: "14:00"}], turnArround = 0){
    // assert.isDateObject(date) for TDD chekcs.
    /**
     *@description defining the dateObjec to easy access date parts.
     *@typedef {{day: number, month: number, year: number, hour: number, minute: number, weekday: string}} dateObject
     */

    /**
      * @description date formated according to germans speaking countries.
    */
    const formaDate = new Intl.DateTimeFormat("de", { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long', hour: "numeric", minute: "numeric", hour12: false });

    // A real implementation would required an API of a Date library.
    /**
     * @description Austria based holy days array of objects for dates checking.
     */
    const austriaHolyDays = [
        {day: 1, month: 1},
        {day: 6, month: 1},
        {day: 10, month: 4},
        {day: 1, month: 5},
        {day: 29, month: 5},
        {day: 8, month: 6},
        {day: 15, month: 8},
        {day: 26, month: 10},
        {day: 1, month: 11},
        {day: 8, month: 12},
        {day: 25, month: 12},
        {day: 26, month: 12},
    ]

    /**
    *@description Generate dateObject function, based on formaDate to easy date part access.
    * @param {string[]} dateOjectFomated 
    * @returns {dateObject}
    */
    function generateDateObject(date = new Date()) {
        const dateOjectFomated = formaDate.format(date).split(",");
        const date_f = dateOjectFomated[1]?.split(".").map(Number)
        const time = dateOjectFomated[2]?.split(":").map(Number)
        return {
            day: date_f?.at(0) ?? 0,
            month: date_f?.at(1) ?? 0, 
            year: date_f?.at(2) ?? 0, 
            hour: time?.at(0) ?? 0, 
            minute: time?.at(1) ?? 0,
            weekday: dateOjectFomated?.at(0) ?? "", 
            
        }

    }
    /**
     * 
     * @param {dateObject} dateObject 
     * @param {austriaHolyDays} austriaHolyDays 
     * @returns 
     */
    const isAustriaHolyDays = (dateObject, austriaHolyDays) => !austriaHolyDays.find(holyday => holyday.day === dateObject.day && holyday.month === dateObject.month)
   /**
    * 
    * @param {dateObject} dateObject 
    * @returns 
    */
    const weeksDatesHours = (dateObject) =>  dateObject.hour >= 9 && dateObject.hour <= 17;

    // I should div % by days (start - finish) difference with is the range from to amount.
    /**
     * 
     * @param {dateObject} dateObject 
     * @returns {Date}
     */
    const calcTurnArround = (dateObject) => (dateObject.day + Math.abs(turnArround / 8));

    /**
     * create the dates objects base on all submits date and times strings.
     */
    const dates = submit.map(submit => new Date(`${submit.date}, ${submit.time}`))

    /**
     * @description return the finished day as the due time + the max turn arround hours.
     * @param {number} calcTurnArround 
     * @param {dateObject} dateObject 
     */
    const toDueTime = (calcTurnArround) => dates.map(date => formaDate.format(new Date(date.setDate(calcTurnArround))))
    
    /**
     * creating the array of dateObjects for easy date parts manipulation.
     */
    const dateObjects = dates.map(generateDateObject);

    /**Finally return the calculation pipiline based on a logic that prevent holyday dates or any no working day times!*/
    return dateObjects.every(weeksDatesHours) ? 
    dateObjects.filter( dateObjects => isAustriaHolyDays(dateObjects, austriaHolyDays)).map(calcTurnArround).map(toDueTime).flat() : 
    ['']
}


console.info("calculated the due times:", calculatedDueDate([{date: "3 October 2023", time: "14:00"}], 16))

