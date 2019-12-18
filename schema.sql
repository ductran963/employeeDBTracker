DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
  
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  manager_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (department)
VALUES ("Engineering"), ("Business"), ("Developer"), ("Marketing"), ("Legal");

INSERT INTO role (title, salary)
VALUES ("Software Engineer", 80000), ("Finance Manager", 40000), ("Junior Developer", 60000), ("Martketing Manager", 30000), ("Legal Assistant", 78000);

INSERT INTO employee (first_name, last_name, manager_name)
VALUES ("Roger", "Federer", "Zey Gil"), ("Rafael", "Nadal", "Uncle Tony"), ("Kei", "Nishikori", "Micheal Chen"), ("John", "Fish", "Bob Builder"), ("Stan", "Wawrinka", "Leonisas");


-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("chocolate", 3.10, 120);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("strawberry", 3.25, 75);


