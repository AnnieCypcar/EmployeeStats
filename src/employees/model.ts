import { db } from '../database.js';
import { Employee } from './types.js';

export const EmployeeModel = {
    createEmployee: (employee: Employee) => {
        try {
            const stmt = db.prepare(`INSERT INTO employee (name, salary, sub_department_name, currency, on_contract) VALUES (?, ?, ?, ?, ?)`);
            const { name, salary, sub_department, currency, on_contract } = employee;
            const info = stmt.run(name, salary, sub_department, currency, on_contract);
            return info.lastInsertRowid;
        } catch (e) {
            throw new Error(`${e}`);
        }

    },
    deleteEmployee: (employeeId: Employee['id']) => {
        try {
            const stmt = db.prepare(`DELETE FROM employee WHERE id = ?`);
            const info = stmt.run(employeeId);
            return info.changes;
        } catch (e) {
            throw new Error(`${e}`);
        }
    },
    getAllEmployees: (onContract: boolean = false): Employee[] => {
        // only show contractors when true, otherwise return all employees
        const whereClause = onContract ? 'WHERE e.on_contract = 1' : '';
        try {
            const stmt = db.prepare(`
                SELECT e.id, e.name, e.salary, e.sub_department_name as sub_department, 
                  d.name as department, e.currency, 
                  CASE WHEN e.on_contract IS 0 THEN 'false' ELSE 'true' END as on_contract
                    FROM employee as e
                    INNER JOIN sub_department as sd
                        on e.sub_department_name = sd.name
                    INNER JOIN department as d
                        ON  d.name = sd.department_name ${whereClause}`);
            return stmt.all();
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}