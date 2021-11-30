import { NextFunction, Request, Response } from 'express';
import { getInfoService, getUserProfileService, getPreferencesService } from '../services/getServices';

export const getInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  try {
    const response = await getInfoService(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getUserProfileControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  try {
    const response = await getUserProfileService(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getPreferencesControl = async (req: Request,
  res: Response,
  next: NextFunction) => {
    const userId = req.user.id;
    try {
      const response = await getPreferencesService(userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
}