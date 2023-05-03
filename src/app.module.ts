import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EventModule,
    MongooseModule.forRoot('mongodb://localhost:27017/events-controller'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
