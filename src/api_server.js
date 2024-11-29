let app;
let sqlpool;

async function SQL_Query(query) {
    const results = await sqlpool.query(query);
    return results;
}
function EscapeSQL(sqlArgument) {
    const sqlValidCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789@+-.,/\\";
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
function FormatSQLResults(results) {
    return results.map(row => {
        const transformedRow = {};
        for (const [key, value] of Object.entries(row)) {
            if (value instanceof Date) {
                const year = value.getFullYear();
                const month = (value.getMonth() + 1).toString().padStart(2, '0');
                const day = value.getDate().toString().padStart(2, '0');
                transformedRow[key] = `${year}-${month}-${day}`;
            } else {
                transformedRow[key] = value != null ? value.toString() : "";
            }
        }
        return transformedRow;
    });
}

// CRUD operations on Patients table
async function API_GetPatients() {
    const query = `SELECT * FROM Patients;`;
    const results = await SQL_Query(query);
    const formattedResults = FormatSQLResults(results);
    return formattedResults;
}
async function API_GetPatientByID(patientID) {
    const query = `SELECT * FROM Patients WHERE patientID=${EscapeSQL(patientID)};`;
    const results = await SQL_Query(query);
    const formattedResults = FormatSQLResults(results);
    return formattedResults[0];
}
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `INSERT INTO Patients (firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES (${EscapeSQL(firstName)}, ${EscapeSQL(lastName)}, ${EscapeSQL(dateOfBirth)}, ${EscapeSQL(email)}, ${EscapeSQL(phoneNumber)}, ${EscapeSQL(address)});`;
    await SQL_Query(query);
}
async function API_RemovePatient(patientID) {
    const query = `DELETE FROM Patients WHERE patientID=${EscapeSQL(patientID)};`;
    await SQL_Query(query);
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `UPDATE Patients SET firstName=${EscapeSQL(firstName)}, lastName=${EscapeSQL(lastName)}, dateOfBirth=${EscapeSQL(dateOfBirth)}, email=${EscapeSQL(email)}, phoneNumber=${EscapeSQL(phoneNumber)}, address=${EscapeSQL(address)} WHERE patientID=${EscapeSQL(patientID)};`;
    await SQL_Query(query);
}

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
function SetupAPIEndpoints(appIn, sqlpoolIn) {
    app = appIn;
    sqlpool = sqlpoolIn;

    SetupAPIEndpoint("/API/GetPatients", async (req, res) => {
        const results = await API_GetPatients();
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetPatientByID", async (req, res) => {
        const result = await API_GetPatientByID(req.body.patientID.toString());
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddPatient", async (req, res) => {
        await API_AddPatient(req.body.firstName.toString(), req.body.lastName.toString(), req.body.dateOfBirth.toString(), req.body.email.toString(), req.body.phoneNumber.toString(), req.body.address.toString());
        res.json({});
    });
    SetupAPIEndpoint("/API/RemovePatient", async (req, res) => {
        await API_RemovePatient(req.body.patientID.toString());
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdatePatient", async (req, res) => {
        await API_UpdatePatient(req.body.patientID.toString(), req.body.firstName.toString(), req.body.lastName.toString(), req.body.dateOfBirth.toString(), req.body.email.toString(), req.body.phoneNumber.toString(), req.body.address.toString());
        res.json({});
    });
}

module.exports.API_GetPatients = API_GetPatients;
module.exports.API_GetPatientByID = API_GetPatientByID;
module.exports.API_AddPatient = API_AddPatient;
module.exports.API_RemovePatient = API_RemovePatient;
module.exports.API_UpdatePatient = API_UpdatePatient;

module.exports.SetupAPIEndpoints = SetupAPIEndpoints;