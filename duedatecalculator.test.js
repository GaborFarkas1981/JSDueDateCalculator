const { toBeDateString } = require('jest-extended');
expect.extend({ toBeDateString });

const calculateDueDate = require('./duedatecalculator');

it('should return dueDate in date format', () => {
    const submitDate = new Date('2023-11-08T10:11:12');
    const turnaroundTime = 8;
    const result = calculateDueDate(submitDate, turnaroundTime);
    expect(result).toBeDateString();
  });