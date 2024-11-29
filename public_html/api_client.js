// Helper function to send an api request and ensure success
async function API_Request(endpoint, payload) {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(`API request failed with status code ${response.status} ${errMsg}`);
    }
    const responseData = await response.json();
    return responseData;
}

// Hard reset
async function API_HardReset() {
    await API_Request("/API/HardReset", {});
}

// CRUD operations for Patients table
async function API_GetPatients() {
    const results = await API_Request("/API/GetPatients", {});
    return results;
}
async function API_GetPatientByID(patientID) {
    const result = await API_Request("/API/GetPatientByID", { patientID });
    return result;
}
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    await API_Request("/API/AddPatient", { firstName, lastName, dateOfBirth, email, phoneNumber, address });
}
async function API_RemovePatient(patientID) {
    await API_Request("/API/RemovePatient", { patientID });
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    await API_Request("/API/UpdatePatient", { patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address });
}

// CRUD operations for Clinics table
async function API_GetClinics() {
    const results = await API_Request("/API/GetClinics", {});
    return results;
}
async function API_GetClinicByID(clinicID) {
    const result = await API_Request("/API/GetClinicByID", { clinicID });
    return result;
}
async function API_AddClinic(address, email, phoneNumber) {
    await API_Request("/API/AddClinic", { address, email, phoneNumber });
}
async function API_RemoveClinic(clinicID) {
    await API_Request("/API/RemoveClinic", { clinicID });
}
async function API_UpdateClinic(clinicID, address, email, phoneNumber) {
    await API_Request("/API/UpdateClinic", { clinicID, address, email, phoneNumber });
}

// CRUD operations for Doctors table
async function API_GetDoctors() {
    const results = await API_Request("/API/GetDoctors", {});
    return results;
}
async function API_GetDoctorByID(doctorID) {
    const result = await API_Request("/API/GetDoctorByID", { doctorID });
    return result;
}
async function API_AddDoctor(firstName, lastName, email, phoneNumber, clinicID) {
    await API_Request("/API/AddDoctor", { firstName, lastName, email, phoneNumber, clinicID });
}
async function API_RemoveDoctor(doctorID) {
    await API_Request("/API/RemoveDoctor", { doctorID });
}
async function API_UpdateDoctor(doctorID, firstName, lastName, email, phoneNumber, clinicID) {
    await API_Request("/API/UpdateDoctor", { doctorID, firstName, lastName, email, phoneNumber, clinicID });
}

// CRUD operations for Products table
async function API_GetProducts() {
    const results = await API_Request("/API/GetProducts", {});
    return results;
}
async function API_GetProductByID(productID) {
    const result = await API_Request("/API/GetProductByID", { productID });
    return result;
}
async function API_AddProduct(genericName, brandName, description, price) {
    await API_Request("/API/AddProduct", { genericName, brandName, description, price });
}
async function API_RemoveProduct(productID) {
    await API_Request("/API/RemoveProduct", { productID });
}
async function API_UpdateProduct(productID, genericName, brandName, description, price) {
    await API_Request("/API/UpdateProduct", { productID, genericName, brandName, description, price });
}

// CRUD operations for Prescriptions table
async function API_GetPrescriptions() {
    const results = await API_Request("/API/GetPrescriptions", {});
    return results;
}
async function API_GetPrescriptionByID(prescriptionID) {
    const result = await API_Request("/API/GetPrescriptionByID", { prescriptionID });
    return result;
}
async function API_AddPrescription(doctorID, patientID, quantity, numberOfRefills, instructions) {
    await API_Request("/API/AddPrescription", { doctorID, patientID, quantity, numberOfRefills, instructions });
}
async function API_RemovePrescription(prescriptionID) {
    await API_Request("/API/RemovePrescription", { prescriptionID });
}
async function API_UpdatePrescription(prescriptionID, doctorID, patientID, quantity, numberOfRefills, instructions) {
    await API_Request("/API/UpdatePrescription", { prescriptionID, doctorID, patientID, quantity, numberOfRefills, instructions });
}

// CRUD operations for PatientsXDoctors table
async function API_GetPatientsXDoctors() {
    const results = await API_Request("/API/GetPatientsXDoctors", {});
    return results;
}
async function API_GetPatientsXDoctorsByID(patientsXDoctorsID) {
    const result = await API_Request("/API/GetPatientsXDoctorsByID", { patientsXDoctorsID });
    return result;
}
async function API_AddPatientsXDoctors(patientID, doctorID) {
    await API_Request("/API/AddPatientsXDoctors", { patientID, doctorID });
}
async function API_RemovePatientsXDoctors(patientsXDoctorsID) {
    await API_Request("/API/RemovePatientsXDoctors", { patientsXDoctorsID });
}
async function API_UpdatePatientsXDoctors(patientsXDoctorsID, patientID, doctorID) {
    await API_Request("/API/UpdatePatientsXDoctors", { patientsXDoctorsID, patientID, doctorID });
}

// CRUD operations for PrescriptionsXProducts table
async function API_GetPrescriptionsXProducts() {
    const results = await API_Request("/API/GetPrescriptionsXProducts", {});
    return results;
}
async function API_GetPrescriptionsXProductsByID(prescriptionsXProductsID) {
    const result = await API_Request("/API/GetPrescriptionsXProductsByID", { prescriptionsXProductsID });
    return result;
}
async function API_AddPrescriptionsXProducts(prescriptionID, productID) {
    await API_Request("/API/AddPrescriptionsXProducts", { prescriptionID, productID });
}
async function API_RemovePrescriptionsXProducts(prescriptionsXProductsID) {
    await API_Request("/API/RemovePrescriptionsXProducts", { prescriptionsXProductsID });
}
async function API_UpdatePrescriptionsXProducts(prescriptionsXProductsID, prescriptionID, productID) {
    await API_Request("/API/UpdatePrescriptionsXProducts", { prescriptionsXProductsID, prescriptionID, productID });
}