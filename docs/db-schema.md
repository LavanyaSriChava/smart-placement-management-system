# Database Schema

## 1. Users Table

Stores:
- Students
- Admins

| Field | Type |
|---|---|
| id | Long |
| name | String |
| email | String |
| password | String |
| role | String |
| cgpa | Double |
| branch | String |
| backlogs | Integer |
| skills | String |

---

## 2. Companies Table

Stores company/job details.

| Field | Type |
|---|---|
| id | Long |
| companyName | String |
| role | String |
| ctc | String |
| requiredCgpa | Double |
| allowedBacklogs | Integer |
| eligibleBranches | String |
| requiredSkills | String |

---

## 3. Applications Table

Stores student applications.

| Field | Type |
|---|---|
| id | Long |
| studentId | Long |
| companyId | Long |
| status | String |
| appliedAt | Date |

---

## 4. Resumes Table

Stores uploaded resume files.

| Field | Type |
|---|---|
| id | Long |
| studentId | Long |
| resumeUrl | String |
| uploadedAt | Date |

---

## 5. Notifications Table

Stores notifications/messages.

| Field | Type |
|---|---|
| id | Long |
| userId | Long |
| message | String |
| isRead | Boolean |
| createdAt | Date |
