// A helper function to make defining a view endpoint easier
function SetupViewEndpoint(endpointName, handler) {
    app.get(endpointName, async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            const errMsg = `ERROR: ${err.message || err}`;
            console.error(errMsg);
            res.status(500).json({ error: errMsg });
        }
    });
}

// This function sets the following values for use later and sets up all the endpoints for the views on our website
let app;
let apiServer;
function SetupViewEndpoints(appIn, apiServerIn) {
    app = appIn;
    apiServer = apiServerIn;

    SetupViewEndpoint("/", async (req, res) => {
        res.render("Home", { title: "Home" });
    });

    // Views for Patients table
    SetupViewEndpoint("/Patients", async (req, res) => {
        const results = await apiServer.API_GetPatients();
        res.render("Patients/Patients", { title: "Patients", results: results, tableNameSingular: "Patient", tableName: "Patients" });
    });
    SetupViewEndpoint("/Patients/New", async (req, res) => {
        res.render("Patients/Patients_New", { title: "New Patient", tableNameSingular: "Patient", tableName: "Patients" });
    });
    SetupViewEndpoint("/Patients/Edit", async (req, res) => {
        const result = await apiServer.API_GetPatientByID(req.query.patientID.toString());
        res.render("Patients/Patients_Edit", { title: "Edit Patient", result: result, tableNameSingular: "Patient", tableName: "Patients" });
    });
    SetupViewEndpoint("/Patients/Delete", async (req, res) => {
        const result = await apiServer.API_GetPatientByID(req.query.patientID.toString());
        res.render("Patients/Patients_Delete", { title: "Delete Patient", result: result, tableNameSingular: "Patient", tableName: "Patients" });
    });
}
module.exports.SetupViewEndpoints = SetupViewEndpoints;