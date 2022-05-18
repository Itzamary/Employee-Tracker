
const inquirer = require('inquirer');

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department name',
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
        console.log('department added', departmentInfo);
        loopPrompt();
        
    })
}


const addRole = () => {
    return inquirer.prompt([

        {
            type: 'input',
            name: 'role name',
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
            name: 'role salary',
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
            type: 'input',
            name: 'role department',
            message: 'What is the roles department',
            validate: department => {
                if (department) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then(roleInfo => {
        console.log('role information', roleInfo);
        loopPrompt();
    })
}

const addEmployee = () => {
    return inquirer.prompt([

        {
            type: 'input',
            name: 'first name',
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
            name: 'last name',
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
            type: 'input',
            name: 'role', 
            message: 'What is the empolyees role? (Require)',
            validate: empRole => {
                if (empRole) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'emp manager',
            message: 'Who is the employees manager? (Require)',
            validate: man => {
                if (man) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        
    ])
    .then(employeeInfo => {
        console.log('employee info', employeeInfo);
        loopPrompt();
    })
}

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
        console.log(info);
        
        if (info.mainQuestions === 'View all departments') {

        } else if (info.mainQuestions === 'View all roles') {

        } else if (info.mainQuestions === 'View all empoloyees') {

        } else if (info.mainQuestions === 'Add a department') {
            addDepartment();
        } else if (info.mainQuestions === 'Add a role') {
            addRole();
        } else if (info.mainQuestions === 'Add a employee') {
            addEmployee();
        } else if (info.mainQuestions === 'Update an employees role') {

        } else {
            return;
        }

    })
}


loopPrompt();