INSERT INTO departments 
  (dept_name)
VALUES
  ('Leadership'),
  ('Field Agents'),
  ('Tech and Communication'),
  ('Former Members');

INSERT INTO roles 
  (title, salary, dept_id)
VALUES 
('Assistant Director', 175000, 1),
('Section Chief', 160000, 1),
('Unit Chief', 155000, 1),
('Senior Field Agent', 140000, 2),
('Supervisory Special Agent', 130000, 2),
('Technical Analyst', 250000, 3),
('Former Member', 0, 4);

INSERT INTO employees 
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Linda', 'Barnes', 1, NULL),
  ('Mateo', 'Cruz', 2, 1),
  ('Emily', 'Prentiss', 3, 2),
  ('David', 'Ross', 4, 3),
  ('Spencer', 'Reid', 5, 3),
  ('Jennifer', 'Jareau', 5, 3),
  ('Tara', 'Lewis', 5, 3),
  ('Luke', 'Alvex', 5, 3),
  ('Penelope', 'Garcia', 6, 3),
  ('Jason', 'Gideon', 7, NULL),
  ('Aaron', 'Hotchner', 7, NULL),
  ('Derek', 'Morgan', 7, NULL),
  ('Kate', 'Callahan', 7, NULL);