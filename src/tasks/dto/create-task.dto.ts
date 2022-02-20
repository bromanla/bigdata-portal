import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  company: string;

  @IsNumber()
  type: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
