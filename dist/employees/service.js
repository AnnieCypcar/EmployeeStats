export const EmployeesService = {
    isValidEmployee: (employee) => {
        if (!employee)
            return false;
        const { name, salary, currency, department, sub_department } = employee;
        // account for any unexpected data insertion attempts
        const allKeys = Object.keys(employee);
        if (allKeys.length > 6 || (allKeys.length === 6 && !allKeys.includes('on_contract')))
            return false;
        return !!name && !!salary && !!currency && !!department && !!sub_department;
    },
    getMissingParams: (employee) => {
        const { name, salary, currency, department, sub_department } = employee;
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
    getSummaryStatistics: (employees, onContract = false) => {
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
        return { mean, min, max };
    },
    getDepartmentEmployees: (employees) => {
        const d = {};
        for (const e of employees) {
            const { department } = e;
            if (!(department in d)) {
                d[department] = [e];
            }
            else {
                d[department]?.push(e);
            }
        }
        return d;
    },
    getDepartmentSummaryStatistics: (employees) => {
        const departments = EmployeesService.getDepartmentEmployees(employees);
        const response = [];
        for (const [department, emps] of Object.entries(departments)) {
            const obj = {
                department,
                stats: EmployeesService.getSummaryStatistics(emps)
            };
            response.push(obj);
        }
        return response;
    },
    getSubDepartmentEmployees: (employees) => {
        const s = {};
        for (const e of employees) {
            let { sub_department, department } = e;
            if (!(department in s)) {
                s[department] = { [sub_department]: [e] };
            }
        }
        return s;
    },
    getSubDepartmentSummaryStatistics: (employees) => {
        const sub = EmployeesService.getSubDepartmentEmployees(employees);
        const response = [];
        for (const [department, val] of Object.entries(sub)) {
            const subDepartments = Object.keys(val);
            for (const sub_department of subDepartments) {
                const obj = {
                    department,
                    stats: EmployeesService.getSummaryStatistics(val[sub_department]),
                    sub_department
                };
                response.push(obj);
            }
        }
        return response;
    },
};
