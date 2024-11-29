// General API request helpers
async function API_Request(endpoint, payload) {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    console.log(`got ${response} from client.`);
    if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(`API request failed with status code ${response.status} ${errMsg}`);
    }
    const responseData = await response.json();
}

// CRUD operations on Patients table
async function API_GetPatients() {
    return await API_Request("/API/GetPatients", { });
}
async function API_GetPatientByID(patientID) {
    return await API_Request("/API/GetPatientByID", { patientID: patientID.toString() });
}
async function API_AddPatient(firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    return await API_Request("/API/AddPatient", { firstName: firstName.toString(), lastName: lastName.toString(), dateOfBirth: dateOfBirth.toString(), email: email.toString(), phoneNumber: phoneNumber.toString(), address: address.toString() });
}
async function API_RemovePatient(patientID) {
    return await API_Request("/API/RemovePatient", { patientID: patientID.toString() });
}
async function API_UpdatePatient(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) {
    return await API_Request("/API/UpdatePatient", { patientID: patientID.toString(), firstName: firstName.toString(), lastName: lastName.toString(), dateOfBirth: dateOfBirth.toString(), email: email.toString(), phoneNumber: phoneNumber.toString(), address: address.toString() });
}