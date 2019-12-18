var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ttd07241994#",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View ALL",
        "View all employees",
        "View all roles",
        "View all departments",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Delete employee",
        "Delete department",
        "Delete role",
        "Update employee role",
        "View by manager",
        
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View ALL":
        viewAll();
        break;

      case "View all employees":
        viewAllEmployees();
        break;

      case "View all roles":
        viewAllRoles();
        break;
      
      case "View all departments":
        viewAllDepartments();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Delete employee":
        deleteEmployee();
        break;

      case "Delete role":
        deleteRole();
        break;

      case "Delete department":
        deleteDepartment();
        break;

      case "Update employee role":
        updateEmployeeRole();
        break;

      case "View by manager":
        viewByManager();
        break;

      case "Exit":
        connection.end();
        break;
      }
    });
}


function viewAll() {
  var query = "SELECT department.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_name FROM department INNER JOIN role ON department.id=role.id INNER JOIN employee ON department.id=employee.id";

  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllEmployees() {
  var query = "SELECT * FROM employee";

  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllRoles() {
  var query = "SELECT * FROM role";

  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllDepartments() {
  var query = "SELECT * FROM department";

  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addEmployee() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "employeeFirst",
        type: "input",
        message: "What is new employee first name?"
      },
      {
        name: "employeeLast",
        type: "input",
        message: "What is new employee last name?"
      },
      {
        name: "managerName",
        type: "input",
        message: "What is manager name?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      var query ="INSERT INTO employee SET ?";
      connection.query( query, 
        {
          first_name: answer.employeeFirst,
          last_name: answer.employeeLast,
          manager_name: answer.managerName
          
        }, function(err, res) {
          console.table(res);
          start();
        }
      );
    });
}

function addRole() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "employeeRole",
        type: "input",
        message: "What is new employee role?"
      }
    ]).then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      var query ="INSERT INTO role SET ?";
      connection.query( query, 
        {
          title: answer.employeeRole
          
        }, function(err, res) {
          console.table(res);
          start();
        }
      );
    })
  }

  function addDepartment() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "employeeDepatment",
          type: "input",
          message: "What is new employee department?"
        }
      ]).then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        var query ="INSERT INTO department SET ?";
        connection.query( query, 
          {
            department: answer.employeeDepartment
            
          }, function(err, res) {
            console.table(res);
            start();
          }
        );
      })
    }


function updateEmployeeRole() {
  // prompt for info about the item being put up for auction
  
    connection.query("SELECT * FROM role", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            
            name: "updateName",
            type: "input",
            message: "Type in the name of employee you would like to update?"
            
          },
          {
            
            name: "updateRole",
            type: "list",
            message: "Which role would you like to update?",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
              }
              return choiceArray;
            }
            
          }]).then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        var query = "UPDATE role SET ? WHERE ?";
        connection.query(query,
          {
            title: answer.updateRole
         
          },
          function (err, res) {
            // console.table(res);
            start();
          }
        )
      })
    })
  }

  function viewByManager() {
    // prompt for info about the item being put up for auction
    
      connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt([
            
            {
              
              name: "managerName",
              type: "list",
              message: "Which employees manager would you like to view?",
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].manager_name);
                }
                return choiceArray;
              }
              
            }]).then(function (answer) {
          // when finished prompting, insert a new item into the db with that info
          var query = "SELECT first_name, last_name FROM employee WHERE ?";
          connection.query(query,
            
            {
              manager_name: answer.managerName
           
            },
            function (err, res) {
              console.table(res);
              start();
            }
          )
        })
      })
    }

  
function deleteEmployee() {
  // prompt for info about the item being put up for auction

  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        
        {

          name: "deleteEmployee",
          type: "list",
          message: "Which employee would you like to delete?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].first_name);
            }
            return choiceArray;
          }

        }]).then(function (answer) {
          // when finished prompting, insert a new item into the db with that info
          var query = "DELETE FROM employee WHERE ?";
          connection.query(query,
            {
              first_name: answer.deleteEmployee

            },
            function (err, res) {
              console.table(res);
              start();
            }
          )
        })
  })
}

function deleteDepartment() {
  // prompt for info about the item being put up for auction

  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
       
        {

          name: "deleteDepartment",
          type: "list",
          message: "Which department would you like to delete?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].department);
            }
            return choiceArray;
          }

        }]).then(function (answer) {
          // when finished prompting, insert a new item into the db with that info
          var query = "DELETE FROM department WHERE ?";
          connection.query(query,
            {
              department: answer.deleteDepartment

            },
            function (err, res) {
              console.table(res);
              start();
            }
          )
        })
  })
}

function deleteRole() {
  // prompt for info about the item being put up for auction

  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        
        {

          name: "deleteRole",
          type: "list",
          message: "Which role would you like to delete?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          }

        }]).then(function (answer) {
          // when finished prompting, insert a new item into the db with that info
          var query = "DELETE FROM role WHERE ?";
          connection.query(query,
            {
              title: answer.deleteRole

            },
            function (err, res) {
              console.table(res);
              start();
            }
          )
        })
  })
}


