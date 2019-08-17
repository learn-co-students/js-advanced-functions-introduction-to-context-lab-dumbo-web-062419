// Your code here
console.log("Locked and ready to go");

function createEmployeeRecord(sourceArray){
    let ans = {}

    ans.firstName = sourceArray[0]
    ans.familyName = sourceArray[1]
    ans.title = sourceArray[2]
    ans.payPerHour = sourceArray[3]
    ans.timeInEvents = []
    ans.timeOutEvents = []

    return ans

}

let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
// console.log(testEmployee)

function createEmployees(sourceArray){
    let ans = []

    sourceArray.forEach(employeeArray => {
        ans.push(createEmployeeRecord(employeeArray))
    })

    return ans
}

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]

function createTimeInEvent(employeeRecord, dateStamp){
    const splitDate = dateStamp.split(" ")
    const date = splitDate[0]
    const hour = parseInt(splitDate[1])
    employeeRecord.timeInEvents.push({})
    const timeInEvents = employeeRecord.timeInEvents
    
    timeInEvents.forEach(event =>{
        if (!event.date){
            event.type = "TimeIn"
            event.hour = hour
            event.date = date
        }
    })
    // console.log("employeeRecord.timeInEvents ⬇️");
    // console.log(employeeRecord.timeInEvents)
    
    return employeeRecord
}

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
// console.log(updatedBpRecord);

function createTimeOutEvent(employeeRecord, dateStamp){
    const splitDate = dateStamp.split(" ")
    const date = splitDate[0]
    const hour = parseInt(splitDate[1])
    employeeRecord.timeOutEvents.push({})
    const timeOutEvents = employeeRecord.timeOutEvents

    timeOutEvents.forEach(event => {
        if (!event.date){
            event.type = "TimeOut"
            event.hour = hour
            event.date = date
        }
    })

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let clockOutTime, clockInTime

    // if (employeeRecord.timeOutEvents[0].date === date){
    //     clockOutTime = employeeRecord.timeOutEvents[0].hour/100
    // }
    clockOutTime = employeeRecord.timeOutEvents.find(event => event.date === date).hour/100
    // console.log(`record: ${employeeRecord}, clockOutTime: ${clockOutTime}`);

    // if (employeeRecord.timeInEvents[0].date === date){
    //     clockInTime = employeeRecord.timeInEvents[0].hour/100
    // }
    clockInTime = employeeRecord.timeInEvents.find(event => event.date === date).hour/100
    
    const totalHoursWorked = clockOutTime - clockInTime
    // console.log(clockOutTime);
    // console.log(clockInTime);
    
    return totalHoursWorked
}

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
updatedBpRecord = createTimeInEvent(cRecord, "44-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "44-03-15 1100")
// console.log(cRecord);
// console.log(hoursWorkedOnDate(cRecord, "44-03-15"))

function wagesEarnedOnDate(employeeRecord, date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const payPerHour = employeeRecord.payPerHour
    return hoursWorked * payPerHour
}
// updatedBpRecord = createTimeInEvent(cRecord, "44-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "44-03-15 1100")
// console.log(wagesEarnedOnDate(cRecord, "44-03-15"));

function allWagesFor(employeeRecord){
    let allWages = 0
    const dates = []
    
    employeeRecord.timeInEvents.forEach(event => {
        dates.push(event.date)
    })
    

    // console.log(employeeRecord)
    // console.log(dates[1])
    // console.log(`Wages earned on ${dates[1]}: ${wagesEarnedOnDate(employeeRecord, dates[1])}`)

    for (let i = 0; i < dates.length; i++){
        employeeRecord.timeInEvents.forEach(event => {
            if (dates[i] === event.date){
                allWages += wagesEarnedOnDate(employeeRecord, dates[i])
                // console.log(`Wages earned on ${dates[i]}: ${wagesEarnedOnDate(employeeRecord, dates[i])}`)
            } 
            // else {
            //     i++
            // }
        })
    }

    // dates.forEach(date => {
    //     employeeRecord.timeInEvents.forEach(event => {
    //         if (date === event.date){
    //             // allWages += wagesEarnedOnDate(employeeRecord, date)
    //             console.log(wagesEarnedOnDate(employeeRecord, date))
    //         }
    //     })
    // })

    return allWages
}
cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "44-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "44-03-14 2100")
// Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "44-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "44-03-15 1100")
// 324 + 54
// console.log(cRecord);

// console.log(allWagesFor(cRecord));
// => 378

function calculatePayroll(employeeArray) {
    let totalPayRoll = 0

    employeeArray.forEach(employeeRecord => {
        totalPayRoll += allWagesFor(employeeRecord)
    })

    return totalPayRoll
    // return employeeArray.reduce(allWagesFor, 0)
}

//////////////////////runs payroll using the mock data provided by Ultron data systems


function createEmployeeRecords(sourceEmployeeArray){
    const newEmployeeArray = sourceEmployeeArray.map(employee => createEmployeeRecord(employee))

    return newEmployeeArray
}

function findEmployeebyFirstName(srcArray, firstName){
    const employee = srcArray.find(employee => employee.firstName === firstName)

    return employee
}