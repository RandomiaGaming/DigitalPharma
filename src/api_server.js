// Helper function to format dates in a better way
function FormatDate(value) {
    if (!(value instanceof Date)) {
        throw new Error("value must be a date.");
    }
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Helper function to format the results of an sql query
function FormatSQLResults(results) {
    if (results === null || results === undefined) {
        return "";
    } else if (results instanceof Date) {
        return FormatDate(results);
    } else if (Array.isArray(results)) {
        const output = [];
        for (let i = 0; i < results.length; i++) {
            output.push(FormatSQLResults(results[i]));
        }
        return output;
    } else if (typeof results === 'object') {
        const transformedObject = {};
        for (const key in results) {
            transformedObject[key] = FormatSQLResults(results[key]);
        }
        return transformedObject;
    } else {
        return results.toString();
    }
}

// Helper function to execute an sql query
async function SQL_Query(query) {
    const results = await sqlpool.query(query);
    const formattedResults = FormatSQLResults(results);
    return formattedResults;
}

// Helper function to block inputs which would allow for sql injection and formats dates properly
function EscapeSQL(sqlArgument) {
    const sqlValidCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789@+-.,/\\";
    if (sqlArgument instanceof Date) {
        sqlArgument = FormatDate(sqlArgument);
    }
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

// Helper function to make defining an api endpoint easier
function SetupAPIEndpoint(endpointName, handler) {
    app.post(endpointName, async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            const errMsg = `ERROR: ${err.message || err}`;
            console.error(errMsg);
            res.status(500).send(errMsg);
        }
    });
}

// Hard reset
async function API_HardReset() {
    const fs = require("fs");
    const ddlSql = fs.readFileSync("./sql_files/DDL.sql", "utf8");
    const ddlSqlSplit = ddlSql.split(';').map(query => query.trim()).filter(query => query.length > 0);
    for (const query of ddlSqlSplit) {
        if (query) {
            await sqlpool.query(query);
        }
    }
}
module.exports.API_HardReset = API_HardReset;

// Sets the value of these vairables and sets up all the api endpoints for our server
let app;
let sqlpool;
function SetupAPIEndpoints(appIn, sqlpoolIn) {
    app = appIn;
    sqlpool = sqlpoolIn;

    SetupAPIEndpoint("/API/HardReset", async (req, res) => {
        await API_HardReset();
        res.json({});
    });

    // CRUD operations for Patients table
    SetupAPIEndpoint("/API/GetPatients", async (req, res) => {
        const results = await API_GetPatients();
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetPatientByID", async (req, res) => {
        const result = await API_GetPatientByID(req.body.patientID);
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddPatient", async (req, res) => {
        await API_AddPatient(req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address);
        res.json({});
    });
    SetupAPIEndpoint("/API/RemovePatient", async (req, res) => {
        await API_RemovePatient(req.body.patientID);
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdatePatient", async (req, res) => {
        await API_UpdatePatient(req.body.patientID, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address);
        res.json({});
    });

    // CRUD operations for Clinics table
    SetupAPIEndpoint("/API/GetClinics", async (req, res) => {
        const results = await API_GetClinics();
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetClinicByID", async (req, res) => {
        const result = await API_GetClinicByID(req.body.clinicID);
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddClinic", async (req, res) => {
        await API_AddClinic(req.body.address, req.body.email, req.body.phoneNumber);
        res.json({});
    });
    SetupAPIEndpoint("/API/RemoveClinic", async (req, res) => {
        await API_RemoveClinic(req.body.clinicID);
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdateClinic", async (req, res) => {
        await API_UpdateClinic(req.body.clinicID, req.body.address, req.body.email, req.body.phoneNumber);
        res.json({});
    });

    // CRUD operations for Doctors table
    SetupAPIEndpoint("/API/GetDoctors", async (req, res) => {
        const results = await API_GetDoctors();
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetDoctorByID", async (req, res) => {
        const result = await API_GetDoctorByID(req.body.doctorID);
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddDoctor", async (req, res) => {
        await API_AddDoctor(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.clinicID);
        res.json({});
    });
    SetupAPIEndpoint("/API/RemoveDoctor", async (req, res) => {
        await API_RemoveDoctor(req.body.doctorID);
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdateDoctor", async (req, res) => {
        await API_UpdateDoctor(req.body.doctorID, req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.clinicID);
        res.json({});
    });

    // CRUD operations for Products table
    SetupAPIEndpoint("/API/GetProducts", async (req, res) => {
        const results = await API_GetProducts();
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetProductByID", async (req, res) => {
        const result = await API_GetProductByID(req.body.productID);
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddProduct", async (req, res) => {
        await API_AddProduct(req.body.genericName, req.body.brandName, req.body.description, req.body.price);
        res.json({});
    });
    SetupAPIEndpoint("/API/RemoveProduct", async (req, res) => {
        await API_RemoveProduct(req.body.productID);
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdateProduct", async (req, res) => {
        await API_UpdateProduct(req.body.productID, req.body.genericName, req.body.brandName, req.body.description, req.body.price);
        res.json({});
    });

    // CRUD operations for Prescriptions table
    SetupAPIEndpoint("/API/GetPrescriptions", async (req, res) => {
        const results = await API_GetPrescriptions();
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetPrescriptionByID", async (req, res) => {
        const result = await API_GetPrescriptionByID(req.body.prescriptionID);
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddPrescription", async (req, res) => {
        await API_AddPrescription(req.body.doctorID, req.body.patientID, req.body.quantity, req.body.numberOfRefills, req.body.instructions);
        res.json({});
    });
    SetupAPIEndpoint("/API/RemovePrescription", async (req, res) => {
        await API_RemovePrescription(req.body.prescriptionID);
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdatePrescription", async (req, res) => {
        await API_UpdatePrescription(req.body.prescriptionID, req.body.doctorID, req.body.patientID, req.body.quantity, req.body.numberOfRefills, req.body.instructions);
        res.json({});
    });

    // CRUD operations for PatientsXDoctors table
    SetupAPIEndpoint("/API/GetPatientsXDoctors", async (req, res) => {
        const results = await API_GetPatientsXDoctors();
        res.json(results);
    });
    SetupAPIEndpoint("/API_GetPatientsXDoctorsByID", async (req, res) => {
        const result = await API_GetPatientsXDoctorsByID(req.body.patientsXDoctorsID);
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddPatientsXDoctors", async (req, res) => {
        await API_AddPatientsXDoctors(req.body.patientID, req.body.doctorID);
        res.json({});
    });
    SetupAPIEndpoint("/API/RemovePatientsXDoctors", async (req, res) => {
        await API_RemovePatientsXDoctors(req.body.patientsXDoctorsID);
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdatePatientsXDoctors", async (req, res) => {
        await API_UpdatePatientsXDoctors(req.body.patientsXDoctorsID, req.body.patientID, req.body.doctorID);
        res.json({});
    });

    // CRUD operations for PrescriptionsXProducts table
    SetupAPIEndpoint("/API/GetPrescriptionsXProducts", async (req, res) => {
        const results = await API_GetPrescriptionsXProducts();
        res.json(results);
    });
    SetupAPIEndpoint("/API/GetPrescriptionsXProductsByID", async (req, res) => {
        const result = await API_GetPrescriptionsXProductsByID(req.body.prescriptionsXProductsID);
        res.json(result);
    });
    SetupAPIEndpoint("/API/AddPrescriptionsXProducts", async (req, res) => {
        await API_AddPrescriptionsXProducts(req.body.prescriptionID, req.body.productID);
        res.json({});
    });
    SetupAPIEndpoint("/API/RemovePrescriptionsXProducts", async (req, res) => {
        await API_RemovePrescriptionsXProducts(req.body.prescriptionsXProductsID);
        res.json({});
    });
    SetupAPIEndpoint("/API/UpdatePrescriptionsXProducts", async (req, res) => {
        await API_UpdatePrescriptionsXProducts(req.body.prescriptionsXProductsID, req.body.prescriptionID, req.body.productID);
        res.json({});
    });
}
module.exports.SetupAPIEndpoints = SetupAPIEndpoints;

// CRUD operations on Patients table
async function API_GetPatients() {
    const query = `SELECT patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address FROM Patients;`;
    const results = await SQL_Query(query);
    return results;
}
module.exports.API_GetPatients = API_GetPatients;
async function API_GetPatientByID(patientID) {
    const query = `SELECT patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address FROM Patients WHERE patientID=${EscapeSQL(patientID)};`;
    const results = await SQL_Query(query);
    return results[0];
}
module.exports.API_GetPatientByID = API_GetPatientByID;
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `INSERT INTO Patients (firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES (${EscapeSQL(firstName)}, ${EscapeSQL(lastName)}, ${EscapeSQL(dateOfBirth)}, ${EscapeSQL(email)}, ${EscapeSQL(phoneNumber)}, ${EscapeSQL(address)});`;
    await SQL_Query(query);
}
module.exports.API_AddPatient = API_AddPatient;
async function API_RemovePatient(patientID) {
    const query = `DELETE FROM Patients WHERE patientID=${EscapeSQL(patientID)};`;
    await SQL_Query(query);
}
module.exports.API_RemovePatient = API_RemovePatient;
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    const query = `UPDATE Patients SET firstName=${EscapeSQL(firstName)}, lastName=${EscapeSQL(lastName)}, dateOfBirth=${EscapeSQL(dateOfBirth)}, email=${EscapeSQL(email)}, phoneNumber=${EscapeSQL(phoneNumber)}, address=${EscapeSQL(address)} WHERE patientID=${EscapeSQL(patientID)};`;
    await SQL_Query(query);
}
module.exports.API_UpdatePatient = API_UpdatePatient;

// CRUD operations for Clinics table
async function API_GetClinics() {
    const query = `SELECT clinicID, address, email, phoneNumber FROM Clinics;`;
    const results = await SQL_Query(query);
    return results;
}
module.exports.API_GetClinics = API_GetClinics;
async function API_GetClinicByID(clinicID) {
    const query = `SELECT clinicID, address, email, phoneNumber FROM Clinics WHERE clinicID=${EscapeSQL(clinicID)};`;
    const results = await SQL_Query(query);
    return results[0];
}
module.exports.API_GetClinicByID = API_GetClinicByID;
async function API_AddClinic(address, email, phoneNumber) {
    const query = `INSERT INTO Clinics (address, email, phoneNumber) VALUES (${EscapeSQL(address)}, ${EscapeSQL(email)}, ${EscapeSQL(phoneNumber)});`;
    await SQL_Query(query);
}
module.exports.API_AddClinic = API_AddClinic;
async function API_RemoveClinic(clinicID) {
    const query = `DELETE FROM Clinics WHERE clinicID=${EscapeSQL(clinicID)};`;
    await SQL_Query(query);
}
module.exports.API_RemoveClinic = API_RemoveClinic;
async function API_UpdateClinic(clinicID, address, email, phoneNumber) {
    const query = `UPDATE Clinics SET address=${EscapeSQL(address)}, email=${EscapeSQL(email)}, phoneNumber=${EscapeSQL(phoneNumber)} WHERE clinicID=${EscapeSQL(clinicID)};`;
    await SQL_Query(query);
}
module.exports.API_UpdateClinic = API_UpdateClinic;

// CRUD operations for Doctors table
async function API_GetDoctors() {
    const query = `SELECT doctorID, firstName, lastName, email, phoneNumber, clinicID FROM Doctors;`;
    const results = await SQL_Query(query);
    return results;
}
module.exports.API_GetDoctors = API_GetDoctors;
async function API_GetDoctorByID(doctorID) {
    const query = `SELECT doctorID, firstName, lastName, email, phoneNumber, clinicID FROM Doctors WHERE doctorID=${EscapeSQL(doctorID)};`;
    const results = await SQL_Query(query);
    return results[0];
}
module.exports.API_GetDoctorByID = API_GetDoctorByID;
async function API_AddDoctor(firstName, lastName, email, phoneNumber, clinicID) {
    const query = `INSERT INTO Doctors (firstName, lastName, email, phoneNumber, clinicID) VALUES (${EscapeSQL(firstName)}, ${EscapeSQL(lastName)}, ${EscapeSQL(email)}, ${EscapeSQL(phoneNumber)}, ${EscapeSQL(clinicID)});`;
    await SQL_Query(query);
}
module.exports.API_AddDoctor = API_AddDoctor;
async function API_RemoveDoctor(doctorID) {
    const query = `DELETE FROM Doctors WHERE doctorID=${EscapeSQL(doctorID)};`;
    await SQL_Query(query);
}
module.exports.API_RemoveDoctor = API_RemoveDoctor;
async function API_UpdateDoctor(doctorID, firstName, lastName, email, phoneNumber, clinicID) {
    const query = `UPDATE Doctors SET firstName=${EscapeSQL(firstName)}, lastName=${EscapeSQL(lastName)}, email=${EscapeSQL(email)}, phoneNumber=${EscapeSQL(phoneNumber)}, clinicID=${EscapeSQL(clinicID)} WHERE doctorID=${EscapeSQL(doctorID)};`;
    await SQL_Query(query);
}
module.exports.API_UpdateDoctor = API_UpdateDoctor;

// CRUD operations for Products table
async function API_GetProducts() {
    const query = `SELECT productID, genericName, brandName, description, price FROM Products;`;
    const results = await SQL_Query(query);
    return results;
}
module.exports.API_GetProducts = API_GetProducts;
async function API_GetProductByID(productID) {
    const query = `SELECT productID, genericName, brandName, description, price FROM Products WHERE productID=${EscapeSQL(productID)};`;
    const results = await SQL_Query(query);
    return results[0];
}
module.exports.API_GetProductByID = API_GetProductByID;
async function API_AddProduct(genericName, brandName, description, price) {
    const query = `INSERT INTO Products (genericName, brandName, description, price) VALUES (${EscapeSQL(genericName)}, ${EscapeSQL(brandName)}, ${EscapeSQL(description)}, ${EscapeSQL(price)});`;
    await SQL_Query(query);
}
module.exports.API_AddProduct = API_AddProduct;
async function API_RemoveProduct(productID) {
    const query = `DELETE FROM Products WHERE productID=${EscapeSQL(productID)};`;
    await SQL_Query(query);
}
module.exports.API_RemoveProduct = API_RemoveProduct;
async function API_UpdateProduct(productID, genericName, brandName, description, price) {
    const query = `UPDATE Products SET genericName=${EscapeSQL(genericName)}, brandName=${EscapeSQL(brandName)}, description=${EscapeSQL(description)}, price=${EscapeSQL(price)} WHERE productID=${EscapeSQL(productID)};`;
    await SQL_Query(query);
}
module.exports.API_UpdateProduct = API_UpdateProduct;

// CRUD operations for Prescriptions table
async function API_GetPrescriptions() {
    const query = `SELECT prescriptionID, doctorID, patientID, quantity, numberOfRefills, instructions FROM Prescriptions;`;
    const results = await SQL_Query(query);
    return results;
}
module.exports.API_GetPrescriptions = API_GetPrescriptions;
async function API_GetPrescriptionByID(prescriptionID) {
    const query = `SELECT prescriptionID, doctorID, patientID, quantity, numberOfRefills, instructions FROM Prescriptions WHERE prescriptionID=${EscapeSQL(prescriptionID)};`;
    const results = await SQL_Query(query);
    return results[0];
}
module.exports.API_GetPrescriptionByID = API_GetPrescriptionByID;
async function API_AddPrescription(doctorID, patientID, quantity, numberOfRefills, instructions) {
    const query = `INSERT INTO Prescriptions (doctorID, patientID, quantity, numberOfRefills, instructions) VALUES (${EscapeSQL(doctorID)}, ${EscapeSQL(patientID)}, ${EscapeSQL(quantity)}, ${EscapeSQL(numberOfRefills)}, ${EscapeSQL(instructions)});`;
    await SQL_Query(query);
}
module.exports.API_AddPrescription = API_AddPrescription;
async function API_RemovePrescription(prescriptionID) {
    const query = `DELETE FROM Prescriptions WHERE prescriptionID=${EscapeSQL(prescriptionID)};`;
    await SQL_Query(query);
}
module.exports.API_RemovePrescription = API_RemovePrescription;
async function API_UpdatePrescription(prescriptionID, doctorID, patientID, quantity, numberOfRefills, instructions) {
    const query = `UPDATE Prescriptions SET doctorID=${EscapeSQL(doctorID)}, patientID=${EscapeSQL(patientID)}, quantity=${EscapeSQL(quantity)}, numberOfRefills=${EscapeSQL(numberOfRefills)}, instructions=${EscapeSQL(instructions)} WHERE prescriptionID=${EscapeSQL(prescriptionID)};`;
    await SQL_Query(query);
}
module.exports.API_UpdatePrescription = API_UpdatePrescription;

// CRUD operations for PatientsXDoctors table
async function API_GetPatientsXDoctors() {
    const query = `SELECT patientsXDoctorsID, patientID, doctorID FROM PatientsXDoctors;`;
    const results = await SQL_Query(query);
    return results;
}
module.exports.API_GetPatientsXDoctors = API_GetPatientsXDoctors;
async function API_GetPatientsXDoctorsByID(patientsXDoctorsID) {
    const query = `SELECT patientsXDoctorsID, patientID, doctorID FROM PatientsXDoctors WHERE patientsXDoctorsID=${EscapeSQL(patientsXDoctorsID)};`;
    const results = await SQL_Query(query);
    return results[0];
}
module.exports.API_GetPatientsXDoctorsByID = API_GetPatientsXDoctorsByID;
async function API_AddPatientsXDoctors(patientID, doctorID) {
    const query = `INSERT INTO PatientsXDoctors (patientID, doctorID) VALUES (${EscapeSQL(patientID)}, ${EscapeSQL(doctorID)});`;
    await SQL_Query(query);
}
module.exports.API_AddPatientsXDoctors = API_AddPatientsXDoctors;
async function API_RemovePatientsXDoctors(patientsXDoctorsID) {
    const query = `DELETE FROM PatientsXDoctors WHERE patientsXDoctorsID=${EscapeSQL(patientsXDoctorsID)};`;
    await SQL_Query(query);
}
module.exports.API_RemovePatientsXDoctors = API_RemovePatientsXDoctors;
async function API_UpdatePatientsXDoctors(patientsXDoctorsID, patientID, doctorID) {
    const query = `UPDATE PatientsXDoctors SET patientID=${EscapeSQL(patientID)}, doctorID=${EscapeSQL(doctorID)} WHERE patientsXDoctorsID=${EscapeSQL(patientsXDoctorsID)};`;
    await SQL_Query(query);
}
module.exports.API_UpdatePatientsXDoctors = API_UpdatePatientsXDoctors;

// CRUD operations for PrescriptionsXProducts table
async function API_GetPrescriptionsXProducts() {
    const query = `SELECT prescriptionsXProductsID, prescriptionID, productID FROM PrescriptionsXProducts;`;
    const results = await SQL_Query(query);
    return results;
}
module.exports.API_GetPrescriptionsXProducts = API_GetPrescriptionsXProducts;
async function API_GetPrescriptionsXProductsByID(prescriptionsXProductsID) {
    const query = `SELECT prescriptionsXProductsID, prescriptionID, productID FROM PrescriptionsXProducts WHERE prescriptionsXProductsID=${EscapeSQL(prescriptionsXProductsID)};`;
    const results = await SQL_Query(query);
    return results[0];
}
module.exports.API_GetPrescriptionsXProductsByID = API_GetPrescriptionsXProductsByID;
async function API_AddPrescriptionsXProducts(prescriptionID, productID) {
    const query = `INSERT INTO PrescriptionsXProducts (prescriptionID, productID) VALUES (${EscapeSQL(prescriptionID)}, ${EscapeSQL(productID)});`;
    await SQL_Query(query);
}
module.exports.API_AddPrescriptionsXProducts = API_AddPrescriptionsXProducts;
async function API_RemovePrescriptionsXProducts(prescriptionsXProductsID) {
    const query = `DELETE FROM PrescriptionsXProducts WHERE prescriptionsXProductsID=${EscapeSQL(prescriptionsXProductsID)};`;
    await SQL_Query(query);
}
module.exports.API_RemovePrescriptionsXProducts = API_RemovePrescriptionsXProducts;
async function API_UpdatePrescriptionsXProducts(prescriptionsXProductsID, prescriptionID, productID) {
    const query = `UPDATE PrescriptionsXProducts SET prescriptionID=${EscapeSQL(prescriptionID)}, productID=${EscapeSQL(productID)} WHERE prescriptionsXProductsID=${EscapeSQL(prescriptionsXProductsID)};`;
    await SQL_Query(query);
}
module.exports.API_UpdatePrescriptionsXProducts = API_UpdatePrescriptionsXProducts;