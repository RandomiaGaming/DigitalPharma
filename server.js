let app;
let sqlpool;

let username;
let password;
let database;
let port;

function LoadEnvironment() {
    const fs = require("fs");
    const environment = JSON.parse(fs.readFileSync("./environment.json", "utf8"));
    username = environment.username;
    password = environment.password;
    database = environment.database;
    port = environment.port;
}
function InitSql() {
    const mysql = require("mysql");
    sqlpool = mysql.createPool({
        host: "classmysql.engr.oregonstate.edu",
        user: username,
        password: password,
        database: database
    });

    const util = require("util");
    sqlpool.query = util.promisify(sqlpool.query);
}
function InitApp() {
    const path = require("path");
    const express = require("express");
    app = express();

    // API Server
    const apiServer = require("./src/api_server");
    app.use(express.json());
    apiServer.SetupAPIEndpoints(app, sqlpool);

    // View Server
    const viewServer = require("./src/view_server");
    const { engine } = require("express-handlebars");
    app.engine("hbs", engine({
        extname: "hbs",
        defaultLayout: "Main",
        layoutsDir: path.join(__dirname, "views", "layouts")
    }));
    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "views"));
    const staticContentPath = path.join(__dirname, "public_html");
    app.use(express.static(staticContentPath));
    viewServer.SetupViewEndpoints(app, apiServer);

    app.listen(port, () => {
        console.log("Started server!");
    });
}

function main() {
    LoadEnvironment();
    InitSql();
    InitApp();
}
main();