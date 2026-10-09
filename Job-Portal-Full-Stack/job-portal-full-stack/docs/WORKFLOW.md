# Job Portal Workflow

## Candidate Workflow

Register → Login → Search Jobs → Open Job → Submit Cover Letter → Track Application Status

## Recruiter Workflow

Register as Recruiter → Login → Open Recruiter Panel → Create Job → Edit/Delete Job → Review applications through API

## Data Flow

React UI → Axios → Express REST API → Mongoose → MongoDB

## Validation

Frontend performs required-field validation. Backend uses express-validator and Mongoose validation so requests cannot rely only on client-side checks.

## Security

- Passwords are hashed with bcryptjs.
- JWT is used for authenticated API access.
- Role checks prevent candidates from managing jobs.
- Recruiters can modify only jobs they own.
- CORS restricts browser access to the configured frontend origin.
