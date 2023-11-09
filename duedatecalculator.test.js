const { toBeDateString } = require('jest-extended');
expect.extend({ toBeDateString });

const calculateDueDate = require('./duedatecalculator');

describe('input check', () => {
    it('should throw an error if type of submitDate is not date', () => {
      const submitDate = 33;
      const turnaroundTime = 8;
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Type of submitDate must be a date!');
    });
    it('should throw an error if submitDate is not in working hours', () => {
          const submitDate = new Date('2023-11-03T16:11:12');
          const turnaroundTime = 8;
          const t = () => {
            calculateDueDate(submitDate, turnaroundTime);
          };
          expect(t).toThrow('Submit date must be in working hours!');
      });
    it('should throw an error if type of turnaroundTime is not a number', () => {
          const submitDate = new Date('2023-11-08T10:11:12');
          const turnaroundTime = 'test';
          const t = () => {
            calculateDueDate(submitDate, turnaroundTime);
          };
          expect(t).toThrow('Type of turnaroundTime must be a positive integer!');
      });
    it('should throw an error if type of turnaroundTime is not an integer', () => {
      const submitDate = new Date('2023-11-08T10:11:12');
      const turnaroundTime = 2.2;
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Type of turnaroundTime must be a positive integer!');
    });
   it('should throw an error if type of turnaroundTime is not a positive integer', () => {
      const submitDate = new Date('2023-11-08T10:11:12');
      const turnaroundTime = -2;
      const t = () => {
        calculateDueDate(submitDate, turnaroundTime);
      };
      expect(t).toThrow('Type of turnaroundTime must be a positive integer!');
    });
});
describe('returning due date check', () => {
    it('should return dueDate in date format', () => {
            const submitDate = new Date('2023-11-08T10:11:12');
            const turnaroundTime = 8;
            const result = calculateDueDate(submitDate, turnaroundTime);
            expect(result).toBeDateString();
      });
    it('should return dueDate on the next working day', () => {
        const submitDate = new Date('2023-11-03T15:48:13'); // Friday
        const turnaroundTime = 8; // 8 working hours
        const dueDate = calculateDueDate(submitDate, turnaroundTime);
        expect(dueDate.toISOString()).toBe('2023-11-06T15:48:13.000Z'); // Monday
      });
    it('should handle a very long turnaround time', () => {
        const submitDate = new Date('2023-11-08T10:00:00');
        const turnaroundTime = 48; // 48 working hours (6 days)
        const dueDate = calculateDueDate(submitDate, turnaroundTime);
        expect(dueDate.toISOString()).toBe('2023-11-16T10:00:00.000Z');
    });
    it('should calculate due date within the same working day', () => {
        const submitDate = new Date('2023-11-08T10:00:00');
        const turnaroundTime = 4; // 4 working hours
        const dueDate = calculateDueDate(submitDate, turnaroundTime);
        expect(dueDate.toISOString()).toBe('2023-11-08T14:00:00.000Z');
      });
});
