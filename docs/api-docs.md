# Smart Placement Management System — API Documentation

---

# BASE URL

```http
/api
```

---

# COMMON RESPONSE FORMAT

## Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# AUTHORIZATION HEADER

```http
Authorization: Bearer <jwt-token>
```

---

# USER ROLES

```text
STUDENT
ADMIN
```

---

# APPLICATION STATUS VALUES

```text
APPLIED
SHORTLISTED
REJECTED
SELECTED
```

---

# =========================================================
# AUTH APIs (Node.js Service)
# =========================================================

---

## 1. Signup

### Endpoint

```http
POST /api/auth/signup
```

### Purpose

Register student/admin user.

### Request Body

```json
{
  "name": "Lavanya",
  "email": "lavanya@gmail.com",
  "password": "123456",
  "role": "STUDENT"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt-token"
  }
}
```

### Authorization

```text
Public API
```

---

## 2. Login

### Endpoint

```http
POST /api/auth/login
```

### Purpose

Authenticate user login.

### Request Body

```json
{
  "email": "lavanya@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "role": "STUDENT"
  }
}
```

### Authorization

```text
Public API
```

---

## 3. Get Current User

### Endpoint

```http
GET /api/auth/me
```

### Purpose

Fetch logged-in user details.

### Headers

```http
Authorization: Bearer <token>
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Lavanya",
    "email": "lavanya@gmail.com",
    "role": "STUDENT"
  }
}
```

### Authorization

```text
Requires JWT Token
```

---

# =========================================================
# STUDENT APIs (Spring Boot)
# =========================================================

---

## 4. Get Student Profile

### Endpoint

```http
GET /api/students/{studentId}
```

### Purpose

Fetch student profile details.

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Lavanya",
    "cgpa": 8.7,
    "branch": "CSE",
    "backlogs": 0,
    "skills": ["Java", "React"]
  }
}
```

### Authorization

```text
Requires JWT Token
Accessible by STUDENT/ADMIN
```

---

## 5. Update Student Profile

### Endpoint

```http
PUT /api/students/{studentId}
```

### Purpose

Update student profile.

### Request Body

```json
{
  "cgpa": 8.9,
  "branch": "CSE",
  "backlogs": 0,
  "skills": ["Java", "Spring Boot", "React"]
}
```

### Response

```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

### Authorization

```text
Requires JWT Token
Accessible by STUDENT
```

---

## 6. Upload Resume

### Endpoint

```http
POST /api/students/upload-resume
```

### Purpose

Upload student resume.

### Form Data

```text
resume: PDF file
```

### Response

```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "resumeUrl": "/uploads/resume.pdf"
  }
}
```

### Authorization

```text
Requires JWT Token
Accessible by STUDENT
```

---

# =========================================================
# COMPANY APIs (Spring Boot)
# =========================================================

---

## 7. Get All Companies

### Endpoint

```http
GET /api/companies
```

### Purpose

Fetch all companies.

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "companyName": "Google",
      "role": "SDE Intern",
      "ctc": "15 LPA"
    }
  ]
}
```

### Authorization

```text
Requires JWT Token
Accessible by STUDENT/ADMIN
```

---

## 8. Get Company By ID

### Endpoint

```http
GET /api/companies/{companyId}
```

### Purpose

Fetch single company details.

### Authorization

```text
Requires JWT Token
```

---

## 9. Add Company

### Endpoint

```http
POST /api/companies
```

### Purpose

Admin adds company.

### Request Body

```json
{
  "companyName": "Google",
  "role": "SDE Intern",
  "ctc": "15 LPA",
  "requiredCgpa": 8.0,
  "allowedBacklogs": 0,
  "eligibleBranches": ["CSE", "ECE"],
  "requiredSkills": ["Java", "DSA"]
}
```

### Response

```json
{
  "success": true,
  "message": "Company added successfully"
}
```

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

## 10. Update Company

### Endpoint

```http
PUT /api/companies/{companyId}
```

### Purpose

Update company details.

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

## 11. Delete Company

### Endpoint

```http
DELETE /api/companies/{companyId}
```

### Purpose

Delete company.

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

# =========================================================
# APPLICATION APIs
# =========================================================

---

## 12. Apply For Company

### Endpoint

```http
POST /api/applications/apply
```

### Purpose

Student applies for company.

### Request Body

```json
{
  "studentId": 1,
  "companyId": 2
}
```

### Response

```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

### Authorization

```text
Requires JWT Token
Accessible by STUDENT
```

---

## 13. Check Eligibility

### Endpoint

```http
POST /api/applications/check-eligibility
```

### Purpose

Check student eligibility.

### Request Body

```json
{
  "studentId": 1,
  "companyId": 2
}
```

### Response

```json
{
  "success": true,
  "data": {
    "eligible": true,
    "message": "Eligible for application"
  }
}
```

### Authorization

```text
Requires JWT Token
Accessible by STUDENT
```

---

## 14. Get Student Applications

### Endpoint

```http
GET /api/applications/student/{studentId}
```

### Purpose

Fetch student applications.

### Authorization

```text
Requires JWT Token
Accessible by STUDENT
```

---

## 15. Get Company Applicants

### Endpoint

```http
GET /api/applications/company/{companyId}
```

### Purpose

Fetch applicants for company.

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

# =========================================================
# ADMIN APIs
# =========================================================

---

## 16. Shortlist Student

### Endpoint

```http
PUT /api/admin/shortlist/{applicationId}
```

### Purpose

Shortlist candidate.

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

## 17. Reject Student

### Endpoint

```http
PUT /api/admin/reject/{applicationId}
```

### Purpose

Reject candidate.

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

## 18. Select Student

### Endpoint

```http
PUT /api/admin/select/{applicationId}
```

### Purpose

Select candidate.

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

## 19. Get Dashboard Stats

### Endpoint

```http
GET /api/admin/stats
```

### Purpose

Fetch dashboard statistics.

### Response

```json
{
  "success": true,
  "data": {
    "totalStudents": 500,
    "totalCompanies": 35,
    "totalApplications": 1200
  }
}
```

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

# =========================================================
# NOTIFICATION APIs
# =========================================================

---

## 20. Get Notifications

### Endpoint

```http
GET /api/notifications/{userId}
```

### Purpose

Fetch user notifications.

### Authorization

```text
Requires JWT Token
```

---

## 21. Mark Notification As Read

### Endpoint

```http
PUT /api/notifications/read/{notificationId}
```

### Purpose

Mark notification as read.

### Authorization

```text
Requires JWT Token
```

---

# =========================================================
# RESUME ANALYSIS APIs (Python Service)
# =========================================================

---

## 22. Analyze Resume

### Endpoint

```http
POST /api/resume/analyze
```

### Purpose

Analyze uploaded resume.

### Form Data

```text
resume: PDF file
jobRole: SDE Intern
```

### Response

```json
{
  "success": true,
  "data": {
    "matchScore": 82,
    "matchedSkills": ["Java", "SQL"],
    "missingSkills": ["Docker", "AWS"]
  }
}
```

### Authorization

```text
Requires JWT Token
Accessible by STUDENT/ADMIN
```

---

# =========================================================
# ANALYTICS APIs
# =========================================================

---

## 23. Company-wise Statistics

### Endpoint

```http
GET /api/analytics/company-stats
```

### Purpose

Fetch company-wise statistics.

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```

---

## 24. Student-wise Statistics

### Endpoint

```http
GET /api/analytics/student-stats
```

### Purpose

Fetch student statistics.

### Authorization

```text
Requires JWT Token
Accessible by ADMIN
```
