// General API request helpers
async function API_Request(endpoint, payload) {
    const response = await fetch("/API/" + endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const responseData = await response.json();
    return responseData;
}

// CRUD operations on Patients table
async function API_GetPatients() {
    return await APIRequest("GetPatients", { });
}
async function API_GetPatientByID(patientID) {
    return await APIRequest("GetPatientByID", { patientID });
}
async function AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    return await APIRequest("AddPatient", { firstName, lastName, dateOfBirth, email, phoneNumber, address });
}
async function API_RemovePatient(patientID) {
    return await APIRequest("RemovePatient", { patientID });
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    return await APIRequest("UpdatePatient", { patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address });
}

// Crud operations on the Clinics table
async function API_GetClinics() {
    return await APIRequest("GetClinics", { });
}
async function API_GetClinicByID(clinicID) {
    return await APIRequest("GetClinicByID", { clinicID });
}
async function API_AddClinic(address, email, phoneNumber) {
    return await APIRequest("AddClinic", { address, email, phoneNumber });
}
async function API_RemoveClinic(clinicID) {
    return await APIRequest("RemoveClinic", { clinicID });
}
async function API_UpdateClinic(clinicID, address, email, phoneNumber) {
    return await APIRequest("UpdateClinic", { clinicID, address, email, phoneNumber });
}

// Crud operations on the Doctors table
async function API_GetDoctors() {
    return await APIRequest("GetDoctors", { });
}
async function API_GetDoctorByID(doctorID) {
    return await APIRequest("GetDoctorByID", { doctorID });
}
async function API_AddDoctor(firstName, lastName, email, phoneNumber, clinicID) {
    return await APIRequest("AddDoctor", { firstName, lastName, email, phoneNumber, clinicID });
}
async function API_RemoveDoctor(doctorID) {
    return await APIRequest("RemoveDoctor", { doctorID });
}
async function API_UpdateDoctor(doctorID, firstName, lastName, email, phoneNumber, clinicID) {
    return await APIRequest("UpdateDoctor", { doctorID, firstName, lastName, email, phoneNumber, clinicID });
}

// Crud operations on the Products table
async function API_GetProducts() {
    return await APIRequest("GetProducts", { });
}
async function API_GetProductByID(productID) {
    return await APIRequest("GetProductByID", { productID });
}
async function API_AddProduct(genericName, brandName, description, price) {
    return await APIRequest("AddProduct", { genericName, brandName, description, price });
}
async function API_RemoveProduct(productID) {
    return await APIRequest("RemoveProduct", { productID });
}
async function API_UpdateProduct(productID, genericName, brandName, description, price) {
    return await APIRequest("UpdateProduct", { productID, genericName, brandName, description, price });
}

// Crud operations on the Prescriptions table
async function API_GetPrescriptions() {
    return await APIRequest("GetPrescriptions", { });
}
async function API_GetPrescriptionByID(prescriptionID) {
    return await APIRequest("GetPrescriptionByID", { prescriptionID });
}
async function API_AddPrescription(doctorID, patientID, quantity, numberOfRefills, instructions) {
    return await APIRequest("AddPrescription", { doctorID, patientID, quantity, numberOfRefills, instructions });
}
async function API_RemovePrescription(prescriptionID) {
    return await APIRequest("RemovePrescription", { prescriptionID });
}
async function API_UpdatePrescription(prescriptionID, doctorID, patientID, quantity, numberOfRefills, instructions) {
    return await APIRequest("UpdatePrescription", { prescriptionID, doctorID, patientID, quantity, numberOfRefills, instructions });
}

// Crud operations on the PatientsXDoctors table
async function API_GetPatientsXDoctors() {
    return await APIRequest("GetPatientsXDoctorss", { });
}
async function API_GetPatientsXDoctorsByID(patientsXDoctorsID) {
    return await APIRequest("GetPatientsXDoctorsByID", { patientsXDoctorsID });
}
async function API_AddPatientsXDoctors(doctorID, patientID, quantity, numberOfRefills, instructions) {
    return await APIRequest("AddPatientsXDoctors", { doctorID, patientID, quantity, numberOfRefills, instructions });
}
async function API_RemovePatientsXDoctors(patientsXDoctorsID) {
    return await APIRequest("RemovePatientsXDoctors", { patientsXDoctorsID });
}
async function API_UpdatePatientsXDoctors(patientsXDoctorsID, doctorID, patientID, quantity, numberOfRefills, instructions) {
    return await APIRequest("UpdatePatientsXDoctors", { patientsXDoctorsID, doctorID, patientID, quantity, numberOfRefills, instructions });
}

// Crud operations on the PrescriptionsXProducts table
async function API_GetPrescriptionsXProducts() {
    return await APIRequest("GetPrescriptionsXProductss", { });
}
async function API_GetPrescriptionsXProductsByID(prescriptionsXProductsID) {
    return await APIRequest("GetPrescriptionsXProductsByID", { prescriptionsXProductsID });
}
async function API_AddPrescriptionsXProducts(doctorID, patientID, quantity, numberOfRefills, instructions) {
    return await APIRequest("AddPrescriptionsXProducts", { doctorID, patientID, quantity, numberOfRefills, instructions });
}
async function API_RemovePrescriptionsXProducts(prescriptionsXProductsID) {
    return await APIRequest("RemovePrescriptionsXProducts", { prescriptionsXProductsID });
}
async function API_UpdatePrescriptionsXProducts(prescriptionsXProductsID, doctorID, patientID, quantity, numberOfRefills, instructions) {
    return await APIRequest("UpdatePrescriptionsXProducts", { prescriptionsXProductsID, doctorID, patientID, quantity, numberOfRefills, instructions });
}