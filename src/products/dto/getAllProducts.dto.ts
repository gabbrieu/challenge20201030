import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetAllFiltersDto {
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Quantidade de registros trazidos',
    default: 50,
  })
  take?: number = 50;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Quantidade de registros pulados',
    default: 0,
  })
  skip?: number = 0;
}
