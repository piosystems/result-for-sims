import { AppService } from './app.service';
import { UploadDto } from './upload.dto';
import { Reply, Request } from './app.interfaces';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getForm(reply: Reply): void;
    upload(_uploadDto: UploadDto, req: Request, reply: Reply): Promise<void>;
}
