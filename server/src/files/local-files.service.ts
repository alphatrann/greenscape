import { rm } from 'fs/promises';
import { PrismaService } from '../prisma/prisma.service';
import { UploadFileDto } from './dto';
import { FilesService } from './files.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { TransactionClient } from '../common/types';

@Injectable()
export class LocalFilesService implements FilesService {
  constructor(private prisma: PrismaService) {}

  async createMany(
    uploadFilesDto: UploadFileDto[],
    tx?: TransactionClient,
  ): Promise<string[]> {
    const client = tx ?? this.prisma;
    const ids = uploadFilesDto.map(() => uuidv4());
    await client.file.createMany({
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

  async remove(keys: string[], tx?: TransactionClient): Promise<string[]> {
    const client = tx ?? this.prisma;
    const toDeleteFiles = await client.file.findMany({
      where: { id: { in: keys } },
    });
    const deleted: string[] = [];
    for (const file of toDeleteFiles) {
      try {
        await rm(file.path);
        deleted.push(file.id);
      } catch {}
    }
    await client.file.deleteMany({ where: { id: { in: deleted } } });
    return deleted;
  }
}
