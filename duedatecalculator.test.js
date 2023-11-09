const { toBeDateString } = require('jest-extended');
expect.extend({ toBeDateString });

const calculateDueDate = require('./duedatecalculator');

describe('type check', () => {
    it('should throw an error if type of submitDate is not date', () => {
      const submitDate = 33;
      const turnaroundTime = 8;
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Type of submitDate must be a date!');
    });
    it('should throw an error if type of turnaroundTime is not a number', () => {
      const submitDate = new Date('2023-11-08T10:11:12');
      const turnaroundTime = 'test';
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Type of turnaroundTime must be an integer!');
    });
    it('should return dueDate in date format', () => {
        const submitDate = new Date('2023-11-08T10:11:12');
        const turnaroundTime = 8;
        const result = calculateDueDate(submitDate, turnaroundTime);
        expect(result).toBeDateString();
    });
});
describe('validity check', () => {
    it('should throw an error if submitDate is not in working hours', () => {
      const submitDate = new Date('2023-11-03T16:11:12');
      const turnaroundTime = 8;
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Submit date must be in working hours!');
    });
});
describe('returning due date check', () => {
    it('should return dueDate on the next working day', () => {
        const submitDate = new Date('2023-11-03T15:48:13'); // Friday
        const turnaroundTime = 8; // 8 working hours
        const dueDate = calculateDueDate(submitDate, turnaroundTime);
        expect(dueDate.toISOString()).toBe('2023-11-06T15:48:13.000Z'); // Monday
      });
});
