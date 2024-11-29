let app;
let apiServer;

function SetupViewEndpoint(endpointName, handler) {
    app.get(endpointName, async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            const errMsg = `ERROR: ${err.message || err}`;
            console.log(errMsg);
            res.status(500).json({ error: errMsg });
        }
    });
}
function SetupViewEndpoints(appIn, apiServerIn) {
    app = appIn;
    apiServer = apiServerIn;

    SetupViewEndpoint("/", async (req, res) => { 
        res.render("Home", { title: "Home" }); 
    });

    SetupViewEndpoint("/Patients", async (req, res) => {
        const results = await apiServer.API_GetPatients();
        res.render("Patients", { title: "Patients", results: results });
    });
    SetupViewEndpoint("/Patients/New", async (req, res) => {
        res.render("Patients_New", { title: "New Patient" }); 
    });
    SetupViewEndpoint("/Patients/Edit", async (req, res) => {
        const result = await apiServer.API_GetPatientByID(req.query.patientID.toString());
        res.render("Patients_Edit", { title: "Edit Patient", result: result });
    });
    SetupViewEndpoint("/Patients/Delete", async (req, res) => {
        const result = await apiServer.API_GetPatientByID(req.query.patientID.toString());
        res.render("Patients_Delete", { title: "Delete Patient", result: result });
    });
}

module.exports.SetupViewEndpoints = SetupViewEndpoints;