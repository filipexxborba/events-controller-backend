import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import { Model } from 'mongoose';
import { Image } from '../@types/Image.type';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}
  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel({
      ...createEventDto,
      createdAt: new Date(),
      isActive: true,
      imageUrlList: [],
    });

    await newEvent.save();
    return newEvent;
  }

  async insertImageList(eventId: string, imageUrlList: Image[]) {
    const event = await this.eventModel.findById(eventId);
    if (!event)
      throw new NotFoundException('Não foi encontra um evento com esse id');

    const currentImages = event.imageUrlList;
    imageUrlList.map((imageUrl) => {
      currentImages.push(imageUrl.filename);
    });

    event.imageUrlList = currentImages;
    await event.save();
    return event;
  }

  async findAll() {
    return `This action returns all event`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
