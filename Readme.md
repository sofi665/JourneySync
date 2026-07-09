# JourneySync - Collaborative Travel Planner

## Overview

JourneySync is a full-stack web application designed to help groups organize trips collaboratively. Users can create trips, invite participants, manage travel information, and (in future iterations) split expenses, track budgets, and coordinate activities.

The project was built as a portfolio application to demonstrate the development of a modern Java backend with a React/Next.js frontend following good software engineering practices.

---

## Features

Current features:

- Create trips
- List all trips
- View trip details
- Edit existing trips
- Delete trips
- Responsive frontend interface
- RESTful API
- Layered backend architecture
- PostgreSQL database integration

Planned features:

- User authentication with JWT
- Participant management
- Expense management
- Budget tracking
- File/image uploads
- Notifications
- Dashboard with trip statistics

---

## Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- PostgreSQL
- Lombok
- Maven

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### DevOps

- Docker
- Docker Compose
- Kubernetes (planned)

---

## Architecture

Backend follows a layered architecture:

```
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Project organization:

```
backend/
│
├── controller/
├── dto/
├── entity/
├── repository/
├── service/
│   ├── interfaces/
│   └── implementation/
├── config/
└── exception/

frontend/
│
├── app/
├── components/
├── services/
├── hooks/
├── types/
└── styles/
```

---

## Database

Current main entities:

- Trip
- User
- Participant
- Expense

Relationships are designed to support collaborative travel planning while maintaining a normalized database structure.

---

## API Endpoints

### Trips

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/trips` | Get all trips |
| GET | `/api/trips/{id}` | Get trip by ID |
| POST | `/api/trips` | Create a trip |
| PUT | `/api/trips/{id}` | Update a trip |
| DELETE | `/api/trips/{id}` | Delete a trip |

---

## Running the Project

### Requirements

- Java 21
- Maven
- Node.js 20+
- PostgreSQL
- Docker (optional)

---

### Backend

Clone the repository:

```bash
git clone https://github.com/your-user/journeysync.git
```

Enter the backend directory:

```bash
cd backend
```

Configure the database in:

```
application.properties
```

Run:

```bash
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

---

### Frontend

Enter the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:3000
```

---

## Future Improvements

- JWT Authentication
- User registration and login
- Role-based authorization
- Participant invitations
- Expense sharing
- Currency conversion
- Email notifications
- Trip chat
- Image uploads
- Activity planner
- CI/CD pipeline
- Kubernetes deployment
- Monitoring with Prometheus and Grafana

---

## Learning Objectives

This project was developed to strengthen skills in:

- Java
- Spring Boot
- REST API development
- Layered architecture
- DTO pattern
- Repository pattern
- Dependency Injection
- PostgreSQL
- React
- Next.js
- TypeScript
- Docker
- Kubernetes
- Full-stack application development

---

## Author

**Sofía Belén Dorado Arias**

Backend Java Developer | Full Stack Developer

GitHub:
https://github.com/sofi665
LinkedIn:
www.linkedin.com/in/sofia-dorado-arias

---

## License

This project is intended for educational and portfolio purposes.
