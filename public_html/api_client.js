// General API request helpers
async function API_Request(endpoint, payload) {
    const response = await fetch("/API/" + endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const responseData = await response.json();
    if (responseData.errors) {
        throw new Error(JSON.stringify(responseData.errors));
    } else {
        return responseData.result;
    }
}

// CRUD operations on Patients table
async function API_GetPatients() {
    return await API_Request("GetPatients", { });
}
async function API_GetPatientByID(patientID) {
    return await API_Request("GetPatientByID", { patientID });
}
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    return await API_Request("AddPatient", { firstName, lastName, dateOfBirth, email, phoneNumber, address });
}
async function API_RemovePatient(patientID) {
    return await API_Request("RemovePatient", { patientID });
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    return await API_Request("UpdatePatient", { patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address });
}