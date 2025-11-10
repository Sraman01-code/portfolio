import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage (replace with database in production)
const requests: any[] = [];

export const createRequest = async (req: Request, res: Response) => {
  try {
    const requestData = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    requests.push(requestData);

    res.status(201).json({
      success: true,
      message: 'Request saved successfully',
      data: requestData
    });
  } catch (error: any) {
    console.error('Error creating request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save request',
      error: error.message
    });
  }
};

export const getRequests = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: requests,
      count: requests.length
    });
  } catch (error: any) {
    console.error('Error fetching requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch requests',
      error: error.message
    });
  }
};

export const getRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = requests.find(r => r.id === id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error: any) {
    console.error('Error fetching request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch request',
      error: error.message
    });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = requests.findIndex(r => r.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    requests.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Request deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete request',
      error: error.message
    });
  }
};
