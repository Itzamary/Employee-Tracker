const inquirer = require('inquirer');
const db = require('./db/connection');

const roleTitleArr =  [];
const roleObjArr = [];
const empNames = [];

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the departments name? (Required)',
            validate: department => {
                if (department) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(departmentInfo => {
        const sql = `INSERT INTO department (name)
        VALUES (?)`
        const depName = departmentInfo.departmentName;
        db.query(sql, depName, (err, response) => {
            console.log(err)
            if (err) {
                console.log(err);
                return
            }
            console.log(response, "department added successfully !")
            loopPrompt(); 
        })
        
        
    })
}


const addRole = () => {
    const sql = `SELECT * FROM department`;
    let depNamesArr = [];
    let depArr = [];
    db.query(sql, (err, res) => {


        if (err) {
            console.log(err);
            return;
        }
        console.log(res, "adding dep");
        // depArr.push(res);
        res.forEach(dep => {
            depNamesArr.push(dep.name);
            depArr.push(dep);
            return depNamesArr, depArr;
        });
    })
    
    return inquirer.prompt([

        {
            type: 'input',
            name: 'roleName',
            message: 'What is the roles name? (Required)',
            validate: role => {
                if (role) {
                    return true
                } else {
                    return false;
                }
            }, 
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary for this role',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'What is the roles department',
            choices: depNamesArr
        }
    ])
    .then(roleInfo => {
        const depName = roleInfo.roleDepartment;
        const depId = [];

       depArr.forEach(obj => {
            console.log(obj, 'obj');
            if (depName === obj.name) {
                depId.push(obj.id);

            };
        })


        const info = [roleInfo.roleName, roleInfo.roleSalary, depId];
        const sql = `INSERT INTO roles (title, salary, department_id)
        VALUE (?,?,?)`;
        db.query(sql, info, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(res, 'added a role.');
            loopPrompt();
        })
    })
}

const addEmployee = () => {
    const sql = `SELECT * FROM roles`;
    // const roleTitleArr =  [];
    // const roleObjArr = [];

    db.query(sql, (err, res) => {
        if (err){
            console.log(err);
            return;
        }

        res.forEach(role => {
         roleTitleArr.push(role.title);
         roleObjArr.push(role);
            return roleTitleArr, roleObjArr;
        })
    });

    const sql2 = `SELECT * from employee where manager_id IS NULL`
    const managersArr = [];
    const managerInfo = [];
    db.query(sql2, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        res.forEach(manager => {
            const manName = `${manager.first_name} ${manager.last_name}`;
            managersArr.push(manName);
            managerInfo.push(manager);
        })
        
    });
    
    return inquirer.prompt([

        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name? (Required)',
            validate: firstname => {
                if (firstname) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name? (Required)',
            validate: lastname => {
                if (lastname) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role', 
            message: 'What is the empolyees role? (Require)',
            choices: roleTitleArr
        },
        {
            type: 'list',
            name: 'empManager',
            message: 'Who is the employees manager? (Require)',
            choices: managersArr
        }
        
    ])
    .then(employeeInfo => {
        const emplInformation = (employeeInfo.empManager);
        const roleInfomation = employeeInfo.role;

        
        const roleId = [];
        const manId = [];
        managerInfo.forEach(obj => {
            const managerName = `${obj.first_name} ${obj.last_name}`;
            if (emplInformation === managerName ){
                manId.push(obj.id);
            };
        })

        roleObjArr.forEach(title => {
            if (roleInfomation === title.title){
                roleId.push(title.id);
            };
        })

        const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
        VALUES(?,?,?,?)`;
        const emplInfo = [employeeInfo.firstName, employeeInfo.lastName, roleId, manId];
        db.query(sql, emplInfo, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(res, 'added employee!');
            loopPrompt();
        })
    })
};

const updateEmployee = () => {
    const sql = `SELECT * FROM employee`;
    // let empNames = [];
    const emplObj = [];

    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(res, 'employee response');

        res.forEach(employee => {
            const emmplName = `${employee.first_name} ${employee.last_name}`;
            empNames.push([emmplName]);
            // return empNames;

        });
        console.log(empNames, 'employees names');
        return empNames;
    })



    return inquirer.prompt([
        
        {
            name: 'emoloyeeName',
            type: 'list',
            message: 'Who is the employee you would like to update?',
            choices: empNames
        },
        {
            type: 'list',
            name: 'emplTitle',
            message: 'What is the employees new role? (Require)',
            choices: roleTitleArr
        }

    ])
    .then(employeeInformation => {
        console.log(employeeInformation, 'employeeInformation');
    })
 };

const loopPrompt = ()=> {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'mainQuestions',
            message: 'What would you like to choose?', 
            choices: [
                'View all departments',
                'View all roles',
                'View all empoloyees',
                'Add a department',
                'Add a role',
                'Add a employee',
                'Update an employees role',
                'quit prompt'
            ]
        }
    ])
    .then(info => {     
        if (info.mainQuestions === 'View all departments') {
            
            const sql = `SELECT * FROM department`;
            db.query(sql, (err, response) => {
                if (err) {
                    console.log(err, 'error');
                    return;
                }
                console.log("==============")
                console.table(response);
                console.log("==============")
    
                loopPrompt();
            })
            
        } else if (info.mainQuestions === 'View all roles') {

            const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles INNER JOIN department WHERE roles.department_id = department.id ORDER BY roles.id ASC`;

            db.query(sql, (err, response) => {
                if (err) {
                    console.log(err, 'error');
                    return;
                }
                console.log("==============")
                console.table(response);
                console.log("==============")

                loopPrompt();
            })
            

        } else if (info.mainQuestions === 'View all empoloyees') {
            const sql =`SELECT e.id, e.first_name, e.last_name, roles.title, roles.salary, department.name AS department, CONCAT(m.first_name," ", m.last_name) AS manager FROM employee e JOIN roles ON e.roles_id = roles.id JOIN department on roles.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id`;
            db.query(sql, (err, response) => {
                if (err) {
                    console.log(err, 'error');
                    return;
                }
                console.log("==============")
                console.table(response);
                console.log("==============");
                loopPrompt();
            })

        } else if (info.mainQuestions === 'Add a department') {
            addDepartment();
        } else if (info.mainQuestions === 'Add a role') {
            addRole();
        } else if (info.mainQuestions === 'Add a employee') {
            addEmployee();
        } else if (info.mainQuestions === 'Update an employees role') {
            updateEmployee();


        } else {
            db.end();
        }
    })
}


loopPrompt();