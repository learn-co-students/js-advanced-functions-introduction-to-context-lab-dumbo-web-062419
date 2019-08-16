// Your code here
function createEmployeeRecord(array){
  let newEmployee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return newEmployee;
}

function createEmployees(arrayOfArrays){
  return arrayOfArrays.map(function(array){
    return createEmployeeRecord(array);
  })
}

function createTimeInEvent(employee, dateStamp){
  employee.timeInEvents.push(
    {
      type: "TimeIn",
      hour: Number(dateStamp.slice(11, 15)),
      date: dateStamp.slice(0, 10)
    }
  )
  return employee;
}

function createTimeOutEvent(employee, dateStamp){
  employee.timeOutEvents.push(
    {
      type: "TimeOut",
      hour: Number(dateStamp.slice(11, 15)),
      date: dateStamp.slice(0, 10)
    }
  )
  return employee;
}


function hoursWorkedOnDate(employee, dateStamp){
  let inTime = employee.timeInEvents.filter(timeIn => timeIn.date == dateStamp)
  let outTime = employee.timeOutEvents.filter(timeOut => timeOut.date == dateStamp)
  return (outTime[0].hour - inTime[0].hour)/100;
}

function wagesEarnedOnDate(employee, dateStamp){
  return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour;
}

function allWagesFor(employee){
  let dates = employee.timeInEvents.map(timeEvents => timeEvents.date)
  let wages = dates.map(date => wagesEarnedOnDate(employee, date))
  return wages.reduce((acc, curr) => acc + curr);
}

function createEmployeeRecords(arrayOfArrays){
  return arrayOfArrays.map(function(array){
    return createEmployeeRecord(array);
  })
}

function findEmployeebyFirstName(srcArray, firstName){
   return (srcArray.find(employee => employee.firstName == firstName));
}

function calculatePayroll(employeesArray){
  return employeesArray.reduce((acc, curr) => {
    return acc + allWagesFor(curr);
  }, 0)
}
























//
