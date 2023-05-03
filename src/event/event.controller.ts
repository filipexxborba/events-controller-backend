import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './filesManipulation';
import { diskStorage } from 'multer';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  // Filtra os arquivos, vamos receber somente imagens
  @Post('upload/:id')
  @UseInterceptors(
    FilesInterceptor('files', 999, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    const imageList = [];
    console.log(id);
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      imageList.push(fileReponse);
    });
    return await this.eventService.insertImageList(id, imageList);
  }

  // Filtra os arquivos, vamos receber somente imagens
  @Post('thumbnail/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadThumbnail(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log(id);
    return await this.eventService.insertThumbnail(id, file.filename);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get('allactive')
  getAllActive() {
    return this.eventService.getAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.desactive(id);
  }

  @Get('active/:id')
  active(@Param('id') id: string) {
    return this.eventService.active(id);
  }
}
