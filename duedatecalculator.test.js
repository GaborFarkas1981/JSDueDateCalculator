const calculateDueDate = require('./duedatecalculator');

it('should return the sum of two numbers', () => {
    const numberOne = 1;
    const numberTwo = 2;
    const result = calculateDueDate(numberOne, numberTwo);
    expect(result).toBe(3);
  });