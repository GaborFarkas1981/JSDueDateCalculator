function calculateDueDate(submitDate, turnaroundTime) {
    inputValidator(submitDate, turnaroundTime);
    const dueDate = new Date('2023-11-10T08:00:00');

    return dueDate;
}

function isValidDate(input) {
    return (input instanceof Date && !isNaN(input))
}

function inputValidator(submitDate, turnaroundTime) {
    if (!(isValidDate(submitDate))) {
        throw ('Type of submitDate must be a date!')
    }
    if (!Number.isInteger(turnaroundTime)) {
        throw ('Type of turnaroundTime must be an integer!')
    }
}

module.exports = calculateDueDate;
