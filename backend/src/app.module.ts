import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'; // New
import { join } from 'path'; // New

const root = join(__dirname, '..', '../frontend/dist');
console.log(root);
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: root,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
