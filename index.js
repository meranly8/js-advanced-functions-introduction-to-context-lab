function createEmployeeRecord(fields) {
    const employee = {
        firstName: fields[0],
        familyName: fields[1],
        title: fields[2],
        payPerHour: fields[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arryArrys) {
    const newArry = []
    arryArrys.map(employee => {
        newArry.push(createEmployeeRecord(employee))
    })
    return newArry
}

function createTimeInEvent(employee, timeStamp) {
    const date = timeStamp.split(" ")[0]
    const hour = parseInt(timeStamp.split(" ")[1])
    employee.timeInEvents.push({type: "TimeIn", hour: hour, date: date})
    return employee
}

function createTimeOutEvent(employee, timeStamp) {
    const date = timeStamp.split(" ")[0]
    const hour = parseInt(timeStamp.split(" ")[1])
    employee.timeOutEvents.push({type: "TimeOut", date: date, hour: hour})
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event => event.date === date)
    const hours = (timeOut.hour - timeIn.hour) / 100
    return hours
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date)
    const pay = dates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return pay
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(e => e.firstName === firstName)
}

function calculatePayroll(arry) {
    let total = arry.map(e => allWagesFor(e))
    return total.reduce((wages, sum) => wages + sum)
}
