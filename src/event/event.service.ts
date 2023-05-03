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
      thumbnailImageUrl: '',
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

  async insertThumbnail(eventId: string, imageUrlList: string) {
    const event = await this.eventModel.findById(eventId);
    if (!event)
      throw new NotFoundException('Não foi encontra um evento com esse id');

    event.thumbnailImageUrl = imageUrlList;
    await event.save();
    return event;
  }

  async findAll() {
    return this.eventModel.find().exec();
  }

  async getAllActive() {
    console.log('Chegou aqui');
    return this.eventModel.find({ isActive: true }).exec();
  }

  async findOne(id: string) {
    return this.eventModel.findById(id).exec();
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, {
      new: true,
    });
  }

  async desactive(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Nao foi encontra um evento com esse id');
    }

    event.isActive = false;
    await event.save();
    return event;
  }

  async active(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Nao foi encontra um evento com esse id');
    }

    event.isActive = true;
    await event.save();
    return event;
  }
}
