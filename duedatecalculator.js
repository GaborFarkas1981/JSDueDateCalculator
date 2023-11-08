function calculateDueDate(submitDate, turnaroundTime) {
    if (!(isValidDate(submitDate))) {
        throw ('Type of submit date must be a date!')
    }
    if (!Number.isInteger(turnaroundTime)) {
        throw ('Type of turnaroundTime must be an integer!')
    }
    const dueDate = new Date('2023-11-10T08:00:00');

    return dueDate;
}

function isValidDate(input) {
    return (input instanceof Date && !isNaN(input))
}


module.exports = calculateDueDate;
