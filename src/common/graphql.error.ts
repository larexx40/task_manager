import { ExceptionFilter,Catch, HttpException, ArgumentsHost, Logger, HttpStatus as status } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class GraphQLErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const {request, response } = ctx;
    const error = exception.getResponse();

    // const args: HttpArgumentsHost = host.switchToHttp();
    // const res: Response = args.getResponse<Response>();
    // const req: Request = args.getRequest<Request>();
    const logger: Logger = new Logger('ErrorException');

    logger.error(`
      ==================================
      ======== Error Exception =========
      ==================================

        name: ${exception.name}
        code: ${exception.getStatus()}
        message: ${exception.message}
        response: ${JSON.stringify(exception.getResponse())}
        Stack: ${exception.stack}

      ==================================
      ==================================
      ==================================
    `);

    const statusCode: number = exception && !Number.isNaN(exception.getStatus()) ? exception.getStatus() : status.INTERNAL_SERVER_ERROR;
    const resMessage: any = exception.getResponse();

    const customErrMessage = resMessage.hasOwnProperty('message') ? resMessage.message : resMessage;
    const errMessage: any = exception && exception.message ? customErrMessage : 'Internal server error';

    return response.status(statusCode).json({
        status: false,
        statusCode: statusCode,
        message: errMessage,
        path: request.url,
        timestamp: new Date().toISOString
    });
  }
}
