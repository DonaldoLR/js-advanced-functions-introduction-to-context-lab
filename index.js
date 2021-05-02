// Your code here
function createEmployeeRecord(employeeArr){
    const employee = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee;    
}

function createEmployeeRecords(arr){
    let employeeRecords = arr.map(employeeArr => createEmployeeRecord(employeeArr)); 
    return employeeRecords;
}

function createTimeInEvent(employeeObj, time){
    time = time.split(' ')
    employeeObj.timeInEvents.push({
        type: `TimeIn`,
        date: time[0],
        hour: parseInt(time[1], 10)
    });
    return employeeObj; 
}

function createTimeOutEvent(employeeObj, time){
    time = time.split(' ')
    employeeObj.timeOutEvents.push({
        type: `TimeOut`,
        date: time[0],
        hour: parseInt(time[1], 10)
    });
    return employeeObj; 
}

function hoursWorkedOnDate(employeeObj, date){
    const clockedIn = employeeObj.timeInEvents.find(timeInObj => timeInObj.date === date).hour
    const clockedOut = employeeObj.timeOutEvents.find(timeOutObj => timeOutObj.date === date).hour

    return (clockedOut - clockedIn) / 100;
}

function wagesEarnedOnDate(employeeObj, date){
    const hoursWorked = hoursWorkedOnDate(employeeObj, date); 

    return hoursWorked * employeeObj.payPerHour;
}

function allWagesFor(employeeObj){
    const dates = employeeObj.timeInEvents.map(timeInObj => timeInObj.date); 
    
    const totalPayPerDay = dates.map(date => wagesEarnedOnDate(employeeObj, date))

    const totalPay = totalPayPerDay.reduce((accum, current) => accum += current);

    return totalPay;
}

function calculatePayroll(employeeArr){
    
    const totalWagesPerEmployee = employeeArr.map(employee => allWagesFor(employee)); 

    return totalWagesPerEmployee.reduce((accum, current) => accum += current)
}

function findEmployeeByFirstName(employeesArr, searchName){
    return employeesArr.find(employeeObj => employeeObj.firstName === searchName)
}