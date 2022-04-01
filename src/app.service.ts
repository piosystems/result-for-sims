import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Reply, Request } from './app.interfaces';
import * as Excel from 'exceljs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async upload(req: Request, reply: Reply) {

    if (!req.isMultipart()) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `There was a problem with general upload creation. No file was sent`,
      }, HttpStatus.BAD_REQUEST)
    }

    try {

      const parts = req.files();


      let workbookSimsFile = null;
      let workbookSMCFile = null;
      let workbookSMCMScFile = null;
      let mimetype = null;
      let fileName = null;


      for await (const part of parts) {
        if (part.fieldname == 'simsFile') {
          workbookSimsFile = new Excel.Workbook();
          mimetype = part.mimetype;
          fileName = part.filename;
          await workbookSimsFile.xlsx.load(await part.toBuffer());
        } else if (part.fieldname == 'smcMscFile') {
          workbookSMCMScFile = new Excel.Workbook();
          mimetype = part.mimetype;
          fileName = part.filename;
          await workbookSMCMScFile.xlsx.load(await part.toBuffer());
          //console.log('smcMscFile')

          const SIMSWorksheet = workbookSimsFile.worksheets[0];

          const SMCWorksheet = workbookSMCMScFile.worksheets[0]
          //const SMCMScWorksheet = workbookSMCMScFile.worksheets[0]
          //iterate through the rows of SimsFile worksheet and pick each Matric number. Find the row containing the number in SMCFile
          SIMSWorksheet.eachRow((row1: any, rowNumber: string) => {
            //console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            const matricNumber = row1.getCell('B').value;

            //iterate through SMCFile and find the row with the value
            SMCWorksheet.eachRow((row2: any) => {
              const matricNumber2 = row2.getCell('B').value;
              if (matricNumber == matricNumber2) {
                //transpose data from smc row to sims row if the value in smc is not '-'

                row2.getCell('H').value != '-' && row2.getCell('H').value != 'AB' && row2.getCell('H').value != null ? row1.getCell('D').value = row2.getCell('H').value : null;
                row2.getCell('I').value != '-' && row2.getCell('I').value != 'AB' && row2.getCell('I').value != null ? row1.getCell('E').value = row2.getCell('I').value : null;
                row2.getCell('J').value != '-' && row2.getCell('J').value != 'AB' && row2.getCell('J').value != null ? row1.getCell('F').value = row2.getCell('J').value : null;
                row2.getCell('K').value != '-' && row2.getCell('K').value != 'AB' && row2.getCell('K').value != null ? row1.getCell('G').value = row2.getCell('K').value : null;
                row2.getCell('M').value != '-' && row2.getCell('M').value != 'AB' && row2.getCell('M').value != null ? row1.getCell('I').value = row2.getCell('M').value : null;
                row2.getCell('G').value != '-' && row2.getCell('G').value != 'AB' && row2.getCell('G').value != null ? row1.getCell('H').value = row2.getCell('G').value : null;

              }
            })
          })

          const buffer = await workbookSimsFile.xlsx.writeBuffer();

          reply
            .type(mimetype)
            .header('Content-Disposition', `attachment; filename="modified_${fileName}"`)
            .send(buffer);

        } else if (part.fieldname == 'smcFile') {
          workbookSMCFile = new Excel.Workbook();
          mimetype = part.mimetype;
          fileName = part.filename;
          await workbookSMCFile.xlsx.load(await part.toBuffer());
          //console.log('smcFile')
          //console.log(mimetype)
          //console.log(fileName)

          const SIMSWorksheet = workbookSimsFile.worksheets[0];

          const SMCWorksheet = workbookSMCFile.worksheets[0]
          //const SMCMScWorksheet = workbookSMCMScFile.worksheets[0]
          //iterate through the rows of SimsFile worksheet and pick each Matric number. Find the row containing the number in SMCFile
          SIMSWorksheet.eachRow((row1: any, rowNumber: string) => {
            //console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            const matricNumber = row1.getCell('B').value;

            //iterate through SMCFile and find the row with the value
            SMCWorksheet.eachRow((row2: any) => {
              const matricNumber2 = row2.getCell('B').value;
              if (matricNumber == matricNumber2) {
                //transpose data from smc row to sims row if the value in smc is not '-'

                row2.getCell('F').value != '-' && row2.getCell('F').value != 'AB' && row2.getCell('F').value != null ? row1.getCell('D').value = row2.getCell('F').value : null;
                row2.getCell('G').value != '-' && row2.getCell('G').value != 'AB' && row2.getCell('G').value != null ? row1.getCell('E').value = row2.getCell('G').value : null;
                row2.getCell('H').value != '-' && row2.getCell('H').value != 'AB' && row2.getCell('H').value != null ? row1.getCell('F').value = row2.getCell('H').value : null;
                row2.getCell('E').value != '-' && row2.getCell('E').value != 'AB' && row2.getCell('E').value != null ? row1.getCell('H').value = row2.getCell('E').value : null;
                row2.getCell('J').value != '-' && row2.getCell('J').value != 'AB' && row2.getCell('J').value != null ? row1.getCell('I').value = row2.getCell('J').value : null;

              }
            })
          })

          const buffer = await workbookSimsFile.xlsx.writeBuffer();

          reply
            .type(mimetype)
            .header('Content-Disposition', `attachment; filename="modified_${fileName}"`)
            .send(buffer);

        }

      }



      if (workbookSimsFile == null) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with upload: You did not upload the SIMS File`,
        }, HttpStatus.BAD_REQUEST)
      }



      if (!workbookSMCFile && !workbookSMCMScFile) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with upload: You did not upload any SMC-type Scoresheet File`,
        }, HttpStatus.BAD_REQUEST)
      }


    } catch (error) {
      /*
      {
 
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with conversion: ${error.message}`,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
 
      }*/
      reply
        .type('text/html')
        .send(`There was a problem with conversion: ${error.message}.
        <button>Try again</button>`)
    }

  }

}
