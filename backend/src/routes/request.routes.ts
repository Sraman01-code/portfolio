import { Router } from 'express';
import { createRequest, getRequests, getRequestById, deleteRequest } from '../controllers/request.controller';

const router = Router();

// POST /api/requests - Create a new request
router.post('/', createRequest);

// GET /api/requests - Get all requests
router.get('/', getRequests);

// GET /api/requests/:id - Get a specific request
router.get('/:id', getRequestById);

// DELETE /api/requests/:id - Delete a request
router.delete('/:id', deleteRequest);

export default router;
