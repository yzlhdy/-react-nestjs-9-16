import { createParamDecorator, ExecutionContext, Param, ParseIntPipe } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        console.log(request.uer);

        return request.user;
    },
);

export const Id = () => Param('id', new ParseIntPipe());