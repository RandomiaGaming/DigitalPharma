let app;
let sqlpool;

async function SQL_Query(query) {
    const results = await sqlpool.query(query);
    return results;
}

// CRUD operations on Patients table
async function API_GetPatients() {
    const query = `SELECT * FROM Patients;`;
    const results = await SQL_Query(query);
    return results;
}
async function API_GetPatientByID(patientID) {
    const query = `SELECT * FROM Patients WHERE patientID=\"${patientID}\";`;
    const results = await SQL_Query(query);
    return results;
}
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `INSERT INTO Patients (firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES (\"${request.firstName}\", \"${request.lastName}\", \"${request.dateOfBirth}\", \"${request.email}\", \"${request.phoneNumber}\", \"${request.address}\");`;
    const results = await SQL_Query(query);
    return results;
}
async function API_RemovePatient(patientID) {
    const query = `DELETE FROM Patients WHERE patientID=\"${request.patientID}\";`;
    const results = await SQL_Query(query);
    return results;
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `UPDATE Patients SET firstName=\"${request.firstName}\", lastName=\"${request.lastName}\", dateOfBirth=\"${request.dateOfBirth}\", email=\"${request.email}\", phoneNumber=\"${request.phoneNumber}\", address=\"${request.address}\" WHERE patientID=\"${request.patientID}\";`;
    const results = await SQL_Query(query);
    return results;
}

function SetupAPIEndpoints(appIn, sqlpoolIn) {
    app = appIn;
    sqlpool = sqlpoolIn;

    app.post("/API/GetPatients", async (req, res) => {
        const results = await API_GetPatientByID();
        res.json(results);
    });
    app.post("/API/GetPatientByID", async (req, res) => {
        const results = await API_GetPatients(req.body.patientID);
        res.json(results);
    });
    app.post("/API/AddPatient", async (req, res) => {
        const results = await API_AddPatient(req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.phoneNumber, req.body.address);
        res.json(results);
    });
    app.post("/API/RemovePatient", async (req, res) => {
        const results = await API_RemovePatient(req.body.patientID);
        res.json(results);
    });
    app.post("/API/UpdatePatient", async (req, res) => {
        const results = await API_UpdatePatient(req.body.patientID, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.phoneNumber, req.body.address);
        res.json(results);
    });
}

module.exports.SQL_Query = SQL_Query;
module.exports.API_GetPatients = API_GetPatients;
module.exports.API_GetPatientByID = API_GetPatientByID;
module.exports.API_AddPatient = API_AddPatient;
module.exports.API_RemovePatient = API_RemovePatient;
module.exports.API_UpdatePatient = API_UpdatePatient;
module.exports.SetupAPIEndpoints = SetupAPIEndpoints;