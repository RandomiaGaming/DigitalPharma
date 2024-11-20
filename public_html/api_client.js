async function APIRequest(endpoint, payload) {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const responseData = await response.json();
    return responseData;
}

async function GetPatientByID(patientID) {
    return await APIRequest("/API/GetPatientByID", { patientID });
}
async function GetPatients() {
    return await APIRequest("/API/GetPatients", { });
};
async function AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    return await APIRequest("/API/AddPatient", { firstName, lastName, dateOfBirth, email, phoneNumber, address });
};
async function RemovePatient(patientID) {
    return await APIRequest("/API/RemovePatient", { patientID });
};
async function UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    return await APIRequest("/API/UpdatePatient", { patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address });
};