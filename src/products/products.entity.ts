import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusEnum {
  DRAFT = 'draft',
  TRASH = 'trash',
  PUBLISHED = 'published',
}

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'bigint' })
  @IsNumber()
  code: number;

  @Column({ enum: StatusEnum, enumName: 'StatusEnum' })
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @Column()
  @IsString()
  imported_t: string;

  @Column()
  @IsString()
  url: string;

  @Column()
  @IsString()
  creator: string;

  @Column()
  @IsNumber()
  created_t: number;

  @Column()
  @IsNumber()
  last_modified_t: number;

  @Column()
  @IsString()
  product_name: string;

  @Column()
  @IsString()
  quantity: string;

  @Column()
  @IsString()
  brands: string;

  @Column()
  @IsString()
  categories: string;

  @Column()
  @IsString()
  labels: string;

  @Column()
  @IsString()
  cities: string;

  @Column()
  @IsString()
  purchase_places: string;

  @Column()
  @IsString()
  stores: string;

  @Column({ type: 'text' })
  @IsString()
  ingredients_text: string;

  @Column()
  @IsString()
  traces: string;

  @Column()
  @IsString()
  serving_size: string;

  @Column()
  @IsNumber()
  serving_quantity: number;

  @Column()
  @IsNumber()
  nutriscore_score: number;

  @Column()
  @IsString()
  nutriscore_grade: string;

  @Column()
  @IsString()
  main_category: string;

  @Column()
  @IsString()
  image_url: string;
}
