import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Below imported for Fastify use
 */
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

//Below is for file upload.
import fmp from 'fastify-multipart'
import { join } from 'path';


async function bootstrap() {
  
  const OS = require('os');
  process.env.UV_THREADPOOL_SIZE = (OS.cpus().length).toString();

  /* use fastify platform */
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,

    new FastifyAdapter({
      /*logger: {
        prettyPrint: true //requires npm install pino-pretty
      },*/
      logger: false,
      ignoreTrailingSlash: true,
      bodyLimit: 10485760, caseSensitive: true,
      maxParamLength: 512,
    }),
    { //enable cors
      cors: {
        "origin": "*",//from which domains can request be made? For now, it is set to everywhere. Security may demand restrictions. See configuration options at https://github.com/expressjs/cors#configuration-options
      }
    }
  );

  /* fastify-multipart registry */
  app.register(fmp, {
    throwFileSizeLimit: true,
    limits: { //default values here. Can be overriden when calling req.file. 
      fieldNameSize: 100000, // Max field name size in bytes
      fieldSize: 10000000, // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 1000000,      // For multipart forms, the max file size
      files: 2,           // Max number of file fields
      headerPairs: 2000,
    },

  } as any); //as any here is to accommodate throwFileSizeLimit


  /**
   * Set public folder for static assets.
   * Requisite installations: npm install fastify-static fastify
   */
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });


  /**
     * Create views folder and set view engine. Nunjucks should already be installed.
     * npm install point-of-view nunjucks
     * npm install -D @types/nunjucks
     */
  app.setViewEngine({
    engine: {
      nunjucks: require('nunjucks'),
    },
    templates: join(__dirname, '..', 'views'),
  });


  //call init() before setting up Swagger module as per fixing an issue. See https://github.com/nestjs/swagger/issues/891
  await app.init();

  //For fastify, include 0.0.0.0 to listen on all IPs on the system. Otherwise, fastify will only listen on localhost.
  await app.listen(3000, '0.0.0.0');

  //More NOTES about fastify use: See https://docs.nestjs.com/techniques/performance for redirect and options
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();

