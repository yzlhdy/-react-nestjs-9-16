import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    Logger,
} from '@nestjs/common'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    async catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message
        let isDeepestMessage = false
        while (!isDeepestMessage) {
            isDeepestMessage = !message.message
            message = isDeepestMessage ? message : message.message
        }

        const errorResponse = {
            status: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: message || '请求失败'
        }

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            Logger.error(
                `${request.method} ${request.url}`,
                exception.stack,
                'ExceptionFilter',
            );
        } else {
            Logger.error(
                `${request.method} ${request.url}`,
                JSON.stringify(errorResponse),
                'ExceptionFilter',
            );
        }


        response.status(status)
        response.header('Content-Type', 'application/json; charset=utf-8')
        response.send(errorResponse)
    }
}
