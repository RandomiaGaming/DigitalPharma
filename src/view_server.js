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

function SetupViewEndpointsForClinics() {
    const clinicsTableInfo = {
        name: "Clinics",
        entityName: "Clinic",
        primaryKeyName: "clinicID",
        fields: [
            // address, email, phoneNumber
            { displayName: "Address", name: "address", type: "text" },
            { displayName: "Email", name: "email", type: "text" },
            { displayName: "Phone Number", name: "phoneNumber", type: "text" }
        ]
    };
    SetupViewEndpoint("/Clinics", async (req, res) => {
        const results = await apiServer.API_GetClinics();
        res.render("Table", {
            title: "Clinics List",
            results: results,
            tableInfo: clinicsTableInfo
        });
    });
    SetupViewEndpoint("/Clinics/New", async (req, res) => {
        res.render("Table_New", {
            title: "New Clinic",
            tableInfo: clinicsTableInfo
        });
    });
    SetupViewEndpoint("/Clinics/Edit", async (req, res) => {
        const result = await apiServer.API_GetClinicByID(req.query.clinicID);
        res.render("Table_Edit", {
            title: "Edit Clinic",
            result: result,
            tableInfo: clinicsTableInfo
        });
    });
    SetupViewEndpoint("/Clinics/Delete", async (req, res) => {
        const result = await apiServer.API_GetClinicByID(req.query.clinicID);
        res.render("Table_Delete", {
            title: "Delete Clinic",
            result: result,
            tableInfo: clinicsTableInfo
        });
    });
}

function SetupViewEndpointsForDoctors() {
    const doctorsTableInfo = {
        name: "Doctors",
        entityName: "Doctor",
        primaryKeyName: "doctorID",
        fields: [
            // firstName, lastName, email, phoneNumber, clinicID
            { displayName: "First Name", name: "firstName", type: "text" },
            { displayName: "Last Name", name: "lastName", type: "text" },
            { displayName: "Email", name: "email", type: "text" },
            { displayName: "Phone Number", name: "phoneNumber", type: "text" },
            { displayName: "Clinic ID", name: "clinicID", type: "text" }
        ]
    };
    SetupViewEndpoint("/Doctors", async (req, res) => {
        const results = await apiServer.API_GetDoctors();
        res.render("Table", {
            title: "Doctors List",
            results: results,
            tableInfo: doctorsTableInfo
        });
    });
    SetupViewEndpoint("/Doctors/New", async (req, res) => {
        res.render("Table_New", {
            title: "New Doctor",
            tableInfo: doctorsTableInfo
        });
    });
    SetupViewEndpoint("/Doctors/Edit", async (req, res) => {
        const result = await apiServer.API_GetDoctorByID(req.query.doctorID);
        res.render("Table_Edit", {
            title: "Edit Doctor",
            result: result,
            tableInfo: doctorsTableInfo
        });
    });
    SetupViewEndpoint("/Doctors/Delete", async (req, res) => {
        const result = await apiServer.API_GetDoctorByID(req.query.doctorID);
        res.render("Table_Delete", {
            title: "Delete Doctor",
            result: result,
            tableInfo: doctorsTableInfo
        });
    });
}

function SetupViewEndpointsForPatients() {
    const patientsTableInfo = {
        name: "Patients",
        entityName: "Patient",
        primaryKeyName: "patientID",
        fields: [
            // firstName, lastName, dateOfBirth, email, phoneNumber, address
            { displayName: "First Name", name: "firstName", type: "text" },
            { displayName: "Last Name", name: "lastName", type: "text" },
            { displayName: "Date Of Birth", name: "dateOfBirth", type: "date" },
            { displayName: "Email", name: "email", type: "text" },
            { displayName: "Phone Number", name: "phoneNumber", type: "text" },
            { displayName: "Address", name: "address", type: "text" }
        ]
    };
    SetupViewEndpoint("/Patients", async (req, res) => {
        const results = await apiServer.API_GetPatients();
        res.render("Table", {
            title: "Patients List",
            results: results,
            tableInfo: patientsTableInfo
        });
    });
    SetupViewEndpoint("/Patients/New", async (req, res) => {
        res.render("Table_New", {
            title: "New Patient",
            tableInfo: patientsTableInfo
        });
    });
    SetupViewEndpoint("/Patients/Edit", async (req, res) => {
        const result = await apiServer.API_GetPatientByID(req.query.patientID);
        res.render("Table_Edit", {
            title: "Edit Patient",
            result: result,
            tableInfo: patientsTableInfo
        });
    });
    SetupViewEndpoint("/Patients/Delete", async (req, res) => {
        const result = await apiServer.API_GetPatientByID(req.query.patientID);
        res.render("Table_Delete", {
            title: "Delete Patient",
            result: result,
            tableInfo: patientsTableInfo
        });
    });
}

function SetupViewEndpointsForPrescriptions() {
    const prescriptionsTableInfo = {
        name: "Prescriptions",
        entityName: "Prescription",
        primaryKeyName: "prescriptionID",
        fields: [
            // doctorID, patientID, quantity, numberOfRefills, instructions
            { displayName: "Doctor ID", name: "doctorID", type: "text" },
            { displayName: "Patient ID", name: "patientID", type: "text" },
            { displayName: "Quantity", name: "quantity", type: "text" },
            { displayName: "Number Of Refills", name: "numberOfRefills", type: "text" },
            { displayName: "Instructions", name: "instructions", type: "text" }
        ]
    };
    SetupViewEndpoint("/Prescriptions", async (req, res) => {
        const results = await apiServer.API_GetPrescriptions();
        res.render("Table", {
            title: "Prescriptions List",
            results: results,
            tableInfo: prescriptionsTableInfo
        });
    });
    SetupViewEndpoint("/Prescriptions/New", async (req, res) => {
        res.render("Table_New", {
            title: "New Prescription",
            tableInfo: prescriptionsTableInfo
        });
    });
    SetupViewEndpoint("/Prescriptions/Edit", async (req, res) => {
        const result = await apiServer.API_GetPrescriptionByID(req.query.prescriptionID);
        res.render("Table_Edit", {
            title: "Edit Prescription",
            result: result,
            tableInfo: prescriptionsTableInfo
        });
    });
    SetupViewEndpoint("/Prescriptions/Delete", async (req, res) => {
        const result = await apiServer.API_GetPrescriptionByID(req.query.prescriptionID);
        res.render("Table_Delete", {
            title: "Delete Prescription",
            result: result,
            tableInfo: prescriptionsTableInfo
        });
    });
}

function SetupViewEndpointsForProducts() {
    const productsTableInfo = {
        name: "Products",
        entityName: "Product",
        primaryKeyName: "productID",
        fields: [
            // genericName, brandName, description, price
            { displayName: "Generic Name", name: "genericName", type: "text" },
            { displayName: "Brand Name", name: "brandName", type: "text" },
            { displayName: "Description", name: "description", type: "text" },
            { displayName: "Price", name: "price", type: "text" }
        ]
    };
    SetupViewEndpoint("/Products", async (req, res) => {
        const results = await apiServer.API_GetProducts();
        res.render("Table", {
            title: "Products List",
            results: results,
            tableInfo: productsTableInfo
        });
    });
    SetupViewEndpoint("/Products/New", async (req, res) => {
        res.render("Table_New", {
            title: "New Product",
            tableInfo: productsTableInfo
        });
    });
    SetupViewEndpoint("/Products/Edit", async (req, res) => {
        const result = await apiServer.API_GetProductByID(req.query.productID);
        res.render("Table_Edit", {
            title: "Edit Product",
            result: result,
            tableInfo: productsTableInfo
        });
    });
    SetupViewEndpoint("/Products/Delete", async (req, res) => {
        const result = await apiServer.API_GetProductByID(req.query.productID);
        res.render("Table_Delete", {
            title: "Delete Product",
            result: result,
            tableInfo: productsTableInfo
        });
    });
}

function SetupViewEndpointsForPatientsXDoctors() {
    const patientsXDoctorsTableInfo = {
        name: "PatientsXDoctors",
        entityName: "PatientsXDoctors",
        primaryKeyName: "patientsXDoctorsID",
        fields: [
            // patientID, doctorID
            { displayName: "Patient ID", name: "patientID", type: "text" },
            { displayName: "Doctor ID", name: "doctorID", type: "text" }
        ]
    };
    SetupViewEndpoint("/PatientsXDoctors", async (req, res) => {
        const results = await apiServer.API_GetPatientsXDoctors();
        res.render("Table", {
            title: "PatientsXDoctors List",
            results: results,
            tableInfo: patientsXDoctorsTableInfo
        });
    });
    SetupViewEndpoint("/PatientsXDoctors/New", async (req, res) => {
        res.render("Table_New", {
            title: "New PatientsXDoctors",
            tableInfo: patientsXDoctorsTableInfo
        });
    });
    SetupViewEndpoint("/PatientsXDoctors/Edit", async (req, res) => {
        const result = await apiServer.API_GetPatientsXDoctorsByID(req.query.patientsXDoctorsID);
        res.render("Table_Edit", {
            title: "Edit PatientsXDoctors",
            result: result,
            tableInfo: patientsXDoctorsTableInfo
        });
    });
    SetupViewEndpoint("/PatientsXDoctors/Delete", async (req, res) => {
        const result = await apiServer.API_GetPatientsXDoctorsByID(req.query.patientsXDoctorsID);
        res.render("Table_Delete", {
            title: "Delete PatientsXDoctors",
            result: result,
            tableInfo: patientsXDoctorsTableInfo
        });
    });
}

function SetupViewEndpointsForPrescriptionsXProducts() {
    const prescriptionsXProductsTableInfo = {
        name: "PrescriptionsXProducts",
        entityName: "PrescriptionsXProducts",
        primaryKeyName: "prescriptionsXProductsID",
        fields: [
            // prescriptionID, productID
            { displayName: "Prescription ID", name: "prescriptionID", type: "text" },
            { displayName: "Product ID", name: "productID", type: "text" }
        ]
    };
    SetupViewEndpoint("/PrescriptionsXProducts", async (req, res) => {
        const results = await apiServer.API_GetPrescriptionsXProducts();
        res.render("Table", {
            title: "PrescriptionsXProducts List",
            results: results,
            tableInfo: prescriptionsXProductsTableInfo
        });
    });
    SetupViewEndpoint("/PrescriptionsXProducts/New", async (req, res) => {
        res.render("Table_New", {
            title: "New PrescriptionsXProducts",
            tableInfo: prescriptionsXProductsTableInfo
        });
    });
    SetupViewEndpoint("/PrescriptionsXProducts/Edit", async (req, res) => {
        const result = await apiServer.API_GetPrescriptionsXProductsByID(req.query.prescriptionsXProductsID);
        res.render("Table_Edit", {
            title: "Edit PrescriptionsXProducts",
            result: result,
            tableInfo: prescriptionsXProductsTableInfo
        });
    });
    SetupViewEndpoint("/PrescriptionsXProducts/Delete", async (req, res) => {
        const result = await apiServer.API_GetPrescriptionsXProductsByID(req.query.prescriptionsXProductsID);
        res.render("Table_Delete", {
            title: "Delete PrescriptionsXProducts",
            result: result,
            tableInfo: prescriptionsXProductsTableInfo
        });
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

    SetupViewEndpointsForClinics();
    SetupViewEndpointsForDoctors();
    SetupViewEndpointsForPatients();
    SetupViewEndpointsForPrescriptions();
    SetupViewEndpointsForProducts();
    SetupViewEndpointsForPatientsXDoctors();
    SetupViewEndpointsForPrescriptionsXProducts();
}
module.exports.SetupViewEndpoints = SetupViewEndpoints;