import { EmployeesService } from './service.js';
import { DepartmentStats, Employee, SubDepartmentStats, SummaryStats } from './types.js';
import { Request, Response } from 'express';
import { EmployeeModel } from './model.js';


export const EmployeesController = {
  addEmployee: async (req: Request, res: Response): Promise<void> => {
    const employee = req.body;
    if (EmployeesService.isValidEmployee(employee)) {
      const newEmployeeRowId = EmployeeModel.createEmployee(employee);
      res.status(201).send(`Employee with employeeId ${newEmployeeRowId} created`);
    } else {
      const missingParams = EmployeesService.getMissingParams(employee);
      let params = '';
      for (const param of missingParams) {
        params += param + ', ';
      }
      res.status(400).send(`[${params}] parameters are missing`);
    }
  },
  getEmployees: async (req: Request, res: Response): Promise<void> => {
    const all = EmployeeModel.getAllEmployees();
    res.status(200).send(all);
  },
  deleteEmployee: async (req: Request, res: Response): Promise<void> => {
    const { employeeId } = req.params;
    const deletedEmpl = EmployeeModel.deleteEmployee(Number(employeeId));
    if (deletedEmpl) {
      res.status(200).send(`Employee with employeeId ${employeeId} deleted`);
    } else {
      res.status(404).send(`Employee with employeeId ${employeeId} not found`);
    }
  },
  getSummaryStatistics: async (req: Request, res: Response): Promise<void> => {
    let { onContract } = req.query;
    const allEmployees: Employee[] = EmployeeModel.getAllEmployees(Boolean(onContract));
    const stats: SummaryStats = EmployeesService.getSummaryStatistics(allEmployees, Boolean(onContract));
    res.status(200).send(stats);
  },
  getDepartmentSummaryStatistics: async (req: Request, res: Response): Promise<void> => {
    const allEmployees: Employee[] = EmployeeModel.getAllEmployees();
    const stats: DepartmentStats[] = EmployeesService.getDepartmentSummaryStatistics(allEmployees);
    res.status(200).send(stats);
  },
  getSubDepartmentSummaryStatistics: async (req: Request, res: Response): Promise<void> => {
    const allEmployees: Employee[] = EmployeeModel.getAllEmployees();
    const stats: SubDepartmentStats[] = EmployeesService.getSubDepartmentSummaryStatistics(allEmployees);
    res.status(200).send(stats);
  },
};
