import { OmitType } from '@nestjs/swagger';
import { Products } from '../products.entity';

export class UpdateProductDto extends OmitType(Products, [
  'id',
  'code',
  'last_modified_t',
  'created_t',
  'imported_t',
]) {}
