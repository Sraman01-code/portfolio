# ReqFlow - API Testing Tool (Postman Clone)

A modern API testing and development tool built with React (frontend) and Node.js/Express (backend).

## Features

- Send HTTP requests (GET, POST, PUT, PATCH, DELETE, etc.)
- Save and manage request collections
- Full CORS support for cross-origin requests
- Docker support for easy deployment
- Clean and intuitive UI

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   │   └── cors.ts          # CORS configuration
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Server entry point
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── pages/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── nginx.conf
│   ├── vite.config.ts
│   └── package.json
├── docker-compose.yml          # Development setup
└── docker-compose.prod.yml     # Production setup
```

## CORS Configuration

The CORS issue you were facing has been resolved with a comprehensive CORS middleware that:

1. **Allows multiple origins** including:
   - `http://localhost:3000` (default frontend)
   - `http://localhost:5173` (Vite default)
   - `http://127.0.0.1:3000`
   - `http://127.0.0.1:5173`
   - Custom origin from environment variable

2. **Handles preflight requests** (OPTIONS method)

3. **Allows credentials** and custom headers

4. **Development mode** allows all origins for easier testing

## Setup Instructions

### Prerequisites

- Node.js 22+
- npm or yarn
- Docker and Docker Compose (optional)

### Option 1: Manual Setup (Without Docker)

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file if needed
# Default configuration:
# PORT=5000
# HOST=0.0.0.0
# NODE_ENV=development
# FRONTEND_URL=http://localhost:3000

# Start development server
npm run dev
```

The backend will start on `http://localhost:5000`

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file if needed
# Default configuration:
# VITE_API_URL=http://localhost:5000
# VITE_API_BASE_URL=http://localhost:5000/api

# Start development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### Option 2: Docker Setup (Recommended)

#### Development Mode

```bash
# Start both frontend and backend
docker-compose up

# Or run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

#### Production Mode

```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d

# Stop containers
docker-compose -f docker-compose.prod.yml down
```

## API Endpoints

### Health Check
```
GET /health
```

### Requests
```
POST   /api/requests      - Create a new request
GET    /api/requests      - Get all requests
GET    /api/requests/:id  - Get a specific request
DELETE /api/requests/:id  - Delete a request
```

## Fixing Your CORS Error

If you're still experiencing CORS issues after implementing this setup:

1. **Ensure the backend is running** on `http://localhost:5000`
2. **Ensure the frontend is running** on `http://localhost:3000`
3. **Clear browser cache** and restart the browser
4. **Check that the CORS middleware is applied first** in `backend/src/app.ts`
5. **Verify environment variables** are correctly set in both `.env` files

### Testing the CORS Fix

1. Start the backend:
```bash
cd backend
npm run dev
```

2. Start the frontend in a new terminal:
```bash
cd frontend
npm run dev
```

3. Open your browser to `http://localhost:3000`

4. Try making a POST request to `https://jsonplaceholder.typicode.com/posts`

The CORS middleware will properly handle the request, and you should no longer see the CORS error.

## Troubleshooting

### Issue: "CORS request did not succeed"

**Solution:**
- Make sure the backend server is running
- Check that the backend is accessible at `http://localhost:5000/health`
- Verify the CORS middleware is properly configured in `backend/src/middleware/cors.ts`

### Issue: "Network Error" from Axios

**Solution:**
- Ensure the backend URL in frontend `.env` is correct
- Check if the backend server is running and accessible
- Verify no firewall is blocking localhost connections

### Issue: Port Already in Use

**Solution:**
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
HOST=0.0.0.0
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api
```

## Development

### Backend Development
```bash
cd backend
npm run dev          # Start with auto-reload
npm run build        # Build TypeScript
npm run start        # Start production server
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Production Deployment

### Using Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

1. Build backend:
```bash
cd backend
npm install --production
npm run build
npm run start:prod
```

2. Build frontend:
```bash
cd frontend
npm install
npm run build
# Serve the dist/ folder with nginx or similar
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
