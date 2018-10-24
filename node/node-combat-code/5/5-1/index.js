const fs = require("fs");


const {promisify} = require("util");


const stat= promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile= promisify(fs.writeFile);

const args = process.argv.splice(2);

const command = args.shift(0);
const content = args.join(" ");

const file = `${__dirname}/test.json`;


switch(command) {
  case "add":
    addTask(file, content);
    break;
  case "list":
    listTasks(file);
    break;
  default:
    console.log("Usage add | list command");
}


function listTasks(file) {
  stat(file)
    .then(() => {
      return readFile(file, "utf8");
    })
    .then((data) => {
      const tasks = JSON.parse(data.toString() || '[]');
      for (let i in tasks) {
        console.log(tasks[i]);
      }
    })
    .catch(e => {
      console.log(e);
    })
}



function addTask(file, content) {
  tasks.
  writeFile(file, JSON.stringify(content), 'utf8')
    .then(() => {
      console.log("saved");
    })
    .catch(() => {

    });
}

