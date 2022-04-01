import { Reply, Request } from './app.interfaces';
export declare class AppService {
    getHello(): string;
    upload(req: Request, reply: Reply): Promise<void>;
}
