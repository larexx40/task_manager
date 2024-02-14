import { IsNotEmpty, IsString, IsBoolean, IsDate, IsMongoId, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @IsOptional()
    @IsMongoId()
    userId: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    isComplete: boolean;

    @IsOptional()
    @IsDate()
    startDate: Date;

    @IsOptional()
    @IsDate()
    endDate: Date;
}

export class UpdateTaskDto {
    @IsOptional()
    @IsMongoId()
    userId: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsDate()
    startDate: Date;

    @IsOptional()
    @IsDate()
    endDate: Date;
}