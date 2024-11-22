console.log("Loading dependencies...");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const mysql = require("mysql");
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const apiServer = require("./api_server/api_server");
const htmlServer = require("./html_server/html_server");
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

console.log("Setting up html server...");
app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "Main",
    layoutsDir: path.join(__dirname, "html_server", "layouts"),
    partialsDir: path.join(__dirname, "html_server", "partials")
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "html_server", "views"));
const staticContentPath = path.join(__dirname, "html_server", "content");
app.use(express.static(staticContentPath));
htmlServer.InitEndpoints(app);
console.log("Set up html server.");
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