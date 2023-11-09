const { toBeDateString } = require('jest-extended');
expect.extend({ toBeDateString });

const {
  calculateDueDate,
  isWorkingDay,
  isWorkingHour,
  getLocalDSTOffset,
  isValidDate,
  validateInput,
} = require('./duedatecalculator'); // Import functions from the main code

// Constants for repeating texts
const INVALID_DATE_ERROR = 'Invalid submitDate: It must be a valid Date object.';
const WORKING_HOUR_ERROR = 'Submit date must be in working hours!';
const INVALID_TURNAROUND_ERROR = 'Type of turnaroundTime must be a positive integer!';

describe('calculateDueDate', () => {
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

describe('isValidDate', () => {
    it('should return true for a valid Date object', () => {
        const submitDate = new Date('2023-11-08T10:00:00');
        const result = isValidDate(submitDate);
        expect(result).toBe(true);
    });
    it('should return false for an invalid Date object', () => {
        const submitDate = new Date('notDate');
        const result = isValidDate(submitDate);
        expect(result).toBe(false);
    });
});
describe('isWorkingDay', () => {
    it('should return true for a weekday', () => {
        const submitDate = new Date('2023-11-08T10:00:00');
        const result = isWorkingDay(submitDate);
        expect(result).toBe(true);
    });

    it('should return false for a weekend day', () => {
        const submitDate = new Date('2023-11-11T10:00:00');
        const result = isWorkingDay(submitDate);
        expect(result).toBe(false);
    });
});
describe('isWorkingHour', () => {
    it('should return true for a time within working hours', () => {
        const submitDate = new Date('2023-11-09T10:00:00');
        const result = isWorkingHour(submitDate);
        expect(result).toBe(true);
    });

    it('should return false for a time outside working hours', () => {
        const submitDate = new Date('2023-11-09T3:00:00');
        const result = isWorkingHour(submitDate);
        expect(result).toBe(false);
    });
});
describe('validateInput', () => {
    it('should pass if turnaroundTime is a positive integer', () => {
        const submitDate = new Date('2023-11-08T10:11:12');
        const turnaroundTime = 22;
        const dueDate = calculateDueDate(submitDate, turnaroundTime);
        expect(dueDate.toISOString()).toBe('2023-11-13T08:11:12.000Z');
    });
    it('should pass if type of submitDate is a date object', () => {
        const submitDate = new Date('2023-11-03T15:11:12');
        const turnaroundTime = 8;
        const dueDate = calculateDueDate(submitDate, turnaroundTime);
        expect(dueDate.toISOString()).toBe('2023-11-06T15:11:12.000Z');
    });
    it('should throw an error if type of submitDate is not a date object', () => {
        const submitDate = 33;
        const turnaroundTime = 8;
        expect(() => calculateDueDate(submitDate, turnaroundTime)).toThrowError(INVALID_DATE_ERROR);
    });
    it('should throw an error if submitDate is not in working hours', () => {
        const submitDate = new Date('2023-11-03T16:11:12');
        const turnaroundTime = 8;
        expect(() => calculateDueDate(submitDate, turnaroundTime)).toThrowError(WORKING_HOUR_ERROR);
    });
    it('should throw an error if type of turnaroundTime is not a number', () => {
        const submitDate = new Date('2023-11-08T10:11:12');
        const turnaroundTime = 'test';
        expect(() => calculateDueDate(submitDate, turnaroundTime)).toThrowError(INVALID_TURNAROUND_ERROR);
    });
    it('should throw an error if type of turnaroundTime is not an integer', () => {
        const submitDate = new Date('2023-11-08T10:11:12');
        const turnaroundTime = 2.2;
        expect(() => calculateDueDate(submitDate, turnaroundTime)).toThrowError(INVALID_TURNAROUND_ERROR);
    });
    it('should throw an error if type of turnaroundTime is not a positive integer', () => {
        const submitDate = new Date('2023-11-08T10:11:12');
        const turnaroundTime = -2;
        expect(() => calculateDueDate(submitDate, turnaroundTime)).toThrowError(INVALID_TURNAROUND_ERROR);
    });
});