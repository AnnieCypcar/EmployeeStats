/* eslint camelcase: 0 */
export const EmployeesService = {
  isValidEmployee: (employee) => {
    if (!employee) return false;
    const {name, salary, currency, department, sub_department} = employee;
    // account for any unexpected data insertion attempts
    const allKeys = Object.keys(employee);
    if (allKeys.length > 6 || (allKeys.length === 6 && !allKeys.includes('on_contract'))) return false;
    return !!name && !!salary && !!currency && !!department && !!sub_department;
  },
  getMissingParams: (employee) => {
    const {name, salary, currency, department, sub_department} = employee;
    const missing = [];
    if (!name) {
      missing.push('name');
    }
    if (!salary) {
      missing.push('salary');
    }
    if (!currency) {
      missing.push('currency');
    }
    if (!department) {
      missing.push('department');
    }
    if (!sub_department) {
      missing.push('sub_department');
    }
    return missing;
  },
  getSummaryStatistics: (employees, onContract=false) => {
    let min = Infinity;
    let max = 0;
    let total = 0;
    let count = 0;
    for (const employee of employees) {
      if (onContract && (!('on_contract' in employee) || !employee['on_contract'])) {
        continue;
      }
      min = Math.min(min, Number(employee.salary));
      max = Math.max(max, Number(employee.salary));
      total += Number(employee.salary);
      count += 1;
    }
    const mean = Math.round(total / count);
    return {mean, min, max};
  },
  getDepartmentEmployees: (employees) => {
    const departments = {};
    employees.map((e) => {
      const {department} = e;
      if (!(department in departments)) {
        departments[department] = [e];
      } else {
        departments[department].push(e);
      }
    });
    return departments;
  },
  getDepartmentSummaryStatistics: (employees) => {
    const departments = EmployeesService.getDepartmentEmployees(employees);
    const response = {};
    for (const [department, emps] of Object.entries(departments)) {
      response[department] = EmployeesService.getSummaryStatistics(emps);
    }
    return response;
  },
  getSubDepartmentEmployees: (employees) => {
    const departments = {};
    employees.map((e) => {
      const {sub_department, department} = e;
      if (!(department in departments)) {
        departments[department] = {[sub_department]: [e]};
      } else {
        if (!(sub_department in departments[department])) {
          departments[department][sub_department] = [e];
        } else {
          departments[department][sub_department].push(e);
        }
      }
    });
    return departments;
  },
  getSubDepartmentSummaryStatistics: (employees) => {
    const subDepartments = EmployeesService.getSubDepartmentEmployees(employees);
    const response = {};
    for (const [department, value] of Object.entries(subDepartments)) {
      for (const [sub_department, emps] of Object.entries(value)) {
        if (!(department in response)) {
          response[department] = {[sub_department]: EmployeesService.getSummaryStatistics(emps)};
        } else {
          response[department][sub_department] = EmployeesService.getSummaryStatistics(emps);
        }
      }
    }
    return response;
  },
};
