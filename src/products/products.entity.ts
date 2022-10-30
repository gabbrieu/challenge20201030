import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Id do produto', type: String })
  id: string;

  @Column({ type: 'bigint' })
  @IsNumber()
  @ApiProperty({
    description: 'Código do produto',
    type: Number,
    example: 1271278,
  })
  code: number;

  @Column({ enum: StatusEnum, enumName: 'StatusEnum' })
  @IsEnum(StatusEnum)
  @ApiProperty({
    description: 'Status do produto',
    type: String,
    enum: StatusEnum,
    example: StatusEnum.PUBLISHED,
  })
  status: StatusEnum;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Data de quando o produto foi importado',
    type: String,
    example: new Date().toISOString(),
  })
  imported_t: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'URL do produto na Open Food Facts',
    type: String,
    example:
      'http://world-en.openfoodfacts.org/product/3417960022831/noix-de-muscade-cook',
  })
  url: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Contribuidor de quem adicionou o produto primeiro',
    type: String,
    example: 'gabbrieu',
  })
  creator: string;

  @Column()
  @IsNumber()
  @ApiProperty({
    description: 'Data de quando o produto foi adicionado (UNIX timestamp)',
    type: Number,
    example: 1455123009,
  })
  created_t: number;

  @Column()
  @IsNumber()
  @ApiProperty({
    description:
      'Data de quando o produto foi modificado pela última vez (UNIX timestamp)',
    type: Number,
    example: 1455123009,
  })
  last_modified_t: number;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Nome do produto',
    type: String,
    example: 'Café',
  })
  product_name: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Quantidade e unidade do produto',
    type: String,
    example: '30 g',
  })
  quantity: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Marca do produto',
    type: String,
    example: 'Coca-Cola',
  })
  brands: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Categoria do produto',
    type: String,
    example: 'Carne',
  })
  categories: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Etiqueta do produto',
    type: String,
    example: 'Sem adoçantes artificiais',
  })
  labels: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Cidades',
    type: String,
    example: 'Itabira',
  })
  cities: string;

  @Column()
  @IsString()
  @ApiProperty({
    description:
      'Países onde se é possível comprar o produto. Pode ser uma lista separada por vírgula',
    type: String,
    example: 'Brasil,Argentina,Chile',
  })
  purchase_places: string;

  @Column()
  @IsString()
  @ApiProperty({
    description:
      'Lojas que vendem o produto. Pode ser uma lista separada por vírgula',
    type: String,
    example: 'Loja1,Loja2',
  })
  stores: string;

  @Column({ type: 'text' })
  @IsString()
  @ApiProperty({
    description: 'Lista de ingredientes',
    type: String,
    example: 'Arroz com feijão, salada ...',
  })
  ingredients_text: string;

  @Column()
  @IsString()
  @ApiProperty({
    description:
      'Vestígios de substâncias no produto. Pode ser uma lista separada por vírgula',
    type: String,
    example: 'en:milk,en:mustard',
  })
  traces: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Tamanho servido',
    type: String,
    example: '50 g',
  })
  serving_size: string;

  @Column()
  @IsNumber()
  @ApiProperty({
    description: 'Quantidade servida',
    type: Number,
    example: 100,
  })
  serving_quantity: number;

  @Column()
  @IsNumber()
  @ApiProperty({
    description: 'Placar de nutrição do produto',
    type: Number,
    example: 14,
  })
  nutriscore_score: number;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Nota de nutrição do produto',
    type: String,
    example: 'd',
  })
  nutriscore_grade: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'Categoria principal do produto',
    type: String,
    example: 'en:vegetarian-sausages',
  })
  main_category: string;

  @Column()
  @IsString()
  @ApiProperty({
    description: 'URL da foto do produto',
    type: String,
    example:
      'https://static.openfoodfacts.org/images/products/541/153/672/1478/front_fr.3.400.jpg',
  })
  image_url: string;
}
