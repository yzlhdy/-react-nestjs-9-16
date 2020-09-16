import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}

export class CategoryRO {
    id: string;
    created: Date;
    name: string;
}

export class CateList {
    @ApiProperty()
    @IsNotEmpty()
    page: number
}