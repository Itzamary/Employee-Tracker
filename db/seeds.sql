INSERT INTO department (name)
VALUES
('Sales'),
('Managers'),
('Finances'),
('Legal');


INSERT INTO roles (title, salary, department_Id)
VALUES
('cashier', 30000, 1),
('day manager', 50000, 2),
('night manager', 55000, 2),
('billing clerk', 60000, 3),
('lawyer', 200000, 4);


INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
('mike', 'towers', 1, null),
('mary', 'gonzalez', 2, 1),
('jay', 'jimenez', 3, NULL),
('dora', 'carrington', 4, 2),
('ronald', 'mcdonald', 5, NULL);