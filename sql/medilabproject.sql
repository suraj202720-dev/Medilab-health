CREATE DATABASE medilab;
USE medilab;

CREATE TABLE contact_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


SELECT * FROM contact_requests;

INSERT INTO contact_requests (name, phone, email, message)
VALUES ('Test User', '9999999999', 'test@gmail.com', 'First test entry');



ALTER TABLE contact_requests
ADD COLUMN status VARCHAR(20) DEFAULT 'New';

SELECT id, name, status FROM contact_requests;

SELECT id, name, status FROM contact_requests ORDER BY id

UPDATE contact_requests
SET status = 'New'
WHERE id > 0
  AND (status IS NULL OR status = '');

SELECT status, COUNT(*) FROM contact_requests GROUP BY status;

UPDATE contact_requests
SET 
  status = 'Deleted',
  deleted_at = NOW(),
  deleted_by = 'admin'
WHERE id = 2;

ALTER TABLE contact_requests
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD COLUMN deleted_by VARCHAR(50) DEFAULT 'admin';


DESCRIBE contact_requests;

UPDATE contact_requests
SET 
  status = 'Deleted',
  deleted_at = NOW(),
  deleted_by = 'admin'
WHERE id = 2;

SELECT id, name, status, deleted_at, deleted_by
FROM contact_requests
WHERE id = 2;


SELECT id, name, status, deleted_at, deleted_by
FROM contact_requests;

CREATE TABLE customer_otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(15),
  otp VARCHAR(6),
  expires_at DATETIME,
  is_used TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM customer_otps;

SELECT * FROM customer_otps
ORDER BY id DESC
LIMIT 5;

SELECT mobile, otp, is_used
FROM customer_otps;

DELETE FROM customer_otps;

DELETE FROM customer_otps
WHERE expires_at < NOW();

CREATE TABLE doctor_consultations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_name VARCHAR(100),
  speciality VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from doctor_consultations order by created_at desc

-- digital health report

CREATE TABLE health_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    report_name VARCHAR(100),
    report_file VARCHAR(255),
    status ENUM('Processing','Completed') DEFAULT 'Processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO health_reports (user_id, report_name, report_file, status)
VALUES
(1, 'Full Body Checkup', 'reports/full_body.pdf', 'Completed'),
(1, 'Diabetes Care', 'reports/diabetes.pdf', 'Processing');


select * from health_reports

ALTER TABLE contact_requests
ADD disease VARCHAR(100),
ADD tests TEXT;

USE medilab;

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    tests TEXT NOT NULL,
    total INT NOT NULL,
    status ENUM('New','Called','Done') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE bookings;

SELECT * FROM bookings ORDER BY id DESC;

