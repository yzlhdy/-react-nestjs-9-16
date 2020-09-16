import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false
        }
        this.validateRequest(request.headers.authorization)
        return true
    }
    private validateRequest(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('token错误', HttpStatus.UNAUTHORIZED)
        }

        const token = auth.split(' ')[1]
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            return decode
        } catch (error) {
            const message = 'Token error: ' + (error.message || error.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}