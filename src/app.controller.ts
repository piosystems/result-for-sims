import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UploadDto } from './upload.dto';
import { Reply, Request } from './app.interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/

  @Get()
  getForm(@Res() reply: Reply) {
    reply.view('upload.html');
  }

  @ApiConsumes('multipart/form-data')
  @Post()
  upload(@Body() _uploadDto: UploadDto, @Req() req: Request, @Res() reply: Reply) {//dto is not really in use. I left it so that swagger to read expected fields from there
    return this.appService.upload(req, reply);
  }


}
