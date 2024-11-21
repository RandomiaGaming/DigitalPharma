//Format Source from In Class Example "BSG_HTML_UI" CS340
// Script file to call functions to show form sections
function showForm(action) {
    document.querySelectorAll('.form-section').forEach(section => section.style.display = 'none');
    document.getElementById(action).style.display = 'block';
}

// Clinics
function browseClinics() { showForm('browse'); }
function addClinic() { showForm('insert'); }
function updateClinic(id, address, email, phone) {
    showForm('update');
    document.getElementById('updateClinicID').value = id;
    document.getElementById('updateAddress').value = address;
    document.getElementById('updateEmail').value = email || '';
    document.getElementById('updatePhone').value = phone || '';
}
function deleteClinic(id, address) {
    showForm('delete');
    document.getElementById('deleteClinicID').innerText = id;
    document.getElementById('deleteClinicAddress').innerText = address;
}

// Doctors
function browseDoctors() { showForm('browse'); }
function addDoctor() { showForm('insert'); }
function updateDoctor(id, firstName, lastName, email, phone, clinicID) {
    showForm('update');
    document.getElementById('updateDoctorID').value = id;
    document.getElementById('updateFirstName').value = firstName;
    document.getElementById('updateLastName').value = lastName;
    document.getElementById('updateEmail').value = email || '';
    document.getElementById('updatePhone').value = phone || '';
    document.getElementById('updateClinicID').value = clinicID;
}
function deleteDoctor(id, firstName, lastName) {
    showForm('delete');
    document.getElementById('deleteDoctorID').innerText = id;
    document.getElementById('deleteDoctorName').innerText = `${firstName} ${lastName}`;
}

// Patients
function browsePatients() { showForm('browse'); }
function addPatient() { showForm('insert'); }
function updatePatient(id, firstName, lastName, dob, email, phone, address) {
    showForm('update');
    document.getElementById('updatePatientID').value = id;
    document.getElementById('updateFirstName').value = firstName;
    document.getElementById('updateLastName').value = lastName;
    document.getElementById('updateDOB').value = dob;
    document.getElementById('updateEmail').value = email || '';
    document.getElementById('updatePhone').value = phone || '';
    document.getElementById('updateAddress').value = address;
}
function deletePatient(id, firstName, lastName) {
    showForm('delete');
    document.getElementById('deletePatientID').innerText = id;
    document.getElementById('deletePatientName').innerText = `${firstName} ${lastName}`;
}

// Prescriptions
function browsePrescriptions() { showForm('browse'); }
function addPrescriptions() { showForm('insert'); }
function updatePrescriptions(preid, docid, patid, qty, nor, instruct) {
    showForm('update');
    document.getElementById('updatePrescriptionID').innerText = preid;
    document.getElementById('updateDoctorID').value = docid;
    document.getElementById('updatePatientID').value = patid;
    document.getElementById('updateQuantity').value = qty;
    document.getElementById('updateNumOfRefills').value = nor;
    document.getElementById('updateInstruction').value = instruct;
}
function deletePrescriptions(preid, docid, patid) {
    showForm('delete');
    document.getElementById('deletePrescriptionID').innerText = preid;
    document.getElementById('deleteDoctorID').innerText = docid;
    document.getElementById('deletePatientID').innerText = patid;
}

// Products
function browseProducts() { showForm('browse'); }
function addProduct() { showForm('insert'); }
function updateProduct(id, genericName, brandName, description, price) {
    showForm('update');
    document.getElementById('updateProductID').value = id;
    document.getElementById('updateGenericName').value = genericName;
    document.getElementById('updateBrandName').value = brandName;
    document.getElementById('updateDescription').value = description;
    document.getElementById('updatePrice').value = price;
}
function deleteProduct(id, genericName, brandName) {
    showForm('delete');
    document.getElementById('deleteProductID').innerText = id;
    document.getElementById('deleteGenericName').innerText = genericName;
    document.getElementById('deleteBrandName').innerText = brandName;
}
