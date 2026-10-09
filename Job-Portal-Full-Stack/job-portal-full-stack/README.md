# Job Portal - Full Stack Virtual Internship Project

A responsive full-stack job portal built with React, Node.js, Express, and MongoDB.

## Features

- Responsive job portal interface
- User registration and login
- JWT authentication
- Job search by title, company, location, and skills
- Job CRUD operations
- Job application workflow
- User profile and application history
- Form validation
- MongoDB database integration
- REST API
- Error handling
- Protected routes
- Clean frontend/backend separation

## Tech Stack

### Frontend
- React + Vite
- React Router
- Axios
- Plain CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- express-validator
- CORS
- dotenv

## Folder Structure

```text
job-portal-full-stack/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Requirements

- Node.js 18+
- MongoDB local installation or MongoDB Atlas
- npm

## 1. Start MongoDB

For local MongoDB, make sure the MongoDB service is running.

Default database:
`job_portal`

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/job_portal
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

Backend:
`http://localhost:5000`

Health check:
`http://localhost:5000/api/health`

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend:
`http://localhost:5173`

## Demo Workflow

1. Register a new account.
2. Login.
3. Browse available jobs.
4. Search/filter jobs.
5. Open a job details page.
6. Apply for a job.
7. Open Dashboard to view applications.
8. Create a recruiter account using the Register page role selector.
9. Recruiter can create, update, and delete jobs.
10. Test validation by submitting incomplete forms.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |

### Jobs

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/jobs` | No |
| GET | `/api/jobs/:id` | No |
| POST | `/api/jobs` | Recruiter |
| PUT | `/api/jobs/:id` | Recruiter |
| DELETE | `/api/jobs/:id` | Recruiter |

### Applications

| Method | Endpoint | Auth |
|---|---|---|
| POST | `/api/applications/:jobId` | Candidate |
| GET | `/api/applications/my` | Candidate |
| GET | `/api/applications/job/:jobId` | Recruiter |
| PATCH | `/api/applications/:id/status` | Recruiter |

## Testing Checklist

- [ ] Registration with valid data
- [ ] Registration validation
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Job search
- [ ] Empty search results
- [ ] Job details
- [ ] Recruiter creates a job
- [ ] Recruiter edits a job
- [ ] Recruiter deletes a job
- [ ] Candidate applies
- [ ] Duplicate application is rejected
- [ ] Candidate sees applications
- [ ] Recruiter sees job applications
- [ ] Responsive layout on mobile and desktop
- [ ] Unauthorized API requests are rejected

## Project Submission Description

This project demonstrates full-stack application development using a modern MERN-style architecture. It implements a complete job discovery and application workflow with authentication, database persistence, CRUD operations, search, validation, and role-based access control.

## Future Enhancements

- Resume upload
- Email notifications
- Admin dashboard
- Saved jobs
- Pagination
- Advanced filters
- Job recommendations
- Company profiles
- Docker deployment
