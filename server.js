// This function loads the following values from environment.json
let db_hostname;
let db_username;
let db_password;
let db_name;
let app_port;
function LoadEnvironment() {
    const fs = require("fs");
    const environmentText = fs.readFileSync("./environment.json", "utf8");
    const environment = JSON.parse(environmentText);
    db_hostname = environment.db_hostname;
    db_username = environment.db_username;
    db_password = environment.db_password;
    db_name = environment.db_name;
    app_port = environment.app_port;
}

// This function initializes the following variable to a new sql pool
let sqlpool;
function InitSql() {
    const mysql = require("mysql");
    sqlpool = mysql.createPool({
        host: db_hostname,
        user: db_username,
        password: db_password,
        database: db_name
    });
    const util = require("util");
    sqlpool.query = util.promisify(sqlpool.query);
}

// This function initializes the express app
let app;
let apiServer;
let viewServer;
function InitApp() {
    // First we initialize express
    const express = require("express");
    app = express();

    // Then we setup the api server api server
    apiServer = require("./src/api_server");
    app.use(express.json());
    apiServer.SetupAPIEndpoints(app, sqlpool);

    // Then we set up the view server
    viewServer = require("./src/view_server");
    const hbs = require("hbs");
    const handlebars = require("express-handlebars");
    app.engine("hbs", handlebars.engine({
        extname: "hbs",
        defaultLayout: "Main",
        layoutsDir: "./views/layouts",
        helpers: {
            keyvalues: function (obj, options) {
                const keys = Object.keys(obj);
                return keys.map(key => {
                    const context = { key: key, value: obj[key] };
                    return options.fn(context);
                }).join('');
            },
            eval: function (statement, context) {
                const template = hbs.compile(statement);
                return new hbs.SafeString(template(context));
            }
        }
    }));
    app.set("view engine", "hbs");
    app.set("views", "./views");
    app.use(express.static("./public_html"));
    viewServer.SetupViewEndpoints(app, apiServer);

    // Finally we start the express server
    app.listen(app_port, () => {
        console.log("Started server!");
    });
}

// Use the aboce functions to set up and run the server
function main() {
    LoadEnvironment();
    InitSql();
    InitApp();
}
main();