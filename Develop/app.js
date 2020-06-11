const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function init() {
    // Create manager object
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the managers name?",
        validate: name => {
            if (!name.length) {
                console.log("\nPlease enter a name.")
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is their employee id?",
        validate: id => {
            if (isNaN(parseInt(id))) {
                console.log("\nEmployee id should be an number");
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is their company email?",
        validate: email => {
  
            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log("\nPlease enter a valid email")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is their office number?",
        validate: num => {
            if (isNaN(parseInt(num))) {
                console.log("\nEmployee id should be an number");
                return false;
            } else {
                return true;
            }
        }
    }
    ]).then(data => {
        // push manager to employees arr
        employees.push(new Manager(data.name, data.id, data.email, data.officeNumber));
        // prompt for additional employees
        newEmployee();
    });
}

function newEmployee() {
    inquirer.prompt(
        {
            type: "list",
            name: "role",
            message: "What is the next employees role?",
            choices: [
                "Engineer",
                "Intern"
            ]
        }
    ).then(data => {
        if (data.role === "Engineer") {
            newEngineer();
        } else {
            newIntern();
        }
    })
}

// function for engineers
function newEngineer() {
    // create a new engineer object
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the engineers name?",
        validate: name => {
            if (!name.length) {
                console.log("\nPlease enter a name.")
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is their employee id?",
        validate: id => {
            if (isNaN(parseInt(id))) {
                console.log("\nEmployee id should be an number");
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is their company email?",
        validate: email => {
  
            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log("\nPlease enter a valid email")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "github",
        message: "What is their GitHub username?",
        validate: username => {
            if (!username.length) {
                console.log("\nPlease enter a name.")
                return false;
            } else {
                return true;
            }
        }
    }
    ]).then(data => {
        // push new enginneer to employees arr
        employees.push(new Engineer(data.name, data.id, data.email, data.github));
        // prompt for additional employee
        inquirer.prompt({
            type: "confirm",
            name: "additional",
            message: "Add another employee?"
        }).then(data => {
            if (data.additional === true) {
                newEmployee();
            } else {
                renderAndSave();
            }
        })
    })
}
// function for interns
function newIntern() {
    // create a new intern object
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the interns name?",
        validate: name => {
            if (!name.length) {
                console.log("\nPlease enter a name.")
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is their employee id?",
        validate: id => {
            if (isNaN(parseInt(id))) {
                console.log("\nEmployee id should be an number");
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is their company email?",
        validate: email => {
  
            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log("\nPlease enter a valid email")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "school",
        message: "What school do they attend?",
        validate: school => {
            if (!school.length) {
                console.log("\nPlease enter a name.")
                return false;
            } else {
                return true;
            }
        }
    }
    ]).then(data => {
        // push new intern to employees arr
        employees.push(new Intern(data.name, data.id, data.email, data.school));
        // prompt for additional employee
        inquirer.prompt({
            type: "confirm",
            name: "additional",
            message: "Add another employee?"
        }).then(data => {
            if (data.additional === true) {
                newEmployee();
            } else {
                renderAndSave();
            }
        })
    })
}

function renderAndSave() {
    const html = render(employees);
    fs.writeFile(outputPath, html, err => {
        if (err) {
            return console.log(err);
        }
    
        console.log("team.html saved");
    })
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

init();
