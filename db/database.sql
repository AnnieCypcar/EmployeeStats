CREATE TABLE IF NOT EXISTS department (
    name TEXT PRIMARY KEY NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS sub_department (
    name TEXT PRIMARY KEY NOT NULL UNIQUE,
    department_name TEXT,
    FOREIGN KEY(department_name) REFERENCES department (name)
);

CREATE TABLE IF NOT EXISTS employee (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    salary INTEGER,
    sub_department_name TEXT,
    currency TEXT,
    on_contract BOOLEAN DEFAULT 0,
    FOREIGN KEY(sub_department_name) REFERENCES sub_department (name)
);
