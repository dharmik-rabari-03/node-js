const fs = require("fs");

fs.writeFileSync("new.text", "data added");

const data = fs.readFileSync("new.text", "utf-8");

console.log(data);
