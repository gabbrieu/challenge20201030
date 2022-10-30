import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllFiltersDto } from './dto/getAllProducts.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Products, StatusEnum } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly repository: Repository<Products>,
  ) {}

  async getOne(code: string): Promise<Products> {
    const product = await this.repository.findOne({ where: { code } });
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async getAll(filters: GetAllFiltersDto): Promise<Products[]> {
    const { take, skip } = filters;
    return await this.repository.find({ take, skip });
  }

  async delete(code: string): Promise<void> {
    const product = await this.getOne(code);
    product.status = StatusEnum.TRASH;
    await this.repository.save(product);
  }

  async update(code: string, body: UpdateProductDto): Promise<Products> {
    const product = await this.getOne(code);
    await this.repository.update(product.id, body);

    return { ...product, ...body };
  }
}
