import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
const ENTITIES = [UserEntity]

@Module({
  imports: [TypeOrmModule.forFeature([...ENTITIES])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
