# Mario Pinheiro - 30015420

Exercise: Developer Portfolio Site (Front-End) + Backend API

## Front-End

To run the development server:

```bash
npm start
```

To build for production:

```bash
npm run build
```

To serve the production build locally:

```bash
npx serve build
```

## Back-End

The back-end is a Node.js/Express API providing authentication and dynamic project data.

### Setup
```bash
cd portfolio-backend
npm install
npm start  # or npm run dev for development with nodemon
```

Server runs on port 5000. An admin user is seeded on first start (username: admin, password: adminpass).

### API Endpoints

#### Authentication
- **POST /api/auth/register**  
  Register a new user. Default role: guest.  
  Body: `{ "username": "string", "password": "string", "role": "admin|guest" }`  
  Returns: `{ "message": "...", "token": "jwt" }`

- **POST /api/auth/login**  
  Login.  
  Body: `{ "username": "string", "password": "string" }`  
  Returns: `{ "token": "jwt" }`

#### Projects
- **GET /api/projects**  
  Public: Get all projects.  
  Returns: Array of project objects.

- **POST /api/projects**  
  Admin only: Add a new project.  
  Authorization: Bearer token with admin role.  
  Body: `{ "title": "string", "description": "string", "tech": ["string"] }`  
  Returns: Created project object.

#### Dashboard
- **GET /api/dashboard**  
  Protected: Personalized message for logged-in users.  
  Authorization: Bearer token.  
  Returns: `{ "message": "..." }`

### Testing
Use Postman or curl to test. Example curl for login:
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"adminpass"}'
```
