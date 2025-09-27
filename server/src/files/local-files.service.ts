import { rm } from 'fs/promises';
import { PrismaService } from '../prisma/prisma.service';
import { UploadFileDto } from './dto';
import { FilesService } from './files.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

@Injectable()
export class LocalFilesService implements FilesService {
  constructor(private prisma: PrismaService) {}

  async createMany(uploadFilesDto: UploadFileDto[]): Promise<string[]> {
    const ids = uploadFilesDto.map(() => uuidv4());
    await this.prisma.file.createMany({
      data: ids.map((id, i) => ({
        id,
        filename: uploadFilesDto[i].filename,
        mimetype: uploadFilesDto[i].mimetype,
        path: uploadFilesDto[i].path,
      })),
    });
    return ids;
  }

  async findOne(id: string) {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });
    if (!file)
      throw new NotFoundException({
        success: false,
        message: 'Cannot find file with the given `id`',
      });
    return file;
  }

  async remove(keys: string[]) {
    const toDeleteFiles = await this.prisma.file.findMany({
      where: { id: { in: keys } },
    });
    for (const file of toDeleteFiles) {
      try {
        await rm(file.path);
      } catch {}
    }
    await this.prisma.file.deleteMany({ where: { id: { in: keys } } });
  }
}
