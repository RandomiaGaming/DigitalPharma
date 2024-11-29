// A helper function to make defining a view endpoint easier
function SetupViewEndpoint(endpointName, handler) {
    app.get(endpointName, async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            const errMsg = `ERROR: ${err.message || err}`;
            console.error(errMsg);
            res.status(500).send(errMsg);
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
        const result = await apiServer.API_GetPatientByID(req.query.id.toString());
        res.render("Patients/Patients_Edit", { title: "Edit Patient", result: result, tableNameSingular: "Patient", tableName: "Patients" });
    });
    SetupViewEndpoint("/Patients/Delete", async (req, res) => {
        const result = await apiServer.API_GetPatientByID(req.query.id.toString());
        res.render("Patients/Patients_Delete", { title: "Delete Patient", result: result, tableNameSingular: "Patient", tableName: "Patients" });
    });

    // Views for Clinics table
    SetupViewEndpoint("/Clinics", async (req, res) => {
        const results = await apiServer.API_GetClinics();
        res.render("Clinics/Clinics", { title: "Clinics", results: results, tableNameSingular: "Clinic", tableName: "Clinics" });
    });
    SetupViewEndpoint("/Clinics/New", async (req, res) => {
        res.render("Clinics/Clinics_New", { title: "New Clinic", tableNameSingular: "Clinic", tableName: "Clinics" });
    });
    SetupViewEndpoint("/Clinics/Edit", async (req, res) => {
        const result = await apiServer.API_GetClinicByID(req.query.id.toString());
        res.render("Clinics/Clinics_Edit", { title: "Edit Clinic", result: result, tableNameSingular: "Clinic", tableName: "Clinics" });
    });
    SetupViewEndpoint("/Clinics/Delete", async (req, res) => {
        const result = await apiServer.API_GetClinicByID(req.query.id.toString());
        res.render("Clinics/Clinics_Delete", { title: "Delete Clinic", result: result, tableNameSingular: "Clinic", tableName: "Clinics" });
    });

    // Views for Doctors table
    SetupViewEndpoint("/Doctors", async (req, res) => {
        const results = await apiServer.API_GetDoctors();
        res.render("Doctors/Doctors", { title: "Doctors", results: results, tableNameSingular: "Doctor", tableName: "Doctors" });
    });
    SetupViewEndpoint("/Doctors/New", async (req, res) => {
        res.render("Doctors/Doctors_New", { title: "New Doctor", tableNameSingular: "Doctor", tableName: "Doctors" });
    });
    SetupViewEndpoint("/Doctors/Edit", async (req, res) => {
        const result = await apiServer.API_GetDoctorByID(req.query.id.toString());
        res.render("Doctors/Doctors_Edit", { title: "Edit Doctor", result: result, tableNameSingular: "Doctor", tableName: "Doctors" });
    });
    SetupViewEndpoint("/Doctors/Delete", async (req, res) => {
        const result = await apiServer.API_GetDoctorByID(req.query.id.toString());
        res.render("Doctors/Doctors_Delete", { title: "Delete Doctor", result: result, tableNameSingular: "Doctor", tableName: "Doctors" });
    });

    // Views for Products table
    SetupViewEndpoint("/Products", async (req, res) => {
        const results = await apiServer.API_GetProducts();
        res.render("Products/Products", { title: "Products", results: results, tableNameSingular: "Product", tableName: "Products" });
    });
    SetupViewEndpoint("/Products/New", async (req, res) => {
        res.render("Products/Products_New", { title: "New Product", tableNameSingular: "Product", tableName: "Products" });
    });
    SetupViewEndpoint("/Products/Edit", async (req, res) => {
        const result = await apiServer.API_GetProductByID(req.query.id.toString());
        res.render("Products/Products_Edit", { title: "Edit Product", result: result, tableNameSingular: "Product", tableName: "Products" });
    });
    SetupViewEndpoint("/Products/Delete", async (req, res) => {
        const result = await apiServer.API_GetProductByID(req.query.id.toString());
        res.render("Products/Products_Delete", { title: "Delete Product", result: result, tableNameSingular: "Product", tableName: "Products" });
    });

    // Views for Prescriptions table
    SetupViewEndpoint("/Prescriptions", async (req, res) => {
        const results = await apiServer.API_GetPrescriptions();
        res.render("Prescriptions/Prescriptions", { title: "Prescriptions", results: results, tableNameSingular: "Prescription", tableName: "Prescriptions" });
    });
    SetupViewEndpoint("/Prescriptions/New", async (req, res) => {
        res.render("Prescriptions/Prescriptions_New", { title: "New Prescription", tableNameSingular: "Prescription", tableName: "Prescriptions" });
    });
    SetupViewEndpoint("/Prescriptions/Edit", async (req, res) => {
        const result = await apiServer.API_GetPrescriptionByID(req.query.id.toString());
        res.render("Prescriptions/Prescriptions_Edit", { title: "Edit Prescription", result: result, tableNameSingular: "Prescription", tableName: "Prescriptions" });
    });
    SetupViewEndpoint("/Prescriptions/Delete", async (req, res) => {
        const result = await apiServer.API_GetPrescriptionByID(req.query.id.toString());
        res.render("Prescriptions/Prescriptions_Delete", { title: "Delete Prescription", result: result, tableNameSingular: "Prescription", tableName: "Prescriptions" });
    });

    // Views for PatientsXDoctors table
    SetupViewEndpoint("/PatientsXDoctors", async (req, res) => {
        const results = await apiServer.API_GetPatientsXDoctors();
        res.render("PatientsXDoctors/PatientsXDoctors", { title: "PatientsXDoctors", results: results, tableNameSingular: "PatientsXDoctors", tableName: "PatientsXDoctors" });
    });
    SetupViewEndpoint("/PatientsXDoctors/New", async (req, res) => {
        res.render("PatientsXDoctors/PatientsXDoctors_New", { title: "New PatientsXDoctors", tableNameSingular: "PatientsXDoctors", tableName: "PatientsXDoctors" });
    });
    SetupViewEndpoint("/PatientsXDoctors/Edit", async (req, res) => {
        const result = await apiServer.API_GetPatientsXDoctorsByID(req.query.id.toString());
        res.render("PatientsXDoctors/PatientsXDoctors_Edit", { title: "Edit PatientsXDoctors", result: result, tableNameSingular: "PatientsXDoctors", tableName: "PatientsXDoctors" });
    });
    SetupViewEndpoint("/PatientsXDoctors/Delete", async (req, res) => {
        const result = await apiServer.API_GetPatientsXDoctorsByID(req.query.id.toString());
        res.render("PatientsXDoctors/PatientsXDoctors_Delete", { title: "Delete PatientsXDoctors", result: result, tableNameSingular: "PatientsXDoctors", tableName: "PatientsXDoctors" });
    });

    // Views for PrescriptionsXProducts table
    SetupViewEndpoint("/PrescriptionsXProducts", async (req, res) => {
        const results = await apiServer.API_GetPrescriptionsXProducts();
        res.render("PrescriptionsXProducts/PrescriptionsXProducts", { title: "PrescriptionsXProducts", results: results, tableNameSingular: "PrescriptionsXProducts", tableName: "PrescriptionsXProducts" });
    });
    SetupViewEndpoint("/PrescriptionsXProducts/New", async (req, res) => {
        res.render("PrescriptionsXProducts/PrescriptionsXProducts_New", { title: "New PrescriptionsXProducts", tableNameSingular: "PrescriptionsXProducts", tableName: "PrescriptionsXProducts" });
    });
    SetupViewEndpoint("/PrescriptionsXProducts/Edit", async (req, res) => {
        const result = await apiServer.API_GetPrescriptionsXProductsByID(req.query.id.toString());
        res.render("PrescriptionsXProducts/PrescriptionsXProducts_Edit", { title: "Edit PrescriptionsXProducts", result: result, tableNameSingular: "PrescriptionsXProducts", tableName: "PrescriptionsXProducts" });
    });
    SetupViewEndpoint("/PrescriptionsXProducts/Delete", async (req, res) => {
        const result = await apiServer.API_GetPrescriptionsXProductsByID(req.query.id.toString());
        res.render("PrescriptionsXProducts/PrescriptionsXProducts_Delete", { title: "Delete PrescriptionsXProducts", result: result, tableNameSingular: "PrescriptionsXProducts", tableName: "PrescriptionsXProducts" });
    });
}
module.exports.SetupViewEndpoints = SetupViewEndpoints;