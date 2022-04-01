import { FastifyReply, FastifyRequest } from 'fastify';

export interface Reply extends FastifyReply{
  view(page: string, data?: object): FastifyReply
}

export interface Request extends FastifyRequest{
  //We will likely need to add user here when we deal with Auth
  //user: User //we need this for Typescript to recognize the presence of user in our request object to be sent to login.
}

