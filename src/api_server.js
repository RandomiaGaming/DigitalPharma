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
    const query = `INSERT INTO Patients (firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES (\"${firstName}\", \"${lastName}\", \"${dateOfBirth}\", \"${email}\", \"${phoneNumber}\", \"${address}\");`;
    const results = await SQL_Query(query);
    return results;
}
async function API_RemovePatient(patientID) {
    const query = `DELETE FROM Patients WHERE patientID=\"${patientID}\";`;
    const results = await SQL_Query(query);
    return results;
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `UPDATE Patients SET firstName=\"${firstName}\", lastName=\"${lastName}\", dateOfBirth=\"${dateOfBirth}\", email=\"${email}\", phoneNumber=\"${phoneNumber}\", address=\"${address}\" WHERE patientID=\"${patientID}\";`;
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
        const results = await API_AddPatient(req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address);
        res.json(results);
    });
    app.post("/API/RemovePatient", async (req, res) => {
        const results = await API_RemovePatient(req.body.patientID);
        res.json(results);
    });
    app.post("/API/UpdatePatient", async (req, res) => {
        const results = await API_UpdatePatient(req.body.patientID, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address);
        res.json(results);
    });
}

// CRUD operations on Clinics table
async function API_GetClinics() {
    const query = `SELECT * FROM Clinics;`;
    const results = await SQL_Query(query);
    return results;
}
async function API_GetClinicByID(clinicID) {
    const query = `SELECT * FROM Clinics WHERE clinicID=\"${clinicID}\";`;
    const results = await SQL_Query(query);
    return results;
}
async function API_AddClinic(address, email, phoneNumber) {
    const query = `INSERT INTO Clinics (address, email, phoneNumber) VALUES (\"${address}\", \"${email}\", \"${phoneNumber}\");`;
    const results = await SQL_Query(query);
    return results;
}
async function API_RemoveClinic(clinicID) {
    const query = `DELETE FROM Clinics WHERE clinicID=\"${clinicID}\";`;
    const results = await SQL_Query(query);
    return results;
}
async function API_UpdateClinic(clinicID, address, email, phoneNumber) {
    const query = `UPDATE Patients SET address=\"${address}\", email=\"${email}\", phoneNumber=\"${phoneNumber}\" WHERE clinicID=\"${clinicID}\";`;
    const results = await SQL_Query(query);
    return results;
}

function SetupAPIEndpoints(appIn, sqlpoolIn) {
    app = appIn;
    sqlpool = sqlpoolIn;

    app.post("/API/GetClinics", async (req, res) => {
        const results = await API_GetClinicByID();
        res.json(results);
    });
    app.post("/API/GetClinicByID", async (req, res) => {
        const results = await API_GetClinics(req.body.clinicID);
        res.json(results);
    });
    app.post("/API/AddClinic", async (req, res) => {
        const results = await API_AddClinic(req.body.address, req.body.last, req.body.email, req.body.phoneNumber);
        res.json(results);
    });
    app.post("/API/RemoveClinic", async (req, res) => {
        const results = await API_RemoveClinic(req.body.clinicID);
        res.json(results);
    });
    app.post("/API/UpdateClinic", async (req, res) => {
        const results = await API_UpdateClinic(req.body.address, req.body.email, req.body.phoneNumber);
        res.json(results);
    });
}

module.exports.SQL_Query = SQL_Query;
module.exports.API_GetPatients = API_GetPatients;
module.exports.API_GetPatientByID = API_GetPatientByID;
module.exports.API_AddPatient = API_AddPatient;
module.exports.API_RemovePatient = API_RemovePatient;
module.exports.API_UpdatePatient = API_UpdatePatient;
module.exports.API_GetClinics = API_GetClinics;
module.exports.API_GetClinicByID = API_GetClinicByID;
module.exports.API_AddClinic = API_AddClinic;
module.exports.API_RemoveClinic = API_RemoveClinic;
module.exports.API_UpdateClinic = API_UpdateClinic;
module.exports.SetupAPIEndpoints = SetupAPIEndpoints;