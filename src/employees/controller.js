import {EmployeesService} from './service.js';
import database from '../../data.json' assert { type: 'json' };
let allEmployees = database;

export const EmployeesController = {
  addEmployee: async (req, res) => {
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
  getEmployees: async (req, res) => {
    res.status(200).send(allEmployees);
  },
  deleteEmployee: async (req, res) => {
    const {employeeId} = req.params;
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
  getSummaryStatistics: async (req, res) => {
    const {onContract} = req.query;
    const stats = EmployeesService.getSummaryStatistics(allEmployees, onContract);
    res.status(200).send(stats);
  },
  getDepartmentSummaryStatistics: async (req, res) => {
    const stats = EmployeesService.getDepartmentSummaryStatistics(allEmployees);
    res.status(200).send(stats);
  },
  getSubDepartmentSummaryStatistics: async (req, res) => {
    const stats = EmployeesService.getSubDepartmentSummaryStatistics(allEmployees);
    res.status(200).send(stats);
  },
};
