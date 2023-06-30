import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AnaliticsController } from './analitics/analitics.controller';
import { AnaliticsModule } from './analitics/analitics.module';

@Module({
  imports: [
    AdminModule,
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://Nipuna:QwbLqITi8N7BQ330@cluster0.jy2kp1m.mongodb.net/craftDb?retryWrites=true&w=majority',
    ),
    OrdersModule,
    AuthModule,
    AnaliticsModule,
  ],
  controllers: [AppController, AnaliticsController],
  providers: [AppService],
})
export class AppModule {}
