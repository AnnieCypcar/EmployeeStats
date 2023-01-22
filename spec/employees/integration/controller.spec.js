import supertest from 'supertest';
import { Server } from '../../../bin/server.mjs';
import app from '../../../dist/index.js';


describe('employees', () => {
  const newEmployee = {
    'name': 'DiCaprio',
    'salary': '40000000',
    'currency': 'USD',
    'department': 'Engineering',
  };
  beforeAll(async () => {
    await Server.start();
  });
  afterAll(async () => {
    await Server.stop();
  });
  describe('/employees', () => {
    it('POST fails without authorizaton', async () => {
      await supertest(app)
        .post(`/employees`)
        .send(newEmployee)
        .expect(401);
    });
    it('POST fails to creates a new employee for missing parameters', async () => {
      await supertest(app)
        .post(`/employees`)
        .set('Authorization', 'password')
        .set('Content-Type', 'application/json')
        .send(newEmployee)
        .expect(400);
    });
    it('POST creates a new employee for valid input', async () => {
      newEmployee['sub_department'] = 'Core';
      await supertest(app)
        .post(`/employees`)
        .set('Authorization', 'password')
        .send(newEmployee)
        .expect(201);
      await supertest(app)
        .get(`/employees`)
        .set('Authorization', 'password')
        .expect(200)
        .then((response) => {
          const results = response.body;
          expect(results.length).toEqual(10);
          expect(results[results.length - 1].id).toEqual(10);
        });
    });
  });
  describe('/employees/:employeeId', () => {
    const employeeId = 1;
    it('DELETE fails without authorizaton', async () => {
      await supertest(app)
        .delete(`/employees/${employeeId}`)
        .expect(401);
    });
    it('DELETE removes an employee from the dataset', async () => {
      await supertest(app)
        .delete(`/employees/${employeeId}`)
        .set('Authorization', 'password')
        .expect(200);
      await supertest(app)
        .get('/employees')
        .set('Authorization', 'password')
        .expect(200)
        .then((response) => {
          const results = response.body;
          const allIds = results.map((e) => e.id);
          expect(allIds.includes(employeeId)).toEqual(false);
        });
    });
    it('DELETE fails to remove an already deleted employee', async () => {
      const employeeId = 1;
      await supertest(app)
        .delete(`/employees/${employeeId}`)
        .set('Authorization', 'password')
        .expect(404);
    });
  });
  describe('/employees/summary-stats', () => {
    it('GET fails without authorizaton', async () => {
      await supertest(app)
        .get(`/employees/summary-stats`)
        .expect(401);
    });
    it('GET retrieves summary statistics for all employees', async () => {
      await supertest(app)
        .get(`/employees/summary-stats`)
        .set('Authorization', 'password')
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            'mean': 26723343,
            'min': 30,
            'max': 200000000,
          });
        });
    });
    it('GET onContract=true retrieves summary statistics for all employees who are contractors', async () => {
      await supertest(app)
        .get(`/employees/summary-stats?onContract=true`)
        .set('Authorization', 'password')
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            'mean': 100000,
            'min': 90000,
            'max': 110000,
          });
        });
    });
  });
  describe('/employees/summary-stats/departments', () => {
    it('GET fails without authorizaton', async () => {
      await supertest(app)
        .get(`/employees/summary-stats/departments`)
        .expect(401);
    });
    it('GET retrieves summary statistics for all employees per department', async () => {
      await supertest(app)
        .get(`/employees/summary-stats/departments`)
        .set('Authorization', 'password')
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual([{
            department: 'Banking',
            stats: {
              mean: 90000,
              min: 90000,
              max: 90000
            }
          }, {
            department: 'Engineering',
            stats: {
              mean: 48070006,
              min: 30,
              max: 200000000
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
  });
  describe('/employees/summary-stats/sub-departments', () => {
    it('GET fails without authorizaton', async () => {
      await supertest(app)
        .get(`/employees/summary-stats/sub-departments`)
        .expect(401);
    });
    it('GET retrieves summary statistics for all employees per subdepartment', async () => {
      await supertest(app)
        .get(`/employees/summary-stats/sub-departments`)
        .set('Authorization', 'password')
        .expect(200)
        .then(({ body }) => {
          console.log(body)
          //expect(body).toEqual();
        });
    });
  });
});
