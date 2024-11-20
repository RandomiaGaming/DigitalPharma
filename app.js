console.log("Loading dependencies...");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const mysql = require("mysql");
const express = require("express");
const app = express();

console.log("Loading environment.json...");
const environment = JSON.parse(fs.readFileSync("./environment.json", "utf8"));

console.log("Connecting to sql database...");
var sqlpool = mysql.createPool({
    connectionLimit: 10,
    host: "classmysql.engr.oregonstate.edu",
    user: environment.username,
    password: environment.password,
    database: environment.database
});

console.log("Setting up static html server...");
const hostname = execSync("hostname", { encoding: "utf8" }).trim();
const htmlRootPath = path.join(__dirname, "public_html");
app.use(express.static(htmlRootPath));
app.get("/", (req, res) => {
    res.sendFile(path.join(htmlRootPath, "index.html"));
});

console.log("Setting up api server...");
app.use(express.json());
app.post("/API/GetPatientByID", (req, res) => {
    const request = req.body;
    const query = `SELECT * FROM Patients WHERE patientID=\"${request.patientID}\";`;
    console.log(query);
    sqlpool.query(query, function (errors, results, fields) {
        res.json({ results: results, errors: errors });
    });
});
app.post("/API/GetPatients", (req, res) => {
    const request = req.body;
    const query = `SELECT * FROM Patients;`;
    console.log(query);
    sqlpool.query(query, function (errors, results, fields) {
        res.json({ results: results, errors: errors });
    });
});
app.post("/API/AddPatient", (req, res) => {
    const request = req.body;
    const query = `INSERT INTO Patients (firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES (\"${request.firstName}\", \"${request.lastName}\", \"${request.dateOfBirth}\", \"${request.email}\", \"${request.phoneNumber}\", \"${request.address}\");`;
    console.log(query);
    sqlpool.query(query, function (errors, results, fields) {
        res.json({ results: results, errors: errors });
    });
});
app.post("/API/RemovePatient", (req, res) => {
    const request = req.body;
    const query = `DELETE FROM Patients WHERE patientID=\"${request.patientID}\";`;
    console.log(query);
    sqlpool.query(query, function (errors, results, fields) {
        res.json({ results: results, errors: errors });
    });
});
app.post("/API/UpdatePatient", (req, res) => {
    const request = req.body;
    const query = `UPDATE Patients SET firstName=\"${request.firstName}\", lastName=\"${request.lastName}\", dateOfBirth=\"${request.dateOfBirth}\", email=\"${request.email}\", phoneNumber=\"${request.phoneNumber}\", address=\"${request.address}\" WHERE patientID=\"${request.patientID}\";`;
    console.log(query);
    sqlpool.query(query, function (errors, results, fields) {
        res.json({ results: results, errors: errors });
    });
});

console.log("Starting server...");
app.listen(environment.port, () => {
    console.log(`Server is running at http://${hostname}:${environment.port}`);
});