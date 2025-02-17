import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return; 
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
    return; 
  }
}
