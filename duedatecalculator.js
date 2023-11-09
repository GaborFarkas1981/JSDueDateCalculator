function calculateDueDate(submitDate, turnaroundTime) {
    isValidDate(submitDate)

    const dstOffset = getLocalDSTOffset(); // considering DST offset
    submitDate = new Date(submitDate.getTime() + dstOffset * 60000);

    inputChecker(submitDate, turnaroundTime);

    const dueDate = new Date(submitDate);

    while (turnaroundTime > 0 || !isWorkingHour(dueDate)) {
        dueDate.setTime(dueDate.getTime() + (60*60*1000)); // add 1 hour
        if (isWorkingHour(dueDate)) {
            turnaroundTime--;
        }
    }

    return dueDate;
}

function isWorkingDay(date) {
    const workingDays = [1, 2, 3, 4, 5]; // Monday to Friday

    return workingDays.includes(date.getDay());
}

function isWorkingHour(date) {
    const workingHoursStart = 9;
    const workingHoursEnd = 17;

    return isWorkingDay(date) && date.getHours() >= workingHoursStart && date.getHours() < workingHoursEnd;
}

function getLocalDSTOffset() {
    const now = new Date();
    const standardTimeOffset = now.getTimezoneOffset(); // Get the standard time offset
    now.setMonth(5); // Set the month to a date during DST (e.g., June)
    const dstTimeOffset = now.getTimezoneOffset(); // Get the DST time offset

    // If the standard time offset is greater than the DST time offset, DST is in effect
    if (standardTimeOffset > dstTimeOffset) {
    return standardTimeOffset - dstTimeOffset;
    } else {
    return 0; // DST is not in effect
    }
}

function isValidDate(input) {
    if (!(input instanceof Date && !isNaN(input))) {
        throw ('Type of submitDate must be a date!')
    }
}

function inputChecker(submitDate, turnaroundTime) {
    if (!isWorkingHour(submitDate)) {
        throw ('Submit date must be in working hours!')
    }
    if (!Number.isInteger(turnaroundTime)) {
        throw ('Type of turnaroundTime must be an integer!')
    }
}
module.exports = calculateDueDate;
