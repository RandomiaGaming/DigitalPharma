function InitEndpoints(app) {
    app.get("/", (req, res) => {
        res.render("Home", { title: "Home" });
    });
    app.get("/Clinics", (req, res) => {
        res.render("Clinics", { title: "Clinics" });
    });
    app.get("/Doctors", (req, res) => {
        res.render("Doctors", { title: "Doctors" });
    });
    app.get("/Patients", (req, res) => {
        res.render("Patients", { title: "Patients" });
    });
    app.get("/Prescriptions", (req, res) => {
        res.render("Prescriptions", { title: "Prescriptions" });
    });
    app.get("/Products", (req, res) => {
        res.render("Products", { title: "Products" });
    });
    app.get("/PatientsXDoctors", (req, res) => {
        res.render("PatientsXDoctors", { title: "PatientsXDoctors" });
    });
    app.get("/PrescriptionsXProducts", (req, res) => {
        res.render("PrescriptionsXProducts", { title: "PrescriptionsXProducts" });
    });
}

module.exports.InitEndpoints = InitEndpoints;