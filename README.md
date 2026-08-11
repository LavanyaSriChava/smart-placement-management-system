# Smart Placement Management System

A full-stack web application for managing the campus placement process. The system provides separate workflows for students and placement administrators, including student profiles, company/job management, eligibility validation, applications, resume management, notifications, authentication, and AI/ML-based resume analysis.

## Features

### Student
- Student registration and login
- Student profile management
- Student dashboard
- View available companies and job descriptions
- Apply for placement opportunities
- Backend eligibility validation
- Duplicate application prevention
- View and track applications
- Upload and update resume
- Resume analysis against a company's job description
- View application-related notifications

### Admin / Placement Management
- Manage student and placement information
- Manage companies and job descriptions
- Configure eligibility requirements such as CGPA, backlogs, and branches
- View and manage student applications
- Update application status

### Resume Analysis
- Student selects a company and uploads a resume
- Frontend sends the selected `companyId`
- Spring Boot backend retrieves the corresponding company
- Backend obtains the company's job description
- Resume and job-description information are sent to the Python ML service
- ML service returns the resume analysis result

## Architecture

```text
                         +----------------------+
                         |      React.js        |
                         |      Frontend        |
                         +----------+-----------+
                                    |
                                 REST APIs
                                    |
                                    v
                         +----------------------+
                         |   Spring Boot        |
                         |      Backend         |
                         |                      |
                         | Controller           |
                         |      |               |
                         | Service              |
                         |      |               |
                         | Repository           |
                         +----------+-----------+
                                    |
                                    v
                              +-----------+
                              | PostgreSQL |
                              +-----------+

        +----------------------+       +----------------------+
        | Authentication      |       | Notification         |
        | Service             |       | Service              |
        +----------------------+       +----------------------+

                         +----------------------+
                         | Python ML Service    |
                         | Resume Analysis      |
                         +----------------------+
```

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, JavaScript, React Router, Axios |
| Backend | Java, Spring Boot, Spring MVC |
| Persistence | Spring Data JPA, Hibernate |
| Database | PostgreSQL |
| Authentication | Node.js Authentication Service |
| Resume Analysis | Python ML Service |
| API Communication | REST APIs |
| Testing | Postman, Browser Developer Tools |
| Build Tool | Maven |
| Version Control | Git, GitHub |
| Development | IntelliJ IDEA, VS Code |

## Repository Structure

```text
smart-placement-management-system/
|
+-- frontend/
|   +-- src/
|       +-- api/
|       +-- components/
|       |   +-- student/
|       +-- hooks/
|       +-- pages/
|       |   +-- student/
|       +-- routes/
|
+-- springboot-backend/
|   +-- src/
|       +-- main/
|           +-- java/com/placement/placementbackend/
|               +-- config/
|               +-- controller/
|               +-- dto/
|               +-- entity/
|               +-- exception/
|               +-- repository/
|               +-- service/
|           +-- resources/
|   +-- pom.xml
|
+-- auth-service/
|   +-- controllers/
|   +-- ...
|
+-- ml-service/
|   +-- ...
|
+-- README.md
```

## Backend Architecture

The Spring Boot backend follows a layered architecture:

```text
HTTP Request
     |
     v
Controller
     |
     v
Service
     |
     v
Repository
     |
     v
PostgreSQL
```

### Controller
Receives HTTP requests, maps endpoints, and delegates business operations to the service layer.

### Service
Contains business logic such as eligibility validation, duplicate application checking, resume replacement, application status updates, and notification triggering.

### Repository
Uses Spring Data JPA to access PostgreSQL.

Example:

```java
Optional<Resume> findByStudentId(Long studentId);
```

## Application Flow

```text
Student
   |
   v
Login / Authentication
   |
   v
Student Dashboard
   |
   v
View Companies
   |
   v
Select Company
   |
   v
Submit Application
   |
   +--> Check Student
   |
   +--> Check Company
   |
   +--> Check Duplicate Application
   |
   +--> Check Eligibility
   |
   v
Save Application
   |
   v
Send Notification
```

## Eligibility Validation

Eligibility is enforced in the backend before an application is saved.

The current checks are:

- Required CGPA
- Allowed backlogs
- Eligible branch

Simplified flow:

```text
Student Details
   |
   +-- CGPA
   +-- Backlogs
   +-- Branch
   |
   v
Company Requirements
   |
   +-- Required CGPA
   +-- Allowed Backlogs
   +-- Eligible Branches
   |
   v
Eligibility Validation
   |
   +--> Eligible ------> Application Created
   |
   +--> Not Eligible --> Application Rejected
```

Backend validation prevents eligibility rules from being bypassed by modifying frontend requests.

## Duplicate Application Prevention

Before creating an application, the backend checks whether the same student has already applied to the same company.

```java
existsByStudentIdAndCompanyId(studentId, companyId)
```

If an existing application is found, the backend rejects the request instead of creating another record.

## Resume Management

A student should have one current resume record.

When a resume is uploaded:

```text
Upload Resume
     |
     v
Find Resume by Student ID
     |
     +---- Existing ----> Update URL, file name, timestamp
     |
     +---- Not Existing -> Create new record
```

The repository provides:

```java
Optional<Resume> findByStudentId(Long studentId);
```

When an existing resume is found, its:
- `resumeUrl`
- `fileName`
- `uploadedAt`

are updated.

This prevents duplicate resume records for the same student.

## Notification Flow

The Spring Boot backend communicates with the Notification Service for important application events.

### Application Submitted

```text
Student Applies
      |
      v
Application Saved
      |
      v
Notification Service
      |
      v
Application Submitted Notification
```

### Application Status Updated

```text
Admin Updates Status
      |
      v
Application Updated
      |
      v
Notification Service
      |
      v
Student Receives Status Notification
```

Notification failures are handled separately so that a notification-service problem does not silently undo the main application operation.

## Authentication

Authentication is implemented as a separate service.

High-level flow:

```text
User
 |
 v
React Frontend
 |
 v
Authentication Service
 |
 v
Authenticated User
 |
 v
Placement Backend
```

The authentication service is separate from the main Spring Boot placement backend.

## Resume Analysis / ML Integration

The project integrates a Python-based ML service for resume analysis.

The service uses the selected company's job description as part of the analysis context.

### Flow

```text
Student
   |
   v
Select Company
   |
   v
Upload / Analyze Resume
   |
   v
Frontend sends companyId
   |
   v
Spring Boot Backend
   |
   v
Fetch Company
   |
   v
Get Job Description
   |
   v
Python ML Service
   |
   v
Resume Analysis
   |
   v
Result shown to Student
```

The job-description integration was tested end-to-end after resolving the issue where the analysis service reported that the job description was missing.

## Frontend API Modules

Frontend API communication is separated into dedicated modules, including:

```text
frontend/src/api/
├── authApi.js
├── notificationApi.js
├── resumeApi.js
├── studentapplicationApi.js
├── studentcompanyApi.js
└── studentuserApi.js
```

Other API modules may also be present depending on the final branch state.

## Database

PostgreSQL is used as the main relational database.

Major domain entities include:

- User
- Company
- Application
- Resume

A simplified relationship is:

```text
User
 |
 +---- Resume
 |
 +---- Application ---- Company
```

## Validation and Exception Handling

The backend uses request validation and application-specific exceptions.

Examples include:

- Required-field validation
- Resource-not-found handling
- Duplicate application rejection
- Eligibility validation
- Resume validation

Example:

```java
throw new ResourceNotFoundException("Application Not Found");
```

## API Testing

Postman and browser developer tools were used during development and integration testing.

Important test scenarios include:

### Application
- Successful application
- Duplicate application
- Invalid student
- Invalid company
- CGPA ineligibility
- Backlog ineligibility
- Branch ineligibility
- Application status update

### Resume
- Resume upload
- Resume retrieval
- Resume replacement
- Duplicate resume prevention
- Resume deletion

### Resume Analysis
- Correct `companyId` sent from frontend
- Correct company retrieved by backend
- Valid job description retrieved
- Job description forwarded to ML service
- Analysis response received successfully

## Local Setup

### Prerequisites

Install:

- Java 17+
- Maven
- Node.js and npm
- PostgreSQL
- Python 3.x
- Git

### Clone

```bash
git clone https://github.com/LavanyaSriChava/smart-placement-management-system.git
cd smart-placement-management-system
```

### PostgreSQL

Create the required PostgreSQL database and configure the backend database properties in:

```text
springboot-backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/placementdb
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

Use the actual database name and credentials configured for your environment.

### Run Spring Boot Backend

```bash
cd springboot-backend
mvnw.cmd spring-boot:run
```

Alternatively, run the Spring Boot application from IntelliJ IDEA.

### Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

### Run Authentication Service

```bash
cd auth-service
npm install
```

Start it using the script defined in the service's `package.json`.

### Run ML Service

Install the Python dependencies specified by the ML service:

```bash
pip install -r requirements.txt
```

Then start the ML service using its configured entry point.

## Environment Configuration

Keep environment-specific and sensitive values outside the repository.

Examples of configuration that should be environment-specific:

```text
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
AUTH_SERVICE_URL
NOTIFICATION_SERVICE_URL
ML_SERVICE_URL
```

Do not commit:

- Passwords
- API keys
- Authentication secrets
- Private tokens
- `.env` files containing secrets

## API URLs and Local Development

For local development, use the local service URLs configured for the project.

Temporary tunnel URLs such as ngrok URLs should not be committed as permanent API configuration.

If a temporary URL is required for testing, keep it in local/environment-specific configuration so that it does not overwrite another developer's localhost configuration when changes are pulled.

## Development Workflow

Recommended workflow:

```text
Pull latest changes
       |
       v
Create / switch to feature branch
       |
       v
Make changes
       |
       v
Run and test locally
       |
       v
Check git status
       |
       v
Commit changes
       |
       v
Push branch
       |
       v
Create / update Pull Request
```

Before committing:

```bash
git status
git diff
```

Use meaningful commit messages and avoid committing temporary files, credentials, or machine-specific configuration.

## Important Resolved Issues

### Duplicate Applications
Resolved by checking `studentId + companyId` before creating an application.

### Eligibility Validation
Resolved by validating CGPA, backlog count, and branch on the backend.

### Duplicate Resume Records
Resolved by finding the existing resume by `studentId` and updating it instead of creating another record.

### Resume Analysis Job Description
Resolved by ensuring the selected `companyId` is used to retrieve the company and its job description before the resume-analysis request is sent to the Python service.

### Final JD Integration Test
The previously reported missing-job-description issue was resolved and verified through end-to-end testing.

## Current Project Status

### Core Functionality

- [x] Authentication
- [x] Student module
- [x] Admin / placement management
- [x] Company management
- [x] Job description support
- [x] Application management
- [x] Eligibility validation
- [x] Duplicate application prevention
- [x] Resume upload
- [x] Resume replacement
- [x] Notification integration
- [x] Resume analysis integration
- [x] Job description integration
- [x] End-to-end JD integration testing

## Future Improvements

Possible future improvements include:

- More advanced resume-job matching
- Better skill extraction from resumes
- AI-based job recommendations
- Placement analytics
- Automated email notifications
- Real-time notifications
- Automated unit and integration testing
- Centralized logging and monitoring
- Service retry and resilience mechanisms
- CI/CD pipeline
- Cloud deployment

## Contributors

This is a collaborative team project.

Add the final team member names and individual contributions here before publishing the final repository.

## License

This project was developed as an academic/team project.
