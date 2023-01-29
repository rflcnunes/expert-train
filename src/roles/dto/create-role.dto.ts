import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  description: string;
}
