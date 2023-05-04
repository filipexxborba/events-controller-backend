import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    title: 'Título do evento',
    example: 'Evento 1',
  })
  title: string;

  @ApiProperty({
    title: 'Descrição do evento',
    example: 'Descrição do evento 1',
  })
  description: string;
}
