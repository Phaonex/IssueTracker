const trackerClass = require( "./issueTracker.js")

 
const tracker = new trackerClass.issueTracker()

describe("issue tracker class due calculation methods", () => {
  /**Mocking date neccessary for run the internal functions and test it! */
  const formaDate = new Intl.DateTimeFormat("de", { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long', hour: "numeric", minute: "numeric", hour12: false });
  const today = new Date();
  const formated =  formaDate?.format(today).split(",");

        const submit = [{date: "3 October 2023", time: "14:00"}];
        const turnArround = 16;
        const dates = submit.map(submit => new Date(`${submit.date}, ${submit.time}`))
        const dateObjects = dates.map( dates => tracker.generateDateObject(dates, formaDate));


  const austriaHolyDays = [
    {day: 26, month: 10},
    {day: 1, month: 11},
    {day: 8, month: 12},
    {day: 25, month: 12},
    {day: 26, month: 12},
]

  test('should generate date obejct!', () => {
    const evaluation = tracker.generateDateObject(today, formaDate);
    const result = {"day": today.getDate(), "hour": today.getHours(), "minute": today.getMinutes(), "month": today.getMonth() + 1, "weekday": formated.at(0), "year": today.getFullYear()}

    expect(evaluation).toEqual( result );
  });

  test('should not be a Hollyday!', () => {
    const evaluation = !tracker.isAustriaHolyDays(dateObjects, austriaHolyDays);
    const result = false

    expect(evaluation).toBe( result );
  });

  test('should be a Hollyday!', () => {
    const holyday = {...austriaHolyDays,  ...{day: today.getDate(), month: today.getMonth()}}
    const evaluation = tracker.isAustriaHolyDays(dateObjects, austriaHolyDays);
    const result = true

    expect(evaluation).toBe( result );
  });

  test('should be a week working hours!', () => {
    const dateObjects = tracker.generateDateObject(new Date("3 October 2023, 17:00"), formaDate);
    const evaluation = tracker.weeksDatesHours(dateObjects);
    const result = true

    expect(evaluation).toBe( result );
  });


  test('should not be a week working hours!', () => {
    const dateObjects = tracker.generateDateObject(new Date("3 October 2023, 08:00"), formaDate);
    const evaluation = tracker.weeksDatesHours(dateObjects);
    const result = false

    expect(evaluation).toBe( result );
  });

  xtest('should calculate the a 16 turn arround in 2 days!', () => {
    const evaluation = tracker.calcTurnArround(dateObjects);
    const result = 2

    expect(evaluation).toBe( result );
  });

  test('should due time day should be!', () => {

    const evaluation = tracker.toDueTime(tracker.calcTurnArround(dateObjects), dates, formaDate);
    const result = 2

    expect(evaluation).toBe(result);
  });

  test('Must calculate due date!', () => {
    const result = tracker.calculatedDueDate(submit, turnArround);

    expect(result).toEqual( ['Donnerstag, 5.10.2023, 14:00'] );
  });
})
