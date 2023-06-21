import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      return createdProduct.save();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return this.productModel.find();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async getProductById(id: string): Promise<Product[]> {
    try {
      return this.productModel.findById(id);
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      return this.productModel.updateOne(
        { _id: id },
        { $set: { ...updateProductDto } },
      );
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async deleteProduct(id: string) {
    try {
      return this.productModel.deleteOne({ _id: id });
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }
}
