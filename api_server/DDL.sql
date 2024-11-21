-- Disable foreign key checks so that we won't get errors when dropping and recreating the entire database
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Clear all tables from the database if they already exist
-- This allows us to recreate them without errors and ensure existing data is removed
DROP TABLE IF EXISTS Patients;
DROP TABLE IF EXISTS Clinics;
DROP TABLE IF EXISTS Doctors;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Prescriptions;
DROP TABLE IF EXISTS PatientsXDoctors;
DROP TABLE IF EXISTS PrescriptionsXProducts;

-- Create new tables based upon our schema
-- Create Patients table
CREATE TABLE Patients(
    patientID INT AUTO_INCREMENT UNIQUE NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    dateOfBirth date NOT NULL,
    email VARCHAR(50) UNIQUE NULL,
    phoneNumber VARCHAR(15) UNIQUE NULL,
    address VARCHAR(260) UNIQUE NOT NULL,
    PRIMARY KEY(patientID)
);
-- Create Clinics table
CREATE TABLE Clinics(
    clinicID INT AUTO_INCREMENT UNIQUE NOT NULL,
    address VARCHAR(256) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NULL,
    phoneNumber VARCHAR(15) UNIQUE NULL,
    PRIMARY KEY(clinicID)
);
-- Create Doctors table
CREATE TABLE Doctors(
    doctorID INT AUTO_INCREMENT UNIQUE NOT NULL,
    firstName VARCHAR (50) NOT NULL,
    lastName VARCHAR (50) NOT NULL,
    email VARCHAR (50) UNIQUE NULL,
    phoneNumber VARCHAR (15) UNIQUE NULL,
    clinicID INT,
    PRIMARY KEY(doctorID),
    FOREIGN KEY(clinicID) REFERENCES Clinics(clinicID) ON DELETE CASCADE
);
-- Create Products table
CREATE TABLE Products(
    productID INT AUTO_INCREMENT UNIQUE NOT NULL,
    genericName VARCHAR (50) UNIQUE NOT NULL,
    brandName VARCHAR (50) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price decimal(10, 2) NOT NULL,
    PRIMARY KEY(productID)
);
-- Create Prescriptions table
CREATE TABLE Prescriptions(
    prescriptionID INT AUTO_INCREMENT UNIQUE NOT NULL,
    doctorID INT,
    patientID INT,
    quantity INT NOT NULL,
    numberOfRefills INT NOT NULL,
    instructions TEXT NOT NULL,
    PRIMARY KEY(prescriptionID),
    FOREIGN KEY(doctorID) REFERENCES Doctors(doctorID) ON DELETE CASCADE,
    FOREIGN KEY(patientID) REFERENCES Patients(patientID) ON DELETE CASCADE
);
-- Create PatientsXDoctors table
CREATE TABLE PatientsXDoctors(
    patientsXDoctorsID INT AUTO_INCREMENT UNIQUE NOT NULL,
    patientID INT,
    doctorID INT,
    PRIMARY KEY(patientsXDoctorsID),
    FOREIGN KEY(patientID) REFERENCES Patients(patientID) ON DELETE CASCADE,
    FOREIGN KEY(doctorID) REFERENCES Doctors(doctorID) ON DELETE CASCADE
);
-- Create PrescriptionsXProducts table
CREATE TABLE PrescriptionsXProducts (
    prescriptionsXProductsID INT AUTO_INCREMENT UNIQUE NOT NULL,
    prescriptionID INT,
    productID INT,
    PRIMARY KEY(prescriptionsXProductsID),
    FOREIGN KEY(prescriptionID) REFERENCES Prescriptions(prescriptionID) ON DELETE CASCADE,
    FOREIGN KEY(productID) REFERENCES Products(productID) ON DELETE CASCADE
);

-- Add sample data into the database based upon the data in the pdf
-- Inserts 5 rows of sample data into the Patients table
INSERT INTO Patients(patientID, firstName, lastName, dateOfBirth, email, phoneNumber, address) VALUES
(1, "John", "Doe", "1985-07-12", "johndoe@example.com", NULL, "123 Main St, Springfield, IL"),
(2, "Jane", "Smith", "1990-03-22", "janesmith@example.com", "+1-111-555-5678", "456 Elm St, Springfield, IL"),
(3, "Michael", "Johnson", "1978-11-05", "michael.johnson@example.com", "+1-111-555-9012", "789 Oak St, Springfield, IL"),
(4, "Emily", "Davis", "2000-01-15", "emily.davis@example.com", "+1-111-555-3456", "321 Maple St, Springfield, IL"),
(5, "Sarah", "Brown", "1992-08-30", "sarah.brown@example.com", "+1-111-555-7890", "654 Pine St, Springfield, IL");
-- Inserts 5 rows of sample data into the Clinics table
INSERT INTO Clinics(clinicID, address, email, phoneNumber) VALUES
(1, "101 Health Ave, Springfield, IL", "contact@healthclinic.com", "+1-111-555-1010"),
(2, "202 Wellness Blvd, Springfield, IL", "info@wellnessclinic.com", "+1-111-555-2020"),
(3, "303 Care St, Springfield, IL", NULL, "+1-111-555-3030"),
(4, "404 Healing Rd, Springfield, IL", "hello@healingclinic.com", "+1-111-555-4040"),
(5, "505 Recovery Ln, Springfield, IL", "admin@recoveryclinic.com", "+1-111-555-5050");
-- Inserts 5 rows of sample data into the Doctors table
INSERT INTO Doctors(doctorID, firstName, lastName, email, phoneNumber, clinicID) VALUES
(1, "Alice", "Walker", "alice.walker@healthclinic.com", "+1-111-555-1101", 1),
(2, "Brian", "Kim", "brian.kim@wellnessclinic.com", "+1-111-555-2202", 2),
(3, "Carol", "Smith", "carol.smith@careclinic.com", "+1-111-555-3303", 3),
(4, "David", "Jones", "david.jones@healingclinic.com", NULL, 4),
(5, "Eva", "Martinez", "eva.martinez@recoveryclinic.com", "+1-111-555-5505", 5);
-- Inserts 5 rows of sample data into the Products table
INSERT INTO Products(productID, genericName, brandName, description, price) VALUES
(1, "Ibuprofen", "Advil", "Nonsteroidal anti-inflammatory drug used to reduce fever and treat pain or inflammation.", 5.99),
(2, "Acetaminophen", "Tylenol", "Pain reliever and a fever reducer commonly used to treat headaches, muscle aches, and minor pain.", 6.49),
(3, "Amoxicillin", "Amoxil", "Antibiotic used to treat various bacterial infections.", 12.99),
(4, "Lisinopril", "Prinivil", "Medication primarily used to treat high blood pressure and heart failure.", 8.99),
(5, "Metformin", "Glucophage", "Medication for managing blood sugar levels in people with type 2 diabetes.", 10.49);
-- Inserts 5 rows of sample data into the Prescriptions table
INSERT INTO Prescriptions(prescriptionID, doctorID, patientID, quantity, numberOfRefills, instructions) VALUES
(1, 1, 2, 30, 2, "Take one tablet of each by mouth twice daily after meals"),
(2, 2, 4, 14, 1, "Take one tablet by mouth every 8 hours as needed"),
(3, 3, 1, 10, 0, "Take one capsule by mouth once daily in the morning"),
(4, 4, 5, 60, 3, "Take one tablet by mouth every evening before bed"),
(5, 5, 3, 20, 1, "Take one tablet by mouth twice daily with food");
-- Inserts 5 rows of sample data into the PatientsXDoctors table
INSERT INTO PatientsXDoctors(patientsXDoctorsID, patientID, doctorID) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 4),
(4, 3, 1),
(5, 4, 5),
(6, 5, 3);
-- Inserts 5 rows of sample data into the PrescriptionsXProducts table
INSERT INTO PrescriptionsXProducts(prescriptionsXProductsID, prescriptionID, productID) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 3),
(5, 4, 4),
(6, 5, 5);

-- Re-enable foreing key checks and apply our changes with commit
SET FOREIGN_KEY_CHECKS=1;
COMMIT;