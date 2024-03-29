import authConfig from '@config/authConfig';
import { AppError } from '@shared/errors/appError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT token is missing');
    }
    const [, token] = authHeader.split(' ');
    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const { sub } = decodedToken as ITokenPayload;
        request.user = {
            id: sub,
        };
        return next();
    } catch (error) {
        throw new AppError('invalid JWT token');
    }
}
