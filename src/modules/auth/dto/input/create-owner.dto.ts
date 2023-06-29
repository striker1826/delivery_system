import { IsString, Length } from "class-validator";

export class CreateOwnerInputDto {
    @IsString()
    @Length(4, 8)
    ownerId: string;

    @IsString()
    @Length(6, 12)
    password: string;
}
