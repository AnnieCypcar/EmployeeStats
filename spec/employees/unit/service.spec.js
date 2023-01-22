import { EmployeesService } from '../../../dist/employees/service.js';
import employees from '../../__mocks__/test-employee-data.json' assert { type: 'json' };

describe('EmployeesService', () => {
  const employee = {
    currency: 'USD',
    department: 'Engineering',
    name: 'DiCaprio',
    salary: '40000000',
  };
  describe('isValidEmployee', () => {
    it('returns false for invalidate employee', () => {
      expect(EmployeesService.isValidEmployee(employee)).toBe(false);
    });
    it('returns true for validate employee', () => {
      employee['sub_department'] = 'Core';
      expect(EmployeesService.isValidEmployee(employee)).toBe(true);
    });
    it('returns true for validate contractor employee', () => {
      employee['on_contract'] = true;
      expect(EmployeesService.isValidEmployee(employee)).toBe(true);
    });
    it('returns false for invalid employee data', () => {
      delete employee['on_contract'];
      employee['<script>'] = '.. --select all from db';
      expect(EmployeesService.isValidEmployee(employee)).toBe(false);
    });
    it('returns false for invalid json', () => {
      expect(EmployeesService.isValidEmployee('')).toBe(false);
      expect(EmployeesService.isValidEmployee(9)).toBe(false);
      expect(EmployeesService.isValidEmployee(null)).toBe(false);
      expect(EmployeesService.isValidEmployee(undefined)).toBe(false);
      expect(EmployeesService.isValidEmployee([])).toBe(false);
      expect(EmployeesService.isValidEmployee({})).toBe(false);
    });
  });
  describe('getMissingParams', () => {
    it('provides the missing payload parameters', () => {
      delete employee['<script>'];
      delete employee['sub_department'];
      expect(EmployeesService.getMissingParams(employee)).toEqual(['sub_department']);
    });
  });
  describe('getSummaryStatistics', () => {
    it('responds with the mean, min and max salaries for a list of employees', () => {
      expect(EmployeesService.getSummaryStatistics(employees)).toEqual({
        'mean': 22295010,
        'min': 30,
        'max': 200000000,
      });
    });
    it('responds with the mean, min and max salaries who are contractors for a list of employees', () => {
      expect(EmployeesService.getSummaryStatistics(employees, true)).toEqual({
        'mean': 100000,
        'min': 90000,
        'max': 110000,
      });
    });
  });
  describe('getDepartmentEmployees', () => {
    it('formats the list of employees by department', () => {
      expect(EmployeesService.getDepartmentEmployees(employees)).toEqual({
        Engineering: [
          {
            id: 1,
            name: 'Abhishek',
            salary: '145000',
            currency: 'USD',
            department: 'Engineering',
            sub_department: 'Platform',
          },
          {
            id: 3,
            name: 'Himani',
            salary: '240000',
            currency: 'USD',
            department: 'Engineering',
            sub_department: 'Platform',
          },
          {
            id: 5,
            name: 'Ragini',
            salary: '30',
            currency: 'USD',
            department: 'Engineering',
            sub_department: 'Platform',
          },
          {
            id: 6,
            name: 'Nikhil',
            salary: '110000',
            currency: 'USD',
            on_contract: 'true',
            department: 'Engineering',
            sub_department: 'Platform',
          },
          {
            id: 9,
            name: 'Anupam',
            salary: '200000000',
            currency: 'INR',
            department: 'Engineering',
            sub_department: 'Platform',
          },
        ],
        Banking: [
          {
            id: 2,
            name: 'Anurag',
            salary: '90000',
            currency: 'USD',
            department: 'Banking',
            on_contract: 'true',
            sub_department: 'Loan',
          },
        ],
        Operations: [
          {
            id: 4,
            name: 'Yatendra',
            salary: '30',
            currency: 'USD',
            department: 'Operations',
            sub_department: 'CustomerOnboarding',
          },
          {
            id: 8,
            name: 'Himanshu',
            salary: '70000',
            currency: 'EUR',
            department: 'Operations',
            sub_department: 'CustomerOnboarding',
          },
        ],
        Administration: [
          {
            id: 7,
            name: 'Guljit',
            salary: '30',
            currency: 'USD',
            department: 'Administration',
            sub_department: 'Agriculture',
          },
        ],
      });
    });
  });
  describe('getDepartmentSummaryStatistics', () => {
    it('responds with the summary statistics by department', () => {
      expect(EmployeesService.getDepartmentSummaryStatistics(employees)).toEqual([{
        department: 'Engineering',
        stats: {
          mean: 40099006,
          min: 30,
          max: 200000000
        }
      }, {
        department: 'Banking',
        stats: {
          mean: 90000,
          min: 90000,
          max: 90000
        }
      }, {
        department: 'Operations',
        stats: {
          mean: 35015,
          min: 30,
          max: 70000
        }
      }, {
        department: 'Administration',
        stats: {
          mean: 30,
          min: 30,
          max: 30
        }
      }]);
    });
  });
  describe('getSubDepartmentEmployees', () => {
    it('formats the list of employees by department and subdepartment', () => {
      expect(EmployeesService.getSubDepartmentEmployees(employees)).toEqual({
        Engineering: {
          Platform: [{
            id: 1,
            name: 'Abhishek',
            salary: '145000',
            currency: 'USD',
            department: 'Engineering',
            sub_department: 'Platform'
          }]
        },
        Banking: {
          Loan: [{
            id: 2,
            name: 'Anurag',
            salary: '90000',
            currency: 'USD',
            department: 'Banking',
            on_contract: 'true',
            sub_department: 'Loan'
          }]
        },
        Operations: {
          CustomerOnboarding: [{
            id: 4,
            name: 'Yatendra',
            salary: '30',
            currency: 'USD',
            department: 'Operations',
            sub_department: 'CustomerOnboarding'
          }]
        },
        Administration: {
          Agriculture: [{
            id: 7,
            name: 'Guljit',
            salary: '30',
            currency: 'USD',
            department: 'Administration',
            sub_department: 'Agriculture'
          }]
        }
      });
    });
  });
  describe('getSubDepartmentSummaryStatistics', () => {
    it('responds with the summary statistics by subdepartment', () => {
      expect(EmployeesService.getSubDepartmentSummaryStatistics(employees)).toEqual([{
        department: 'Engineering',
        stats: {
          mean: 145000,
          min: 145000,
          max: 145000
        },
        sub_department: 'Platform'
      }, {
        department: 'Banking',
        stats: {
          mean: 90000,
          min: 90000,
          max: 90000
        },
        sub_department: 'Loan'
      }, {
        department: 'Operations',
        stats: {
          mean: 30,
          min: 30,
          max: 30
        },
        sub_department: 'CustomerOnboarding'
      }, {
        department: 'Administration',
        stats: {
          mean: 30,
          min: 30,
          max: 30
        },
        sub_department: 'Agriculture'
      }]);
    });
  });
});
