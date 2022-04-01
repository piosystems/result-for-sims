"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const Excel = require("exceljs");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async upload(req, reply) {
        var e_1, _a;
        if (!req.isMultipart()) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: `There was a problem with general upload creation. No file was sent`,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const parts = req.files();
            let workbookSimsFile = null;
            let workbookSMCFile = null;
            let workbookSMCMScFile = null;
            let mimetype = null;
            let fileName = null;
            try {
                for (var parts_1 = __asyncValues(parts), parts_1_1; parts_1_1 = await parts_1.next(), !parts_1_1.done;) {
                    const part = parts_1_1.value;
                    if (part.fieldname == 'simsFile') {
                        workbookSimsFile = new Excel.Workbook();
                        mimetype = part.mimetype;
                        fileName = part.filename;
                        await workbookSimsFile.xlsx.load(await part.toBuffer());
                    }
                    else if (part.fieldname == 'smcMscFile') {
                        workbookSMCMScFile = new Excel.Workbook();
                        mimetype = part.mimetype;
                        fileName = part.filename;
                        await workbookSMCMScFile.xlsx.load(await part.toBuffer());
                        const SIMSWorksheet = workbookSimsFile.worksheets[0];
                        const SMCWorksheet = workbookSMCMScFile.worksheets[0];
                        SIMSWorksheet.eachRow((row1, rowNumber) => {
                            const matricNumber = row1.getCell('B').value;
                            SMCWorksheet.eachRow((row2) => {
                                const matricNumber2 = row2.getCell('B').value;
                                if (matricNumber == matricNumber2) {
                                    row2.getCell('H').value != '-' && row2.getCell('H').value != 'AB' && row2.getCell('H').value != null ? row1.getCell('D').value = row2.getCell('H').value : null;
                                    row2.getCell('I').value != '-' && row2.getCell('I').value != 'AB' && row2.getCell('I').value != null ? row1.getCell('E').value = row2.getCell('I').value : null;
                                    row2.getCell('J').value != '-' && row2.getCell('J').value != 'AB' && row2.getCell('J').value != null ? row1.getCell('F').value = row2.getCell('J').value : null;
                                    row2.getCell('K').value != '-' && row2.getCell('K').value != 'AB' && row2.getCell('K').value != null ? row1.getCell('G').value = row2.getCell('K').value : null;
                                    row2.getCell('M').value != '-' && row2.getCell('M').value != 'AB' && row2.getCell('M').value != null ? row1.getCell('I').value = row2.getCell('M').value : null;
                                    row2.getCell('G').value != '-' && row2.getCell('G').value != 'AB' && row2.getCell('G').value != null ? row1.getCell('H').value = row2.getCell('G').value : null;
                                }
                            });
                        });
                        const buffer = await workbookSimsFile.xlsx.writeBuffer();
                        reply
                            .type(mimetype)
                            .header('Content-Disposition', `attachment; filename="modified_${fileName}"`)
                            .send(buffer);
                    }
                    else if (part.fieldname == 'smcFile') {
                        workbookSMCFile = new Excel.Workbook();
                        mimetype = part.mimetype;
                        fileName = part.filename;
                        await workbookSMCFile.xlsx.load(await part.toBuffer());
                        const SIMSWorksheet = workbookSimsFile.worksheets[0];
                        const SMCWorksheet = workbookSMCFile.worksheets[0];
                        SIMSWorksheet.eachRow((row1, rowNumber) => {
                            const matricNumber = row1.getCell('B').value;
                            SMCWorksheet.eachRow((row2) => {
                                const matricNumber2 = row2.getCell('B').value;
                                if (matricNumber == matricNumber2) {
                                    row2.getCell('F').value != '-' && row2.getCell('F').value != 'AB' && row2.getCell('F').value != null ? row1.getCell('D').value = row2.getCell('F').value : null;
                                    row2.getCell('G').value != '-' && row2.getCell('G').value != 'AB' && row2.getCell('G').value != null ? row1.getCell('E').value = row2.getCell('G').value : null;
                                    row2.getCell('H').value != '-' && row2.getCell('H').value != 'AB' && row2.getCell('H').value != null ? row1.getCell('F').value = row2.getCell('H').value : null;
                                    row2.getCell('E').value != '-' && row2.getCell('E').value != 'AB' && row2.getCell('E').value != null ? row1.getCell('H').value = row2.getCell('E').value : null;
                                    row2.getCell('J').value != '-' && row2.getCell('J').value != 'AB' && row2.getCell('J').value != null ? row1.getCell('I').value = row2.getCell('J').value : null;
                                }
                            });
                        });
                        const buffer = await workbookSimsFile.xlsx.writeBuffer();
                        reply
                            .type(mimetype)
                            .header('Content-Disposition', `attachment; filename="modified_${fileName}"`)
                            .send(buffer);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) await _a.call(parts_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (workbookSimsFile == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: `There was a problem with upload: You did not upload the SIMS File`,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!workbookSMCFile && !workbookSMCMScFile) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: `There was a problem with upload: You did not upload any SMC-type Scoresheet File`,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            reply
                .type('text/html')
                .send(`There was a problem with conversion: ${error.message}.
        <button>Try again</button>`);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map