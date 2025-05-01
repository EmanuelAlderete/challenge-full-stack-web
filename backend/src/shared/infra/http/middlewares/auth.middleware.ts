import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import { JwtUserPayload } from "../../../types/auth";

declare global {
    namespace Express {
      interface Request {
        user?: JwtUserPayload;
      }
    }
  }

const JWT_SECRET = String(process.env.JWT_SECRET);

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET) as JwtUserPayload;
    req.user = verified;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Token inválido."
      });
    }
  }
};