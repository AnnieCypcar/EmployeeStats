# EmployeeStats

The EmployeeStats service provides an interface for updating employee data and retrieving the mean, min and max salaries for all employees.

### Local Develop
After installing nodejs, install the dependency packages and start the server. The server will recompile and restart with every file change while in the development mode.

1. [Install nodejs LTS (v16.17.0)](https://nodejs.org/en/download/) or upgrade your current version
2. npm install
3. npm run start-dev


### Testing
Run both unit and integration tests by running
```
npm run test
```

### Linting
Run eslint autofix
```
npm run lint:fix
```

### Serving with Docker
To run the service with Docker, follow [the steps](https://docs.docker.com/get-docker/) to install docker locally. Then build the image with the following which exposes the localhost port.
```
docker compose up
```

### Authorization
Currently, the authorization pass through is hard coded with a password ("password") as the bearer token. To complete the authorization step, the user's token will be unencrypted and the information in the token will be verified against the password in the database or against an external verification service.

### Sample Curls
The following set of curl commands provide the necessary authentication and commands available in the service.

Get all employees
```
curl -i --location --request GET 'localhost:4000/employees' \
--header 'Authorization: password' \
--header 'Content-Type: application/json'
```
Create a new employee
```
curl -i --location --request POST 'localhost:4000/employees' \
--header 'Authorization: password' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "DiCaprio",
        "salary": "40000000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Core"
    }'
```
Delete an employee
```
curl -i --location --request DELETE 'localhost:4000/employees/1' \
--header 'Authorization: password' \
--header 'Content-Type: application/json'
```
Get the summary stats for all employees
```
curl -i --location --request GET 'localhost:4000/employees/summary-stats' \
--header 'Authorization: password' \
--header 'Content-Type: application/json'
```
Get the summary stats for all contractor employees
```
curl -i --location --request GET 'localhost:4000/employees/summary-stats?onContract=true' \
--header 'Authorization: password' \
--header 'Content-Type: application/json'
```
Get the summary stats for employees by department
```
curl -i --location --request GET 'localhost:4000/employees/summary-stats/departments' \
--header 'Authorization: password' \
--header 'Content-Type: application/json'
```
Get the summary stats for employees by sub-department
```
curl -i --location --request GET 'localhost:4000/employees/summary-stats/sub-departments' \
--header 'Authorization: password' \
--header 'Content-Type: application/json'
```

### Contributing Best Practices
1. Create a feature branch from master with the story number of your code changes
2. Request a code review before merging to master
3. Our CI/CD pipeline should run the linter and tests before allowing merge to master
4. Always write unit & functional tests where appropriate with your code changes
5. Function names should describe what the method does
6. [Variable names should be immediately understandble to an unfamiliar reader](https://google.github.io/styleguide/jsguide.html#naming-rules-common-to-all-identifiers)
7. New feature directories should following established directory and file naming patterns
8. Discuss linting rule changes with the back end team before changing
