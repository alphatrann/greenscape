import { Module } from '@nestjs/common';
import { LocalFilesService } from './local-files.service';
import { FilesController } from './files.controller';

@Module({
  exports: [LocalFilesService],
  providers: [LocalFilesService],
  controllers: [FilesController],
})
export class FilesModule {}
