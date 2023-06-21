import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from 'src/orders/schemas/order.schema';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      return createdOrder.save();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      return this.orderModel.find();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async getOrderById(id: string): Promise<Order[]> {
    try {
      return this.orderModel.findById(id);
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return this.orderModel.updateOne(
        { _id: id },
        { $set: { ...updateOrderDto } },
      );
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async deleteOrder(id: string) {
    try {
      return this.orderModel.deleteOne({ _id: id });
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }
}
