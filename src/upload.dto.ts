import { ApiProperty } from "@nestjs/swagger";

export class UploadDto {

    @ApiProperty({ type: 'string', format: 'binary' })
    readonly simsFile?: any;
    @ApiProperty({ type: 'string', format: 'binary' })
    readonly smcFile?: any;
    
}
