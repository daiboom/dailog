import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { typeORMConfig } from 'src/configs/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardsModule } from './Boards/boards.module'
import { AuthModule } from './auth/auth.module';

const root = join(__dirname, '..', '../frontend/dist')

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ServeStaticModule.forRoot({
      rootPath: root,
    }),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
