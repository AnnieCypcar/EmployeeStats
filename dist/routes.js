import { EmployeesController } from './employees/controller.js';
export const protectedRoutes = (app) => {
    // Add a new employee
    app.route('/employees').post(EmployeesController.addEmployee);
    // Get all employees
    app.route('/employees').get(EmployeesController.getEmployees);
    // Delete an employee
    app.route('/employees/:employeeId').delete(EmployeesController.deleteEmployee);
    // Get summary statistics for all employees
    // Get summary statistics for contractors with query params onContract=true
    app.route('/employees/summary-stats').get(EmployeesController.getSummaryStatistics);
    // Get summary statistics for all departments
    app.route('/employees/summary-stats/departments').get(EmployeesController.getDepartmentSummaryStatistics);
    // Get summary statistics for all sub-departments
    app.route('/employees/summary-stats/sub-departments').get(EmployeesController.getSubDepartmentSummaryStatistics);
};
