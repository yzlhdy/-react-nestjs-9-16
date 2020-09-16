import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    password: string;
}

export class UserRO {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    age: string;
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    breed: string;
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    password: string
}