// Helper function to format dates in a better way
function FormatDate(value) {
    if (!(value instanceof Date)) {
        throw new Error("value must be a date.");
    }
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Helper function to format the results of an sql query
function FormatSQLResults(results) {
    if (results === null || results === undefined) {
        return "";
    } else if (results instanceof Date) {
        return FormatDate(results);
    } else if (Array.isArray(results)) {
        const output = [];
        for (let i = 0; i < results.length; i++) {
            output.push(FormatSQLResults(results[i]));
        }
        return output;
    } else if (typeof results === 'object') {
        const transformedObject = {};
        for (const key in results) {
            transformedObject[key] = FormatSQLResults(results[key]);
        }
        return transformedObject;
    } else {
        return results.toString();
    }
}

// Helper function to execute an sql query
async function SQL_Query(query) {
    const results = await sqlpool.query(query);
    const formattedResults = FormatSQLResults(results);
    return formattedResults;
}

// Helper function to block inputs which would allow for sql injection and formats dates properly
function EscapeSQL(sqlArgument) {
    const sqlValidCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789@+-.,/\\";
    if (sqlArgument instanceof Date) {
        const year = sqlArgument.getFullYear();
        const month = (sqlArgument.getMonth() + 1).toString().padStart(2, '0');
        const day = sqlArgument.getDate().toString().padStart(2, '0');
        sqlArgument = `${year}-${month}-${day}`;
    }
    if (typeof sqlArgument !== "string") {
        sqlArgument = sqlArgument.toString();
    }
    if (typeof sqlArgument !== "string") {
        throw new Error("Argument was invalid. SQL injection guard blocked.");
    }
    for (const c of sqlArgument) {
        if (!sqlValidCharset.includes(c)) {
            throw new Error(`Argument contained invalid characters. \"${c}\". SQL injection guard blocked.`);
        }
    }
    return `\"${sqlArgument}\"`;
}

// Helper function to make defining an api endpoint easier
function SetupAPIEndpoint(endpointName, handler) {
    app.post(endpointName, async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            const errMsg = `ERROR: ${err.message || err}`;
            console.error(errMsg);
            res.status(500).json({ error: errMsg });
        }
    });
}

// Sets the value of these vairables and sets up all the api endpoints for our server
let app;
let sqlpool;
function SetupAPIEndpoints(appIn, sqlpoolIn) {
    app = appIn;
    sqlpool = sqlpoolIn;

    // CRUD operations for Patients table
    SetupAPIEndpoint("/API/GetPatients", async (req, res) => {
        const results = await API_GetPatients();
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetPatientByID", async (req, res) => {
        const result = await API_GetPatientByID(req.body.patientID);
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddPatient", async (req, res) => {
        await API_AddPatient(req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address);
        res.json({});
    });
    SetupAPIEndpoint("/API/RemovePatient", async (req, res) => {
        await API_RemovePatient(req.body.patientID);
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdatePatient", async (req, res) => {
        await API_UpdatePatient(req.body.patientID, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address);
        res.json({});
    });

    SetupAPIEndpoint("/API/HardReset", async (req, res) => {
        await API_HardReset();
        res.json({});
    });
}
module.exports.SetupAPIEndpoints = SetupAPIEndpoints;

// CRUD operations on Patients table
async function API_GetPatients() {
    const query = `SELECT * FROM Patients;`;
    const results = await SQL_Query(query);
    const formattedResults = FormatSQLResults(results);
    return formattedResults;
}
module.exports.API_GetPatients = API_GetPatients;
async function API_GetPatientByID(patientID) {
    const query = `SELECT * FROM Patients WHERE patientID=${EscapeSQL(patientID)};`;
    const results = await SQL_Query(query);
    const formattedResults = FormatSQLResults(results);
    return formattedResults[0];
}
module.exports.API_GetPatientByID = API_GetPatientByID;
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `INSERT INTO Patients (firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES (${EscapeSQL(firstName)}, ${EscapeSQL(lastName)}, ${EscapeSQL(dateOfBirth)}, ${EscapeSQL(email)}, ${EscapeSQL(phoneNumber)}, ${EscapeSQL(address)});`;
    await SQL_Query(query);
}
module.exports.API_AddPatient = API_AddPatient;
async function API_RemovePatient(patientID) {
    const query = `DELETE FROM Patients WHERE patientID=${EscapeSQL(patientID)};`;
    await SQL_Query(query);
}
module.exports.API_RemovePatient = API_RemovePatient;
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `UPDATE Patients SET firstName=${EscapeSQL(firstName)}, lastName=${EscapeSQL(lastName)}, dateOfBirth=${EscapeSQL(dateOfBirth)}, email=${EscapeSQL(email)}, phoneNumber=${EscapeSQL(phoneNumber)}, address=${EscapeSQL(address)} WHERE patientID=${EscapeSQL(patientID)};`;
    await SQL_Query(query);
}
module.exports.API_UpdatePatient = API_UpdatePatient;

// Hard reset
async function API_HardReset() {
    const fs = require("fs");
    const ddlSql = fs.readFileSync("./sql_files/DDL.sql", "utf8");
    const ddlSqlSplit = ddlSql.split(';').map(query => query.trim()).filter(query => query.length > 0);
    for (const query of ddlSqlSplit) {
        if (query) {
            await sqlpool.query(query);
        }
    }
}
module.exports.API_HardReset = API_HardReset;