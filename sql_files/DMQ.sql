-- $VariableName$ is used as a placeholder for variables whos values are set with javascript

-- CRUD operations on Patients
-- Create a new Patient
INSERT INTO Patients (firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES ($firstName$, $lastName$, $dateOfBirth$, $email$, $phoneNumber$, $address$);
-- Read all Patient info
SELECT * FROM Patients ORDER BY patientID;
-- Update a Patient's info
UPDATE Patients SET firstName=$firstName$, lastName=$lastName$, dateOfBirth=$dateOfBirth$, email=$email$, phoneNumber=$phoneNumber$, address=$address$ WHERE patientID=$patientID$;
-- Delete a Patient
DELETE FROM Patients WHERE patientID=$patientID$;

-- CRUD operations on Clinics
-- Create a new Clinics
INSERT INTO Clinics (address, email, phoneNumber) VALUES ($address$, $email$, $phoneNumber$);
-- Read all Clinics info
SELECT * FROM Clinics ORDER BY clinicID;
-- Update a Clinics's info
UPDATE Clinics SET address=$address$, email=$email$, phoneNumber=$phoneNumber$ WHERE clinicID=$clinicID$;
-- Delete a Clinics
DELETE FROM Clinics WHERE clinicID=$clinicID$;

-- CRUD operations on Doctors
-- Create a new Doctors
INSERT INTO Doctors (firstName, lastName, email, phoneNumber, clinicID) VALUES ($firstName$, $lastName$, $email$, $phoneNumber$, $clinicID$);
-- Read all Doctors info
SELECT * FROM Doctors ORDER BY doctorID;
-- Update a Doctors's info
UPDATE Doctors SET firstName=$firstName$, lastName=$lastName$, email=$email$, phoneNumber=$phoneNumber$, clinicID=$clinicID$ WHERE doctorID=$doctorID$;
-- Delete a Doctors
DELETE FROM Doctors WHERE doctorID=$doctorID$;

-- CRUD operations on Products
-- Create a new Products
INSERT INTO Products (genericName, brandName, description, price) VALUES ($genericName$, $brandName$, $description$, $price$);
-- Read all Products info
SELECT * FROM Products ORDER BY productID;
-- Update a Products's info
UPDATE Products SET genericName=$genericName$, brandName=$brandName$, description=$description$, price=$price$ WHERE productID=$productID$;
-- Delete a Products
DELETE FROM Products WHERE productID=$productID$;

-- CRUD operations on Prescriptions
-- Create a new Prescriptions
INSERT INTO Prescriptions (doctorID, patientID, quantity, numberOfRefills, instructions) VALUES ($doctorID$, $patientID$, $quantity$, $numberOfRefills$, $instructions$);
-- Read all Prescriptions info
SELECT * FROM Prescriptions ORDER BY prescriptionID;
-- Update a Prescriptions's info
UPDATE Prescriptions SET doctorID=$doctorID$, patientID=$patientID$, quantity=$quantity$, numberOfRefills=$numberOfRefills$, instructions=$instructions$ WHERE prescriptionID=$prescriptionID$;
-- Delete a Prescriptions
DELETE FROM Prescriptions WHERE prescriptionID=$prescriptionID$;

-- CRUD operations on PatientsXDoctors
-- Create a new PatientsXDoctors relationship
INSERT INTO PatientsXDoctors (patientID, doctorID) VALUES ($patientID$, $doctorID$);
-- Read all PatientsXDoctors relationships for a given patientID
SELECT * FROM PatientsXDoctors WHERE patientID=$patientID$ ORDER BY doctorID;
-- Read all PatientsXDoctors relationships for a given doctorID
SELECT * FROM PatientsXDoctors WHERE doctorID=$doctorID$ ORDER BY patientID;
-- Read all PatientsXDoctors relationship
SELECT PatientsXDoctors.doctorID, PatientsXDoctors.patientID, Patients.firstName AS patientFirstName, Patients.lastName AS patientLastName, Doctors.firstName AS doctorFirstName, Doctors.lastName AS doctorLastName
FROM PatientsXDoctors INNER JOIN Patients ON PatientsXDoctors.patientID=$Patients.patientID$ INNER JOIN Doctors ON PatientsXDoctors.doctorID=$Doctors.doctorID$
ORDER BY PatientsXDoctors.patientID, PatientsXDoctors.doctorID;
-- Delete a PatientsXDoctors relationship
DELETE FROM PatientsXDoctors WHERE patientID=$patientID$ AND doctorID=$doctorID$;

-- CRUD operations on PrescriptionsXProducts
-- Create a new PrescriptionsXProducts relationship
INSERT INTO PrescriptionsXProducts (prescriptionID, productID) VALUES ($prescriptionID$, $productID$);
-- Read all PrescriptionsXProducts relationships for a given prescriptionID
SELECT * FROM PrescriptionsXProducts WHERE prescriptionID=$prescriptionID$ ORDER BY productID;
-- Read all PrescriptionsXProducts relationships for a given productID
SELECT * FROM PrescriptionsXProducts WHERE productID=$productID$ ORDER BY prescriptionID;
-- Read all PrescriptionsXProducts relationship
SELECT PrescriptionsXProducts.prescriptionID, PrescriptionsXProducts.productID, Prescriptions.doctorID, Prescription.patientID, Products.genericName, Products.brand, Products.description FROM PrescriptionsXProducts
INNER JOIN Prescriptions on PrescriptionsXProducts.prescriptionID=$Prescriptions.prescriptionID$ INNER JOIN PrescriptionsXProducts.productID=$Products.productID$ ORDER BY PrescriptionsXProducts.prescriptionID, PrescriptionsXProducts.productID;
-- Delete a PrescriptionsXProducts relationship
DELETE FROM PrescriptionsXProducts WHERE prescriptionID=$prescriptionID$ AND productID=$productID$;
