import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ProductDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    desc: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @ApiProperty()
    detail: string;

    @IsNotEmpty()
    @ApiProperty()
    status: number;

    @ApiProperty()
    @IsString()
    images: string;

}

export class ProLimi {
    @ApiProperty()
    @IsNotEmpty()
    page: number;
}

export class SearchDto {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    desc: string;
    @ApiProperty()
    page: number;
}
