function SetupViewEndpoints(app, apiServer) {
    app.get("/", async (req, res) => {
        res.render("Home", { title: "Home" });
    });
    app.get("/Clinics", async (req, res) => {
        res.render("Clinics", { title: "Clinics" });
    });
    app.get("/Doctors", async (req, res) => {
        res.render("Doctors", { title: "Doctors" });
    });

    app.get("/Patients", async (req, res) => {
        const results = await apiServer.API_GetPatients();
        res.render("Patients", { title: "Patients", results: results });
    });
    app.get("/Patients/New", async (req, res) => {
        res.render("Patients_New", { title: "New Patient" });
    });
    app.get("/Patients/Edit", async (req, res) => {
        const patientID = req.query.patientID;
        const results = await apiServer.API_GetPatientByID(patientID);
        const result = results[0];
        console.log(result);
        res.render("Patients_Edit", { title: "Edit Patient", result: result });
    });
    app.get("/Patients/Delete", async (req, res) => {
        const patientID = req.query.patientID;
        const results = await apiServer.API_GetPatientByID(patientID);
        const result = results[0];
        res.render("Patients_Delete", { title: "Delete Patient", result: result });
    });

    app.get("/Prescriptions", async (req, res) => {
        res.render("Prescriptions", { title: "Prescriptions" });
    });
    app.get("/Products", async (req, res) => {
        res.render("Products", { title: "Products" });
    });
    app.get("/PatientsXDoctors", async (req, res) => {
        res.render("PatientsXDoctors", { title: "PatientsXDoctors" });
    });
    app.get("/PrescriptionsXProducts", async (req, res) => {
        res.render("PrescriptionsXProducts", { title: "PrescriptionsXProducts" });
    });
}

module.exports.SetupViewEndpoints = SetupViewEndpoints;