import { EmployeesService } from './service.js';
import { Employee } from './types.js';
/* eslint-disable-next-line */
// @ts-ignore
import database from '../../data.json' assert { type: 'json' };
let allEmployees: Employee[] = database;
import { Request, Response } from 'express';


export const EmployeesController = {
  addEmployee: async (req: Request, res: Response): Promise<void> => {
    const employee = req.body;
    if (EmployeesService.isValidEmployee(employee)) {
      employee['id'] = allEmployees.length + 1;
      allEmployees.push(employee);
      res.status(201).send(`Employee with employeeId ${employee.id} created`);
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
    res.status(200).send(allEmployees);
  },
  deleteEmployee: async (req: Request, res: Response): Promise<void> => {
    const { employeeId } = req.params;
    let found = false;
    allEmployees = allEmployees.filter((e) => {
      if (e.id === Number(employeeId)) {
        found = true;
        return false;
      }
      return true;
    });
    if (found) {
      res.status(200).send(`Employee with employeeId ${employeeId} deleted`);
    } else {
      res.status(404).send(`Employee with employeeId ${employeeId} not found`);
    }
  },
  getSummaryStatistics: async (req: Request, res: Response): Promise<void> => {
    let { onContract } = req.query;
    const stats = EmployeesService.getSummaryStatistics(allEmployees, onContract === 'true');
    res.status(200).send(stats);
  },
  getDepartmentSummaryStatistics: async (req: Request, res: Response): Promise<void> => {
    const stats = EmployeesService.getDepartmentSummaryStatistics(allEmployees);
    res.status(200).send(stats);
  },
  getSubDepartmentSummaryStatistics: async (req: Request, res: Response): Promise<void> => {
    const stats = EmployeesService.getSubDepartmentSummaryStatistics(allEmployees);
    res.status(200).send(stats);
  },
};
