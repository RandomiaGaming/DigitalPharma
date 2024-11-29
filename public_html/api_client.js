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

// CRUD operations for Patients table
async function API_GetPatients() {
    const results = await API_Request("/API/GetPatients", {});
    return results;
}
async function API_GetPatientByID(patientID) {
    const result = await API_Request("/API/GetPatientByID", { patientID: patientID });
    return result;
}
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    await API_Request("/API/AddPatient", { firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, email: email, phoneNumber: phoneNumber, address: address });
}
async function API_RemovePatient(patientID) {
    await API_Request("/API/RemovePatient", { patientID: patientID });
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    await API_Request("/API/UpdatePatient", { patientID: patientID, firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, email: email, phoneNumber: phoneNumber, address: address });
}

// Hard reset
async function API_HardReset() {
    await API_Request("/API/HardReset", {});
}