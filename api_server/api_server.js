function InitEndpoints(app, sqlpool) {
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
}

module.exports.InitEndpoints = InitEndpoints;