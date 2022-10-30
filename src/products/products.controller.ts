import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllFiltersDto } from './dto/getAllProducts.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get(':code')
  @ApiOkResponse({
    description: 'Produto retornado com sucesso',
    type: Products,
  })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  @ApiOperation({ summary: 'Obtém um produto por código' })
  async getOne(@Param('code') code: string) {
    return await this.service.getOne(code);
  }

  @Get()
  @ApiOkResponse({
    description: 'Produtos retornados com sucesso',
    type: Products,
    isArray: true,
  })
  @ApiOperation({ summary: 'Obtém todos os produtos' })
  async getAll(@Query() filters?: GetAllFiltersDto) {
    filters.take = isNaN(+filters.take) ? 50 : +filters.take;
    filters.skip = isNaN(+filters.skip) ? 50 : +filters.skip;
    return await this.service.getAll(filters);
  }

  @Delete(':code')
  @ApiNoContentResponse({
    description: 'Status do produto mudado para trash com sucesso',
  })
  @ApiOperation({ summary: `Muda o status do produto para 'trash'` })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('code') code: string) {
    return await this.service.delete(code);
  }

  @Put(':code')
  @ApiOkResponse({
    description: 'Atualização feita com sucesso',
    type: Products,
  })
  @ApiOperation({ summary: 'Recebe as atualizações do Projeto Web' })
  async update(@Param('code') code: string, @Body() body: UpdateProductDto) {
    return await this.service.update(code, body);
  }
}
