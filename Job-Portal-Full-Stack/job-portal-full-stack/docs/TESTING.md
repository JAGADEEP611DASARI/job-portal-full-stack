# Testing Report

| Test Case | Expected Result |
|---|---|
| Register with empty name | Validation error |
| Register with invalid email | Validation error |
| Register with password < 6 chars | Validation error |
| Register duplicate email | 409 response |
| Login with wrong password | 401 response |
| Open jobs without login | Jobs are displayed |
| Search by title | Matching jobs displayed |
| Search by location | Matching jobs displayed |
| Candidate creates job | Access denied |
| Recruiter creates valid job | Job created |
| Recruiter edits own job | Job updated |
| Recruiter deletes own job | Job deleted |
| Candidate applies | Application created |
| Candidate applies twice | Duplicate application rejected |
| Candidate opens dashboard | Own applications displayed |
| Invalid application cover letter | Validation error |
