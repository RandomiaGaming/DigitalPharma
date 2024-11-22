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
        console.log(results);
        res.render("Patients", { title: "Patients", results: results });
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