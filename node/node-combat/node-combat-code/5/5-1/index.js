const fs = require("fs");
const {promisify} = require("util");

const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const args = process.argv.splice(2);

const command = args.shift();
const content = args.join(" ");


const file = __dirname + "/tasks.json";


switch (command) {
  case "add":
    addTask(file, content);
    break;
  case "list":
    listTasks(file);
    break;
  default:
    console.log("Usage add | list command");
}


function openFile(file) {
  return stat(file).then(() => {
    return readFile(file, "utf8").then(data => {
      return JSON.parse(data.toString() || "[]");
    });
  }).catch(e => {
    return JSON.parse("[]");
  });
}

function addTask(file, content) {
  openFile(file).then((tasks) => {
    tasks.push(content);
    storeTask(file, tasks);
  })
}

function storeTask(file, text) {
  const src = JSON.stringify(text);
  return writeFile(file, src, "utf8").then(e => {
    console.log("Saved\n");
  })
}

function listTasks(file) {
  openFile(file).then((tasks) => {
      for (const i in tasks) {
        console.log(tasks[i]);
      }
    }
  )
}
