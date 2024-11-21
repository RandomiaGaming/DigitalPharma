console.log("Loading dependencies...");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const mysql = require("mysql");
const express = require("express");
const app = express();
const apiServer = require("./api_server/api_server");
console.log("Loaded dependencies.");
console.log();

console.log("Loading environment.json...");
const environment = JSON.parse(fs.readFileSync("./environment.json", "utf8"));
const username = environment.username;
const password = environment.password;
const database = environment.database;
const port = environment.port;
console.log("Loaded environment.json.");
console.log();

console.log("Connecting to sql database...");
var sqlpool = mysql.createPool({
    connectionLimit: 10,
    host: "classmysql.engr.oregonstate.edu",
    user: username,
    password: password,
    database: database
});
console.log("Connected to sql database.");
console.log();

console.log("Setting up static html server...");
const htmlRootPath = path.join(__dirname, "public_html");
app.use(express.static(htmlRootPath));
app.get("/", (req, res) => {
    res.sendFile(path.join(htmlRootPath, "home.html"));
});
console.log("Set up static html server.");
console.log();

console.log("Setting up api server...");
app.use(express.json());
apiServer.InitEndpoints(app, sqlpool);
console.log("Set up api server.");
console.log();

console.log("Starting server...");
const hostname = execSync("hostname", { encoding: "utf8" }).trim();
app.listen(port, () => {
    console.log(`Started server at http://${hostname}:${port}`);
});