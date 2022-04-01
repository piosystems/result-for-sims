import { FastifyReply, FastifyRequest } from 'fastify';
export interface Reply extends FastifyReply {
    view(page: string, data?: object): FastifyReply;
}
export interface Request extends FastifyRequest {
}
