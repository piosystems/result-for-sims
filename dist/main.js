"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const fastify_multipart_1 = require("fastify-multipart");
const path_1 = require("path");
async function bootstrap() {
    const OS = require('os');
    process.env.UV_THREADPOOL_SIZE = (OS.cpus().length).toString();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({
        logger: false,
        ignoreTrailingSlash: true,
        bodyLimit: 10485760, caseSensitive: true,
        maxParamLength: 512,
    }), {
        cors: {
            "origin": "*",
        }
    });
    app.register(fastify_multipart_1.default, {
        throwFileSizeLimit: true,
        limits: {
            fieldNameSize: 100000,
            fieldSize: 10000000,
            fields: 10,
            fileSize: 1000000,
            files: 2,
            headerPairs: 2000,
        },
    });
    app.useStaticAssets({
        root: (0, path_1.join)(__dirname, '..', 'public'),
        prefix: '/public/',
    });
    app.setViewEngine({
        engine: {
            nunjucks: require('nunjucks'),
        },
        templates: (0, path_1.join)(__dirname, '..', 'views'),
    });
    await app.init();
    await app.listen(3000, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map