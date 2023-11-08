const { toBeDateString } = require('jest-extended');
expect.extend({ toBeDateString });

const calculateDueDate = require('./duedatecalculator');

describe('calculateDueDate', () => {
    it('should return dueDate in date format', () => {
        const submitDate = new Date('2023-11-08T10:11:12');
        const turnaroundTime = 8;
        const result = calculateDueDate(submitDate, turnaroundTime);
        expect(result).toBeDateString();
      });

    it('should throw an error if submit date is not a string', () => {
      const submitDate = 33;
      const turnaroundTime = 8;
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Format of submit date must be a string!');
    });
});