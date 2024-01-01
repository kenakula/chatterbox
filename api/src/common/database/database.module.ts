import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoService } from './mongo.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoService,
    }),
  ],
})
export class DatabaseModule {
}
