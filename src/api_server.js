let app;
let sqlpool;

async function SQL_Query(query) {
    const results = await sqlpool.query(query);
    return results;
}
function EscapeSQL(sqlArgument) {
    const sqlValidCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789";
    if (typeof sqlArgument !== "string") {
        throw new Error("Argument is not a string. SQL injection guard blocked.");
    }    
    for (const char of sqlArgument) {
        if (!sqlValidCharset.includes(char)) {
            throw new Error("Argument contained invalid characters. SQL injection guard blocked.");
        }
    }
    return `\"${sqlArgument}\"`;
}

// CRUD operations on Patients table
async function API_GetPatients() {
    const query = `SELECT * FROM Patients;`;
    const results = await SQL_Query(query);
    return results;
}
async function API_GetPatientByID(patientID) {
    const query = `SELECT * FROM Patients WHERE patientID=${EscapeSQL(patientID)};`;
    const results = await SQL_Query(query);
    return results;
}
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `INSERT INTO Patients (firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES (${EscapeSQL(firstName)}, ${EscapeSQL(lastName)}, ${EscapeSQL(dateOfBirth)}, ${EscapeSQL(email)}, ${EscapeSQL(phoneNumber)}, ${EscapeSQL(address)});`;
    const results = await SQL_Query(query);
    return results;
}
async function API_RemovePatient(patientID) {
    const query = `DELETE FROM Patients WHERE patientID=${EscapeSQL(patientID)};`;
    const results = await SQL_Query(query);
    return results;
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `UPDATE Patients SET firstName=${EscapeSQL(firstName)}, lastName=${EscapeSQL(lastName)}, dateOfBirth=${EscapeSQL(dateOfBirth)}, email=${EscapeSQL(email)}, phoneNumber=${EscapeSQL(phoneNumber)}, address=${EscapeSQL(address)} WHERE patientID=${EscapeSQL(patientID)};`;
    const results = await SQL_Query(query);
    return results;
}

function SetupAPIEndpoint(endpointName, handler) {
    app.post(endpointName, async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            const errMsg = `ERROR: ${err.message || err}`;
            console.log(errMsg);
            res.status(500).json({ error: errMsg });
        }
    });
}
function SetupAPIEndpoints(appIn, sqlpoolIn) {
    app = appIn;
    sqlpool = sqlpoolIn;

    SetupAPIEndpoint("/API/GetPatients", async (req, res) => { 
        const results = await API_GetPatients();
        console.log(`Sending ${JSON.stringify(results)} to api client on GetPatients endpoint`);
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetPatientByID", async (req, res) => {
        const results = await API_GetPatientByID(req.body.patientID);
        res.json(results);
    });
    SetupAPIEndpoint("/API/AddPatient", async (req, res) => {
        const results = await API_AddPatient(req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address);
        res.json(results);
    });
    SetupAPIEndpoint("/API/RemovePatient", async (req, res) => {
        const results = await API_RemovePatient(req.body.patientID);
        res.json(results);
    });
    SetupAPIEndpoint("/API/UpdatePatient", async (req, res) => {
        const results = await API_UpdatePatient(req.body.patientID, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address);
        res.json(results);
    });
}

module.exports.API_GetPatients = API_GetPatients;
module.exports.API_GetPatientByID = API_GetPatientByID;
module.exports.API_AddPatient = API_AddPatient;
module.exports.API_RemovePatient = API_RemovePatient;
module.exports.API_UpdatePatient = API_UpdatePatient;

module.exports.SetupAPIEndpoints = SetupAPIEndpoints;