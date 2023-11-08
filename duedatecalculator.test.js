const { toBeDateString } = require('jest-extended');
expect.extend({ toBeDateString });

const calculateDueDate = require('./duedatecalculator');

describe('submitDate type check', () => {
    it('should throw an error if type of submitDate is not date', () => {
      const submitDate = 33;
      const turnaroundTime = 8;
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Type of submit date must be a date!');
    });
});
describe('turnaroundTime type check', () => {
    it('should throw an error if type of turnaroundTime is not a number', () => {
      const submitDate = new Date('2023-11-08T10:11:12');
      const turnaroundTime = 8.8;
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Type of turnaroundTime must be an integer!');
    });
});
describe('return type check', () => {
    it('should return dueDate in date format', () => {
        const submitDate = new Date('2023-11-08T10:11:12');
        const turnaroundTime = 8;
        const result = calculateDueDate(submitDate, turnaroundTime);
        expect(result).toBeDateString();
      });
});
