import Database from 'better-sqlite3';
import fs from 'fs';
export const db = new Database('./db/employees.db', { verbose: console.log });
// Write the schema in the database
const migration = fs.readFileSync('./db/database.sql', 'utf8')
db.exec(migration);

// Seed the database
const insertDept = db.prepare('INSERT INTO department (name) VALUES (@name)');
const insertSubDept = db.prepare('INSERT INTO sub_department (name, department_name) VALUES (@name, @department_name)');
const insertEmployees = db.prepare(
    `INSERT INTO employee (name, salary, sub_department_name, currency, on_contract) 
        VALUES (@name, @salary, @sub_department_name, @currency, @on_contract)`);

const insertMany = db.transaction((items, callback) => {
    for (const item of items) {
        try {
            callback.run(item);
        } catch (e) {
            console.log(`There was an error inserting data ${e}`);
        }
    }
});

(() => {
    // if retrieving employees fails, run the seed scripts
    const employees = db.prepare('SELECT * FROM employee').all();
    if (!employees.length) {
        insertMany([
            { name: 'Engineering' },
            { name: 'Banking' },
            { name: 'Operations' },
            { name: 'Administration' },
        ], insertDept);

        insertMany([
            { name: 'Platform', department_name: 'Engineering' },
            { name: 'Loan', department_name: 'Banking' },
            { name: 'CustomerOnboarding', department_name: 'Operations' },
            { name: 'Agriculture', department_name: 'Administration' },
        ], insertSubDept);

        insertMany([
            { name: 'Abhishek', salary: 145000, sub_department_name: 'Platform', currency: 'USD', on_contract: 0 },
            { name: 'Anurag', salary: 90000, sub_department_name: 'Loan', currency: 'USD', on_contract: 1 },
            { name: 'Himani', salary: 240000, sub_department_name: 'Platform', currency: 'USD', on_contract: 0 },
            { name: 'Yatendra', salary: 30, sub_department_name: 'CustomerOnboarding', currency: 'USD', on_contract: 0 },
            { name: 'Ragini', salary: 30, sub_department_name: 'Platform', currency: 'USD', on_contract: 0 },
            { name: 'Nikhil', salary: 110000, sub_department_name: 'Platform', currency: 'USD', on_contract: 1 },
            { name: 'Guljit', salary: 30, sub_department_name: 'Agriculture', currency: 'USD', on_contract: 0 },
            { name: 'Himanshu', salary: 70000, sub_department_name: 'CustomerOnboarding', currency: 'EUR', on_contract: 0 },
            { name: 'Anupam', salary: 200000000, sub_department_name: 'Platform', currency: 'INR', on_contract: 0 },
        ], insertEmployees);
    }
})();

export const query = (sql: string, params: []) => {
    return db.prepare(sql).all(...params);
}