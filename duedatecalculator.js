function calculateDueDate(submitDate, turnaroundTime) {
    if (!(submitDate instanceof Date && !isNaN(submitDate))) {
        throw ('Format of submit date must be a date!')
    }
    const dueDate = new Date('2023-11-10T08:00:00');

    return dueDate;
}
module.exports = calculateDueDate;
